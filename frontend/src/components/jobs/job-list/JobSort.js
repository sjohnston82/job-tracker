import React, { useEffect, useContext } from "react";

import { JobContext } from "../../../helpers/JobContext";
import { MdSort } from "react-icons/md";

const JobSort = (props) => {
  const { itemsPerPage } = props;

  const {
    sortType,
    setSortType,
    showingArchive,
    applyingSort,
    setApplyingSort,
    showingJobDetails,
    setJobs,
    windowSize,
    jobs,
    itemOffset,
    setItemOffset,
  } = useContext(JobContext);

  let activeListings = jobs?.filter((job) => !job.isArchived);
  let archivedListings = jobs?.filter((job) => job.isArchived);

  useEffect(() => {
    const sortArray = (type) => {
      const sortMethod = {
        oldest: (a, b) => (b.dateApplied > a.dateApplied ? -1 : 1),
        newest: (a, b) => (b.dateApplied > a.dateApplied ? 1 : -1),
        company: (a, b) =>
          b.company.toLowerCase() > a.company.toLowerCase() ? -1 : 1,
        title: (a, b) =>
          b.title.toLowerCase() > a.title.toLowerCase() ? -1 : 1,
        statusDown: (a, b) =>
          b.stageOfApplication > a.stageOfApplication ? -1 : 1,
        statusUp: (a, b) =>
          a.stageOfApplication > b.stageOfApplication ? -1 : 1,
      };
      const sortProperty = sortMethod[type];
      const activeSorted = activeListings.sort(sortProperty);
      const archivedSorted = [...archivedListings].sort(sortProperty);

      if (!showingArchive) {
        setJobs(activeSorted);
      } else {
        setJobs(archivedSorted);
      }
    };

    sortArray(sortType);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    sortType,
    setItemOffset,
    itemOffset,
    itemsPerPage,
    showingArchive,
    setJobs,
  ]);

  const sortByOldest = () => {
    setSortType("oldest");
  };

  const sortByNewest = () => {
    setSortType("newest");
  };

  const sortByTitle = () => {
    setSortType("title");
  };

  const sortByCompany = () => {
    setSortType("company");
  };

  const sortByStatusUp = () => {
    setSortType("statusUp");
  };

  const sortByStatusDown = () => {
    setSortType("statusDown");
  };

  return windowSize.innerWidth < 1024 ? (
    <div className="sort-container">
      {applyingSort ? (
        <div className="sort-select-grp">
          <label htmlFor="sort-list">Sort By:</label>
          <select
            id="sort-list"
            name="sort-list"
            onChange={(e) => setSortType(e.target.value)}
            className="sort-container__select"
          >
            <option value="oldest">Oldest</option>
            <option value="newest">Newest</option>
            <option value="title">Title</option>
            <option value="company">Company</option>
            <option value="statusUp">Status {"  "} ⮝</option>
            <option value="statusDown">Status {"  "} ⮟</option>
          </select>
          <button
            className="hide-sort-btn"
            onClick={() => setApplyingSort(false)}
          >
            Hide
          </button>
        </div>
      ) : (
        <div className={showingJobDetails ? "none" : "sort-icon-wrapper"}>
          <span className={showingJobDetails ? "none" : "sort-icon"}>
            <MdSort
              onClick={() => setApplyingSort(true)}
              className={applyingSort && "none"}
            />
          </span>
        </div>
      )}
    </div>
  ) : (
    <div className="sort-container-lg">
      <h6 className="sort-text">Sort By:</h6>
      <div className="sort-btn-wrapper">
        <button
          className={
            sortType === "oldest" ? "sort-btn-lg active" : "sort-btn-lg"
          }
          id="oldest"
          onClick={sortByOldest}
        >
          Oldest
        </button>
        <button
          className={
            sortType === "newest" ? "sort-btn-lg active" : "sort-btn-lg"
          }
          id="newest"
          onClick={sortByNewest}
        >
          Newest
        </button>
        <button
          className={
            sortType === "title" ? "sort-btn-lg active" : "sort-btn-lg"
          }
          id="title"
          onClick={sortByTitle}
        >
          Title
        </button>
        <button
          className={
            sortType === "company" ? "sort-btn-lg active" : "sort-btn-lg"
          }
          id="company"
          onClick={sortByCompany}
        >
          Company
        </button>
        <button
          className={
            sortType === "statusUp" ? "sort-btn-lg active" : "sort-btn-lg"
          }
          id="status-up"
          onClick={sortByStatusUp}
        >
          Status {"  "} ⮝
        </button>
        <button
          className={
            sortType === "statusDown" ? "sort-btn-lg active" : "sort-btn-lg"
          }
          id="status-down"
          onClick={sortByStatusDown}
        >
          Status {"  "} ⮟
        </button>
      </div>
    </div>
  );
};

export default JobSort;
