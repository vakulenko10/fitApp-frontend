import React, { useEffect, useState } from 'react'
import { getMealPlanHistory } from "@/lib/mealplan";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AuthData } from '@/components/auth/AuthWrapper';
import Container from '@/components/Container';
const MealPlanHistory = () => {
     const { user, token } = AuthData();
    const [loading, setLoading] = useState(true);
    const [mealPlanHistory, setMealPlanHistory] = useState();
      useEffect(() => {
        const fetchMealPlanHistory = async () => {
          try {
            setLoading(true);
            const mealHistory = await getMealPlanHistory(token);
            console.log("mealHistory:", mealHistory.mealPlans);
            setMealPlanHistory(mealHistory.mealPlans);
          } catch (error) {
            console.error("Error fetching meal plan history:", error);
          } finally {
            setLoading(false);
          }
        };
    
        if (token) fetchMealPlanHistory();
      }, [token]);
      
  if (loading) {
    return <Container><div>Loading...</div></Container>;
  }

  return (
    <div className="bg-primary shadow-lg flex flex-col rounded-lg px-4">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
    {mealPlanHistory?.length > 0 ? (
      mealPlanHistory.map((plan, index) => (
        <div
          key={plan.id}
          className="bg-secondary text-white shadow-lg rounded-lg"
        >
          <div>
            <div className="text-lg font-bold">
              {`Meal Plan ${index + 1} (${plan.calorieIntake} kcal)`}
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-300">
              <strong>Included Products:</strong>{" "}
              {JSON.parse(plan.includedProducts).join(", ")}
            </p>
            <p className="mt-2 text-gray-300">
              {plan.generatedText.length > 100
                ? `${plan.generatedText.substring(0, 100)}...`
                : plan.generatedText}
            </p>
            {plan.generatedText.length > 100 && (
              <Button variant="ghost" className="text-sm mt-2">
                Show More
              </Button>
            )}
          </div>
        </div>
      ))
    ) : (
      <p className="text-gray-300">No meal plans found.</p>
    )}
  </div>
  </div>
  )
}

export default MealPlanHistory