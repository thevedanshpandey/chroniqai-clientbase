// Mock data for the LinkedIn Outreach Dashboard
export const mockMetrics = {
  connectionsSent: { today: 25, weekly: 175, lifetime: 2840 },
  connectionsAccepted: { today: 8, weekly: 52, lifetime: 1136 },
  messagesSent: { today: 12, weekly: 84, lifetime: 1890 },
  messagesSeen: { today: 9, weekly: 63, lifetime: 1420 },
  repliesReceived: { today: 3, weekly: 21, lifetime: 445 },
  meetingsBooked: { today: 1, weekly: 7, lifetime: 123 },
};

export const mockTrendData = [
  { date: "2024-01-01", connections: 20, messages: 15, replies: 4, meetings: 1 },
  { date: "2024-01-02", connections: 23, messages: 18, replies: 5, meetings: 2 },
  { date: "2024-01-03", connections: 19, messages: 12, replies: 3, meetings: 0 },
  { date: "2024-01-04", connections: 28, messages: 22, replies: 6, meetings: 1 },
  { date: "2024-01-05", connections: 25, messages: 20, replies: 4, meetings: 2 },
  { date: "2024-01-06", connections: 30, messages: 25, replies: 7, meetings: 3 },
  { date: "2024-01-07", connections: 22, messages: 16, replies: 3, meetings: 1 },
];

export const mockFunnelData = [
  { stage: "Requests Sent", value: 175, color: "#00d4ff" },
  { stage: "Accepted", value: 52, color: "#00ff88" },
  { stage: "Messages Sent", value: 84, color: "#8b5cf6" },
  { stage: "Replies", value: 21, color: "#ff4444" },
  { stage: "Meetings", value: 7, color: "#fbbf24" },
];

export const mockMessageStatusData = [
  { name: "Seen", value: 63, color: "#00ff88" },
  { name: "Not Seen", value: 21, color: "#374151" },
];

export const mockComparisonData = [
  { period: "Today", connections: 25, messages: 12, replies: 3 },
  { period: "Yesterday", connections: 22, messages: 16, replies: 3 },
  { period: "This Week", connections: 175, messages: 84, replies: 21 },
  { period: "Last Week", connections: 168, messages: 79, replies: 18 },
];

export const calculateRates = () => {
  const { connectionsSent, connectionsAccepted, messagesSent, repliesReceived, meetingsBooked } = mockMetrics;
  
  return {
    acceptanceRate: Math.round((connectionsAccepted.weekly / connectionsSent.weekly) * 100),
    replyRate: Math.round((repliesReceived.weekly / messagesSent.weekly) * 100),
    meetingRate: Math.round((meetingsBooked.weekly / repliesReceived.weekly) * 100),
  };
};