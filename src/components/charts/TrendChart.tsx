import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface TrendChartProps {
  data: Array<{
    date: string;
    connections: number;
    messages: number;
    replies: number;
    meetings: number;
  }>;
}

export function TrendChart({ data }: TrendChartProps) {
  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <Card className="bg-card border border-border/50 hover:shadow-glow-primary/20 transition-all duration-300">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center space-x-2">
          <div className="w-2 h-2 bg-neon-blue rounded-full"></div>
          <span>Daily Activity Trends</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
            <XAxis 
              dataKey="date" 
              tickFormatter={formatDate}
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
            />
            <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
                color: 'hsl(var(--foreground))'
              }}
              labelFormatter={(value) => formatDate(value)}
            />
            <Line 
              type="monotone" 
              dataKey="connections" 
              stroke="hsl(var(--neon-blue))" 
              strokeWidth={2}
              dot={{ fill: 'hsl(var(--neon-blue))', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: 'hsl(var(--neon-blue))', strokeWidth: 2 }}
            />
            <Line 
              type="monotone" 
              dataKey="messages" 
              stroke="hsl(var(--neon-green))" 
              strokeWidth={2}
              dot={{ fill: 'hsl(var(--neon-green))', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: 'hsl(var(--neon-green))', strokeWidth: 2 }}
            />
            <Line 
              type="monotone" 
              dataKey="replies" 
              stroke="hsl(var(--neon-purple))" 
              strokeWidth={2}
              dot={{ fill: 'hsl(var(--neon-purple))', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: 'hsl(var(--neon-purple))', strokeWidth: 2 }}
            />
            <Line 
              type="monotone" 
              dataKey="meetings" 
              stroke="hsl(var(--neon-red))" 
              strokeWidth={2}
              dot={{ fill: 'hsl(var(--neon-red))', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: 'hsl(var(--neon-red))', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}