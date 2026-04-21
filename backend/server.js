// require("dotenv").config();
// const express = require("express");
// const connectDB = require("./src/config/db");
// const authRoutes = require("./src/routes/authRoutes");
// const profileRoutes = require("./src/routes/profileRoutes");
// const messageRoutes = require("./src/routes/messageRoutes");
// const cors = require("cors");

// const app = express();
// const path = require("path");

// app.use(cors());
// app.use(express.json());

// app.use("/uploads", express.static(path.join(__dirname, "uploads")));
// app.use("/uploads", express.static("uploads"));

// connectDB();
// app.use("/api/profile", profileRoutes);
// app.use("/api/auth", authRoutes);
// app.use("/api/messages", messageRoutes);

// app.get("/", (req, res) => {
//   res.json({ message: "Backend Running 🚀" });
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });


require("dotenv").config();
const http = require("http");
const setupSocket = require("./socketSetup");
const express = require("express");
const connectDB = require("./src/config/db");
const authRoutes = require("./src/routes/authRoutes");
const profileRoutes = require("./src/routes/profileRoutes");
const messageRoutes = require("./src/routes/messageRoutes");
const cors = require("cors");

const app = express();
const path = require("path");

app.use(cors());
app.use(express.json());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/uploads", express.static("uploads"));

connectDB();
app.use("/api/profile", profileRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Backend Running 🚀" });
});

const PORT = process.env.PORT || 5000;
const httpServer = http.createServer(app);

// socket attach
setupSocket(httpServer);

// start server
httpServer.listen(PORT, () => {
  console.log(`🚀 Server + Socket running on port ${PORT}`);
});