import React, { useContext, useEffect } from "react";

import ListingStatus from "../../layout/ListingStatus";
import SearchClear from "../../layout/SearchClear";
import JobSort from "./JobSort";
import PaginationContainer from "./PaginationContainer";

import { JobContext } from "../../../helpers/JobContext";

import NoJobsMessage from "./NoJobsMessage";
import ArchiveReturnButton from "./ArchiveReturnButton";
import Jobs from "./Jobs";

const JobList = () => {
  const {
    jobs,
    showingJobDetails,
    showingArchive,
    debouncedSearch,
    setPageCount,
    itemOffset,
    setItemOffset,
    setCurrentPage,
    windowSize,
  } = useContext(JobContext);

  let itemsPerPage;

  if (windowSize?.innerWidth < 640) {
    itemsPerPage = 6;
  } else if (windowSize?.innerWidth > 1023 && windowSize?.innerWidth < 1440) {
    itemsPerPage = 9;
  } else {
    itemsPerPage = 12;
  }
  const endOffset = itemOffset + itemsPerPage;

  let resultCount = jobs
    ?.filter((job) => {
      if (
        job.title.toLowerCase().includes(debouncedSearch) ||
        job.company.toLowerCase().includes(debouncedSearch)
      ) {
        return job;
      }
    })
    .filter((job) =>
      showingArchive ? job.isArchived : !job.isArchived
    ).length;

  useEffect(() => {
    setPageCount(Math.ceil(resultCount / itemsPerPage));

    if (showingArchive || showingJobDetails) {
      setItemOffset(0);
    }
  }, [
    itemsPerPage,
    setPageCount,
    showingArchive,
    showingJobDetails,
    setItemOffset,
    resultCount,
  ]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % jobs.length;
    setCurrentPage(event.selected + 1);
    setItemOffset(newOffset);
  };

  return (
    <div className="job-list-container">
      <div className={showingJobDetails ? "job-wrapper-no-bg" : "job-wrapper"}>
        {!showingJobDetails && resultCount > 0 && (
          <div className="job-sort__container">
            <ListingStatus />
            <JobSort
              itemsPerPage={itemsPerPage}
              itemOffset={itemOffset}
              setItemOffset={setItemOffset}
            />
          </div>
        )}

        <NoJobsMessage resultCount={resultCount} />

        <ArchiveReturnButton />

        <SearchClear resultCount={resultCount} />

        <Jobs itemsPerPage={itemsPerPage} endOffset={endOffset} />
        <PaginationContainer handlePageClick={handlePageClick} />
      </div>
    </div>
  );
};

export default JobList;
