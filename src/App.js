
import "./App.scss";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Home from "./Frontend/Home";
import Notes from "./Frontend/Notes";
import Contact from "./Frontend/Contact";
import Layout from "./Frontend/Layout";
import Nopage404 from "./Frontend/Nopage404";
import Login from "./Auth/Login";
import Register from "./Auth/Register";
import Forgetpassword from "./Auth/Forgetpassword";
import Resetpassword from "./Auth/Resetpassword";

import Auth from "./Auth/index";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/notes" element={<Notes />} />
          <Route path="/contact" element={<Contact />} />
      
          <Route    >       
         
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/register" element={<Register />} />
            <Route path="/auth/resetpassword" element={<Resetpassword />} />
            <Route
              path="/auth/forgetpassword" element={<Forgetpassword />}/>
      
            
            <Route path="/auth/test" element={<Register />} />
          </Route>
          <Route path="/*" element={<Nopage404 />} />
         
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
