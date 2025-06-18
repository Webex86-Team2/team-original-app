import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import Navbar from "../components/Navbar";
import OtherPick from "../components/other-pick.jsx";
import "../styles/recommend.css";
import useAuth from "../hooks/useAuth";

// マッチ度計算関数
function calculateMatchRate(userA, userB) {
  let score = 0;
  const maxScore = 14;

  if (userA.mbti && userB.mbti && userA.mbti === userB.mbti) score += 3;
  if (Array.isArray(userA.hobbies) && Array.isArray(userB.hobbies)) {
<<<<<<< sotarow
    const commonHobbies = userA.hobbies.filter(hobby => userB.hobbies.includes(hobby));
    score += Math.min(commonHobbies.length, 5);
=======
    const commonHobbies = userA.hobbies.filter((hobby) =>
      userB.hobbies.includes(hobby)
    );
    score += Math.min(commonHobbies.length, 2);
>>>>>>> main
  }
  if (Array.isArray(userA.courses) && Array.isArray(userB.courses)) {
<<<<<<< sotarow
    const commonCourses = userA.courses.filter(course => userB.courses.includes(course));
    if (commonCourses.length > 0) score += 3;
=======
    const commonCourses = userA.courses.filter((course) =>
      userB.courses.includes(course)
    );
    if (commonCourses.length > 0) score += 1;
  }

  // 大学一致で1点
  if (
    userA.university &&
    userB.university &&
    userA.university === userB.university
  ) {
    score += 1;
>>>>>>> main
  }
  if (userA.university && userB.university && userA.university === userB.university) score += 1;
  if (userA.hometown && userB.hometown && userA.hometown === userB.hometown) score += 1;

  return Math.round((score / maxScore) * 100);
}

// 星を描画する関数
function renderStars(rate) {
<<<<<<< sotarow
  if (typeof rate !== 'number') return "☆☆☆☆☆";
  const stars = Math.round((rate / 100) * 5);
  return "★".repeat(stars) + "☆".repeat(5 - stars);
=======
  if (typeof rate !== "number") return "☆☆☆☆☆";
  const stars = Math.round((rate / 100) * 5); // 0〜5の整数に変換
  return "★".repeat(stars) + "☆".repeat(5 - stars); // ★★★☆☆
>>>>>>> main
}

export default function Recommend() {
  const { user } = useAuth();
  const [topUser, setTopUser] = useState(null);
  const [otherUsers, setOtherUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
<<<<<<< sotarow
    if (!user || !user.uid) {
      setLoading(false);
      return;
    }
=======
    const fetchRecommendedUsers = async () => {
      const currentUserId = user.uid;
      console.log("1. currentUserId:", currentUserId);
>>>>>>> main

    const fetchRecommendedUsers = async () => {
      setLoading(true);
      const currentUserId = user.uid;

      const usersSnapshot = await getDocs(collection(db, "mockUsers"));
      let users = usersSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const currentUser = users.find((u) => u.id === currentUserId);
      if (!currentUser) {
        setLoading(false);
        return;
      }

      const otherUsersWithMatch = users
        .filter((u) => u.id !== currentUserId)
        .map((u) => ({
          ...u,
          matchRate: calculateMatchRate(currentUser, u),
        }))
        .sort((a, b) => b.matchRate - a.matchRate);

      const selectedUsers = otherUsersWithMatch.slice(0, 4);

      setTopUser(selectedUsers[0] || null);
      setOtherUsers(selectedUsers.slice(1));
      setLoading(false);
    };

    fetchRecommendedUsers();
  }, [user]);

  if (loading) {
    return <div>loading</div>;
  }

  if (!topUser) {
    return <div>おすすめユーザーが見つかりません</div>;
  }

  return (
    <div>
      <Navbar />
      <h1>あなたにおすすめ</h1>
<<<<<<< sotarow
      <div className="badge-top-pick">
        <img src={topUser.avatarUrl || "/default.png"} alt={topUser.name} />
        <div>
          <div className="match-rate">
            <span>マッチ度: {topUser.matchRate}%</span>
            <span className="match-stars">{renderStars(topUser.matchRate)}</span>
=======

      {topUser && (
        <div className="badge-top-pick">
          <img src={topUser.avatarUrl || "/default.png"} alt={topUser.name} />
          <div>
            <div className="match-rate">
              <span>マッチ度: {topUser.matchRate}%</span>
              <span className="match-stars">
                {renderStars(topUser.matchRate)}
              </span>
            </div>
            <h3>
              <strong>名前:</strong> {topUser.name}
            </h3>
            <h3>
              <strong>出身:</strong> {topUser.hometown}
            </h3>
            <h3>
              <strong>MBTI:</strong> {topUser.mbti}
            </h3>
            <h3>大学: {topUser.university}</h3>
            <h3>
              コース:{" "}
              {Array.isArray(topUser.courses)
                ? topUser.courses.join("、")
                : topUser.courses}
            </h3>
            <h3>
              趣味:{" "}
              {Array.isArray(topUser.hobbies)
                ? topUser.hobbies.join("、")
                : topUser.hobbies}
            </h3>
            <h3>アピール: {topUser.comment}</h3>
>>>>>>> main
          </div>
          <h3><strong>名前:</strong> {topUser.name}</h3>
          <h3><strong>出身:</strong> {topUser.hometown}</h3>
          <h3><strong>MBTI:</strong> {topUser.mbti}</h3>
          <h3><strong>大学:</strong> {topUser.university}</h3>
          <h3><strong>コース:</strong> {(topUser.courses ?? []).join("、")}</h3>
          <h3><strong>趣味:</strong> {(topUser.hobbies ?? []).join("、")}</h3>
          <h3><strong>アピール:</strong> {topUser.comment}</h3>
        </div>
        <div className="chat-button-area">
          <button className="chat-button">💬 チャットする</button>
        </div>
      </div>

      <h2>その他おすすめ</h2>
      <div className="all-badge-other-pick">
        {otherUsers.map((u, i) => <OtherPick user={u} key={u.id || i} />)}
      </div>
    </div>
  );
}
