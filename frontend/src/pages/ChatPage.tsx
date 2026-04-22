import React, { useState } from "react";
import ChatBox from "../components/ChatBox";
import { sendMessage } from "../services/api";
import MapView from "../components/MapView";

type Message = {
  text: string;
  sender: "user" | "bot";
};

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [showMap, setShowMap] = useState<boolean>(false);

  const handleSend = async (text: string) => {
    const userMsg: Message = { text, sender: "user" };
    setMessages((prev) => [...prev, userMsg]);

    // Example trigger to show map
    if (
      text.toLowerCase().includes("hospital") ||
      text.toLowerCase().includes("nearby") ||
      text.toLowerCase().includes("map")
    ) {
      setShowMap(true);
    }

    try {
      const res = await sendMessage(text);

      const botMsg: Message = {
        text: res.reply || "No response received.",
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
    <div className="app-container" style={{ padding: "20px" }}>
      <h1 style={{ textAlign: "center" }}>🩺 ArogyaAI Health Agent</h1>

      <ChatBox messages={messages} onSend={handleSend} />

      {showMap && (
        <div style={{ marginTop: "20px" }}>
          <MapView />
        </div>
      )}
    </div>
  );
}
