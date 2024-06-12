import React from "react";
import "./search.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const Search = ({ setSearchQuery }) => {
  return (
    <div className="search">
      <div className="searchBar">
        <FontAwesomeIcon icon={faSearch} className="icon" />
        <label htmlFor="headerSearch">
          <input
            type="search"
            id="headerSearch"
            name="headerSearch"
            placeholder="Search Article"
            onChange={(event) => {
              const value = event.target.value;
              if (value.length >= 3) {
                setSearchQuery(value);
              } else {
                setSearchQuery(""); // Resetează starea dacă input-ul are mai puțin de 3 caractere
              }
            }}
          />
        </label>
      </div>
    </div>
  );
};

export default Search;
