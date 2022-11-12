import React, { useEffect, Fragment, useContext } from "react";

import JobList from "./components/jobs/job-list/JobList";
import Profile from "./components/pages/profile/Profile";
import AddNewJobMobile from "./components/jobs/add-jobs/AddNewJobMobile";
import Landing from "./components/pages/landing/Landing";
import Contact from "./components/pages/Contact";
import NavBar from "./components/layout/NavBar";
import Footer from "./components/layout/Footer";
import Spinner from "./components/layout/loaders/Spinner";
import UpperButtonGroup from "./components/layout/UpperButtonGroup";

import { JobContext } from "./helpers/JobContext";
import { UserContext } from "./helpers/UserContext";

import { Toaster } from "react-hot-toast";

function App() {
  const { user, isAuthenticated, showingContact, showingProfile, isLoading } =
    useContext(UserContext);

  const { gatherUserInfo, showingAddNewJob, showingJobDetails } =
    useContext(JobContext);

  useEffect(() => {
    if (isAuthenticated) {
      gatherUserInfo(user);
    }
  }, [isAuthenticated, user]);

  if (isLoading) return <Spinner type="landing" />;

  return (
    <>
      <NavBar />
      <div>
        <Toaster position="bottom-center" />
      </div>
      <div className="main-container">
        {!isAuthenticated && !showingContact && <Landing />}
        {showingContact ? (
          <Contact />
        ) : (
          isAuthenticated && (
            <div className="main-div">
              {showingAddNewJob ? (
                <AddNewJobMobile className="addNewJobModal" />
              ) : (
                <Fragment>
                  {!showingJobDetails && !showingProfile && (
                    <UpperButtonGroup />
                  )}
                  {showingProfile ? <Profile /> : <JobList />}
                </Fragment>
              )}
            </div>
          )
        )}
      </div>
      {!showingContact && <Footer />}
    </>
  );
}

export default App;
