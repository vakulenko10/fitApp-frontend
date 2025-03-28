import { ComboboxDropdownMenu } from "@/components/ui/combobox-dropdown-menu";
import Container from "@/components/Container";
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AuthData } from "@/components/auth/AuthWrapper";
import { Textarea } from "@/components/ui/textarea";
import { useNotification } from "@/hooks/useNotification";

const CreateRecipe = () => {
  const [calorieIntake, setCalorieIntake] = useState("");
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [selectedAllergens, setSelectedAllergens] = useState([]);
  const [goal, setGoal] = useState("maintain");
  const [isLoading, setIsLoading] = useState(false);
  const [generatedRecipe, setGeneratedRecipe] = useState(null);
  const { user, token } = AuthData();
  const { triggerToast } = useNotification();

  useEffect(() => {
    user && user.isAuthenticated && user.currentCalorieIntake
      ? setCalorieIntake(user.currentCalorieIntake)
      : setCalorieIntake(2000);
  }, [user]);

  const handleCalorieChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value) || value === "") {
      setCalorieIntake(value);
    }
  };

  const resetCalorieIntake = () => {
    setCalorieIntake(
      user.isAuthenticated && user.currentCalorieIntake != null
        ? user.currentCalorieIntake
        : "2000"
    );
  };

  const handleCreateRecipe = async () => {
    if (!calorieIntake) {
      triggerToast("Please enter your daily calorie intake", "error");
      return;
    }
    if (selectedProducts.length === 0) {
      triggerToast("Please select at least one product for your recipe", "error");
      return;
    }

    try {
      setIsLoading(true);
      setGeneratedRecipe(null);
      const url = token
        ? `${import.meta.env.VITE_BACKEND_API_URL}/mealplan/generate`
        : `${import.meta.env.VITE_BACKEND_API_URL}/mealplan/generate-unauthorized`;

      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify({
          products: selectedProducts,
          excludedProducts: selectedAllergens,
          calories: calorieIntake,
        }),
      };

      const response = await fetch(url, requestOptions);
      if (!response.ok) {
        throw new Error("Failed to generate meal plan");
      }
      const data = await response.json();
      localStorage.setItem("mealPlan", JSON.stringify(data.mealPlan));
      setGeneratedRecipe(data.mealPlan);
      triggerToast("Meal plan generated successfully!", "success");
    } catch (error) {
      console.error("Error creating recipe:", error);
      triggerToast(error.message || "Failed to create recipe", "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <div className="bg-white shadow-lg rounded-lg p-10 w-full xl:max-w-[1200px] mx-auto my-12 mt-21.5">
        <div className="mb-4.5 xl:mb-12.5">
          <h1 className="text-center text-xl font-semibold md:font-bold">
            Your daily calorie intake
            {user && user.isAuthenticated && user.currentCalorieIntake && (
              <span className="text-sm font-normal block text-gray-500">
                (your daily calorie intake is automatically loaded from your profile)
              </span>
            )}
          </h1>
          <div className="flex justify-center items-center gap-4">
            <Input
              className="bg-primary text-foreground border-black w-[200px] sm:h-12 text-center"
              value={calorieIntake}
              onChange={handleCalorieChange}
              placeholder={`Enter calories ${calorieIntake}`}
              type="text"
            />
            <Button variant={'submit'} onClick={resetCalorieIntake}>Reset</Button>
          </div>
        </div>
        <div className="mb-3 xl:mb-12.5">
          <div className="md:hidden">
            <h1 className="text-xl font-medium text-center">
              Select what product you want in your recipe
            </h1>
            <hr className="border-t-3 border-black"></hr>
          </div>
          <ComboboxDropdownMenu
            onProductsChange={setSelectedProducts}
            onAllergensChange={setSelectedAllergens}
          />
        </div>
        <div className="mb-5 sm:mb-8">
          <div className="text-center mb-3">
            <h3 className="text-lg font-semibold p-0">Type your preferences or allergies</h3>
            <p className="text-muted-foreground">We cannot guarantee that preferences will always be followed.</p>
          </div>
          <Textarea placeholder="Preferences" className={"lg:min-h-25"} />
        </div>
        <div className="flex flex-col gap-3 items-center mb-3 sm:flex-row sm:gap-5 sm:justify-center sm:mb-3 md:mb-4 xl:mb-8">
          <Button
            variant={goal === "deficit" ? "destructive" : "grey"}
            size={"customSm"}
            className="text-base"
            onClick={() => setGoal("deficit")}
          >
            Calorie deficit
          </Button>
          <Button
            variant={goal === "maintain" ? "destructive" : "grey"}
            size={"customSm"}
            className="text-base"
            onClick={() => setGoal("maintain")}
          >
            Maintaining weight
          </Button>
          <Button
            variant={goal === "surplus" ? "destructive" : "grey"}
            size={"customSm"}
            className="text-base"
            onClick={() => setGoal("surplus")}
          >
            Calorie surplus
          </Button>
        </div>
        <div className="flex justify-center">
          <Button
            variant={"submit"}
            size={"veryLg"}
            className="text-md lg:w-[25rem]"
            onClick={handleCreateRecipe}
            disabled={isLoading}
          >
            {isLoading ? "Generating..." : "Create Recipe"}
          </Button>
        </div>

        {/* Display calculated calories based on selection */}
        {calorieIntake && (
          <div className="mt-4 text-center text-gray-700">
            <p>
              Based on your selection, your{" "}
              {goal === "deficit"
                ? "reduced"
                : goal === "surplus"
                ? "increased"
                : ""}{" "}
              calorie target:
              <span className="font-bold">
                {" "}
                {calorieIntake} calories
              </span>
            </p>
          </div>
        )}

        {/* Display generated recipe */}
        {isLoading && (
          <div className="flex justify-center py-10 mt-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        )}

        {generatedRecipe && !isLoading && (
          <div className="mt-8 border-t-2 pt-6">
            <h2 className="text-xl font-semibold mb-4 text-center">
              Your Generated Recipe
            </h2>
            <div className="prose prose-headings:font-bold prose-h1:text-2xl prose-h2:text-xl prose-h2:text-blue-700 prose-strong:font-semibold prose-em:italic max-w-none p-4 bg-gray-50 rounded-lg shadow-inner">
              <pre className="whitespace-pre-wrap font-sans text-base">
                {generatedRecipe}
              </pre>
            </div>
            <div className="flex justify-center mt-6">
              <Button
                className="mr-3"
                variant="submit"
                size="lg"
                onClick={() => triggerToast("Recipe saved to your favorites!", "success")}
              >
                Save
              </Button>
              <Button
                variant="submit"
                size="lg"
                onClick={() => {
                  setGeneratedRecipe(null);
                  setSelectedProducts([]);
                  setSelectedAllergens([]);
                }}
              >
                New Recipe
              </Button>
            </div>
          </div>
        )}
      </div>
    </Container>
  );
};

export default CreateRecipe;
