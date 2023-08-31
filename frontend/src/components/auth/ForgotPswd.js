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
  RESET_PASSWORD_ERROR,
  RESET_PASSWORD_LOADING,
  RESET_PASSWORD_SUCCESS,
} from "../../types/authTypes";
import { setAuthreducer } from "../../action/authAction";
import Loader from "../layouts/Loader";
import AdminFileUpload from "../fileUpload/AdminFileUpload";
import { Link, Navigate } from "react-router-dom";

import { login_path } from "../../config/config";

class ForgotPswd extends Component {
  state = { newPassword: "", confirmPassword: "", error: "" };

  componentDidUpdate() {
    if (this.props.resetPasswordSuccess) {
      alert(this.props.resetPasswordMessage);
      this.props.SetAuthreducer({
        resetPasswordSuccess: false,
      });
    }
    if (this.props.resetPasswordError) {
      alert(this.props.resetPasswordMessage);
      this.props.SetAuthreducer({
        resetPasswordError: false,
      });
    }
  }

  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

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
    const { email, otp, newPassword, confirmPassword } = this.state;
    if (newPassword !== confirmPassword) {
      this.setState({ error: "Passwords don't match" });
    } else {
      this.setState({ error: "" });
      this.props.Api_request(
        method_post,
        "/resetPassword",
        {
          email: email,
          otp: otp,
          password: newPassword,
        },
        null,
        RESET_PASSWORD_LOADING,
        RESET_PASSWORD_SUCCESS,
        RESET_PASSWORD_ERROR
      );
    }
  };

  render() {
    const { newPassword, confirmPassword, error } = this.state;

    if (this.props.resetPasswordLoading) {
      return <Loader />;
    }

    return (
      <header className="reset-password-container">
        <div className="reset-password">
          <div className="row">
            <form className="col s12">
              <h5>Reset Password</h5>
              <div className="input-field inline">
                <input
                  id="email"
                  type="email"
                  className="validate"
                  onChange={this.onChange}
                />
                <label htmlFor="email">Email</label>
              </div>

              <div class="row">
                <div class="input-field col s12">
                  <input
                    id="otp"
                    type="text"
                    className="validate"
                    onChange={this.onChange}
                  />
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

const mapStateToProps = (state) => {
  return {
    resetPasswordLoading: state.auth.resetPasswordLoading,
    resetPasswordSuccess: state.auth.resetPasswordSuccess,
    resetPasswordError: state.auth.resetPasswordError,
    resetPasswordMessage: state.auth.resetPasswordMessage,
  };
};

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
    SetAuthreducer: (data) => {
      dispatch(setAuthreducer(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPswd);
