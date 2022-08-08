const express = require("express");
const router = express.Router();
const {posts, likes, comments} = require("../../../models");

const getAllPost = async (req, res, next) => {
  try {
    const resPosts = await posts.findAll({
      raw: true,
      order: [["createdAt", "DESC"]],
    });
    if (resPosts) {
      for (let i = 0; i < resPosts.length; i++) {
        let postLike = 0;
        const resLikes = await likes.findAll({
          where: {post_id: resPosts[i]["post_id"]},
          raw: true,
        });

        if (resLikes.length > 0) {
          postLike = resLikes[0].likePost;
        }

        resPosts[i]["likes"] = postLike;
      }
    }

    res.send({
      status: "Success",
      message: "Success get all post",
      data: resPosts,
    });
  } catch (error) {
    next(error);
  }
};

const getPostDetail = async (req, res, next) => {
  try {
    const postId = req.params.post_id;

    const resGetDetailPost = await posts.findOne({
      where: {post_id: postId},
      include: [{model: likes, as: "postLikes"}],
      raw: true,
    });

    if (resGetDetailPost) {
      let commentPosts = [];
      const resGetCommentPost = await comments.findAll({
        where: {post_id: postId},
        raw: true,
      });

      if (resGetCommentPost.length > 0) {
        commentPosts = resGetCommentPost;
      }
      resGetDetailPost["comments"] = commentPosts;
    }

    resGetDetailPost["likes"] = resGetDetailPost["postLikes.likePost"];

    res.send({
      status: "Success",
      message: "Get detail post",
      data: {
        detail: resGetDetailPost,
      },
    });
  } catch (error) {
    next(error);
  }
};

router.get("/", getAllPost);
router.get("/:post_id", getPostDetail);

module.exports = router;
