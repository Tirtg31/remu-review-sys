import React from "react";
import AdminFileUpload from "./AdminFileUpload";
import GMFileUpload from "./GMFileUpload";
import TakeInput from "../auth/TakeInput";

export default function FileUpload() {
  const role = "gm";

  if (role === "admin") {
    return <AdminFileUpload />;
  } else if (role === "gm") {
    return <GMFileUpload />;
  }
}
