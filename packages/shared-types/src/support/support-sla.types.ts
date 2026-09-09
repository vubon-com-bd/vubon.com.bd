import { BaseEntity } from '../common/base.types';
import { SUPPORT_SLA } from '@vubon/shared-constants/src/support/support-sla.constants';
import { TicketPriority } from './ticket-priority.types';

export interface SupportSla extends BaseEntity {
  slaId: string;
  name: string;
  description?: string;
  type: keyof typeof SUPPORT_SLA.TYPES | string;
  priority: TicketPriority;
  responseTimeTarget: number;
  resolutionTimeTarget: number;
  firstResponseTimeTarget: number;
  penaltyRate: number;
  breachNotifyMinutes: number;
  escalationMinutes: number;
  isActive: boolean;
  isDefault: boolean;
  metadata: Record<string, unknown>;
}
