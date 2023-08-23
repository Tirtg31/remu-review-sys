const db = require("../models");
const bcrypt = require("bcrypt");
const config = require("../config/config");
const mysql = require("mysql2");
const { running_env } = require("../config/constants");
const env = process.env.NODE_ENV || running_env;

function dbInit() {
  db.sequelize
    .sync({
      force: false,
    })
    .then(async (success) => {
      console.log("Database Synced ... ");
    })
    .catch((err) => console.log(err));
}

const createDB = async () => {
  try {
    let con = mysql.createConnection({
      host: config[env].host,
      user: config[env].username,
      password: config[env].password,
    });

    con.connect(function (err) {
      if (err) {
        console.log("Error to connect with server", err);
      } else {
        console.log("Connect with server");
        con.query("CREATE SCHEMA `peopleai`", function (err, result) {
          if (err) {
            console.log("Error to create db");
          } else {
            console.log("DB created");
          }
        });
      }
    });
  } catch (err) {
    console.log(err);
  }
};

async function createAdmin() {
  try {
    const user = await db.Users.create({
      ...config[env]?.admin,
      password: bcrypt.hashSync(config[env]?.admin?.password, 10),
      verifyAt: new Date(),
    });
    console.log("Admin created");
  } catch (err) {
    console.log(err);
  }
}

module.exports = { dbInit, createAdmin, createDB };
