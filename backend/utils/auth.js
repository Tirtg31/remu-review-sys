const config = require("../config/config");
const jwt = require("jsonwebtoken");
const env = process.env.NODE_ENV || "development";
const accessTokenSecret = config[env].accessTokenSecret;

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log(req.originalUrl);
  var url = String(req.originalUrl);
  if (req.originalUrl === "/login" || req.originalUrl === "/resetPassword") {
    next();
  } else if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, accessTokenSecret, (err, user) => {
      if (err) {
        console.log(err);
        return res.status(403).json({ message: err.message });
      }

      req.user = user;
      next();
    });
  } else {
    res.status(401).json({ error: "Invalid request" });
  }
};

module.exports = { authenticateJWT };
