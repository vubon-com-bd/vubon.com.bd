/**
 * Ticket Status Value Types
 * @module shared-types/support
 *
 * Values আসে shared-constants/support/ticket.constants থেকে।
 */

import type { TICKET_STATUS } from '@vubon/shared-constants/support';

export type TicketStatusValue = (typeof TICKET_STATUS)[keyof typeof TICKET_STATUS];

export interface TicketStatusMetadata {
  readonly value: TicketStatusValue;
  readonly label: string;
  readonly isFinal: boolean;
  readonly isOpen: boolean;
}
