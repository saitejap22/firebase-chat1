import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import OnlineStatus from "./components/ChatStatus";
import Register from "./components/Register";
import Login from "./components/Login";
import ChatHome from "./components/ChatHome";

import "./firebase";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/status" element={<OnlineStatus />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Login />} />
        <Route path="/chat" element={<ChatHome />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
