import asai from "../image/asai.png";
import asai2 from "../image/asai2.jpg";
import kossy from "../image/kossy.png";
import "../styles/recommend.css";
import OtherPick from "../components/other-pick.jsx";
import { useState } from "react";
import Navbar from "../components/Navbar";

const profileItems = [
  "名前",
  "出身",
  "MBTI",
  "大学",
  "コース",
  "役職",
  "趣味",
  "アピール",
];
const allProfileItems = [
  {
    picture: asai,
    profile: profileItems,
  },
  {
    picture: asai2,
    profile: profileItems,
  },
  {
    picture: kossy,
    profile: profileItems,
  },
];

export default function Recommend() {
  const [liked, setLiked] = useState(false);
  const [favorited, setFavorited] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [users, setUsers] = useState([])

  return (
    <div>
      <Navbar />
      <h1>あなたにおすすめ</h1>
      <div className="badge-top-pick">
        <img src={asai} alt="asai"></img>
        <div>
          {profileItems.map((item, index) => (
            <p key={index}>{item}</p>
          ))}
        </div>
        <div className="actions">
          <button onClick={() => setLiked(!liked)}>
            {liked ? "♥" : "♡"} いいね
          </button>
          <button onClick={() => setFavorited(!favorited)}>
            {favorited ? "★" : "☆"} お気に入り
          </button>
          <button onClick={() => setChatOpen(!chatOpen)}>💬 チャット</button>
        </div>
      </div>
      <h2>その他おすすめ</h2>
      <div className="all-badge-other-pick">
        {allProfileItems.map((item, index) => (
          <OtherPick items={item} key={index} />
        ))}
      </div>
    </div>
  );
}
