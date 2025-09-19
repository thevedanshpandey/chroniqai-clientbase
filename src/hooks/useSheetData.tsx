import { useState, useCallback } from "react";
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
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [metrics, setMetrics] = useState<OutreachMetrics | null>(null);
  const [trendData, setTrendData] = useState<TrendDataPoint[]>([]);

  const fetchSheetData = useCallback(async () => {

    setIsLoading(true);
    try {
      // Use mock data since authentication is removed
      const mockData = [
        { date: '2024-01-15', connections: 25, accepted: 15, messages: 12, seen: 10, replies: 8, meetings: 3 },
        { date: '2024-01-16', connections: 30, accepted: 18, messages: 15, seen: 12, replies: 9, meetings: 4 },
        { date: '2024-01-17', connections: 22, accepted: 12, messages: 10, seen: 8, replies: 6, meetings: 2 },
        { date: '2024-01-18', connections: 28, accepted: 16, messages: 14, seen: 11, replies: 7, meetings: 3 },
        { date: '2024-01-19', connections: 35, accepted: 20, messages: 18, seen: 15, replies: 10, meetings: 5 },
      ];

      processMetricsData(mockData);

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
  }, [toast]);

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