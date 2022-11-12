import React from "react";

const AddJobSelectGroup = (props) => {
  const { onChangeHandler, formData } = props;
  return (
    <>
      <div className="form-group">
        <select
          name="jobSource"
          onChange={onChangeHandler}
          value={formData.jobSource}
          multiple={false}
          className="add-job-form-input"
        >
          <option value="" disabled>
            Job Source
          </option>
          <option value="Indeed">Indeed</option>
          <option value="AngelsList">AngelsList</option>
          <option value="LinkedIn">LinkedIn</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <div className="form-group">
        <select
          name="levelOfInterest"
          onChange={onChangeHandler}
          value={formData.levelOfInterest}
          multiple={false}
          className="add-job-form-input"
        >
          <option value="" disabled>
            Level of Interest
          </option>
          <option value="Very High">Very High</option>
          <option value="High">High</option>
          <option value="Average">Average</option>
          <option value="Low">Low</option>
        </select>
      </div>
      <div className="form-group">
        <select
          name="jobType"
          className="add-job-form-input"
          onChange={onChangeHandler}
          value={formData.jobType}
          multiple={false}
        >
          <option value="" disabled>
            Job Type
          </option>
          <option value="Full Time">Full Time</option>
          <option value="Part-Time">Part-Time</option>
          <option value="Contract">Contract</option>
          <option value="Internship">Internship</option>
        </select>
      </div>
    </>
  );
};

export default AddJobSelectGroup;
