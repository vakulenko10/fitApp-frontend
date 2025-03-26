import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { AuthData } from "@/components/auth/AuthWrapper";
import { calculateCalorieIntake } from "@/lib/calorieIntake";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover"; // Import Popover
import { updateUserProfile } from "@/lib/profile";
import { toast } from "sonner"; // Import the toast from sonner

import { Link } from "react-router-dom";
import { Container } from "lucide-react";

export default function Home() {
  const { user, setUser, token } = AuthData();
  const [age, setAge] = useState(25);
  const [gender, setGender] = useState("male");
  const [currentWeight, setCurrentWeight] = useState(70);
  const [goalWeight, setGoalWeight] = useState(70);
  const [height, setHeight] = useState(170);
  const [activityLevel, setActivityLevel] = useState("moderate");
  const [calculatedCalories, setCalculatedCalories] = useState(null);
  useEffect(() => {
    setAge(user.age || 25);
    setGender(user.gender || "male");
    setCurrentWeight(user.weight || 70);
    setHeight(user.height || 180);
  }, [user]);
  const handleCalculate = () => {
    // Pass the start and end dates to the calculation function
    const result = calculateCalorieIntake(
      age,
      gender,
      currentWeight,
      height,
      activityLevel,
      goalWeight
    );
    setCalculatedCalories(result);
  };

  const updateCalorieIntake = async () => {
    try {
      const response = await updateUserProfile(token, {
        currentCalorieIntake: calculatedCalories.calorieIntake,
      });
      setUser((prev) => ({
        ...prev,
        currentCalorieIntake: calculatedCalories.calorieIntake, // Update the calorie intake in the state
      }));
      toast.success(
        <div>
          <p>
            <strong>Success:</strong> Calorie intake updated!
          </p>
          <Link to="/profile" className="text-muted-foreground underline">
            go to profile
          </Link>
        </div>,
        {
          action: {
            label: "Close",
            onClick: () => toast.dismiss(),
          },
        }
      );
    } catch (e) {
      toast.error("Something went wrong while saving your calorie intake!", {
        action: {
          label: "Close",
          onClick: () => toast.dismiss(),
        },
      });
    }
  };

  return (
    <div className="container p-0 flex justify-center">
      <div className="bg-white shadow-lg w-full max-w-6xl text-center">
        <h1 className="text-2xl font-bold">
          Daily Calorie Intake Calculator
        </h1>
        <p className="m-2">
          Feel free to enter your information below in the Daily Calorie Intake
          calculator to receive your personal current daily calorie intake, and
          what your body needs to fuel itself during the day with your routine!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Gender Selection */}
          <div className="p-6 border flex flex-col items-center">
            <p className="mb-4 text-lg font-medium">What is your sex?</p>
            <div className="w-full md:w-auto flex flex-col md:flex-row gap-4">
              <Button
                className="w-full md:w-auto px-6 py-2 border rounded-md"
                variant={gender === "male" ? "default" : "ghost"}
                onClick={() => setGender("male")}
              >
                Male
              </Button>
              <Button
                className="w-full md:w-auto px-6 py-2 border rounded-md"
                variant={gender === "female" ? "default" : "ghost"}
                onClick={() => setGender("female")}
              >
                Female
              </Button>
            </div>
          </div>

          {/* Age Input */}
          <div className="p-6 border rounded-lg flex flex-col items-center">
            <p className="mb-4 text-lg font-medium">How old are you?</p>
            <input
              type="number"
              className="w-24 border p-2 rounded-md text-center"
              value={age}
              onChange={(e) => setAge(Number(e.target.value))}
            />
          </div>

          {/* Height Input */}
          <div className="p-6 border rounded-lg flex flex-col items-center">
            <p className="mb-4 text-lg font-medium">How tall are you?</p>
            <div className="flex items-center gap-2">
              <input
                type="number"
                className="w-24 border p-2 rounded-md text-center"
                value={height}
                onChange={(e) => setHeight(Number(e.target.value))}
              />
              <span>cm</span>
            </div>
          </div>

          {/* Weight Input */}
          <div className="p-6 border rounded-lg flex flex-col items-center">
            <p className="mb-4 text-lg font-medium">How much do you weigh?</p>
            <div className="flex items-center gap-2">
              <input
                type="number"
                className="w-24 border p-2 rounded-md text-center"
                value={currentWeight}
                onChange={(e) => setCurrentWeight(Number(e.target.value))}
              />
              <span>kg</span>
            </div>
          </div>

          <div className="p-6 border rounded-lg flex flex-col items-center">
            <p className="mb-4 text-lg font-medium">
              What is your weight goal?
            </p>
            <div className="flex items-center gap-2">
              <input
                type="number"
                className="w-24 border p-2 rounded-md text-center"
                value={goalWeight}
                onChange={(e) => setGoalWeight(Number(e.target.value))}
              />
              <span>kg</span>
            </div>
          </div>
        </div>

        {/* Activity Level Selection */}
        <div className="p-6 border rounded-lg flex flex-col items-center mt-6">
          <p className="mb-4 text-lg font-medium">How active are you?</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
            {["sedentary", "light", "moderate", "active", "superActive"].map(
              (level) => (
                <Button
                  className="w-full md:w-auto px-6 py-2 border rounded-md"
                  key={level}
                  variant={activityLevel === level ? "default" : "ghost"}
                  onClick={() => setActivityLevel(level)}
                >
                  {level.charAt(0).toUpperCase() + level.slice(1)}
                </Button>
              )
            )}
          </div>
        </div>

        {/* Calculate Button */}
        <div className="mt-8 text-center">
          <Button
            variant="submit"
            onClick={handleCalculate}
            size="lg"
            className="w-full"
          >
            Calculate
          </Button>
        </div>

        {/* Results Display */}
        {calculatedCalories !== null && (
          <div className="mt-6 p-4 border rounded-lg text-center">
            <p className="text-lg font-bold">Daily Caloric Intake:</p>
            <p className="text-2xl font-semibold text-green-600">
              {Math.round(calculatedCalories.calorieIntake)} kcal
            </p>
            <p className="text-lg font-bold mt-4">
              Total Calories for {calculatedCalories.days} Days:
            </p>
            <p className="text-2xl font-semibold text-green-600">
              {calculatedCalories.totalCalories} kcal
            </p>
            <p className="mt-4 font-semibold">Macronutrients (per day):</p>
            <p>Protein: {calculatedCalories.macronutrients.protein}g</p>
            <p>Fats: {calculatedCalories.macronutrients.fats}g</p>
            <p>Carbs: {calculatedCalories.macronutrients.carbs}g</p>
          </div>
        )}

        {/* Authentication Check for Saving Results */}
        {calculatedCalories !== null && (
          <div className="mt-6 text-center">
            {user ? (
              <>
                <p className="text-lg">
                  🎯 Would you like to save this intake in your profile?
                </p>
                <div className="flex gap-2 justify-center items-center ">
                  <Button variant={"grey"}>cancel</Button>
                  <Button variant={"submit"} onClick={updateCalorieIntake}>
                    save
                  </Button>
                </div>
              </>
            ) : (
              <p className="text-lg text-red-500">
                🔒 Log in or register to save your calorie intake results!
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
