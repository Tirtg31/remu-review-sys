import React, { Component } from "react";
import "./styles.css";
import TakeInput from "./components/auth/TakeInput";
import ForgotPswd from "./components/auth/ForgotPswd";

class App extends Component {
  render() {
    return (
      <div>
        <ForgotPswd />
      </div>
    );
  }
}
export default App;
