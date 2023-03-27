import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine, Label } from 'recharts';

const data = [
  { category: 'Categoria 1', value: 20 },
  { category: 'Categoria 2', value: 35 },
  { category: 'Categoria 3', value: 40 },
  { category: 'Categoria 4', value: 10 },
  { category: 'Categoria 5', value: 15 }
];

const BarChartComponent = () => {
  // Calcular la distribución de los valores
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
