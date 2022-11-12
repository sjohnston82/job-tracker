import React, { useContext } from "react";

import { JobContext } from "../../helpers/JobContext";

const ArchiveButtonGroup = ({ job, archiveClickHandler, jobDetailsFilter }) => {
  const { deleteJobListing } = useContext(JobContext);

  return (
    <div className="job-card__btn-container-archive">
      <button
        className="job-card__show-details-btn"
        onClick={() => jobDetailsFilter(job._id)}
      >
        SHOW DETAILS
      </button>

      <button
        className="job-card__show-details-btn"
        onClick={() => archiveClickHandler(job._id)}
      >
        {!job.isArchived ? "ARCHIVE" : "UNARCHIVE"}
      </button>

      <button
        className="job-card__delete-btn"
        onClick={() => deleteJobListing(job._id)}
      >
        DELETE
      </button>
    </div>
  );
};

export default ArchiveButtonGroup;
