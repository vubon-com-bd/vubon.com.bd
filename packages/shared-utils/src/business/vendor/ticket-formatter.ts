/**
 * Ticket Formatter — vendor-scoped names.
 */
export interface TicketFormatData {
  ticketId: string;
  subject: string;
  status: string;
  createdAt: Date;
}

export const formatTicketDate = (date: Date): string => new Date(date).toLocaleDateString('en-GB');

export const formatTicketSummary = (ticket: TicketFormatData): string =>
  `#${ticket.ticketId} | ${ticket.subject} | ${ticket.status} | ${formatTicketDate(ticket.createdAt)}`;

export const formatTicketStatus = (status: string): string =>
  status.charAt(0).toUpperCase() + status.slice(1);
