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
    <div className='w-full'>
      {/* Buttons to switch between scales */}
      <div className="mb-4">
        <Button onClick={() => setTimeScale('day')}>Daily</Button>
        <Button onClick={() => setTimeScale('month')}>Monthly</Button>
        <Button onClick={() => setTimeScale('year')}>Yearly</Button>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={chartData}
          margin={{ right: 30 }}
        >
          <CartesianGrid strokeDasharray="3 3"  className='fill-white'/>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Line type="monotone" dataKey="weight" stroke="#000" className='' />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-4 bg-popover shadow-2xl flex flex-col gap-4 rounded-md">
        <p className="text-medium text-lg">{label}</p>
        <p className="text-sm text-secondary">
          weight: <span className="ml-2">{payload[0].value} kg</span>
        </p>
      </div>
    );
  }
  return null;
};

export default LineChartComponent;
