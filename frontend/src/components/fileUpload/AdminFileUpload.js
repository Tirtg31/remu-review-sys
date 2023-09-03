import React, { Component } from "react";
import SideBar from "../layouts/SideBar";

class AdminFileUpload extends Component {
  state = {};

  handleFileChange = (e) => {
    const file = e.target.files[0];
    this.setState({ selectedFile: file });
  };

  handleUpload = () => {
    // Handle file upload logic
    const { selectedFile } = this.state;
    if (selectedFile) {
      // Temporary alert
      alert("Selected file:", selectedFile);
    }
  };

  // Design
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
