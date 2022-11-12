import React, { useContext } from "react";

import Job from "./Job";

import { JobContext } from "../../../helpers/JobContext";

const Jobs = (props) => {
  const { endOffset } = props;
  const { jobs, debouncedSearch, itemOffset, showingArchive } =
    useContext(JobContext);
    
  return (
    <div className="job-list-container__list">
      {jobs
        ?.filter((job) => {
          if (debouncedSearch === "") {
            return job;
          } else if (
            job.title.toLowerCase().includes(debouncedSearch) ||
            job.company.toLowerCase().includes(debouncedSearch)
          ) {
            return job;
          }
        })
        .filter((job) => (showingArchive ? job.isArchived : !job.isArchived))
        .slice(itemOffset, endOffset)
        ?.map((job) => {
          return (
            <div key={job._id} className="job-div">
              <Job
                job={job}
              />
            </div>
          );
        })}
    </div>
  );
};

export default Jobs;
