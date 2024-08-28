// import React from "react";
import "../styles/Components.css";

const SearchThings = ({ searchText, handleSearchChange }) => {
  return (
    <>
      <div className="search-input-field">
        <label htmlFor="searchField">Search</label>
        <input
          type="text"
          id="searchField"
          name="searchField"
          className="searchField"
          value={searchText}
          onChange={handleSearchChange}
          placeholder="Search"
        />
      </div>
    </>
  );
};

export default SearchThings;
