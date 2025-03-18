import Pages from "../../pages/index";
import SignUp from "../../pages/Signup";

const { Home, About, Login, Profile, CreateRecipe } = Pages;

export const nav = [
  {
    path: "/",
    name: "Home",
    element: <Home />,
    isMenu: true,
    isPrivate: false,
  },
  {
    path: "/about",
    name: "About",
    element: <About />,
    isMenu: true,
    isPrivate: false,
  },
  {
    path: "/login",
    name: "Login",
    element: <Login />,
    isMenu: false,
    isPrivate: false,
  },
  {
    path: "/profile",
    name: "Profile",
    element: <Profile />,
    isMenu: true,
    isPrivate: true,
  },
  {
    path: "/create-recipe",
    name: "Create Recipe",
    element: <CreateRecipe />,
    isMenu: true,
    isPrivate: true,
  },
  {
    path: "/signup",
    name: "Sign up",
    element: <SignUp />,
    isMenu: false,
    isPrivate: false,
  },
];
