import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { auth, db } from "../firebase";
import Navbar from "../components/Navbar";
import OtherPick from "../components/other-pick.jsx";
import "../styles/recommend.css";

// マッチ度計算関数
function calculateMatchRate(userA, userB) {
  let score = 0;
  const maxScore = 5;

  // MBTI一致で2点
  if (userA.mbti && userB.mbti && userA.mbti === userB.mbti) {
    score += 2;
  }

  // 趣味の共通点で最大2点
  if (Array.isArray(userA.hobbies) && Array.isArray(userB.hobbies)) {
    const commonHobbies = userA.hobbies.filter(hobby => userB.hobbies.includes(hobby));
    score += Math.min(commonHobbies.length, 2);
  }

  // コースが1つでも共通なら1点
  if (Array.isArray(userA.courses) && Array.isArray(userB.courses)) {
    const commonCourses = userA.courses.filter(course => userB.courses.includes(course));
    if (commonCourses.length > 0) {
      score += 1;
    }
  }

  return Math.round((score / maxScore) * 100); // パーセントで返す
}

export default function Recommend() {
  const [topUser, setTopUser] = useState(null);
  const [otherUsers, setOtherUsers] = useState([]);

  useEffect(() => {
    const fetchRecommendedUsers = async () => {
      const currentUserId = auth.currentUser?.uid;
      if (!currentUserId) return;

      const usersSnapshot = await getDocs(collection(db, "mockUsers"));
      let users = usersSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // 自分のユーザーデータを探す
      const currentUser = users.find((user) => user.id === currentUserId);
      if (!currentUser) return;

      // 自分を除く
      users = users.filter((user) => user.id !== currentUserId);

      // それぞれのユーザーにマッチ度を計算して追加
      users = users.map(user => ({
        ...user,
        matchRate: calculateMatchRate(currentUser, user),
      }));

      // 最初の4人を選ぶ
      const selectedUsers = users.slice(0, 4);

      setTopUser(selectedUsers[0]);
      setOtherUsers(selectedUsers.slice(1));
    };

    fetchRecommendedUsers();
  }, []);

  if (!topUser) {
    return <div>loading</div>;
  }

  return (
    <div>
      <Navbar />
      <h1>あなたにおすすめ</h1>

      {topUser && (
        <div className="badge-top-pick">
          <img src={topUser.avatarUrl || "/default.png"} alt={topUser.name} />
          <div>
            <h3><strong>マッチ度:</strong> {topUser.matchRate || "??"}%</h3>
            <h3><strong>名前:</strong> {topUser.name}</h3>
            <h3><strong>出身:</strong> {topUser.hometown}</h3>
            <h3><strong>MBTI:</strong> {topUser.mbti}</h3>
            <h3>大学: {topUser.university}</h3>
            <h3>コース: {Array.isArray(topUser.courses) ? topUser.courses.join("、") : topUser.courses}</h3>
            <h3>趣味: {Array.isArray(topUser.hobbies) ? topUser.hobbies.join("、") : topUser.hobbies}</h3>
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
