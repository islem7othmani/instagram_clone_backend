const likes = require("../models/like.models");

const createlike = async (req, res) => {
	const post = req.post;
	try {
		const likeExist = await likes.findOne({
			post: post._id,
		});
		if (!likeExist) return res.status(204).json({message : "already exists"});
		const newlike = new likes({
			post: post._id,
		});

		await newlike.save();
		return res.status(201).json(newlike);
	} catch (err) {
		return res.status(500).json(err);
	}
};
const dislike = async (req, res) => {
	const post = req.post;
	try {
		await likes.findOneAndDelete({
			post: post._id,
		});

		return res.status(204).json("like deleted");
	} catch (err) {
        console.log(err)
		return res.status(500).json(err);
	}
};
module.exports.createlike = createlike;
module.exports.dislike = dislike;