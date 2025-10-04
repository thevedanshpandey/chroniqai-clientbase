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
    const { linkedinConnectionsSent, linkedinConnectionsAccepted, linkedinOutreachSent, whatsappOutreachDone } = metrics;
    
    return {
      acceptanceRate: linkedinConnectionsSent.weekly > 0 ? Math.round((linkedinConnectionsAccepted.weekly / linkedinConnectionsSent.weekly) * 100) : 0,
      replyRate: linkedinOutreachSent.weekly > 0 ? Math.round((whatsappOutreachDone.weekly / linkedinOutreachSent.weekly) * 100) : 0,
      meetingRate: whatsappOutreachDone.weekly > 0 ? Math.round((whatsappOutreachDone.weekly / linkedinOutreachSent.weekly) * 100) : 0,
    };
  };

  const rates = calculateRates();

  // Generate funnel and pie chart data from live metrics
  const funnelData = [
    { stage: "LinkedIn Connections", value: metrics.linkedinConnectionsSent.weekly, color: "#00d4ff" },
    { stage: "Accepted", value: metrics.linkedinConnectionsAccepted.weekly, color: "#00ff88" },
    { stage: "LinkedIn Outreach", value: metrics.linkedinOutreachSent.weekly, color: "#8b5cf6" },
    { stage: "WhatsApp Outreach", value: metrics.whatsappOutreachDone.weekly, color: "#ff4444" },
    { stage: "Green Signals", value: metrics.whatsappGreenSignal.weekly, color: "#fbbf24" },
  ];

  const whatsappStatusData = [
    { name: "Outreach Done", value: metrics.whatsappOutreachDone.weekly, color: "#00ff88" },
    { name: "Follow Up Pending", value: metrics.whatsappFollowUpPending.weekly, color: "#fbbf24" },
    { name: "Green Signal", value: metrics.whatsappGreenSignal.weekly, color: "#8b5cf6" },
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
            today={metrics.linkedinConnectionsSent.today}
            weekly={metrics.linkedinConnectionsSent.weekly}
            lifetime={metrics.linkedinConnectionsSent.lifetime}
            icon={Send}
            trend={metrics.growth.weekly.linkedinConnections}
            color="blue"
          />
          <MetricCard
            title="Connection Accepted"
            today={metrics.linkedinConnectionsAccepted.today}
            weekly={metrics.linkedinConnectionsAccepted.weekly}
            lifetime={metrics.linkedinConnectionsAccepted.lifetime}
            icon={CheckCircle2}
            trend={metrics.growth.weekly.linkedinAccepted}
            color="green"
          />
          <MetricCard
            title="Outreach Sent"
            today={metrics.linkedinOutreachSent.today}
            weekly={metrics.linkedinOutreachSent.weekly}
            lifetime={metrics.linkedinOutreachSent.lifetime}
            icon={MessageCircleMore}
            trend={metrics.growth.weekly.linkedinOutreach}
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
            today={metrics.whatsappLeadsFound.today}
            weekly={metrics.whatsappLeadsFound.weekly}
            lifetime={metrics.whatsappLeadsFound.lifetime}
            icon={UserPlus}
            trend={metrics.growth.weekly.whatsappLeads}
            color="blue"
          />
          <MetricCard
            title="Outreach Done"
            today={metrics.whatsappOutreachDone.today}
            weekly={metrics.whatsappOutreachDone.weekly}
            lifetime={metrics.whatsappOutreachDone.lifetime}
            icon={MessageSquare}
            trend={metrics.growth.weekly.whatsappOutreach}
            color="green"
          />
          <MetricCard
            title="Follow Up Pending"
            today={metrics.whatsappFollowUpPending.today}
            weekly={metrics.whatsappFollowUpPending.weekly}
            lifetime={metrics.whatsappFollowUpPending.lifetime}
            icon={Clock}
            trend={metrics.growth.weekly.whatsappFollowUp}
            color="purple"
          />
          <MetricCard
            title="Green Signal"
            today={metrics.whatsappGreenSignal.today}
            weekly={metrics.whatsappGreenSignal.weekly}
            lifetime={metrics.whatsappGreenSignal.lifetime}
            icon={ThumbsUp}
            trend={metrics.growth.weekly.whatsappGreen}
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
                  <p className="text-3xl font-bold text-neon-blue">{metrics.linkedinOutreachSent.lifetime}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">WhatsApp Total</p>
                  <p className="text-3xl font-bold text-neon-green">{metrics.whatsappOutreachDone.lifetime}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Overall Total</p>
                  <p className="text-3xl font-bold text-neon-purple">{metrics.totalOutreachDone.lifetime}</p>
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
          data={whatsappStatusData} 
          title="WhatsApp Status Overview"
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