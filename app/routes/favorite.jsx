import UserCard from "../components/UserCard";
import "../styles/favorite.css";
import Navbar from "../components/Navbar";

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
