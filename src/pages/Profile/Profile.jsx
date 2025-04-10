import React, { useEffect, useState } from "react";

import { AuthData } from "@/hooks/AuthData";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ProfileData from "./ProfileData";
import UserCharts from "./UserCharts";
import MealPlanHistory from "./MealPlanHistory";
import Container from "@/components/Container";

const Profile = () => {
  const { user, token } = AuthData();
  const [loading, setLoading] = useState(false);
  
  const [weightHistory, setWeightHistory] = useState();
  
  const [profileData, setProfileData] = useState({
    name: user.name || "",
    email: user.email || "",
    gender: user.gender || "",
    height: user.height || "",
    weight: user.weight || 0,
    age: user.age || "",
    currentCalorieIntake: user.currentCalorieIntake || 0
  });

  

 
  if (loading) {
    return <Container><div>Loading...</div></Container>;
  }

  return (
    <main>

      <Tabs defaultValue="profile" className="w-full ">
        <TabsList className={`w-full rounded-none p-5 bg-header`}>
          <TabsTrigger value="profile" className={`py-4 `}><h6>Your profile</h6></TabsTrigger>
          <TabsTrigger value="charts"  className={`py-4`}><h6>Charts</h6></TabsTrigger>
          <TabsTrigger value="mealplan history"  className={`py-4`}><h6>History</h6></TabsTrigger>
        </TabsList>
        <Container className={`sm:max-w-[30rem] md:max-w-[40rem] lg:max-w-[60rem] my-12`} >
          <TabsContent value="profile">
            <ProfileData profileData={profileData} setProfileData={setProfileData}/>
          </TabsContent>
          <TabsContent value="charts">
            <UserCharts setWeightHistory={setWeightHistory} weightHistory={weightHistory} />
          </TabsContent>
          <TabsContent value="mealplan history">
            <MealPlanHistory />
          </TabsContent>
        </Container>
      </Tabs>

    </main>
  );
};

export default Profile;