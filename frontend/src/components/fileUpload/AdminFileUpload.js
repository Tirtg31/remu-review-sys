import React, { Component } from "react";
import SideBar from "../layouts/SideBar";
import axios from "axios";

class AdminFileUpload extends Component {
  state = {
    selectedFile: null,
  };

  handleFileChange = (e) => {
    const file = e.target.files[0];
    this.setState({ selectedFile: file });
  };

  handleUpload = () => {
    const { selectedFile } = this.state;

    if (this.state.selectedFile) {
      try {
        const formData = new FormData();
        formData.append("file", this.state.selectedFile);

        axios.post("http://localhost:3000/upload/admin", formData);

        alert("Excel uploaded successfully");
      } catch (error) {
        console.error("Error uploading Excel:", error);
        alert("Error uploading Excel: " + error.message);
      }
    } else {
      alert("Please select a file to upload.");
    }
  };

  render() {
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
                    <input type="file" onChange={this.handleFileChange} />
                  </div>
                  <div class="file-path-wrapper">
                    <input class="file-path validate" type="text" />
                  </div>
                </div>

                <button
                  className="btn waves-effect waves-light "
                  type="submit"
                  onClick={this.handleUpload}
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
}
export default AdminFileUpload;
