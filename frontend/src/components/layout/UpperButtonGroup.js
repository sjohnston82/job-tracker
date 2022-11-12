import React, { useContext, useRef } from "react";

import SearchBar from "./SearchBar";

import { JobContext } from "../../helpers/JobContext";
import { UserContext } from "../../helpers/UserContext";

import { IoIosAddCircleOutline } from "react-icons/io";
import { MdArchive } from "react-icons/md";

const UpperButtonGroupMobile = () => {
  const {
    showingSearchbar,
    setShowingSearchbar,
    setShowingAddNewJob,
    resetter,
    setShowingArchive,
    showingArchive,
    windowSize,
    getJobs,
    jobs
  } = useContext(JobContext);

  const { gatherStats } = useContext(UserContext);

  const activeJobs = gatherStats(jobs, "numOfJobsActive")
  const inputRef = useRef();

  const handleSearchClick = () => {
    setShowingSearchbar(true);
    const timer = setTimeout(() => {
      inputRef.current.focus();
    }, 100);
    return () => clearTimeout(timer);
  };

  const handleButtonClick = (type) => {
    resetter();
    if (type === "add-job") {
      setShowingAddNewJob(true);
    }
    if (type === "archive") {
      setShowingArchive(true);
      getJobs();
    }
  };

  return windowSize?.innerWidth < 1024 ? (
    <div className="upper-btn-group-mobile">
      {!showingSearchbar && (
        <IoIosAddCircleOutline
          className={
            activeJobs === 0 && !showingArchive
              ? "pulse"
              : "upper-btn-group-mobile-icon"
          }
          onClick={() => handleButtonClick("add-job")}
          color="#eee"
        />
      )}
      <div
        className="searchbar-container"
        onFocus={() => handleSearchClick()}
        onBlur={() => {
          setShowingSearchbar(false);
          inputRef.current.blur();
        }}
      >
        <SearchBar inputRef={inputRef} handleSearchClick={handleSearchClick} />
      </div>
      {!showingSearchbar && (
        <MdArchive
          className="upper-btn-group-mobile-icon"
          onClick={() => handleButtonClick("archive")}
          alt="Archived Job Applications"
          color="#eee"
        />
      )}
    </div>
  ) : (
    <div className="upper-btn-group-mobile">
      <button
        className="upper-btn-lg"
        onClick={() => handleButtonClick("add-job")}
      >
        ADD NEW JOB
      </button>
      <div className="searchbar-container" onFocus={() => handleSearchClick()}>
        <SearchBar inputRef={inputRef} handleSearchClick={handleSearchClick} />
      </div>
      <button
        className="upper-btn-lg"
        onClick={() => handleButtonClick("archive")}
      >
        SHOW ARCHIVE
      </button>
    </div>
  );
};

export default UpperButtonGroupMobile;
