import React from "react";

const AddJobFormInput = (props) => {
  const { formData, onChangeHandler, name, placeholder, required } = props;
  return (
    <div className="form-group">
      <input
        type="text"
        name={name}
        onChange={onChangeHandler}
        value={formData[name]}
        placeholder={placeholder}
        className="add-job-form-input"
        required={required}
      />
    </div>
  );
};

export default AddJobFormInput;
