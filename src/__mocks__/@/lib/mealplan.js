export const getMealPlanHistory = vi.fn(async (token) => {
    if (!token || token === "invalid") {
      throw new Error("Invalid token");
    }
  
    return Promise.resolve({
      mealPlans: [
        {
          id: "edc34782-4f98-4c75-8826-31fccb052634",
          userId: "99ec1437-6692-47d0-8cf7-b8172e6b50e2",
          generatedText: "**Daily Meal Plan (≈1500 Calories)**\\n...",
          preferences: null,
          calorieIntake: 1500,
          includedProducts: JSON.stringify([
            "banana",
            "strawberry",
            "milk",
            "chicken",
            "rice",
            "bread",
          ]),
          excludedProducts: JSON.stringify([
            "fish",
            "raspberry",
            "nuts",
            "pork",
            "potato",
            "cheese",
          ]),
          createdAt: "2025-03-17T23:29:06.777Z",
        },
        {
          id: "c7c26960-0767-4991-9932-7cf61766d2eb",
          userId: "99ec1437-6692-47d0-8cf7-b8172e6b50e2",
          generatedText: "No response received.",
          preferences: null,
          calorieIntake: 1500,
          includedProducts: JSON.stringify([
            "banana",
            "strawberry",
            "milk",
            "chicken",
            "rice",
            "bread",
          ]),
          excludedProducts: JSON.stringify([
            "fish",
            "raspberry",
            "nuts",
            "pork",
            "potato",
            "cheese",
          ]),
          createdAt: "2025-03-17T23:18:07.424Z",
        },
      ],
    });
  });
  export const generateMealPlan = vi.fn(async ({ token, formData, selectedAllergens }) => {
    if (!formData || !formData.selectedProducts || formData.selectedProducts.length === 0) {
      throw new Error("Missing products");
    }
  
    return Promise.resolve({
      mealPlan: `Here’s your **1,500-calorie meal plan** using banana, strawberry, milk, chicken, rice, and bread, while avoiding excluded ingredients. Recipes are simple and easy to follow:\n\n---\n\n### **Breakfast: Banana-Strawberry Smoothie Bowl**\n...\n\n---\n\n### **Daily Total: 1,505 kcal...**`,
    });
  });
  