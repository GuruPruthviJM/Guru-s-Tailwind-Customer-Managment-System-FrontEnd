import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const MyBarChart = ({ data, attribute, color, widthVal="90%" }) => {
  return (
    <ResponsiveContainer width={widthVal} height={300}>
      <BarChart
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey={attribute} fill={color} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default MyBarChart;
