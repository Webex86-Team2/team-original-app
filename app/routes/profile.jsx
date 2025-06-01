import { useState } from "react";
import "../styles/profile.css";

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
  {
    key: "apeal",
    label: "アピール",
  },
];

export default function Profile() {
  const [profile, setProfile] = useState({
    photoUrl: "",
    name: "朝井",
    hometown: "東京都",
    mbti: "INFP",
    university: "東京大学",
    course: "UIUX",
    role: "キャリアヒストリー",
    hobbies: "趣味",
    apeal: "アピール",
  });

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return; // ファイルが選択されていない場合は処理を終了

    const reader = new FileReader(); // ファイルを読み込むためのオブジェクトを作成
    reader.onloadend = () => {
      setProfile({ ...profile, photoUrl: reader.result.toString() });
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="profile-container">
      <h1>プロフィール編集</h1>

      <form className="profile-form">
        <div className="profile-field">
          <label htmlFor="avatar">プロフィール画像を選ぶ</label>
          <input
            type="file"
            accept="image/*"
            name="avatar"
            onChange={handlePhotoUpload}
          />
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
            <label htmlFor={field.key}>{field.label}</label>
            <input name={field.key} value={profile[field.key]} />
          </div>
        ))}

        <button className="save-button">保存</button>
      </form>
    </div>
  );
}
