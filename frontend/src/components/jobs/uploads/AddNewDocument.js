import React, { useState, useContext } from "react";

import Upload from "./Upload";

import { JobContext } from "../../../helpers/JobContext";

const AddNewResumeModal = (props) => {
  const {
    job,
    type,
    uploadingResume,
    setUploadingResume,
    uploadingCoverLetter,
    setUploadingCoverLetter,
  } = props;
  const [previewSource, setPreviewSource] = useState("");
  const { setShowingResumeModal, setShowingCoverLetterModal } =
    useContext(JobContext);

  const closeModal = () => {
    setShowingResumeModal(false);
    setShowingCoverLetterModal(false);
  };
  return (
    <div className="resume-modal-background">
      <div className="resume-modal-container">
        <button className="close-modal-btn" onClick={closeModal}>
          &times;
        </button>
        <Upload
          job={job}
          previewSource={previewSource}
          setPreviewSource={setPreviewSource}
          type={type}
          uploadingResume={uploadingResume}
          setUploadingResume={setUploadingResume}
          setUploadingCoverLetter={setUploadingCoverLetter}
          uploadingCoverLetter={uploadingCoverLetter}
        />
      </div>
    </div>
  );
};

export default AddNewResumeModal;
