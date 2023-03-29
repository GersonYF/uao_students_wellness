import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine, Label } from 'recharts';


const BarChartComponent = ({ questionaryStats }) => {
  // Calcular la distribución de los valores
  const data = Object.keys(questionaryStats).map((category, index) => {
    return { category, value: parseFloat(questionaryStats[category])*100 };
  });
  const total = data.reduce((sum, { value }) => sum + value, 0);
  const distribution = total / data.length;

  return (
    <BarChart
      width={500}
      height={300}
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="category" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="value" fill="#8884d8" />
      <ReferenceLine y={distribution}>
        <Label value={`Promedio: ${distribution}`} position="insideTop" />
      </ReferenceLine>
    </BarChart>
  );
};

export default BarChartComponent;
