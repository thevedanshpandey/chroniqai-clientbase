import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, TrendingUp } from "lucide-react";

export function Reports() {
  return (
    <div className="space-y-6 p-6 animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Reports</h1>
        <p className="text-muted-foreground">Detailed analytics and performance reports</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-card border border-border/50 hover:shadow-glow-primary/20 transition-all duration-300">
          <CardHeader>
            <CardTitle className="text-foreground flex items-center space-x-2">
              <BarChart3 className="h-5 w-5 text-neon-blue" />
              <span>Weekly Performance Report</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Comprehensive analysis of your weekly outreach performance with detailed breakdowns.
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Connection Rate:</span>
                <span className="text-neon-green">29.7%</span>
              </div>
              <div className="flex justify-between">
                <span>Response Rate:</span>
                <span className="text-neon-blue">25.0%</span>
              </div>
              <div className="flex justify-between">
                <span>Meeting Conversion:</span>
                <span className="text-neon-purple">33.3%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border border-border/50 hover:shadow-glow-success/20 transition-all duration-300">
          <CardHeader>
            <CardTitle className="text-foreground flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-neon-green" />
              <span>Monthly Trends</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Month-over-month growth and trend analysis for all key metrics.
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Connections Growth:</span>
                <span className="text-neon-green">+12%</span>
              </div>
              <div className="flex justify-between">
                <span>Reply Growth:</span>
                <span className="text-neon-blue">+8%</span>
              </div>
              <div className="flex justify-between">
                <span>Meeting Growth:</span>
                <span className="text-neon-purple">+15%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}