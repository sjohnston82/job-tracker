import React, { useState, Fragment, useContext } from "react";

import LocationSelect from "./location/LocationSelect";

import AddJobDocuments from "./form/AddJobDocuments";
import AddJobSalary from "./form/AddJobSalary";
import AddJobFormInput from "./form/AddJobFormInput";
import AddJobSelectGroup from "./form/AddJobSelectGroup";

import { JobContext } from "../../../helpers/JobContext";
import { UserContext } from "../../../helpers/UserContext";
import { formatDate } from "../../../helpers/utils";
import showToast from "../../../helpers/toasts";

const AddNewJob = () => {
  const { getJobs, isRemote, handleRemote, resetter, URL } =
    useContext(JobContext);
  const { user } = useContext(UserContext);

  const [formData, setFormData] = useState({
    title: "",
    dateApplied: new Date(Date.now()),
    dateAppliedReadable: null,
    daysSinceInitialSubmission: null,
    jobURL: "",
    jobSource: "",
    postedSalary: 0,
    postedSalaryType: "",
    levelOfInterest: "",
    resume: false,
    coverLetter: false,
    project: false,
    stageOfApplication: 0,
    notes: [],
    company: "",
    jobType: "",
    isRemote: null,
    country: undefined,
    city: undefined,
    state: undefined,
  });

  const formResetter = () => {
    setFormData({
      title: "",
      dateApplied: Date.now(),
      dateAppliedReadable: null,
      daysSinceInitialSubmission: null,
      jobURL: "",
      jobSource: "",
      postedSalary: 0,
      postedSalaryType: "",
      levelOfInterest: "",
      resume: false,
      coverLetter: false,
      project: false,
      stageOfApplication: 0,
      notes: [],
      company: "",
      jobType: "",
      isRemote: null,
      country: undefined,
      city: undefined,
      state: undefined,
    });
    handleRemote(false);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

    let formattedDate = formatDate(formData.dateApplied);

    const res = fetch(`${URL}/add-job/`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...formData,
        dateAppliedReadable: formattedDate,
        owner: user.sub,
        isRemote,
      }),
    })
      .then((res) => res.json())
      .then(() => {
        formResetter();
        getJobs();
        resetter();
      })
      .catch((error) => {
        console.log(error);
      });

    showToast(res, "add-job");
  };

  const onChangeHandler = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCheckboxToggle = ({ target }) => {
    setFormData((prevState) => ({
      ...prevState,
      [target.name]: target.checked,
    }));
  };

  return (
    <Fragment>
      <h4>Add New Job</h4>
      <form onSubmit={onSubmitHandler} className="add-new-job-form">
        <div className="upper-form-grp">
          <AddJobFormInput
            name="title"
            formData={formData}
            onChangeHandler={onChangeHandler}
            placeholder="Title*"
            required={true}
          />
          <AddJobFormInput
            name="company"
            formData={formData}
            onChangeHandler={onChangeHandler}
            placeholder="Company*"
            required={true}
          />
          <AddJobFormInput
            name="jobURL"
            formData={formData}
            onChangeHandler={onChangeHandler}
            placeholder="Job URL"
            required={false}
          />

          <AddJobSelectGroup
            formData={formData}
            onChangeHandler={onChangeHandler}
          />
        </div>
        <div className="lower-form-grp">
          <AddJobSalary onChangeHandler={onChangeHandler} formData={formData} />
          {isRemote === null ? (
            <>
              <div className="remote-btn-grp">
                <h6>Is this a Remote position?</h6>
                <div className="remote-btn-wrapper">
                  <button
                    className="location-remote-btn"
                    type="button"
                    onClick={() => handleRemote(false)}
                  >
                    No
                  </button>
                  <button
                    className="location-remote-btn"
                    type="button"
                    onClick={() => handleRemote(true)}
                  >
                    Yes
                  </button>
                </div>
              </div>
            </>
          ) : (
            <LocationSelect
              formData={formData}
              setFormData={setFormData}
              isEditing={false}
            />
          )}
          <AddJobDocuments
            formData={formData}
            handleCheckboxToggle={handleCheckboxToggle}
          />
        </div>
      </form>
      <button
        type="submit"
        className="new-job-submit-btn"
        onClick={(e) => onSubmitHandler(e)}
      >
        Submit
      </button>
      <p className="required-field">*=Required Field</p>
    </Fragment>
  );
};

export default AddNewJob;
