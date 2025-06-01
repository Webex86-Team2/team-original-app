import { Link } from "@remix-run/react";

export const meta = () => {
  return [
    { title: "プロフィールマッチングアプリ" },
    { name: "description", content: "プロフィール入力ページに進みましょう！" },
  ];
};

export default function Index() {
  return (
    <div
      style={{
        fontFamily: "system-ui, sans-serif",
        padding: "2rem",
        textAlign: "center",
      }}
    >
      <h1>ようこそ！</h1>
      <p>このアプリではプロフィールを入力してマッチングできます。</p>
      <Link
        to="/profile"
        style={{
          display: "inline-block",
          marginTop: "1rem",
          padding: "0.75rem 1.5rem",
          backgroundColor: "#4CAF50",
          color: "white",
          borderRadius: "8px",
          textDecoration: "none",
        }}
      >
        ▶ プロフィールを編集する
      </Link>
    </div>
  );
}
