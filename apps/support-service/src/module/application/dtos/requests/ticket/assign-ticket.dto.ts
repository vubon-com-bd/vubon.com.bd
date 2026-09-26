/**
 * AssignTicketRequestDTO
 * @module support-service/application/dtos/requests/ticket
 */
export interface AssignTicketRequestDTO {
  readonly ticketId: string;
  readonly agentId: string;
  readonly teamId?: string;
  readonly reason?: string;
}
