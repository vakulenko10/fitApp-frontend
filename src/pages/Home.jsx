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
import Container from "../components/Container";

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
      goalWeight,
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
        },
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
    <Container className="m-0 mx-auto p-0 md:p-8 flex justify-center">
      <div className="bg-white text-center shadow-lg md:rounded-md lg:max-w-6xl">
        <h1 className="pt-10 text-2xl font-bold">
          Daily Calorie Intake Calculator
        </h1>
        <p className="m-2">
          Feel free to enter your information below in the Daily Calorie Intake
          calculator to receive your personal current daily calorie intake, and
          what your body needs to fuel itself during the day with your routine!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Gender Selection */}
          <div className="flex flex-col items-center border-b-1 p-6">
            <p className="mb-4 text-lg font-medium">What is your sex?</p>
            <div className="flex w-full flex-col gap-4 md:w-auto md:flex-row">
              <Button
                className="w-full px-6 py-2 md:w-auto"
                variant={gender === "male" ? "default" : "ghost"}
                onClick={() => setGender("male")}
              >
                Male
              </Button>
              <Button
                className="w-full px-6 py-2 md:w-auto"
                variant={gender === "female" ? "default" : "ghost"}
                onClick={() => setGender("female")}
              >
                Female
              </Button>
            </div>
          </div>

          {/* Age Input */}
          <div className="section-input">
            <p className="mb-4 text-lg font-medium">How old are you?</p>
            <input
              type="number"
              className="w-24 rounded-md border p-2"
              value={age}
              onChange={(e) => setAge(Number(e.target.value))}
            />
          </div>

          {/* Height Input */}
          <div className="section-input">
            <p className="mb-4 text-lg font-medium">How tall are you?</p>
            <div className="flex items-center gap-2">
              <input
                type="number"
                className="w-24 rounded-md border p-2"
                value={height}
                onChange={(e) => setHeight(Number(e.target.value))}
              />
              <span>cm</span>
            </div>
          </div>

          {/* Weight Input */}
          <div className="section-input">
            <p className="mb-4 text-lg font-medium">How much do you weigh?</p>
            <div className="flex items-center gap-2">
              <input
                type="number"
                className="w-24 rounded-md border p-2"
                value={currentWeight}
                onChange={(e) => setCurrentWeight(Number(e.target.value))}
              />
              <span>kg</span>
            </div>
          </div>

          {/* Weight Goal Selection */}
          <div className="section-input">
            <p className="mb-4 text-lg font-medium">
              What is your weight goal?
            </p>
            <div className="flex items-center gap-2">
              <input
                type="number"
                className="w-24 rounded-md border p-2"
                value={goalWeight}
                onChange={(e) => setGoalWeight(Number(e.target.value))}
              />
              <span>kg</span>
            </div>
          </div>
        </div>

        {/* Activity Level Selection */}
        <div className="flex flex-col items-center p-8">
          <p className="mb-4 text-lg font-medium">How active are you?</p>
          <div className="grid w-full grid-cols-2 gap-4 md:grid-cols-4">
            {["sedentary", "light", "moderate", "active"].map((level) => (
              <Button
                className="w-full rounded-md border px-6 py-2 md:w-auto"
                key={level}
                variant={activityLevel === level ? "default" : "ghost"}
                onClick={() => setActivityLevel(level)}
              >
                {level.charAt(0).toUpperCase() + level.slice(1)}
              </Button>
            ))}
          </div>
        </div>

        {/* Calculate Button */}
        <div className="">
          <Button
            variant="submit"
            onClick={handleCalculate}
            size="lg"
            className="w-full rounded-none p-4"
          >
            Calculate
          </Button>
        </div>

        {/* Results Display */}
        {calculatedCalories !== null && (
          <div className="mt-6 rounded-lg border p-4">
            <p className="text-lg font-bold">Daily Caloric Intake:</p>
            <p className="text-2xl font-semibold text-green-600">
              {Math.round(calculatedCalories.calorieIntake)} kcal
            </p>
            <p className="mt-4 text-lg font-bold">
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
          <div className="mt-6">
            {user ? (
              <>
                <p className="text-lg">
                  🎯 Would you like to save this intake in your profile?
                </p>
                <div className="flex items-center justify-center gap-2">
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
    </Container>
  );
}
