import { useState, useEffect, useRef } from "react";
import { auth, db, storage } from "../firebase";
import {
  collection,
  addDoc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  deleteDoc,
  doc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import "../styles/chat.css";

export default function TestChat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [selectedMsgId, setSelectedMsgId] = useState(null);
  const chatBoxRef = useRef(null);
  const roomId = "testroom"; // 固定ルームID

  useEffect(() => {
    const q = query(
      collection(db, "chats", roomId, "messages"),
      orderBy("createdAt")
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setMessages(msgs);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    const markAsRead = async () => {
      const currentUser = auth.currentUser;
      if (!currentUser) return;

      const updates = messages.filter(
        (msg) =>
          msg.sender !== currentUser.uid &&
          !msg.readBy?.includes(currentUser.uid)
      );

      for (const msg of updates) {
        const msgRef = doc(db, "chats", roomId, "messages", msg.id);
        await updateDoc(msgRef, {
          readBy: arrayUnion(currentUser.uid),
        });
      }
    };

    markAsRead();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const currentUser = auth.currentUser;
    if (!currentUser) return;

    await addDoc(collection(db, "chats", roomId, "messages"), {
      sender: currentUser.uid,
      senderName: currentUser.displayName || "名無し",
      senderPhoto: currentUser.photoURL || "/default-icon.png",
      text: input.trim(),
      type: "text",
      createdAt: serverTimestamp(),
      readBy: [currentUser.uid],
    });

    setInput("");
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const currentUser = auth.currentUser;
    if (!currentUser) return;

    const storageRef = ref(storage, `chat-images/${Date.now()}_${file.name}`);
    await uploadBytes(storageRef, file);
    const imageUrl = await getDownloadURL(storageRef);

    await addDoc(collection(db, "chats", roomId, "messages"), {
      sender: currentUser.uid,
      senderName: currentUser.displayName || "名無し",
      senderPhoto: currentUser.photoURL || "/default-icon.png",
      type: "image",
      imageUrl: imageUrl,
      createdAt: serverTimestamp(),
      readBy: [currentUser.uid],
    });
  };

  const handleStampSend = async (imageUrl) => {
    const currentUser = auth.currentUser;
    if (!currentUser) return;

    await addDoc(collection(db, "chats", roomId, "messages"), {
      sender: currentUser.uid,
      senderName: currentUser.displayName || "名無し",
      senderPhoto: currentUser.photoURL || "/default-icon.png",
      type: "stamp",
      imageUrl: imageUrl,
      createdAt: serverTimestamp(),
      readBy: [currentUser.uid],
    });
  };

  const handleDelete = async (id) => {
    const ok = window.confirm("このメッセージを削除しますか？");
    if (!ok) return;
    await deleteDoc(doc(db, "chats", roomId, "messages", id));
    setSelectedMsgId(null);
  };

  return (
    <div className="simple-chat">
      <div className="chat-box" ref={chatBoxRef}>
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`chat-message ${
              msg.sender === auth.currentUser?.uid ? "right" : "left"
            }`}
            onClick={() =>
              msg.sender === auth.currentUser?.uid
                ? setSelectedMsgId(selectedMsgId === msg.id ? null : msg.id)
                : null
            }
          >
            {msg.sender !== auth.currentUser?.uid && (
              <img src={msg.senderPhoto} alt="icon" className="chat-icon" />
            )}

            <div className="chat-bubble">
              {msg.type === "text" && <span>{msg.text}</span>}
              {msg.type === "image" && (
                <img src={msg.imageUrl} alt="送信画像" className="chat-image" />
              )}
              {msg.type === "stamp" && (
                <img src={msg.imageUrl} alt="スタンプ" className="chat-stamp" />
              )}
              {msg.sender === auth.currentUser?.uid && (
                <div className="chat-status">
                  <span className="chat-timestamp">
                    {msg.createdAt?.toDate().toLocaleTimeString("ja-JP", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                  <span className="chat-read">
                    {msg.readBy?.length > 1 ? "✓✓ 既読" : "✓ 送信済"}
                  </span>
                </div>
              )}
              {msg.sender === auth.currentUser?.uid &&
                selectedMsgId === msg.id && (
                  <button
                    onClick={() => handleDelete(msg.id)}
                    style={{
                      marginLeft: "8px",
                      background: "transparent",
                      border: "none",
                      color: "#999",
                      fontSize: "0.8rem",
                      cursor: "pointer",
                    }}
                  >
                    削除
                  </button>
                )}
            </div>
          </div>
        ))}
      </div>

      <div className="chat-input">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          style={{ marginRight: "0.5rem" }}
        />
        <input
          type="text"
          value={input}
          placeholder="メッセージを入力..."
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button onClick={handleSend}>送信</button>
      </div>

      <div className="stamp-panel">
        <img
          src="/stamps/happy.png"
          alt="スタンプ"
          className="stamp-option"
          onClick={() => handleStampSend("/stamps/happy.png")}
        />
        <img
          src="/stamps/love.png"
          alt="スタンプ"
          className="stamp-option"
          onClick={() => handleStampSend("/stamps/love.png")}
        />
        <img
          src="/stamps/thumbs-up.png"
          alt="スタンプ"
          className="stamp-option"
          onClick={() => handleStampSend("/stamps/thumbs-up.png")}
        />
      </div>
    </div>
  );
}
