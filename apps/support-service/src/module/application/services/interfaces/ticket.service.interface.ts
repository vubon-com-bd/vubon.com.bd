/**
 * TicketServiceInterface — service contract
 * @module support-service/application/services/interfaces
 *
 * Rule: interface only, no implementation details
 */
import type { CreateTicketRequestDTO } from '../../dtos/requests/ticket/create-ticket.dto';
import type { UpdateTicketRequestDTO } from '../../dtos/requests/ticket/update-ticket.dto';
import type { AssignTicketRequestDTO } from '../../dtos/requests/ticket/assign-ticket.dto';
import type { EscalateTicketRequestDTO } from '../../dtos/requests/ticket/escalate-ticket.dto';
import type { ResolveTicketRequestDTO } from '../../dtos/requests/ticket/resolve-ticket.dto';
import type { CloseTicketRequestDTO } from '../../dtos/requests/ticket/close-ticket.dto';
import type { ReopenTicketRequestDTO } from '../../dtos/requests/ticket/reopen-ticket.dto';
import type { RateTicketRequestDTO } from '../../dtos/requests/ticket/rate-ticket.dto';
import type { TicketResponseDTO } from '../../dtos/responses/ticket-response.dto';
import type { TicketDetailResponseDTO } from '../../dtos/responses/ticket-detail-response.dto';
import type { TicketListResponseDTO } from '../../dtos/responses/ticket-list-response.dto';

export interface TicketServiceInterface {
  create(input: CreateTicketRequestDTO): Promise<TicketResponseDTO>;
  update(ticketId: string, input: UpdateTicketRequestDTO): Promise<TicketResponseDTO>;
  getDetail(ticketId: string): Promise<TicketDetailResponseDTO>;
  list(
    page: number,
    limit: number,
    filter?: Readonly<Record<string, unknown>>,
  ): Promise<TicketListResponseDTO>;
  assign(input: AssignTicketRequestDTO): Promise<TicketResponseDTO>;
  escalate(input: EscalateTicketRequestDTO): Promise<TicketResponseDTO>;
  resolve(input: ResolveTicketRequestDTO): Promise<TicketResponseDTO>;
  close(input: CloseTicketRequestDTO): Promise<TicketResponseDTO>;
  reopen(input: ReopenTicketRequestDTO): Promise<TicketResponseDTO>;
  rate(input: RateTicketRequestDTO): Promise<TicketResponseDTO>;
}
