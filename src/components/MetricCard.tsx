import { ReactNode } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface MetricCardProps {
  title: string;
  today: number;
  weekly: number;
  lifetime: number;
  icon: LucideIcon;
  trend?: number;
  color?: "blue" | "green" | "purple" | "red";
  mode?: "today" | "week" | "total";
}

export function MetricCard({ 
  title, 
  today, 
  weekly, 
  lifetime, 
  icon: Icon, 
  trend,
  color = "blue",
  mode = "week"
}: MetricCardProps) {
  const colorClasses = {
    blue: "text-neon-blue border-neon-blue/20 shadow-glow-primary",
    green: "text-neon-green border-neon-green/20 shadow-glow-success", 
    purple: "text-neon-purple border-neon-purple/20 shadow-glow-purple",
    red: "text-neon-red border-neon-red/20 shadow-glow-danger",
  };

  const bgClasses = {
    blue: "bg-neon-blue/10",
    green: "bg-neon-green/10",
    purple: "bg-neon-purple/10", 
    red: "bg-neon-red/10",
  };

  return (
    <Card className={`bg-card border ${colorClasses[color]} hover:shadow-lg transition-all duration-300 hover:scale-105`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className={`p-2 rounded-lg ${bgClasses[color]}`}>
            <Icon className={`h-5 w-5 ${colorClasses[color]}`} />
          </div>
          {trend !== undefined && (
            <div className={`text-xs px-2 py-1 rounded-full ${
              trend > 0 
                ? 'bg-neon-green/20 text-neon-green' 
                : trend < 0 
                ? 'bg-neon-red/20 text-neon-red'
                : 'bg-muted text-muted-foreground'
            }`}>
              {trend > 0 ? '+' : ''}{trend}%
            </div>
          )}
        </div>
        <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="space-y-2">
          {mode === "today" && (
            <div className="flex justify-between items-center">
              <span className="text-xs text-muted-foreground">Today</span>
              <span className={`text-3xl font-bold ${colorClasses[color]}`}>{today.toLocaleString()}</span>
            </div>
          )}
          {mode === "week" && (
            <div className="flex justify-between items-center">
              <span className="text-xs text-muted-foreground">This Week</span>
              <span className={`text-3xl font-bold ${colorClasses[color]}`}>{weekly.toLocaleString()}</span>
            </div>
          )}
          {mode === "total" && (
            <div className="flex justify-between items-center">
              <span className="text-xs text-muted-foreground">Total</span>
              <span className={`text-3xl font-bold ${colorClasses[color]}`}>{lifetime.toLocaleString()}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}