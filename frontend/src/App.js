import React, { Component } from "react";
import "./styles.css";
import TakeInput from "./components/auth/TakeInput";
import ForgotPswd from "./components/auth/ForgotPswd";
import { Route, Routes, BrowserRouter } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Routes>
            <Route exact path="/" element={<TakeInput />}></Route>
            <Route path="/ForgotPswd" element={<ForgotPswd />} />
          </Routes>
        </div>
      </BrowserRouter>
    );
  }
}
export default App;
