const router = require("express").Router();
const {isFieldEmpties} = require("../../helpers");
const {hash, compare} = require("../../lib/bcryptjs");
const {createToken} = require("../../lib/token");
const {sendMail} = require("../../lib/nodemailer");
const User = require("../../lib/models/User");
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

    const resGetUser = await User.findAll({
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

    const resCreateUser = await User.create({
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
        "Account was successfully created. Open your email to verify your account before you login.",
      data: {
        result: resCreateUser,
      },
    });
  } catch (error) {
    next(error);
  }
};

const loginUserController = async (req, res, next) => {
  try {
    const {username, email, password} = req.body;

    const resGetUser = await User.findAll({
      attributes: ["username", "email", "password", "isVerified"],
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

    if (!user.isVerified) {
      throw {
        code: 403,
        message: `You need to verify your account before you login. Check your email for your account verification`,
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
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

router.post("/", registerUserController);
router.post("/login", loginUserController);

module.exports = router;
