require("dotenv").config();
const nodemailer = require("nodemailer");

const {CLIENT_ID, CLIENT_SECRET, REFRESH_TOKEN} = process.env;

const courier = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: "farhanmhmmd96@gmail.com",
    clientId: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    refreshToken: REFRESH_TOKEN,
  },
});

const sendMail = async ({email, token}) => {
  const URI = `http://localhost:2104/users/verification/${token}`;
  const mail = {
    from: "Twitlite Registration Admin <farhanmhmmd96@gmail.com>",
    to: `${email}`,
    subject: "Twitlite Email Verification",
    html: `<h2>Welcome to Twitlite</h2>
    <h3>Click on the link below to verify your email:</h3>
    <h3><a href="${URI}">${URI}</a></h3>`,
  };

  try {
    await courier.sendMail(mail);
    console.log("Email sent");
  } catch (error) {
    throw error;
  }
};

module.exports = {sendMail};
