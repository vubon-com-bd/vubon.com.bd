/**
 * GetTicketDetailHandler
 * @module support-service/application/queries/ticket
 */
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetTicketDetailQuery } from './get-ticket-detail.query';
import type { TicketDetailResponseDTO } from '../../dtos/responses/ticket-detail-response.dto';
import type { TicketServiceInterface } from '../../services/interfaces/ticket.service.interface';

export class GetTicketDetailHandler extends BaseQueryHandler<
  GetTicketDetailQuery,
  TicketDetailResponseDTO
> {
  readonly queryType = 'support.ticket.get_detail';

  constructor(private readonly ticketService: TicketServiceInterface) {
    super();
  }

  async execute(query: GetTicketDetailQuery): Promise<TicketDetailResponseDTO> {
    return this.ticketService.getDetail(query.ticketId);
  }
}
