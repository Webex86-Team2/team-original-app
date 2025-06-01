import { useEffect, useState } from "react";
import "../styles/profile.css";

// 英語キー → 日本語ラベルの対応表
const labelMap = {
  name: "名前",
  hometown: "出身地",
  mbti: "MBTI",
  university: "大学",
  photoUrl: "プロフィール画像",
  Course: "プログラミングコース",
  Role: "役職遍歴",
  hobbies: "趣味",
};

export default function MyProfile() {
  const [profile, setProfile] = useState(null);

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
    </div>
  );
}
