/**
 * UpdateTicketRequestDTO
 * @module support-service/application/dtos/requests/ticket
 */
import type {
  TicketStatusValue,
  TicketPriorityValue,
  TicketCategoryValue,
} from '@vubon/shared-types/support';

export interface UpdateTicketRequestDTO {
  readonly subject?: string;
  readonly description?: string;
  readonly status?: TicketStatusValue;
  readonly priority?: TicketPriorityValue;
  readonly category?: TicketCategoryValue;
  readonly assignedTo?: string;
  readonly teamId?: string;
  readonly tags?: readonly string[];
}
