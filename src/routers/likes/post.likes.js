const express = require("express");
const router = express.Router();
const {likes} = require("../../../models");

const addLike = async (req, res, next) => {
  try {
    const body = req.body;
    const postID = body.post_id;
    const resGetPostLike = await likes.findAll({
      where: {post_id: postID},
      raw: true,
    });

    if (resGetPostLike.length > 0) {
      let currentLike = resGetPostLike[0].likePost;
      const resAddPostLike = await likes.update(
        {likePost: currentLike + 1},
        {raw: true, where: {post_id: postID}}
      );
    } else {
      const resNewPostLike = await likes.create({
        like_id: `${body.post_id}-${body.user_id}`,
        user_id: body.user_id,
        likePost: 1,
        post_id: body.post_id,
        liked: true,
      });
    }

    res.send({
      status: "like Success",
      likesUpdate: currentLike + 1,
    });
  } catch (error) {
    next(error);
  }
};

router.post("/addLike", addLike);

module.exports = router;
