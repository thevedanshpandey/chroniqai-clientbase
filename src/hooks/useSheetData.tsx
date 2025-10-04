import { useState, useCallback } from "react";
import { useAuth } from "./useAuth";
import { useToast } from "./use-toast";

export interface OutreachMetrics {
  // LinkedIn metrics
  linkedinConnectionsSent: { today: number; weekly: number; lifetime: number };
  linkedinConnectionsAccepted: { today: number; weekly: number; lifetime: number };
  linkedinOutreachSent: { today: number; weekly: number; lifetime: number };
  // WhatsApp metrics
  whatsappLeadsFound: { today: number; weekly: number; lifetime: number };
  whatsappOutreachDone: { today: number; weekly: number; lifetime: number };
  whatsappFollowUpPending: { today: number; weekly: number; lifetime: number };
  whatsappGreenSignal: { today: number; weekly: number; lifetime: number };
  // Total outreach
  totalOutreachDone: { today: number; weekly: number; lifetime: number };
  growth: {
    today: {
      linkedinConnections: number;
      linkedinAccepted: number;
      linkedinOutreach: number;
      whatsappLeads: number;
      whatsappOutreach: number;
      whatsappFollowUp: number;
      whatsappGreen: number;
      totalOutreach: number;
    };
    weekly: {
      linkedinConnections: number;
      linkedinAccepted: number;
      linkedinOutreach: number;
      whatsappLeads: number;
      whatsappOutreach: number;
      whatsappFollowUp: number;
      whatsappGreen: number;
      totalOutreach: number;
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
      
      // Parse CSV data with new column structure
      const lines = csvText.trim().split('\n');
      const data = lines.slice(1).map(line => {
        const columns = line.split(',');
        return {
          date: columns[0] || '',
          linkedinConnectionsSent: parseInt(columns[1]) || 0,
          linkedinConnectionsAccepted: parseInt(columns[2]) || 0,
          linkedinOutreachSent: parseInt(columns[3]) || 0,
          whatsappLeadsFound: parseInt(columns[4]) || 0,
          whatsappOutreachDone: parseInt(columns[5]) || 0,
          whatsappFollowUpPending: parseInt(columns[6]) || 0,
          whatsappGreenSignal: parseInt(columns[7]) || 0,
          totalOutreachDone: parseInt(columns[8]) || 0,
          lastUpdated: columns[9] || '',
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
    // Sort data by date to get chronological order (oldest to newest)
    const sortedData = data.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    
    // Default empty data object
    const emptyData = {
      linkedinConnectionsSent: 0,
      linkedinConnectionsAccepted: 0,
      linkedinOutreachSent: 0,
      whatsappLeadsFound: 0,
      whatsappOutreachDone: 0,
      whatsappFollowUpPending: 0,
      whatsappGreenSignal: 0,
      totalOutreachDone: 0,
    };
    
    // Get today's data (last row - latest entry)
    const todayData = sortedData.length > 0 ? sortedData[sortedData.length - 1] : emptyData;
    
    // Get previous day's data for growth calculation (second to last row)
    const previousDayData = sortedData.length > 1 ? sortedData[sortedData.length - 2] : emptyData;
    
    // Get last 6 rows for "This Week" calculation
    const weekRowCount = Math.min(6, sortedData.length);
    const weeklyData = sortedData.slice(-weekRowCount);
    
    // Get previous 6 rows for comparison (rows before the current week rows)
    const prevWeekStartIndex = Math.max(0, sortedData.length - (weekRowCount * 2));
    const prevWeekEndIndex = sortedData.length - weekRowCount;
    const previousWeekData = sortedData.slice(prevWeekStartIndex, prevWeekEndIndex);
    
    const weeklyTotals = weeklyData.reduce(
      (acc, row) => ({
        linkedinConnectionsSent: acc.linkedinConnectionsSent + row.linkedinConnectionsSent,
        linkedinConnectionsAccepted: acc.linkedinConnectionsAccepted + row.linkedinConnectionsAccepted,
        linkedinOutreachSent: acc.linkedinOutreachSent + row.linkedinOutreachSent,
        whatsappLeadsFound: acc.whatsappLeadsFound + row.whatsappLeadsFound,
        whatsappOutreachDone: acc.whatsappOutreachDone + row.whatsappOutreachDone,
        whatsappFollowUpPending: acc.whatsappFollowUpPending + row.whatsappFollowUpPending,
        whatsappGreenSignal: acc.whatsappGreenSignal + row.whatsappGreenSignal,
        totalOutreachDone: acc.totalOutreachDone + row.totalOutreachDone,
      }),
      emptyData
    );

    const previousWeekTotals = previousWeekData.reduce(
      (acc, row) => ({
        linkedinConnectionsSent: acc.linkedinConnectionsSent + row.linkedinConnectionsSent,
        linkedinConnectionsAccepted: acc.linkedinConnectionsAccepted + row.linkedinConnectionsAccepted,
        linkedinOutreachSent: acc.linkedinOutreachSent + row.linkedinOutreachSent,
        whatsappLeadsFound: acc.whatsappLeadsFound + row.whatsappLeadsFound,
        whatsappOutreachDone: acc.whatsappOutreachDone + row.whatsappOutreachDone,
        whatsappFollowUpPending: acc.whatsappFollowUpPending + row.whatsappFollowUpPending,
        whatsappGreenSignal: acc.whatsappGreenSignal + row.whatsappGreenSignal,
        totalOutreachDone: acc.totalOutreachDone + row.totalOutreachDone,
      }),
      emptyData
    );

    // Calculate lifetime totals
    const lifetimeTotals = data.reduce(
      (acc, row) => ({
        linkedinConnectionsSent: acc.linkedinConnectionsSent + row.linkedinConnectionsSent,
        linkedinConnectionsAccepted: acc.linkedinConnectionsAccepted + row.linkedinConnectionsAccepted,
        linkedinOutreachSent: acc.linkedinOutreachSent + row.linkedinOutreachSent,
        whatsappLeadsFound: acc.whatsappLeadsFound + row.whatsappLeadsFound,
        whatsappOutreachDone: acc.whatsappOutreachDone + row.whatsappOutreachDone,
        whatsappFollowUpPending: acc.whatsappFollowUpPending + row.whatsappFollowUpPending,
        whatsappGreenSignal: acc.whatsappGreenSignal + row.whatsappGreenSignal,
        totalOutreachDone: acc.totalOutreachDone + row.totalOutreachDone,
      }),
      emptyData
    );

    // Calculate growth percentages
    const calculateGrowth = (current: number, previous: number) => {
      if (previous === 0) return current > 0 ? 100 : 0;
      return Math.round(((current - previous) / previous) * 100);
    };

    const todayGrowth = {
      linkedinConnections: calculateGrowth(todayData.linkedinConnectionsSent, previousDayData.linkedinConnectionsSent),
      linkedinAccepted: calculateGrowth(todayData.linkedinConnectionsAccepted, previousDayData.linkedinConnectionsAccepted),
      linkedinOutreach: calculateGrowth(todayData.linkedinOutreachSent, previousDayData.linkedinOutreachSent),
      whatsappLeads: calculateGrowth(todayData.whatsappLeadsFound, previousDayData.whatsappLeadsFound),
      whatsappOutreach: calculateGrowth(todayData.whatsappOutreachDone, previousDayData.whatsappOutreachDone),
      whatsappFollowUp: calculateGrowth(todayData.whatsappFollowUpPending, previousDayData.whatsappFollowUpPending),
      whatsappGreen: calculateGrowth(todayData.whatsappGreenSignal, previousDayData.whatsappGreenSignal),
      totalOutreach: calculateGrowth(todayData.totalOutreachDone, previousDayData.totalOutreachDone),
    };

    const weeklyGrowth = {
      linkedinConnections: calculateGrowth(weeklyTotals.linkedinConnectionsSent, previousWeekTotals.linkedinConnectionsSent),
      linkedinAccepted: calculateGrowth(weeklyTotals.linkedinConnectionsAccepted, previousWeekTotals.linkedinConnectionsAccepted),
      linkedinOutreach: calculateGrowth(weeklyTotals.linkedinOutreachSent, previousWeekTotals.linkedinOutreachSent),
      whatsappLeads: calculateGrowth(weeklyTotals.whatsappLeadsFound, previousWeekTotals.whatsappLeadsFound),
      whatsappOutreach: calculateGrowth(weeklyTotals.whatsappOutreachDone, previousWeekTotals.whatsappOutreachDone),
      whatsappFollowUp: calculateGrowth(weeklyTotals.whatsappFollowUpPending, previousWeekTotals.whatsappFollowUpPending),
      whatsappGreen: calculateGrowth(weeklyTotals.whatsappGreenSignal, previousWeekTotals.whatsappGreenSignal),
      totalOutreach: calculateGrowth(weeklyTotals.totalOutreachDone, previousWeekTotals.totalOutreachDone),
    };

    const newMetrics: OutreachMetrics = {
      linkedinConnectionsSent: {
        today: todayData.linkedinConnectionsSent,
        weekly: weeklyTotals.linkedinConnectionsSent,
        lifetime: lifetimeTotals.linkedinConnectionsSent,
      },
      linkedinConnectionsAccepted: {
        today: todayData.linkedinConnectionsAccepted,
        weekly: weeklyTotals.linkedinConnectionsAccepted,
        lifetime: lifetimeTotals.linkedinConnectionsAccepted,
      },
      linkedinOutreachSent: {
        today: todayData.linkedinOutreachSent,
        weekly: weeklyTotals.linkedinOutreachSent,
        lifetime: lifetimeTotals.linkedinOutreachSent,
      },
      whatsappLeadsFound: {
        today: todayData.whatsappLeadsFound,
        weekly: weeklyTotals.whatsappLeadsFound,
        lifetime: lifetimeTotals.whatsappLeadsFound,
      },
      whatsappOutreachDone: {
        today: todayData.whatsappOutreachDone,
        weekly: weeklyTotals.whatsappOutreachDone,
        lifetime: lifetimeTotals.whatsappOutreachDone,
      },
      whatsappFollowUpPending: {
        today: todayData.whatsappFollowUpPending,
        weekly: weeklyTotals.whatsappFollowUpPending,
        lifetime: lifetimeTotals.whatsappFollowUpPending,
      },
      whatsappGreenSignal: {
        today: todayData.whatsappGreenSignal,
        weekly: weeklyTotals.whatsappGreenSignal,
        lifetime: lifetimeTotals.whatsappGreenSignal,
      },
      totalOutreachDone: {
        today: todayData.totalOutreachDone,
        weekly: weeklyTotals.totalOutreachDone,
        lifetime: lifetimeTotals.totalOutreachDone,
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
        connections: row.linkedinConnectionsSent,
        messages: row.linkedinOutreachSent,
        replies: row.whatsappOutreachDone,
        meetings: row.totalOutreachDone,
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