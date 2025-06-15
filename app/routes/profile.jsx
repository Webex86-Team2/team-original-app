import { useState, useEffect } from "react";
import { useNavigate } from "@remix-run/react";
import "../styles/profile.css";
import Navbar from "../components/Navbar";
import { auth, db } from "../firebase";
import { doc, serverTimestamp, setDoc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

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

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProfile((prev) => ({ ...prev, ...docSnap.data() }));
        }
      }
    });

    return () => unsubscribe();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setProfile((prev) => ({
        ...prev,
        photoUrl: reader.result.toString(),
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (!user) {
      alert("ログインしていません");
      return;
    }

    await setDoc(doc(db, "users", user.uid), {
      ...profile,
      createdAt: serverTimestamp(),
    });

    alert("プロフィールを保存しました！");
    navigate("/myprofile");
  };

  return (
    <div>
      <Navbar />
      <div className="main-content">
        <div className="edit-profile-wrapper">
          <h1 className="profile-title">プロフィール編集</h1>

          <div className="profile-photo-block">
            <label htmlFor="photoUpload">プロフィール画像を選ぶ</label>
            <input
              id="photoUpload"
              type="file"
              accept="image/*"
              onChange={handlePhotoUpload}
            />
            {profile.photoUrl && (
              <img
                src={profile.photoUrl}
                alt="プロフィール画像"
                className="profile-photo"
              />
            )}
          </div>

          <form onSubmit={handleSubmit}>
            <div className="profile-field">
              <label htmlFor="name">名前</label>
              <input
                id="name"
                name="name"
                value={profile.name}
                onChange={handleChange}
              />
            </div>

            <div className="profile-field">
              <label htmlFor="hometown">出身地</label>
              <input
                id="hometown"
                name="hometown"
                value={profile.hometown}
                onChange={handleChange}
              />
            </div>

            <div className="profile-field">
              <label htmlFor="mbti">MBTI</label>
              <input
                id="mbti"
                name="mbti"
                value={profile.mbti}
                onChange={handleChange}
              />
            </div>

            <div className="profile-field">
              <label htmlFor="university">大学</label>
              <input
                id="university"
                name="university"
                value={profile.university}
                onChange={handleChange}
              />
            </div>

            <div className="profile-field">
              <label htmlFor="courses">コース</label>
              <input
                id="courses"
                name="courses"
                value={profile.courses}
                onChange={handleChange}
              />
            </div>

            <div className="profile-field">
              <label htmlFor="roles">役職</label>
              <input
                id="roles"
                name="roles"
                value={profile.roles}
                onChange={handleChange}
              />
            </div>

            <div className="profile-field">
              <label htmlFor="hobbies">趣味</label>
              <input
                id="hobbies"
                name="hobbies"
                value={profile.hobbies}
                onChange={handleChange}
              />
            </div>

            <button type="submit" className="save-button">
              保存して表示ページへ
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
