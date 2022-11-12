import React, { useContext, useRef } from "react";

import { JobContext } from "../../../../helpers/JobContext";

import EllipsisSpinner from "../../../layout/loaders/EllipsisSpinner";
import UploadStatusIcon from "../UploadStatusIcon";
import SaveProjectInput from "../../uploads/SaveProjectInput";
import Notes from "../Notes";

const DocumentsGroup = (props) => {
  const {
    job,
    isEditing,
    uploadingResume,
    uploadingCoverLetter,
    loading,
    setLoading,
  } = props;

  const {
    setShowingProjectInput,
    showingProjectInput,
    setShowingResumeModal,
    setShowingCoverLetterModal,
    windowSize,
  } = useContext(JobContext);

  const projectInputRef = useRef("");

  const handleShowProjectInput = () => {
    setShowingProjectInput(true);
  };

  const handleResumeUpload = () => {
    setShowingResumeModal(true);
    window.scrollTo(0, 0);
  };

  const handleCoverLetterUpload = () => {
    setShowingCoverLetterModal(true);
    window.scrollTo(0, 0);
  };
  return (
    <>
      <div className="job-details__documents">
        <h6 className="documents-header-text">Documents</h6>

        <div className="job-details__document-container">
          <div className="job-details__document-div">
            <p className="job-details__document-title">Resume</p>
            <UploadStatusIcon status={job.resume} />

            {uploadingResume ? (
              <button className="job-details__upload-btn">
                <EllipsisSpinner />
              </button>
            ) : job.resumeUploadURL && !isEditing ? (
              <button className="job-details__view-document-btn">
                <a href={job.resumeUploadURL} target="_blank" rel="noreferrer">
                  View Resume
                </a>
              </button>
            ) : (
              <button
                className="job-details__upload-btn"
                onClick={handleResumeUpload}
              >
                {isEditing && job.resumeUploadURL
                  ? "Change Resume"
                  : "Upload Resume"}
              </button>
            )}
          </div>
          <div className="job-details__document-div">
            <p className="job-details__document-title">Cover Letter</p>
            <UploadStatusIcon status={job.coverLetter} />
            {uploadingCoverLetter ? (
              <button className="job-details__upload-btn">
                <EllipsisSpinner />
              </button>
            ) : job.coverLetterUploadURL && !isEditing ? (
              <button className="job-details__view-document-btn">
                <a
                  href={job.coverLetterUploadURL}
                  target="_blank"
                  rel="noreferrer"
                >
                  View Cover Letter
                </a>
              </button>
            ) : (
              <button
                className="job-details__upload-btn"
                onClick={handleCoverLetterUpload}
              >
                {isEditing && job.coverLetterUploadURL
                  ? "Change Cover Letter"
                  : "Upload Cover Letter"}
              </button>
            )}
          </div>
          <div className="job-details__document-div">
            <p className="job-details__document-title">Project</p>
            <UploadStatusIcon status={job.project} />
            {job.projectURL && !isEditing ? (
              <button className="job-details__upload-btn">
                <a
                  href={
                    job.projectURL.includes("http")
                      ? `${job.projectURL}`
                      : `//${job.projectURL}`
                  }
                  target="_blank"
                  rel="noreferrer"
                >
                  View Project
                </a>
              </button>
            ) : (
              <button
                className="job-details__upload-btn"
                onClick={handleShowProjectInput}
              >
                {loading ? (
                  <EllipsisSpinner />
                ) : !job.projectURL ? (
                  "Save Project URL"
                ) : (
                  "Project Link"
                )}
              </button>
            )}
          </div>
        </div>
        {showingProjectInput && (
          <div className="job-details__save-project-input">
            <SaveProjectInput
              job={job}
              loading={loading}
              setLoading={setLoading}
              projectInputRef={projectInputRef}
            />
          </div>
        )}
      </div>
      <div
        className={
          windowSize.innerWidth < 1024 && isEditing ? "none" : "notes-wrapper"
        }
      >
        <Notes job={job} />
      </div>
    </>
  );
};

export default DocumentsGroup;
