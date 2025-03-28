import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { AuthData } from "@/components/auth/AuthWrapper";
import { calculateCalorieIntake } from "@/lib/calorieIntake";
import { updateUserProfile } from "@/lib/profile";
import { toast } from "sonner"; // Import the toast from sonner
import { Link } from "react-router-dom";
import Container from "../components/Container";

export default function Home() {
  const { user, setUser, token } = AuthData();
  const [age, setAge] = useState(25);
  const [gender, setGender] = useState("male");
  const [weight, setWeight] = useState(70);
  const [height, setHeight] = useState(170);
  const [activityLevel, setActivityLevel] = useState("moderate");
  const [goal, setGoal] = useState("loseWeight");
  const [calculatedCalories, setCalculatedCalories] = useState(null);

  useEffect(() => {
    setAge(user.age || 25);
    setGender(user.gender || "male");
    setWeight(user.weight || 70);
    setHeight(user.height || 180);
  }, [user]);

  const handleCalculate = () => {
    const result = calculateCalorieIntake(
      age,
      gender,
      weight,
      height,
      activityLevel,
      goal
    );
    setCalculatedCalories(result);
  };

  const updateCalorieIntake = async () => {
    try {
      await updateUserProfile(token, {
        currentCalorieIntake: calculatedCalories?.calorieIntake,
      });
      setUser((prev) => ({
        ...prev,
        currentCalorieIntake: calculatedCalories?.calorieIntake,
      }));
      toast.success(
        <div>
          <p>
            <strong>Success:</strong> Calorie intake updated!
          </p>
          <Link to="/profile" className="text-muted-foreground underline">
            Go to profile
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
    <Container className="m-0 mx-auto flex justify-center p-0 md:p-8">
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
            <input
              type="number"
              className="w-24 rounded-md border p-2"
              value={height}
              onChange={(e) => setHeight(Number(e.target.value))}
            />
          </div>

          {/* Weight Input */}
          <div className="section-input">
            <p className="mb-4 text-lg font-medium">How much do you weigh?</p>
            <input
              type="number"
              className="w-24 rounded-md border p-2"
              value={weight}
              onChange={(e) => setWeight(Number(e.target.value))}
            />
          </div>

          {/* Goal Selection */}
          <div className="section-input">
            <p className="mb-4 text-lg font-medium">What is your weight goal?</p>
            <div className="grid w-full grid-cols-2 gap-4 md:grid-cols-3">
              {["loseWeight", "maintainWeight", "gainMuscle"].map(
                (selectedGoal) => (
                  <Button
                    key={selectedGoal}
                    className="w-full rounded-md border px-6 py-2 md:w-auto"
                    variant={goal === selectedGoal ? "default" : "ghost"}
                    onClick={() => setGoal(selectedGoal)}
                  >
                    {selectedGoal.charAt(0).toUpperCase() + selectedGoal.slice(1)}
                  </Button>
                )
              )}
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
        <Button
          variant="submit"
          onClick={handleCalculate}
          size="lg"
          className="w-full rounded-none p-4"
        >
          Calculate
        </Button>

        {/* Results Display */}
        {calculatedCalories && (
          <div className="mt-6 rounded-lg border p-4">
            <p className="text-lg font-bold">Daily Caloric Intake:</p>
            <p className="text-2xl font-semibold text-green-600">
              {calculatedCalories.calorieIntake} kcal
            </p>
            <p className="mt-4 font-semibold">Macronutrients (per day):</p>
            <p>Protein: {calculatedCalories.macronutrients.protein}g</p>
            <p>Fats: {calculatedCalories.macronutrients.fats}g</p>
            <p>Carbs: {calculatedCalories.macronutrients.carbs}g</p>
            <p>Fiber: {calculatedCalories.macronutrients.fiber}g</p>
          </div>
        )}
      </div>
    </Container>
  );
}
