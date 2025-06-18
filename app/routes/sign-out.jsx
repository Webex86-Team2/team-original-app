import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "@remix-run/react";

export default function SignOut() {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut(auth);
    navigate("/sign-in");
  };

  handleSignOut();

  return null;
}
