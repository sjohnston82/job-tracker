import React, { useContext } from "react";

import { JobContext } from "../../../helpers/JobContext";
import showToast from "../../../helpers/toasts";

const SaveProjectInput = (props) => {
  const { job, setLoading, projectInputRef } = props;

  const { URL, getJobs, setShowingProjectInput, windowSize } =
    useContext(JobContext);

  const handleSaveProjectURL = (e, id) => {
    e.preventDefault();
    setLoading(true);

    let projectURL = projectInputRef.current?.value;
    const res = fetch(`${URL}/upload/project/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ projectURL }),
    })
      .then((res) => res.json())
      .then((data) => {
        getJobs(job._id);
        setShowingProjectInput(false);
        setLoading(false);
      })
      .catch((err) => console.log(err));

    showToast(res, "save-project");
  };

  return windowSize.innerWidth < 1024 ? (
    <div className="project-url__container">
      <input
        ref={projectInputRef}
        type="text"
        id="project-url"
        name="project-url"
        className="project-url__input"
        placeholder="Enter Project URL"
      />
      <button
        className="job-details__upload-btn-project"
        onClick={(e) => handleSaveProjectURL(e, job._id)}
      >
        Submit
      </button>
      <button
        className="job-details__upload-btn-project-x"
        onClick={() => setShowingProjectInput(false)}
      >
        
        &times;
      </button>
    </div>
  ) : (
    <div className="save-project-container">
      <input
        ref={projectInputRef}
        type="text"
        id="project-url"
        name="project-url"
        placeholder="Enter Project URL"
        className="save-project-input"
      />
      <div className="save-project-btns">
        <button
          className="save-project-btn"
          onClick={() => setShowingProjectInput(false)}
        >
          Cancel
        </button>
        <button
          className="save-project-btn"
          onClick={(e) => handleSaveProjectURL(e, job._id)}
        >
          Save Project
        </button>
      </div>
    </div>
  );
};

export default SaveProjectInput;
