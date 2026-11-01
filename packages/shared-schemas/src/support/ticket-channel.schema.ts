/**
 * Ticket Channel Schema
 * @module shared-schemas/support
 *
 * Values আসে shared-constants/support/ticket.constants থেকে।
 */

import { z } from 'zod';
import { TICKET_CHANNEL } from '@vubon/shared-constants/support';

export const TicketChannelSchema = z.enum(Object.values(TICKET_CHANNEL) as [string, ...string[]]);

export type TicketChannelSchemaType = z.infer<typeof TicketChannelSchema>;
