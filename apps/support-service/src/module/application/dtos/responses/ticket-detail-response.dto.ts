import type { TicketResponseDTO } from './ticket-response.dto';

export interface TicketDetailResponseDTO extends TicketResponseDTO {
  readonly messageCount: number;
  readonly attachmentCount: number;
  readonly escalationCount: number;
  readonly satisfactionScore: number | null;
}
