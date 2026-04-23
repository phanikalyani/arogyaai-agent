import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import ChatPage from "./pages/ChatPage";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";

function App() {
  return (
    <BrowserRouter>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "14px 28px",
          background: "linear-gradient(90deg,#0ea5e9,#10b981)",
          color: "white",
          boxShadow: "0 4px 18px rgba(0,0,0,0.08)",
        }}
      >
        {/* Logo */}
        <div
          style={{
            fontSize: "24px",
            fontWeight: "700",
            letterSpacing: "0.5px",
          }}
        >
          🩺 ArogyaAI
        </div>

        {/* Nav Links */}
        <div style={{ display: "flex", gap: "18px" }}>
          <Link
            to="/"
            style={{
              color: "white",
              textDecoration: "none",
              fontWeight: "600",
            }}
          >
            Home
          </Link>

          <Link
            to="/login"
            style={{
              color: "white",
              textDecoration: "none",
              fontWeight: "600",
            }}
          >
            Login
          </Link>

          <Link
            to="/signup"
            style={{
              color: "white",
              textDecoration: "none",
              fontWeight: "600",
            }}
          >
            Signup
          </Link>
        </div>
      </div>

      {/* Routes */}
      <Routes>
        <Route path="/" element={<ChatPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
