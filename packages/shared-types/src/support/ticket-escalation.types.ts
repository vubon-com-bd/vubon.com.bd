import { BaseEntity } from '../common/base.types';
import { TICKET_ESCALATION } from '@vubon/shared-constants/src/support/ticket-escalation.constants';
import { Ticket } from './ticket.types';

export interface TicketEscalation extends BaseEntity {
  escalationId: string;
  ticketId: string;
  ticket: Ticket;
  status: keyof typeof TICKET_ESCALATION.STATUS | string;
  level: keyof typeof TICKET_ESCALATION.ESCALATION_LEVELS | string;
  trigger: keyof typeof TICKET_ESCALATION.ESCALATION_TRIGGERS | string;
  reason: string;
  escalatedBy: string;
  escalatedTo: string;
  escalatedAt: Date;
  approvedAt?: Date;
  rejectedAt?: Date;
  rejectedReason?: string;
  resolvedAt?: Date;
  metadata: Record<string, unknown>;
}
