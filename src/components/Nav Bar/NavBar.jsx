import { useEffect, useState } from "react";
import "./NavBar.css";
import searchIcon from "../../assets/magnifyingglass.png";
import Logo from "../../assets/KingsLogo1.png";

const NavBar = ({ list, setView, searchTerm, setSearchTerm }) => {
  const [searching, setSearch] = useState(false);

  const toggleSearch = () => {
    searching ? setSearch(false) : setSearch(true);
  };
  return (
    <div className="navbar">
      <img src={Logo} alt="Kings Lounge Logo" className="logo" />
      <div className="navbar-title">Kings Lounge</div>

      <ul>
        <li
          onClick={() => [
            setView("flavorList"),
            setSearch(false),
            setSearchTerm(""),
          ]}
        >
          Flavors
        </li>
        <li
          onClick={() => [
            setView("mixList"),
            setSearch(false),
            setSearchTerm(""),
          ]}
        >
          Mixes
        </li>
        <li
          onClick={() => [
            setView("otherItemList"),
            setSearch(false),
            setSearchTerm(""),
          ]}
        >
          Other Items
        </li>
      </ul>
      <div className="navbar-search">
        <img
          onClick={toggleSearch}
          src={searchIcon}
          alt="Search"
          className="navbar-search-icon"
        />
        {searching && (
          <div className="searchInput">
            {" "}
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && <button onClick={() => setSearchTerm("")}>X</button>}
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
