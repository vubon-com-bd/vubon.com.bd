/**
 * Ticket Category Schema
 * @module shared-schemas/support
 *
 * Values আসে shared-constants/support/ticket.constants থেকে।
 */

import { z } from 'zod';
import { TICKET_CATEGORY } from '@vubon/shared-constants/support';

export const TicketCategorySchema = z.enum(Object.values(TICKET_CATEGORY) as [string, ...string[]]);

export type TicketCategorySchemaType = z.infer<typeof TicketCategorySchema>;
