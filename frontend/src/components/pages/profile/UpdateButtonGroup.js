import React from "react";

const UpdateButtonGroup = (props) => {
  const { editingProfile, setEditingProfile, handleUpdateProfileInfo } = props;

  return (
    <div className="profile-update-grp">
      <button
        className={editingProfile ? "profile-update-grp__btn" : "none"}
        onClick={() => setEditingProfile(false)}
      >
        Cancel
      </button>
      {!editingProfile ? (
        <button
          className="profile-update-grp__btn"
          onClick={() => setEditingProfile(true)}
        >
          Edit Profile
        </button>
      ) : (
        <button
          className="profile-update-grp__btn"
          onClick={(e) => handleUpdateProfileInfo(e)}
        >
          Save Profile
        </button>
      )}
    </div>
  );
};

export default UpdateButtonGroup;
