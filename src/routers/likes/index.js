const express = require("express");
const router = express.Router();

const postsLikesRouter = require("./post.likes");

router.use(postsLikesRouter);

module.exports = router;
