import { ComboboxDropdownMenu } from "@/components/ui/combobox-dropdown-menu";
import Container from "../components/Container";
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const CreateRecipe = () => {
  return (
    <Container>
        <div className="bg-white shadow-lg rounded-lg p-10 w-full xl:max-w-[1200px] mx-auto my-12 mt-21.5">
          <div className="mb-4.5 xl:mb-12.5">
            <h1 className="text-center text-xl font-semibold md:font-bold">
              Your daily calorie intake
            </h1>
            <div className="flex justify-center">
              <Input className="bg-primary text-foreground border-black w-[200px] sm:h-12 text-center" />
            </div>
          </div>
          <div className="mb-3 xl:mb-12.5">
            <div className="md:hidden">
            <h1 className="text-xl font-medium text-center">
              Select what product you want in your recipe
            </h1>
            <hr className="border-t-3 border-black "></hr>
            </div>
            <ComboboxDropdownMenu />
          </div>
          <div className="flex flex-col gap-3 items-center mb-3 sm:flex-row sm:gap-5 sm:justify-center sm:mb-3 md:mb-4 xl:mb-8">
            <Button variant={"grey"} size={"customSm"} className="text-base">Calorie deficit</Button>
            <Button variant={"grey"} size={"customSm"} className="text-base">Maintaining weight</Button>
            <Button variant={"grey"} size={"customSm"} className="text-base">Calorie surplus</Button>
          </div>
          <div className="flex justify-center">
          <Button variant={"submit"} size={"veryLg"} className="text-md lg:w-[25rem]">Create Recipe</Button>
          </div>
        </div>
    </Container>
  );
};

export default CreateRecipe;
