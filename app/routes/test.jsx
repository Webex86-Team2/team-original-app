import Header from "../components/layout/Header";
import Sidebar from "../components/layout/Sidebar";
import { Paper } from "@mui/material";
import { Outlet } from "@remix-run/react";

export default function Test() {
  return (
    <div>
      <Header />

      <div style={{ display: "flex" }}>
        <Sidebar />
        <div style={{ flex: 1, backgroundColor: "#FFCBCB" }}>
          <Paper
            elevation={3}
            sx={{
              margin: "24px",
              padding: "16px",
              height: "calc(100vh - 64px - 48px)",
              overflowY: "auto",
              borderRadius: "16px",
            }}
          >
            <Outlet />
          </Paper>
        </div>
      </div>
    </div>
  );
}
