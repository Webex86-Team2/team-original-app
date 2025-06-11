import { useEffect, useState } from "react";
import UserCard from "../components/UserCard";
import "../styles/favorite.css";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export default function Favorite() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const getUsers = async () => {
      const usersData = await getDocs(collection(db, "users"));
      const users = usersData.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsers(users);
    };

    getUsers();
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
