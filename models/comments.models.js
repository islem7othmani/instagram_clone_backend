const mongoose = require("mongoose");

const comments = new mongoose.Schema(
  {
    content: { type: String },
    post: [{ type: mongoose.Schema.Types.ObjectId, ref: "post" }],
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
     //required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("comments", comments);
