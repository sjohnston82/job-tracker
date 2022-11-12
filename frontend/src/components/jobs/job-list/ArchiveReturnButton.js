import React, { useContext } from "react";

import { JobContext } from "../../../helpers/JobContext";

const ArchiveReturnButton = () => {
  const { showingArchive, getJobs, resetter, showingJobDetails } =
    useContext(JobContext);
  return (
    <>
      {showingArchive && !showingJobDetails && (
        <button
          className="job-list-container__archive-return"
          onClick={() => {
            resetter();
            getJobs();
          }}
        >
          Return to Active Listings
        </button>
      )}
    </>
  );
};

export default ArchiveReturnButton;
