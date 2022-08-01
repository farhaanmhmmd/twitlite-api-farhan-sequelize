const {users} = require("../../../models");
const {posts} = require("../../../models");

const {verifyToken} = require("../../lib/token");

const auth = async (req, res, next) => {
  try {
    const token = req.token;

    const verifiedToken = verifyToken(token);

    const resGetUser = await users.findAll({
      attributes: ["user_id", "username"],
      where: verifiedToken.user_id,
    });

    const resGetUserPost = await posts.findAll({
      where: {user_id: verifiedToken.user_id},
    });

    if (!resGetUser.length) throw {message: "User not found"};

    const {user_id, username} = resGetUser[0];
    req.user = {user_id, username};
    req.userPost = resGetUserPost;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {auth};
