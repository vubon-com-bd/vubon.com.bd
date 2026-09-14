/**
 * Support Core Schema
 * @module shared-schemas/support
 *
 * Support entity + aggregator।
 */

import { z } from 'zod';
import { BaseEntitySchema } from '../common/base/base-entity.schema';
import { UuidSchema } from '../common/primitives/uuid.schema';
import { TicketStatusSchema } from './ticket-status.schema';
import { TicketPrioritySchema } from './ticket-priority.schema';
import { TicketSchema } from './ticket.schema';
import { ConversationSchema } from './conversation.schema';
import { SupportMessageSchema } from './message.schema';

export const SupportSchema = BaseEntitySchema.extend({
  ticketId: UuidSchema.optional(),
  conversationId: UuidSchema.optional(),
  status: TicketStatusSchema,
  priority: TicketPrioritySchema,
  customerId: UuidSchema.optional(),
  assignedTo: UuidSchema.optional(),
  teamId: UuidSchema.optional(),
  firstResponseAt: z.string().datetime().optional(),
  resolvedAt: z.string().datetime().optional(),
  closedAt: z.string().datetime().optional(),
  isEscalated: z.boolean(),
  isReopened: z.boolean(),
});

export const SupportPublicSchema = SupportSchema.pick({
  id: true,
  ticketId: true,
  status: true,
  priority: true,
  createdAt: true,
  resolvedAt: true,
});

export const SupportOverviewSchema = z.object({
  tickets: z.array(TicketSchema).max(100),
  conversations: z.array(ConversationSchema).max(100),
  messages: z.array(SupportMessageSchema).max(500),
  generatedAt: z.string().datetime(),
});

export const SupportListFilterSchema = z.object({
  status: TicketStatusSchema.optional(),
  priority: TicketPrioritySchema.optional(),
  customerId: UuidSchema.optional(),
  assignedTo: UuidSchema.optional(),
  teamId: UuidSchema.optional(),
  isEscalated: z.boolean().optional(),
  isReopened: z.boolean().optional(),
  fromDate: z.string().datetime().optional(),
  toDate: z.string().datetime().optional(),
  search: z.string().max(200).optional(),
});

export type SupportSchemaType = z.infer<typeof SupportSchema>;
export type SupportPublicSchemaType = z.infer<typeof SupportPublicSchema>;
export type SupportOverviewSchemaType = z.infer<typeof SupportOverviewSchema>;
export type SupportListFilterSchemaType = z.infer<typeof SupportListFilterSchema>;
