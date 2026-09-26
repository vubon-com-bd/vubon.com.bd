/**
 * TicketDetailResponseDTO — Detailed ticket view (admin/agent)
 * @module support-service/application/dtos/responses
 */
import type { TicketResponseDTO } from './ticket-response.dto';

export interface TicketDetailResponseDTO extends TicketResponseDTO {
  readonly internalNoteCount: number;
  readonly messageCount: number;
  readonly attachmentCount: number;
  readonly escalationCount: number;
  readonly slaStatus?: string;
  readonly ageMinutes: number;
}
