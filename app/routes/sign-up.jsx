import { useState } from "react";
import "../styles/auth/sign-up.css";
import { createUserWithEmailAndPassword} from "firebase/auth";
import { auth } from "../firebase";
import { Link, useNavigate } from "@remix-run/react"; // ← navigate を追加

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // ← navigate を使えるようにする

  // サインアップ処理
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("新規登録しました");
      navigate("/profile"); //トップページへ遷移
    } catch (error) {
      alert("新規登録に失敗しました: " + error.message);
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

        <Link to="/sign-in">ログインはこちら</Link>
      </div>
    </div>
  );
}
