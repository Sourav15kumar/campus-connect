// const express = require("express");
// const router = express.Router();
// const upload = require("../middleware/upload");
// const { getProfile, uploadProfileImage,updateProfile } = require("../controllers/profileController");
// const { protect } = require("../middleware/authMiddleware");

// router.get("/me", protect, getProfile);

// router.post(
//   "/upload-profile",
//   protect,
//   upload.single("image"),
//   uploadProfileImage
// );
// // Upload profile image
// router.post("/upload-profile", protect, upload.single("image"), uploadProfileImage
// );

// router.put("/update", protect, updateProfile);




// module.exports = router;




// const express = require("express");
// const router = express.Router();

// const { getProfile, updateProfile } = require("../controllers/profileController");

// const { protect } = require("../middleware/authMiddleware");

// // get profile
// router.get("/me", protect, getProfile);

// // update profile
// router.put("/update", protect, updateProfile);

// module.exports = router;








// const express = require("express");
// const router = express.Router();
// const upload = require("../middleware/upload");

// const { getProfile, updateProfile } = require("../controllers/profileController");

// const { protect } = require("../middleware/authMiddleware");

// // get profile
// router.get("/me", protect, getProfile);

// router.post(
//   "/upload-profile",
//   protect,
//   upload.single("image"),
//   uploadProfileImage
// );


// // update profile
// router.put("/update", protect, updateProfile);

// module.exports = router;




const express = require("express");
const router = express.Router();

const upload = require("../middleware/upload");

const {
  getProfile,
  updateProfile,
  uploadProfileImage,
  uploadCoverImage
} = require("../controllers/profileController");

const { protect } = require("../middleware/authMiddleware");


// UPLOAD COVER IMAGE
router.post(
  "/upload-cover",
  protect,
  upload.single("cover"),
  uploadCoverImage
);

// GET PROFILE
router.get("/me", protect, getProfile);


// UPLOAD PROFILE IMAGE
router.post(
  "/upload-profile",
  protect,
  upload.single("image"),
  uploadProfileImage
);


// UPDATE PROFILE
router.put("/update", protect, updateProfile);


module.exports = router;