import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
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
import { calorieFormSchema } from "@/validation/calorieFormSchema";
import { Input } from "@/components/ui/input";

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

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(calorieFormSchema),
    defaultValues: { age, gender, weight, height, activityLevel, goal },
  });

  useEffect(() => {
    setValue("age", user.age || 25);
    setValue("gender", user.gender || "male");
    setValue("weight", user.weight || 70);
    setValue("height", user.height || 180);
  }, [user, setValue]);

  const onSubmit = (data) => {
    const { age, gender, weight, height, activityLevel, goal } = data;
    dispatch(setAge(age));
    dispatch(setGender(gender));
    dispatch(setWeight(weight));
    dispatch(setHeight(height));
    dispatch(setActivityLevel(activityLevel));
    dispatch(setGoal(goal));

    const result = calculateCalorieIntake(age, gender, weight, height, activityLevel, goal);
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
        "error"
      );
    }
  };

  return (
    <Container className="m-0 mx-auto flex justify-center p-0 md:p-8">
      <main className="bg-white text-center shadow-lg md:rounded-md md:p-10 lg:max-w-6xl">
        <h1 className="pt-10 text-2xl font-bold">Daily Calorie Intake Calculator</h1>
        <p className="m-2 md:m-8">
          Feel free to enter your information below to receive your personal daily calorie intake.
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className="flex px-2 flex-col md:grid grid-cols-1 md:grid-cols-4 md:grid-rows-3 md:gap-8 ">
          {/* Gender Selection */}
          <section className="flex flex-col items-center border-b-1 p-6 md:col-span-2 md:justify-between md:rounded-md md:border-1">
            <label htmlFor="gender-group" className="sr-only">Select your gender</label>
            <p className="mb-4 text-lg font-medium">What is your sex?</p>
            <div className="flex w-full flex-col gap-4 md:w-auto md:flex-row">
              {['male', 'female'].map((g) => (
                <Button
                  key={g}
                  type="button"
                  className="w-full px-6 py-2 md:w-auto"
                  variant={watch("gender") === g ? "default" : "ghost"}
                  onClick={() => setValue("gender", g)}
                >
                  {g.charAt(0).toUpperCase() + g.slice(1)}
                </Button>
              ))}
            </div>
            <div className="min-h-[20px] text-sm text-red-500 mt-1">{errors.gender?.message}</div>
          </section>

          {/* Age */}
          <section className="section-input md:col-span-2 md:col-start-3">
            <label htmlFor="age" className="sr-only">Enter your age in years</label>
            <p className="mb-4 text-lg font-medium">How old are you?</p>
            <div className="flex items-center gap-2">
              <Input
                type="number"
                id="age"
                className="w-24 rounded-md border p-2"
                {...register("age", { valueAsNumber: true })}
              />
              <label className="text-sm" htmlFor="age">Years</label>
            </div>
            <div className="min-h-[20px] text-sm text-red-500 mt-1">{errors.age?.message}</div>
          </section>

          {/* Height */}
          <section className="section-input md:col-span-2 md:row-start-2">
            <label htmlFor="height" className="sr-only">Enter your height in centimeters</label>
            <p className="mb-4 text-lg font-medium">How tall are you?</p>
            <div className="flex items-center gap-2">
              <Input
                type="number"
                className="w-24 rounded-md border p-2"
                id="height"
                {...register("height", { valueAsNumber: true })}
              />
              <label className="text-sm" htmlFor="height">cm</label>
            </div>
            <div className="min-h-[20px] text-sm text-red-500 mt-1">{errors.height?.message}</div>
          </section>

          {/* Weight */}
          <section className="section-input md:col-span-2 md:col-start-3 md:row-start-2">
            <label htmlFor="weight" className="sr-only">Enter your weight in kilograms</label>
            <p className="mb-4 text-lg font-medium">How much do you weigh?</p>
            <div className="flex items-center gap-2">
              <Input
                type="number"
                id="weight"
                className="w-24 rounded-md border p-2"
                {...register("weight", { valueAsNumber: true })}
              />
              <label className="text-sm" htmlFor="weight">kg</label>
            </div>
            <div className="min-h-[20px] text-sm text-red-500 mt-1">{errors.weight?.message}</div>
          </section>

          {/* Goal */}
          <section className="section-input  p-8 md:col-span-2 md:col-start-2 md:row-start-3">
            <label htmlFor="goal-group" className="sr-only">Select your fitness goal</label>
            <p className="mb-4 text-lg font-medium">What is your Goal?</p>
            <div className="grid w-full grid-cols-2 gap-4 md:grid-cols-3">
              {['loseWeight', 'maintainWeight', 'gainMuscle'].map((g) => (
                <Button
                  key={g}
                  type="button"
                  className="w-full rounded-md border px-6 py-2 md:w-auto"
                  variant={watch("goal") === g ? "default" : "ghost"}
                  onClick={() => setValue("goal", g)}
                >
                  {g === "loseWeight" ? "Lose Weight" : g === "maintainWeight" ? "Maintain" : "Gain Muscle"}
                </Button>
              ))}
            </div>
            <div className="min-h-[20px] text-sm text-red-500 mt-1">{errors.goal?.message}</div>
          </section>

          {/* Activity Level */}
          <section className="flex flex-col items-center p-8 col-span-4">
            <label htmlFor="activity-level-group" className="sr-only">Select your activity level</label>
            <p className="mb-4 text-lg font-medium">How active are you?</p>
            <div className="grid w-full grid-cols-2 gap-4 md:grid-cols-4">
              {['sedentary', 'light', 'moderate', 'active'].map((level) => (
                <Button
                  key={level}
                  type="button"
                  className="w-full rounded-md border px-6 py-2 md:w-auto"
                  variant={watch("activityLevel") === level ? "default" : "ghost"}
                  onClick={() => setValue("activityLevel", level)}
                >
                  {level.charAt(0).toUpperCase() + level.slice(1)}
                </Button>
              ))}
            </div>
            <div className="min-h-[20px] text-sm text-red-500 mt-1">{errors.activityLevel?.message}</div>
          </section>

          <Button
            type="submit"
            variant="submit"
            size="lg"
            className="w-full rounded-none p-4 md:rounded-md col-span-4"
          >
            Calculate
          </Button>
        </form>

        {/* Modal */}
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
                  <div className="mt-4 font-semibold">Macronutrients (per day):</div>
                  <p>Protein: {calculatedCalories?.macronutrients.protein}g</p>
                  <p>Fats: {calculatedCalories?.macronutrients.fats}g</p>
                  <p>Carbs: {calculatedCalories?.macronutrients.carbs}g</p>
                  <p>Fiber: {calculatedCalories?.macronutrients.fiber}g</p>
                </div>
              </DialogDescription>
            </DialogHeader>
            {calculatedCalories !== null && (
              <div className="text-center">
                {user ? (
                  <>
                    <div className="m-4 text-lg">
                      🎯 Would you like to create a recipe based on your parameters?
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
      </main>
    </Container>
  );
}