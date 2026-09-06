// components/ShishaSection.jsx
import ShishaCard from "./ShishaCard";
import "./ShishaSection.css";

function ShishaSection({ title, category, entities }) {
  //const info = CATEGORY_INFO[category] ?? CATEGORY_INFO.regular;
  const filtered = entities.filter((entity) => entity.category === category);
  const CATEGORY_INFO = {
    regular: {
      label: "Regular",
      hookaPrice: 25,
      refillPrice: 15,
      icon: "star-outline",
      iconColor: "yellow",
    },
    exotic: {
      label: "Exotic",
      hookaPrice: 27,
      refillPrice: 17,
      icon: "star-filled",
      iconColor: "yellow",
    },
    limitedEdition: {
      label: "Limited Edition",
      hookaPrice: 30,
      refillPrice: 20,
      icon: "star-filled",
      iconColor: "red",
    },
  };
  const info = CATEGORY_INFO[category] ?? CATEGORY_INFO.regular;
  return (
    <div className="shisha-section">
      <h2>{info.label}</h2>
      <div className="priceSection">
        <h3>Hooka: ${info.hookaPrice}</h3>
        <h3>Refill: ${info.refillPrice}</h3>
      </div>

      <div className="shisha-grid">
        {filtered.map((entity) => (
          <ShishaCard key={entity.id} shisha={entity} />
        ))}
      </div>
    </div>
  );
}

export default ShishaSection;
