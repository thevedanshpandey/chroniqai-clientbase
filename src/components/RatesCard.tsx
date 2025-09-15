import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Target, MessageSquare, Calendar } from "lucide-react";

interface RatesCardProps {
  acceptanceRate: number;
  replyRate: number;
  meetingRate: number;
}

export function RatesCard({ acceptanceRate, replyRate, meetingRate }: RatesCardProps) {
  const rates = [
    {
      label: "Acceptance Rate",
      value: acceptanceRate,
      icon: TrendingUp,
      color: "neon-blue",
      description: "Connections accepted vs sent"
    },
    {
      label: "Reply Rate", 
      value: replyRate,
      icon: MessageSquare,
      color: "neon-green",
      description: "Replies vs messages sent"
    },
    {
      label: "Meeting Rate",
      value: meetingRate,
      icon: Calendar,
      color: "neon-purple", 
      description: "Meetings vs replies received"
    }
  ];

  return (
    <Card className="bg-card border border-border/50 hover:shadow-glow-primary/20 transition-all duration-300">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center space-x-2">
          <Target className="h-5 w-5 text-neon-blue" />
          <span>Conversion Rates</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {rates.map((rate) => {
          const Icon = rate.icon;
          return (
            <div key={rate.label} className="flex items-center justify-between p-3 bg-secondary/20 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg bg-${rate.color}/10`}>
                  <Icon className={`h-4 w-4 text-${rate.color}`} />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-foreground">{rate.label}</h4>
                  <p className="text-xs text-muted-foreground">{rate.description}</p>
                </div>
              </div>
              <div className="text-right">
                <div className={`text-2xl font-bold text-${rate.color}`}>
                  {rate.value}%
                </div>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}