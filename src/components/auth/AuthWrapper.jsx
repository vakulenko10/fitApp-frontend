import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthWrapper({ children }) {
  const [user, setUser] = useState({ isAuthenticated: false });

  const login = () => setUser({ isAuthenticated: true });
  const logout = () => setUser({ isAuthenticated: false });

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function AuthData() {
  return useContext(AuthContext);
}
