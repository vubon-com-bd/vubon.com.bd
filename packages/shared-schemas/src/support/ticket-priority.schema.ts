/**
 * Ticket Priority Schema
 * @module shared-schemas/support
 *
 * Values আসে shared-constants/support/ticket.constants থেকে।
 */

import { z } from 'zod';
import { TICKET_PRIORITY } from '@vubon/shared-constants/support';

export const TicketPrioritySchema = z.enum(Object.values(TICKET_PRIORITY) as [string, ...string[]]);

export type TicketPrioritySchemaType = z.infer<typeof TicketPrioritySchema>;
