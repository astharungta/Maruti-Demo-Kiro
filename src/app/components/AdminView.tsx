import React, { useState } from 'react';
import { Activity, Server, Zap, AlertTriangle, CheckCheck, Users } from 'lucide-react';
import { KpiCard } from './KpiCard';
import { AgentPerformanceChart } from './AgentPerformanceChart';
import { TokenUsageChart } from './TokenUsageChart';
import { TokenDetailsDialog } from './TokenDetailsDialog';
import { FailedValidationsDialog } from './FailedValidationsDialog';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { ScrollArea } from './ui/scroll-area';
import { motion } from 'motion/react';

export function AdminView() {
  const [showTokenDetails, setShowTokenDetails] = useState(false);
  const [showFailedValidations, setShowFailedValidations] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <TokenDetailsDialog open={showTokenDetails} onOpenChange={setShowTokenDetails} />
      <FailedValidationsDialog open={showFailedValidations} onOpenChange={setShowFailedValidations} />

      {/* KPI Section */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <KpiCard 
          title="System Uptime" 
          value="99.98%" 
          icon={Server}
          trend="No incidents in 30 days"
          trendUp={true}
        />
        <KpiCard 
          title="Avg Extraction Time" 
          value="1.2s" 
          icon={Zap}
          trend="-0.3s improvement"
          trendUp={true}
        />
        <KpiCard 
          title="Token Cost (Est)" 
          value="$452.12" 
          icon={Activity}
          description="Click for breakdown"
          onClick={() => setShowTokenDetails(true)}
          className="hover:border-blue-500 hover:ring-1 hover:ring-blue-500"
        />
        <KpiCard 
          title="Straight Through Processing" 
          value="1,850" 
          icon={CheckCheck}
          trend="+12% vs last week"
          trendUp={true}
        />
         <KpiCard 
          title="Human In The Loop (HITL)" 
          value="142" 
          icon={Users}
          trend="-5% vs last week"
          trendUp={true} // Lower HITL is good
        />
        <KpiCard 
          title="Failed Validations" 
          value="23" 
          icon={AlertTriangle}
          trend="+2 since yesterday"
          trendUp={false}
          description="Click for details"
          onClick={() => setShowFailedValidations(true)}
          className="hover:border-red-500 hover:ring-1 hover:ring-red-500 cursor-pointer"
        />
      </div>

      {/* Charts Section */}
      <div className="grid gap-4 md:grid-cols-7">
        <AgentPerformanceChart />
        <TokenUsageChart />
      </div>
    </motion.div>
  );
}
