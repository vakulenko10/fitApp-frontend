import React, { useState, useEffect } from "react";
import Container from "@/components/Container";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Recipe = () => {
  const [mealPlan, setMealPlan] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Load the meal plan from localStorage when component mounts
  useEffect(() => {
    try {
      const storedMealPlan = localStorage.getItem("mealPlan");
      if (storedMealPlan) {
        // Parse the JSON string
        const parsedMealPlan = JSON.parse(storedMealPlan);
        setMealPlan(parsedMealPlan);
      } else {
        // If no meal plan exists, set a default message
        setMealPlan("No meal plan found. Please generate a recipe first.");
      }
    } catch (error) {
      console.error("Error loading meal plan:", error);
      setMealPlan("Error loading meal plan. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  // Handler for "Save" button
  const handleSave = () => {
    // Future implementation - could add API call to save recipe to user's favorites
    alert("Recipe saved to your favorites!");
  };

  // Handler for "Next Recipe" button - go back to create recipe page
  const handleNextRecipe = () => {
    navigate("/create-recipe");
  };

  return (
    <Container>
      <div className="bg-white shadow-lg rounded-lg p-10 xl:px-30 xl:py-15 w-full xl:max-w-[1200px] mx-auto my-12 mt-21.5">
        <div className="mb-6">
          {/* Рецепт который будет сгенерирован */}
          {loading ? (
            <div className="flex justify-center py-10">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : (
            <div className="prose max-w-none">
              {/* Use white-space: pre-wrap to preserve line breaks */}
              <pre className="whitespace-pre-wrap font-sans text-base">
                {mealPlan}
              </pre>
            </div>
          )}
        </div>
        <div className="flex justify-center gap-3 sm:gap-5 ">
          <Button
            className={"sm:px-12"}
            variant="submit"
            size="lg"
            onClick={handleSave}
          >
            {/*The button doesn't work properly, meaning it only shows a notification, but there's no functionality for saving. */}
            Save
          </Button>
          <Button variant="submit" size="lg" onClick={handleNextRecipe}>
            Next Recipe
          </Button>
        </div>
      </div>
    </Container>
  );
};

export default Recipe;
