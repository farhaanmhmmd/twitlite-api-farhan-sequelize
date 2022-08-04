const express = require("express");
const router = express.Router();
const {posts} = require("../../../models");

const deletePost = async (req, res, next) => {
  try {
    const {post_id} = req.params;

    const resDeletePost = await posts.destroy({where: {post_id}});

    res.send({
      status: "Success",
      message: "Success delete post",
      detail: {
        post_id,
        resDeletePost,
      },
    });
  } catch (error) {
    next(error);
  }
};

router.delete("/:post_id", deletePost);

module.exports = router;
