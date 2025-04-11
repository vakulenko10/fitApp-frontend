import React from "react";
import Container from "@/components/Container";

const Faq = () => {
  const Section = ({ title, children }) => (
    <section className="mt-10 rounded-lg border bg-white p-6 shadow-md">
      <h2 className="mb-4 text-2xl font-bold">{title}</h2>
      <hr className="mb-4 w-32 border-t-2 border-green-500" />
      {children}
    </section>
  );

  return (
    <Container className="mx-auto flex justify-center p-0 md:p-8">
      <main className="max-w-5xl space-y-8">
        {/* Main Content Section */}
        <section className="rounded-lg border border-gray-200 bg-white shadow-lg">
          <div className="flex flex-col gap-8 p-6 md:p-10">
            {/* Benefits List */}
            <h1 className="text-3xl font-bold md:text-4xl">Get Started Now</h1>
            {[
              {
                title: "Control Over Nutrition",
                content:
                  "Our calculator helps you accurately track how many calories you consume throughout the day, giving you better insight into your eating habits.",
              },
              {
                title: "Personalized Recommendations",
                content:
                  "Based on your age, weight, height, gender, and activity level, we provide customized advice on how many calories you need to reach your goals.",
              },
              {
                title: "Easy to use",
                content:
                  "Whether you're on your phone or computer, our calculator is super simple to use — anytime, anywhere!",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="relative border-l-4 border-green-500 pl-4"
              >
                <strong className="text-lg">{item.title}</strong>
                <p className="mt-2 text-gray-600">{item.content}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Additional Sections */}
        <Section title="How It Works">
          <p className="text-gray-700">
            Our calculator is easy to use! Just enter your age, weight, height,
            gender, and activity level — and get personalized recommendations
            for your daily calorie intake. It helps you stay on track with your
            fitness and health goals!
          </p>
        </Section>

        <Section title="FAQ">
          <dl className="space-y-4">
            {[
              {
                question: "What is a calorie calculator?",
                answer:
                  "A calorie calculator helps you estimate how many calories your body needs to function based on your personal details and activity level.",
              },
              {
                question: "Is the calculator free?",
                answer: "Yes, our calorie calculator is completely free!",
              },
              {
                question: "Can I track my progress?",
                answer:
                  "Absolutely! You can log your daily calorie intake and monitor your progress over time to stay on track with your goals.",
              },
            ].map((item, index) => (
              <div key={index}>
                <dt><strong>{item.question}</strong></dt>
                <dd className="mt-1 ml-1 px-2 py-2 text-sm">{item.answer}</dd>
              </div>
            ))}
          </dl>
        </Section>

        <Section title="User Testimonials">
          {[
            {
              text: '"This app helped me understand my eating habits..."',
              author: "Agnieszka J.",
            },
            {
              text: '"The personalized recommendations are exactly..."',
              author: "Szymon B.",
            },
          ].map((testimonial, index) => (
            <div key={index} className="mb-4">
              <p className="italic">{testimonial.text}</p>
              <p className="text-green-600">- {testimonial.author}</p>
            </div>
          ))}
        </Section>

        <Section title="About Us">
          <p>
            We are students passionate about helping people eat healthier and
            live better.
          </p>
        </Section>
      </main>
    </Container>
  );
};

export default Faq;