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

class Login extends Component {
  state = {};

  componentDidUpdate() {
    if (this.props.authError) {
      alert(this.props.authErrorMessage || "Error to login");
      this.props.SetAuthreducer({
        authError: "",
        authLoading: "",
        user: null,
        data: null,
        authErrorMessage: null,
      });
    }
  }

  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onLogin = (e) => {
    e.preventDefault();
    let body = { userName: this.state.email, password: this.state.password };
    this.props.Api_request(
      method_post,
      "/login",
      body,
      null,
      LOGIN_LOADING,
      LOGIN_SUCCESS,
      LOGIN_ERROR
    );
  };

  render() {
    if (this.props.authLoading) {
      return <Loader />;
    }

    if (this.props.user) {
      return <Navigate to={file_upload_path} />;
    }

    return (
      <div className="login-container">
        <div className="signin z-depth-3">
          <div className="row">
            <form className="col s12" onSubmit={this.onLogin}>
              <h2>Sign in</h2>
              <div className="input-field inline">
                <input
                  id="email"
                  type="email"
                  className="validate"
                  value={this.state.email}
                  onChange={this.onChange}
                />
                <label htmlFor="email">Email</label>
              </div>

              <div className="row">
                <div className="input-field col s12">
                  <input
                    id="password"
                    type="password"
                    className="validate"
                    value={this.state.path}
                    onChange={this.onChange}
                  />
                  <label htmlFor="password">Password</label>
                </div>
              </div>
              <button
                className="btn waves-effect waves-light "
                type="submit"
                name="action"
              >
                Login
              </button>
              <div className="row">
                <div className="input-field col s12">
                  <Link to={reset_password_path}>Reset Password</Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    authError: state.auth.authError,
    authLoading: state.auth.authLoading,
    authErrorMessage: state.auth.authErrorMessage,
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
      dispatch(
        api_request(method, path, body, query, loadType, successType, errorType)
      );
    },
    SetAuthreducer: (data) => {
      dispatch(setAuthreducer(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
