import { 
  Users, 
  UserCheck, 
  MessageSquare, 
  Eye, 
  MessageCircle, 
  Calendar,
  Send,
  CheckCircle2,
  MessageCircleMore,
  PhoneCall,
  UserPlus,
  Clock,
  ThumbsUp,
  TrendingUp
} from "lucide-react";
import { useEffect } from "react";
import { MetricCard } from "@/components/MetricCard";
import { TrendChart } from "@/components/charts/TrendChart";
import { FunnelChart } from "@/components/charts/FunnelChart";
import { PieChart } from "@/components/charts/PieChart";
import { RatesCard } from "@/components/RatesCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useSheetData } from "@/hooks/useSheetData";
import { useAuth } from "@/hooks/useAuth";

export function Dashboard() {
  const { user } = useAuth();
  const { metrics, trendData, fetchSheetData } = useSheetData();

  useEffect(() => {
    if (user) {
      fetchSheetData();
    }
  }, [user, fetchSheetData]);

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
      trend: metrics.growth.weekly.connections,
      color: "blue" as const,
    },
    {
      title: "Connection Requests Accepted",
      ...metrics.connectionsAccepted,
      icon: UserCheck,
      trend: metrics.growth.weekly.accepted,
      color: "green" as const,
    },
    {
      title: "Messages Sent", 
      ...metrics.messagesSent,
      icon: MessageSquare,
      trend: metrics.growth.weekly.messages,
      color: "purple" as const,
    },
    {
      title: "Messages Seen",
      ...metrics.messagesSeen,
      icon: Eye,
      trend: metrics.growth.weekly.seen,
      color: "blue" as const,
    },
    {
      title: "Replies Received",
      ...metrics.repliesReceived,
      icon: MessageCircle,
      trend: metrics.growth.weekly.replies,
      color: "green" as const,
    },
    {
      title: "Meetings Booked",
      ...metrics.meetingsBooked,
      icon: Calendar,
      trend: metrics.growth.weekly.meetings,
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
          {user?.client_name} Dashboard
        </h1>
        <p className="text-muted-foreground">Track your outreach performance and conversion metrics</p>
      </div>

      {/* LinkedIn Outreach Section */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <Users className="h-6 w-6 text-neon-blue" />
          LinkedIn Outreach
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <MetricCard
            title="Total Connections Sent"
            today={metrics.connectionsSent.today}
            weekly={metrics.connectionsSent.weekly}
            lifetime={metrics.connectionsSent.lifetime}
            icon={Send}
            trend={metrics.growth.weekly.connections}
            color="blue"
          />
          <MetricCard
            title="Connection Accepted"
            today={metrics.connectionsAccepted.today}
            weekly={metrics.connectionsAccepted.weekly}
            lifetime={metrics.connectionsAccepted.lifetime}
            icon={CheckCircle2}
            trend={metrics.growth.weekly.accepted}
            color="green"
          />
          <MetricCard
            title="Outreach Sent"
            today={metrics.messagesSent.today}
            weekly={metrics.messagesSent.weekly}
            lifetime={metrics.messagesSent.lifetime}
            icon={MessageCircleMore}
            trend={metrics.growth.weekly.messages}
            color="purple"
          />
        </div>
      </div>

      {/* WhatsApp Outreach Section */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <PhoneCall className="h-6 w-6 text-neon-green" />
          WhatsApp Outreach
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard
            title="Total Leads Found"
            today={0}
            weekly={0}
            lifetime={0}
            icon={UserPlus}
            trend={0}
            color="blue"
          />
          <MetricCard
            title="Outreach Done"
            today={0}
            weekly={0}
            lifetime={0}
            icon={MessageSquare}
            trend={0}
            color="green"
          />
          <MetricCard
            title="Follow Up Pending"
            today={0}
            weekly={0}
            lifetime={0}
            icon={Clock}
            trend={0}
            color="purple"
          />
          <MetricCard
            title="Green Signal"
            today={0}
            weekly={0}
            lifetime={0}
            icon={ThumbsUp}
            trend={0}
            color="green"
          />
        </div>
      </div>

      {/* Total Outreach Done Section */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <TrendingUp className="h-6 w-6 text-neon-purple" />
          Total Outreach Done
        </h2>
        <div className="grid grid-cols-1 gap-6">
          <Card className="bg-card border border-border/50 hover:shadow-glow-primary/20 transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-foreground flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-neon-purple" />
                Combined Outreach Metrics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">LinkedIn Total</p>
                  <p className="text-3xl font-bold text-neon-blue">{metrics.messagesSent.lifetime}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">WhatsApp Total</p>
                  <p className="text-3xl font-bold text-neon-green">0</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Overall Total</p>
                  <p className="text-3xl font-bold text-neon-purple">{metrics.messagesSent.lifetime}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
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