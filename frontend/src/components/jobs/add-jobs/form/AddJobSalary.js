import React from "react";

const AddJobSalary = (props) => {
  const { onChangeHandler, formData } = props;
  return (
    <div className="form-group-salary">
      <label htmlFor="postedSalary">Posted Salary </label>
      <div className="input-group-salary">
        <div className="input-icon">
          <input
            type="number"
            name="postedSalary"
            onChange={onChangeHandler}
            value={formData.postedSalary}
            className="add-job-form-input salary"
            placeholder="0"
            min="0"
          />
          <i>$</i>
        </div>
        <span> / </span>
        <select
          name="postedSalaryType"
          className="add-job-form-input"
          onChange={onChangeHandler}
          value={formData.postedSalaryType}
          multiple={false}
        >
          <option value=""></option>
          <option value="year">year</option>
          <option value="hour">hour</option>
        </select>
      </div>
    </div>
  );
};

export default AddJobSalary;
