import { useState, useEffect } from "react";
import "../styles/chat.css";

export default function Chat() {
  const [myIcon, setMyIcon] = useState("/icons/me.png"); // デフォルトアイコン

  useEffect(() => {
    const savedPhoto = localStorage.getItem("photoUrl");
    if (savedPhoto) {
      setMyIcon(savedPhoto);
    }
  }, []);

  const [messages, setMessages] = useState([
    { sender: "Aさん", text: "こんにちは！", iconUrl: "/icons/user-a.png" },
    {
      sender: "自分",
      text: "はじめまして🌸",
      iconUrl: localStorage.getItem("photoUrl") || "/icons/me.png",
    },
  ]);

  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages((prev) => [
      ...prev,
      { sender: "自分", text: input, iconUrl: myIcon },
    ]);
    setInput("");
  };

  return (
    <div className="chat-container">
      <h1 className="chat-title">💬 トークルーム</h1>
      <div className="chat-box">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`chat-message ${
              msg.sender === "自分" ? "right" : "left"
            }`}
          >
            <img
              className="chat-icon"
              src={msg.sender === "自分" ? myIcon : msg.iconUrl}
              alt="ユーザーアイコン"
            />
            <div className="chat-bubble">{msg.text}</div>
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
