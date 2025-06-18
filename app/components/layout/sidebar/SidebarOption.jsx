import { MenuItem } from "@mui/material";
import { Link } from "@remix-run/react";

export default function SidebarOption({ label, icon, path, isActive }) {
  return (
    <Link to={path} style={{ textDecoration: "none", color: "inherit" }}>
      <MenuItem
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          paddingLeft: "16px",
          paddingRight: "16px",
          paddingTop: "12px",
          paddingBottom: "12px",
          borderRadius: "8px",
          backgroundColor: isActive ? "#405997" : "transparent",
          "&:hover": {
            backgroundColor: "#405997",
          },
        }}
      >
        {icon}
        <p>{label}</p>
      </MenuItem>
    </Link>
  );
}
