import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { Link } from "@remix-run/react";
import { Avatar } from "@mui/material";
import { auth } from "../../firebase";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import useAuth from "../../hooks/useAuth";

export default function MenuAppBar() {
  const { user } = useAuth();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{ backgroundColor: "#1F1847", height: "64px" }}
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link
              to="/test"
              style={{
                textDecoration: "none",
                color: "white",
                fontSize: "18px",
              }}
            >
              Mellow
            </Link>
          </Typography>
          {auth && (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <Avatar src={user?.photoURL} sx={{ width: 32, height: 32 }} />
              </IconButton>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                slotProps={{
                  list: {
                    "aria-labelledby": "basic-button",
                  },
                }}
              >
                <MenuItem onClick={handleClose}>
                  <Link
                    to="/test/profile"
                    style={{
                      textDecoration: "none",
                      color: "inherit",
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <PersonIcon />
                    Profile
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <Link
                    to="/sign-out"
                    style={{
                      textDecoration: "none",
                      color: "inherit",
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <LogoutIcon />
                    Logout
                  </Link>
                </MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
