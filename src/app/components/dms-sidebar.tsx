import { useState } from 'react';
import { 
  LayoutDashboard, 
  Car, 
  Users, 
  ClipboardList, 
  Wrench, 
  BarChart3, 
  Settings, 
  Shield,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { cn } from './ui/utils';
import logoImage from 'figma:asset/2b58bc6d0712b0fa161cf044a4ff2a46f2f08b76.png';

interface DMSSidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'warranty', label: 'Extended Warranty', icon: Shield },
  { id: 'inventory', label: 'Inventory', icon: Car },
  { id: 'leads', label: 'Leads', icon: Users },
  { id: 'sales', label: 'Sales', icon: ClipboardList },
  { id: 'service', label: 'Service', icon: Wrench },
  { id: 'reports', label: 'Reports', icon: BarChart3 },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export function DMSSidebar({ collapsed, onToggle, activeSection, onSectionChange }: DMSSidebarProps) {
  return (
    <div 
      className={cn(
        "h-screen bg-black text-white flex flex-col transition-all duration-300 ease-in-out",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Logo Section */}
      <div className="h-16 flex items-center justify-center border-b border-gray-800 px-4">
        {!collapsed ? (
          <img src={logoImage} alt="Maruti Suzuki" className="h-12 w-auto" />
        ) : (
          <div className="w-8 h-8 bg-[#3E378F] rounded flex items-center justify-center text-white">
            MS
          </div>
        )}
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 px-2 py-6 overflow-y-auto">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            
            return (
              <li key={item.id}>
                <button
                  onClick={() => onSectionChange(item.id)}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200",
                    isActive 
                      ? "bg-[#3E378F] text-white" 
                      : "text-gray-300 hover:bg-gray-900 hover:text-white"
                  )}
                  title={collapsed ? item.label : undefined}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  {!collapsed && (
                    <span className="truncate">{item.label}</span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Collapse Toggle Button */}
      <div className="p-4 border-t border-gray-800">
        <button
          onClick={onToggle}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-gray-300 hover:bg-gray-900 hover:text-white transition-colors"
        >
          {collapsed ? (
            <ChevronRight className="w-5 h-5" />
          ) : (
            <>
              <ChevronLeft className="w-5 h-5" />
              <span>Collapse</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}