import { getProfile, loginUser, registerUser } from "@/lib/Authentication";
import { getCookie } from "@/lib/utils";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();
const API_URL = import.meta.env.VITE_BACKEND_API_URL;
export function AuthWrapper({ children }) {
  const [user, setUser] = useState({ isAuthenticated: false });
  const [token, setToken] = useState(null);
  const navigate = useNavigate();
  const login = async (email, password) => {
    try {
      const data = await loginUser(email, password);
      console.log(data)
      const userData = await getProfile(data.token);
      // console.log('userData:',userData)
      setUser({...userData, isAuthenticated: true});
      setToken(token);
      localStorage.setItem("user", ({...userData, isAuthenticated: true}));
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
  const googleAuth = async () => {
    const authWindow = window.open(
      `${API_URL}/google-auth`,
      'GoogleAuth',
      'width=500,height=600'
    );
  
    return new Promise((resolve, reject) => {
      const listener = (event) => {
        if (event.origin !== API_URL) return; // validate backend origin
        const { user, token } = event.data;
  
        if (token && user) {
          resolve({ user, token });
          window.removeEventListener('message', listener);
          authWindow.close();
        }
      };
  
      window.addEventListener('message', listener);
    });
  };
  
  
  
  const logout = () => {
    setUser(null);
    setToken(null);
    setUser({ isAuthenticated: false });
    localStorage.removeItem("user");
  };
  

  useEffect(() => {
    const tokenFromCookie = getCookie("token");
    console.log("tokenFromCookie:", tokenFromCookie)
    if (tokenFromCookie && !user.isAuthenticated) {
      (async () => {
        try {
          const userData = await getProfile(tokenFromCookie);
          setUser({ ...userData, isAuthenticated: true });
          setToken(tokenFromCookie);
        } catch (err) {
          console.error("Error fetching profile from token:", err);
          // Optionally clear invalid token cookie
          document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        }
      })();
    }
  }, []);
  return (
    <AuthContext.Provider value={{ user, setUser,setToken, token, login, signup, googleAuth, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function AuthData() {
  return useContext(AuthContext);
}
