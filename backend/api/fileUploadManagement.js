const { parseExcel, createUsers } = require("../utils/excelHelper");
const { upload } = require("../utils/uploader");
const XLSX = require("xlsx");

module.exports = (app, db) => {
  app.post("/upload/admin", upload.single("file"), async (req, res) => {
    try {
      console.log(req.file);
      let path = req.file.path;
      let workbook = XLSX.readFile(path);
      let jsonData = XLSX.utils.sheet_to_json(
        workbook.Sheets["Employee Data"],
        { header: 1 }
      );
      let tableData = parseExcel(jsonData, 16); // Parse the tale as an arrayy of json
      await db.sequelize.transaction(async (transaction) => {
        await createUsers(tableData, transaction); //Create Users
      });
      res.status(200).json({ message: "Excel uploaded successfully" });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: err.message });
    }
  });
};
