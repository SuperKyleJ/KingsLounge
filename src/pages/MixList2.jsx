import MixCard from "../components/MixCard.jsx";
import "./MixList.css";

const MixList = ({ searchTerm, mixes }) => {
  const filteredEntities = mixes.filter((entity) =>
    entity.title.toLowerCase().includes(searchTerm.trim().toLowerCase()),
  );

  return (
    <div>
      <h1>Mix List</h1>
      <div className="mix-grid">
        {filteredEntities.map((entity) => (
          <MixCard key={entity.id} mix={entity} />
        ))}
      </div>
    </div>
  );
};
export default MixList;
