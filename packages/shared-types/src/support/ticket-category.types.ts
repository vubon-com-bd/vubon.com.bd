/**
 * Ticket Category Value Types
 * @module shared-types/support
 */

import type { TICKET_CATEGORY } from '@vubon/shared-constants/support';

export type TicketCategoryValue = (typeof TICKET_CATEGORY)[keyof typeof TICKET_CATEGORY];

export interface TicketCategoryMetadata {
  readonly value: TicketCategoryValue;
  readonly label: string;
  readonly defaultTeamId?: string;
  readonly defaultSlaHours: number;
}
