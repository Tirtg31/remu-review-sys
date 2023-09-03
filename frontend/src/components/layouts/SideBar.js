import React from "react";
import { method_post } from "../../config/config";
import { useDispatch, useSelector } from "react-redux";
import { api_request } from "../../action/commonActions";
import {
  LOGOUT_ERROR,
  LOGOUT_LOADING,
  LOGOUT_SUCCESS,
} from "../../types/authTypes";

export default function SideBar() {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth?.user);
  console.log("user", user);

  const logout = () => {
    dispatch(
      api_request(
        method_post,
        "/logout",
        {},
        null,
        LOGOUT_LOADING,
        LOGOUT_SUCCESS,
        LOGOUT_ERROR,
        user?.accessToken
      )
    );
  };

  return (
    <div id="sidebar">
      <div className="logo">
        Welcome,
        <br />
        {user?.userDetails?.userName}
      </div>

      <ul className="menu">
        <li className="menu-item">
          <span href="!" onClick={logout}>
            Logout
          </span>
        </li>
      </ul>
    </div>
  );
}
