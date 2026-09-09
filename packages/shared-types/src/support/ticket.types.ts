import { BaseEntity } from '../common/base.types';
import { User } from '../user/user.types';
import { Vendor } from '../business/vendor/vendor.types';
import { Order } from '../business/checkout/order.types';
import { TICKET_STATUS } from '@vubon/shared-constants/src/support/ticket-status.constants';
import { TicketPriority } from './ticket-priority.types';
import { TicketType } from './ticket-type.types';
import { TicketChannel } from './ticket-channel.types';
import { TicketCategory } from './ticket-category.types';
import { TicketEscalation } from './ticket-escalation.types';
import { Conversation } from './conversation.types';
import { Attachment } from './attachment.types';

export interface TicketMetadata {
  ipAddress?: string;
  userAgent?: string;
  deviceId?: string;
  sessionId?: string;
  browser?: string;
  os?: string;
  language?: string;
  timezone?: string;
}

export interface Ticket extends BaseEntity {
  ticketId: string;
  ticketNumber: string;
  subject: string;
  description: string;
  status: keyof typeof TICKET_STATUS | string;
  priority: TicketPriority;
  type: TicketType;
  channel: TicketChannel;
  category: TicketCategory;
  userId: string;
  user: User;
  vendorId?: string;
  vendor?: Vendor;
  orderId?: string;
  order?: Order;
  assignedTo?: string;
  assignedToUser?: User;
  escalation: TicketEscalation;
  conversation: Conversation;
  attachments: Attachment[];
  isResolved: boolean;
  isClosed: boolean;
  isReopened: boolean;
  isEscalated: boolean;
  resolvedAt?: Date;
  closedAt?: Date;
  reopenedAt?: Date;
  escalatedAt?: Date;
  metadata: TicketMetadata;
}
