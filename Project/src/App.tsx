import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./resources/Login/Login.tsx";


function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<Login />} />
          {/* <Route path="/admin-login" element={<Adminlogin />} /> */}
        </Routes>
      </Router>
    </>
  );
}

export default App;