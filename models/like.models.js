const mongoose = require("mongoose");

const likes = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      //required: true,
    },
    post: [{ type: mongoose.Schema.Types.ObjectId, ref: "postModel" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("likes", likes);
