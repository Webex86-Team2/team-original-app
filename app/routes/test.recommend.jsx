import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import useAuth from "../hooks/useAuth";
import { Box, Container, Typography } from "@mui/material";
import RecommendCard from "../components/ui/RecommendCard";

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

export default function TestRecommend() {
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
    <Container>
      <Typography variant="h6" sx={{ fontWeight: "bold", mt: 2, mb: 2 }}>
        あなたにおすすめ
      </Typography>

      {topUser && <RecommendCard user={topUser} />}

      <Typography variant="h6" sx={{ fontWeight: "bold", mt: 2, mb: 2 }}>
        その他おすすめ
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {otherUsers.map((user) => (
          <RecommendCard key={user.id} user={user} />
        ))}
      </Box>
    </Container>
  );
}
