import { Link } from "react-router-dom";
import { useState } from "react";
import { Button } from "../ui/button";
import { AuthData } from "../auth/AuthWrapper";
import { nav } from "./navigations";
import { Avatar, AvatarFallback, AvatarImage } from "@components/ui/avatar";
import Container from "../Container";

export default function Header() {
  const { user, logout } = AuthData();
  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <div className="px-4 bg-header">
      <Container>
        {/* Десктопний хедер */}
        <header className="hidden lg:flex md:flex h-20 w-full items-center px-4 bg-header">
          <nav className="flex space-x-4">
            {nav.map((r, i) =>
              (!r.isPrivate || user.isAuthenticated) && r.isMenu ? (
                <Link
                  key={i}
                  to={r.path}
                  className="group inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-secondary-foreground hover:text-gray-900"
                >
                  {r.name}
                </Link>
              ) : null
            )}
          </nav>
          <div className="ml-auto flex gap-2">
            {user.isAuthenticated ? (
              <>
                <Avatar className="h-12 w-12 rounded-full border-2 relative border-secondary shadow-md">
                  <AvatarImage
                    src={user?.profileImageURL}
                    alt={user.name}
                    className="h-full w-full object-cover rounded-full"
                  />
                  {!user.profileImageURL && (
                    <AvatarFallback className="flex items-center justify-center h-full w-full bg-gray-200 text-gray-600 font-bold text-lg">
                      {user.name?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  )}
                </Avatar>
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

        {/* Мобільний хедер із бургер-меню */}
        <header className="flex md:hidden items-center justify-end h-20 w-full border-b border-gray-400 ">
          <div
            className="cursor-pointer"
            onClick={() => setIsNavOpen((prev) => !prev)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="36px"
              height="36px"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M4 18L20 18"
                stroke="#FFFFFF"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M4 12L20 12"
                stroke="#FFFFFF"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M4 6L20 6"
                stroke="#FFFFFF"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>

          {/* Мобільне меню */}
          <div
            className={`fixed top-0 left-0 w-full h-full bg-white z-50 transform ${
              isNavOpen ? "translate-x-0" : "-translate-x-full"
            } transition-transform duration-300 ease-in-out`}
          >
            <div
              className="absolute top-5 right-5"
              onClick={() => setIsNavOpen(false)}
            >
              <svg
                className="h-8 w-8 text-gray-600"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </div>
            <ul
              className="flex flex-col items-center justify-center h-full gap-8"
              onClick={() => setIsNavOpen(false)}
            >
              {nav.map((r, i) =>
                (!r.isPrivate || user.isAuthenticated) && r.isMenu ? (
                  <li key={i}>
                    <Link
                      to={r.path}
                      className="block text-gray-700 hover:text-gray-900"
                      onClick={() => setIsNavOpen(false)}
                    >
                      {r.name}
                    </Link>
                  </li>
                ) : null
              )}
              {user.isAuthenticated ? (
                <li>
                  <Button onClick={logout}>Log out</Button>
                </li>
              ) : (
                <>
                  <li className="flex flex-col">
                    <Link to="/login">
                      <Button variant="outline">Sign in</Button>
                    </Link>
                    <Link to="/signup">
                      <Button>Sign Up</Button>
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </header>
      </Container>
    </div>
  );
}
