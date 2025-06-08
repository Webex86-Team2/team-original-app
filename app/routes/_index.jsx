import { useEffect } from "react";
import { useNavigate, Link } from "@remix-run/react";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import "../styles/home.css";

export const meta = () => {
  return [
    { title: "フレンドアプリ" },
    {
      name: "description",
      content: "プロフィールやチャットにアクセスできます。",
    },
  ];
};

export default function Index() {
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate("/sign-in"); // 未ログインならサインイン画面へ
      }
    });

    return () => unsubscribe(); // クリーンアップ
  }, [navigate]);

  return (
    <div className="home-container">
      <h1>ようこそ！</h1>
      <p>気の合うお友達を見つけよう！🍀</p>

      <div className="home-buttons">
        <Link to="/myprofile" className="home-button">
          👤 プロフィール
        </Link>
        <Link to="/favorite" className="home-button">
          ❤️ 届いたいいね
        </Link>
        <Link to="/recommend" className="home-button">
          🌟 おすすめ
        </Link>
        <Link to="/chat" className="home-button">
          💬 チャット
        </Link>
      </div>
    </div>
  );
}
