/**
 * Ticket Type Value Types
 * @module shared-types/support
 */

import type { TICKET_TYPE } from '@vubon/shared-constants/support';

export type TicketTypeValue = (typeof TICKET_TYPE)[keyof typeof TICKET_TYPE];

export interface TicketTypeMetadata {
  readonly value: TicketTypeValue;
  readonly label: string;
  readonly requiresOrder: boolean;
  readonly requiresProduct: boolean;
}
