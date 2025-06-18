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
  const maxScore = 7;

  // MBTI一致で2点
  if (userA.mbti && userB.mbti && userA.mbti === userB.mbti) {
    score += 2;
  }

  // 趣味の共通点で最大2点
  if (Array.isArray(userA.hobbies) && Array.isArray(userB.hobbies)) {
    const commonHobbies = userA.hobbies.filter((hobby) =>
      userB.hobbies.includes(hobby)
    );
    score += Math.min(commonHobbies.length, 2);
  }

  // コース共通で1点
  if (Array.isArray(userA.courses) && Array.isArray(userB.courses)) {
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
  }

  // 出身一致で1点
  if (userA.hometown && userB.hometown && userA.hometown === userB.hometown) {
    score += 1;
  }

  return Math.round((score / maxScore) * 100); // パーセントで返す
}

// 星を描画する関数
function renderStars(rate) {
  if (typeof rate !== "number") return "☆☆☆☆☆";
  const stars = Math.round((rate / 100) * 5); // 0〜5の整数に変換
  return "★".repeat(stars) + "☆".repeat(5 - stars); // ★★★☆☆
}

export default function Recommend() {
  const { user } = useAuth();
  const [topUser, setTopUser] = useState(null);
  const [otherUsers, setOtherUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecommendedUsers = async () => {
      const currentUserId = user.uid;
      console.log("1. currentUserId:", currentUserId);

      if (!currentUserId) {
        console.warn("ユーザーがログインしていません");
        setLoading(false);
        return;
      }

      const usersSnapshot = await getDocs(collection(db, "mockUsers"));
      let users = usersSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log("2. Firestoreから取得したusers:", users);

      const currentUser = users.find((user) => user.id === currentUserId);
      console.log("3. currentUser:", currentUser);

      if (!currentUser) {
        console.warn("Firestore内にログインユーザーのデータがありません");
        setLoading(false);
        return;
      }

      // 他ユーザーのマッチ度を計算し、降順にソート
      const otherUsersWithMatch = users
        .filter((user) => user.id !== currentUserId)
        .map((user) => ({
          ...user,
          matchRate: calculateMatchRate(currentUser, user),
        }))
        .sort((a, b) => b.matchRate - a.matchRate);

      const selectedUsers = otherUsersWithMatch.slice(0, 4);

      setTopUser(selectedUsers[0]);
      setOtherUsers(selectedUsers.slice(1));
      setLoading(false);
    };

    fetchRecommendedUsers();
  }, []);

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
          </div>
        </div>
      )}

      <h2>その他おすすめ</h2>
      <div className="all-badge-other-pick">
        {otherUsers.length > 0 && <OtherPick user={otherUsers[0]} />}
        {otherUsers.length > 1 && <OtherPick user={otherUsers[1]} />}
        {otherUsers.length > 2 && <OtherPick user={otherUsers[2]} />}
      </div>
    </div>
  );
}
