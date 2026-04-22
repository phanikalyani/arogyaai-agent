import React, { useState } from "react";
import ChatBox from "../components/ChatBox";
import { sendMessage } from "../services/api";

function ChatPage() {
  const [messages, setMessages] = useState([]);

  const handleSend = async (text) => {
    const userMsg = { text, sender: "user" };
    setMessages((prev) => [...prev, userMsg]);

    try {
      const res = await sendMessage(text);

      const botMsg = {
        text: res.reply || "No response",
        sender: "bot",
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { text: "Server error!", sender: "bot" },
      ]);
    }
  };

  return (
    <div className="app-container">
      <ChatBox messages={messages} onSend={handleSend} />
    </div>
  );
}

export default ChatPage;