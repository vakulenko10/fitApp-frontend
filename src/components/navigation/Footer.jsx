import React from "react";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-secondary/70">
      <div className="mx-auto max-w-screen-xl">
        <div className="flex flex-col items-center justify-start">
          <ul className="flex items-center justify-center gap-4 p-5">
            <Link
              to="/"
              className="text-secondary-foreground hover:text-stone-300 font-medium"
            >
              Home
            </Link>
            <Link
              to="/about"
              className="text-secondary-foreground hover:text-stone-300 font-medium"
            >
              About
            </Link>
            <Link
              to="/create-recipe"
              className="text-secondary-foreground hover:text-stone-300 font-medium"
            >
              Create Recipe
            </Link>
            <Link
              to="/faq"
              className="text-secondary-foreground hover:text-stone-300 font-medium"
            >
              FAQ
            </Link>
          </ul>
        </div>
        <Separator className={"rounded-md"}/>
        <div className="flex items-center justify-between gap-x-2 gap-y-5 px-6 py-5 sm:flex-row md:flex-col-reverse xl:px-0">
          <span className="text-secondary-foreground">
            &copy; {new Date().getFullYear()}{" "}
            <Link href="/" target="_blank">
              FitApp.
            </Link>
            All rights reserved.
          </span>

          <div className="text-muted-foreground flex items-center gap-5">
            <Link href="#" target="_blank">
              <FaGithub className="text-xl text-white hover:text-stone-300" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
