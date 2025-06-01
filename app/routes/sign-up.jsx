import { useState } from "react";
import "../styles/auth/sign-up.css";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // 送信ボタンを押した時の処理
  // サインアップ処理を行う関数
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("新規登録しました");
    } catch (error) {
      alert("新規登録に失敗しました");
      console.error(error);
    }
  };
  return (
    <div className="sign-up-page">
      <h1>新規登録</h1>

      <div className="sign-up-form">
        <form onSubmit={handleSubmit}>
          {/* メールアドレス */}
          <div className="form-group">
            <label htmlFor="email">メールアドレス</label>
            <input
              type="email"
              name="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          {/* パスワード */}
          <div className="form-group">
            <label htmlFor="password">パスワード</label>
            <input
              type="password"
              name="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="sign-up-button">
            新規登録
          </button>
        </form>
        <p>ログインはこちら</p>
      </div>
    </div>
  );
}
