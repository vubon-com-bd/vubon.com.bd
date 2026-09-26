/**
 * CreateTicketRequestDTO
 * @module support-service/application/dtos/requests/ticket
 *
 * Registry: DTO has shape only; validation in shared-schemas/support
 * Rule: no logic, no framework decorator, matches TicketCreateInputSchema
 */
import type {
  TicketTypeValue,
  TicketPriorityValue,
  TicketChannelValue,
  TicketCategoryValue,
} from '@vubon/shared-types/support';

export interface CreateTicketRequestDTO {
  readonly subject: string;
  readonly description: string;
  readonly type: TicketTypeValue;
  readonly priority: TicketPriorityValue;
  readonly channel: TicketChannelValue;
  readonly category: TicketCategoryValue;
  readonly customerId?: string;
  readonly customerEmail?: string;
  readonly customerName?: string;
  readonly orderId?: string;
  readonly productId?: string;
  readonly attachments?: readonly string[];
  readonly tags?: readonly string[];
}
