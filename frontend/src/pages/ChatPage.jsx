import React, { useState } from "react";
import ChatBox from "../components/ChatBox";
import { sendMessage } from "../services/api";

function ChatPage() {
  const [messages, setMessages] = useState([
    {
      text: "Hello 👋 I am ArogyaAI. Describe your symptoms or ask a health question.",
      sender: "bot",
    },
  ]);

  const handleSend = async (text) => {
    const userMessage = {
      text,
      sender: "user",
    };

    setMessages((prev) => [...prev, userMessage]);

    try {
      const res = await sendMessage(text);

      const botMessage = {
        text: res.reply || "I could not generate a response.",
        sender: "bot",
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      const errorMessage = {
        text: "⚠️ Server error. Please try again.",
        sender: "bot",
      };

      setMessages((prev) => [...prev, errorMessage]);
    }
  };

  return (
    <div className="app-container">
      <div
        className="card"
        style={{
          width: "100%",
          maxWidth: "950px",
          height: "85vh",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: "18px",
            background: "linear-gradient(90deg,#0ea5e9,#10b981)",
            color: "white",
            fontSize: "22px",
            fontWeight: "700",
          }}
        >
          🩺 ArogyaAI Health Assistant
        </div>

        {/* Quick Buttons */}
        <div
          style={{
            display: "flex",
            gap: "10px",
            flexWrap: "wrap",
            padding: "12px 16px",
            background: "#f8fafc",
            borderBottom: "1px solid #e2e8f0",
          }}
        >
          {["Fever", "Headache", "Cold", "Diabetes", "BP", "Skin Rash"].map(
            (item, index) => (
              <button
                key={index}
                onClick={() => handleSend(item)}
                style={{
                  padding: "8px 14px",
                  border: "none",
                  borderRadius: "20px",
                  background: "#e0f2fe",
                  color: "#0369a1",
                  fontWeight: "600",
                }}
              >
                {item}
              </button>
            )
          )}
        </div>

        {/* Chat */}
        <div style={{ flex: 1, minHeight: 0 }}>
          <ChatBox messages={messages} onSend={handleSend} />
        </div>
      </div>
    </div>
  );
}

export default ChatPage;
