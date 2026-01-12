import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { LucideIcon } from 'lucide-react';
import { cn } from './ui/utils';

interface KpiCardProps {
  title: string;
  value: string | number;
  trend?: string;
  trendUp?: boolean; // true for up (green), false for down (red). If undefined, neutral.
  icon: LucideIcon;
  description?: string;
  className?: string;
  onClick?: () => void;
}

export function KpiCard({ title, value, trend, trendUp, icon: Icon, description, className, onClick }: KpiCardProps) {
  return (
    <Card 
      className={cn("overflow-hidden transition-all duration-200", onClick && "cursor-pointer hover:shadow-md active:scale-95", className)} 
      onClick={onClick}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {(trend || description) && (
          <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
            {trend && (
              <span className={cn(
                "font-medium",
                trendUp === true ? "text-green-600" : trendUp === false ? "text-red-600" : ""
              )}>
                {trend}
              </span>
            )}
            {description}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
