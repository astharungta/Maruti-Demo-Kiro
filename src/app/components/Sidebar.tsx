import React from 'react';
import { 
  LayoutDashboard, 
  Settings, 
  FileText, 
  ShoppingCart, 
  Bot, 
  LogOut,
  ChevronRight,
  Menu
} from 'lucide-react';
import { cn } from './ui/utils';
import { Button } from './ui/button';

interface SidebarProps {
  activeView: 'business' | 'admin';
  onChangeView: (view: 'business' | 'admin') => void;
  className?: string;
}

export function Sidebar({ activeView, onChangeView, className }: SidebarProps) {
  return (
    <div className={cn("pb-12 w-64 border-r bg-background h-screen flex flex-col", className)}>
      <div className="space-y-4 py-4 flex-1">
        <div className="px-4 py-2 flex items-center gap-2">
          <div className="bg-primary/10 p-2 rounded-lg">
             <LayoutDashboard className="h-6 w-6 text-primary" />
          </div>
          <h2 className="text-xl font-bold tracking-tight">ProcureAI</h2>
        </div>
        
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-xs font-semibold tracking-tight text-muted-foreground uppercase">
            Dashboards
          </h2>
          <div className="space-y-1">
            <Button 
              variant={activeView === 'business' ? 'secondary' : 'ghost'} 
              className="w-full justify-start"
              onClick={() => onChangeView('business')}
            >
              <ShoppingCart className="mr-2 h-4 w-4" />
              Business View
            </Button>
            <Button 
              variant={activeView === 'admin' ? 'secondary' : 'ghost'} 
              className="w-full justify-start"
              onClick={() => onChangeView('admin')}
            >
              <Bot className="mr-2 h-4 w-4" />
              Agent Observability
            </Button>
          </div>
        </div>
      </div>
      
      <div className="px-3 py-4 border-t">
        <Button variant="ghost" className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50">
          <LogOut className="mr-2 h-4 w-4" />
          Sign Out
        </Button>
      </div>
    </div>
  );
}
