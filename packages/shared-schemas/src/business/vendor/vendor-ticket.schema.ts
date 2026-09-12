import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { VENDOR_TICKET } from '@vubon/shared-constants/src/business/vendor/vendor-ticket.constants';

const vendorTicketStatusKeys = Object.keys(VENDOR_TICKET.STATUS) as [string, ...string[]];
const vendorTicketPriorityKeys = Object.keys(VENDOR_TICKET.TICKET_PRIORITY) as [
  string,
  ...string[],
];

export const VendorTicketSchema = BaseSchema.extend({
  ticketId: z.string().uuid(),
  vendorId: z.string().uuid(),
  status: z.enum(vendorTicketStatusKeys),
  priority: z.enum(vendorTicketPriorityKeys),
  subject: z.string().min(1).max(200),
  description: z.string().min(10).max(5000),
  category: z.string(),
  assignedTo: z.string().uuid().optional(),
  resolvedAt: z.date().optional(),
  closedAt: z.date().optional(),
  reopenedAt: z.date().optional(),
  metadata: z.record(z.unknown()).optional(),
});
