import { Link, Outlet } from "@remix-run/react";
import "../styles/home/home.css";

export default function Home() {
  return (
    <div>
      <header>
        <h3>プロフィールマッチングアプリ</h3>

        <nav>
          <Link to="/home/recommend" className="nav-link">
            おすすめ
          </Link>
          <Link to="/home/favorite" className="nav-link">
            いいね
          </Link>
          <Link to="/home/profile" className="nav-link">
            プロフィール
          </Link>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
      <footer></footer>
    </div>
  );
}
