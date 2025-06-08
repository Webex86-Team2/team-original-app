import UserCard from "../components/UserCard";
import "../styles/home/favorite.css";

export default function Favorite() {
  return (
    <div className="favorite">
      <h1>いいねがありました！</h1>
      <div className="cards-container">
        <UserCard />
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
