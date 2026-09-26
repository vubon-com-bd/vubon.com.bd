/**
 * TicketPublicResponseDTO — Public projection (no internal fields)
 * @module support-service/application/dtos/responses
 *
 * Rule: exclude assignedTo, teamId, slaBreachedAt, satisfactionComment
 */
import type {
  TicketStatusValue,
  TicketPriorityValue,
  TicketTypeValue,
  TicketCategoryValue,
} from '@vubon/shared-types/support';

export interface TicketPublicResponseDTO {
  readonly id: string;
  readonly ticketNumber: string;
  readonly subject: string;
  readonly status: TicketStatusValue;
  readonly priority: TicketPriorityValue;
  readonly type: TicketTypeValue;
  readonly category: TicketCategoryValue;
  readonly createdAt: string;
  readonly resolvedAt?: string;
  readonly closedAt?: string;
}
