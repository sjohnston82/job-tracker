import React from "react";

import LocationGroup from "./LocationGroup";

import { ImLink } from "react-icons/im";

const LowerDetailItemGroup = (props) => {
  const {
    job,
    jobSourceInputRef,
    isEditing,
    jobListingInputRef,
    levelOfInterestRef,
    jobTypeInputRef,
    postedSalaryRef,
    postedSalaryTypeRef,
    editingLocation,
    setEditingLocation,
    locationInfo,
    setLocationInfo,
  } = props;

  return (
    <div className="lower-grp-wrapper">
      <div className="job-details__source-url-container">
        <div className="job-details__info-line">
          <h6 className="job-details__info-line__title">Job Source</h6>
          {isEditing ? (
            <div className="form-group">
              <select
                name="jobSource"
                multiple={false}
                className="job-details__edit-select"
                ref={jobSourceInputRef}
              >
                <option value={job.jobSource}>{job.jobSource}</option>
                <option value="Indeed">Indeed</option>
                <option value="AngelsList">AngelsList</option>
                <option value="LinkedIn">LinkedIn</option>
                <option value="Other">Other</option>
              </select>
            </div>
          ) : job.jobSource === "" ? (
            <p className="no-info">Information Not Provided</p>
          ) : (
            <p className="job-details__info-line__value">{job.jobSource}</p>
          )}
        </div>

        <div className="job-details__info-line">
          <h6 className="job-details__info-line__title">
            Job Listing <ImLink className="job-details__link-icon" />
          </h6>
          {isEditing ? (
            <input
              ref={jobListingInputRef}
              defaultValue={job.jobURL}
              className="job-details__edit-input"
            />
          ) : job.jobURL === "" ? (
            <p className="no-info">Information Not Provided</p>
          ) : (
            <a
              className="job-details__info-line__value"
              href={
                job.jobURL?.includes("http")
                  ? `${job.jobURL}`
                  : `//${job.jobURL}`
              }
              target="_blank"
              rel="noreferrer"
            >
              Job Listing
            </a>
          )}
        </div>

        <div className="job-details__info-line">
          <h6 className="job-details__info-line__title">Level of Interest</h6>
          {isEditing ? (
            <select
              name="levelOfInterest"
              className="job-details__edit-select"
              multiple={false}
              ref={levelOfInterestRef}
            >
              <option value={job.levelOfInterest}>{job.levelOfInterest}</option>
              <option value="Very High">Very High</option>
              <option value="High">High</option>
              <option value="Average">Average</option>
              <option value="Low">Low</option>
            </select>
          ) : job.levelOfInterest === "" ? (
            <p className="no-info">Information Not Provided</p>
          ) : (
            <p className="job-details__info-line__value">
              {job.levelOfInterest}
            </p>
          )}
        </div>

        <div className="job-details__info-line">
          <h6 className="job-details__info-line__title">Job Type</h6>
          {isEditing ? (
            <select
              name="jobType"
              className="job-details__edit-select"
              multiple={false}
              ref={jobTypeInputRef}
            >
              <option value={job.jobType}>{job.jobType}</option>
              <option value="Full Time">Full Time</option>
              <option value="Part-Time">Part-Time</option>
              <option value="Contract">Contract</option>
              <option value="Internship">Internship</option>
            </select>
          ) : !job.jobType ? (
            <p className="no-info">Information Not Provided</p>
          ) : (
            <p className="job-details__info-line__value">{job.jobType}</p>
          )}
        </div>
        <div className="job-details__info-line">
          <h6 className="job-details__info-line__title">Posted Salary</h6>
          {isEditing ? (
            <div className="input-group-salary">
              <div className="input-icon">
                <input
                  type="number"
                  name="postedSalary"
                  defaultValue={job.postedSalary}
                  className="job-details__edit-input-salary"
                  ref={postedSalaryRef}
                  min="0"
                />
                <i>$</i>
              </div>
              <span> / </span>
              <select
                name="postedSalaryType"
                ref={postedSalaryTypeRef}
                multiple={false}
                className="job-details__edit-select-salary"
              >
                <option value="" disabled></option>
                <option value="year">year</option>
                <option value="hour">hour</option>
              </select>
            </div>
          ) : job.postedSalary === 0 ? (
            <p className="no-info">Information Not Provided</p>
          ) : (
            <p className="job-details__info-line__value">
              ${job.postedSalary}
              {job.postedSalaryType && " / "}
              {job.postedSalaryType}
            </p>
          )}
        </div>
        <LocationGroup
          editingLocation={editingLocation}
          job={job}
          setLocationInfo={setLocationInfo}
          setEditingLocation={setEditingLocation}
          isEditing={isEditing}
        />
      </div>
    </div>
  );
};

export default LowerDetailItemGroup;
