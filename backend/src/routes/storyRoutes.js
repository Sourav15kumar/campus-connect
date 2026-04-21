const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const {
  uploadStory,
  getStories,
} = require("../controllers/storyController");

router.post("/upload", upload.single("image"), uploadStory);
router.get("/", getStories);

module.exports = router;