import React from "react";
import AdminFileUpload from "./AdminFileUpload";
import GMFileUpload from "./GMFileUpload";

export default function FileUpload() {
  const role = "gm";

  if (role === "admin") {
    return <AdminFileUpload />;
  }
  if (role === "gm") {
    return <GMFileUpload />;
  }
}
