const express = require("express");
const router = express.Router();
const Message = require("../models/Message");

// SEND MESSAGE
router.post("/send", async (req, res) => {
  try {
    const { senderId, receiverId, text } = req.body;

    const newMessage = new Message({
      senderId,
      receiverId,
      text
    });

    await newMessage.save();

    res.json(newMessage);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET ALL MESSAGES BETWEEN 2 USERS
router.get("/:user1/:user2", async (req, res) => {
  try {
    const { user1, user2 } = req.params;

    const messages = await Message.find({
      $or: [
        { senderId: user1, receiverId: user2 },
        { senderId: user2, receiverId: user1 }
      ]
    }).sort({ createdAt: 1 });

    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;