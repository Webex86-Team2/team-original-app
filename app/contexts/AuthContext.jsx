// contexts/AuthContext.js
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext({
  user: null,
  isAuthenticated: false,
});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // ここでログイン状態を監視（例：FirebaseのonAuthStateChanged）
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}
