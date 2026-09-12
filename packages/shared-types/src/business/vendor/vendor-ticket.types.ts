import { BaseEntity } from '../../common/base.types';
import { VENDOR_TICKET } from '@vubon/shared-constants/src/business/vendor/vendor-ticket.constants';
import { Vendor } from './vendor.types';

export interface VendorTicket extends BaseEntity {
  ticketId: string;
  vendorId: string;
  vendor: Vendor;
  status: keyof typeof VENDOR_TICKET.STATUS | string;
  priority: keyof typeof VENDOR_TICKET.TICKET_PRIORITY | string;
  subject: string;
  description: string;
  category: string;
  assignedTo?: string;
  resolvedAt?: Date;
  closedAt?: Date;
  reopenedAt?: Date;
  metadata: Record<string, unknown>;
}
