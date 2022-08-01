const express = require("express");
const router = express.Router();
const {auth} = require("../../helpers/auth");
const {posts} = require("../../../models");
const {likes} = require("../../../models");

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

router.get("/", getAllPost);

module.exports = router;
