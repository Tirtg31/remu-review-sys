import React, { Component } from "react";
import { Link } from "react-router-dom";

class TakeInput extends Component {
  render() {
    return (
      <header className="my-container">
        <div className="signin">
          <div className="row">
            <form className="col s12">
              <h2>Sign in</h2>
              <div className="input-field inline">
                <input id="email_inline" type="email" className="validate" />
                <label for="email_inline">Email</label>
              </div>

              <div className="row">
                <div className="input-field col s12">
                  <input id="password" type="password" className="validate" />
                  <label for="password">Password</label>
                </div>
              </div>
              <div>
                <Link to="/ForgotPswd" className="btn btn-link">
                  Forgot Password
                </Link>
              </div>

              <button
                className="btn waves-effect waves-light"
                type="submit"
                name="action"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </header>
    );
  }
}

export default TakeInput;
