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
          <button
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
              <img
                src="data:image/png;base64,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"
                alt="icon"
                className="chat-icon"
              />
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
          </button>
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
        <button
          className="stamp-option"
          onClick={() => handleStampSend("/stamps/happy.png")}
        >
          <img
            src="/stamps/happy.png"
            alt="スタンプ"
            className="stamp-option"
          />
        </button>
        <button
          className="stamp-option"
          onClick={() => handleStampSend("/stamps/love.png")}
        >
          <img src="/stamps/love.png" alt="スタンプ" className="stamp-option" />
        </button>
        <button
          className="stamp-option"
          onClick={() => handleStampSend("/stamps/thumbs-up.png")}
        >
          <img
            src="/stamps/thumbs-up.png"
            alt="スタンプ"
            className="stamp-option"
          />
        </button>
      </div>
    </div>
  );
}
