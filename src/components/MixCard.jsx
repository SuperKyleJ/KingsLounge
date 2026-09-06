function CategoryStar({ category }) {
  const styles = {
    limitedEdition: { fill: "red", stroke: "red" },
    exotic: { fill: "gold", stroke: "gold" },
    regular: { fill: "none", stroke: "gold" },
  };

  const { fill, stroke } = styles[category] ?? styles.regular;

  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill={fill}
      stroke={stroke}
      strokeWidth="1.5"
    >
      <path d="M12 2l2.9 6.6 7.1.6-5.4 4.7 1.7 7-6.3-3.9-6.3 3.9 1.7-7L2 9.2l7.1-.6L12 2z" />
    </svg>
  );
}

function MixCard({ mix }) {
  return (
    <div
      style={{
        padding: "10px",
        borderRadius: "8px",
        border: "1px solid #ddd",
        textAlign: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "6px",
        }}
      >
        <p style={{ fontWeight: "bold", margin: 0 }}>{mix.title}</p>
        <CategoryStar category={mix.category} />
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "8px",
          marginTop: "8px",
        }}
      >
        {mix.flavors?.map((flavor) => (
          <span
            key={flavor.id}
            style={{
              backgroundColor: flavor.color,
              padding: "4px 10px",
              borderRadius: "12px",
              fontSize: "14px",
            }}
          >
            {flavor.title}
          </span>
        ))}
      </div>
    </div>
  );
}

export default MixCard;
