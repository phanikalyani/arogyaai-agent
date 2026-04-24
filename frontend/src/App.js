import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Link, useNavigate } from "react-router-dom";

import ChatPage from "./pages/ChatPage";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "14px 28px",
        background: "linear-gradient(90deg,#0ea5e9,#10b981)",
        color: "white",
      }}
    >
      <div style={{ fontSize: "24px", fontWeight: "700" }}>
        🩺 ArogyaAI
      </div>

      <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
        <Link to="/" style={{ color: "white" }}>Home</Link>

        {!token ? (
          <>
            <Link to="/login" style={{ color: "white" }}>Login</Link>
            <Link to="/signup" style={{ color: "white" }}>Signup</Link>
          </>
        ) : (
          <button
            onClick={handleLogout}
            style={{
              border: "none",
              padding: "10px 16px",
              borderRadius: "10px",
              background: "white",
              color: "#0ea5e9",
              fontWeight: "700",
              cursor: "pointer",
            }}
          >
            Logout
          </button>
        )}
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<ChatPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

