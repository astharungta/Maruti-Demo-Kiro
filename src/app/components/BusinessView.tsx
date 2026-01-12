import React from 'react';
import { DollarSign, CheckCircle, XCircle, ShoppingBag } from 'lucide-react';
import { KpiCard } from './KpiCard';
import { OrderVolumeChart } from './OrderVolumeChart';
import { OrderSourceChart } from './OrderSourceChart';
import { SystemUsageTrendChart } from './SystemUsageTrendChart';
import { RecentOrdersTable } from './RecentOrdersTable';
import { motion } from 'motion/react';

export function BusinessView() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* KPI Section */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <KpiCard 
          title="Total Revenue Impact" 
          value="$145,231.89" 
          icon={DollarSign}
          trend="+20.1% from last month"
          trendUp={true}
        />
        <KpiCard 
          title="Orders Processed" 
          value="+2350" 
          icon={ShoppingBag}
          trend="+180.1% from last month"
          trendUp={true}
        />
        <KpiCard 
          title="Auto-Accepted Rate" 
          value="94.2%" 
          icon={CheckCircle}
          trend="+4.3% efficiency gain"
          trendUp={true}
        />
        <KpiCard 
          title="Rejection Rate" 
          value="5.8%" 
          icon={XCircle}
          trend="-1.2% improvement"
          trendUp={true} // Lower rejection is usually good, so green
        />
      </div>

      {/* Charts Section */}
      <div className="grid gap-4 md:grid-cols-7">
        <OrderVolumeChart />
        <OrderSourceChart />
      </div>

      {/* Usage Trend Section */}
      <div className="grid gap-4 md:grid-cols-7">
        <SystemUsageTrendChart />
      </div>

      {/* Table Section */}
      <div className="grid gap-4 grid-cols-7">
        <RecentOrdersTable />
      </div>
    </motion.div>
  );
}
