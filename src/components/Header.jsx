import { Link } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { AuthData } from "./auth/AuthWrapper";
import Container from "./Container";

export default function Header() {
  const { user, login, logout } = AuthData();

  return (
  
    
  
      <header className="m-0 p-0 bg-header">
        <Container>
          <div className="header_inner flex h-20 w-full shrink-0 items-center">
         
        <Link to="/" className="mr-6 hidden lg:flex">
          <ShirtIcon className="h-6 w-6" />
          <span className="sr-only">ShadCN</span>
        </Link>
        <div className="ml-auto flex justify-end items-center gap-2">
          <Link to="/about" className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900">
            About
          </Link>

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
      
    </div>
    </Container>
    </header>
  );
}

function ShirtIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z" />
    </svg>
  );
}
