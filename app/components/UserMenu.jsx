import { useState, useEffect } from "react";
import { useNavigate } from "@remix-run/react";
import { auth } from "../firebase";
import { signOut, onAuthStateChanged } from "firebase/auth";
import "./UserMenu.css";

export default function UserMenu() {
  const [open, setOpen] = useState(false);
  const [photoURL, setPhotoURL] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && user.photoURL) {
        setPhotoURL(user.photoURL);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/sign-in");
  };

  const goToProfile = () => {
    navigate("/myprofile");
  };

  return (
    <div
      className="user-menu"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <img
        src={photoURL || "/default-avatar.png"}
        alt="User avatar"
        className="avatar"
      />
      {open && (
        <div className="dropdown">
          <button onClick={goToProfile}>👤 Profile</button>
          <button onClick={handleLogout}>🚪 Logout</button>
        </div>
      )}
    </div>
  );
}
