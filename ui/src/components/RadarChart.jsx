// Import React and necessary components from Recharts
import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

// Define data structure for the 5 categories
const data = [
  { category: 'Category 1', value: 100 },
  { category: 'Category 2', value: 75 },
  { category: 'Category 3', value: 120 },
  { category: 'Category 4', value: 90 },
  { category: 'Category 5', value: 55 },
];

const RadarChartSke = () => (
  <ResponsiveContainer width="100%" height={400}>
    <RadarChart data={data}>
      <PolarGrid />
      <PolarAngleAxis dataKey="category" />
      <PolarRadiusAxis />
      <Radar dataKey="value" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
    </RadarChart>
  </ResponsiveContainer>
);

export default RadarChartSke;
