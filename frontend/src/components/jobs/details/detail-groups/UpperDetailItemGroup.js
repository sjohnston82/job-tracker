import React from "react";

const UpperDetailItemGroup = (props) => {
  const { isEditing, job, titleInputRef, companyInputRef } = props;
  return (
    <div className="upper-item-details-wrapper">
      <div className="job-details__company job-details__info-line upper">
        <h6 className="job-details__info-line__title">Job Title</h6>
        {isEditing ? (
          <input
            ref={titleInputRef}
            defaultValue={job.title}
            className="job-details__edit-input"
          />
        ) : (
          <p className="job-details__info-line__value ">{job.title}</p>
        )}
      </div>
      <div className="job-details__company job-details__info-line upper">
        <h6 className="job-details__info-line__title">Company</h6>

        {isEditing ? (
          <input
            ref={companyInputRef}
            defaultValue={job.company}
            className="job-details__edit-input"
          />
        ) : (
          <p className="job-details__info-line__value">{job.company}</p>
        )}
      </div>
    </div>
  );
};

export default UpperDetailItemGroup;
