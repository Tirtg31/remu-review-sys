import React, { Component } from "react";
import SideBar from "../layouts/SideBar";

class AdminFileUpload extends Component {
  render() {
    return (
      <div>
        <div className="col l4">
          <SideBar />
        </div>
        <div className="col l8"></div>
      </div>
    );
  }
}
export default AdminFileUpload;
