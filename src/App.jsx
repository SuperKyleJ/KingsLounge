import { useEffect, useState } from "react";
import { fetchShishaEntities } from "./services/flavorFetch.js";
import "./App.css";
import { fetchMixEntities } from "./services/mixFetch.js";
import { fetchOtherEntities } from "./services/otherFetch.js";

import NavBar from "./components/Nav Bar/NavBar.jsx";
import MixList from "./pages/MixList2.jsx";
import FlavorList from "./pages/FlavorList.jsx";
import OtherItemList from "./pages/OtherItemList.jsx";

function App() {
  const [listView, setView] = useState("flavorList");
  const [searchTerm, setSearchTerm] = useState("");
  const [flavors, setflavors] = useState([]);
  const [mixes, setMixes] = useState([]);
  const [otherItems, setOtherItems] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    fetchOtherEntities()
      .then(setOtherItems)
      .catch((err) => setError(err.message));
    fetchMixEntities()
      .then(setMixes)
      .catch((err) => setError(err.message));
    fetchShishaEntities()
      .then(setflavors)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);
  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;
  function renderView() {
    switch (listView) {
      case "flavorList":
        return <FlavorList searchTerm={searchTerm} flavors={flavors} />;
      case "mixList":
        return <MixList searchTerm={searchTerm} mixes={mixes} />;
      case "otherItemList":
        return (
          <OtherItemList searchTerm={searchTerm} otherItems={otherItems} />
        );

      default:
        return null;
    }
  }
  return (
    <>
      <NavBar
        list={listView}
        setView={setView}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      {renderView()}
    </>
  );
}

export default App;
