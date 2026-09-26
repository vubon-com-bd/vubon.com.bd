/**
 * ReopenTicketHandler
 * @module support-service/application/commands/ticket
 */
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { ReopenTicketCommand } from './reopen-ticket.command';
import type { TicketResponseDTO } from '../../dtos/responses/ticket-response.dto';
import type { TicketServiceInterface } from '../../services/interfaces/ticket.service.interface';

export class ReopenTicketHandler extends BaseCommandHandler<
  ReopenTicketCommand,
  TicketResponseDTO
> {
  readonly commandType = 'support.ticket.reopen';

  constructor(private readonly ticketService: TicketServiceInterface) {
    super();
  }

  async execute(command: ReopenTicketCommand): Promise<TicketResponseDTO> {
    return this.ticketService.reopen(command.payload);
  }
}
