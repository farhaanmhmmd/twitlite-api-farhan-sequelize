const router = require("express").Router();
const {auth} = require("../../helpers/auth");
const {verifyToken} = require("../../lib/token");

const getUserProfileController = async (req, res, next) => {
  try {
    const {user_id} = req.user;

    const connection = pool.promise();
    const sqlGetUser = `SELECT user_id, username, first_name, last_name, email, gender, age, image FROM users WHERE user_id = ?`;
    const dataGetUser = [user_id];
    const [resGetUser] = await connection.query(sqlGetUser, dataGetUser);

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
    const {token} = req.params;

    const verifiedToken = verifyToken(token);

    const connection = pool.promise();
    const sqlUpdateIsVerifiedStatus = `UPDATE user SET ? WHERE user_id = ?`;
    const dataUpdateIsVerifiedStatus = [
      {isVerified: true},
      verifiedToken.user_id,
    ];

    const [resUpdateIsVerifiedStatus] = await connection.query(
      sqlUpdateIsVerifiedStatus,
      dataUpdateIsVerifiedStatus
    );

    if (!resUpdateIsVerifiedStatus.affectedRows)
      throw {message: "Failed verification user"};

    res.send("<h1>Verification success</h1>");
  } catch (error) {
    next(error);
  }
};

router.get("/profile", auth, getUserProfileController);
router.get("/verification/:token", verifyUserController);

module.exports = router;
