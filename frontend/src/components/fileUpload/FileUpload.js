import React from "react";
import AdminFileUpload from "./AdminFileUpload";
import GMFileUpload from "./GMFileUpload";
import { useSelector } from "react-redux";
import { login_path, role_admin, role_gm } from "../../config/config";
import { useNavigate } from "react-router-dom";

export default function FileUpload() {
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth?.user);
  const role = user?.userDetails?.role;

  console.log("role", role);

  if (!user) {
    navigate(login_path);
  }
  if (role === role_admin) {
    return <AdminFileUpload />;
  } else if (role === role_gm) {
    return <GMFileUpload />;
  }
}
