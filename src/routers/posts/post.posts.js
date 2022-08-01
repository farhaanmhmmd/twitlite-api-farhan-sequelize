const express = require("express");
const router = express.Router();
const {auth} = require("../../helpers/auth");
const {posts} = require("../../../models");
const {uploadPosts} = require("../../lib/multer");

const newUserPosts = async (req, res, next) => {
  try {
    const postCount = req.userPost.length;
    const {user_id} = req.params;
    const currentDate = new Date();
    const postId_maker = currentDate.getTime();
    const {username} = req.user;

    const resCreateUserPost = await posts.create({
      user_id,
      username,
      post_id: `${username}-${postId_maker}`,
      postImage: `/public/allPosts/${username}-${postCount}.png`,
      caption: req.body.caption,
    });

    console.dir(resCreateUserPost);

    res.send({
      status: "Success",
      message: "New user post",
      detail: {
        resCreateUserPost,
      },
    });
  } catch (error) {
    next(error);
  }
};

router.post(
  "/newPosts/:user_id",
  auth,
  uploadPosts.single("newPosts"),
  newUserPosts
);

module.exports = router;
