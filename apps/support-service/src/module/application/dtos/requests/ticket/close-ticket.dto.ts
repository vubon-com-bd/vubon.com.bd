/**
 * CloseTicketRequestDTO
 * @module support-service/application/dtos/requests/ticket
 */
export interface CloseTicketRequestDTO {
  readonly ticketId: string;
  readonly closingNote?: string;
  readonly closedBy?: string;
}
