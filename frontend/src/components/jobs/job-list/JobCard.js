import React, { useContext } from "react";

import ArchiveButtonGroup from "../../layout/ArchiveButtonGroup";

import { JobContext } from "../../../helpers/JobContext";
import { truncate } from "../../../helpers/utils";

const JobCard = (props) => {
  const { job, jobDetailsFilter, archiveClickHandler } = props;
  const { windowSize, showingArchive } = useContext(JobContext);
  return (
    <div className="job-card__upper-container">
      <p className="card-info-header">Job Title</p>
      <h1 className="job-card__title" alt={job.title}>
        {windowSize.innerWidth < 640 ? job.title : truncate(job.title)}
      </h1>

      <p className="card-info-header">Company</p>
      <h1 className="job-card__company" alt={job.company}>
        {windowSize.innerWidth < 640 ? job.company : truncate(job.company)}
      </h1>
      <p className="card-info-header">Date Applied</p>
      <h4 className="job-card__date-applied">{job.dateAppliedReadable}</h4>
      <p className="card-info-header">Status</p>
      <h1 className="job-card__company">
        {job.stageOfApplication === 0
          ? "Applied"
          : job.stageOfApplication === 1
          ? "First Interview"
          : job.stageOfApplication === 2
          ? "Second Interview"
          : "Received Offer!"}
      </h1>
      {!showingArchive ? (
        <div className="job-card__btn-container">
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
            ARCHIVE
          </button>
        </div>
      ) : (
        <ArchiveButtonGroup
          job={job}
          archiveClickHandler={archiveClickHandler}
          jobDetailsFilter={jobDetailsFilter}
        />
      )}
    </div>
  );
};

export default JobCard;
