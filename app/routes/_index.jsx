import { Link } from "@remix-run/react";
import "../styles/home.css"; // ← 追加

export const meta = () => {
  return [
    { title: "マッチングホーム" },
    {
      name: "description",
      content: "プロフィールやチャットにアクセスできます。",
    },
  ];
};

export default function Index() {
  return (
    <div className="home-container">
      <h1>ようこそ！</h1>
      <p>気の合うお友達を見つけよう！🍀</p>

      <div className="home-buttons">
        <Link to="/myprofile" className="home-button">
          👤 プロフィール
        </Link>
        <Link to="/likes" className="home-button">
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
