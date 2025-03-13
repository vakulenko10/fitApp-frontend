import { Route, Routes } from "react-router-dom";
import { AuthData } from "../../auth/AuthWrapper";
import { nav } from "./navigations";

export const RenderRoutes = () => {
  const { user } = AuthData();

  return (
    <Routes>
      {nav.map((r, i) => (
        (r.isPrivate && user.isAuthenticated) || !r.isPrivate ? (
          <Route key={i} path={r.path} element={r.element} />
        ) : null
      ))}
    </Routes>
  );
};
