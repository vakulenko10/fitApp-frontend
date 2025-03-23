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
      <div className="bg-primary shadow-lg p-6 rounded-lg overflow-x-auto">
        <h2 className="text-2xl font-bold text-primary-foreground mb-6">Meal Plan History</h2>

        <ScrollArea className="h-[400px] overflow-y-auto rounded-sm">
          <table className="w-full min-w-max text-sm text-left text-primary-foreground">
            <thead className="bg-secondary text-secondary-foreground">
              <tr>
                <th className="px-4 py-2 md:px-6 md:py-3"></th>
                <th className="px-4 py-2 md:px-6 md:py-3">Creation date</th>
                <th className="px-4 py-2 md:px-6 md:py-3">Calorie Intake</th>
                <th className="px-4 py-2 md:px-6 md:py-3">Included Products</th>
                
              </tr>
            </thead>
            <tbody>
              {mealPlanHistory?.length > 0 ? (
                mealPlanHistory.map((plan, index) => (
                  <tr key={plan.id} className="group bg-background border-b text-secondary italic hover:bg-background/50">
                     <td className="px-4 py-2 md:px-6 md:py-4">
                      <Drawer>
                        <DrawerTrigger>
                          <Button variant="accent" className={'group-hover:bg-secondary hover:bg-secondary/80'} size="sm">View Details</Button>
                        </DrawerTrigger>
                        <DrawerContent>
                          <DrawerHeader>
                            <DrawerTitle className={'flex justify-between items-baseline'}>Meal Plan Details
                            <h3 className='text-primary-foreground/80 px-0'>{new Date(plan.createdAt).toLocaleDateString()}</h3>
                            <h3 className='text-primary-foreground/80 px-0'>{plan.calorieIntake}kcal</h3>
                            </DrawerTitle>
                            
                            <DrawerDescription className={'m-0 py-0'}>
                             <p><strong>Generated Text:</strong></p>
                              <ScrollArea className={'h-[40vh]'}>
                              
                                <div className="text-sm text-muted-foreground h-full overflow-y-auto">
                                  {plan.generatedText}
                                </div>
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
                    <td className="px-4 py-2 md:px-6 md:py-4">{new Date(plan.createdAt).toLocaleDateString()}</td>
                    <td className="px-4 py-2 md:px-6 md:py-4">{plan.calorieIntake} kcal</td>
                    <td className="px-4 py-2 md:px-6 md:py-4 truncate max-w-[150px] md:max-w-none">
                      {JSON.parse(plan.includedProducts).join(", ")}
                    </td>
                   
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="px-4 py-2 md:px-6 md:py-4 text-center text-muted-foreground">
                    No meal plans found.
                  </td>
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
