import React, { Component } from "react";
import { connect } from "react-redux";
import { api_request } from "../../action/commonActions";
import {
  file_upload_path,
  method_post,
  reset_password_path,
} from "../../config/config";
import {
  LOGIN_ERROR,
  LOGIN_LOADING,
  LOGIN_SUCCESS,
} from "../../types/authTypes";
import { setAuthreducer } from "../../action/authAction";
import Loader from "../layouts/Loader";
import AdminFileUpload from "../fileUpload/AdminFileUpload";
import { Link, Navigate } from "react-router-dom";

import { login_path } from "../../config/config";

class ForgotPswd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newPassword: "",
      confirmPassword: "",
      error: "",
    };
  }

  handleResetPassword = async (event) => {
    event.preventDefault();
    const { email, otp, newPassword, confirmPassword } = this.state;

    if (newPassword !== confirmPassword) {
      this.setState({ error: "Passwords don't match" });
    } else {
      this.setState({ error: "" });

      try {
        const response = await this.props.Api_request(
          method_post,
          reset_password_path,
          { email, otp, password: newPassword },
          null,
          LOGIN_LOADING,
          LOGIN_SUCCESS,
          LOGIN_ERROR
        );

        if (response.status === 200) {
          console.log("Password reset successful:", response.data.message);
        } else if (response.status === 404) {
          console.log("Email not found:", response.data.message);
        } else {
          console.error("Password reset failed:", response.data.message);
        }
      } catch (error) {
        console.error("An error occurred:", error);
        if (error.response) {
          console.error("Response data:", error.response.data);
        }
      }
    }
  };

  handlePasswordChange = (event, isConfirmPassword) => {
    const value = event.target.value;

    if (isConfirmPassword) {
      this.setState({ confirmPassword: value });
    } else {
      this.setState({ newPassword: value });
    }
  };

  handleResetClick = async (event) => {
    event.preventDefault();

    const { email, otp, newPassword, confirmPassword } = this.state;

    if (newPassword !== confirmPassword) {
      this.setState({ error: "Passwords don't match" });
    } else {
      this.setState({ error: "" });

      try {
        const response = await this.props.Api_request(
          method_post,
          reset_password_path,
          { email, otp, password: newPassword },
          null,
          LOGIN_LOADING,
          LOGIN_SUCCESS,
          LOGIN_ERROR
        );

        if (response.status === 200) {
          console.log("Password reset successful:", response.data.message);
        } else {
          console.error("Password reset failed:", response.data.message);
        }
      } catch (error) {
        console.error("An error occurred:", error);
        if (error.response) {
          console.error("Response data:", error.response.data);
        }
      }
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
const mapDispatchToProps = (dispatch) => {
  return {
    Api_request: (
      method,
      path,
      body,
      query,
      loadType,
      successType,
      errorType
    ) => {
      return dispatch(
        api_request(method, path, body, query, loadType, successType, errorType)
      );
    },
  };
};

export default connect(null, mapDispatchToProps)(ForgotPswd);
