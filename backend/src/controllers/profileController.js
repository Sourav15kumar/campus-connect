// const User = require("../models/User");

// exports.getProfile = async (req, res) => {
//   try {
//     const user = await User.findById(req.user._id).select("-password");

//     res.json(user);
//   } catch (error) {
//     res.status(500).json({ message: "Server error" });
//   }
// };

// const User = require("../models/User");

// exports.getProfile = async (req, res) => {
//   try {
//     const user = await User.findById(req.user._id).select("-password");

//     res.json(user);
//   } catch (error) {
//     res.status(500).json({ message: "Server error" });
//   }
// };


// exports.uploadProfileImage = async (req, res) => {

//   try {

//     const user = await User.findByIdAndUpdate(

//       req.user._id,

//       { profileImage: req.file.filename },

//       { new: true }

//     ).select("-password");

//     res.json({
//       message: "Profile image updated successfully",
//       user
//     });

//   }catch (error) {

//   console.log("UPDATE PROFILE ERROR:", error);

//   res.status(500).json({
//     message: error.message
//   });

// }

// };


// const User = require("../models/User");

// // GET PROFILE
// exports.getProfile = async (req, res) => {
//   try {

//     const user = await User.findById(req.user._id).select("-password");

//     res.json(user);

//   } catch (error) {

//     res.status(500).json({ message: "Server error" });

//   }
// };


// // UPDATE PROFILE
// exports.updateProfile = async (req, res) => {

//   try {

//     const { college, branch, bio, skills } = req.body;

//     const user = await User.findByIdAndUpdate(
//       req.user._id,
//       { college, branch, bio, skills },
//       { new: true }
//     ).select("-password");

//     res.json({
//       message: "Profile updated",
//       user
//     });

//   } catch (error) {

//     console.log("UPDATE ERROR:", error);

//     res.status(500).json({
//       message: "Server error"
//     });

//   }

// };



const User = require("../models/User");


// GET PROFILE
exports.getProfile = async (req, res) => {
  try {

    const user = await User.findById(req.user._id).select("-password");

    res.json(user);

  } catch (error) {

    res.status(500).json({ message: "Server error" });

  }
};


// UPDATE PROFILE
exports.updateProfile = async (req, res) => {

  try {

    const { college, branch, bio, skills } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { college, branch, bio, skills },
      { returnDocument: "after" }
    ).select("-password");

    res.json({
      message: "Profile updated",
      user
    });

  } catch (error) {

    console.log("UPDATE ERROR:", error);

    res.status(500).json({
      message: "Server error"
    });

  }

};


// UPLOAD PROFILE IMAGE
exports.uploadProfileImage = async (req, res) => {

  try {

    if (!req.file) {
      return res.status(400).json({
        message: "No image uploaded"
      });
    }

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { profileImage: req.file.filename },
      { returnDocument: "after" }
    );

    res.json({
      message: "Image uploaded successfully",
      image: req.file.filename
    });

  } catch (error) {

    console.log("UPLOAD ERROR:", error);

    res.status(500).json({
      message: "Server error"
    });

  }

};


// UPLOAD COVER IMAGE
exports.uploadCoverImage = async (req, res) => {
  try {

    if (!req.file) {
      return res.status(400).json({
        message: "No image uploaded"
      });
    }

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { coverImage: req.file.filename },
      { returnDocument: "after" }
    );

    res.json({
      message: "Cover image uploaded successfully",
      coverImage: req.file.filename
    });

  } catch (error) {

    console.log("COVER UPLOAD ERROR:", error);

    res.status(500).json({
      message: "Server error"
    });

  }
};