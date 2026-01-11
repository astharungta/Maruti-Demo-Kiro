import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';

const data = [
  { name: '00:00', latency: 400, errors: 2 },
  { name: '04:00', latency: 300, errors: 1 },
  { name: '08:00', latency: 550, errors: 5 },
  { name: '12:00', latency: 450, errors: 3 },
  { name: '16:00', latency: 380, errors: 2 },
  { name: '20:00', latency: 410, errors: 1 },
  { name: '23:59', latency: 320, errors: 0 },
];

export function AgentPerformanceChart() {
  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>Agent Performance & Latency</CardTitle>
        <CardDescription>
          Average extraction latency (ms) vs Error count per 4-hour block
        </CardDescription>
      </CardHeader>
      <CardContent className="pl-2">
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e5e5" />
              <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis yAxisId="left" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis yAxisId="right" orientation="right" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip 
                cursor={{fill: 'transparent'}}
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              />
              <Legend />
              <Bar yAxisId="left" dataKey="latency" name="Avg Latency (ms)" fill="#8884d8" radius={[4, 4, 0, 0]} barSize={30} />
              <Bar yAxisId="right" dataKey="errors" name="Error Count" fill="#ff8042" radius={[4, 4, 0, 0]} barSize={30} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
