const express = require("express");
const router = express.Router();
const {comments} = require("../../../models");

const getAllComments = async (req, res, next) => {
  try {
    const {post_id} = req.params;
    const resgetAllComments = await comments.findAll({
      where: {post_id},
      raw: true,
      order: [["createdAt", "DESC"]],
    });

    res.send({
      status: "Success",
      data: resgetAllComments,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

router.get("/:post_id", getAllComments);

module.exports = router;
