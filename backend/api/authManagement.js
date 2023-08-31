const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const config = require("../config/config");
const {
  emailOrUserName,
  generateOTP,
  isSubscribed,
  getnDaysLaterDate,
} = require("../utils/commonHelper");

const { sentMail } = require("../utils/sentMail");

const { running_env } = require("../config/constants");

const env = process.env.NODE_ENV || running_env;
const accessTokenSecret = config[env].accessTokenSecret;
const refreshAccessTokenSecret = config[env].refreshAccessTokenSecret;
const expTime = config[env].expTime;

module.exports = (app, db) => {
  app.post("/login", async (req, res) => {
    try {
      const user = await db.Users.findOne({
        where: {
          [emailOrUserName(req.body.userName)]: req.body.userName,
          isActive: true,
        },
      });
      if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
          if (!user.isActive) {
            res.status(401).json({ message: "User is not active" });
          } else if (!user.isVerified) {
            res.status(401).json({
              message:
                "User is not verified, check your register email to verify.",
            });
          } else {
            const token = {
              id: user.id,
              name: user.name,
              userName: user.userName,
              email: user.email,
              role: user.role,
            };
            const accessToken = jwt.sign(token, accessTokenSecret, {
              expiresIn: expTime,
            });
            const refreshAccessToken = jwt.sign(
              token,
              refreshAccessTokenSecret
            );
            const nUser = await db.Users.update(
              { refreshAccessToken: refreshAccessToken },
              {
                where: { id: user.id },
              }
            );
            res.status(200).json({
              message: "Login Successfully",
              data: {
                userDetails: token,
                accessToken: accessToken,
                refreshAccessToken: refreshAccessToken,
                role: user.role,
              },
            });
          }
        } else {
          res.status(401).json({ message: "Wrong Password" });
        }
      } else {
        res.status(404).json({ message: "User does not exist" });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: err.message });
    }
  });

  app.post("/register", async (req, res) => {
    try {
      const oldUserEmail = await db.Users.findOne({
        where: { email: req.body.email, isActive: true, isVerified: true },
      });
      const oldUserUserName = await db.Users.findOne({
        where: {
          userName: req.body.userName,
          isActive: true,
          isVerified: true,
        },
      });
      if (oldUserEmail) {
        throw new Error(req.body.email + " is already registered");
      }
      if (oldUserUserName) {
        throw new Error(req.body.userName + " is already registered");
      }
      const otp = generateOTP(10);
      const user = await db.Users.create({
        ...req.body,
        password: bcrypt.hashSync(req.body.password, 10),
        otp: otp,
      });
      console.log("User Created");
      await sentMail({
        to: req.body.email,
        subject: "Please confirm your registration on People AI",
        html: getRegistrationTemplate(req.body.userName, user.id, otp),
      });
      // await sentMail({
      //   to: req.body.email,
      //   subject: "People AI Subscription",
      //   html: getsubscriptionTemplate(req.body.userName),
      // });
      res.status(200).json({
        message:
          "Successfully Registered! Now check your email to validate your user account",
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: err.message });
    }
  });

  app.put("/verifyUser", (req, res) => {
    db.Users.findByPk(req.body.id)
      .then((user) => {
        if (user.otp === req.body.otp) {
          db.Users.update(
            { isVerified: true, otp: null },
            { where: { id: req.body.id, isVerified: false } }
          )
            .then((data) => {
              if (data[0] === 1) {
                db.UserSubscription.create({
                  amount: 0,
                  type: "Free Trial",
                  startDate: new Date(),
                  endDate: getnDaysLaterDate(),
                  userId: req.body.id,
                })
                  .then((usData) => {
                    res.status(200).json({
                      message:
                        "Verified successfully, Now login with your credentials. Free trial for 14 days has been added.",
                    });
                  })
                  .catch((err) => {
                    console.log(err);
                    res.status(500).json({ message: err.message });
                  });
              } else {
                res.status(500).json({
                  message: "Error to verify",
                });
              }
            })
            .catch((err) => {
              console.log(err);
              res.status(500).json({ message: err.message });
            });
        } else {
          res
            .status(500)
            .json({ message: "Please click on latest link to verify." });
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ message: err.message });
      });
  });

  app.post("/logout", (req, res) => {
    db.Users.update(
      {
        refreshAccessToken: null,
      },
      { where: { id: req.user.id } }
    )
      .then((data) => {
        if (data[0] === 1) {
          res.status(200).json({ message: "Logout Success" });
        } else {
          res.status(500).json({ message: "Logout Error" });
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ message: err.message });
      });
  });

  app.post("/refreshtoken", (req, res) => {
    console.log(req.user);
    db.Users.findOne({
      where: {
        id: req.user.id,
      },
    })
      .then((userDetails) => {
        const token = req.body.refreshAccessToken;
        const refreshToken = userDetails.refreshAccessToken;
        if (!token) {
          res.status(401).json({ message: "Invalid request" });
        } else if (refreshToken !== token) {
          console.error("Wrong refresh token");
          res.status(403).json({ message: "unauthorised access" });
        } else {
          jwt.verify(token, refreshAccessTokenSecret, (err, user) => {
            if (err) {
              res.status(403).json({ message: "unauthorised access" });
            } else {
              console.log("Access token info:: ", user);
              const accessToken = jwt.sign(
                {
                  id: userDetails.id,
                  name: userDetails.name,
                  userName: userDetails.userName,
                  email: userDetails.email,
                  role: userDetails.role,
                },
                accessTokenSecret,
                { expiresIn: expTime }
              );
              console.log("Access token refreshed");
              res.status(200).json({
                data: accessToken,
              });
            }
          });
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ message: err.message });
      });
  });

  app.post("/resetPassword", async (req, res) => {
    try {
      const user = await db.Users.findOne({
        where: {
          isActive: true,
          email: req.body.email,
        },
      });
      if (user) {
        if (user.otp === req.body.otp) {
          let u_user = await db.Users.update(
            {
              otp: null,
              isVerified: true,
              password: bcrypt.hashSync(req.body.password, 10),
            },
            { where: { id: user.id } }
          );
        } else {
          throw new Error("OTP doesn't match");
        }
        res.status(200).json({ message: "Check your email to reset password" });
      } else {
        throw new Error("No such user exist");
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: err.message });
    }
  });

  app.post("/changePassword", async (req, res) => {
    try {
      const user = await db.Users.findOne({
        where: { userName: req.body.userName, isActive: true },
      });
      if (user) {
        if (user.otp === req.body.otp) {
          const nU = await db.Users.update(
            { password: bcrypt.hashSync(req.body.password, 10), otp: null },
            { where: { id: user.id } }
          );
          if (nU[0] === 1) {
            const nUA = await db.UserActivity.create({
              changepassword: new Date(),
              userId: user.id,
            });
            res.status(200).json({ message: "Password updated successfully" });
          } else res.status(500).json({ message: "Error to reset password" });
        } else {
          res.status(500).json({ message: "Wrong OTP inserted" });
        }
      } else {
        res.status(500).json({ message: "User not found" });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: err.message });
    }
  });
};
