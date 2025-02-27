import React from 'react';
import {
  PieChart,
  Pie,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell
} from 'recharts';

const MyPieChart4 = ({ data, attribute, widthVal = "90%" }) => {
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#d70071', '#af4bd4'];

  return (
    <ResponsiveContainer width={widthVal} height={300}>
      <PieChart>
        <Pie
          data={data}
          dataKey={attribute}
          cx="50%"
          cy="50%"
          outerRadius={100}
          label
        >
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={COLORS[index % COLORS.length]} 
            />
          ))}
        </Pie>
        <Tooltip />
        {/* <Legend /> */}
      </PieChart>
    </ResponsiveContainer>
  );
};

export default MyPieChart4;
