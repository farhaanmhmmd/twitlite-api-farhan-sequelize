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
    res.send(`<!DOCTYPE html>
    <html>
      <head>
        <link href="https://fonts.googleapis.com/css?family=Nunito+Sans:400,400i,700,900&display=swap" rel="stylesheet">
      </head>
      <style>
        body {
          text-align: center;
          padding: 40px 0;
          background: #EBF0F5;
        }
        h1 {
          color: #88B04B;
          font-family: "Nunito Sans", "Helvetica Neue", sans-serif;
          font-weight: 900;
          font-size: 30px;
          margin-bottom: 10px;
        }
        p {
          color: #404F5E;
          font-family: "Nunito Sans", "Helvetica Neue", sans-serif;
          font-size:20px;
          margin: 0;
        }
        i {
           color: #9ABC66;
          font-size: 100px;
          line-height: 200px;
          margin-left:-15px;
        } 
        .card {
        background: white;
        padding: 60px;
        border-radius: 4px;
        box-shadow: 0 2px 3px #C8D0D8;
        display: inline-block;
        margin: 0 auto;
      }
      </style>
      <body>
      <div class="card">
      <div style="border-radius:200px; height:200px; width:200px; background: #F8FAF5; margin:0 auto;">
        <i class="checkmark">✓</i>
      </div>
        <h1>Verification Success</h1> 
        <p>Now you can access the posts page, thank you for joining Twitlite</p>
        </div>
      </body>
    </html>`);
  } catch (error) {
    next(error);
  }
};

router.get("/profile/:user_id", auth, getUserProfileController);
router.get("/verification/:token", verifyUserController);

module.exports = router;

{
  /* <p> 
<a href="http://localhost:3000/profile" target="_blank"
    >Back to Twitlite
    </a>
    </p> */
}
