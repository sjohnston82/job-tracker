import toast from "react-hot-toast";

const showToast = (res, type, data = null) => {
  switch (type) {
    case "delete":
      return toast.promise(
        res,
        {
          loading: "Deleting job listing...",
          success: <b>Job listing successfully deleted!</b>,
          error: "Something went wrong!",
        },
        {
          style:
            window.innerWidth < 1023
              ? {
                  minWidth: "10rem",
                }
              : { minWidth: "20rem", minHeight: "3rem", fontSize: "1.2rem" },
          success: {
            duration: 2000,
            icon: "🔥",
          },
          error: {
            duration: 2000,
            icon: "🚫",
          },
        }
      );
    case "loading-user":
      return toast.promise(
        res,
        {
          loading: "Loading user...",
          success: `Welcome, ${data.user.displayName || data.user.username}!`,
          error: "Something went wrong!",
        },
        {
          style:
            window.innerWidth < 1023
              ? {
                  minWidth: "10rem",
                }
              : { minWidth: "15rem", minHeight: "3rem", fontSize: "1.2rem" },
          success: {
            duration: 2000,
            icon: "👋",
          },
          error: {
            duration: 2000,
            icon: "🚫",
          },
        }
      );
    case "auto-archive":
      return toast.promise(
        res,
        {
          loading: "Auto archiving jobs...",
          success: `Auto archived ${data} ${data === 1 ? "job!" : "jobs!"}`,
          error: "Something went wrong!",
        },
        {
          style:
            window.innerWidth < 1023
              ? {
                  minWidth: "10rem",
                }
              : { minWidth: "20rem", minHeight: "3rem", fontSize: "1.2rem" },
          success: {
            duration: 2000,
            icon: "🔥",
          },
          error: {
            duration: 2000,
            icon: "🚫",
          },
        }
      );
    case "archive-toggle-on":
      return toast.promise(
        res,
        {
          loading: "Archiving job...",
          success: <b>Returned job to active listings!</b>,
          error: "Something went wrong!",
        },
        {
          style:
            window.innerWidth < 1023
              ? {
                  minWidth: "10rem",
                }
              : { minWidth: "20rem", minHeight: "3rem", fontSize: "1.2rem" },
          success: {
            duration: 2000,
            icon: "🔥",
          },
          error: {
            duration: 2000,
            icon: "🚫",
          },
        }
      );
    case "archive-toggle-off":
      return toast.promise(
        res,
        {
          loading: "Archiving job...",
          success: <b>Successfully archived job listing!</b>,
          error: "Something went wrong!",
        },
        {
          style:
            window.innerWidth < 1023
              ? {
                  minWidth: "10rem",
                }
              : { minWidth: "20rem", minHeight: "3rem", fontSize: "1.2rem" },
          success: {
            duration: 2000,
            icon: "🔥",
          },
          error: {
            duration: 2000,
            icon: "🚫",
          },
        }
      );
    case "add-job":
      return toast.promise(
        res,
        {
          loading: "Saving new job application...",
          success: <b>Job Application successfully saved!</b>,
          error: "Something went wrong!",
        },
        {
          style:
            window.innerWidth < 1023
              ? {
                  minWidth: "10rem",
                }
              : { minWidth: "25rem", minHeight: "3rem", fontSize: "1.2rem" },
          success: {
            duration: 2000,
            icon: "✏️",
          },
          error: {
            duration: 2000,
            icon: "🚫",
          },
        }
      );
    case "save-project":
      return toast.promise(
        res,
        {
          loading: "Saving project link...",
          success: <b>Project link successfully saved!</b>,
          error: "Something went wrong!",
        },
        {
          style:
            window.innerWidth < 1023
              ? {
                  minWidth: "10rem",
                }
              : { minWidth: "20rem", minHeight: "3rem", fontSize: "1.2rem" },
          success: {
            duration: 2000,
            icon: "✏️",
          },
          error: {
            duration: 2000,
            icon: "🚫",
          },
        }
      );
    case "update-job-details":
      return toast.promise(
        res,
        {
          loading: "Updating job info...",
          success: "Successfully updated job info!",
          error: "Something went wrong!",
        },
        {
          style:
            window.innerWidth < 1023
              ? {
                  minWidth: "10rem",
                }
              : { minWidth: "20rem", minHeight: "3rem", fontSize: "1.2rem" },
          success: {
            duration: 2000,
            icon: "✏️",
          },
          error: {
            duration: 2000,
            icon: "🚫",
          },
        }
      );
    case "uploading-resume":
      return toast.promise(
        res,
        {
          loading: "Saving Resume...",
          success: <b>Resume successfully saved!</b>,
          error: "Something went wrong!",
        },
        {
          style:
            window.innerWidth < 1023
              ? {
                  minWidth: "10rem",
                }
              : { minWidth: "20rem", minHeight: "3rem", fontSize: "1.2rem" },
          success: {
            duration: 2000,
            icon: "✏️",
          },
          error: {
            duration: 2000,
            icon: "🚫",
          },
        }
      );
    case "uploading-coverletter":
      return toast.promise(
        res,
        {
          loading: "Saving Cover Letter...",
          success: <b>Cover Letter successfully saved!</b>,
          error: "Something went wrong!",
        },
        {
          style:
            window.innerWidth < 1023
              ? {
                  minWidth: "10rem",
                }
              : { minWidth: "25rem", minHeight: "3rem", fontSize: "1.2rem" },
          success: {
            duration: 2000,
            icon: "✏️",
          },
          error: {
            duration: 2000,
            icon: "🚫",
          },
        }
      );
    case "uploading-avatar":
      return toast.promise(
        res,
        {
          loading: "Uploading avatar...",
          success: <b>Avatar successfully uploaded!</b>,
          error: "Something went wrong!",
        },
        {
          style:
            window.innerWidth < 1023
              ? {
                  minWidth: "10rem",
                }
              : { minWidth: "20rem", minHeight: "3rem", fontSize: "1.2rem" },
          success: {
            duration: 2000,
            icon: "✏️",
          },
          error: {
            duration: 2000,
            icon: "🚫",
          },
        }
      );
    case "updating-profile-info":
      return toast.promise(
        res,
        {
          loading: "Saving new profile info...",
          success: <b>Profile info successfully saved!</b>,
          error: "Something went wrong!",
        },
        {
          style:
            window.innerWidth < 1023
              ? {
                  minWidth: "10rem",
                }
              : { minWidth: "20rem", minHeight: "3rem", fontSize: "1.2rem" },
          success: {
            duration: 2000,
            icon: "✏️",
          },
          error: {
            duration: 2000,
            icon: "🚫",
          },
        }
      );
    case "save-note":
      return toast.promise(
        res,
        {
          loading: "Saving new note...",
          success: <b>Note successfully saved!</b>,
          error: "Something went wrong!",
        },
        {
          style:
            window.innerWidth < 1023
              ? {
                  minWidth: "10rem",
                }
              : { minWidth: "25rem", minHeight: "3rem", fontSize: "1.2rem" },
          success: {
            duration: 2000,
            icon: "✏️",
          },
          error: {
            duration: 2000,
            icon: "🚫",
          },
        }
      );
    case "delete-notes":
      return toast.promise(
        res,
        {
          loading: data > 1 ? "Deleting notes..." : "Removing notes...",
          success: `Deleted ${data} ${data === 1 ? "note!" : "notes!"}`,
          error: "Something went wrong!",
        },
        {
          style:
            window.innerWidth < 1023
              ? {
                  minWidth: "10rem",
                }
              : { minWidth: "25rem", minHeight: "3rem", fontSize: "1.2rem" },
          success: {
            duration: 2000,
            icon: "✏️",
          },
          error: {
            duration: 2000,
            icon: "🚫",
          },
        }
      );
    case "send-contact-message":
      return toast.promise(
        res,
        {
          loading: "Sending message...",
          success: "Your message has been sent!",
          error: "Something went wrong!",
        },
        {
          style:
            window.innerWidth < 1023
              ? {
                  minWidth: "10rem",
                }
              : { minWidth: "25rem", minHeight: "3rem", fontSize: "1.2rem" },
          success: {
            duration: 2000,
            icon: "✏️",
          },
          error: {
            duration: 2000,
            icon: "🚫",
          },
        }
      );
    default:
      break;
  }
};

export default showToast;
