import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Forgetpassword from "./Forgetpassword";
import Resetpassword from "./Resetpassword";

export default function Index() {
  return (
    <React.Fragment>
      <Route path="/auth/login" element={<Login />} />
      <Route path="/auth/register" element={<Register />} />
      <Route path="/auth/resetpassword" element={<Resetpassword />} />
      <Route path="/auth/forgetpassword" element={<Forgetpassword />} />
    </React.Fragment>
  );
}
