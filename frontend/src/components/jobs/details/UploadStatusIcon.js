import React from "react";

import { IoIosClose, IoIosCheckmark } from "react-icons/io";

const UploadStatusIcon = (props) => {
  const { status } = props;

  return (
    <span className="job-details__document-status">
      {status ? (
        <div className="status-icon-bg">
          <IoIosCheckmark className="job-details__green-check" />
        </div>
      ) : (
        <div className="status-icon-bg">
          <IoIosClose className="job-details__red-x" />
        </div>
      )}
    </span>
  );
};

export default UploadStatusIcon;
