import React, { useContext } from "react";

import { JobContext } from "../../helpers/JobContext";

import { FaSearch } from "react-icons/fa";

const SearchBar = ({ inputRef, handleSearchClick }) => {
  const { searchTerm, setSearchTerm, setShowingSearchbar } =
    useContext(JobContext);

  return (
    <div
      className="search-box"
      onClick={() => handleSearchClick()}
      onBlur={() => {
        setShowingSearchbar(false);
        inputRef.current.blur();
      }}
    >
      <input
        type="search"
        className="search-input"
        placeholder="Search..."
        onChange={(e) => {
          setSearchTerm(e.target.value.trim());
        }}
        value={searchTerm}
        ref={inputRef}
      />
      <a className="search-btn" href="/#">
        <FaSearch className="search-icon" />
      </a>
    </div>
  );
};

export default SearchBar;
