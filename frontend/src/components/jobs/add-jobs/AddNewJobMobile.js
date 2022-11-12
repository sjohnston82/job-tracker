import React, { useContext, Fragment } from "react";

import AddNewJob from "./AddNewJob";

import { JobContext } from "../../../helpers/JobContext";

const AddNewJobModal = () => {
  const { resetter } = useContext(JobContext);

  return (
    <Fragment>
      <div className="add-new-job__background">
        <div className="add-new-job__container">
          <button className="add-new-job-close-btn" onClick={resetter}>
            &times;
          </button>
          <AddNewJob />
        </div>
      </div>
    </Fragment>
  );
};

export default AddNewJobModal;
