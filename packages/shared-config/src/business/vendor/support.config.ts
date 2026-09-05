/**
 * Support Config
 * সাপোর্ট কনফিগারেশন
 */

export interface SupportConfig {
  enabled: boolean;
  types: {
    support: string;
    complaint: string;
    inquiry: string;
    request: string;
    issue: string;
  };
  priorities: {
    low: string;
    medium: string;
    high: string;
    critical: string;
  };
  status: {
    open: string;
    in_progress: string;
    pending: string;
    resolved: string;
    closed: string;
    escalated: string;
  };
  responseTime: number;
  maxTickets: number;
  autoAssign: boolean;
  defaults: {
    responseTime: number;
    maxTickets: number;
  };
}

export const supportConfig: SupportConfig = {
  enabled: true,

  types: {
    support: 'support',
    complaint: 'complaint',
    inquiry: 'inquiry',
    request: 'request',
    issue: 'issue',
  },

  priorities: {
    low: 'low',
    medium: 'medium',
    high: 'high',
    critical: 'critical',
  },

  status: {
    open: 'open',
    in_progress: 'in_progress',
    pending: 'pending',
    resolved: 'resolved',
    closed: 'closed',
    escalated: 'escalated',
  },

  responseTime: 24,
  maxTickets: 10,
  autoAssign: true,

  defaults: {
    responseTime: 24,
    maxTickets: 10,
  },
} as const;

export type SupportConfigType = typeof supportConfig;
