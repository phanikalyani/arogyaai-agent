import React from "react";

function MessageBubble({ message }) {
  const isUser = message.sender === "user";

  return (
    <div
      style={{
        display: "flex",
        justifyContent: isUser ? "flex-end" : "flex-start",
        margin: "8px 0",
      }}
    >
      <div
        style={{
          background: isUser ? "#0d6efd" : "#e9e9ee",
          color: isUser ? "#fff" : "#000",
          padding: "12px 14px",
          borderRadius: "12px",
          maxWidth: "75%",
          whiteSpace: "pre-wrap",
          wordBreak: "break-word",
          lineHeight: "1.4",
          fontSize: "16px",
        }}
      >
        {message.text}
      </div>
    </div>
  );
}

export default MessageBubble;