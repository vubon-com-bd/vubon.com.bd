/**
 * Ticket Channel Value Types
 * @module shared-types/support
 */

import type { TICKET_CHANNEL } from '@vubon/shared-constants/support';

export type TicketChannelValue = (typeof TICKET_CHANNEL)[keyof typeof TICKET_CHANNEL];

export interface TicketChannelMetadata {
  readonly value: TicketChannelValue;
  readonly label: string;
  readonly isAsync: boolean;
  readonly isRealtime: boolean;
}
