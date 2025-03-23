export function calculateCalorieIntake(age, gender, currentWeight, height, activityLevel, goalWeight, startDate, endDate) {
    const weight = currentWeight;
    const heightCm = height;
  
    const activityMultipliers = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      superActive: 1.9,
    };
  
    const activityFactor = activityMultipliers[activityLevel] || 1.2;
  
    let BMR;
    if (gender === "male") {
      BMR = 10 * weight + 6.25 * heightCm - 5 * age + 5;
    } else {
      BMR = 10 * weight + 6.25 * heightCm - 5 * age - 161;
    }
  
    const TDEE = BMR * activityFactor;
  
    let calorieIntake;
    if (goalWeight > currentWeight) {
      calorieIntake = TDEE + 500; 
    } else if (goalWeight < currentWeight) {
      calorieIntake = TDEE - 500; 
    } else {
      calorieIntake = TDEE; 
    }
  
    const proteinIntake = goalWeight * 2;
    const proteinCalories = proteinIntake * 4;
  
    const fatIntake = (calorieIntake * 0.25) / 9;
    const fatCalories = fatIntake * 9;
  
    const carbCalories = calorieIntake - (proteinCalories + fatCalories);
    const carbIntake = carbCalories / 4;
  
    // Calculate the number of days between startDate and endDate
    const start = new Date(startDate);
    const end = new Date(endDate);
    const timeDifference = end.getTime() - start.getTime();
    const days = Math.ceil(timeDifference / (1000 * 60 * 60 * 24)) + 1;
  
    const totalCalories = days * calorieIntake;
  
    return {
      calorieIntake: Math.round(calorieIntake),
      totalCalories: Math.round(totalCalories),
      macronutrients: {
        protein: Math.round(proteinIntake),
        fats: Math.round(fatIntake),
        carbs: Math.round(carbIntake),
      },
      days,
    };
  }
  