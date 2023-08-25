const nodemailer = require("nodemailer");

const config = require("../config/config");
const { running_env } = require("../config/constants");
const env = process.env.NODE_ENV || running_env;

const sentMail = async (mailOptions) => {
  try {
    const transporter = nodemailer.createTransport({
      host: config[env].smtp.host,
      port: config[env].smtp.port,
      secureConnection: config[env].smtp.secureConnection,
      auth: {
        user: config[env].mailId,
        pass: config[env].mailPassword,
      },
      tls: config[env].smtp.tls,
    });
    const response = await transporter.sendMail({
      ...mailOptions,
      from: config[env].mailId,
    });
    console.log(response?.messageId);
    return response?.messageId;
  } catch (err) {
    throw err;
  }
};

module.exports = { sentMail };
