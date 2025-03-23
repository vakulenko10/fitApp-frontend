import React, { useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Button } from './ui/button';

const LineChartComponent = ({ data }) => {
  const [timeScale, setTimeScale] = useState('day'); // Default scale is daily
  
  // Prepare the data for day, month, or year scale
  const prepareData = (scale) => {
    // Sort and map data to correct format
    const chartData = data.history
      .map((entry) => ({
        name: new Date(entry.recordedAt).toLocaleDateString(),
        weight: parseFloat(entry.weight),
      }))
      .sort((a, b) => new Date(a.name) - new Date(b.name));

    let startDate;
    let endDate;
    
    // Calculate the range based on selected scale
    switch (scale) {
      case 'month':
        startDate = new Date();
        startDate.setMonth(startDate.getMonth() - 1);
        endDate = new Date();
        break;
      case 'year':
        startDate = new Date();
        startDate.setFullYear(startDate.getFullYear() - 1);
        endDate = new Date();
        break;
      default:
        startDate = new Date();
        startDate.setDate(startDate.getDate() - 30); // Default to last 30 days
        endDate = new Date();
        break;
    }

    // Fill in missing dates
    const dates = [];
    for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
      dates.push(new Date(d).toLocaleDateString());
    }

    // Fill missing data
    const filledData = dates.map((date) => {
      const existingData = chartData.find((entry) => entry.name === date);
      return {
        name: date,
        weight: existingData ? existingData.weight : null, // Null for missing data
      };
    });

    return filledData;
  };

  // Set chart data based on time scale
  const chartData = prepareData(timeScale);

  return (
    <div className='w-full relative flex flex-wrap'>
      {/* Buttons to switch between scales */}
      <div className="mb-4 w-full flex justify-center gap-2">
        <Button onClick={() => setTimeScale('day')} variant={`${timeScale=='day'?'default':'accent'}`}>Daily</Button>
        <Button onClick={() => setTimeScale('month')} variant={`${timeScale=='month'?'default':'accent'}`}>Monthly</Button>
        <Button onClick={() => setTimeScale('year')} variant={`${timeScale=='year'?'default':'accent'}`}>Yearly</Button>
      </div>

      <ResponsiveContainer width="100%" height={300} className={'p-5'}>
        <LineChart
          data={chartData}
          className='m-0'
        >
          <CartesianGrid strokeDasharray="2 2" />
          <XAxis dataKey="name" className='text-primary-foreground'/>
          <YAxis domain={[(dataMin) => Math.floor(dataMin * 1.001), (dataMax) => Math.ceil(dataMax * 1.001)]} name='kg'  />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Line type="monotone" dataKey="weight" stroke="#82ad0c" className='' />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-2 bg-popover shadow-xl flex flex-col gap-4 rounded-md">
        <p className="text-medium text-lg text-tertiary">{label}</p>
        <h5 className=" text-secondary">
          weight: {payload[0].value} kg
        </h5>
      </div>
    );
  }
  return null;
};

export default LineChartComponent;
