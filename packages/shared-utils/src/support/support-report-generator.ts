import { calculateSupportMetrics } from './support-analytics-calculator';
import type { TicketAnalyticsData } from './support-analytics-calculator';

const generateReportId = (prefix: string, length: number): string => {
  const random = Math.random()
    .toString(36)
    .substring(2, 2 + length)
    .toUpperCase();
  return `${prefix}-${random}`;
};

export interface SupportReportData {
  reportId: string;
  type: string;
  format: string;
  analytics: unknown[];
  summary: {
    totalTickets: number;
    openTickets: number;
    resolvedTickets: number;
    averageResponseTime: number;
    averageResolutionTime: number;
    satisfactionScore: number;
    escalationRate: number;
    reopenRate: number;
  };
  insights: unknown[];
  recommendations: string[];
  generatedAt: Date;
  metadata: Record<string, unknown>;
}

export const generateSupportReport = (
  tickets: TicketAnalyticsData[],
  type: string
): SupportReportData => {
  const metrics = calculateSupportMetrics(tickets);
  return {
    reportId: generateReportId('SRPT', 12),
    type,
    format: 'pdf',
    analytics: [],
    summary: {
      totalTickets: metrics.total,
      openTickets: metrics.open,
      resolvedTickets: metrics.resolved,
      averageResponseTime: metrics.responseTime,
      averageResolutionTime: metrics.resolutionTime,
      satisfactionScore: metrics.satisfactionScore,
      escalationRate: metrics.escalationRate,
      reopenRate: metrics.reopenRate,
    },
    insights: [],
    recommendations: [],
    generatedAt: new Date(),
    metadata: {},
  };
};
