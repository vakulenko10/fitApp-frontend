import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { AuthData } from "../auth/AuthWrapper";
import { nav } from "./navigations";

export default function Header() {
  const { user, logout } = AuthData();

  return (
    <div className="container mx-auto px-4 md:px-6 lg:px-8">
      <header className="flex h-20 w-full shrink-0 items-center px-4 md:px-6">
        <nav className="flex space-x-4">
          {nav.map((r, i) => {
            if ((!r.isPrivate || user.isAuthenticated) && r.isMenu) {
              return (
                <Link
                  key={i}
                  to={r.path}
                  className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900"
                >
                  {r.name}
                </Link>
              );
            }
            return null;
          })}
        </nav>
        <div className="ml-auto flex gap-2">
          {user.isAuthenticated ? (
            <>
              <Link to="/profile">
                <Button variant="outline">Profile</Button>
              </Link>
              <Button onClick={logout}>Log out</Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="outline">Sign in</Button>
              </Link>
              <Link to="/signup">
                <Button>Sign Up</Button>
              </Link>
            </>
          )}
        </div>
      </header>
    </div>
  );
}
