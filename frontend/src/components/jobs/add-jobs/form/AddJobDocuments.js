import React from "react";

const AddJobDocuments = (props) => {
  const { formData, handleCheckboxToggle } = props;
  return (
    <div className="documents">
      <label htmlFor="documentsProvided" className="documents-header">
        Which documents did you provide with your application?
      </label>
      <div className="documents__input-wrapper">
        <div className="documents__input-container">
          <label className="documents-label" htmlFor="resume" id="resume-label">
            Resume
          </label>
          <input
            type="checkbox"
            name="resume"
            id="resume-checkbox"
            onChange={handleCheckboxToggle}
            checked={formData.resume}
            className="new-job-checkbox"
          />
          <span className="checkmark"></span>
        </div>

        <div className="documents__input-container">
          <label
            htmlFor="coverLetter"
            className="documents-label"
            id="coverLetter-label"
          >
            Cover Letter
          </label>
          <input
            type="checkbox"
            name="coverLetter"
            id="coverLetter-checkbox"
            onChange={handleCheckboxToggle}
            checked={formData.coverLetter}
            className="new-job-checkbox"
          />
          <span className="checkmark"></span>
        </div>

        <div className="documents__input-container">
          <label
            htmlFor="project"
            className="documents-label"
            id="project-label"
          >
            Project
          </label>
          <input
            type="checkbox"
            name="project"
            id="project-checkbox"
            onChange={handleCheckboxToggle}
            checked={formData.project}
            className="new-job-checkbox"
          />
          <span className="checkmark"></span>
        </div>
      </div>
    </div>
  );
};

export default AddJobDocuments;
