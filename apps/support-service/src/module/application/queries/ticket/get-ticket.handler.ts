/**
 * GetTicketHandler
 * @module support-service/application/queries/ticket
 */
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetTicketQuery } from './get-ticket.query';
import type { TicketResponseDTO } from '../../dtos/responses/ticket-response.dto';
import type { TicketRepository } from '../../../domain/repositories/ticket.repository.interface';
import { TicketIdVO } from '../../../domain/value-objects/primitives/ticket-id.vo';
import { TicketMapper } from '../../mappers/ticket.mapper';
import { TicketNotFoundException } from '../../errors/ticket.errors';

export class GetTicketHandler extends BaseQueryHandler<
  GetTicketQuery,
  TicketResponseDTO
> {
  readonly queryType = 'support.ticket.get';

  constructor(
    private readonly ticketRepo: TicketRepository,
    private readonly mapper: TicketMapper,
  ) {
    super();
  }

  async execute(query: GetTicketQuery): Promise<TicketResponseDTO> {
    const ticket = await this.ticketRepo.findById(TicketIdVO.create(query.ticketId));
    if (!ticket) {
      throw new TicketNotFoundException(query.ticketId);
    }
    return this.mapper.map(ticket);
  }
}
