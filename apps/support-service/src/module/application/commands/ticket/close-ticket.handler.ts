/**
 * CloseTicketHandler
 * @module support-service/application/commands/ticket
 */
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { CloseTicketCommand } from './close-ticket.command';
import type { TicketResponseDTO } from '../../dtos/responses/ticket-response.dto';
import type { TicketServiceInterface } from '../../services/interfaces/ticket.service.interface';

export class CloseTicketHandler extends BaseCommandHandler<
  CloseTicketCommand,
  TicketResponseDTO
> {
  readonly commandType = 'support.ticket.close';

  constructor(private readonly ticketService: TicketServiceInterface) {
    super();
  }

  async execute(command: CloseTicketCommand): Promise<TicketResponseDTO> {
    return this.ticketService.close(command.payload);
  }
}
