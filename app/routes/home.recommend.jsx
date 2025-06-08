import UserCard from "../components/UserCard";
import "../styles/home/recommend.css";

export default function HomeRecommend() {
  return (
    <div className="recommend">
      <h1>おすすめユーザー</h1>
      <div className="cards-container">
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
      </div>
    </div>
  );
}
