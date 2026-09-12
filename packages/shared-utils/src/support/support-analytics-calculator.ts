export interface TicketAnalyticsData {
  status: string;
  isEscalated: boolean;
  isReopened: boolean;
  createdAt: Date;
  resolvedAt?: Date;
}

export interface SupportMetrics {
  total: number;
  open: number;
  resolved: number;
  responseTime: number;
  resolutionTime: number;
  satisfactionScore: number;
  escalationRate: number;
  reopenRate: number;
}

const calculateSupportAverage = (values: number[]): number => {
  if (values.length === 0) return 0;
  const sum = values.reduce((a, b) => a + b, 0);
  return sum / values.length;
};

const calculateSupportPercentage = (value: number, total: number): number => {
  if (total === 0) return 0;
  return (value / total) * 100;
};

export const calculateSupportMetrics = (tickets: TicketAnalyticsData[]): SupportMetrics => {
  const total = tickets.length;
  const open = tickets.filter((t) => t.status === 'open' || t.status === 'in_progress').length;
  const resolved = tickets.filter((t) => t.status === 'resolved' || t.status === 'closed').length;
  const escalated = tickets.filter((t) => t.isEscalated).length;
  const reopened = tickets.filter((t) => t.isReopened).length;
  const responseTimes = tickets
    .filter((t) => t.resolvedAt)
    .map(
      (t) => (new Date(t.resolvedAt!).getTime() - new Date(t.createdAt).getTime()) / (1000 * 60)
    );
  return {
    total,
    open,
    resolved,
    responseTime: calculateSupportAverage(responseTimes),
    resolutionTime: calculateSupportAverage(responseTimes),
    satisfactionScore: 0,
    escalationRate: calculateSupportPercentage(escalated, total),
    reopenRate: calculateSupportPercentage(reopened, resolved),
  };
};
