const multer = require("multer");
const path = require("path");
const appRoot = require("app-root-path");

const avatarPath = path.join(appRoot.path, "public", "avatar");
const postsPath = path.join(appRoot.path, "public", "allPosts");

const storageAvatar = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, avatarPath);
  },
  filename: function (req, file, cb) {
    const {username} = req.user;
    cb(null, `${username}-avatar.png`);
  },
});

const uploadAvatar = multer({
  storage: storageAvatar,
  limits: {
    fileSize: 10485760,
  },
  fileFilter(req, file, cb) {
    const allowedExtension = [".png", ".jpg", ".jpeg"];

    const extname = path.extname(file.originalname);

    if (!allowedExtension.includes(extname)) {
      const error = new Error(
        "Please upload image file with valid extension (jpg, jpeg, png)"
      );
      return cb(error);
    }

    cb(null, true);
  },
});

const postStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, postsPath);
  },
  filename: function (req, file, cb) {
    const {username} = req.user;
    const postCount = req.userPost.length;
    cb(null, `${username}-${postCount}.png`);
  },
});

const uploadPosts = multer({
  storage: postStorage,
  limits: {
    fileSize: 10485760,
  },
  fileFilter(req, file, cb) {
    console.log(file);
    const allowedExtension = [".png", ".jpg", ".jpeg"];

    const extname = path.extname(file.originalname);

    if (!allowedExtension.includes(extname)) {
      const error = new Error(
        "Please upload image file with valid extension (jpg, jpeg, png)."
      );
      return cb(error);
    }

    cb(null, true);
  },
});

module.exports = {uploadAvatar, uploadPosts};
