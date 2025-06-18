'use client';

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function BTCPriceChart() {
  // Sample data - in a real app, this would come from an API
  const data = [
    { date: '2024-01-01', price: 42000 },
    { date: '2024-01-02', price: 42500 },
    { date: '2024-01-03', price: 43500 },
    { date: '2024-01-04', price: 44500 },
    { date: '2024-01-05', price: 46500 },
  ];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <defs>
          <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#FC7E10" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#FC7E10" stopOpacity={0.1}/>
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#2b2b2b" />
        <XAxis 
          dataKey="date" 
          stroke="#d1d4dc"
          tick={{ fill: '#d1d4dc' }}
        />
        <YAxis 
          stroke="#d1d4dc"
          tick={{ fill: '#d1d4dc' }}
          tickFormatter={(value) => `$${value.toLocaleString()}`}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: '#2b2b2b',
            border: 'none',
            borderRadius: '4px',
            color: '#d1d4dc',
          }}
          formatter={(value) => [`$${Number(value).toLocaleString()}`, 'Price']}
          labelStyle={{ color: '#d1d4dc' }}
        />
        <Area
          type="monotone"
          dataKey="price"
          stroke="#FC7E10"
          fillOpacity={1}
          fill="url(#colorPrice)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
} 