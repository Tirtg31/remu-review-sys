const { user_type_admin } = require("../config/constants");
const db = require("../models");

function emailOrUserName(userName) {
  if (userName.includes("@")) {
    return "email";
  } else {
    return "userName";
  }
}

function generateOTP(length = 4) {
  // Declare a digits variable
  // which stores all digits
  var digits = "0123456789";
  let OTP = "";
  for (let i = 0; i < length; i++) {
    OTP += digits[Math.floor(Math.random() * 10)];
  }
  return OTP;
}

function getSixMonthsLaterDate(date = new Date()) {
  const sixMonthsLater = new Date(
    date.getFullYear(),
    date.getMonth() + 6,
    date.getDate()
  );
  return sixMonthsLater;
}

function getOneYearLaterDate(date = new Date()) {
  const oneYearLaterDate = new Date(
    date.getFullYear() + 1,
    date.getMonth(),
    date.getDate()
  );
  return oneYearLaterDate;
}

function getnDaysLaterDate(date = new Date(), day = 14) {
  const theDate = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate() + day
  );
  return theDate;
}

async function isSubscribed(userId) {
  try {
    let flag = false;
    const user = await db.Users.findByPk(userId);
    if (user.role === user_type_admin) return true;
    const userSubscription = await db.UserSubscription.findOne({
      where: {
        userId: userId,
        isActive: true,
      },
    });
    if (
      userSubscription &&
      new Date(userSubscription.endDate).getTime() >= new Date().getTime()
    ) {
      flag = true;
    }
    return flag;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

module.exports = {
  emailOrUserName,
  generateOTP,
  getSixMonthsLaterDate,
  getOneYearLaterDate,
  getnDaysLaterDate,
  isSubscribed,
};
