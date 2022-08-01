const express = require("express");
const router = express.Router();

const getPostsRouter = require("./get.posts");
const postPostsRouter = require("./post.posts");

router.use(getPostsRouter);
router.use(postPostsRouter);

module.exports = router;
