const Story = require("../models/Story");

// Upload story
exports.uploadStory = async (req, res) => {
  try {
    const newStory = new Story({
      userId: req.body.userId,
      username: req.body.username,
      image: req.file.filename,
    });

    await newStory.save();
    res.json(newStory);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all stories
exports.getStories = async (req, res) => {
  try {
    const stories = await Story.find().sort({ createdAt: -1 });
    res.json(stories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};