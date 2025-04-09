import { ComboboxDropdownMenu } from "@/components/ui/combobox-dropdown-menu";
import Container from "@/components/Container";
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AuthData } from "@/hooks/AuthData";
import { Textarea } from "@/components/ui/textarea";
import { useNotification } from "@/hooks/UseNotification";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { recipeFormSchema } from "@/validation/recipeFormSchema";
import { generateMealPlan } from "@/lib/mealplan";
import { useNavigate } from "react-router-dom";

// Helper function to parse preferences text
const parsePreferences = (preferencesText) => {
  if (!preferencesText) return { products: [], allergens: [] };

  // Extract products in parentheses
  const productRegex = /\(([^)]+)\)/g;
  const products = [];
  let match;
  while ((match = productRegex.exec(preferencesText)) !== null) {
    products.push(match[1].trim());
  }

  // Extract allergens (starting with *)
  const words = preferencesText.split(/[\s,]+/);
  const allergens = words
    .filter((word) => word.startsWith("*"))
    .map((word) => word.substring(1).trim());

  return { products, allergens };
};

const CreateRecipe = () => {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [selectedAllergens, setSelectedAllergens] = useState([]);
  const [generatedRecipe, setGeneratedRecipe] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { user, token } = AuthData();
  const { triggerToast } = useNotification();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(recipeFormSchema),
    defaultValues: {
      calorieIntake: "",
      selectedProducts: [],
      preferences: "",
    },
  });

  useEffect(() => {
    if (user?.isAuthenticated && user?.currentCalorieIntake) {
      setValue("calorieIntake", String(user.currentCalorieIntake));
    } else {
      setValue("calorieIntake", "2000");
    }
  }, [user, setValue]);

  useEffect(() => {
    setValue("selectedProducts", selectedProducts);
  }, [selectedProducts, setValue]);

  const handleCreateRecipe = async (formData) => {
    try {
      setIsLoading(true);
      setGeneratedRecipe(null);

      // Parse the preferences text to extract additional products and allergens
      const { products, allergens } = parsePreferences(
        formData.preferences || "",
      );

      // Combine with the products and allergens from the dropdowns
      const combinedProducts = [...selectedProducts, ...products];
      const combinedAllergens = [...selectedAllergens, ...allergens];

      // Prepare enriched form data with parsed information
      const enrichedFormData = {
        ...formData,
        selectedProducts: combinedProducts,
        preferences: formData.preferences, // Keep the original preferences text
      };

      const data = await generateMealPlan({
        token,
        formData: enrichedFormData,
        selectedAllergens: combinedAllergens,
      });

      localStorage.setItem("mealPlan", JSON.stringify(data.mealPlan));
      setGeneratedRecipe(data.mealPlan);
    } catch (error) {
      console.error("Error creating recipe:", error);
      triggerToast(error.message || "Failed to create recipe", "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container className="m-0 mx-auto flex flex-col justify-center p-0 md:p-8">
      <main className="bg-white rounded-lg p-10 w-full xl:max-w-[1200px] mx-auto">
        <form onSubmit={handleSubmit(handleCreateRecipe)}>
          <section className="mb-4.5 xl:mb-12.5">
            <h1 className="text-center text-xl font-semibold md:font-bold">
              Your daily calorie intake
              {user?.isAuthenticated && user?.currentCalorieIntake && (
                <span className="block text-sm font-normal text-gray-500">
                  (your daily calorie intake is automatically loaded from your
                  profile)
                </span>
              )}
            </h1>
            <div className="flex justify-center items-center gap-4">
              <label htmlFor="calorieIntakeInput" className="sr-only">Enter calories</label>
              <Input
                {...register("calorieIntake")}
                id="calorieIntakeInput"
                className="bg-primary text-foreground border-black w-[200px] sm:h-12 text-center"
                placeholder="Enter calories"
              />
              <Button
                variant="submit"
                type="button"
                onClick={() => {
                  const fallback = user?.currentCalorieIntake || "2000";
                  setValue("calorieIntake", String(fallback));
                }}
              >
                Reset
              </Button>
            </div>
            {errors.calorieIntake && <p className="text-red-500 text-center mt-2">{errors.calorieIntake.message}</p>}
          </section>
          <section className="mb-3 xl:mb-12.5">
            <div className="md:hidden">
              <h1 className="text-center text-xl font-medium">
                Select what product you want in your recipe
              </h1>
              <hr className="border-t-3 border-black"></hr>
            </div>
            <ComboboxDropdownMenu
              onProductsChange={setSelectedProducts}
              onAllergensChange={setSelectedAllergens}
            />
            {errors.selectedProducts && <p className="text-red-500 text-center mt-2">{errors.selectedProducts.message}</p>}
          </section>

          <section className="mb-5 sm:mb-8">
            <div className="text-center mb-3">
              <h3 className="text-lg font-semibold p-0">Type your preferences or allergies</h3>
              <p className="text-muted-foreground">We cannot guarantee that preferences will always be followed.</p>
            </div>
            <label htmlFor="preferencesTextarea" className="sr-only">Preferences</label>
            <Textarea {...register("preferences")}
              id="preferencesTextarea"
              placeholder="Preferences"
              className="lg:min-h-25"
            />
          </section>
          <section className="flex flex-col gap-3 items-center mb-3 sm:flex-row sm:gap-5 sm:justify-center sm:mb-3 md:mb-4 xl:mb-8">
            {["deficit", "maintain", "surplus"].map((type) => (
              <Button
                key={type}
                variant={goal === type ? "destructive" : "grey"}
                size="customSm"
                type="button"
                className="text-base"
                onClick={() => setValue("goal", type)}
              >
                {type === "deficit" ? "Calorie deficit" : type === "maintain" ? "Maintaining weight" : "Calorie surplus"}
              </Button>
            ))}
            {errors.goal && <p className="text-red-500 text-center mt-2">{errors.goal.message}</p>}
          </section>
          <div className="flex justify-center">
            <Button
              variant="submit"
              size="veryLg"
              className="text-md lg:w-[25rem]"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Generating..." : "Create Recipe"}
            </Button>
          </div>
        </form>

        {isLoading && (
          <div className="mt-8 flex justify-center py-10">
            <div className="border-primary h-12 w-12 animate-spin rounded-full border-t-2 border-b-2"></div>
          </div>
        )}

        {generatedRecipe && !isLoading && (
          <section className="mt-8 border-t-2 pt-6">
            <h2 className="text-xl font-semibold mb-4 text-center">Your Generated Recipe</h2>
            <div className="prose prose-headings:font-bold prose-h1:text-2xl prose-h2:text-xl prose-h2:text-blue-700 prose-strong:font-semibold prose-em:italic max-w-none p-4 bg-gray-50 rounded-lg shadow-inner">
              <pre className="whitespace-pre-wrap font-sans text-base">{generatedRecipe}</pre>
            </div>
            <div className="flex justify-center mt-6">
              <Button
                className="mr-3"
                variant="submit"
                size="lg"
                onClick={user?.isAuthenticated ? () => triggerToast("Recipe saved to your favorites!", "success"): () => navigate("/signup")}
              >
                  {user?.isAuthenticated ? "Save": 
                "Log in to save your recipees"}
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
          </section>
        )}
      </main>
    </Container>
  );
};

export default CreateRecipe;