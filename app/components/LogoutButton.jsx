import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "@remix-run/react";

export default function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      alert("ログアウトしました");
      navigate("/sign-in");
    } catch (error) {
      alert("ログアウトに失敗しました: " + error.message);
    }
  };

  return (
    <button onClick={handleLogout} className="logout-button">
      🚪 ログアウト
    </button>
  );
}
