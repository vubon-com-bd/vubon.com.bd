import { StatusObject } from '../common/status.types';
import { TICKET_STATUS } from '@vubon/shared-constants/src/support/ticket-status.constants';

export interface TicketStatus extends StatusObject {
  type: keyof typeof TICKET_STATUS | string;
  category: 'ticket';
  isOpen: boolean;
  isInProgress: boolean;
  isOnHold: boolean;
  isPendingCustomer: boolean;
  isPendingAgent: boolean;
  isResolved: boolean;
  isClosed: boolean;
  isReopened: boolean;
  isEscalated: boolean;
  isAssigned: boolean;
  isUnassigned: boolean;
}

export type TicketStatusKey = keyof typeof TICKET_STATUS;
