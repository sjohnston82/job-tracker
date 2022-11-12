import React, { useContext } from "react";

import { UserContext } from "../../../helpers/UserContext";
import { JobContext } from "../../../helpers/JobContext";
import { formatDate } from "../../../helpers/utils";

const AccountStats = () => {
  const { gatherStats, userData } = useContext(UserContext);

  const { jobs } = useContext(JobContext);

  let newDate = new Date(userData.date);

  let formattedDate = formatDate(newDate);

  const interviews = gatherStats(jobs, "interviews");
  const activeJobs =
    gatherStats(jobs, "numOfJobs") - gatherStats(jobs, "numOfJobsArchived");
  const archivedJobs = gatherStats(jobs, "numOfJobsArchived");
  const oldestListing = gatherStats(jobs, "oldestListing")
    ? gatherStats(jobs, "oldestListing")
    : 0;
  const offers = gatherStats(jobs, "offers");

  return (
    <div className="account-stats">
      <div className="account-stats__stat-container">
        <h6 className="account-stats__title">Active Jobs</h6>
        <p>
          {activeJobs}
        </p>
      </div>
      <div className="account-stats__stat-container">
        <h6 className="account-stats__title">Archived Jobs</h6>
        <p>{archivedJobs}</p>
      </div>
      <div className="account-stats__stat-container">
        <h6 className="account-stats__title">Oldest Job</h6>
        <p>
          {oldestListing}{" "}
          days
        </p>
      </div>
      <div className="account-stats__stat-container">
        <h6 className="account-stats__title">Account Created</h6>
        <p>{formattedDate}</p>
      </div>
      <div className="account-stats__stat-container">
        <h6 className="account-stats__title">Interview Rate</h6>
        {interviews ? <p>{Math.ceil(interviews * 100)}%</p> : <p>0</p>}
      </div>
      <div className="account-stats__stat-container">
        <h6 className="account-stats__title">Offers Received</h6>
        <p>{offers}</p>
      </div>
    </div>
  );
};

export default AccountStats;
