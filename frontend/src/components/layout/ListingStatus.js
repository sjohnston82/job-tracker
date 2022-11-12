import React, { useContext } from "react";

import { JobContext } from "../../helpers/JobContext";

const ListingStatus = () => {
  const { showingArchive } = useContext(JobContext);

  return (
    <div className="listing-status-container">
      <hr />
      <span className="listing-status-text">
        {!showingArchive ? "Active Job Applications" : "Archived Applications"}
      </span>
      <hr />
    </div>
  );
};

export default ListingStatus;
