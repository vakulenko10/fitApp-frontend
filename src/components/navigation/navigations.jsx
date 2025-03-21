import Pages from "../../pages/index";
import SignUp from "../../pages/Signup";

const { Home, About, Login, Profile, CreateRecipe, Recipe } = Pages;

export const nav = [
  {
    path: "/",
    name: "Home",
    element: <Home />,
    isMenu: true,
    isPrivate: true,
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
    isPrivate: false,
  },
  {
    path: "/recipe",
    name: "Recipe",
    element: <Recipe />,
    isMenu: true,
    isPrivate: false,
  },
  {
    path: "/signup",
    name: "Sign up",
    element: <SignUp />,
    isMenu: false,
    isPrivate: false,
  },
];
