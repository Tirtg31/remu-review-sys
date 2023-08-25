import React, { Component } from "react";
import { login_path } from "../../config/config";
import { Link } from "react-router-dom";

class ForgotPswd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newPassword: "",
      confirmPassword: "",
      error: "",
    };
  }

  handlePasswordChange = (event, isConfirmPassword) => {
    const value = event.target.value;

    if (isConfirmPassword) {
      this.setState({ confirmPassword: value });
    } else {
      this.setState({ newPassword: value });
    }
  };

  handleResetClick = (event) => {
    event.preventDefault();

    const { newPassword, confirmPassword } = this.state;
    if (newPassword !== confirmPassword) {
      this.setState({ error: "Passwords don't match" });
    } else {
      this.setState({ error: "" });
    }
  };

  render() {
    const { newPassword, confirmPassword, error } = this.state;
    return (
      <header className="reset-password-container">
        <div className="reset-password">
          <div className="row">
            <form className="col s12">
              <h5>Reset Password</h5>
              <div className="input-field inline">
                <input id="email_inline" type="email" className="validate" />
                <label htmlFor="email_inline">Email</label>
              </div>

              <div class="row">
                <div class="input-field col s12">
                  <input id="otp" type="text" class="validate" />
                  <label htmlFor="otp">OTP</label>
                </div>
              </div>

              <div className="row">
                <div className="input-field col s12">
                  <input
                    id="password"
                    type="password"
                    className="validate"
                    value={newPassword}
                    onChange={(e) => this.handlePasswordChange(e, false)}
                  />
                  <label htmlFor="password">New Password</label>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s12">
                  <input
                    id="confirmpassword"
                    type="password"
                    className="validate"
                    value={confirmPassword}
                    onChange={(e) => this.handlePasswordChange(e, true)}
                  />
                  <label htmlFor="confirmpassword">Confirm Password</label>
                </div>
              </div>
              {error && <p className="error-message">{error}</p>}
              <button
                className="btn waves-effect waves-light"
                type="submit"
                name="action"
                onClick={this.handleResetClick}
              >
                Reset
              </button>
              <div className="row">
                <div className="input-field col s12">
                  <Link to={login_path}>Back to login</Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </header>
    );
  }
}
export default ForgotPswd;
