import SidebarOption from "./sidebar/SidebarOption";
import { useLocation } from "@remix-run/react";

// Icons
import PersonIcon from "@mui/icons-material/Person";
import RecommendIcon from "@mui/icons-material/Recommend";
import ChatIcon from "@mui/icons-material/Chat";

const sidebarOptions = [
  {
    icon: <PersonIcon />,
    label: "プロフィール",
    path: "/test/profile",
  },
  {
    icon: <RecommendIcon />,
    label: "おすすめ",
    path: "/test/recommend",
  },
  {
    icon: <ChatIcon />,
    label: "チャット",
    path: "/test/chat",
  },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <div
      style={{
        width: "200px",
        height: "calc(100vh - 64px)",
        backgroundColor: "#7D8FBA",
        color: "white",
      }}
    >
      <div
        style={{
          paddingLeft: "8px",
          paddingRight: "8px",
          paddingTop: "16px",
          paddingBottom: "16px",
          display: "flex",
          flexDirection: "column",
          gap: "12px",
        }}
      >
        {sidebarOptions.map((option) => (
          <SidebarOption
            key={option.label}
            {...option}
            isActive={location.pathname === option.path}
          />
        ))}
      </div>
    </div>
  );
}
