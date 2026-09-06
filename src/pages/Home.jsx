import ShishaCard from "../components/ShishaCard";
import { useState } from "react";

function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const shishas = [
    { id: 1, title: "Cherry", color: "red" },
    { id: 2, title: "Vanilla", color: "white" },
    { id: 3, title: "Strawberry", color: "pink" },
    { id: 4, title: "Mint", color: "green" },
  ];
  const handleSearch = (e) => {
    alert(`Searching for: ${searchTerm}`);
  };
  return (
    <div className="home">
      <form onSubmit={handleSearch} className="search-form">
        <h2>
          Shisha List
          <input
            type="text"
            placeholder="Search shisha..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit">Clear</button>
        </h2>
      </form>
      <div className="shisha-list">
        {shishas.map(
          (shisha) =>
            shisha.title.toLowerCase().startsWith(searchTerm.toLowerCase()) && (
              <ShishaCard shisha={shisha} key={shisha.id} />
            ),
        )}
      </div>
    </div>
  );
}
export default Home;
