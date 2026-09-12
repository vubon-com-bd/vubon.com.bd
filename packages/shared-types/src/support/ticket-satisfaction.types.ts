import { BaseEntity } from '../common/base.types';
import { TICKET_SATISFACTION } from '@vubon/shared-constants/src/support/ticket-satisfaction.constants';
import { Ticket } from './ticket.types';

export interface TicketSatisfaction extends BaseEntity {
  satisfactionId: string;
  ticketId: string;
  ticket: Ticket;
  rating: keyof typeof TICKET_SATISFACTION.TYPES | string;
  score: keyof typeof TICKET_SATISFACTION.SATISFACTION_SCORES | string;
  comment?: string;
  agentId?: string;
  feedback: string[];
  isGood: boolean;
  isExcellent: boolean;
  submittedAt: Date;
  metadata: Record<string, unknown>;
}
