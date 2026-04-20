import React, { useState } from "react";
import ChatBox from "../components/ChatBox";
import { sendMessage } from "../services/api";
import MapView from "../components/MapView";

function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [showMap, setShowMap] = useState(false);

  const handleSend = async (text) => {
    const userMsg = { text, sender: "user" };
    setMessages((prev) => [...prev, userMsg]);

    try {
      const res = await sendMessage(text);

      const botMsg = {
        text: res.reply,
        sender: "bot",
      };

      setMessages((prev) => [...prev, botMsg]);

      // Show map for emergency / hospital keywords
      const lowerText = text.toLowerCase();

      if (
        lowerText.includes("hospital") ||
        lowerText.includes("doctor") ||
        lowerText.includes("emergency") ||
        lowerText.includes("clinic")
      ) {
        setShowMap(true);
      }
    } catch (err) {
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
