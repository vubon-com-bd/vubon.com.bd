export const formatDate = (date: Date): string => {
  return new Date(date).toLocaleDateString('en-GB');
};

export interface TicketFormatData {
  ticketId: string;
  subject: string;
  status: string;
  createdAt: Date;
}

export const formatTicketSummary = (ticket: TicketFormatData): string => {
  return `#${ticket.ticketId} | ${ticket.subject} | ${ticket.status} | ${formatDate(ticket.createdAt)}`;
};

export const formatTicketStatus = (status: string): string => {
  return status.charAt(0).toUpperCase() + status.slice(1);
};
