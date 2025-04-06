import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input.jsx";
import { AuthData } from "@/hooks/AuthData";
import { calculateCalorieIntake } from "@/lib/calorieIntake";
import { updateUserProfile } from "@/lib/profile";
import Container from "@/components/Container";
import { useNotification } from "@/hooks/UseNotification";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  setAge,
  setGender,
  setWeight,
  setHeight,
  setActivityLevel,
  setGoal,
  setCalculatedCalories,
  setIsModalOpen,
} from "@/redux/calorieSlice";

export default function Home() {
  const dispatch = useDispatch();
  const { triggerToast } = useNotification();
  const { user, setUser, token } = AuthData();
  const {
    age,
    gender,
    weight,
    height,
    activityLevel,
    goal,
    calculatedCalories,
    isModalOpen,
  } = useSelector((state) => state.calories);

  useEffect(() => {
    dispatch(setAge(user.age || 25));
    dispatch(setGender(user.gender || "male"));
    dispatch(setWeight(user.weight || 70));
    dispatch(setHeight(user.height || 180));
  }, [user, dispatch]);

  const handleCalculate = () => {
    const result = calculateCalorieIntake(
      age,
      gender,
      weight,
      height,
      activityLevel,
      goal,
    );
    dispatch(setCalculatedCalories(result));
    dispatch(setIsModalOpen(true));
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
      triggerToast("Calorie intake updated", "success", "/profile");
    } catch (e) {
      triggerToast(
        `Something went wrong while saving your calorie intake: ${e}`,
        "error",
      );
    }
  };

  return (
    <Container className="m-0 mx-auto flex justify-center p-0 md:p-8">
      <div className="bg-white text-center shadow-lg md:rounded-md md:p-10 lg:max-w-6xl">
        <h1 className="pt-10 text-2xl font-bold">
          Daily Calorie Intake Calculator
        </h1>
        <p className="m-2 md:m-8">
          Feel free to enter your information below in the Daily Calorie Intake
          calculator to receive your personal current daily calorie intake, and
          what your body needs to fuel itself during the day with your routine!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-3 md:gap-8">
          {/* Gender Selection */}
          <form className="flex flex-col items-center border-b-1 p-8 md:p-10 md:col-span-2 md:justify-between md:rounded-md md:border-1">
            <p className="mb-4 text-lg font-medium">What is your sex?</p>
            <div className="flex w-full flex-col gap-4 md:w-auto md:flex-row">
              <Button
                type="button"
                className="w-full px-6 py-2 md:w-auto md:py-8"
                variant={gender === "male" ? "default" : "ghost"}
                onClick={() => dispatch(setGender("male"))}
              >
                Male
              </Button>
              <Button
                type="button"
                className="w-full px-6 py-2 md:w-auto md:py-8"
                variant={gender === "female" ? "default" : "ghost"}
                onClick={() => dispatch(setGender("female"))}
              >
                Female
              </Button>
            </div>
          </form>

          {/* Age Input */}
          <form className="section-input md:col-span-2 md:col-start-3">
            <p className="mb-4 text-lg font-medium">How old are you?</p>
            <div className="flex items-center gap-2">
              <Input
                type="number"
                id="age-input"
                className="max-w-20 md:max-w-30 md:py-8"
                value={age}
                onChange={(e) => dispatch(setAge(Number(e.target.value)))}
              />
              <label htmlFor="age-input" className="text-sm">
                Years
              </label>
            </div>
          </form>

          {/* Height Input */}
          <form className="section-input md:col-span-2 md:row-start-2">
            <p className="mb-4 text-lg font-medium">How tall are you?</p>
            <div className="flex items-center gap-2">
              <Input
                type="number"
                className="max-w-20 md:max-w-30 md:py-8"
                value={height}
                id="height-input"
                onChange={(e) => dispatch(setHeight(Number(e.target.value)))}
              />
              <label htmlFor="height-input" className="text-sm">
                cm
              </label>
            </div>
          </form>

          {/* Weight Input */}
          <form className="section-input md:col-span-2 md:col-start-3 md:row-start-2">
            <p className="mb-4 text-lg font-medium">How much do you weigh?</p>
            <div className="flex items-center gap-2">
              <Input
                type="number"
                className="max-w-20 md:max-w-30 md:py-8"
                value={weight}
                id="weight-input"
                onChange={(e) => dispatch(setWeight(Number(e.target.value)))}
              />
              <label htmlFor="weight-input" className="text-sm">
                kg
              </label>
            </div>
          </form>

          {/* Goal Selection */}
          <form className="section-input md:col-span-2 md:col-start-2 md:row-start-3">
            <p className="mb-4 text-lg font-medium">What is your Goal?</p>
            <div className="grid w-full grid-cols-2 gap-4 md:grid-cols-3">
              {["loseWeight", "maintainWeight", "gainMuscle"].map(
                (selectedGoal) => (
                  <Button
                    key={selectedGoal}
                    type="button"
                    className="w-full rounded-md border px-6 py-2 md:w-auto md:py-8"
                    variant={goal === selectedGoal ? "default" : "ghost"}
                    onClick={() => dispatch(setGoal(selectedGoal))}
                  >
                    {selectedGoal === "loseWeight"
                      ? "Lose Weight"
                      : selectedGoal === "maintainWeight"
                        ? "Maintain Weight"
                        : "Gain Muscle"}
                  </Button>
                ),
              )}
            </div>
          </form>
        </div>

        {/* Activity Level Selection */}
        <form className="flex flex-col items-center p-8">
          <p className="mb-4 text-lg font-medium">How active are you?</p>
          <div className="grid w-full grid-cols-2 gap-4 md:grid-cols-4">
            {["sedentary", "light", "moderate", "active"].map((level) => (
              <Button
                type="button"
                className="w-full rounded-md border px-6 py-2 md:w-auto md:py-8"
                key={level}
                variant={activityLevel === level ? "default" : "ghost"}
                onClick={() => dispatch(setActivityLevel(level))}
              >
                {level.charAt(0).toUpperCase() + level.slice(1)}
              </Button>
            ))}
          </div>
        </form>

        {/* Calculate Button */}
        <Button
          variant="submit"
          onClick={handleCalculate}
          size="lg"
          className="w-full rounded-none p-4 md:rounded-md"
        >
          Calculate
        </Button>

        {/* {Modal Window} */}
        <Dialog
          open={isModalOpen}
          onOpenChange={(value) => dispatch(setIsModalOpen(value))}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-lg font-bold">
                Daily Caloric Intake:
              </DialogTitle>
              <DialogDescription asChild>
                <div className="rounded-lg border p-4">
                  <span className="text-2xl font-semibold text-green-600">
                    {calculatedCalories?.calorieIntake} kcal
                  </span>
                  <div className="mt-4 font-semibold">
                    Macronutrients (per day):
                  </div>
                  <p>Protein: {calculatedCalories?.macronutrients.protein}g</p>
                  <p>Fats: {calculatedCalories?.macronutrients.fats}g</p>
                  <p>Carbs: {calculatedCalories?.macronutrients.carbs}g</p>
                  <p>Fiber: {calculatedCalories?.macronutrients.fiber}g</p>
                </div>
              </DialogDescription>
            </DialogHeader>

            {/* Authentication Check for Saving Results */}
            {calculatedCalories !== null && (
              <div className="text-center">
                {user ? (
                  <>
                    <div className="m-4 text-lg">
                      🎯 Would you like to create a recipe based on your
                      parameters?
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <Button
                        variant="grey"
                        onClick={() => dispatch(setIsModalOpen(false))}
                      >
                        No
                      </Button>
                      <Button variant="submit" onClick={updateCalorieIntake}>
                        Yes
                      </Button>
                    </div>
                  </>
                ) : (
                  <div className="text-lg text-red-500">
                    🔒 Log in or register to save your calorie intake results!
                  </div>
                )}
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </Container>
  );
}
