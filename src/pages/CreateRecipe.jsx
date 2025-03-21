import { ComboboxDropdownMenu } from "@/components/ui/combobox-dropdown-menu";
import Container from "../components/Container";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const CreateRecipe = () => {
  // State variables to store user input and component status
  const [calorieIntake, setCalorieIntake] = useState("");
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [selectedAllergens, setSelectedAllergens] = useState([]);
  const [goal, setGoal] = useState("maintain"); // Options: "deficit", "maintain", "surplus"
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(null); // For showing success/error messages
  const navigate = useNavigate(); // Add this to enable navigation

  /**
   * Retrieves authentication token from localStorage
   * Used to determine if the user is logged in and which API endpoint to use
   * @returns {string|null} The user's token or null if not logged in
   */
  const getUserToken = () => {
    const user = localStorage.getItem("user");
    if (user) {
      try {
        const userData = JSON.parse(user);
        return userData.token;
      } catch (error) {
        console.error("Error parsing user data:", error);
        return null;
      }
    }
    return null;
  };

  /**
   * Validates and updates calorie intake value
   * Only allows numeric input in the calorie field
   * @param {Event} e - The input change event
   */
  const handleCalorieChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value) || value === "") {
      setCalorieIntake(value);
    }
  };

  /**
   * Calculates final calorie target based on selected goal
   * - deficit: 20% reduction from base calories
   * - surplus: 20% increase from base calories
   * - maintain: keeps the original calorie amount
   * @returns {number} The calculated calorie target
   */
  const calculateFinalCalories = () => {
    if (!calorieIntake) return 0;

    const baseCalories = parseInt(calorieIntake);

    switch (goal) {
      case "deficit":
        return Math.round(baseCalories * 0.8); // 20% deficit
      case "surplus":
        return Math.round(baseCalories * 1.2); // 20% surplus
      default:
        return baseCalories; // maintain weight
    }
  };

  /**
   * Displays notification messages to the user
   * @param {string} text - The message to display
   * @param {string} type - Message type ('success' or 'error')
   */
  const showMessage = (text, type = "success") => {
    setMessage({ text, type });
    // Auto-clear message after 5 seconds
    setTimeout(() => setMessage(null), 5000);
  };

  /**
   * Submits user preferences to the backend to generate a meal plan
   * After successful generation, navigates to the Recipe page to display results
   */
  const handleCreateRecipe = async () => {
    // Input validation
    if (!calorieIntake) {
      showMessage("Please enter your daily calorie intake", "error");
      return;
    }

    if (selectedProducts.length === 0) {
      showMessage(
        "Please select at least one product for your recipe",
        "error"
      );
      return;
    }

    const finalCalories = calculateFinalCalories();

    try {
      setIsLoading(true);
      const token = getUserToken();

      // API endpoint selection:
      // - For authenticated users: /mealplan/generate (with token)
      // - For guests: /mealplan/generate-unauthorized
      const url = token
        ? `${import.meta.env.VITE_BACKEND_API_URL}/mealplan/generate`
        : `${
            import.meta.env.VITE_BACKEND_API_URL
          }/mealplan/generate-unauthorized`;

      // Request configuration with authentication if available
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify({
          products: selectedProducts,
          excludedProducts: selectedAllergens,
          calories: finalCalories,
        }),
      };

      const response = await fetch(url, requestOptions);

      if (!response.ok) {
        throw new Error("Failed to generate meal plan");
      }

      // Response expected format:
      // {
      //   mealPlan: "markdown text with recipes",
      //   storedMealPlan: {...} (only for authenticated users)
      // }
      const data = await response.json();

      // Store received meal plan in localStorage for the results page
      localStorage.setItem("mealPlan", JSON.stringify(data.mealPlan));

      // Show success message
      showMessage("Meal plan generated successfully!");

      // Navigate to the Recipe page
      navigate("/recipe");
    } catch (error) {
      console.error("Error creating recipe:", error);
      showMessage(error.message || "Failed to create recipe", "error");
    } finally {
      setIsLoading(false);
    }
  };

  // Component render with UI sections:
  // 1. Error/success message display
  // 2. Calorie input field
  // 3. Food selection component
  // 4. Goal selection buttons (deficit, maintain, surplus)
  // 5. Generate recipe button
  // 6. Calculated calorie display
  return (
    <Container>
      <div className="bg-white shadow-lg rounded-lg p-10 w-full xl:max-w-[1200px] mx-auto my-12 mt-21.5">
        {/* Message notification */}
        {message && (
          <div
            className={`mb-4 p-3 rounded-md ${
              message.type === "error"
                ? "bg-red-100 text-red-700"
                : "bg-green-100 text-green-700"
            }`}
          >
            {message.text}
          </div>
        )}

        <div className="mb-4.5 xl:mb-12.5">
          <h1 className="text-center text-xl font-semibold md:font-bold">
            Your daily calorie intake
          </h1>
          <div className="flex justify-center">
            <Input
              className="bg-primary text-foreground border-black w-[200px] sm:h-12 text-center"
              value={calorieIntake}
              onChange={handleCalorieChange}
              placeholder="Enter calories"
              type="text"
            />
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
                {calculateFinalCalories()} calories
              </span>
            </p>
          </div>
        )}
      </div>
    </Container>
  );
};

export default CreateRecipe;
