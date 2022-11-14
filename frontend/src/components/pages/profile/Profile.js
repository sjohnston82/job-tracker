import React, { useContext, useState, useRef } from "react";
import AccountStats from "./AccountStats";
import AccountInfoGroup from "./AccountInfoGroup";
import UpdateButtonGroup from "./UpdateButtonGroup";
import AvatarGroup from "./AvatarGroup";

import { JobContext } from "../../../helpers/JobContext";
import { UserContext } from "../../../helpers/UserContext";
import showToast from "../../../helpers/toasts";

const Profile = () => {
  const { userData, setUserData, user } = useContext(UserContext);

  const { gatherUserInfo, URL } = useContext(JobContext);

  const [previewSource, setPreviewSource] = useState("");
  const [fileInputState] = useState("");
  const [loading, setLoading] = useState(false);
  const [editingProfile, setEditingProfile] = useState(false);
  const [autoArchiving, setAutoArchiving] = useState(userData.autoArchive);

  const displayNameInputRef = useRef();

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    previewFile(file);
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  const handleSubmitFile = (e, file) => {
    e.preventDefault();
    setLoading(true);
    if (!previewSource) return;

    const res = fetch(`${URL}/users/upload/avatar/`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: file, email: userData.email }),
    })
      .then((res) => res.json())
      .then((data) => {
        setUserData({ ...userData, avatar: data.avatar });
        setPreviewSource("");
        setLoading(false);
        gatherUserInfo();
      })
      .catch((error) => {
        console.log(error);
      });
    showToast(res, "uploading-avatar");
  };

  const handleUpdateProfileInfo = (e) => {
    e.preventDefault();

    const res = fetch(`${URL}/users/upload/`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        displayName: displayNameInputRef.current?.value,
        email: userData.email,
        autoArchive: autoArchiving,
      }),
    })
      .then((res) => res.json())
      .then(() => {
        gatherUserInfo(user);
        setEditingProfile(false);
      })
      .catch((err) => {
        console.log(err);
      });

    showToast(res, "updating-profile-info");
  };

  return (
    <div className="profile-details__container">
      <AvatarGroup
        previewSource={previewSource}
        setPreviewSource={setPreviewSource}
        loading={loading}
        fileInputState={fileInputState}
        handleFileInputChange={handleFileInputChange}
        handleSubmitFile={handleSubmitFile}
      />
      <div className="profile-info">
        <AccountInfoGroup
          editingProfile={editingProfile}
          displayNameInputRef={displayNameInputRef}
          autoArchiving={autoArchiving}
          setAutoArchiving={setAutoArchiving}
          setEditingProfile={setEditingProfile}
          handleUpdateProfileInfo={handleUpdateProfileInfo}
        />
      </div>
      <AccountStats />
      <UpdateButtonGroup
        editingProfile={editingProfile}
        setEditingProfile={setEditingProfile}
        handleUpdateProfileInfo={handleUpdateProfileInfo}
      />
    </div>
  );
};

export default Profile;
