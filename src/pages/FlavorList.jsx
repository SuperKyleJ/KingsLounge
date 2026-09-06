import "../App.css";
import ShishaSection from "../components/ShishaSection";

const FlavorList = ({ searchTerm, flavors }) => {
  return (
    <div>
      <h1>Flavor List</h1>

      <div className="shisha-layout">
        <div className="shisha-right-column">
          <ShishaSection
            title="Regular Shisha"
            category="regular"
            entities={flavors.filter((entity) =>
              entity.title.toLowerCase().includes(searchTerm.toLowerCase()),
            )}
          />
        </div>
        <div className="shisha-left-column">
          <ShishaSection
            title="Exotic Shisha"
            category="exotic"
            entities={flavors.filter((entity) =>
              entity.title.toLowerCase().includes(searchTerm.toLowerCase()),
            )}
          />
          <ShishaSection
            title="Limited Edition Shisha"
            category="limitedEdition"
            entities={flavors.filter((entity) =>
              entity.title.toLowerCase().includes(searchTerm.toLowerCase()),
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default FlavorList;
