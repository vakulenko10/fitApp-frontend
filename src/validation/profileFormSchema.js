import { z } from 'zod';

export const profileFormSchema = z.object({
  name: z.string().min(2, { message: "Name is too short" }),
  email: z.string().email({ message: "Invalid email" }),
  gender: z.enum(["male", "female"], {
    errorMap: () => ({ message: "Please select your gender" }),
  }),
  height: z.coerce.number().int().positive('Must be a positive number').min(50, "Height must be at least 50 cm")
  .max(250, "Height must be less than or equal to 250 cm"),
  age: z.coerce.number().int().positive('Must be a positive number'),
  currentcalorieIntake: z
  .string()
  .min(1, "Calorie intake is required")
  .refine((val) => /^[0-9]+$/.test(val), {
    message: "Calorie intake must be a valid number",
  }),
  weight: z.coerce.number().int().positive('Must be a positive number').min(20, "Weight must be at least 20 kg")
  .max(300, "Weight must be less than or equal to 300 kg"),
});