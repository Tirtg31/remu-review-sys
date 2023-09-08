import React, { useState } from "react";
import SideBar from "../layouts/SideBar";

function AdminFileUpload() {
  const [file, setFile] = useState();

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    const file = event.target.files[0];
    if (file) {
      const fileName = file.name.toLowerCase();
      // Check if the file has a .xlsx or .xlsm extension
      if (fileName.endsWith(".xlsx") || fileName.endsWith(".xlsm")) {
        setFile(file);
      } else {
        alert("Please select a valid Excel (.xlsx/.xlsm) file.");

        event.target.value = null;
        setFile(null);
      }
    }
  };

  const handleUpload = () => {
    if (!file) {
      return;
    }

    //  Uploading the file using the fetch API to the server
    fetch("http://localhost:8081/upload/admin", {
      method: "POST",
      body: file,
      headers: {
        "content-type": file.type,
        "content-length": `${file.size}`,
      },
    })
      .then((res) => res.json())
      .then((data) => alert("File has been successfully uploaded"))
      .catch((err) => alert(err));
  };

  return (
    <div className="page-container">
      <SideBar />
      <div className="login-container">
        <div className="signin z-depth-3">
          <div className="row">
            <h5>File Upload</h5>

            <form className="col s12">
              <div class="file-field input-field">
                <div class="btn">
                  <span>File</span>
                  <input type="file" onChange={handleFileChange} />
                </div>
                <div class="file-path-wrapper">
                  <input class="file-path validate" type="text" />
                </div>
              </div>

              <button
                className="btn waves-effect waves-light "
                type="submit"
                onClick={handleUpload}
              >
                Upload
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
export default AdminFileUpload;
