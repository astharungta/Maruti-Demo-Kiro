import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface DashboardFiltersProps {
  className?: string;
}

export function DashboardFilters({ className }: DashboardFiltersProps) {
  return (
    <div className={`flex flex-col sm:flex-row gap-4 ${className}`}>
      <div className="w-[200px]">
        <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">
          Country / Region
        </label>
        <Select defaultValue="all">
            <SelectTrigger>
                <SelectValue placeholder="Select Country" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="all">All Regions</SelectItem>
                <SelectItem value="us">United States</SelectItem>
                <SelectItem value="uk">United Kingdom</SelectItem>
                <SelectItem value="de">Germany</SelectItem>
                <SelectItem value="jp">Japan</SelectItem>
                <SelectItem value="cn">China</SelectItem>
            </SelectContent>
        </Select>
      </div>
      
      <div className="w-[240px]">
        <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">
          Product Hierarchy
        </label>
        <Select defaultValue="all">
            <SelectTrigger>
                <SelectValue placeholder="Product Category" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="electronics">Electronics</SelectItem>
                <SelectItem value="computing">Computing & Laptops</SelectItem>
                <SelectItem value="phones">Smartphones & Accessories</SelectItem>
                <SelectItem value="home">Home & Garden</SelectItem>
                <SelectItem value="apparel">Apparel</SelectItem>
                <SelectItem value="automotive">Automotive & Industrial</SelectItem>
            </SelectContent>
        </Select>
      </div>
    </div>
  )
}
