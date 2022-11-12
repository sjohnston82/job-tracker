import React, { useContext } from "react";

import EllipsisSpinner from "../../layout/loaders/EllipsisSpinner";

import { UserContext } from "../../../helpers/UserContext";

import { FiEdit } from "react-icons/fi";

const AvatarGroup = (props) => {
  const {
    previewSource,
    setPreviewSource,
    loading,
    fileInputState,
    handleFileInputChange,
    handleSubmitFile,
  } = props;
  const { userData, user } = useContext(UserContext);
  return (
    <div className="avatar-grp-wrapper">
      <div className="profile-details__name-img">
        {loading ? (
          <div className="avatar-group">
            <div className="profile-details__loading">
              <EllipsisSpinner />
            </div>
          </div>
        ) : (
          <>
            <div className="avatar-group">
              <img
                src={previewSource ? previewSource : userData.avatar}
                alt={userData.username}
              />
              {!previewSource && (
                <label className="avatar-upload-btn" htmlFor="avatar">
                  <FiEdit className="avatar-upload-btn__icon" />
                  <input
                    type="file"
                    name="avatar"
                    id="avatar"
                    accept=".png, .jpg, .jpeg"
                    onChange={handleFileInputChange}
                    value={fileInputState}
                    className="form-input"
                  />
                </label>
              )}
            </div>
          </>
        )}
        {previewSource && !loading ? (
          <div className="upload-avatar-btn-grp">
            <button className="avatar-btn" onClick={() => setPreviewSource("")}>
              Cancel
            </button>
            <button
              className="avatar-btn"
              type="submit"
              onClick={(e) => handleSubmitFile(e, previewSource)}
            >
              Upload
            </button>
          </div>
        ) : (
          <h2 className="displayName">
            {userData.displayName || user.nickname}{" "}
          </h2>
        )}
      </div>
    </div>
  );
};

export default AvatarGroup;
