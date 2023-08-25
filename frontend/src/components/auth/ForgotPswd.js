import React, { Component } from "react";

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
      <header className="my-container">
        <div className="signin">
          <div className="row">
            <form className="col s12">
              <h3>Reset Password</h3>
              <div className="input-field inline">
                <input id="email_inline" type="email" className="validate" />
                <label for="email_inline">Email</label>
              </div>

              <div className="row">
                <div className="input-field col s6">
                  <input id="icon_telephone" type="tel" className="validate" />
                  <label for="icon_telephone">OTP</label>
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
                  <label for="password">New Password</label>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s12">
                  <input
                    id="password"
                    type="password"
                    className="validate"
                    value={confirmPassword}
                    onChange={(e) => this.handlePasswordChange(e, true)}
                  />
                  <label for="password">Confirm Password</label>
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
            </form>
          </div>
        </div>
      </header>
    );
  }
}
export default ForgotPswd;
