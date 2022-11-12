import { createContext, useState, useCallback } from "react";

import { useAuth0 } from "@auth0/auth0-react";

const UserContext = createContext({});

const UserContextProvider = ({ children }) => {
  const { isLoading, isAuthenticated, user } = useAuth0();

  const [userData, setUserData] = useState({
    username: "",
    email: "",
    sub: "",
    displayName: "",
    avatar: "",
    date: "",
  });
  const [showingContact, setShowingContact] = useState(false);
  const [showingProfile, setShowingProfile] = useState(false);

  const gatherStats = useCallback(
    (jobs, type) => {
      const numOfJobs = jobs?.filter(
        (job) => job.owner === userData.sub
      ).length;
      switch (type) {
        case "numOfJobs":
          return numOfJobs;
        case "numOfJobsActive":
          return jobs?.filter(
            (job) => job.owner === userData.sub && !job.isArchived
          ).length;
        case "numOfJobsArchived":
          return jobs?.filter(
            (job) => job.owner === userData.sub && job.isArchived
          ).length;
        case "oldestListing":
          return jobs
            ?.filter((job) => job.owner === userData.sub)
            .sort((a, b) => (b.dateApplied > a.dateApplied ? -1 : 1))[0]
            ?.daysSinceInitialSubmission;
        case "interviews":
          return (
            jobs?.filter((job) => job.stageOfApplication > 0).length / numOfJobs
          );
        case "offers":
          return jobs?.filter((job) => job.stageOfApplication === 3).length;
        default:
          break;
      }
    },
    [userData.sub]
  );
  return (
    <UserContext.Provider
      value={{
        user,
        userData,
        setUserData,
        isAuthenticated,
        isLoading,
        gatherStats,
        showingContact,
        setShowingContact,
        showingProfile,
        setShowingProfile,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserContextProvider };
