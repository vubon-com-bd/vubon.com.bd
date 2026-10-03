/**
 * Ticket Status Schema
 * @module shared-schemas/support
 *
 * Values আসে shared-constants/support/ticket.constants থেকে।
 */

import { z } from 'zod';
import { TICKET_STATUS } from '@vubon/shared-constants/support';

export const TicketStatusSchema = z.enum(Object.values(TICKET_STATUS) as [string, ...string[]]);

export type TicketStatusSchemaType = z.infer<typeof TicketStatusSchema>;
