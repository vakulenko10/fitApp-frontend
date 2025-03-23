import React, { useEffect, useState } from 'react';
import { getMealPlanHistory } from "@/lib/mealplan";
import { Button } from "@/components/ui/button";
import { AuthData } from '@/components/auth/AuthWrapper';
import Container from '@/components/Container';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Drawer, DrawerClose, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle, DrawerDescription, DrawerTrigger } from "@/components/ui/drawer";

const MealPlanHistory = () => {
  const { user, token } = AuthData();
  const [loading, setLoading] = useState(true);
  const [mealPlanHistory, setMealPlanHistory] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);

  useEffect(() => {
    const fetchMealPlanHistory = async () => {
      try {
        setLoading(true);
        const mealHistory = await getMealPlanHistory(token);
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
    <Container>
      <div className="bg-primary shadow-lg p-6 rounded-lg">
        <h2 className="text-2xl font-bold text-primary-foreground mb-6">Meal Plan History</h2>

        <ScrollArea className="h-[400px] overflow-y-auto">
          <table className="min-w-full text-sm text-left text-primary-foreground">
            <thead className="bg-secondary text-white">
              <tr>
                <th className="px-6 py-3">Meal Plan</th>
                <th className="px-6 py-3">Calorie Intake</th>
                <th className="px-6 py-3">Included Products</th>
                <th className="px-6 py-3">Details</th>
              </tr>
            </thead>
            <tbody>
              {mealPlanHistory?.length > 0 ? (
                mealPlanHistory.map((plan, index) => (
                  <tr key={plan.id} className="bg-background border-b">
                    <td className="px-6 py-4">{new Date(plan.createdAt).toLocaleDateString()}</td>
                    <td className="px-6 py-4">{plan.calorieIntake} kcal</td>
                    <td className="px-6 py-4">{JSON.parse(plan.includedProducts).join(", ")}</td>
                    <td className="px-6 py-4">
                      <Drawer className=" h-screen relative   ">
                        <DrawerTrigger >
                          <Button variant="ghost" size="sm">View Details</Button>
                        </DrawerTrigger>
                        <DrawerContent >
                          <DrawerHeader>
                            <DrawerTitle>Meal Plan Details</DrawerTitle>
                            <DrawerDescription className="">
                              <p><strong>Generated Text:</strong></p>
                              <ScrollArea className={'h-[40vh]'}>
                              <div
                                className="text-sm text-muted-foreground h-full overflow-y-auto"
                                // dangerouslySetInnerHTML={{ __html: plan.generatedText }}
                              >{plan.generatedText}</div>
                              </ScrollArea>
                            </DrawerDescription>
                          </DrawerHeader>
                          <DrawerFooter>
                            <DrawerClose>
                              <Button variant="outline" className="text-secondary hover:text-secondary/80">
                                Close
                              </Button>
                            </DrawerClose>
                          </DrawerFooter>
                        </DrawerContent>
                      </Drawer>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="px-6 py-4 text-center text-muted-foreground">No meal plans found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </ScrollArea>
      </div>
    </Container>
  );
};

export default MealPlanHistory;
