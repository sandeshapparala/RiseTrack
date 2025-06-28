'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { 
  Home, 
  Target, 
  Calendar, 
  Clock, 
  DollarSign, 
  Trophy,
  BookOpen,
  BarChart3,
  ChevronLeft,
  Plus
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useUIStore } from '@/lib/stores';

const navigation = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: Home,
    description: 'Overview & insights'
  },
  {
    name: 'Mission & Vision',
    href: '/mission',
    icon: Target,
    description: 'Life purpose & direction'
  },
  {
    name: 'Day Planner',
    href: '/planner',
    icon: Calendar,
    description: 'Daily task management'
  },
  {
    name: 'Time Tracker',
    href: '/time-tracker',
    icon: Clock,
    description: 'Smart time tracking'
  },
  {
    name: 'Earnings Tracker',
    href: '/earnings',
    icon: DollarSign,
    description: 'Income & financial goals'
  },
  {
    name: 'Goals Tracker',
    href: '/goals',
    icon: Trophy,
    description: 'Long-term objectives'
  },
  {
    name: 'Journal & Reflection',
    href: '/journal',
    icon: BookOpen,
    description: 'Daily insights & growth'
  },
  {
    name: 'Progress Widgets',
    href: '/progress',
    icon: BarChart3,
    description: 'Visual progress tracking'
  }
];

const quickActions = [
  { name: 'New Goal', action: 'createGoal' as const, icon: Target },
  { name: 'Add Task', action: 'createTask' as const, icon: Plus },
];

export function Sidebar() {
  const pathname = usePathname();
  const { sidebarState, toggleSidebar, openModal } = useUIStore();
  
  const isCollapsed = sidebarState === 'collapsed';

  return (
    <aside className={cn(
      "relative flex flex-col border-r bg-background transition-all duration-300",
      isCollapsed ? "w-16" : "w-64"
    )}>
      {/* Header */}
      <div className="flex h-16 items-center border-b px-4">
        {!isCollapsed && (
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
              <span className="text-sm font-bold text-white">RT</span>
            </div>
            <span className="font-semibold">RiseTrack OS</span>
          </div>
        )}
        
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className={cn(
            "hidden md:flex ml-auto",
            isCollapsed && "mx-auto"
          )}
        >
          <ChevronLeft className={cn(
            "h-4 w-4 transition-transform",
            isCollapsed && "rotate-180"
          )} />
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2 p-4">
        <div className="space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            
            return (
              <Link key={item.name} href={item.href}>
                <div className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground",
                  isActive && "bg-accent text-accent-foreground font-medium",
                  isCollapsed && "justify-center px-2"
                )}>
                  <Icon className="h-4 w-4 flex-shrink-0" />
                  {!isCollapsed && (
                    <div className="flex flex-col">
                      <span>{item.name}</span>
                      <span className="text-xs text-muted-foreground">
                        {item.description}
                      </span>
                    </div>
                  )}
                </div>
              </Link>
            );
          })}
        </div>

        {!isCollapsed && (
          <>
            <Separator className="my-4" />
            
            {/* Quick Actions */}
            <div className="space-y-1">
              <h3 className="px-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Quick Actions
              </h3>
              {quickActions.map((action) => {
                const Icon = action.icon;
                
                return (
                  <Button
                    key={action.name}
                    variant="ghost"
                    onClick={() => openModal(action.action)}
                    className="w-full justify-start gap-3 text-sm"
                  >
                    <Icon className="h-4 w-4" />
                    {action.name}
                  </Button>
                );
              })}
            </div>
          </>
        )}
      </nav>

      {/* Footer */}
      {!isCollapsed && (
        <div className="border-t p-4">
          <div className="rounded-lg bg-muted/50 p-3">
            <h4 className="text-sm font-medium">2025 Vision</h4>
            <p className="text-xs text-muted-foreground mt-1">
              Your year of growth and achievement starts here.
            </p>
          </div>
        </div>
      )}
    </aside>
  );
}
