import { Home, Login, Signup, Profile, CreateRecipe, Faq } from '@/pages/index';

export const nav = [
  {
    path: "/",
    name: "Home",
    element: <Home />,
    isMenu: true,
    isPrivate: false,
  },
  // {
  //   path: "/about",
  //   name: "About",
  //   element: <About />,
  //   isMenu: true,
  //   isPrivate: false,
  // },
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
    path: "/faq",
    name: "FAQ",
    element: <Faq />,
    isMenu: true,
    isPrivate: false,
  },
  {
    path: "/signup",
    name: "Sign up",
    element: <Signup />,
    isMenu: false,
    isPrivate: false,
  },
];
