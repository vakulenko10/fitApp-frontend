export const getMealPlanHistory = vi.fn(async (token) => {
    if (!token) throw new Error("User not authenticated");
    return [{ id: 1, name: "Mock Plan", date: "2024-01-01" }];
  });
  
  export const generateMealPlan = vi.fn(async ({ token, formData, selectedAllergens }) => {
    return {
      id: "plan-1",
      meals: ["Meal 1", "Meal 2"],
      calories: parseInt(formData.calorieIntake, 10),
      allergens: selectedAllergens,
    };
  });
  