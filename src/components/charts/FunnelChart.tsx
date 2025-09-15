import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface FunnelChartProps {
  data: Array<{
    stage: string;
    value: number;
    color: string;
  }>;
}

export function FunnelChart({ data }: FunnelChartProps) {
  return (
    <Card className="bg-card border border-border/50 hover:shadow-glow-success/20 transition-all duration-300">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center space-x-2">
          <div className="w-2 h-2 bg-neon-green rounded-full"></div>
          <span>Conversion Funnel</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            layout="horizontal"
          >
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
            <XAxis type="number" stroke="hsl(var(--muted-foreground))" fontSize={12} />
            <YAxis 
              dataKey="stage" 
              type="category" 
              width={100}
              stroke="hsl(var(--muted-foreground))" 
              fontSize={12}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
                color: 'hsl(var(--foreground))'
              }}
            />
            <Bar 
              dataKey="value" 
              fill="hsl(var(--neon-green))"
              radius={[0, 4, 4, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}