const express = require("express");
const router = express.Router();

const postCommentsRouter = require("./post.comments");
const getCommentsRouter = require("./get.comments");

router.use(postCommentsRouter);
router.use(getCommentsRouter);

module.exports = router;
