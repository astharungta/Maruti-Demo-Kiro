import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import { Badge } from './ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { MoreHorizontal } from 'lucide-react';
import { Button } from './ui/button';

const recentOrders = [
  { id: 'ORD-7721', source: 'Amazon', customer: 'Acme Corp', amount: '$1,250.00', status: 'Posted to SAP', date: '2 mins ago' },
  { id: 'ORD-7720', source: 'Email', customer: 'Global Tech', amount: '$450.50', status: 'Agent Validated', date: '5 mins ago' },
  { id: 'ORD-7719', source: 'Email', customer: 'Unknown', amount: '-', status: 'Rejected', date: '12 mins ago' },
  { id: 'ORD-7718', source: 'Amazon', customer: 'Wayne Ent', amount: '$5,000.00', status: 'Processing', date: '15 mins ago' },
  { id: 'ORD-7717', source: 'Amazon', customer: 'Stark Ind', amount: '$2,300.00', status: 'Posted to SAP', date: '22 mins ago' },
  { id: 'ORD-7716', source: 'Email', customer: 'Cyberdyne', amount: '$850.00', status: 'Review Needed', date: '30 mins ago' },
];

function getStatusBadge(status: string) {
  switch (status) {
    case 'Posted to SAP':
      return <Badge className="bg-green-100 text-green-800 hover:bg-green-100 border-none">SAP Posted</Badge>;
    case 'Agent Validated':
      return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 border-none">Validated</Badge>;
    case 'Rejected':
      return <Badge className="bg-red-100 text-red-800 hover:bg-red-100 border-none">Rejected</Badge>;
    case 'Processing':
      return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100 border-none">Processing</Badge>;
    default:
      return <Badge variant="secondary">{status}</Badge>;
  }
}

export function RecentOrdersTable() {
  return (
    <Card className="col-span-7">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Recent Orders</CardTitle>
        <Button variant="outline" size="sm">View All</Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Source</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Time</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">{order.id}</TableCell>
                <TableCell>{order.source}</TableCell>
                <TableCell>{order.customer}</TableCell>
                <TableCell>{order.amount}</TableCell>
                <TableCell>{getStatusBadge(order.status)}</TableCell>
                <TableCell className="text-muted-foreground">{order.date}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
