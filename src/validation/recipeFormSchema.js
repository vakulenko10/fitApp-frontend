import { z } from "zod";
export const recipeFormSchema = z.object({
    calorieIntake: z
      .string()
      .min(1, "Calorie intake is required")
      .refine((val) => /^[0-9]+$/.test(val), {
        message: "Calorie intake must be a valid number",
      }),
    selectedProducts: z
      .array(z.string())
      .min(1, "Select at least one product for your recipe"),
    preferences: z.string().optional(),
    goal: z.enum(["deficit", "maintain", "surplus"]),
  });