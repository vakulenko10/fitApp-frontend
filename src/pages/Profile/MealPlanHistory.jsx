import React, { useEffect, useState } from "react";
import { getMealPlanHistory } from "@/lib/mealplan";
import { AuthData } from "@/hooks/AuthData";
import Container from "@/components/Container";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerTrigger,
} from "@/components/ui/drawer";

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
    return (
      <Container>
        <div>Loading...</div>
      </Container>
    );
  }

  return (
    <div className="bg-primary rounded-lg p-4 shadow-lg md:p-6">
      <h2 className="text-primary-foreground mb-4 text-xl font-bold md:text-2xl">
        Meal Plan History
      </h2>

      <div className="hidden md:block">
        <ScrollArea className="h-[400px] overflow-y-auto rounded-sm">
          <table className="text-primary-foreground w-full min-w-[50rem] text-left text-sm">
            <thead className="bg-secondary text-secondary-foreground">
              <tr>
                <th className="px-4 py-2"> </th>
                <th className="px-4 py-2">Creation date</th>
                <th className="px-4 py-2">Calorie Intake</th>
                <th className="px-4 py-2">Included Products</th>
              </tr>
            </thead>
            <tbody>
              {mealPlanHistory?.length > 0 ? (
                mealPlanHistory.map((plan) => (
                  <tr
                    key={plan.id}
                    className="group bg-background text-secondary hover:bg-background/50 border-b transition"
                  >
                    <td className="px-4 py-2">
                      <Drawer>
                        <DrawerTrigger className="bg-muted text-foreground hover:bg-muted/80 rounded-md px-3 py-1.5 text-sm font-medium transition-all">
                          View Details
                        </DrawerTrigger>
                        <DrawerContent>
                          <DrawerHeader>
                            <DrawerTitle className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                              Meal Plan Details
                              <div className="flex flex-col gap-2 md:flex-row md:gap-6">
                                <h5 className="text-primary-foreground/80">
                                  {new Date(
                                    plan.createdAt,
                                  ).toLocaleDateString()}
                                </h5>
                                <h5 className="text-primary-foreground/80">
                                  {plan.calorieIntake}kcal
                                </h5>
                              </div>
                            </DrawerTitle>

                            <DrawerDescription className="py-2">
                              <strong>Generated Text:</strong>
                            </DrawerDescription>

                            <ScrollArea className="h-[40vh]">
                              <div className="text-muted-foreground h-full overflow-y-auto text-sm">
                                {plan.generatedText}
                              </div>
                            </ScrollArea>
                          </DrawerHeader>
                          <DrawerFooter className="relative w-full items-center p-0 pb-2 text-center">
                            <DrawerClose className="bg-muted text-foreground hover:bg-muted/80 mx-auto mt-4 w-fit rounded-md px-4 py-1.5 text-sm transition-all">
                              Close
                            </DrawerClose>
                          </DrawerFooter>
                        </DrawerContent>
                      </Drawer>
                    </td>
                    <td className="px-4 py-2">
                      {new Date(plan.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-2">{plan.calorieIntake} kcal</td>
                    <td className="max-w-[150px] truncate px-4 py-2">
                      {JSON.parse(plan.includedProducts).join(", ")}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="text-muted-foreground px-4 py-4 text-center"
                  >
                    No meal plans found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </ScrollArea>
      </div>

      <div className="space-y-4 md:hidden">
        {mealPlanHistory?.length > 0 ? (
          mealPlanHistory.map((plan) => (
            <div
              key={plan.id}
              className="bg-background rounded-md p-4 shadow-sm"
            >
              <div className="text-muted-foreground mb-2 text-sm">
                {new Date(plan.createdAt).toLocaleDateString()}
              </div>
              <div className="text-secondary text-lg font-semibold">
                {plan.calorieIntake} kcal
              </div>
              <div className="text-foreground mt-1 truncate text-sm">
                {JSON.parse(plan.includedProducts).join(", ")}
              </div>
              <div className="mt-3">
                <Drawer>
                  <DrawerTrigger className="bg-muted text-foreground hover:bg-muted/80 rounded-md px-3 py-1.5 text-sm font-medium transition-all">
                    View Details
                  </DrawerTrigger>
                  <DrawerContent>
                    <DrawerHeader>
                      <DrawerTitle className="flex flex-col gap-2">
                        Meal Plan Details
                        <div className="text-primary-foreground/80 text-sm">
                          {new Date(plan.createdAt).toLocaleDateString()} -{" "}
                          {plan.calorieIntake} kcal
                        </div>
                      </DrawerTitle>
                      <DrawerDescription className="py-2">
                        <strong>Generated Text:</strong>
                      </DrawerDescription>
                      <ScrollArea className="h-[40vh]">
                        <div className="text-muted-foreground h-full overflow-y-auto text-sm">
                          {plan.generatedText}
                        </div>
                      </ScrollArea>
                    </DrawerHeader>
                    <DrawerFooter className="relative w-full items-center p-0 pb-2 text-center">
                      <DrawerClose className="bg-muted text-foreground hover:bg-muted/80 mx-auto mt-4 w-fit rounded-md px-4 py-1.5 text-sm transition-all">
                        Close
                      </DrawerClose>
                    </DrawerFooter>
                  </DrawerContent>
                </Drawer>
              </div>
            </div>
          ))
        ) : (
          <p className="text-muted-foreground text-center text-sm">
            No meal plans found.
          </p>
        )}
      </div>
    </div>
  );
};

export default MealPlanHistory;