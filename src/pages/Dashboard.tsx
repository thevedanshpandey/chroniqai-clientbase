import { 
  Users, 
  UserCheck, 
  MessageSquare, 
  Eye, 
  MessageCircle, 
  Calendar 
} from "lucide-react";
import { MetricCard } from "@/components/MetricCard";
import { TrendChart } from "@/components/charts/TrendChart";
import { FunnelChart } from "@/components/charts/FunnelChart";
import { PieChart } from "@/components/charts/PieChart";
import { RatesCard } from "@/components/RatesCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  mockMetrics, 
  mockTrendData, 
  mockFunnelData, 
  mockMessageStatusData,
  calculateRates 
} from "@/data/mockData";

export function Dashboard() {
  const rates = calculateRates();

  const metricCards = [
    {
      title: "Connection Requests Sent",
      ...mockMetrics.connectionsSent,
      icon: Users,
      trend: 12,
      color: "blue" as const,
    },
    {
      title: "Connection Requests Accepted",
      ...mockMetrics.connectionsAccepted,
      icon: UserCheck,
      trend: 8,
      color: "green" as const,
    },
    {
      title: "Messages Sent", 
      ...mockMetrics.messagesSent,
      icon: MessageSquare,
      trend: -3,
      color: "purple" as const,
    },
    {
      title: "Messages Seen",
      ...mockMetrics.messagesSeen,
      icon: Eye,
      trend: 5,
      color: "blue" as const,
    },
    {
      title: "Replies Received",
      ...mockMetrics.repliesReceived,
      icon: MessageCircle,
      trend: 15,
      color: "green" as const,
    },
    {
      title: "Meetings Booked",
      ...mockMetrics.meetingsBooked,
      icon: Calendar,
      trend: 25,
      color: "red" as const,
    },
  ];

  return (
    <div className="space-y-6 p-6 animate-fade-in">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">LinkedIn Outreach Dashboard</h1>
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
          <TrendChart data={mockTrendData} />
        </div>
        
        <FunnelChart data={mockFunnelData} />
        
        <PieChart 
          data={mockMessageStatusData} 
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