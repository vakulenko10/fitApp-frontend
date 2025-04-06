import React, { useEffect, useState } from 'react'
import { getWeightHistory } from "@/lib/profile";
import LineChartComponent from "./LineChart";
import { AuthData } from "@/hooks/AuthData";
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
    <div className=" w-full gap-10">
          <div className='flex flex-col justify-center items-center'>
            <h1 className='font-semibold text-lg m-0 lg:text-4xl flex justify-center sm:justify-start'>Weight</h1>
            <LineChartComponent data={weightHistory} />
            </div>
        </div>
        </div>
  )
}

export default UserCharts