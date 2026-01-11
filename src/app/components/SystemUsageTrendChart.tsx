import React, { useState } from 'react';
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

// Mock data for different time ranges
const dailyData = [
  { name: 'Mon', transactions: 1240 },
  { name: 'Tue', transactions: 1450 },
  { name: 'Wed', transactions: 1600 },
  { name: 'Thu', transactions: 1350 },
  { name: 'Fri', transactions: 1800 },
  { name: 'Sat', transactions: 900 },
  { name: 'Sun', transactions: 850 },
];

const weeklyData = [
  { name: 'Week 1', transactions: 8500 },
  { name: 'Week 2', transactions: 9200 },
  { name: 'Week 3', transactions: 8800 },
  { name: 'Week 4', transactions: 9500 },
];

const monthlyData = [
  { name: 'Jan', transactions: 35000 },
  { name: 'Feb', transactions: 38000 },
  { name: 'Mar', transactions: 42000 },
  { name: 'Apr', transactions: 40000 },
  { name: 'May', transactions: 45000 },
  { name: 'Jun', transactions: 48000 },
];

const quarterlyData = [
  { name: 'Q1', transactions: 115000 },
  { name: 'Q2', transactions: 133000 },
  { name: 'Q3', transactions: 125000 },
  { name: 'Q4', transactions: 140000 },
];

const yearlyData = [
  { name: '2022', transactions: 450000 },
  { name: '2023', transactions: 520000 },
  { name: '2024', transactions: 600000 },
];

export function SystemUsageTrendChart() {
  const [timeRange, setTimeRange] = useState('daily');

  const getData = () => {
    switch (timeRange) {
      case 'weekly': return weeklyData;
      case 'monthly': return monthlyData;
      case 'quarterly': return quarterlyData;
      case 'yearly': return yearlyData;
      case 'daily': 
      default: return dailyData;
    }
  };

  const currentData = getData();

  return (
    <Card className="col-span-7">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="space-y-1">
          <CardTitle>System Usage Trend</CardTitle>
          <CardDescription>Total transaction volume processed by the agent</CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[140px] h-8 text-xs">
            <SelectValue placeholder="Time Range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="daily">Daily</SelectItem>
            <SelectItem value="weekly">Weekly</SelectItem>
            <SelectItem value="monthly">Monthly</SelectItem>
            <SelectItem value="quarterly">Quarterly</SelectItem>
            <SelectItem value="yearly">Yearly</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="pl-2">
        <div className="h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={currentData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e5e5" />
              <XAxis 
                dataKey="name" 
                stroke="#888888" 
                fontSize={12} 
                tickLine={false} 
                axisLine={false} 
              />
              <YAxis 
                stroke="#888888" 
                fontSize={12} 
                tickLine={false} 
                axisLine={false} 
                tickFormatter={(value) => value >= 1000 ? `${(value / 1000).toFixed(1)}k` : value} 
              />
              <Tooltip 
                cursor={{ fill: 'transparent' }}
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              />
              <Bar 
                dataKey="transactions" 
                name="Transactions" 
                fill="#6366f1" 
                radius={[4, 4, 0, 0]} 
                barSize={40}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
