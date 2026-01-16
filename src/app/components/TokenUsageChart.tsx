import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';

const data = [
  { name: 'Mon', tokens: 12000 },
  { name: 'Tue', tokens: 19000 },
  { name: 'Wed', tokens: 15000 },
  { name: 'Thu', tokens: 22000 },
  { name: 'Fri', tokens: 28000 },
  { name: 'Sat', tokens: 10000 },
  { name: 'Sun', tokens: 8000 },
];

export function TokenUsageChart() {
  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>LLM Token Usage</CardTitle>
        <CardDescription>Daily token consumption by Agentic Layer</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e5e5" />
              <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip 
                 contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              />
              <Line type="monotone" dataKey="tokens" stroke="#8884d8" strokeWidth={2} dot={{r: 4}} activeDot={{r: 8}} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
