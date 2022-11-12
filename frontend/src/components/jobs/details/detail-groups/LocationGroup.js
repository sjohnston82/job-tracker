import React, { useContext } from "react";

import LocationSelect from "../../add-jobs/location/LocationSelect";

import { JobContext } from "../../../../helpers/JobContext";

const LocationGroup = (props) => {
  const {
    editingLocation,
    job,
    setLocationInfo,
    setEditingLocation,
    isEditing,
  } = props;

  const { showingJobDetails, isRemote, setIsRemote, handleRemote } =
    useContext(JobContext);
  return (
    <>
      <div className="job-details__info-line">
        <h6 className="job-details__info-line__title">Location</h6>
        {editingLocation ? (
          isRemote === null ? (
            <>
              <h6>Is this a Remote position?</h6>
              <div
                className={
                  !showingJobDetails
                    ? "remote-btn-grp"
                    : "remote-btn-grp-details"
                }
              >
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
                  onClick={() => {
                    handleRemote(true);
                    setLocationInfo({ country: "", city: "", state: "" });
                  }}
                >
                  Yes
                </button>
              </div>
            </>
          ) : (
            <LocationSelect
              isEditing={true}
              setLocationInfo={setLocationInfo}
            />
          )
        ) : isEditing && !job.country && !job.isRemote ? (
          <>
            <p className="no-info">Information Not Provided</p>
            <button
              className="change-remote-btn"
              onClick={() => {
                setEditingLocation(true);
                setIsRemote(null);
              }}
            >
              Change
            </button>
          </>
        ) : isEditing && job.isRemote ? (
          <>
            <p>Remote</p>
            <button
              className="change-remote-btn"
              onClick={() => {
                setEditingLocation(true);
                setIsRemote(null);
              }}
            >
              Change
            </button>
          </>
        ) : isEditing && !job.isRemote ? (
          <div className="job-details__location-container">
            {job.country === "United States" ? (
              <p>
                {job.city}, {job.state}
              </p>
            ) : (
              <p>
                {job.city}, {job.country}
              </p>
            )}
            <button
              className="change-remote-btn"
              onClick={() => setEditingLocation(true)}
            >
              Change
            </button>
          </div>
        ) : !job.isRemote && !job.country ? (
          <p className="no-info">Information Not Provided</p>
        ) : !job.isRemote ? (
          <div className="job-details__location-container">
            {job.country === "United States" ? (
              <p className="job-details__">
                {job.city}, {job.state}
              </p>
            ) : (
              <p>
                {job.city}, {job.country}
              </p>
            )}
          </div>
        ) : (
          <p>Remote</p>
        )}
      </div>
    </>
  );
};

export default LocationGroup;
