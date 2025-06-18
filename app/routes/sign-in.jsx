import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import "../styles/auth/sign-in.css";
import { useState } from "react";
import { auth } from "../firebase";
import { Link, useNavigate } from "@remix-run/react";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // ログインボタンをクリックしたときの処理
  const handleSubmit = async (e) => {
    e.preventDefault(); // デフォルトの動作を防止
    try {
      // ログイン処理
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/test/profile");
    } catch (error) {
      alert("ログインに失敗しました: " + error.message);
    }
  };

  // Googleログイン処理
  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();

    try {
      await signInWithPopup(auth, provider);
      navigate("/test/profile");
    } catch (error) {
      alert("Googleログインに失敗しました: " + error.message);
    }
  };

  return (
    <div className="sign-in-page">
      <h1>ログイン</h1>

      <div className="sign-in-form">
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
          <button type="submit" className="sign-in-button">
            ログイン
          </button>
        </form>
        <button onClick={handleGoogleSignIn} className="google-button">
          Googleでログイン
        </button>
        <Link to="/sign-up">新規登録はこちら</Link>
      </div>
    </div>
  );
}
