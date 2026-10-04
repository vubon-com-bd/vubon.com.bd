/**
 * Ticket Priority Value Types
 * @module shared-types/support
 */

import type { TICKET_PRIORITY, TICKET_PRIORITY_WEIGHT } from '@vubon/shared-constants/support';

export type TicketPriorityValue = (typeof TICKET_PRIORITY)[keyof typeof TICKET_PRIORITY];

export type TicketPriorityWeight = typeof TICKET_PRIORITY_WEIGHT;

export interface TicketPriorityMetadata {
  readonly value: TicketPriorityValue;
  readonly weight: number;
  readonly label: string;
  readonly slaMinutes: number;
}
