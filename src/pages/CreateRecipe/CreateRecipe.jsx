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
      <div className="mx-auto w-full rounded-lg bg-white p-10 xl:max-w-[1200px]">
        <form onSubmit={handleSubmit(handleCreateRecipe)}>
          <div className="mb-4.5 xl:mb-12.5">
            <h1 className="text-center text-xl font-semibold md:font-bold">
              Your daily calorie intake
              {user?.isAuthenticated && user?.currentCalorieIntake && (
                <span className="block text-sm font-normal text-gray-500">
                  (your daily calorie intake is automatically loaded from your
                  profile)
                </span>
              )}
            </h1>
            <div className="flex items-center justify-center gap-4">
              <Input
                {...register("calorieIntake")}
                className="bg-primary text-foreground w-[200px] border-black text-center sm:h-12"
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
            {errors.calorieIntake && (
              <p className="mt-2 text-center text-red-500">
                {errors.calorieIntake.message}
              </p>
            )}
          </div>

          <div className="mb-3 xl:mb-12.5">
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
            {errors.selectedProducts && (
              <p className="mt-2 text-center text-red-500">
                {errors.selectedProducts.message}
              </p>
            )}
          </div>

          <div className="mb-5 sm:mb-8">
            <div className="mb-3 text-center">
              <h3 className="p-0 text-lg font-semibold">
                Add your dietary preferences and restrictions
              </h3>
              <p className="text-muted-foreground">
                You can specify additional products in parentheses:{" "}
                <code>(Salmon)</code>, allergies with an asterisk:{" "}
                <code>*Peanuts</code>, and any other personal notes or
                requirements.
              </p>
              <p className="text-muted-foreground">
                While we do our best to follow your input, some preferences may
                not always be fully met.
              </p>
            </div>
            <Textarea
              {...register("preferences")}
              placeholder="Preferences"
              className="lg:min-h-25"
            />
          </div>

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
          <div className="mt-8 border-t-2 pt-6">
            <h2 className="mb-4 text-center text-xl font-semibold">
              Your Generated Recipe
            </h2>
            <div className="prose prose-headings:font-bold prose-h1:text-2xl prose-h2:text-xl prose-h2:text-blue-700 prose-strong:font-semibold prose-em:italic max-w-none rounded-lg bg-gray-50 p-4 shadow-inner">
              <pre className="font-sans text-base whitespace-pre-wrap">
                {generatedRecipe}
              </pre>
            </div>
            <div className="mt-6 flex justify-center">
              <Button
                className="mr-3"
                variant="submit"
                size="lg"
                onClick={
                  user?.isAuthenticated
                    ? () =>
                        triggerToast(
                          "Recipe saved to your favorites!",
                          "success",
                        )
                    : () => navigate("/signup")
                }
              >
                {user?.isAuthenticated
                  ? "Save"
                  : "Log in to save your recipees"}
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
