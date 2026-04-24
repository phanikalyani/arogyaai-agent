// ChatPage.jsx
import React, { useState } from "react";
import ChatBox from "../components/ChatBox";
import { sendMessage } from "../services/api";

import jsPDF from "jspdf";
function ChatPage() {
  const [messages, setMessages] = useState([
    {
      text:
        "Hello 👋 I’m ArogyaAI, your smart health assistant.\nDescribe symptoms, ask wellness questions, or request emergency help.",
      sender: "bot",
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState(
    JSON.parse(localStorage.getItem("chatHistory")) || []
  );
  const getRiskLevel = (text) => {
    const input = text.toLowerCase();
    if (
      input.includes("chest pain") ||
      input.includes("breathing") ||
      input.includes("stroke") ||
      input.includes("blood")
    ) {
      return {
        label: "🔴 Urgent Care Recommended",
        color: "#dc2626",
        bg: "#fee2e2",
      };
    }
    if (
      input.includes("fever") ||
      input.includes("pain") ||
      input.includes("vomit") ||
      input.includes("infection")
    ) {
      return {
        label: "🟡 Moderate Risk",
        color: "#d97706",
        bg: "#fef3c7",
      };
    }
    return {
      label: "🟢 Low Risk",
      color: "#059669",
      bg: "#d1fae5",
    };
  };
  const handleSend = async (text) => {
    const userMessage = {
      text,
      sender: "user",
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    try {
      const res = await sendMessage(text);
      const risk = getRiskLevel(text);

      const botMessage = {
        text: res.reply || "No response available.",
        sender: "bot",
        risk,
      };
      
      const updatedMessages = [...messages, userMessage, botMessage];
      setMessages(updatedMessages);

      const newSession = {
        id: Date.now(),
        title: text,
        messages: updatedMessages,
      };

      const updatedHistory = [newSession, ...history];
      setHistory(updatedHistory);
      localStorage.setItem(
        "chatHistory",
        JSON.stringify(updatedHistory)
      );
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          text: "⚠️ Server error. Please try again.",
          sender: "bot",
        },
      ]);
    }

    setLoading(false);
  };

  const clearHistory = () => {
    localStorage.removeItem("chatHistory");
    setHistory([]);
  };
  const downloadReport = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("ArogyaAI Consultation Report", 10, 15);
    doc.setFontSize(12);
    let y = 30;
    messages.forEach((msg) => {
      const sender =
        msg.sender === "user" ? "User" : "ArogyaAI";
      const lines = doc.splitTextToSize(
        `${sender}: ${msg.text}`,
        180
      );
      doc.text(lines, 10, y);
      y += lines.length * 8 + 5;

      if (y > 270) {
        doc.addPage();
        y = 20;
      }
    });
    doc.save("ArogyaAI_Report.pdf");
  };
  return (
    <div className="app-container">
      <div
        className="card"
        style={{
          width: "100%",
          maxWidth: "1280px",
          height: "88vh",
          display: "flex",
          overflow: "hidden",
          padding: 0,
        }}
      >
        {/* Sidebar */}
        <div
          style={{
            width: "280px",
            background: "#ffffff",
            borderRight: "1px solid #e2e8f0",
            padding: "16px",
            overflowY: "auto",
          }}
        >
          <h3 style={{ marginBottom: "12px" }}>
            📚 Chat History
          </h3>

          <button
            onClick={clearHistory}
            style={{
              width: "100%",
              padding: "10px",
              border: "none",
              borderRadius: "10px",
              background: "#fee2e2",
              color: "#b91c1c",
              fontWeight: "700",
              cursor: "pointer",
              marginBottom: "14px",
            }}
          >
            Clear History
          </button>

          {history.length === 0 && (
            <div style={{ color: "#64748b" }}>
              No previous chats.
            </div>
          )}
          {history.map((item) => (
            <div
              key={item.id}
              onClick={() => setMessages(item.messages)}
              style={{
                padding: "12px",
                marginBottom: "10px",
                background: "#f8fafc",
                borderRadius: "12px",
                cursor: "pointer",
                fontWeight: "600",
                fontSize: "14px",
              }}
            >
              {item.title}
            </div>
          ))}
        </div>

        {/* Main Area */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: "18px 22px",
              background:
                "linear-gradient(90deg,#0ea5e9,#10b981)",
              color: "white",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "10px",
              flexWrap: "wrap",
            }}
          >
            <div
              style={{
                fontSize: "24px",
                fontWeight: "700",
              }}
            >
              🩺 ArogyaAI Smart Health Assistant
            </div>
            <div
              style={{
                display: "flex",
                gap: "10px",
              }}
            >
              <button
                onClick={downloadReport}
                style={{
                  padding: "10px 14px",
                  border: "none",
                  borderRadius: "12px",
                  background: "white",
                  color: "#10b981",
                  fontWeight: "700",
                  cursor: "pointer",
                }}
              >
                📄 PDF Report
              </button>

              <button
                onClick={() =>
                  window.open(
                    "https://www.google.com/maps/search/hospitals+near+me",
                    "_blank"
                  )
                }
                style={{
                  padding: "10px 14px",
                  border: "none",
                  borderRadius: "12px",
                  background: "#ef4444",
                  color: "white",
                  fontWeight: "700",
                  cursor: "pointer",
                }}
              >
                🚑 Hospitals
              </button>
            </div>
          </div>
          {/* Quick Symptom Buttons */}
          <div
            style={{
              display: "flex",
              gap: "10px",
              flexWrap: "wrap",
              padding: "14px 18px",
              background: "#f8fafc",
              borderBottom: "1px solid #e2e8f0",
            }}
          >
            {[
              "Fever",
              "Headache",
              "Cold",
              "Cough",
              "Chest Pain",
              "Diabetes",
              "BP",
              "Skin Rash",
              "Fitness",
            ].map((item, i) => (
              <button
                key={i}
                onClick={() => handleSend(item)}
                style={{
                  padding: "8px 14px",
                  border: "none",
                  borderRadius: "20px",
                  background: "#e0f2fe",
                  color: "#0369a1",
                  fontWeight: "700",
                  cursor: "pointer",
                }}
              >
                {item}
              </button>
            ))}
          </div>

          {/* Chat */}
          <div style={{ flex: 1, minHeight: 0 }}>
            <ChatBox
              messages={messages}
              onSend={handleSend}
              loading={loading}
            />
          </div>

          {/* Footer */}
          <div
            style={{
              padding: "10px 18px",
              fontSize: "12px",
              background: "#ecfeff",
              color: "#0f766e",
              borderTop: "1px solid #d1fae5",
            }}
          >
            Informational guidance only. Consult a doctor for emergencies.
          </div>
        </div>
      </div>
    </div>
  );
}
export default ChatPage;
