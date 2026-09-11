import { VENDOR_TICKET } from '@vubon/shared-constants/src/business/vendor/vendor-ticket.constants';

export interface TicketInput {
  vendorId: string;
  subject: string;
  description: string;
  status: string;
  priority: string;
}

export const validateVendorTicket = (
  ticket: Partial<TicketInput>
): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  if (!ticket.vendorId) errors.push('Vendor ID is required');
  if (!ticket.subject) errors.push('Subject is required');
  if (!ticket.description) errors.push('Description is required');
  if (ticket.status && !Object.keys(VENDOR_TICKET.STATUS).includes(ticket.status)) {
    errors.push('Invalid ticket status');
  }
  if (ticket.priority && !Object.keys(VENDOR_TICKET.TICKET_PRIORITY).includes(ticket.priority)) {
    errors.push('Invalid ticket priority');
  }
  return { isValid: errors.length === 0, errors };
};
