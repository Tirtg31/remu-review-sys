const express = require("express");
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");
const https = require("https");
const fs = require("fs");
const db = require("./models");
const config = require("./config/config");
const { dbInit, createDB, createAdmin } = require("./scripts/dbInit");
const authManagement = require("./api/authManagement");
const { authenticateJWT } = require("./utils/auth");
const {} = require("./config/constants");
const env = process.env.NODE_ENV || running_env;

const app = express();

var options = {
  inflate: true,
  limit: "50mb",
  type: "application/octet-stream",
};

app.use(cors());
app.use(bodyParser.json());
app.use(express.static("build"));
app.get("*", (req, res, next) => {
  if (req.originalUrl === login_path) {
    res.sendFile(path.join(__dirname, "build", "index.html"));
  } else {
    next();
  }
});
app.use(authenticateJWT);

authManagement(app, db);

console.log("env: ", env);
console.log("host : ", config[env].host);

const PORT = process.env.PORT || config[env].serverport;

app.listen(PORT, () => {
  console.log("Server is running on port : ", PORT);
});
