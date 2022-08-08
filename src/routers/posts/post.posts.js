const express = require("express");
const router = express.Router();
const {auth} = require("../../helpers/auth");
const {posts} = require("../../../models");
const {uploadPosts} = require("../../lib/multer");

const createUserPost = async (req, res, next) => {
  try {
    const {user_id} = req.params;
    const {username} = req.user;
    const postNumber = req.userPost.length;
    const postTime = new Date().getTime();

    const resCreateUserPost = await posts.create({
      user_id,
      username,
      post_id: `${username}-${postTime}`,
      postImage: `/public/allPosts/${username}-${postNumber}.png`,
      caption: req.body.caption,
    });

    res.send({
      status: "Success",
      detail: {
        resCreateUserPost,
      },
    });
  } catch (error) {
    next(error);
  }
};
const getDetailPost = async (req, res, next) => {
  try {
    const {post_id} = req.params;

    const resGetUserPosts = await posts.findAll({
      where: {post_id},
    });

    res.send({
      status: "Success",
      message: "Get post detail",
      detail: resGetUserPosts,
    });
  } catch (error) {
    next(error);
  }
};

router.post(
  "/createPost/:user_id",
  auth,
  uploadPosts.single("createPost"),
  createUserPost
);
router.post("/:post_id", getDetailPost);

module.exports = router;
