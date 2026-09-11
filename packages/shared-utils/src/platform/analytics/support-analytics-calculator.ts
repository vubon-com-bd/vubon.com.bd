export interface SupportAnalyticsData {
  status: string;
  isEscalated?: boolean;
  isReopened?: boolean;
}

export interface SupportAnalyticsResult {
  totalTickets: number;
  openTickets: number;
  resolvedTickets: number;
  averageResponseTime: number;
  averageResolutionTime: number;
  satisfactionScore: number;
  escalationRate: number;
  reopenRate: number;
}

export const calculateSupportAnalytics = (
  tickets: SupportAnalyticsData[]
): SupportAnalyticsResult => {
  const totalTickets = tickets.length;
  const openTickets = tickets.filter(
    (t) => t.status === 'open' || t.status === 'in_progress'
  ).length;
  const resolvedTickets = tickets.filter(
    (t) => t.status === 'resolved' || t.status === 'closed'
  ).length;
  const escalated = tickets.filter((t) => t.isEscalated).length;
  const reopened = tickets.filter((t) => t.isReopened).length;
  return {
    totalTickets,
    openTickets,
    resolvedTickets,
    averageResponseTime: 0,
    averageResolutionTime: 0,
    satisfactionScore: 0,
    escalationRate: totalTickets > 0 ? (escalated / totalTickets) * 100 : 0,
    reopenRate: resolvedTickets > 0 ? (reopened / resolvedTickets) * 100 : 0,
  };
};
