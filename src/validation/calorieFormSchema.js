import { z } from "zod";

export const calorieFormSchema = z.object({
  age: z
    .number({ invalid_type_error: "Age is required" })
    .min(18, "Age must be at least 18")
    .max(120, "Age must be less than or equal to 120"),

  height: z
    .number({ invalid_type_error: "Height is required" })
    .min(50, "Height must be at least 50 cm")
    .max(250, "Height must be less than or equal to 250 cm"),

  weight: z
    .number({ invalid_type_error: "Weight is required" })
    .min(20, "Weight must be at least 20 kg")
    .max(300, "Weight must be less than or equal to 300 kg"),

  gender: z.enum(["male", "female"], {
    errorMap: () => ({ message: "Please select your gender" }),
  }),

  activityLevel: z.enum(["sedentary", "light", "moderate", "active"], {
    errorMap: () => ({ message: "Please select your activity level" }),
  }),

  goal: z.enum(["loseWeight", "maintainWeight", "gainMuscle"], {
    errorMap: () => ({ message: "Please select your goal" }),
  }),
});
