import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

// Data for Ingestion Type (Source)
const dataSourceAll = [
  { name: 'Amazon Portal', value: 65, color: '#0088FE' },
  { name: 'Email Ingestion', value: 35, color: '#00C49F' },
];

const dataSourceTechCorp = [
  { name: 'Amazon Portal', value: 80, color: '#0088FE' },
  { name: 'Email Ingestion', value: 20, color: '#00C49F' },
];

const dataSourceGlobalInd = [
  { name: 'Amazon Portal', value: 40, color: '#0088FE' },
  { name: 'Email Ingestion', value: 60, color: '#00C49F' },
];

// Data for Order Format
const dataFormatAll = [
  { name: 'PDF Attachment', value: 45, color: '#8884d8' },
  { name: 'Excel / CSV', value: 30, color: '#82ca9d' },
  { name: 'Email Body Text', value: 15, color: '#ffc658' },
  { name: 'Image in Body', value: 10, color: '#ff8042' },
];

const dataFormatTechCorp = [
  { name: 'PDF Attachment', value: 20, color: '#8884d8' },
  { name: 'Excel / CSV', value: 70, color: '#82ca9d' },
  { name: 'Email Body Text', value: 5, color: '#ffc658' },
  { name: 'Image in Body', value: 5, color: '#ff8042' },
];

const dataFormatGlobalInd = [
  { name: 'PDF Attachment', value: 60, color: '#8884d8' },
  { name: 'Excel / CSV', value: 10, color: '#82ca9d' },
  { name: 'Email Body Text', value: 20, color: '#ffc658' },
  { name: 'Image in Body', value: 10, color: '#ff8042' },
];

const COLORS_SOURCE = ['#0ea5e9', '#22c55e'];
const COLORS_FORMAT = ['#8b5cf6', '#10b981', '#f59e0b', '#f97316'];

export function OrderSourceChart() {
  const [customer, setCustomer] = useState('all');
  const [viewType, setViewType] = useState('source'); // 'source' or 'format'

  const getDataSource = () => {
    switch (customer) {
      case 'tech_corp': return dataSourceTechCorp;
      case 'global_ind': return dataSourceGlobalInd;
      default: return dataSourceAll;
    }
  };

  const getDataFormat = () => {
    switch (customer) {
      case 'tech_corp': return dataFormatTechCorp;
      case 'global_ind': return dataFormatGlobalInd;
      default: return dataFormatAll;
    }
  };

  const currentData = viewType === 'source' ? getDataSource() : getDataFormat();
  const currentColors = viewType === 'source' ? COLORS_SOURCE : COLORS_FORMAT;

  return (
    <Card className="col-span-3">
      <CardHeader className="flex flex-col space-y-2 pb-2">
        <div className="flex flex-row items-center justify-between">
            <div className="space-y-1">
            <CardTitle>Order Analysis</CardTitle>
            <CardDescription>Breakdown by Source or Format</CardDescription>
            </div>
            {/* Customer Filter */}
            <Select value={customer} onValueChange={setCustomer}>
            <SelectTrigger className="w-[140px] h-8 text-xs">
                <SelectValue placeholder="Customer" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="all">All Customers</SelectItem>
                <SelectItem value="tech_corp">Tech Corp Inc.</SelectItem>
                <SelectItem value="global_ind">Global Industries</SelectItem>
            </SelectContent>
            </Select>
        </div>
        
        {/* View Type Filter (Source vs Format) */}
        <div className="flex justify-end">
             <Select value={viewType} onValueChange={setViewType}>
                <SelectTrigger className="w-[140px] h-8 text-xs">
                    <SelectValue placeholder="View By" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="source">Ingestion Source</SelectItem>
                    <SelectItem value="format">Order Format</SelectItem>
                </SelectContent>
            </Select>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={currentData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
              >
                {currentData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color || currentColors[index % currentColors.length]} />
                ))}
              </Pie>
              <Tooltip 
                 contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              />
              <Legend verticalAlign="bottom" height={36}/>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
