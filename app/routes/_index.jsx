import { Link } from "@remix-run/react";

export const meta = () => {
  return [
    { title: "プロフィールマッチングアプリ" },
    { name: "description", content: "プロフィール入力ページに進みましょう！" },
  ];
};

export default function Index() {
  return (
    <div>
      <h1>プロフィールマッチングアプリ</h1>
      <Link to="/sign-in">ログイン</Link>
      <Link to="/sign-up">新規登録</Link>
    </div>
  );
}
