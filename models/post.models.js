const mongoose = require("mongoose");
const slug =require("slug");

const posts = new mongoose.Schema(
  {
    caption: { type: String },
    image: { type: String },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
     // required: true,
    },
    slug : {type:String},

  },
  { timestamps: true }
);
posts.pre("validate", function (next) {
  if (!this.slug) {
    this.slugify(this.caption);
  }
  next();
});
posts.methods.slugify = function (text) {
  this.slug =
    slug(text) + "-" + ((Math.random() * Math.pow(36, 6)) | 0).toString(36);
};

module.exports = mongoose.model("postModel", posts);
