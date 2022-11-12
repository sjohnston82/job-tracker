import React, { useContext, useEffect, useState, useRef } from "react";

import AddNewDocument from "../uploads/AddNewDocument";
import JobDetailsDateGroup from "./detail-groups/JobDetailsDateGroup";
import UpperDetailItemGroup from "./detail-groups/UpperDetailItemGroup";
import LowerDetailItemGroup from "./detail-groups/LowerDetailItemGroup";
import DocumentsGroup from "./detail-groups/DocumentsGroup";
import StepsContainer from "./StepsContainer";

import { JobContext } from "../../../helpers/JobContext";

import { ImArrowLeft } from "react-icons/im";
import showToast from "../../../helpers/toasts";

const JobDetails = (props) => {
  const { job } = props;

  const [color, setColor] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploadingResume, setUploadingResume] = useState(false);
  const [uploadingCoverLetter, setUploadingCoverLetter] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingLocation, setEditingLocation] = useState(false);
  const [locationInfo, setLocationInfo] = useState({
    country: "",
    city: "",
    state: "",
  });

  const titleInputRef = useRef();
  const companyInputRef = useRef();
  const jobSourceInputRef = useRef();
  const jobListingInputRef = useRef();
  const levelOfInterestRef = useRef();
  const postedSalaryTypeRef = useRef();
  const postedSalaryRef = useRef();
  const jobTypeInputRef = useRef();

  const {
    getJobs,
    showingResumeModal,
    showingCoverLetterModal,
    URL,
    isRemote,
    setIsRemote,
    resetter,
    windowSize,
    showingJobDetails,
    showingArchive,
    setShowingArchive,
    setShowingProjectInput,
  } = useContext(JobContext);

  const determineColor = (job) => {
    if (job.daysSinceInitialSubmission <= 30) {
      setColor("days-since-application-green");
    } else if (
      job.daysSinceInitialSubmission > 30 &&
      job.daysSinceInitialSubmission < 60
    ) {
      setColor("days-since-application-yellow");
    } else {
      setColor("days-since-application-red");
    }
  };

  const unfilterJobs = () => {
    if (showingJobDetails && showingArchive) {
      resetter();
      getJobs();
      setShowingArchive(true);
    } else {
      resetter();
      getJobs();
    }
  };

  const handleEditUpdate = (e, id) => {
    e.preventDefault();

    const res = fetch(`${URL}/edit-job/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: titleInputRef.current?.value,
        company: companyInputRef.current?.value,
        jobSource: jobSourceInputRef.current?.value,
        jobListing: jobListingInputRef.current?.value,
        levelOfInterest: levelOfInterestRef.current?.value,
        postedSalary: postedSalaryRef.current?.value,
        postedSalaryType: postedSalaryTypeRef.current?.value,
        jobType: jobTypeInputRef.current?.value,
        country: locationInfo?.country,
        city: locationInfo?.city,
        state: locationInfo?.state,
        remote: isRemote,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        getJobs(id);
        setIsEditing(false);
        setEditingLocation(false);
        setIsRemote(null);
        showToast(res, "update-job-details");
      });
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditingLocation(false);
    setShowingProjectInput(false);
    setIsRemote(null);
  };

  useEffect(() => {
    setLocationInfo((prev) => ({
      ...prev,
      country: job.country,
      city: job.city,
      state: job.state,
    }));
  }, [job.city, job.country, job.state]);

  useEffect(() => {
    determineColor(job);

    if (job.resumeUploadURL) {
      setUploadingResume(false);
    }
  }, [job, uploadingResume]);

  return (
    <div className="job-details">
      {showingResumeModal || showingCoverLetterModal ? (
        <AddNewDocument
          job={job}
          type={showingResumeModal ? "resume" : "coverLetter"}
          uploadingResume={uploadingResume}
          setUploadingResume={setUploadingResume}
          uploadingCoverLetter={uploadingCoverLetter}
          setUploadingCoverLetter={setUploadingCoverLetter}
        />
      ) : (
        <div className="job-details__container">
          <div className="job-details__upper-btn-container">
            <ImArrowLeft
              onClick={unfilterJobs}
              className={isEditing ? "hidden" : "job-details__back-arrow "}
            />
            <p className="job-details__header-text">
              {isEditing ? "Editing Details" : "Application Details"}
            </p>
            {!isEditing && (
              <button
                className="job-details__edit-btn"
                onClick={() => setIsEditing(true)}
              >
                EDIT
              </button>
            )}
          </div>
          <div className="info-line-wrapper">
            <UpperDetailItemGroup
              isEditing={isEditing}
              job={job}
              titleInputRef={titleInputRef}
              companyInputRef={companyInputRef}
            />

            <JobDetailsDateGroup job={job} color={color} />

            <LowerDetailItemGroup
              job={job}
              isEditing={isEditing}
              jobSourceInputRef={jobSourceInputRef}
              jobListingInputRef={jobListingInputRef}
              levelOfInterestRef={levelOfInterestRef}
              jobTypeInputRef={jobTypeInputRef}
              postedSalaryTypeRef={postedSalaryTypeRef}
              postedSalaryRef={postedSalaryRef}
              editingLocation={editingLocation}
              setEditingLocation={setEditingLocation}
              locationInfo={locationInfo}
              setLocationInfo={setLocationInfo}
            />
          </div>

          <DocumentsGroup
            job={job}
            isEditing={isEditing}
            uploadingResume={uploadingResume}
            uploadingCoverLetter={uploadingCoverLetter}
            loading={loading}
            setLoading={setLoading}
            className="doc-group"
          />
          <div
            className={
              windowSize.innerWidth < 1024 && isEditing
                ? "none"
                : "job-details__steps-container"
            }
          >
            <h6>Stage of Application Process</h6>
            <StepsContainer job={job} />
          </div>

          {isEditing && (
            <div className="edit-btn-lower-grp">
              <button onClick={handleCancelEdit} className="lower-edit-btn">
                CANCEL
              </button>
              <button
                onClick={(e) => handleEditUpdate(e, job._id)}
                className="lower-edit-btn"
              >
                SAVE
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default JobDetails;
