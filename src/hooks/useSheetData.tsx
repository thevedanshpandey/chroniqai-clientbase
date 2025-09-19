import { useState, useCallback } from "react";
import { useAuth } from "./useAuth";
import { useToast } from "./use-toast";

export interface OutreachMetrics {
  connectionsSent: { today: number; weekly: number; lifetime: number };
  connectionsAccepted: { today: number; weekly: number; lifetime: number };
  messagesSent: { today: number; weekly: number; lifetime: number };
  messagesSeen: { today: number; weekly: number; lifetime: number };
  repliesReceived: { today: number; weekly: number; lifetime: number };
  meetingsBooked: { today: number; weekly: number; lifetime: number };
  growth: {
    today: {
      connections: number;
      accepted: number;
      messages: number;
      seen: number;
      replies: number;
      meetings: number;
    };
    weekly: {
      connections: number;
      accepted: number;
      messages: number;
      seen: number;
      replies: number;
      meetings: number;
    };
  };
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
    if (!user?.sheet_url) return;

    setIsLoading(true);
    try {
      // Fetch live data from the user's Google Sheet
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
  }, [user?.sheet_url, toast]);

  const processMetricsData = (data: any[]) => {
    // Sort data by date to get latest entries
    const sortedData = data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
    // Get today's data (latest available date or 0 if no data)
    const todayData = sortedData.length > 0 ? sortedData[0] : { connections: 0, accepted: 0, messages: 0, seen: 0, replies: 0, meetings: 0 };
    
    // Get previous day's data for growth calculation
    const previousDayData = sortedData.length > 1 ? sortedData[1] : { connections: 0, accepted: 0, messages: 0, seen: 0, replies: 0, meetings: 0 };
    
    // Calculate current week (Monday to Sunday)
    const now = new Date();
    const startOfWeek = new Date(now);
    const day = startOfWeek.getDay();
    const diff = startOfWeek.getDate() - day + (day === 0 ? -6 : 1);
    startOfWeek.setDate(diff);
    startOfWeek.setHours(0, 0, 0, 0);

    const weeklyData = data.filter(row => {
      const rowDate = new Date(row.date);
      return rowDate >= startOfWeek && rowDate <= now;
    });
    
    // Calculate previous week for growth calculation
    const startOfLastWeek = new Date(startOfWeek);
    startOfLastWeek.setDate(startOfLastWeek.getDate() - 7);
    const endOfLastWeek = new Date(startOfWeek);
    endOfLastWeek.setDate(endOfLastWeek.getDate() - 1);
    
    const previousWeekData = data.filter(row => {
      const rowDate = new Date(row.date);
      return rowDate >= startOfLastWeek && rowDate <= endOfLastWeek;
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

    const previousWeekTotals = previousWeekData.reduce(
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

    // Calculate growth percentages
    const calculateGrowth = (current: number, previous: number) => {
      if (previous === 0) return current > 0 ? 100 : 0;
      return Math.round(((current - previous) / previous) * 100);
    };

    const todayGrowth = {
      connections: calculateGrowth(todayData.connections, previousDayData.connections),
      accepted: calculateGrowth(todayData.accepted, previousDayData.accepted),
      messages: calculateGrowth(todayData.messages, previousDayData.messages),
      seen: calculateGrowth(todayData.seen, previousDayData.seen),
      replies: calculateGrowth(todayData.replies, previousDayData.replies),
      meetings: calculateGrowth(todayData.meetings, previousDayData.meetings),
    };

    const weeklyGrowth = {
      connections: calculateGrowth(weeklyTotals.connections, previousWeekTotals.connections),
      accepted: calculateGrowth(weeklyTotals.accepted, previousWeekTotals.accepted),
      messages: calculateGrowth(weeklyTotals.messages, previousWeekTotals.messages),
      seen: calculateGrowth(weeklyTotals.seen, previousWeekTotals.seen),
      replies: calculateGrowth(weeklyTotals.replies, previousWeekTotals.replies),
      meetings: calculateGrowth(weeklyTotals.meetings, previousWeekTotals.meetings),
    };

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
      growth: {
        today: todayGrowth,
        weekly: weeklyGrowth,
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