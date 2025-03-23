import React, { useEffect, useState } from 'react'
import { getWeightHistory, updateWeight } from "@/lib/profile";
import LineChartComponent from "@/components/LineChart";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AuthData } from '@/components/auth/AuthWrapper';
import Container from '@/components/Container';
function GridItem({ children, className}) {
   
  return (
    <div
      className={`${className} w-full flex flex-col items-center justify-center p-4 border-0 rounded-xl h-[400px]`}
    >
      {children}
    </div>
  );
}
const UserCharts = ({setWeightHistory, weightHistory}) => {
    const [loading, setLoading] = useState(true);
     const { user, token } = AuthData();
      
  
    const fetchWeightHistory = async () => {
      try {
        const response = await getWeightHistory(token);
        setWeightHistory(response);
      } catch (error) {
        console.error("Error fetching weight history:", error);
      } finally {
        setLoading(false);
      }
    };
  
    useEffect(() => {
      if (token) fetchWeightHistory();
    }, [token]);
    
  if (loading) {
    return <Container><div>Loading...</div></Container>;
  }

  return (
    <div className="bg-primary shadow-lg flex flex-col rounded-lg px-4">
    <div className="grid xl:grid-cols-2 lg:grid-cols-2 w-full gap-10 py-10">
          <GridItem className="border-2 border-tertiary text-black">
            <h1>Weight</h1>
            <LineChartComponent data={weightHistory} />
          </GridItem>
        </div>
        </div>
  )
}

export default UserCharts