import React, { useContext } from "react";

import Spinner from "../../layout/loaders/Spinner";

import { JobContext } from "../../../helpers/JobContext";

const NoJobsMessage = (props) => {
  const { resultCount } = props;
  const { showingArchive, debouncedSearch, firstLoad } = useContext(JobContext);
  return (
    <>
      {resultCount === 0 && debouncedSearch === "" && firstLoad === false ? (
        showingArchive ? (
          <p className="no-archive-text">
            There are currently no jobs in your archive.
          </p>
        ) : (
          <p className="no-active-text">
            There are currently no jobs applications listed on your account. Add
            one to get started!
          </p>
        )
      ) : firstLoad === true ? (
        <Spinner />
      ) : (
        ""
      )}
    </>
  );
};

export default NoJobsMessage;
