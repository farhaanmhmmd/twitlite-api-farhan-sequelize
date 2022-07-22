const User = require("../../lib/models/User");
const {verifyToken} = require("../../lib/token");

const auth = async (req, res, next) => {
  try {
    const token = req.token;

    const verifiedToken = verifyToken(token);

    const resGetUser = await User.findAll({
      attributes: ["user_id", "username"],
      where: verifiedToken.user_id,
    });

    if (!resGetUser.length) throw {message: "User not found"};

    const {user_id, username} = resGetUser[0];
    req.user = {user_id, username};
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {auth};
