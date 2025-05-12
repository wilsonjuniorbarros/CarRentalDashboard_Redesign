import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface SummaryCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  iconColor: string;
  iconBgColor: string;
  trend?: {
    value: string;
    isPositive?: boolean;
  };
}

export function SummaryCard({
  title,
  value,
  icon: Icon,
  iconColor,
  iconBgColor,
  trend,
}: SummaryCardProps) {
  return (
    <Card>
      <CardContent className="p-4 flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <p className="text-2xl font-semibold">{value}</p>
          {trend && (
            <div className="mt-1 text-xs">
              <span 
                className={cn(
                  "flex items-center",
                  trend.isPositive ? "text-green-600" : "text-red-600"
                )}
              >
                {trend.value}
              </span>
            </div>
          )}
        </div>
        <div className={cn("p-3 rounded-full", iconBgColor)}>
          <Icon className={cn("h-5 w-5", iconColor)} />
        </div>
      </CardContent>
    </Card>
  );
}
