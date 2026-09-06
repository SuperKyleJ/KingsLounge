import MixCard from "../components/MixCard.jsx";
import "./MixList.css";

const OtherItemList = ({ searchTerm, otherItems }) => {
  const filteredEntities = otherItems.filter((entity) =>
    entity.title.toLowerCase().includes(searchTerm.trim().toLowerCase()),
  );

  return (
    <div>
      <h1>Other Items</h1>
      <div className="mix-grid">
        {filteredEntities.map((entity) => (
          <p key={entity.id}>
            {entity.title} - ${entity.price}
          </p>
        ))}
      </div>
    </div>
  );
};
export default OtherItemList;
