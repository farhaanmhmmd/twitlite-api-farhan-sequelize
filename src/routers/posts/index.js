const express = require("express");
const router = express.Router();

const getPostsRouter = require("./get.posts");
const postPostsRouter = require("./post.posts");
const deletePostsRouter = require("./delete.posts");
const patchPostsRouter = require("./patch.posts");

router.use(getPostsRouter);
router.use(postPostsRouter);
router.use(deletePostsRouter);
router.use(patchPostsRouter);

module.exports = router;
