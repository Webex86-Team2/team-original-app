import { useState } from "react";
import { useNavigate } from "@remix-run/react";
import "../styles/profile.css";
import Navbar from "../components/Navbar";
import { auth, db } from "../firebase";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";

export default function Profile() {
  const navigate = useNavigate();

  const [profile, setProfile] = useState({
    name: "",
    hometown: "",
    mbti: "",
    university: "",
    photoUrl: "",
    courses: "",
    roles: "",
    hobbies: "",
  });

  // フォームの入力値を更新
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

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

  // プロフィールを保存する関数
  const handleSubmit = async (e) => {
    e.preventDefault();

    const uid = auth.currentUser.uid; // ユーザーのidを取得

    if (!uid) {
      console.error("ユーザーがログインしていません");
      return;
    }

    await setDoc(doc(db, "users", uid), {
      ...profile,
      createdAt: serverTimestamp(),
    });

    console.log("プロフィールを保存しました！", profile);
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

        <div className="profile-field">
          <label htmlFor="name">名前</label>
          <input name="name" value={profile.name} onChange={handleChange} />
        </div>

        <div className="profile-field">
          <label htmlFor="hometown">出身地</label>
          <input
            name="hometown"
            value={profile.hometown}
            onChange={handleChange}
          />
        </div>

        <div className="profile-field">
          <label htmlFor="mbti">MBTI</label>
          <input name="mbti" value={profile.mbti} onChange={handleChange} />
        </div>

        <div className="profile-field">
          <label htmlFor="university">大学</label>
          <input
            name="university"
            value={profile.university}
            onChange={handleChange}
          />
        </div>

        <div className="profile-field">
          <label htmlFor="courses">コース</label>
          <input
            name="courses"
            value={profile.courses}
            onChange={handleChange}
          />
        </div>

        <div className="profile-field">
          <label htmlFor="roles">役職</label>
          <input name="roles" value={profile.roles} onChange={handleChange} />
        </div>

        <div className="profile-field">
          <label htmlFor="hobbies">趣味</label>
          <input
            name="hobbies"
            value={profile.hobbies}
            onChange={handleChange}
          />
        </div>

        <button className="save-button" onClick={handleSubmit}>
          保存して表示ページへ
        </button>
      </div>
    </div>
  );
}
