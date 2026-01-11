import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { FileText, Mail, AlertCircle } from "lucide-react";

interface FailedValidationsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const failedOrders = [
  {
    id: "PO-9921",
    source: "Email",
    customer: "Acme Corp",
    amount: "$12,450.00",
    error: "Customer Credit Limit Exceeded",
    time: "10:46 AM",
    status: "Failed"
  },
  {
    id: "AMZ-7782",
    source: "Amazon",
    customer: "TechStart Inc",
    amount: "$2,100.00",
    error: "Invalid SKU: XJ-900",
    time: "10:32 AM",
    status: "Failed"
  },
  {
    id: "PO-9922",
    source: "Email",
    customer: "Global Logistics",
    amount: "$45,200.00",
    error: "Missing Billing Address",
    time: "09:15 AM",
    status: "Failed"
  },
  {
    id: "AMZ-7789",
    source: "Amazon",
    customer: "Unknown",
    amount: "$150.00",
    error: "Customer ID Match Failed",
    time: "08:45 AM",
    status: "Failed"
  },
  {
    id: "PO-9918",
    source: "Email",
    customer: "Beta Industries",
    amount: "$8,900.00",
    error: "Duplicate PO Number detected",
    time: "Yesterday, 4:55 PM",
    status: "Failed"
  }
];

export function FailedValidationsDialog({ open, onOpenChange }: FailedValidationsDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[900px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-red-600">
            <AlertCircle className="h-5 w-5" />
            Failed Validations
          </DialogTitle>
          <DialogDescription>
            List of recent orders that failed validation checks and require manual attention.
          </DialogDescription>
        </DialogHeader>
        
        <div className="mt-4 border rounded-md max-h-[60vh] overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Source</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead className="w-[30%]">Error Reason</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {failedOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                        {order.source === 'Email' ? <Mail className="h-4 w-4 text-blue-500" /> : <FileText className="h-4 w-4 text-orange-500" />}
                        {order.source}
                    </div>
                  </TableCell>
                  <TableCell>{order.customer}</TableCell>
                  <TableCell>{order.amount}</TableCell>
                  <TableCell>
                    <Badge variant="destructive" className="font-normal">
                        {order.error}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground text-sm">{order.time}</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm" className="h-8">Review</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </DialogContent>
    </Dialog>
  );
}
