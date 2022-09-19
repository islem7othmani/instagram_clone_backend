const postModel = require("../models/post.models");
const mongoose = require("mongoose");

const createPost = async (req, res) => {
  const newPost = new postModel({
    caption: req.body.caption,
    image: req.body.image,
  });

  try {
    const createdPost = await newPost.save();
    return res.status(201).json(createdPost);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

const getPost = async (req, res) => {
  try {
    const fetchedPosts = await postModel.find();
    res.status(200).json(fetchedPosts);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getPostCommentsLikes = async (req, res) => {
  try {
    const postCL = await postModel.aggregate([
      { $match: { id: req.post?._id} },
      {
        $lookup: {
          from: "comments",
          localField: "_id",
          foreignField: "post",
          as: "comments",
        },
      },
      {
        $lookup: {
          from: "likes",
          localField: "_id",
          foreignField: "post",
          as: "likes",
        },
      },
      {
        $addFields: {
          likesOfPost: {
            $size: "$likes",
          },
        },
      },
    ]);
    return res.status(200).json(postCL);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

const updatePost = async (req, res) => {
  const post = req.post;
  try {
    const updated = await postModel.findByIdAndUpdate(post._id, req.body, {
      new: true,
    });
    res.status(200).json(updated);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

const deletePost = async (req, res) => {
  const Post = req.post;
  try {
    const deletedPost = await postModel.findByIdAndDelete(Post.id);
    return res.status(200).json(deletedPost);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

module.exports.createPost = createPost;
module.exports.getPost = getPost;
module.exports.updatePost = updatePost;
module.exports.deletePost = deletePost;
module.exports.getPostCommentsLikes = getPostCommentsLikes;
