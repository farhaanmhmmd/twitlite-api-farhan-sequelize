const router = require("express").Router();
const {auth} = require("../../helpers/auth");
const {verifyToken} = require("../../lib/token");
const {users} = require("../../../models");

const getUserProfileController = async (req, res, next) => {
  try {
    const user_id = req.params.user_id;

    const resGetUser = await users.findAll({
      attributes: [
        "user_id",
        "username",
        "bio",
        "isVerified",
        "first_name",
        "last_name",
        "email",
        "gender",
        "age",
        "image",
      ],
      where: {user_id: user_id},
    });

    if (!resGetUser.length) throw {message: "User not found"};

    res.send({
      status: "Success",
      message: "User Profile",
      data: {
        result: resGetUser[0],
      },
    });
  } catch (error) {
    next(error);
  }
};

const verifyUserController = async (req, res, next) => {
  try {
    const verifiedToken = verifyToken(req.params.token);

    const resUpdateIsVerifiedStatus = await users.update(
      {
        isVerified: 1,
      },
      {
        where: {user_id: verifiedToken.user_id},
      }
    );

    // if (!resUpdateIsVerifiedStatus.affectedRows)
    //   throw {message: "Failed verification user"};
    res.send("<h1>Verification success</h1>");
  } catch (error) {
    next(error);
  }
};

router.get("/profile/:user_id", auth, getUserProfileController);
router.get("/verification/:token", verifyUserController);

module.exports = router;
