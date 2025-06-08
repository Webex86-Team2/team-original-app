import Mentor from "../components/Mentor";
import asai from "../image/asai2.png";
import kossy from "../image/kossy.png";
import "../styles/favorite.css";
import Navbar from "../components/Navbar";

export default function Favorite() {
  const mentors = [
    {
      name: "朝井遼太",
      hometown: "東京",
      age: "23",
      mbti: "INFP",
      university: "法政大学",
      img: asai,
      course: "UIUX",
      role: "HR統括",
      hobbies: ["バスケ", "アニメ", "漫画"],
    },
    {
      name: "越石優太",
      hometown: "神奈川",
      age: "23",
      mbti: "ENTP",
      university: "中央大学",
      img: kossy,
      course: "WebEx",
      role: "エンジニア",
      hobbies: ["バスケ", "アニメ", "漫画"],
    },
  ];

  return (
    <div>
      <Navbar />
      <div className="favorite-page">
        <h1>💖 いいねしたメンター 💖</h1>
        <div className="mentor-list">
          {mentors.map((mentor, index) => (
            <Mentor key={index} mentor={mentor} />
          ))}
        </div>
      </div>
    </div>
  );
}
