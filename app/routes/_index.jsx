import Header from "../components/layout/Header";
import "../styles/index.css";

export default function Home() {
  return (
    <div style={{ backgroundColor: "pink", minHeight: "100vh" }}>
      <Header />
      <div className="main">
        <div style={{ fontSize: "5rem", fontWeight: "bold" }}>Mellow</div>
        <div
          style={{ fontSize: "2rem", fontWeight: "bold", marginTop: "1rem" }}
        >
          メンター以上、恋人未満。
        </div>
        <div className="main2"></div>
      </div>
    </div>
  );
}
