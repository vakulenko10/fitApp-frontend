import { AuthContext } from "@/components/auth/AuthWrapper";
import { useContext } from "react";

export function AuthData() {
    return useContext(AuthContext);
    // this hook returns a context which provides next states and functions: {user, setUser,setToken, token, login, signup, googleAuth, logout}
}
  