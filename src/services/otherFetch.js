const CONTAINER_ID = 'iCloud.KingsLoungeData';
const ENVIRONMENT = 'development';
const API_TOKEN = 'f92ab34086a407ba7609adb5799913859a952b91321b6015d544a5ccd5eb6f12';

const BASE_URL = `https://api.apple-cloudkit.com/database/1/${CONTAINER_ID}/${ENVIRONMENT}/public`;

export async function fetchOtherEntities() {
  const url = `${BASE_URL}/records/query?ckAPIToken=${API_TOKEN}`;

  const body = {
    query: {
      recordType: 'OtherItemModel',
filterBy: [
      {
        fieldName: 'title',
        comparator: 'NOT_EQUALS',
        fieldValue: { value: '' },
      },
    ],
    },
    resultsLimit: 200, // adjust as needed / paginate with continuationMarker
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

const VALID_CATEGORIES = ['drink', 'product', 'snack'];

return data.records.map((record) => {
  const rawCategory = record.fields?.category?.value;
  const category = VALID_CATEGORIES.includes(rawCategory) ? rawCategory : 'product';

  return {
    id: record.recordName,
    title: record.fields?.title?.value ?? '',
    price: record.fields?.price?.value ?? '',

    category,
  };
});
}