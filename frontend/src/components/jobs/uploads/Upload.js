import React, { useState, useContext, useEffect } from "react";

import { Document, Page } from "react-pdf/dist/esm/entry.webpack";

import { JobContext } from "../../../helpers/JobContext";
import showToast from "../../../helpers/toasts";

const Upload = (props) => {
  const {
    job,
    previewSource,
    setPreviewSource,
    type,
    setUploadingResume,
    setUploadingCoverLetter,
  } = props;

  const {
    setShowingResumeModal,
    setShowingCoverLetterModal,
    getJobs,
    updateActivity,
    URL,
    windowSize,
  } = useContext(JobContext);

  const [fileInputState] = useState("");
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [deviceSize, setDeviceSize] = useState(250);

  useEffect(() => {
    if (windowSize.innerWidth > 479 && windowSize.innerWidth < 560) {
      setDeviceSize(350);
    } else if (windowSize.innerWidth > 559 && windowSize.innerWidth < 640) {
      setDeviceSize(350);
    } else if (windowSize.innerWidth > 639 && windowSize.innerWidth < 768) {
      setDeviceSize(400);
    } else if (windowSize.innerWidth > 767 && windowSize.innerWidth < 1024) {
      setDeviceSize(450);
    } else if (windowSize.innerWidth > 1023 && windowSize.innerWidth < 1248) {
      setDeviceSize(550);
    } else if (windowSize.innerWidth > 1247 && windowSize.innerWidth < 1440) {
      setDeviceSize(600);
    } else if (windowSize.innerWidth > 1439) {
      setDeviceSize(750);
    } else {
      setDeviceSize(250);
    }
  }, [windowSize.innerWidth]);

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    previewFile(file);
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  const handleSubmitFile = async (e) => {
    e.preventDefault();
    if (!previewSource) return;
    if (type === "resume") {
      setUploadingResume(true);
      await getJobs(job._id);
      setShowingResumeModal(false);
      uploadFile(previewSource, job._id);
      setUploadingResume(false);
    } else if (type === "coverLetter") {
      setUploadingCoverLetter(true);
      await getJobs(job._id);
      setShowingCoverLetterModal(false);
      uploadFile(previewSource, job._id);
      setUploadingCoverLetter(false);
    }
  };

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  function changePage(offSet) {
    setPageNumber((prevPageNumber) => prevPageNumber + offSet);
  }

  function changePageBack() {
    changePage(-1);
  }

  function changePageNext() {
    changePage(+1);
  }

  function chooseToast(res, type) {
    if (type === "resume") {
      showToast(res, "uploading-resume");
    } else if (type === "coverLetter") {
      showToast(res, "uploading-coverletter");
    }
  }

  const uploadFile = (base64encodedFile, id) => {
    const res = fetch(`${URL}/upload/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data: base64encodedFile, docType: type }),
    })
      .then((res) => res.json())
      .then((data) => {
        updateActivity(job._id);
        getJobs(job._id);
        chooseToast(res, type);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="upload-wrapper">
      <label className="file-upload">
        <input
          type="file"
          name="pdf"
          id="pdf"
          accept=".pdf"
          onChange={handleFileInputChange}
          value={fileInputState}
          className="form-input"
        />
        {!previewSource && <i className="upload-submit-btn">Choose PDF</i>}
      </label>
      <div className="preview-container">
        {previewSource ? (
          <div className="viewer-container">
            <Document
              file={previewSource}
              onLoadSuccess={onDocumentLoadSuccess}
              className="pdf-document"
              pageLayout="oneColumn"
            >
              <Page
                width={deviceSize}
                pageNumber={pageNumber}
                debug={true}
                className="pdf-page"
              />
            </Document>
            <div className="page-number-upload-grp">
              {numPages > 1 && (
                <>
                  <button
                    onClick={changePageBack}
                    className="page-number-vis-prev"
                    disabled={pageNumber === 1}
                  >
                    {"<"}
                  </button>

                  <p className="page-number-text">
                    {" "}
                    {pageNumber} of {numPages}
                  </p>

                  <button
                    onClick={changePageNext}
                    className="page-number-vis"
                    disabled={pageNumber >= numPages}
                  >
                    {">"}
                  </button>
                </>
              )}
            </div>
          </div>
        ) : (
          <div className="no-preview-source">Preview area</div>
        )}
      </div>
      {previewSource && (
        <button
          onClick={handleSubmitFile}
          type="submit"
          className="upload-submit-btn"
        >
          {type === "resume" ? "Upload Resume" : "Upload Cover Letter"}
        </button>
      )}
    </div>
  );
};

export default Upload;
