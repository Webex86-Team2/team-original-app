import { useEffect, useState } from "react";
import { db } from "../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import "../styles/profile.css";

export default function Profile() {
  const [userId, setUserId] = useState(null);
  const [profile, setProfile] = useState({
    name: "",
    hometown: "",
    mbti: "",
    university: "",
    photoUrl: "",
    programmingCourse: "",
    careerHistory: "",
    hobbies: "",
    inOrOut: "",
  });

  useEffect(() => {
    const uid = localStorage.getItem("uid");
    if (uid) {
      setUserId(uid);
      loadProfile(uid);
    }
  }, []);

  const loadProfile = async (uid) => {
    const docRef = doc(db, "profiles", uid);
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      setProfile(snap.data());
    }
  };

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    if (!userId) return alert("ログイン情報がありません");
    const ref = doc(db, "profiles", userId);
    await setDoc(ref, profile);
    alert("プロフィールを保存しました！");
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfile((prev) => ({
        ...prev,
        photoUrl: reader.result,
      }));
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="profile-container">
      <h1>プロフィール編集</h1>

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

      {[
        "名前",
        "出身地",
        "MBTI",
        "大学",
        "コース",
        "役職",
        "趣味",
        "アピール",
      ].map((key) => (
        <div className="profile-field" key={key}>
          <label>{key}</label>
          <input name={key} value={profile[key]} onChange={handleChange} />
        </div>
      ))}

      <button className="save-button" onClick={handleSave}>
        保存
      </button>
    </div>
  );
}
