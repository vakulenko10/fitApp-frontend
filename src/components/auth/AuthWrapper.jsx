import { getProfile, loginUser, registerUser } from "@/lib/Authentication";
import { User } from "lucide-react";
import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export function AuthWrapper({ children }) {
  const [user, setUser] = useState({ isAuthenticated: false });
  const [token, setToken] = useState(null);
  const navigate = useNavigate();
  const login = async (email, password) => {
    try {
      const {token} = await loginUser(email, password);
      // console.log(token)
      const userData = await getProfile(token);
      // console.log('userData:',userData)
      setUser({...userData, isAuthenticated: true});
      setToken(token);
      localStorage.setItem("user", JSON.stringify({...userData, isAuthenticated: true}));
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };
  const signup = async (name, email, password) => {
    try {
      const {token} = await registerUser(name, email, password);
      const userData = await getProfile(token);
      setToken(token);
      setUser({...userData, isAuthenticated: true});
      localStorage.setItem("user", JSON.stringify({...userData, isAuthenticated: true}));
    } catch (error) {
      console.error("Signup failed:", error);
      throw error;
    }
  };
  const logout = () => {
    setUser(null);
    setToken(null);
    setUser({ isAuthenticated: false });
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user,token, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function AuthData() {
  return useContext(AuthContext);
}
