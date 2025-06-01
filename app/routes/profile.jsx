import { useEffect, useState } from "react";
import { useNavigate } from "@remix-run/react";
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

  // localStorageからデータ読み込み
  useEffect(() => {
    const saved = localStorage.getItem("myProfile");
    if (saved) {
      setProfile(JSON.parse(saved));
    }
  }, []);

  // 入力の変更
  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  // 写真アップロード
  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfile({
        ...profile,
        photoUrl: reader.result,
      });
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    localStorage.setItem("myProfile", JSON.stringify(profile));

    // プロフィール画像だけも別で保存（チャットなど別画面でも使えるように）
    if (profile.photoUrl) {
      localStorage.setItem("photoUrl", profile.photoUrl);
    }

    alert("プロフィールを保存しました！");
    navigate("/myprofile");
  };
  return (
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

      {Object.entries(profile).map(
        ([key, value]) =>
          key !== "photoUrl" && (
            <div className="profile-field" key={key}>
              <label>{labelMap[key] || key}</label>
              <input name={key} value={value} onChange={handleChange} />
            </div>
          )
      )}

      <button className="save-button" onClick={handleSave}>
        保存して表示ページへ
      </button>
    </div>
  );
}
