/**
 * Ticket Core Schema
 * @module shared-schemas/support
 *
 * Ticket entity + aggregator।
 */

import { z } from 'zod';
import { BaseEntitySchema } from '../common/base/base-entity.schema';
import { UuidSchema } from '../common/primitives/uuid.schema';
import { EmailSchema } from '../common/primitives/email.schema';
import { TICKET } from '@vubon/shared-constants/support';
import { TicketStatusSchema } from './ticket-status.schema';
import { TicketPrioritySchema } from './ticket-priority.schema';
import { TicketTypeSchema } from './ticket-type.schema';
import { TicketChannelSchema } from './ticket-channel.schema';
import { TicketCategorySchema } from './ticket-category.schema';

export const TicketSchema = BaseEntitySchema.extend({
  ticketNumber: z.string().min(1).max(50),
  subject: z.string().min(1).max(TICKET.SUBJECT_MAX_LENGTH),
  description: z.string().min(1).max(TICKET.DESCRIPTION_MAX_LENGTH),
  status: TicketStatusSchema,
  priority: TicketPrioritySchema,
  type: TicketTypeSchema,
  channel: TicketChannelSchema,
  category: TicketCategorySchema,
  customerId: UuidSchema.optional(),
  customerEmail: EmailSchema.optional(),
  customerName: z.string().max(150).optional(),
  assignedTo: UuidSchema.optional(),
  teamId: UuidSchema.optional(),
  orderId: UuidSchema.optional(),
  productId: UuidSchema.optional(),
  tags: z.array(z.string().max(50)).max(TICKET.MAX_TAGS).optional(),
  watchers: z.array(UuidSchema).max(TICKET.MAX_WATCHERS).optional(),
  attachments: z.array(z.string().url()).max(TICKET.MAX_ATTACHMENTS).optional(),
  firstResponseAt: z.string().datetime().optional(),
  resolvedAt: z.string().datetime().optional(),
  closedAt: z.string().datetime().optional(),
  reopenedAt: z.string().datetime().optional(),
  dueAt: z.string().datetime().optional(),
  slaBreachedAt: z.string().datetime().optional(),
  satisfactionRating: z.number().int().min(1).max(5).optional(),
  satisfactionComment: z.string().max(2000).optional(),
});

export const TicketPublicSchema = TicketSchema.pick({
  id: true,
  ticketNumber: true,
  subject: true,
  status: true,
  priority: true,
  type: true,
  category: true,
  createdAt: true,
  resolvedAt: true,
  closedAt: true,
});

export const TicketSummarySchema = TicketSchema.pick({
  id: true,
  ticketNumber: true,
  subject: true,
  status: true,
  priority: true,
  customerName: true,
  createdAt: true,
});

export const TicketCreateInputSchema = z
  .object({
    subject: z.string().trim().min(1).max(TICKET.SUBJECT_MAX_LENGTH),
    description: z.string().trim().min(1).max(TICKET.DESCRIPTION_MAX_LENGTH),
    type: TicketTypeSchema,
    priority: TicketPrioritySchema,
    channel: TicketChannelSchema,
    category: TicketCategorySchema,
    customerEmail: EmailSchema.optional(),
    customerName: z.string().max(150).optional(),
    orderId: UuidSchema.optional(),
    productId: UuidSchema.optional(),
    attachments: z.array(z.string().url()).max(TICKET.MAX_ATTACHMENTS).optional(),
    tags: z.array(z.string().max(50)).max(TICKET.MAX_TAGS).optional(),
  })
  .strict();

export const TicketListFilterSchema = z.object({
  status: TicketStatusSchema.optional(),
  priority: TicketPrioritySchema.optional(),
  type: TicketTypeSchema.optional(),
  channel: TicketChannelSchema.optional(),
  category: TicketCategorySchema.optional(),
  assignedTo: UuidSchema.optional(),
  customerId: UuidSchema.optional(),
  teamId: UuidSchema.optional(),
  fromDate: z.string().datetime().optional(),
  toDate: z.string().datetime().optional(),
  slaBreached: z.boolean().optional(),
  search: z.string().max(200).optional(),
});

export type TicketSchemaType = z.infer<typeof TicketSchema>;
export type TicketPublicSchemaType = z.infer<typeof TicketPublicSchema>;
export type TicketSummarySchemaType = z.infer<typeof TicketSummarySchema>;
export type TicketCreateInputSchemaType = z.infer<typeof TicketCreateInputSchema>;
export type TicketListFilterSchemaType = z.infer<typeof TicketListFilterSchema>;
