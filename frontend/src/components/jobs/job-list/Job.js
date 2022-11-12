import React, { useState, useEffect, useContext } from "react";

import JobDetails from "../details/JobDetails";

import { JobContext } from "../../../helpers/JobContext";
import JobCard from "./JobCard";

const Job = (props) => {
  const { job } = props;

  const {
    archiveToggler,
    showingCoverLetterModal,
    showingResumeModal,
    showingJobDetails,
    setShowingJobDetails,
    jobs,
    setJobs,
    setApplyingSort,
  } = useContext(JobContext);

  const [color, setColor] = useState("");

  const archiveClickHandler = async (id) => {
    await archiveToggler(id);
  };

  const determineColor = (job) => {
    if (job.daysSinceInitialSubmission <= 30) {
      setColor("days-since-application-green");
    } else if (
      job.daysSinceInitialSubmission > 30 &&
      job.daysSinceInitialSubmission < 60
    ) {
      setColor("days-since-application-yellow");
    } else {
      setColor("days-since-application-red");
    }
  };

  const jobDetailsFilter = (id) => {
    let filtered = jobs.filter((job) => id === job._id);
    setJobs(filtered);
    setShowingJobDetails(true);
    setApplyingSort(false);
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    determineColor(job);
  }, [job]);

  return (
    <div
      className={
        showingCoverLetterModal || showingResumeModal || showingJobDetails
          ? "job-card-no-border"
          : "job-card"
      }
    >
      {showingJobDetails ? (
        <JobDetails job={job} jobDetailsFilter={jobDetailsFilter} />
      ) : (
        <JobCard
          job={job}
          jobDetailsFilter={jobDetailsFilter}
          archiveClickHandler={archiveClickHandler}
        />
      )}
    </div>
  );
};

export default Job;
