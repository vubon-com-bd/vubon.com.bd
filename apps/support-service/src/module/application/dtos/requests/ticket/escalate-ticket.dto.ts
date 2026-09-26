/**
 * EscalateTicketRequestDTO
 * @module support-service/application/dtos/requests/ticket
 */
export interface EscalateTicketRequestDTO {
  readonly ticketId: string;
  readonly reason: string;
  readonly level?: '1' | '2' | '3' | '4';
  readonly escalatedBy?: string;
}
