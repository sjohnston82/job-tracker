const mongoose = require("mongoose");

const JobApplication = new mongoose.Schema({
  title: {
    type: String,
  },
  dateApplied: {
    type: Date,
    default: new Date().getTime(),
  },
  dateAppliedReadable: {
    type: String,
    default: null,
  },
  daysSinceInitialSubmission: {
    type: Number,
    default: null,
  },
  jobURL: {
    type: String,
  },
  jobSource: {
    type: String,
  },
  postedSalary: {
    type: Number,
  },
  postedSalaryType: {
    type: String,
  },
  levelOfInterest: {
    type: String,
  },
  resume: {
    type: Boolean,
  },
  resumeUploadURL: {
    type: String,
    default: null,
  },
  coverLetter: {
    type: Boolean,
  },
  coverLetterUploadURL: {
    type: String,
    default: null,
  },
  project: {
    type: Boolean,
  },
  projectURL: {
    type: String,
    default: null,
  },
  projectLink: {
    type: String,
    default: null,
  },
  stageOfApplication: {
    type: Number,
    default: 0,
  },
  notes: {
    type: Array,
  },
  company: {
    type: String,
  },
  showingDetails: {
    type: Boolean,
    default: false,
  },
  isArchived: {
    type: Boolean,
    default: false,
  },
  autoArchived: {
    type: Boolean,
    default: false,
  },
  lastActivityDate: {
    type: Date,
    default: new Date().getTime(),
  },
  owner: {
    type: String,
    required: true,
  },
  jobType: {
    type: String,
  },
  isRemote: {
    type: Boolean,
  },
  country: {
    type: String,
  },
  city: {
    type: String,
  },
  state: {
    type: String,
  },
});

module.exports = mongoose.model("JobApplication", JobApplication);
