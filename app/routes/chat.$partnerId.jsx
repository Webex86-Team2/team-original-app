import { useEffect, useState } from "react";
import { useParams } from "@remix-run/react";
import { auth, db } from "../../firebase";
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import Navbar from "~/components/Navbar";
import "~/styles/chat.css";

export default function ChatRoom() {
  const { partnerId } = useParams(); // URLの /chat/:partnerId から取得
  const currentUser = auth.currentUser;

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  // ✅ チャットルームIDは2人のUIDをソートして結合（順番が逆でも同じになるように）
  const getRoomId = (uid1, uid2) => {
    return [uid1, uid2].sort().join("_");
  };

  const roomId = currentUser ? getRoomId(currentUser.uid, partnerId) : null;

  // ✅ メッセージをリアルタイム取得
  useEffect(() => {
    if (!roomId) return;

    const q = query(
      collection(db, "chats", roomId, "messages"),
      orderBy("createdAt")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map((doc) => doc.data());
      setMessages(msgs);
    });

    return () => unsubscribe();
  }, [roomId]);

  // ✅ メッセージ送信
  const handleSend = async () => {
    if (!input.trim() || !currentUser) return;

    await addDoc(collection(db, "chats", roomId, "messages"), {
      sender: currentUser.uid,
      text: input.trim(),
      createdAt: serverTimestamp(),
    });

    setInput("");
  };

  return (
    <div>
      <Navbar />
      <div className="chat-container">
        <h1 className="chat-title">💬 チャットルーム</h1>

        <div className="chat-box">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`chat-message ${
                msg.sender === currentUser.uid ? "right" : "left"
              }`}
            >
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
    </div>
  );
}
