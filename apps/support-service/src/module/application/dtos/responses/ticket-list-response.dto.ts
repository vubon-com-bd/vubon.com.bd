import type { TicketPublicResponseDTO } from './ticket-public-response.dto';

export interface TicketListResponseDTO {
  readonly items: readonly TicketPublicResponseDTO[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
}
