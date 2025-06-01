import { useState } from "react";
import "../styles/chat.css";

export default function Chat() {
  const [messages, setMessages] = useState([
    { sender: "Aさん", text: "こんにちは！", icon: "🧑" },
    { sender: "自分", text: "はじめまして🌸", icon: "😊" },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim() === "") return;
    setMessages([...messages, { sender: "自分", text: input, icon: "😊" }]);
    setInput("");
  };

  return (
    <div className="chat-container">
      <h1 className="chat-title">💬 トークルーム</h1>
      <div className="chat-box">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`chat-bubble ${
              msg.sender === "自分" ? "right" : "left"
            }`}
          >
            <div className="chat-icon">{msg.icon}</div>
            <div className="chat-text">{msg.text}</div>
          </div>
        ))}
      </div>

      <div className="chat-input">
        <input
          type="text"
          value={input}
          placeholder="メッセージを入力..."
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={handleSend}>送信</button>
      </div>
    </div>
  );
}
