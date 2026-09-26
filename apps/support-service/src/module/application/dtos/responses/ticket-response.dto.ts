/**
 * TicketResponseDTO — Full ticket projection
 * @module support-service/application/dtos/responses
 *
 * Rule: no sensitive fields in public DTOs
 */
import type {
  TicketStatusValue,
  TicketPriorityValue,
  TicketTypeValue,
  TicketChannelValue,
  TicketCategoryValue,
} from '@vubon/shared-types/support';

export interface TicketResponseDTO {
  readonly id: string;
  readonly ticketNumber: string;
  readonly subject: string;
  readonly description: string;
  readonly status: TicketStatusValue;
  readonly priority: TicketPriorityValue;
  readonly type: TicketTypeValue;
  readonly channel: TicketChannelValue;
  readonly category: TicketCategoryValue;
  readonly customerId?: string;
  readonly customerEmail?: string;
  readonly customerName?: string;
  readonly assignedTo?: string;
  readonly teamId?: string;
  readonly orderId?: string;
  readonly productId?: string;
  readonly tags?: readonly string[];
  readonly watchers?: readonly string[];
  readonly attachments?: readonly string[];
  readonly firstResponseAt?: string;
  readonly resolvedAt?: string;
  readonly closedAt?: string;
  readonly reopenedAt?: string;
  readonly dueAt?: string;
  readonly slaBreachedAt?: string;
  readonly satisfactionRating?: number;
  readonly satisfactionComment?: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}
