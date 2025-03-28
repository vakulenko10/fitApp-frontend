import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { AuthData } from "@/hooks/AuthData";
import { calculateCalorieIntake } from "@/lib/calorieIntake";
import { updateUserProfile } from "@/lib/profile";
import Modal from "react-modal";
import Container from "@/components/Container";
// import { useNotification } from "../../hooks/useNotification";
Modal.setAppElement("#root");

export default function Home() {
  // const { triggerToast } = useNotification();
  const { user,  setUser, token } = AuthData();
  const [age, setAge] = useState(25);
  const [gender, setGender] = useState("male");
  const [weight, setWeight] = useState(70);
  const [height, setHeight] = useState(170);
  const [activityLevel, setActivityLevel] = useState("moderate");
  const [goal, setGoal] = useState("loseWeight");
  const [calculatedCalories, setCalculatedCalories] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      goal,
    );
    setCalculatedCalories(result);
    setIsModalOpen(true);
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
      // triggerToast("Calorie intake updated", "success", "/profile" )
    }
    catch(e){
      // triggerToast(`Something went wrong while saving your calorie intake: ${e}`, "error" )
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
          <form className="flex flex-col items-center border-b-1 p-6 md:col-span-2 md:justify-between md:rounded-md md:border-1">
            <p className="mb-4 text-lg font-medium">What is your sex?</p>
            <div className="flex w-full flex-col gap-4 md:w-auto md:flex-row">
              <Button
                type="button"
                className="w-full px-6 py-2 md:w-auto"
                variant={gender === "male" ? "default" : "ghost"}
                onClick={() => setGender("male")}
              >
                Male
              </Button>
              <Button
                type="button"
                className="w-full px-6 py-2 md:w-auto"
                variant={gender === "female" ? "default" : "ghost"}
                onClick={() => setGender("female")}
              >
                Female
              </Button>
            </div>
          </form>

          {/* Age Input */}
          <form className="section-input md:col-span-2 md:col-start-3">
            <p className="mb-4 text-lg font-medium">How old are you?</p>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="age-input"
                className="w-24 rounded-md border p-2"
                value={age}
                onChange={(e) => setAge(Number(e.target.value))}
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
              <input
                type="number"
                className="w-24 rounded-md border p-2"
                value={height}
                id="height-input"
                onChange={(e) => setHeight(Number(e.target.value))}
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
              <input
                type="number"
                className="w-24 rounded-md border p-2"
                value={weight}
                id="weight-input"
                onChange={(e) => setWeight(Number(e.target.value))}
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
                    className="w-full rounded-md border px-6 py-2 md:w-auto"
                    variant={goal === selectedGoal ? "default" : "ghost"}
                    onClick={() => setGoal(selectedGoal)}
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
                className="w-full rounded-md border px-6 py-2 md:w-auto"
                key={level}
                variant={activityLevel === level ? "default" : "ghost"}
                onClick={() => setActivityLevel(level)}
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

        {/* Popup */}
        <Modal
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          contentLabel="Calorie Intake Results"
          className="modal-content"
          overlayClassName="modal-overlay"
        >
          {/* Popup closer */}
          <button
            onClick={() => setIsModalOpen(false)}
            className="btn-close self-end pb-2.5 text-red-500"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30px"
              height="30px"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M19.207 6.207a1 1 0 0 0-1.414-1.414L12 10.586 6.207 4.793a1 1 0 0 0-1.414 1.414L10.586 12l-5.793 5.793a1 1 0 1 0 1.414 1.414L12 13.414l5.793 5.793a1 1 0 0 0 1.414-1.414L13.414 12l5.793-5.793z"
                fill="#000000"
              />
            </svg>
          </button>
          <div className="rounded-lg border p-4">
            <p className="text-lg font-bold">Daily Caloric Intake:</p>
            <p className="text-2xl font-semibold text-green-600">
              {calculatedCalories?.calorieIntake} kcal
            </p>
            <p className="mt-4 font-semibold">Macronutrients (per day):</p>
            <p>Protein: {calculatedCalories?.macronutrients.protein}g</p>
            <p>Fats: {calculatedCalories?.macronutrients.fats}g</p>
            <p>Carbs: {calculatedCalories?.macronutrients.carbs}g</p>
            <p>Fiber: {calculatedCalories?.macronutrients.fiber}g</p>
          </div>

          {/* Authentication Check for Saving Results */}
          {calculatedCalories !== null && (
            <div className="text-center">
              {user ? (
                <>
                  <p className="m-4 text-lg">
                    🎯 Would you like to create a recipe based on your
                    parameters?
                  </p>
                  <div className="flex items-center justify-center gap-2">
                    <Button
                      variant={"grey"}
                      onClick={() => setIsModalOpen(false)}
                    >
                      No
                    </Button>
                    <Button variant={"submit"} onClick={updateCalorieIntake}>
                      Yes
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
        </Modal>
      </div>
    </Container>
  );
}
