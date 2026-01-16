import React, { useState } from 'react';
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

const dailyData = [
  { name: 'Mon', volume: 640 },
  { name: 'Tue', volume: 439 },
  { name: 'Wed', volume: 1180 },
  { name: 'Thu', volume: 668 },
  { name: 'Fri', volume: 669 },
  { name: 'Sat', volume: 619 },
  { name: 'Sun', volume: 779 },
];

const weeklyData = [
  { name: 'Week 1', volume: 4200 },
  { name: 'Week 2', volume: 3800 },
  { name: 'Week 3', volume: 5100 },
  { name: 'Week 4', volume: 4900 },
];

const monthlyData = [
  { name: 'Jan', volume: 18400 },
  { name: 'Feb', volume: 19200 },
  { name: 'Mar', volume: 22100 },
  { name: 'Apr', volume: 21500 },
  { name: 'May', volume: 23000 },
  { name: 'Jun', volume: 24500 },
  { name: 'Jul', volume: 23800 },
  { name: 'Aug', volume: 25100 },
  { name: 'Sep', volume: 24900 },
  { name: 'Oct', volume: 26200 },
  { name: 'Nov', volume: 27500 },
  { name: 'Dec', volume: 29100 },
];

const quarterlyData = [
  { name: 'Q1', volume: 59700 },
  { name: 'Q2', volume: 69000 },
  { name: 'Q3', volume: 73800 },
  { name: 'Q4', volume: 82800 },
];

const yearlyData = [
  { name: '2020', volume: 150000 },
  { name: '2021', volume: 180000 },
  { name: '2022', volume: 220000 },
  { name: '2023', volume: 260000 },
  { name: '2024', volume: 285000 },
];

export function OrderVolumeChart() {
  const [timeframe, setTimeframe] = useState('daily');

  const getData = () => {
    switch(timeframe) {
        case 'daily': return dailyData;
        case 'weekly': return weeklyData;
        case 'monthly': return monthlyData;
        case 'quarterly': return quarterlyData;
        case 'yearly': return yearlyData;
        default: return dailyData;
    }
  };

  const getLabel = () => {
     switch(timeframe) {
        case 'daily': return 'Daily';
        case 'weekly': return 'Weekly';
        case 'monthly': return 'Monthly';
        case 'quarterly': return 'Quarterly';
        case 'yearly': return 'Yearly';
        default: return 'Daily';
    }
  }

  return (
    <Card className="col-span-4">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="space-y-1">
          <CardTitle>Order Volume Trend</CardTitle>
          <CardDescription>
            Total order volume over time ({getLabel()})
          </CardDescription>
        </div>
        <Select value={timeframe} onValueChange={setTimeframe}>
            <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Select timeframe" />
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
      <CardContent className="pl-2 pt-4">
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={getData()}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorVolume" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e5e5" />
              <Tooltip 
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                formatter={(value: number) => [value.toLocaleString(), 'Orders']}
              />
              <Area type="monotone" dataKey="volume" name="Total Volume" stroke="#3b82f6" fillOpacity={1} fill="url(#colorVolume)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
