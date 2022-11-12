import React, { useContext } from "react";

import { UserContext } from "../../../helpers/UserContext";

const AccountInfoGroup = (props) => {
  const {
    editingProfile,
    displayNameInputRef,
    autoArchiving,
    setAutoArchiving,
  } = props;
  const { userData } = useContext(UserContext);

  return (
    <div className="account-info-wrapper">
      <div className="profile-info__info-grp">
        <p className="profile-info__info-title">Display Name</p>
        <div className="profile-info__info-value-wrapper">
          {!editingProfile ? (
            <p className="profile-info__info-value">
              {userData.displayName || "No Display Name Provided"}
            </p>
          ) : (
            <input
              type="text"
              ref={displayNameInputRef}
              defaultValue={userData.displayName || ""}
            />
          )}
        </div>
      </div>
      <div className="profile-info__info-grp">
        <p className="profile-info__info-title">Email</p>
        <div className="profile-info__info-value-wrapper">
          <p className="profile-info__info-value">{userData.email}</p>
        </div>
      </div>

      <div className="auto-archive">
        {editingProfile ? (
          <div className="auto-archive-wrap">
            <p className="auto-archive-text-small">
              Auto-Archive Jobs after 120 days of inactivity
            </p>
            <label className="switch">
              <input
                type="checkbox"
                checked={autoArchiving}
                onChange={() => setAutoArchiving(!autoArchiving)}
              />
              <span className="slider round"></span>
            </label>
          </div>
        ) : (
          <p className="auto-archive-text">
            {userData.autoArchive
              ? "You are currently auto-archiving job listings after 120 days of inactivity."
              : "You are not currently auto-archiving job listings. Edit profile to change your preferences."}
          </p>
        )}
      </div>
    </div>
  );
};

export default AccountInfoGroup;
