/**
 * ReopenTicketRequestDTO
 * @module support-service/application/dtos/requests/ticket
 */
export interface ReopenTicketRequestDTO {
  readonly ticketId: string;
  readonly reason: string;
  readonly reopenedBy?: string;
}
