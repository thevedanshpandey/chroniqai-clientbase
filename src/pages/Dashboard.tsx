import { 
  Users, 
  UserCheck, 
  MessageSquare, 
  Eye, 
  MessageCircle, 
  Calendar 
} from "lucide-react";
import { useEffect } from "react";
import { MetricCard } from "@/components/MetricCard";
import { TrendChart } from "@/components/charts/TrendChart";
import { FunnelChart } from "@/components/charts/FunnelChart";
import { PieChart } from "@/components/charts/PieChart";
import { RatesCard } from "@/components/RatesCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useSheetData } from "@/hooks/useSheetData";

export function Dashboard() {
  const { metrics, trendData, fetchSheetData } = useSheetData();

  useEffect(() => {
    fetchSheetData();
  }, [fetchSheetData]);

  if (!metrics) {
    return (
      <div className="space-y-6 p-6 animate-fade-in">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-neon-blue mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading dashboard data...</p>
          </div>
        </div>
      </div>
    );
  }

  const calculateRates = () => {
    const { connectionsSent, connectionsAccepted, messagesSent, repliesReceived, meetingsBooked } = metrics;
    
    return {
      acceptanceRate: connectionsSent.weekly > 0 ? Math.round((connectionsAccepted.weekly / connectionsSent.weekly) * 100) : 0,
      replyRate: messagesSent.weekly > 0 ? Math.round((repliesReceived.weekly / messagesSent.weekly) * 100) : 0,
      meetingRate: repliesReceived.weekly > 0 ? Math.round((meetingsBooked.weekly / repliesReceived.weekly) * 100) : 0,
    };
  };

  const rates = calculateRates();

  const metricCards = [
    {
      title: "Connection Requests Sent",
      ...metrics.connectionsSent,
      icon: Users,
      trend: 12,
      color: "blue" as const,
    },
    {
      title: "Connection Requests Accepted",
      ...metrics.connectionsAccepted,
      icon: UserCheck,
      trend: 8,
      color: "green" as const,
    },
    {
      title: "Messages Sent", 
      ...metrics.messagesSent,
      icon: MessageSquare,
      trend: -3,
      color: "purple" as const,
    },
    {
      title: "Messages Seen",
      ...metrics.messagesSeen,
      icon: Eye,
      trend: 5,
      color: "blue" as const,
    },
    {
      title: "Replies Received",
      ...metrics.repliesReceived,
      icon: MessageCircle,
      trend: 15,
      color: "green" as const,
    },
    {
      title: "Meetings Booked",
      ...metrics.meetingsBooked,
      icon: Calendar,
      trend: 25,
      color: "red" as const,
    },
  ];

  // Generate funnel and pie chart data from live metrics
  const funnelData = [
    { stage: "Requests Sent", value: metrics.connectionsSent.weekly, color: "#00d4ff" },
    { stage: "Accepted", value: metrics.connectionsAccepted.weekly, color: "#00ff88" },
    { stage: "Messages Sent", value: metrics.messagesSent.weekly, color: "#8b5cf6" },
    { stage: "Replies", value: metrics.repliesReceived.weekly, color: "#ff4444" },
    { stage: "Meetings", value: metrics.meetingsBooked.weekly, color: "#fbbf24" },
  ];

  const messageStatusData = [
    { name: "Seen", value: metrics.messagesSeen.weekly, color: "#00ff88" },
    { name: "Not Seen", value: metrics.messagesSent.weekly - metrics.messagesSeen.weekly, color: "#374151" },
  ];

  return (
    <div className="space-y-6 p-6 animate-fade-in">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Client Dashboard
        </h1>
        <p className="text-muted-foreground">Track your outreach performance and conversion metrics</p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {metricCards.map((metric, index) => (
          <MetricCard
            key={metric.title}
            title={metric.title}
            today={metric.today}
            weekly={metric.weekly}
            lifetime={metric.lifetime}
            icon={metric.icon}
            trend={metric.trend}
            color={metric.color}
          />
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="lg:col-span-2">
          <TrendChart data={trendData} />
        </div>
        
        <FunnelChart data={funnelData} />
        
        <PieChart 
          data={messageStatusData} 
          title="Message Status Overview"
        />
      </div>

      {/* Rates Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RatesCard 
            acceptanceRate={rates.acceptanceRate}
            replyRate={rates.replyRate}
            meetingRate={rates.meetingRate}
          />
        </div>
        
        <Card className="bg-card border border-border/50 hover:shadow-glow-danger/20 transition-all duration-300">
          <CardHeader>
            <CardTitle className="text-foreground">Quick Stats</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Best Day This Week</span>
              <span className="text-neon-green font-semibold">Tuesday</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Avg Response Time</span>
              <span className="text-neon-blue font-semibold">2.4 hours</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Top Industry</span>
              <span className="text-neon-purple font-semibold">Technology</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">This Month Goal</span>
              <span className="text-neon-red font-semibold">75% Complete</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}