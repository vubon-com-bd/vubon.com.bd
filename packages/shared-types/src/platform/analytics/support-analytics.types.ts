import { BaseEntity } from '../../common/base.types';
import { Ticket } from '../../support/ticket.types';
import { SUPPORT_ANALYTICS } from '@vubon/shared-constants/src/support/support-analytics.constants';

export interface PlatformSupportAnalytics extends BaseEntity {
  analyticsId: string;
  ticketId: string;
  ticket: Ticket;
  type: keyof typeof SUPPORT_ANALYTICS.TYPES | string;
  metric: keyof typeof SUPPORT_ANALYTICS.METRICS | string;
  value: number;
  agentPerformance: string;
  timestamp: Date;
  metadata: Record<string, unknown>;
}
