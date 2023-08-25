import React, { Component } from "react";
import "./styles.css";
import ForgotPswd from "./components/auth/ForgotPswd";
import Login from "./components/auth/Login";
import FileUpload from "./components/fileUpload/FileUpload";
import { file_upload_path, reset_password_path } from "./config/config";
import { BrowserRouter, Route, Routes } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route index element={<Login />} />
          <Route path={file_upload_path} element={<FileUpload />} />
          <Route path={reset_password_path} element={<ForgotPswd />} />
        </Routes>
      </BrowserRouter>
    );
  }
}
export default App;
