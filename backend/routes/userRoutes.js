const express = require("express");
const cloudinary = require("../cloudinary");

const User = require("../models/User");

const router = express.Router();

// create new user
router.post("/", async (req, res) => {
  const { username, email, sub, displayName, avatar, autoArchive } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(200).json({
        message: "User object already created.  Update in Profile section.",
        user: user,
      });
    }

    user = new User({
      username,
      email,
      sub,
      displayName,
      avatar,
      autoArchive,
    });

    user.save();

    res.status(200).json({ message: "User created successfully.", user: user });
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error.");
  }
});

// update profile info
router.put("/upload/", async (req, res) => {
  const { displayName, email, autoArchive } = req.body;

  let user = await User.findOne({ email });

  if (user) {
    try {
      user.displayName = displayName;
      user.autoArchive = autoArchive;

      user.save(function (err, user) {
        if (err) {
          console.log(err);
          res.status(500).json({
            message:
              "An error occurred while attempting to update profile information.",
          });
        } else {
          res
            .status(200)
            .json({ message: "Successfully updated profile.", user });
        }
      });
    } catch (err) {
      res.status(500).json({ message: "Error updating display name.", err });
    }
  } else {
    res.status(400).json({ message: "User not found.  Please log in." });
  }
});

// upload avatar
router.put("/upload/avatar/", async (req, res) => {
  const { data, email } = req.body;

  let user = await User.findOne({ email });

  if (user) {
    try {
      const fileStr = data;
      const uploadedResponse = await cloudinary.uploader.upload(fileStr, {
        upload_preset: "wpqissme",
      });
      user.avatar = uploadedResponse.url;

      user.save(function (err, user) {
        if (err) {
          console.log(err);
          res
            .status(500)
            .json({ message: "There was an error saving the avatar." });
        } else {
          res.status(200).json({
            message: "Avatar successfully uploaded.",
            avatar: user.avatar,
          });
        }
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Unable to upload avatar." });
    }
  } else {
    res.status(500).json({ message: "User not found.  Please log in." });
  }
});

module.exports = router;
