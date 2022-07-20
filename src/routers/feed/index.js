const express = require("express");
const router = express.Router();

const getFeedRouter = require("./get.feed");
const postFeedRouter = require("./post.feed");
const patchFeedRouter = require("./patch.feed");

router.use(getFeedRouter);
router.use(postFeedRouter);
router.use(patchFeedRouter);

module.exports = router;
