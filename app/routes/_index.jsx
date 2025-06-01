import { Link } from "@remix-run/react";

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
      <p>このアプリでマッチングを楽しもう🌿</p>

      <div className="home-buttons">
        <Link className="home-button" to="/profile">
          🧑‍💼 プロフィール編集
        </Link>
        <Link className="home-button" to="/likes">
          ❤️ 届いたいいね
        </Link>
        <Link className="home-button" to="/recommend">
          🌟 おすすめ
        </Link>
        <Link className="home-button" to="/chat">
          💬 チャット
        </Link>
      </div>
    </div>
  );
}
