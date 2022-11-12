import React, { useRef, useContext } from "react";
import { JobContext } from "../../../../helpers/JobContext";
import CountrySelect from "./CountrySelect";
import StateSelect from "./StateSelect";

const LocationSelect = (props) => {
  const { formData, setFormData, isEditing, setLocationInfo } = props;

  const {
    setIsAmerica,
    isRemote,
    setIsRemote,
    countryRef,
    cityRef,
    stateRef,
    showingJobDetails,
  } = useContext(JobContext);

  const countryInputRef = useRef();

  const handleCountrySelection = (e) => {
    if (
      countryInputRef.current?.value === "United States" ||
      countryRef.current?.value === "United States"
    ) {
      setIsAmerica(true);
    } else if (
      countryInputRef.current?.value !== null ||
      countryRef.current?.value !== null
    ) {
      setIsAmerica(false);
    }

    if (!isEditing) {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
    } else {
      setLocationInfo((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
    }
  };

  return (
    <div className="location-container">
      {isRemote && (
        <>
          {!isEditing && <h5>Location:</h5>}
          <div
            className={!isEditing ? "remote-change" : "undo-remote-container"}
          >
            <p className="location-value">Remote</p>
            <button
              type="button"
              className={isEditing ? "undo-remote" : "change-remote"}
              onClick={(e) => {
                setIsRemote(null);
                e.preventDefault();
              }}
            >
              Undo
            </button>
          </div>
        </>
      )}

      {!isRemote && isRemote !== null && (
        <div
          className={
            showingJobDetails
              ? "location-input-container-details"
              : "location-input-container"
          }
        >
          <CountrySelect
            formData={formData}
            countryRef={countryRef}
            countryInputRef={countryInputRef}
            handleCountrySelection={handleCountrySelection}
            isEditing={isEditing}
          />

          <div className="location-input">
            <input
              type="text"
              name="city"
              id="city"
              value={!isEditing ? formData.city : cityRef.current?.value}
              onChange={handleCountrySelection}
              placeholder="City"
              className={!isEditing ? "add-job-form-input" : "city-input"}
              ref={cityRef}
            />
          </div>
          <StateSelect
            formData={formData}
            countryRef={countryRef}
            countryInputRef={countryInputRef}
            handleCountrySelection={handleCountrySelection}
            isEditing={isEditing}
            stateRef={stateRef}
          />
        </div>
      )}
    </div>
  );
};

export default LocationSelect;
