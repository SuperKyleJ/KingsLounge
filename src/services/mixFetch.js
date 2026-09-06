const CONTAINER_ID = 'iCloud.KingsLoungeData';
const ENVIRONMENT = 'development';
const API_TOKEN = 'f92ab34086a407ba7609adb5799913859a952b91321b6015d544a5ccd5eb6f12';

const BASE_URL = `https://api.apple-cloudkit.com/database/1/${CONTAINER_ID}/${ENVIRONMENT}/public`;


// services/cloudkit2.js (or wherever fetchMixEntities lives)

export async function fetchMixEntities() {
  const url = `${BASE_URL}/records/query?ckAPIToken=${API_TOKEN}`;

  const body = {
    query: {
      recordType: 'MixModel',
      filterBy: [
        {
        fieldName: 'title',
        comparator: 'NOT_EQUALS',
        fieldValue: { value: '' },
      },
      ],
    },
    resultsLimit: 200,
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`CloudKit error ${response.status}: ${errText}`);
  }

  const data = await response.json();

  // Step 1: map raw mix records, pulling out the reference's recordName
  const mixes = data.records.map((record) => ({
  id: record.recordName,
  title: record.fields?.title?.value ?? '',
  onMenu: record.fields?.onMenu?.value == 1,
  shishaRefs: (record.fields?.flavors?.value ?? []).map((ref) => ref.recordName),
}));

  // Step 2: collect unique shisha recordNames referenced by these mixes
const shishaIds = [...new Set(mixes.flatMap((m) => m.shishaRefs))];

  if (shishaIds.length === 0) {
    return mixes.map((m) => ({ ...m, shisha: null }));
  }

  // Step 3: batch-fetch the referenced shisha records
  const shishaRecords = await fetchRecordsByIds(shishaIds);

  // Step 4: build a lookup map for O(1) attaching
  const shishaMap = {};
  shishaRecords.forEach((record) => {
    shishaMap[record.recordName] = {
      id: record.recordName,
      title: record.fields?.title?.value ?? '',
      color: record.fields?.backgroundColor?.value ?? '',
      category: record.fields?.category?.value ?? '',
    };
  });

  // Step 5: attach the matched shisha object to each mix
 return mixes.map((mix) => {
  const flavors = mix.shishaRefs.map((id) => shishaMap[id]).filter(Boolean);

  return {
    ...mix,
    flavors,
    category: getHighestCategory(flavors),
  };
});
}

// Helper used internally above — batch-fetches records by recordName
async function fetchRecordsByIds(recordNames) {
  const url = `${BASE_URL}/records/lookup?ckAPIToken=${API_TOKEN}`;

  const body = {
    records: recordNames.map((recordName) => ({ recordName })),
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`CloudKit error ${response.status}: ${errText}`);
  }

  const data = await response.json();
  return data.records;
}
const CATEGORY_RANK = {
  regular: 0,
  exotic: 1,
  limitedEdition: 2,
};

function getHighestCategory(flavors) {
  if (!flavors || flavors.length === 0) return 'regular';

  const highest = flavors.reduce((highestSoFar, flavor) => {
    const rank = CATEGORY_RANK[flavor.category] ?? 0;
    return rank > highestSoFar ? rank : highestSoFar;
  }, CATEGORY_RANK.regular);

  // convert the numeric rank back to its category string
  return Object.keys(CATEGORY_RANK).find((key) => CATEGORY_RANK[key] === highest);
}