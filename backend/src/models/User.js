// const mongoose = require("mongoose");

// const userSchema = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: true,
//     },
//     email: {
//       type: String,
//       required: true,
//       unique: true,
//     },
//     password: {
//       type: String,
//       required: true,
//     },
//     bio: {
//       type: String,
//       default: "",
//     },
//     skills: [String],
//     connections: [
//       {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "User",
//       },
//     ],
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("User", userSchema);


const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true,
    trim: true
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },

  password: {
    type: String,
    required: true
  },

  profileImage: {
  type: String,
  default: ""
},

coverImage: {
  type: String,
  default: ""
},

resume: {
  type: String,
  default: ""
},

college: String,
branch: String,
bio: String,

skills: [String],
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);