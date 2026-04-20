import React, { useState } from "react";
import MessageBubble from "../components/MessageBubble";
import Loader from "./Loader";

function ChatBox({ messages, onSend }) {
  const [input, setInput] = useState(""); 
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!input.trim()) return;

    setLoading(true);
    await onSend(input);
    setInput("");
    setLoading(false);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>🩺 ArogyaAI Assistant</h2>

      <div style={styles.chatArea}>
        {messages.map((msg, index) => (
          <MessageBubble key={index} message={msg} />
        ))}
        {loading && <Loader />}
      </div>

      <div style={styles.inputArea}>
        <input
          style={styles.input}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter symptoms..."
        />
        <button style={styles.button} onClick={handleSubmit}>
          Send
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    width: "400px",
    background: "#fff",
    borderRadius: "10px",
    padding: "15px",
    display: "flex",
    flexDirection: "column",
    height: "80vh",
  },
  header: {
    textAlign: "center",
  },
  chatArea: {
    flex: 1,
    overflowY: "auto",
    margin: "10px 0",
  },
  inputArea: {
    display: "flex",
  },
  input: {
    flex: 1,
    padding: "10px",
  },
  button: {
    padding: "10px",
    background: "#007bff",
    color: "#fff",
    border: "none",
  },
};

export default ChatBox;