const express = require("express");
const router = express.Router();

const getPostRouter = require("./get.posts");
const postPostRouter = require("./post.posts");
const patchPostRouter = require("./patch.posts");

router.use(getPostRouter);
router.use(postPostRouter);
router.use(patchPostRouter);

module.exports = router;
