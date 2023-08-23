import React, { Component } from "react";
import "./styles.css";
import TakeInput from "./components/auth/TakeInput";
import AdminFileUpload from "./components/fileUpload/AdminFileUpload";

class App extends Component {
  render() {
    return (
      <div>
        <TakeInput />
        <AdminFileUpload />
      </div>
    );
  }
}
export default App;
