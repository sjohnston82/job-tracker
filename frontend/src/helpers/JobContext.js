import {
  createContext,
  useState,
  useCallback,
  useContext,
  useRef,
  useEffect,
} from "react";

import { UserContext } from "./UserContext";
import useDebounce from "./hooks/useDebounce";
import { getWindowSize } from "./utils";
import showToast from "./toasts";

import toast from "react-hot-toast";
const URL = "https://job-tracker.xyz";

const JobContext = createContext({});

const JobContextProvider = ({ children }) => {
  const { setShowingProfile, setShowingContact, user, userData, setUserData } =
    useContext(UserContext);

  const [jobs, setJobs] = useState([]);

  const [showingArchive, setShowingArchive] = useState(false);
  const [showingAddNewJob, setShowingAddNewJob] = useState(false);
  const [showingResumeModal, setShowingResumeModal] = useState(false);
  const [showingCoverLetterModal, setShowingCoverLetterModal] = useState(false);
  const [showingSearchbar, setShowingSearchbar] = useState(false);
  const [showingJobDetails, setShowingJobDetails] = useState(false);
  const [showingProjectInput, setShowingProjectInput] = useState(false);

  const [sortType, setSortType] = useState("");
  const [applyingSort, setApplyingSort] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const [isRemote, setIsRemote] = useState(null);
  const [isAmerica, setIsAmerica] = useState(null);

  const [windowSize, setWindowSize] = useState(getWindowSize());

  const [totalJobs, setTotalJobs] = useState(null);
  const [profileStats, setProfileStats] = useState({
    totalJobs: 0,
    activeJobs: 0,
    archivedJobs: 0,
    oldestJob: null,
    interviewRate: null,
    offersReceived: null,
  });

  const [firstLoad, setFirstLoad] = useState(true);

  const countryRef = useRef();
  const cityRef = useRef();
  const stateRef = useRef();

  useEffect(() => {
    function handleWindowResize() {
      setWindowSize(getWindowSize());
    }

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  const resetter = () => {
    setShowingArchive(false);
    setShowingProfile(false);
    setShowingAddNewJob(false);
    setShowingResumeModal(false);
    setShowingCoverLetterModal(false);
    setSearchTerm("");
    setShowingSearchbar(false);
    setShowingJobDetails(false);
    setShowingProjectInput(false);
    setApplyingSort(false);
    setItemOffset(0);
    setCurrentPage(1);
    setShowingContact(false);
    setIsRemote(null);
    setSortType(null);
  };

  const debouncedSearch = useDebounce(searchTerm, 500);

  const getJobs = useCallback(
    async (id = null) => {
      const response = await fetch(URL, {
        method: "POST",
        body: JSON.stringify({
          email: user?.email,
        }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.json();

      setFirstLoad(false);

      id !== null
        ? setJobs(data.filter((job) => id === job._id))
        : setJobs(data);
    },
    [user?.email]
  );

  const archiveToggler = (id) => {
    const res = fetch(`${URL}/archive/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        let toggled = jobs.map((job) => {
          return job._id === id
            ? {
                ...job,
                isArchived: !job.isArchived,
              }
            : { ...job };
        });
        setJobs(toggled);
      })
      .catch((err) => console.log(err));
    showingArchive
      ? showToast(res, "archive-toggle-on")
      : showToast(res, "archive-toggle-off");
  };

  const deleteJobListing = (id) => {
    let res = fetch(`${URL}/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        getJobs();
      });

    showToast(res, "delete");
  };

  const autoArchiveJobs = () => {
    const res = fetch(`${URL}/auto-archive`, {
      method: "PATCH",
      body: JSON.stringify({
        email: user?.email,
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        getJobs();
        if (data.count > 0) {
          showToast(res, "auto-archive", data.count);
        }
      });
  };

  const gatherUserInfo = (user) => {
    const res = fetch(`${URL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: user.name,
        email: user.email,
        sub: user.sub,
        displayName: "",
        avatar: user.picture,
        autoArchive: userData.autoArchive,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (userData.username === "") {
          showToast(res, "loading-user", data);
        }
        setUserData({
          username: data.user.username,
          email: data.user.email,
          sub: data.user.sub,
          displayName: data.user.displayName,
          avatar: data.user.avatar,
          autoArchive: data.user.autoArchive,
          date: data.user.date,
        });
      })
      .then(() => {
        autoArchiveJobs();
      });
  };

  // this function updates a timestamp saved as job.lastActivityDate
  // this timestamp is compared against current time to find inactive
  // job postings to auto archive
  const updateActivity = async (id) => {
    const res = await fetch(`${URL}/activity/${id}`, {
      method: "PUT",
      body: JSON.stringify({ time: Date.now() }),
      headers: { "Content-Type": "application/json" },
    });
    await res.json();
  };

  const handleRemote = (type) => {
    setIsRemote(type);
  };

  return (
    <JobContext.Provider
      value={{
        gatherUserInfo,

        firstLoad,
        setFirstLoad,

        jobs,
        setJobs,
        getJobs,
        deleteJobListing,
        archiveToggler,

        profileStats,
        setProfileStats,
        totalJobs,

        searchTerm,
        setSearchTerm,
        debouncedSearch,

        showingSearchbar,
        setShowingSearchbar,

        showingArchive,
        setShowingArchive,

        showingJobDetails,
        setShowingJobDetails,

        showingAddNewJob,
        setShowingAddNewJob,

        showingResumeModal,
        setShowingResumeModal,

        showingCoverLetterModal,
        setShowingCoverLetterModal,

        showingProjectInput,
        setShowingProjectInput,

        URL,
        resetter,
        toast,
        updateActivity,
        windowSize,

        pageCount,
        setPageCount,
        itemOffset,
        setItemOffset,
        currentPage,
        setCurrentPage,

        isRemote,
        setIsRemote,
        handleRemote,
        isAmerica,
        setIsAmerica,

        sortType,
        setSortType,
        applyingSort,
        setApplyingSort,

        countryRef,
        cityRef,
        stateRef,

        autoArchiveJobs,
      }}
    >
      {children}
    </JobContext.Provider>
  );
};

export { JobContext, JobContextProvider };
