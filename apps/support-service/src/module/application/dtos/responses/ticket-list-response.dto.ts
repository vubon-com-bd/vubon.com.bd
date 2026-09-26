/**
 * TicketListResponseDTO — Paginated ticket list item
 * @module support-service/application/dtos/responses
 */
import type {
  TicketStatusValue,
  TicketPriorityValue,
  TicketTypeValue,
} from '@vubon/shared-types/support';

export interface TicketListItemResponseDTO {
  readonly id: string;
  readonly ticketNumber: string;
  readonly subject: string;
  readonly status: TicketStatusValue;
  readonly priority: TicketPriorityValue;
  readonly type: TicketTypeValue;
  readonly customerName?: string;
  readonly assignedTo?: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export interface TicketListResponseDTO {
  readonly items: readonly TicketListItemResponseDTO[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}
