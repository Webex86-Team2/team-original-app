import { useEffect, useState } from "react";
import UserCard from "../components/UserCard";
import "../styles/favorite.css";
import { collection, getDocs, limit, query } from "firebase/firestore";
import { auth, db } from "../firebase";

export default function Favorite() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const currentUserId = auth.currentUser?.uid;
      const q = query(collection(db, "mockUsers"), limit(12));
      const usersSnapshot = await getDocs(q);

      const users = usersSnapshot.docs
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        .filter((user) => user.id !== currentUserId);
      setUsers(users);
    };

    try {
      fetchUsers();
    } catch (error) {
      console.error("ユーザー情報の取得に失敗しました", error);
    }
  }, []);

  return (
    <div className="favorite">
      <h1>いいねがありました！</h1>
      <div className="cards-container">
        {users.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
}
