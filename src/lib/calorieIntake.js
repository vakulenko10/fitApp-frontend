export function calculateCalorieIntake(
  age,
  gender,
  weight,
  height,
  activityLevel,
  goal,
) {
  // Activity multipliers based on lifestyle
  const activityMultipliers = {
    sedentary: 1.2, // Little to no exercise
    light: 1.375, // Light exercise (1-3 days per week)
    moderate: 1.55, // Moderate exercise (3-5 days per week)
    active: 1.725, // Heavy exercise (6-7 days per week)
    superActive: 1.9, // Very intense training or physical job
  };

  // Goal adjustments for calorie intake
  const goalMultipliers = {
    loseWeight: -0.15, // Reduce 15% of total calories
    maintainWeight: 0, // No change
    gainMuscle: 0.1, // Increase 10% of total calories
  };

  // Select activity factor based on user input
  const activityFactor = activityMultipliers[activityLevel] || 1.2;

  let BMR;

  // Calculate Basal Metabolic Rate (BMR) using the Mifflin-St Jeor equation
  if (gender === "male") {
    BMR = 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
    BMR = 10 * weight + 6.25 * height - 5 * age - 161;
  }

  // Total Daily Energy Expenditure (TDEE)
  const TDEE = BMR * activityFactor;

  // Adjust calorie intake based on the goal
  const calorieIntake = TDEE * (1 + (goalMultipliers[goal] || 0));

  // Macronutrient distribution based on fitness goals
  const macroDistribution = {
    maintainWeight: {
      protein: 0.25,
      carbs: 0.47,
      fats: 0.28,
      fiber: gender === "male" ? 14 : 12,
    },
    loseWeight: {
      protein: 0.28,
      carbs: 0.43,
      fats: 0.29,
      fiber: gender === "male" ? 14 : 12,
    },
    gainMuscle: {
      protein: 0.25,
      carbs: 0.49,
      fats: 0.26,
      fiber: gender === "male" ? 14 : 12,
    },
  };

  // Get the macro ratios for the selected goal
  const { protein, carbs, fats, fiber } =
    macroDistribution[goal] || macroDistribution.maintainWeight;

  // Calculate macronutrient intake in grams
  const proteinIntake = (calorieIntake * protein) / 4; // 1g protein = 4 kcal
  const carbIntake = (calorieIntake * carbs) / 4; // 1g carb = 4 kcal
  const fatIntake = (calorieIntake * fats) / 9; // 1g fat = 9 kcal

  // Calculate fiber intake based on total calories
  const fiberIntake = (fiber * calorieIntake) / 1000;

  return {
    calorieIntake: Math.round(calorieIntake),
    macronutrients: {
      protein: Math.round(proteinIntake),
      fats: Math.round(fatIntake),
      carbs: Math.round(carbIntake),
      fiber: Math.round(fiberIntake),
    },
  };
}

export function calculateMacrosFromCalories(
  calorieIntake,
  gender,
  goal = "maintainWeight",
) {
  // Macronutrient distribution based on goal
  const macroDistribution = {
    maintainWeight: {
      protein: 0.25,
      carbs: 0.47,
      fats: 0.28,
      fiber: gender === "male" ? 14 : 12,
    },
    loseWeight: {
      protein: 0.28,
      carbs: 0.43,
      fats: 0.29,
      fiber: gender === "male" ? 14 : 12,
    },
    gainMuscle: {
      protein: 0.25,
      carbs: 0.49,
      fats: 0.26,
      fiber: gender === "male" ? 14 : 12,
    },
  };

  // Get the macronutrient ratios for the selected goal
  const { protein, carbs, fats, fiber } =
    macroDistribution[goal] || macroDistribution.maintainWeight;

  // Calculate macronutrient intake in grams
  const proteinIntake = (calorieIntake * protein) / 4; // 1g protein = 4 kcal
  const carbIntake = (calorieIntake * carbs) / 4; // 1g carbs = 4 kcal
  const fatIntake = (calorieIntake * fats) / 9; // 1g fat = 9 kcal
  const fiberIntake = (fiber * calorieIntake) / 1000;

  return {
    protein: Math.round(proteinIntake),
    fats: Math.round(fatIntake),
    carbs: Math.round(carbIntake),
    fiber: Math.round(fiberIntake),
  };
}

console.log(
  calculateCalorieIntake(25, "female", 60, 165, "light", "loseWeight"),
);
