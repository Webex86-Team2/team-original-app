import Mentor from "../components/Mentor";
import asai from "../image/asai.png";
import kossy from "../image/kossy.png";
import "../styles/favorite.css";

export default function Favorite() {
  const mentors = [
    {
      name: "朝井遼太",
      img: asai,
      course: "UIUX",
      age: 23,
      hobbies: ["バスケ", "アニメ", "漫画"],
      type: "??",
    },
  ];

  return (
    <div>
      <h1>💖いいねしたメンター💖</h1>
      <div className="mentor">
        <Mentor mentor={mentors[0]} />
        <div className="asai">
          <div>越石優太</div>
          <img src={kossy} alt="kossy" />
          <div>コース：WebExコース</div>
          <div>年齢：23歳</div>
          <div>趣味：バスケ・アニメ・漫画</div>
          <div>好きなタイプ：？？</div>
        </div>
      </div>
    </div>
  );
}
