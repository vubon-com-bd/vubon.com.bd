/**
 * ResolveTicketRequestDTO
 * @module support-service/application/dtos/requests/ticket
 */
export interface ResolveTicketRequestDTO {
  readonly ticketId: string;
  readonly resolutionNote?: string;
  readonly resolvedBy?: string;
}
