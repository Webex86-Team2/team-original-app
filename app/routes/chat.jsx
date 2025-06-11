import { useEffect, useState } from "react";
import { useNavigate } from "@remix-run/react";
import "../styles/chat.css";
import Navbar from "../components/Navbar";
import { auth, db } from "../firebase";
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  getDoc,
} from "firebase/firestore";

export default function Chat() {
  const [matchedUsers, setMatchedUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMatchedUsers = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const uid = user.uid;

      // 自分が送ったいいね
      const sentLikesSnap = await getDocs(
        query(collection(db, "likes"), where("fromUserId", "==", uid))
      );
      const sentTo = sentLikesSnap.docs.map((doc) => doc.data().toUserId);

      // 自分が受け取ったいいね
      const receivedLikesSnap = await getDocs(
        query(collection(db, "likes"), where("toUserId", "==", uid))
      );
      const receivedFrom = receivedLikesSnap.docs.map(
        (doc) => doc.data().fromUserId
      );

      // 相互いいねのユーザー（マッチしたユーザー）
      const matchedIds = sentTo.filter((id) => receivedFrom.includes(id));

      // マッチしたユーザーのプロフィール取得
      const matchedProfiles = [];
      for (const id of matchedIds) {
        const userRef = doc(db, "users", id);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          matchedProfiles.push({ id, ...userSnap.data() });
        }
      }

      setMatchedUsers(matchedProfiles);
    };

    fetchMatchedUsers();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="chat-container">
        <h1 className="chat-title">💬 マッチした相手</h1>
        <div className="chat-user-list">
          {matchedUsers.length === 0 && <p>まだマッチした相手がいません。</p>}
          {matchedUsers.map((user) => (
            <div
              key={user.id}
              className="chat-user"
              onClick={() => navigate(`/chat/${user.id}`)}
            >
              <img
                src={user.photoUrl}
                alt="ユーザーアイコン"
                className="chat-user-icon"
              />
              <span className="chat-user-name">{user.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
