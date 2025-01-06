const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const path = require("path");
const fs = require("fs");
require("dotenv").config();

const OAuth2 = google.auth.OAuth2;
const oauth2Client = new OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  "https://developers.google.com/oauthplayground"
);

oauth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

const sendResetPasswordMail = async (userName, email, token) => {
  // console.log("Email:", process.env.EMAIL);
  // console.log("Password:", process.env.EMAIL_PASSWORD);

  const accessToken = await oauth2Client.getAccessToken();
  const mailTransporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      type: "OAuth2",
      user: process.env.EMAIL,
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      refreshToken: process.env.REFRESH_TOKEN,
      accessToken: accessToken.token,
    },
  });

  const templatePath = path.join(
    __dirname,
    "../templates/resetPasswordMail.html"
  );
  const template = fs.readFileSync(templatePath, "utf-8");
  // console.log(template);
  const resetLink = `https://uni-helper-five.vercel.app/reset-password/${token}`;
  const emailHtml = template
    .replace("{{resetLink}}", resetLink)
    .replace("{{userName}}", userName);

  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: "Password Reset Request",
    html: emailHtml,
  };

  // console.log("Preparing to send email...");
  await mailTransporter.sendMail(mailOptions);
  // console.log("Email sent successfully!");
  // try {
  // } catch (error) {
  //   console.error("Error sending email:", error);
  // }
};

module.exports = {
  sendResetPasswordMail,
};
