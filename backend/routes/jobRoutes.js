const express = require("express");
const cloudinary = require("../cloudinary");

const JobApplication = require("../models/JobApplication");
const User = require("../models/User");

const router = express.Router();

// get all jobs
router.post("/", async (req, res) => {
  const { email } = req.body;
  let user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({ message: "User not found." });
  }

  JobApplication.find({}, (err, jobs) => {
    if (err) {
      console.log("Error: " + err);
      res.status(500).send(err.message);
    } else {
      const filtered = jobs?.filter((job) => {
        return user.sub === job.owner;
      });

      filtered?.forEach(async (job) => {
        let appDate = new Date(job.dateApplied);
        let currDate = new Date(Date.now());

        let difference = appDate.getTime() - currDate.getTime();
        let totalDays = Math.ceil(difference / (1000 * 3600 * 24)) * -1;

        job.daysSinceInitialSubmission = totalDays;
      });
      res.status(200).json(filtered);
    }
  });
});

// post new job application
router.post("/add-job/", (req, res) => {
  const jobApplication = new JobApplication(req.body);
  if (jobApplication.city) {
    let cleanedCity =
      jobApplication.city[0].toUpperCase() + jobApplication.city.substring(1);

    jobApplication.city = cleanedCity;
  }
  let cleanedTitle =
    jobApplication.title[0].toUpperCase() + jobApplication.title.substring(1);
  let cleanedCompany =
    jobApplication.company[0].toUpperCase() +
    jobApplication.company.substring(1);

  jobApplication.title = cleanedTitle;
  jobApplication.company = cleanedCompany;

  jobApplication
    .save()
    .then((jobApplication) => {
      res.json(jobApplication);
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
});

// edit job listing
router.patch("/edit-job/:id/", (req, res) => {
  const {
    title,
    company,
    jobSource,
    jobListing,
    levelOfInterest,
    postedSalary,
    postedSalaryType,
    jobType,
    country,
    city,
    state,
    remote,
  } = req.body;

  JobApplication.findById(req.params.id, function (err, job) {
    job.title = title;
    job.company = company;
    job.jobSource = jobSource;
    job.jobURL = jobListing;
    job.levelOfInterest = levelOfInterest;
    job.postedSalary = postedSalary;
    job.postedSalaryType = postedSalaryType;
    job.jobType = jobType;
    job.country = country;
    if (city) {
      job.city = city[0].toUpperCase() + city.substring(1);
    }
    job.state = state;
    if (remote) {
      job.isRemote = true;
    } else {
      job.isRemote = false;
    }

    job.save(function (err, job) {
      if (err) {
        console.log(err);
      } else {
        res.json(job);
      }
    });
  });
});

// expand job card
router.put("/expanded/:id/", (req, res) => {
  JobApplication.findById(req.params.id, function (err, job) {
    job.showingDetails = !job.showingDetails;
    job.save(function (err, job) {
      if (err) {
        console.log(err);
      } else {
        res.json(job);
      }
    });
  });
});

// move job to/from archive
router.put("/archive/:id/", (req, res) => {
  JobApplication.findById(req.params.id, function (err, job) {
    job.isArchived = !job.isArchived;
    job.save(function (err, job) {
      if (err) {
        console.log(err);
      } else {
        res.json(job);
      }
    });
  });
});

// delete job application
router.delete("/delete/:id/", async (req, res) => {
  try {
    const job = await JobApplication.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: "JobApplication not found." });
    }

    await job.remove();

    res.json({ message: "JobApplication deleted." });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error.");
  }
});

// upload pdf to cloudinary and save url to job application
router.put("/upload/:id/", async (req, res) => {
  try {
    const fileStr = req.body.data;
    const uploadedResponse = await cloudinary.uploader.upload(fileStr, {
      upload_preset: "wpqissme",
    });

    JobApplication.findById(req.params.id, function (err, job) {
      if (req.body.docType === "resume") {
        job.resumeUploadURL = uploadedResponse.url;
        if (job.resume === false) {
          job.resume = true;
        }
      } else if (req.body.docType === "coverLetter") {
        job.coverLetterUploadURL = uploadedResponse.url;
        if (job.coverLetter === false) {
          job.coverLetter = true;
        }
      }
      job.save(function (err, job) {
        if (err) {
          console.log(err);
        } else {
          res.json(job);
        }
      });
    });
  } catch (error) {
    console.log(error);
  }
});

// upload project url
router.put("/upload/project/:id/", function (req, res) {
  try {
    JobApplication.findById(req.params.id, function (err, job) {
      job.projectURL = req.body.projectURL;
      if (job.project === false) {
        job.project = true;
      }
      console.log("Saving project link: " + job.projectURL);

      job.save(function (err, job) {
        if (err) {
          console.log(err);
        } else {
          res.json(job);
        }
      });
    });
  } catch (err) {
    console.log(err);
    res.status(500).send(err.message);
  }
});

// update stage of job application
router.put("/stage/:id/", async (req, res) => {
  const { step } = req.body;
  try {
    JobApplication.findById(req.params.id, function (err, job) {
      job.stageOfApplication = step;
      job.save(function (err, job) {
        if (err) {
          console.log(err);
        } else {
          res.status(200).json({ job, message: `Step changed to ${step}` });
        }
      });
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Unable to update stage of job application." });
  }
});

//auto-archive old Listings
router.patch("/auto-archive/", async (req, res) => {
  const { email } = req.body;
  let user = await User.findOne({ email });

  if (user) {
    if (user.autoArchive === true) {
      JobApplication.find({}, (err, jobs) => {
        if (err) {
          console.log("Error: " + err);
          res.status(500).send(err.message);
        } else {
          let count = 0;
          let filtered = jobs.filter((job) => job.owner === user.sub);
          filtered?.forEach(async (job) => {
            let activityDate = new Date(job.lastActivityDate);
            let currDate = new Date(Date.now());

            let difference = activityDate.getTime() - currDate.getTime();
            let totalDays = Math.ceil(difference / (1000 * 3600 * 24)) * -1;
            if (totalDays > 120 && !job.isArchived && !job.autoArchived) {
              job.isArchived = true;
              job.autoArchived = true;
              count++;
              job.save(function (err, job) {
                if (err) {
                  console.log(err);
                }
              });
            }
          });

          res.status(200).json({ count });
        }
      });
    } else {
      return res
        .status(200)
        .json({ message: "Auto archive is not currently enabled." });
    }
  } else {
    res.status(400).json({ message: "User not found.  Please log in." });
  }
});

// update job activity date
router.put("/activity/:id/", (req, res) => {
  const { time } = req.body;

  try {
    JobApplication.findById(req.params.id, function (err, job) {
      job.lastActivityDate = time;
      job.save(function (err, job) {
        if (err) {
          console.log(err);
        } else {
          res.status(200).json({
            job,
            message: `Activity time updated to ${job.lastActivityDate}!`,
          });
        }
      });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error: " + err });
  }
});

// add new note
router.post("/add-note/:id/", (req, res) => {
  try {
    JobApplication.findById(req.params.id, function (err, job) {
      job.notes.unshift(req.body);
      job.save(function (err, job) {
        if (err) {
          console.log(err);
          res.status(500).json({ message: "Unable to save note." });
        } else {
          res.status(200).json({ message: "Note added successfully!" });
        }
      });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error: " + err });
  }
});

// delete Notes
router.patch("/delete-notes/:id/", (req, res) => {
  try {
    let count = 0;

    JobApplication.findById(req.params.id, function (err, job) {
      for (let i = req.body.length - 1; i >= 0; --i) {
        if (req.body[i] === true) {
          job.notes.splice(i, 1);
          count++;
        }
      }
      job.save(function (err, job) {
        if (err) {
          console.log(err);
          res.status(500).json({ message: "There was an error saving." });
        } else {
          res
            .status(200)
            .json({ message: `Successfully deleted ${count} notes.`, count });
        }
      });
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Something went wrong!" });
  }
});

module.exports = router;
