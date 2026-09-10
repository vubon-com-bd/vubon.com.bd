import { z } from 'zod';
import { BaseSchema } from '../common/base.schema';
import { UserSchema } from '../user/user.schema';
import { VendorSchema } from '../business/vendor/vendor.schema';
import { OrderSchema } from '../business/checkout/order.schema';
import { TicketPrioritySchema } from './ticket-priority.schema';
import { TicketTypeSchema } from './ticket-type.schema';
import { TicketChannelSchema } from './ticket-channel.schema';
import { TicketCategorySchema } from './ticket-category.schema';
import { TicketEscalationSchema } from './ticket-escalation.schema';
import { ConversationSchema } from './conversation.schema';
import { AttachmentSchema } from './attachment.schema';
import { TICKET_STATUS } from '@vubon/shared-constants/src/support/ticket-status.constants';

const ticketStatusKeys = Object.keys(TICKET_STATUS) as [string, ...string[]];

export const TicketSchema = BaseSchema.extend({
  ticketId: z.string().uuid(),
  ticketNumber: z.string().min(1).max(50),
  subject: z.string().min(1).max(255),
  description: z.string().min(10).max(5000),
  status: z.enum(ticketStatusKeys),
  priority: TicketPrioritySchema,
  type: TicketTypeSchema,
  channel: TicketChannelSchema,
  category: TicketCategorySchema,
  userId: z.string().uuid(),
  user: UserSchema,
  vendorId: z.string().uuid().optional(),
  vendor: VendorSchema.optional(),
  orderId: z.string().uuid().optional(),
  order: OrderSchema.optional(),
  assignedTo: z.string().uuid().optional(),
  assignedToUser: UserSchema.optional(),
  escalation: TicketEscalationSchema,
  conversation: ConversationSchema,
  attachments: z.array(AttachmentSchema),
  isResolved: z.boolean().default(false),
  isClosed: z.boolean().default(false),
  isReopened: z.boolean().default(false),
  isEscalated: z.boolean().default(false),
  resolvedAt: z.date().optional(),
  closedAt: z.date().optional(),
  reopenedAt: z.date().optional(),
  escalatedAt: z.date().optional(),
  metadata: z.object({
    ipAddress: z.string().optional(),
    userAgent: z.string().optional(),
    deviceId: z.string().optional(),
    sessionId: z.string().optional(),
    browser: z.string().optional(),
    os: z.string().optional(),
    language: z.string().optional(),
    timezone: z.string().optional(),
  }),
});

export const TicketCreateSchema = TicketSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  ticketNumber: true,
  isResolved: true,
  isClosed: true,
  isReopened: true,
  isEscalated: true,
  resolvedAt: true,
  closedAt: true,
  reopenedAt: true,
  escalatedAt: true,
});

export const TicketUpdateSchema = TicketCreateSchema.partial();
