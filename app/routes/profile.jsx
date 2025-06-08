import { useState } from "react";
import { useNavigate } from "@remix-run/react";
import "../styles/profile.css";
import Navbar from "../components/Navbar";

const profileFields = [
  {
    key: "name",
    label: "名前",
  },
  {
    key: "hometown",
    label: "出身地",
  },
  {
    key: "mbti",
    label: "MBTI",
  },
  {
    key: "university",
    label: "大学",
  },
  {
    key: "course",
    label: "コース",
  },
  {
    key: "role",
    label: "役職",
  },
  {
    key: "hobbies",
    label: "趣味",
  },
];

export default function Profile() {
  const navigate = useNavigate();

  const [profile, setProfile] = useState({
    name: "",
    hometown: "",
    mbti: "",
    university: "",
    photoUrl: "",
    Course: "",
    Role: "",
    hobbies: "",
  });

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return; // ファイルが選択されていない場合は処理を終了

    const reader = new FileReader(); // ファイルを読み込むためのオブジェクトを作成
    reader.onloadend = () => {
      setProfile({ ...profile, photoUrl: reader.result.toString() });
      setProfile({
        ...profile,
        photoUrl: reader.result.toString(),
      });
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    alert("プロフィールを保存しました！");
    navigate("/myprofile");
  };

  return (
    <div>
      <Navbar />
      <div className="profile-container">
        <h1>プロフィール編集</h1>

        <div className="profile-field">
          <label htmlFor="name">プロフィール画像を選ぶ</label>
          <input type="file" accept="image/*" onChange={handlePhotoUpload} />
        </div>

        {profile.photoUrl && (
          <img
            src={profile.photoUrl}
            alt="プロフィール画像"
            className="profile-photo"
          />
        )}

        {profileFields.map((field) => (
          <div className="profile-field" key={field.key}>
            <label>{field.label}</label>
            <input name={field.key} value={profile[field.key]} />
          </div>
        ))}

        <button className="save-button" onClick={handleSave}>
          保存して表示ページへ
        </button>
      </div>
    </div>
  );
}
