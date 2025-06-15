import { Link, useNavigate } from "@remix-run/react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import "./Navbar.css";
import UserMenu from "./UserMenu";

export default function Navbar() {
  return (
    <nav className="navbar">
      <ul className="navbar-links">
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

      <div className="navbar-user">
        <UserMenu />
      </div>
    </nav>
  );
}
