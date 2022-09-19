const {
    createPost ,
    getPost ,
    updatePost ,
    deletePost,
	getPostCommentsLikes ,
} = require("../controllers/post.controllers") ;
const {
    createComment ,
    updatecomment ,
    deletecomment
} = require("../controllers/comments.controllers") ;

const {
    createlike ,
    dislike
} = require("../controllers/like.controllers") ;


const router = require("express").Router();

const postModel = require('../models/post.models');
const comments = require('../models/comments.models');
const likes = require('../models/like.models');


router.param("post", async (req, res, next, id) => {
	try {
		const post = await postModel.findById(id);
		if (!post) {
			return res.status(404).json("post not found");
		}
		req.post = post;
		next();
	} catch (err) {
		return res.status(500).status.json(err);
	}
});
router.param("comment", async (req, res, next, id) => {
	try {
		const comment = await comments.findById(id);
		if (!comment) {
			return res.status(404).json("comment not found");
		}
		req.comment = comment;
		next();
	} catch (err) {
		return res.status(500).status.json(err);
	}
});

router.param("like", async (req, res, next, id) => {
	try {
		const like = await likes.findById(id);
		if (!like) {
			return res.status(404).json("like not found");
		}
		req.like = like;
		next();
	} catch (err) {
		return res.status(500).status.json(err);
	}
});

router.post("/addpost" , createPost);
router.get("/",getPost);
router.get("/getwithcommentsandlikes",getPostCommentsLikes);
router.put("/update/:post", updatePost);
router.delete("/delete/:post" , deletePost);


router.post("/:post/addcomment" , createComment);
router.put("/:post/updatecomment/:comment", updatecomment);
router.delete("/:post/deletecomment/:comment" , deletecomment);

router.post("/:post/addlike" , createlike);
router.delete("/:post/deletelike/:like" , dislike);

module.exports = router;