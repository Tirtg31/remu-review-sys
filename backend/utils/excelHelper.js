const { role_gm } = require("../config/constants");
const db = require("../models");
const { generateOTP } = require("./commonHelper");

function parseExcel(jsonData, startRow = 1) {
  try {
    const headers = jsonData[startRow - 1];
    const tableData = [];
    for (let i = startRow; i < jsonData.length; i++) {
      const row = jsonData[i];
      const rowData = {};
      for (let j = 0; j < headers.length; j++) {
        rowData[headers[j]] = row[j];
      }
      tableData.push(rowData);
    }
    return tableData;
  } catch (err) {
    throw err;
  }
}

async function createUsers(tableData, transaction) {
  try {
    for (let i = 0; i < tableData.length; i++) {
      let data = tableData[i];
      let gm_name = data["GM  Name"]?.trim();
      let gm_email = data["GM Email"]?.trim();
      // Check is the GM is already exist or not
      let oldGM = await db.Users.findOne({
        where: { email: gm_email, isActive: true },
        transaction: transaction,
      });
      // If not then create new user for a GM
      if (!oldGM) {
        await db.Users.create(
          {
            name: gm_name,
            email: gm_email,
            role: role_gm,
            otp: generateOTP(),
          },
          { transaction: transaction }
        );
      }
    }
    console.log("Users created successfully");
  } catch (err) {
    throw err;
  }
}

module.exports = { parseExcel, createUsers };
