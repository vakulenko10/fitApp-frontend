import React from "react";
import { Button } from "@/components/ui/button";

const Faq = () => {
  return (
    <div className="bg-green">
      <div className="max-w-5xl mx-auto p-6">
        <section className=" py-12">
          <div className="max-w-6xl mx-auto bg-white p-10 rounded-lg shadow-lg border border-gray-200 flex flex-col md:flex-row items-center gap-10">
            <div className="w-full md:w-1/2">
              <h1 className="text-4xl font-bold mb-6">Get Start Now</h1>
              <ul className="space-y-6">
                <li className="relative pl-4 border-l-4 border-green-500">
                  <strong className="text-mg">1. Control over nutrition</strong>
                  <p className="text-gray-600">
                    The calculator allows you to accurately track how many
                    calories you consume throughout the day, helping you better
                    understand your eating habits.
                  </p>
                </li>
                <li className="relative pl-4 border-l-4 border-green-500">
                  <strong className="text-mg">
                    2. Personalized recommendations
                  </strong>
                  <p className="text-gray-600">
                    Based on your age, weight, height, gender, and activity
                    level, the calculator provides personalized advice on how
                    many calories you need to reach your goals.
                  </p>
                </li>
                <li className="relative pl-4 border-l-4 border-green-500">
                  <strong className="text-mg">3. Easy to use</strong>
                  <p className="text-gray-600">
                    Most calorie calculators are available as smartphone apps or
                    online, making them easy to use anytime, anywhere.
                  </p>
                </li>
              </ul>
            </div>

            {/* Форма */}
            <div className="w-full md:w-1/2 bg-gray-100 shadow-lg p-8 rounded-xl">
              <form className="space-y-6">
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your name"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">
                    Email address
                  </label>
                  <input
                    type="email"
                    placeholder="name@gmail.com"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    placeholder="*********"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <Button variant={"submit"} size={"lg"} className="w-full">
                  Calculate
                </Button>
              </form>
            </div>
          </div>
        </section>

        {/* How it Works */}
        <section className="bg-white mt-10 p-8 rounded-lg shadow-md max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">How It Works</h2>
          <hr className="w-32 sm:w-40 md:w-52 lg:w-64 xl:w-80 border-t-2 border-green-500 mb-4 " />
          <p className="text-gray-700 text-mg">
            Our calculator is simple to use! Just input your age, weight,
            height, gender, and activity level, and you'll get personalized
            recommendations for your daily calorie intake. It helps you stay on
            track with your fitness goals!
          </p>
        </section>

        {/* FAQ */}
        <section className="bg-white mt-10 p-6 rounded-lg border">
          <h2 className="text-2xl font-bold mb-4">FAQ</h2>
          <hr className="w-32 sm:w-40 md:w-52 lg:w-64 xl:w-80 border-t-2 border-green-500 mb-4 " />
          <div className="space-y-4">
            <div>
              <strong>What is a calorie calculator?</strong>
              <p>
                A calorie calculator helps you estimate how many calories...
              </p>
            </div>
            <div>
              <strong>Is the calculator free?</strong>
              <p>Yes, our calorie calculator is completely free to use!</p>
            </div>
            <div>
              <strong>Can I track my progress?</strong>
              <p>Yes, you can log your daily calories...</p>
            </div>
          </div>
        </section>

        {/* User Testimonials */}
        <section className="bg-white mt-10 p-6 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">User Testimonials</h2>
          <hr className="w-32 sm:w-40 md:w-52 lg:w-64 xl:w-80 border-t-2 border-green-500 mb-4 " />
          <p className="italic">
            "This app helped me understand my eating habits..."
          </p>
          <p className="text-green-600">- Agnieszka J.</p>
          <p className="italic">
            "The personalized recommendations are exactly..."
          </p>
          <p className="text-green-600">- Szymon B.</p>
        </section>

        {/* About Us */}
        <section className="bg-white mt-10 p-6 rounded-lg border">
          <h2 className="text-2xl font-bold mb-4">About Us</h2>
          <hr className="w-32 sm:w-40 md:w-52 lg:w-64 xl:w-80 border-t-2 border-green-500 mb-4 " />
          <p>We are students.</p>
        </section>
      </div>
    </div>
  );
};

export default Faq;
