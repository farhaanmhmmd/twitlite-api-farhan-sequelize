const express = require("express");
const router = express.Router();
const {posts} = require("../../../models");

const updateCaption = async (req, res, next) => {
  try {
    const postID = req.body.post_id;
    const caption = req.body.caption;

    const resUpdateCaption = await posts.update(
      {
        caption: caption,
      },
      {
        where: {
          post_id: postID,
        },
      }
    );

    res.send({
      status: "Success",
      message: "Caption updated",
    });
  } catch (error) {
    next(error);
  }
};

router.patch("/caption", updateCaption);

module.exports = router;
