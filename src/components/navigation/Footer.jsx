import React from "react";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="">
      <div className="mx-auto max-w-screen-xl">
        <div className="flex flex-col items-center justify-start">
          <ul className="flex items-center justify-center gap-4 p-5">
            <Link
              to="/"
              className="text-muted-foreground hover:text-foreground font-medium"
            >
              Home
            </Link>
            <Link
              to="/about"
              className="text-muted-foreground hover:text-foreground font-medium"
            >
              About
            </Link>
            <Link
              to="/create-recipe"
              className="text-muted-foreground hover:text-foreground font-medium"
            >
              Create Recipe
            </Link>
            <Link
              to="/faq"
              className="text-muted-foreground hover:text-foreground font-medium"
            >
              FAQ
            </Link>
          </ul>
        </div>
        <Separator className={"bg-stone-400 md:hidden"}/>
        <div className="flex flex-col-reverse items-center justify-between gap-x-2 gap-y-5 px-6 py-5 sm:flex-row xl:px-0">
          <span className="text-muted-foreground">
            &copy; {new Date().getFullYear()}{" "}
            <Link href="/" target="_blank">
              FitApp.
            </Link>
            All rights reserved.
          </span>

          <div className="text-muted-foreground flex items-center gap-5">
            <Link href="#" target="_blank">
              <FaGithub className="text-xl text-black" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
