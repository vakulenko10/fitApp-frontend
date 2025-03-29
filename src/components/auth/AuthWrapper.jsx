import { getProfile, loginUser, registerUser } from "@/lib/Authentication";
import { getCookie } from "@/lib/utils";
import { createContext, useEffect, useState, useCallback, useMemo, useRef } from "react";

export const AuthContext = createContext();
const API_URL = import.meta.env.VITE_BACKEND_API_URL;

export function AuthWrapper({ children }) {
  const [token, setToken] = useState(getCookie("token"));
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : { isAuthenticated: false };
  });

  const login = useCallback(async (email, password) => {
    try {
      const data = await loginUser(email, password);
      const userData = await getProfile(data.token);

      setUser({ ...userData, isAuthenticated: true });
      setToken(data.token);
      localStorage.setItem("user", JSON.stringify({
        id: userData.id,
        email: userData.email,
        name: userData.name,
        isAuthenticated: true
      }));

      const expirationDate = new Date();
      expirationDate.setDate(expirationDate.getDate() + 1);
      document.cookie = `token=${data.token}; expires=${expirationDate.toUTCString()}; path=/;`;
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  }, []);

  const signup = useCallback(async (name, email, password) => {
    try {
      const { token } = await registerUser(name, email, password);
      const userData = await getProfile(token);

      setUser({ ...userData, isAuthenticated: true });
      setToken(token);
      localStorage.setItem("user", JSON.stringify({
        id: userData.id,
        email: userData.email,
        name: userData.name,
        isAuthenticated: true
      }));

      const expirationDate = new Date();
      expirationDate.setDate(expirationDate.getDate() + 1);
      document.cookie = `token=${token}; expires=${expirationDate.toUTCString()}; path=/;`;
    } catch (error) {
      console.error("Signup failed:", error);
      throw error;
    }
  }, []);
  const googleAuth = useCallback(async () => {
    const authWindow = window.open(
      `${API_URL}/google-auth`,
      'GoogleAuth',
      'width=500,height=600'
    );
  
    return new Promise((resolve, reject) => {
      const listener = (event) => {
        if (event.origin !== API_URL) return; // validate backend origin
        const { user, token, profileImageURL } = event.data;
  
        if (token && user) {
          resolve({ user, token, profileImageURL });
          window.removeEventListener('message', listener);
          authWindow.close();
        }
      };
  
      window.addEventListener('message', listener);
    });
  }, []);
  
  
  const logout = useCallback(() => {
    setToken(null);
    setUser({ isAuthenticated: false });
    localStorage.removeItem("user");
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  }, []);

  useEffect(() => {
    if (token && !user.isAuthenticated) {
      (async () => {
        try {
          const userData = await getProfile(token);
          setUser({ ...userData, isAuthenticated: true });
        } catch (err) {
          console.error("Error fetching profile:", err);
          document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        }
      })();
    }
  }, [token]);

  const authContextValue = useMemo(() => ({ user, setUser, token,setToken, login, signup, googleAuth, logout }), [user, token,setToken, login, signup, googleAuth, logout]);

  return <AuthContext.Provider value={authContextValue}>{children}</AuthContext.Provider>;
}
