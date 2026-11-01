/**
 * Ticket Type Schema
 * @module shared-schemas/support
 *
 * Values আসে shared-constants/support/ticket.constants থেকে।
 */

import { z } from 'zod';
import { TICKET_TYPE } from '@vubon/shared-constants/support';

export const TicketTypeSchema = z.enum(Object.values(TICKET_TYPE) as [string, ...string[]]);

export type TicketTypeSchemaType = z.infer<typeof TicketTypeSchema>;
