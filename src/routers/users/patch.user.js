const express = require("express");
const router = express.Router();
const {isFieldEmpties} = require("../../helpers");
const {auth} = require("../../helpers/auth");
const {uploadAvatar} = require("../../lib/multer");
const {users} = require("../../../models");

const updateUserController = async (req, res, next) => {
  try {
    const {user_id} = req.user;
    const {username, bio, firstName, lastName, age, gender} = req.body;

    const emptyFields = isFieldEmpties({
      username,
      // firstName,
      // lastName,
      // age,
      // gender
    });

    if (emptyFields.length) {
      throw {
        code: 400,
        message: "Username cannot be empty",
        data: {result: emptyFields},
      };
    }

    const resGetUsername = await users.findAll({
      attributes: ["username"],
      where: {username},
    });

    if (resGetUsername.length)
      throw {code: 401, message: "Username is already used"};

    // if (age >= 100) throw {code: 401, message: "Age is invalid"};

    const resUpdateUser = await users.update(
      {
        username,
        bio,
        first_name: firstName,
        last_name: lastName,
        age,
        gender,
      },
      {
        where: {user_id},
      }
    );

    // if (!resUpdateUser.affectedRows) throw {message: "Failed to update user"};

    res.send({
      status: "Success",
      message: "Success update user",
    });
  } catch (error) {
    next(error);
  }
};

const updateUserAvatarController = async (req, res, next) => {
  try {
    const {user_id} = req.user;
    const {filename} = req.file;
    const finalFileName = `/public/avatar/${filename}`;

    const resUpdateAvatar = await users.update(
      {
        image: finalFileName,
      },
      {
        where: {
          user_id,
        },
      }
    );

    // if (!resUpdateAvatar.affectedRows)
    //   throw {message: "Failed to update avatar"};

    res.send({
      status: "Success",
      message: "Success update avatar",
    });
  } catch (error) {
    next(error);
  }
};

router.patch("/", auth, updateUserController);
router.patch(
  "/avatar",
  auth,
  uploadAvatar.single("avatar"),
  updateUserAvatarController
);

module.exports = router;
