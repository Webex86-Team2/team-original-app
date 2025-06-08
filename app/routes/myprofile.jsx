import { useEffect, useState } from "react";
import { useNavigate } from "@remix-run/react";
import "../styles/profile.css";
import Navbar from "../components/Navbar";

const labelMap = {
  name: "名前",
  hometown: "出身地",
  university: "大学",
  mbti: "MBTI",
  photoUrl: "プロフィール画像",
  Course: "コース",
  Role: "役職",
  hobbies: "趣味",
};

export default function MyProfile() {
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const saved = localStorage.getItem("myProfile");
    if (saved) {
      setProfile(JSON.parse(saved));
    }
  }, []);

  if (!profile) {
    return (
      <p style={{ textAlign: "center", marginTop: "2rem" }}>
        プロフィールがまだ保存されていません
      </p>
    );
  }

  return (
    <div>
      <Navbar />
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
          {Object.entries(profile).map(
            ([key, value]) =>
              key !== "photoUrl" && (
                <p key={key}>
                  <strong>{labelMap[key] || key}：</strong>{" "}
                  {value || "（未入力）"}
                </p>
              )
          )}
        </div>

        <button
          className="edit-button"
          onClick={() => {
            navigate("/profile");
          }}
        >
          ✏️ 編集する
        </button>
      </div>
    </div>
  );
}
