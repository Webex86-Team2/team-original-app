import { useEffect, useState } from "react";
import { useNavigate } from "@remix-run/react";
import "../styles/profile.css";
import Navbar from "../components/Navbar";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";

const labelMap = {
  name: "名前",
  hometown: "出身地",
  university: "大学",
  mbti: "MBTI",
  photoUrl: "プロフィール画像",
  courses: "コース",
  roles: "役職",
  hobbies: "趣味",
};

export default function MyProfile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true); // ← 読み込み中フラグ追加
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        alert("ログインしていません。ログインしてください。");
        window.location.href = "/sign-in";
        return;
      }

      try {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setProfile(docSnap.data());
        } else {
          console.log("プロフィールが見つかりません");
        }
      } catch (error) {
        console.error("プロフィールの取得中にエラーが発生:", error);
      } finally {
        setLoading(false); // ← ここ忘れずに！
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  if (loading) {
    return (
      <p style={{ textAlign: "center", marginTop: "2rem" }}>読み込み中...</p>
    );
  }

  if (!profile) {
    return (
      <div>
        <Navbar />
        <p style={{ textAlign: "center", marginTop: "2rem" }}>
          プロフィールがまだ保存されていません
        </p>
        <div style={{ textAlign: "center" }}>
          <button onClick={() => navigate("/profile")}>✏️ 編集する</button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="main-content">
        <div className="profile-container">
          <h1>マイプロフィール</h1>

          {profile.photoUrl && (
            <img
              src={profile.photoUrl}
              alt="プロフィール画像"
              className="profile-photo"
            />
          )}

          <div className="profile-display">
            {Object.entries(profile).map(([key, value]) =>
              key !== "photoUrl" && key !== "createdAt" ? (
                <p key={key}>
                  <strong>{labelMap[key] || key}：</strong>{" "}
                  {value || "（未入力）"}
                </p>
              ) : null
            )}
          </div>

          <button className="edit-button" onClick={() => navigate("/profile")}>
            ✏️ 編集する
          </button>
        </div>
      </div>
    </div>
  );
}
