import React from "react";

const JobDetailsDateGroup = ({ job, color }) => {
  return (
    <div className="job-details__date-grp">
      <div className="job-details__date-grp__item">
        <div className="title-wrap">
          <h6 className="job-details__date-grp__item__title">Date Applied</h6>
        </div>
        <p className="job-details__date-grp__item__value">
          {job.dateAppliedReadable}
        </p>
      </div>
      <div className="job-details__date-grp__item">
        <div className="title-wrap">
          <h6 className="job-details__date-grp__item__title">
            Days Since Application
          </h6>
        </div>

        <p className={`job-details__date-grp__item__value ${color} `}>
          {job.daysSinceInitialSubmission}
        </p>
      </div>
    </div>
  );
};

export default JobDetailsDateGroup;
