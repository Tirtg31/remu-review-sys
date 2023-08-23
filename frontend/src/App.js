import React, { Component } from "react";
import "./styles.css";
import TakeInput from "./components/auth/TakeInput";
import FileUpload from "./components/fileUpload/FileUpload";

class App extends Component {
  render() {
    return (
      <div>
        {/* <TakeInput /> */}
        <FileUpload />
      </div>
    );
  }
}
export default App;
