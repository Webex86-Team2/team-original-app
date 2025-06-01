import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import "../styles/recommend.css";
import Navbar from "../components/Navbar";

export default function Recommend() {
  const [myProfile, setMyProfile] = useState(null);
  const [recommendations, setRecommendations] = useState([]);

  // マッチスコアを計算
  const calculateMatchScore = (user, me) => {
    let score = 0;
    const keys = [
      "hometown",
      "university",
      "mbti",
      "Course",
      "Role",
      "hobbies",
    ];
    keys.forEach((key) => {
      if (user[key] && me[key] && user[key] === me[key]) {
        score++;
      }
    });
    return score;
  };

  useEffect(() => {
    const fetchData = async () => {
      const saved = localStorage.getItem("myProfile");
      if (!saved) return;
      const myData = JSON.parse(saved);
      setMyProfile(myData);

      const snapshot = await getDocs(collection(db, "profiles"));
      const users = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        if (data.name !== myData.name) {
          const score = calculateMatchScore(data, myData);
          users.push({ ...data, score });
        }
      });

      users.sort((a, b) => b.score - a.score);
      setRecommendations(users);
    };

    fetchData();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="recommend-container">
        <h1>🌟 おすすめのユーザー 🌟</h1>
        {recommendations.map((user, i) => (
          <div key={i} className="user-card">
            <img
              src={user.photoUrl || "/icons/user-a.png"}
              alt="プロフィール画像"
            />
            <p>{user.name}</p>
            <p>マッチ度：{user.score}点</p>
          </div>
        ))}
      </div>
    </div>
  );
}
