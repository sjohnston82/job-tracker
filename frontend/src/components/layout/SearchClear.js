import React, { useContext } from "react";

import { JobContext } from "../../helpers/JobContext";

const SearchClear = (props) => {
  const { resultCount } = props;
  const { setSearchTerm, debouncedSearch, showingJobDetails } =
    useContext(JobContext);

  const clearSearchTerm = () => {
    setSearchTerm("");
  };
  return (
    <div className={debouncedSearch === "" ? "none" : "search-clear"}>
      {resultCount === 0 && debouncedSearch !== "" && !showingJobDetails && (
        <div className="search-clear-results-col">
          <p className="search-clear-text">
            Your search for "{debouncedSearch}" returned no results.
          </p>
          <button className="search-clear-btn" onClick={clearSearchTerm}>
            CLEAR SEARCH
          </button>
        </div>
      )}
      {resultCount > 0 && debouncedSearch !== "" && !showingJobDetails && (
        <div className="search-clear-results-row">
          <p className="search-clear-text">
            Showing results for "{debouncedSearch}"...
          </p>
          <button className="search-clear-btn" onClick={clearSearchTerm}>
            CLEAR SEARCH
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchClear;
