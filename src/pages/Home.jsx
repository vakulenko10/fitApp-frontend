import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="container mx-auto">
      <div className="bg-white shadow-lg rounded-lg p-10 w-full max-w-3xl mx-auto my-12">
        <h1 className="text-2xl font-bold text-center mb-6 mt-6">
          Daily Calorie Intake Calculator
        </h1>
        <p className="text-center mb-6">
          Feel free to enter your information below in the Daily Calorie Intake
          calculator to receive your personal current daily calorie intake, and
          what your body needs to fuel itself during the day with your routine!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-wrap w-full md:w-auto justify-center gap-4 ">
          <div className="p-6 border rounded-lg flex flex-col items-center w-full">
            <p className="mb-4 text-lg font-medium text-center">
              What is your sex?
            </p>
            <div className="flex flex-wrap justify-center gap-4 w-full">
              <button className="w-full md:w-auto px-6 py-2 border rounded-md hover:bg-green-200">
                Male
              </button>
              <button className="w-full md:w-auto px-6 py-2 border rounded-md hover:bg-green-200">
                Female
              </button>
            </div>
          </div>

          <div className="p-6 border rounded-lg flex flex-col items-center">
            <p className="mb-4 text-lg font-medium">How old are you?</p>
            <input
              type="number"
              className="w-24 border p-2 rounded-md text-center justify-center"
              defaultValue="21"
            />
          </div>

          <div className="p-6 border rounded-lg flex flex-col items-center">
            <p className="mb-4 text-lg font-medium">How tall are you?</p>
            <div className="flex items-center gap-2">
              <input
                type="number"
                className="w-24 border p-2 rounded-md text-center"
                defaultValue="171"
              />
              <span className="text-gray-600">cm</span>
            </div>
          </div>

          <div className="p-6 border rounded-lg flex flex-col items-center">
            <p className="mb-4 text-lg font-medium">How much do you weigh?</p>
            <div className="flex items-center gap-2">
              <input
                type="number"
                className="w-24 border p-2 rounded-md text-center"
                defaultValue="55"
              />
              <span className="">kg</span>
            </div>
          </div>
        </div>

        {/* Блок активности */}
        <div className="p-6 border rounded-lg flex flex-col items-center mt-6 w-full">
          <p className="mb-4 text-lg font-medium text-center">
            How active are you on a daily basis?
          </p>
          <div className="flex flex-wrap justify-center gap-4 w-full">
            <button className="w-full md:w-auto px-6 py-2 border rounded-md hover:bg-green-200">
              Moderately
            </button>
            <button className="w-full md:w-auto px-6 py-2 border rounded-md hover:bg-green-200">
              Lightly
            </button>
            <button className="w-full md:w-auto px-6 py-2 border rounded-md hover:bg-green-200">
              Active
            </button>
            <button className="w-full md:w-auto px-6 py-2 border rounded-md hover:bg-green-200">
              Very Active
            </button>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Button variant={"submit"} size={"lg"} className="w-full">
            Calculate
          </Button>
        </div>
      </div>
    </div>
  );
}
