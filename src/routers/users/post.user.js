const router = require("express").Router();
const {isFieldEmpties} = require("../../helpers");
const {hash, compare} = require("../../lib/bcryptjs");
const {createToken} = require("../../lib/token");
const {sendMail} = require("../../lib/nodemailer");
const {users} = require("../../../models");
const {Op} = require("sequelize");

const registerUserController = async (req, res, next) => {
  try {
    const {username, email, password} = req.body;

    const emptyFields = isFieldEmpties({username, email, password});

    if (emptyFields.length) {
      throw {
        code: 400,
        message: `Empty fields :  ${emptyFields}`,
        data: {result: emptyFields},
      };
    }

    const resGetUser = await users.findAll({
      attributes: ["username", "email"],
      where: {[Op.or]: {username, email}},
    });

    if (resGetUser.length) {
      const user = resGetUser[0];

      if (user.username == username) {
        throw {
          code: 400,
          message: "Username is already exists",
        };
      } else if (user.email == email) {
        throw {
          code: 400,
          message: "Email is already exists",
        };
      }
    }

    const encryptedPassword = hash(password);

    const resCreateUser = await users.create({
      username,
      email,
      password: encryptedPassword,
      image: "/public/avatar/default-profile-icon.png",
    });

    const token = createToken({user_id: resCreateUser.insertId});

    await sendMail({email, token});

    res.send({
      status: "Success",
      message:
        "Account was successfully created. Check your email for your account verification",
      data: {
        result: resCreateUser,
      },
    });
  } catch (error) {
    next(error);
  }
};

const sendEmailVerification = async (req, res, next) => {
  try {
    const username = req.body.username;
    const resGetUser = await users.findAll({
      attributes: ["user_id", "username", "email"],
      where: {username: username},
    });

    const token = createToken({user_id: resGetUser[0].user_id});
    const email = resGetUser[0].email;

    await sendMail({email, token});

    res.send({
      status: "Success",
      message: "Verification email has been send",
    });
  } catch (error) {
    next(error);
  }
};

const loginUserController = async (req, res, next) => {
  try {
    const {username, email, password} = req.body;

    const resGetUser = await users.findAll({
      attributes: ["user_id", "username", "email", "password", "isVerified"],
      where: {[Op.or]: {username, email}},
    });

    const user = resGetUser[0];

    if (!resGetUser.length) {
      throw {
        code: 404,
        message: `Cannot find account with this username or email`,
      };
    }

    const isPasswordMatch = compare(password, user.password);

    if (!isPasswordMatch) {
      throw {
        code: 401,
        message: `Password is incorrect`,
      };
    }

    const token = createToken({
      user_id: user.user_id,
      username: user.username,
    });

    res.send({
      status: "Success",
      message: "Login Success",
      data: {
        result: {
          user_id: user.user_id,
          username: user.username,
          accessToken: token,
          isVerified: user.isVerified,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

router.post("/", registerUserController);
router.post("/login", loginUserController);
router.post("/email/send", sendEmailVerification);

module.exports = router;
