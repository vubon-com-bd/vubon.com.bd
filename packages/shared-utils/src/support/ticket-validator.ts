import { TICKET_STATUS } from '@vubon/shared-constants/src/support/ticket-status.constants';

export interface TicketInput {
  subject: string;
  description: string;
  status: string;
  type: string;
  priority: string;
  isResolved: boolean;
}

export const validateTicket = (
  ticket: Partial<TicketInput>
): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  if (!ticket.subject) errors.push('Subject is required');
  if (!ticket.description) errors.push('Description is required');
  if (ticket.status && !Object.keys(TICKET_STATUS).includes(ticket.status)) {
    errors.push('Invalid ticket status');
  }
  return { isValid: errors.length === 0, errors };
};

export const isTicketOpen = (ticket: TicketInput): boolean => {
  return ticket.status === 'open' || ticket.status === 'in_progress';
};

export const isTicketResolved = (ticket: TicketInput): boolean => {
  return ticket.isResolved || ticket.status === 'resolved';
};
