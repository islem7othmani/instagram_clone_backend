const comments = require("../models/comments.models");

const createComment = async (req, res) => {
  const newComment = new comments({
    content: req.body.content,
    post: req.body.post,
    author: req.body.author,
  });
  try {
    const createdcomment = await newComment.save();
    return res.status(201).json(createdcomment);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

const updatecomment = async (req, res) => {
  const comment = req.comment;
  try {
    const updated = await comments.findByIdAndUpdate(comment._id, req.body, {
      new: true,
    });
    res.status(200).json(updated);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

const deletecomment = async (req, res) => {
  const comment = req.comment;
  try {
    const deletedcomment = await comments.findByIdAndDelete(comment.id);
    return res.status(200).json(deletedcomment);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

module.exports.createComment = createComment;
module.exports.updatecomment = updatecomment;
module.exports.deletecomment = deletecomment;
