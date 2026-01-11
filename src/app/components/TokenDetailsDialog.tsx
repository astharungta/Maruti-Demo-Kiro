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

interface TokenDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const agentTokenData = [
  {
    agent: "Email Ingestion Agent",
    model: "GPT-4o-mini",
    inputTokens: "1.2M",
    outputTokens: "0.4M",
    totalTokens: "1.6M",
    cost: "$12.40",
    status: "Active"
  },
  {
    agent: "PDF Extraction Agent",
    model: "GPT-4o",
    inputTokens: "8.5M",
    outputTokens: "2.1M",
    totalTokens: "10.6M",
    cost: "$345.80",
    status: "Active"
  },
  {
    agent: "Validation Agent",
    model: "GPT-4o-mini",
    inputTokens: "3.2M",
    outputTokens: "1.1M",
    totalTokens: "4.3M",
    cost: "$45.12",
    status: "Active"
  },
  {
    agent: "SAP Posting Agent",
    model: "GPT-3.5-Turbo",
    inputTokens: "2.8M",
    outputTokens: "0.9M",
    totalTokens: "3.7M",
    cost: "$48.80",
    status: "Idle"
  }
];

export function TokenDetailsDialog({ open, onOpenChange }: TokenDetailsDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[900px]">
        <DialogHeader>
          <DialogTitle>Token Usage Breakdown</DialogTitle>
          <DialogDescription>
            Detailed view of token consumption and costs per agent for the current billing cycle.
          </DialogDescription>
        </DialogHeader>
        
        <div className="mt-4 border rounded-md max-h-[60vh] overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Agent Name</TableHead>
                <TableHead>Model</TableHead>
                <TableHead>Input Tokens</TableHead>
                <TableHead>Output Tokens</TableHead>
                <TableHead>Total Cost</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {agentTokenData.map((item) => (
                <TableRow key={item.agent}>
                  <TableCell className="font-medium">{item.agent}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="font-mono text-xs">
                        {item.model}
                    </Badge>
                  </TableCell>
                  <TableCell>{item.inputTokens}</TableCell>
                  <TableCell>{item.outputTokens}</TableCell>
                  <TableCell className="font-bold text-green-600">{item.cost}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                        <span className={`h-2 w-2 rounded-full ${item.status === 'Active' ? 'bg-green-500 animate-pulse' : 'bg-slate-300'}`} />
                        {item.status}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              <TableRow className="bg-muted/50 font-medium">
                <TableCell colSpan={4}>Total Estimated Cost</TableCell>
                <TableCell className="font-bold text-green-700">$452.12</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </DialogContent>
    </Dialog>
  );
}
