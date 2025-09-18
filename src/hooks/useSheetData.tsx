import { useState, useCallback } from "react";
import { useAuth } from "./useAuth";
import { useToast } from "./use-toast";
import { supabase } from "@/integrations/supabase/client";

export interface OutreachMetrics {
  connectionsSent: { today: number; weekly: number; lifetime: number };
  connectionsAccepted: { today: number; weekly: number; lifetime: number };
  messagesSent: { today: number; weekly: number; lifetime: number };
  messagesSeen: { today: number; weekly: number; lifetime: number };
  repliesReceived: { today: number; weekly: number; lifetime: number };
  meetingsBooked: { today: number; weekly: number; lifetime: number };
}

export interface TrendDataPoint {
  date: string;
  connections: number;
  messages: number;
  replies: number;
  meetings: number;
}

export function useSheetData() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [metrics, setMetrics] = useState<OutreachMetrics | null>(null);
  const [trendData, setTrendData] = useState<TrendDataPoint[]>([]);

  const fetchSheetData = useCallback(async () => {
    if (!user?.sheet_url || !user?.id) return;

    setIsLoading(true);
    try {
      // First, try to get data from Supabase using our secure function
      const { data: dbData, error: dbError } = await (supabase as any).rpc('get_client_outreach_data', {
        input_client_id: user.id
      });

      if (!dbError && dbData && dbData.length > 0) {
        // Use database data
        const data = dbData.map((row: any) => ({
          date: row.date_recorded,
          connections: row.connection_requests_sent || 0,
          accepted: row.connection_requests_accepted || 0,
          messages: row.messages_sent || 0,
          seen: row.messages_seen || 0,
          replies: row.replies_received || 0,
          meetings: row.meetings_booked || 0,
        }));

        processMetricsData(data);
      } else {
        // Fallback to Google Sheets data
        const response = await fetch(user.sheet_url);
        const csvText = await response.text();
        
        // Parse CSV data (simple parsing - assumes specific format)
        const lines = csvText.trim().split('\n');
        const data = lines.slice(1).map(line => {
          const columns = line.split(',');
          return {
            date: columns[0] || '',
            connections: parseInt(columns[1]) || 0,
            accepted: parseInt(columns[2]) || 0,
            messages: parseInt(columns[3]) || 0,
            seen: parseInt(columns[4]) || 0,
            replies: parseInt(columns[5]) || 0,
            meetings: parseInt(columns[6]) || 0,
          };
        });

        processMetricsData(data);
      }

      toast({
        title: "Data refreshed",
        description: "Latest data loaded successfully",
      });
    } catch (error) {
      console.error('Failed to fetch data:', error);
      toast({
        title: "Failed to fetch data",
        description: "Could not load data from your source",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [user?.sheet_url, user?.id, toast]);

  const processMetricsData = (data: any[]) => {
    // Calculate metrics
    const today = new Date().toISOString().split('T')[0];
    const todayData = data.find(row => row.date === today) || { connections: 0, accepted: 0, messages: 0, seen: 0, replies: 0, meetings: 0 };
    
    // Calculate weekly (current week starting Monday)
    const now = new Date();
    const startOfWeek = new Date(now);
    const day = startOfWeek.getDay();
    const diff = startOfWeek.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is Sunday
    startOfWeek.setDate(diff);
    startOfWeek.setHours(0, 0, 0, 0);

    const weeklyData = data.filter(row => {
      const rowDate = new Date(row.date);
      return rowDate >= startOfWeek && rowDate <= now;
    });
    
    const weeklyTotals = weeklyData.reduce(
      (acc, row) => ({
        connections: acc.connections + row.connections,
        accepted: acc.accepted + row.accepted,
        messages: acc.messages + row.messages,
        seen: acc.seen + row.seen,
        replies: acc.replies + row.replies,
        meetings: acc.meetings + row.meetings,
      }),
      { connections: 0, accepted: 0, messages: 0, seen: 0, replies: 0, meetings: 0 }
    );

    // Calculate lifetime totals
    const lifetimeTotals = data.reduce(
      (acc, row) => ({
        connections: acc.connections + row.connections,
        accepted: acc.accepted + row.accepted,
        messages: acc.messages + row.messages,
        seen: acc.seen + row.seen,
        replies: acc.replies + row.replies,
        meetings: acc.meetings + row.meetings,
      }),
      { connections: 0, accepted: 0, messages: 0, seen: 0, replies: 0, meetings: 0 }
    );

    const newMetrics: OutreachMetrics = {
      connectionsSent: {
        today: todayData.connections,
        weekly: weeklyTotals.connections,
        lifetime: lifetimeTotals.connections,
      },
      connectionsAccepted: {
        today: todayData.accepted,
        weekly: weeklyTotals.accepted,
        lifetime: lifetimeTotals.accepted,
      },
      messagesSent: {
        today: todayData.messages,
        weekly: weeklyTotals.messages,
        lifetime: lifetimeTotals.messages,
      },
      messagesSeen: {
        today: todayData.seen,
        weekly: weeklyTotals.seen,
        lifetime: lifetimeTotals.seen,
      },
      repliesReceived: {
        today: todayData.replies,
        weekly: weeklyTotals.replies,
        lifetime: lifetimeTotals.replies,
      },
      meetingsBooked: {
        today: todayData.meetings,
        weekly: weeklyTotals.meetings,
        lifetime: lifetimeTotals.meetings,
      },
    };

    // Transform data for trend chart (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const trendData = data
      .filter(row => new Date(row.date) >= thirtyDaysAgo)
      .map(row => ({
        date: row.date,
        connections: row.connections,
        messages: row.messages,
        replies: row.replies,
        meetings: row.meetings,
      }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    setMetrics(newMetrics);
    setTrendData(trendData);
  };

  return {
    metrics,
    trendData,
    isLoading,
    fetchSheetData,
  };
}