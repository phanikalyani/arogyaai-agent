// ChatBox.jsx

import React, { useState, useRef, useEffect } from "react";

function ChatBox({ messages, onSend, loading = false }) {
  const [text, setText] = useState("");
  const messagesEndRef = useRef(null);
  const recognitionRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!text.trim() || loading) return;

    onSend(text);
    setText("");
  };

  const startVoice = () => {
    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert(
        "Voice recognition is not supported in this browser."
      );
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event) => {
      const spokenText =
        event.results[0][0].transcript;

      setText(spokenText);
    };

    recognition.start();
    recognitionRef.current = recognition;
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background: "#ffffff",
      }}
    >
      {/* Messages */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "22px",
          background: "#f8fafc",
        }}
      >
        {messages.length === 0 && (
          <div
            style={{
              textAlign: "center",
              marginTop: "140px",
              color: "#64748b",
              fontSize: "18px",
              lineHeight: "1.8",
            }}
          >
            Try:
            <br />
            • Fever for 2 days
            <br />
            • Headache remedies
            <br />
            • Nearby hospitals
            <br />
            • Diet for diabetes
          </div>
        )}

        {messages.map((msg, index) => {
          const isUser = msg.sender === "user";

          return (
            <div
              key={index}
              style={{
                display: "flex",
                justifyContent: isUser
                  ? "flex-end"
                  : "flex-start",
                marginBottom: "16px",
              }}
            >
              <div
                style={{
                  maxWidth: "78%",
                  padding: "14px 18px",
                  borderRadius: "18px",
                  background: isUser
                    ? "#0ea5e9"
                    : "#ffffff",
                  color: isUser
                    ? "white"
                    : "#0f172a",
                  boxShadow:
                    "0 6px 16px rgba(0,0,0,0.06)",
                  lineHeight: "1.7",
                  fontSize: "15px",
                  whiteSpace: "pre-wrap",
                  borderBottomRightRadius: isUser
                    ? "6px"
                    : "18px",
                  borderBottomLeftRadius: isUser
                    ? "18px"
                    : "6px",
                }}
              >
                {!isUser && (
                  <div
                    style={{
                      fontSize: "12px",
                      fontWeight: "700",
                      color: "#10b981",
                      marginBottom: "8px",
                    }}
                  >
                    🩺 ArogyaAI
                  </div>
                )}

                {msg.text}
                {/* Risk Badge */}
                {msg.risk && (
                  <div
                    style={{
                      marginTop: "10px",
                      padding: "8px 12px",
                      borderRadius: "12px",
                      background: msg.risk.bg,
                      color: msg.risk.color,
                      fontWeight: "700",
                      fontSize: "13px",
                      display: "inline-block",
                    }}
                  >
                    {msg.risk.label}
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {/* Typing Indicator */}
        {loading && (
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              marginBottom: "16px",
            }}
          >
            <div
              style={{
                padding: "14px 18px",
                borderRadius: "18px",
                background: "#ffffff",
                boxShadow:
                  "0 6px 16px rgba(0,0,0,0.06)",
                color: "#10b981",
                fontWeight: "700",
              }}
            >
              🩺 ArogyaAI is typing...
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          gap: "12px",
          padding: "18px",
          background: "white",
          borderTop: "1px solid #e2e8f0",
        }}
      >
        <input
          type="text"
          value={text}
          onChange={(e) =>
            setText(e.target.value)
          }
          placeholder="Describe your symptoms..."
          style={{
            flex: 1,
            padding: "14px 16px",
            borderRadius: "14px",
            border: "1px solid #cbd5e1",
            fontSize: "15px",
            outline: "none",
          }}
        />
        <button
          type="button"
          onClick={startVoice}
          style={{
            padding: "14px 18px",
            border: "none",
            borderRadius: "14px",
            background: "#f1f5f9",
            fontWeight: "700",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          🎤
        </button>

        <button
          type="submit"
          disabled={loading}
          style={{
            padding: "14px 24px",
            border: "none",
            borderRadius: "14px",
            background:
              "linear-gradient(90deg,#0ea5e9,#10b981)",
            color: "white",
            fontWeight: "700",
            fontSize: "15px",
            cursor: loading
              ? "not-allowed"
              : "pointer",
            opacity: loading ? 0.7 : 1,
            boxShadow:
              "0 8px 20px rgba(14,165,233,0.25)",
          }}
        >
          Send
        </button>
      </form>
    </div>
  );
}

export default ChatBox;