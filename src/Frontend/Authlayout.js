import React from "react";

import { Outlet } from "react-router-dom";

export default function Layout() {
  return (

    <div className="auth-layout">
      {/* The Outlet renders the nested routes here */}
      <Outlet />
    </div>
  );
}