const express = require("express");
const router = express.Router();
const {comments} = require("../../../models");

const addComment = async (req, res, next) => {
  try {
    const {post_id} = req.params;
    const {commentPost, user_id} = req.body;
    const resAddComment = await comments.create({
      commentPost: commentPost,
      post_id: post_id,
      user_id: user_id,
    });

    res.send({
      status: "success",
      message: "Successfully Added Comment",
    });
  } catch (error) {
    next(error);
  }
};

router.post("/:post_id", addComment);

module.exports = router;
