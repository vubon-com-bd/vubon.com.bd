/**
 * RateTicketHandler
 * @module support-service/application/commands/ticket
 */
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { RateTicketCommand } from './rate-ticket.command';
import type { TicketResponseDTO } from '../../dtos/responses/ticket-response.dto';
import type { TicketServiceInterface } from '../../services/interfaces/ticket.service.interface';

export class RateTicketHandler extends BaseCommandHandler<
  RateTicketCommand,
  TicketResponseDTO
> {
  readonly commandType = 'support.ticket.rate';

  constructor(private readonly ticketService: TicketServiceInterface) {
    super();
  }

  async execute(command: RateTicketCommand): Promise<TicketResponseDTO> {
    return this.ticketService.rate(command.payload);
  }
}
