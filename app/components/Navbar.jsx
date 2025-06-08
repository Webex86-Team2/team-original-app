import { Link } from "@remix-run/react";
import "./Navbar.css"; // スタイルも分離するならここ

export default function Navbar() {
  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link to="/myprofile">プロフィール</Link>
        </li>
        <li>
          <Link to="/favorite">届いたいいね</Link>
        </li>
        <li>
          <Link to="/recommend">おすすめ</Link>
        </li>
        <li>
          <Link to="/chat">チャット</Link>
        </li>
        <li>
          <Link to="/">ホーム</Link>
        </li>
      </ul>
    </nav>
  );
}
