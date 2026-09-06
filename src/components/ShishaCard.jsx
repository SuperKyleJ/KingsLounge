function ShishaCard({ shisha }) {
  return (
    <div
      style={{
        backgroundColor: shisha.backgroundColor,
        padding: "5px",
        borderRadius: "8px",
        textAlign: "center",
      }}
    >
      <div className="shisha-title">
        <p style={{ color: shisha.foregroundColor }}>{shisha.title}</p>
      </div>
    </div>
  );
}

export default ShishaCard;
