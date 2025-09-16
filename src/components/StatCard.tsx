
import { ReactNode } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { HoverCard } from '@/components/ui/animations';
import { cva } from 'class-variance-authority';

const statCardVariants = cva(
  "relative overflow-hidden transition-all duration-300 border",
  {
    variants: {
      variant: {
        default: "bg-white hover:shadow-md",
        blue: "bg-crm-light-blue border-crm-blue/20 hover:border-crm-blue/30",
        purple: "bg-crm-light-purple border-crm-purple/20 hover:border-crm-purple/30",
        green: "bg-crm-light-green border-crm-green/20 hover:border-crm-green/30",
        red: "bg-crm-light-red border-crm-red/20 hover:border-crm-red/30",
        yellow: "bg-crm-light-yellow border-crm-yellow/20 hover:border-crm-yellow/30",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

interface StatCardProps {
  title: string;
  value: string | number;
  delta?: {
    value: string | number;
    positive: boolean;
  };
  icon: ReactNode;
  variant?: "default" | "blue" | "purple" | "green" | "red" | "yellow";
  isLoading?: boolean;
  className?: string;
}

const StatCard = ({
  title,
  value,
  delta,
  icon,
  variant = "default",
  isLoading = false,
  className,
}: StatCardProps) => {
  // Get the correct color based on variant
  const getColorClass = () => {
    switch (variant) {
      case "blue": return "text-crm-blue";
      case "purple": return "text-crm-purple";
      case "green": return "text-crm-green";
      case "red": return "text-crm-red";
      case "yellow": return "text-crm-yellow";
      default: return "text-crm-blue";
    }
  };

  const iconColorClass = getColorClass();
  
  return (
    <HoverCard>
      <Card className={cn(statCardVariants({ variant }), className)}>
        <CardContent className="p-6">
          {isLoading ? (
            <div className="space-y-3">
              <div className="h-4 w-1/2 bg-gray-100 rounded animate-pulse" />
              <div className="h-8 w-3/4 bg-gray-100 rounded animate-pulse" />
              <div className="h-4 w-1/3 bg-gray-100 rounded animate-pulse" />
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-crm-gray">{title}</h3>
                <div className={cn("h-8 w-8 rounded-md flex items-center justify-center", 
                  variant === "default" ? "bg-crm-light-blue" : "bg-white/60"
                )}>
                  <div className={iconColorClass}>{icon}</div>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-semibold text-crm-black">{value}</p>
                {delta && (
                  <div className="flex items-center space-x-1">
                    <span className={delta.positive ? "text-crm-green" : "text-crm-red"}>
                      {delta.positive ? "↑" : "↓"} {delta.value}
                    </span>
                    <span className="text-xs text-crm-gray">vs. last month</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </HoverCard>
  );
};

export default StatCard;
