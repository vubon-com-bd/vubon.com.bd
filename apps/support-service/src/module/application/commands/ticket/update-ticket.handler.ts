/**
 * UpdateTicketHandler
 * @module support-service/application/commands/ticket
 */
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { UpdateTicketCommand } from './update-ticket.command';
import type { TicketResponseDTO } from '../../dtos/responses/ticket-response.dto';
import type { TicketServiceInterface } from '../../services/interfaces/ticket.service.interface';

export class UpdateTicketHandler extends BaseCommandHandler<
  UpdateTicketCommand,
  TicketResponseDTO
> {
  readonly commandType = 'support.ticket.update';

  constructor(private readonly ticketService: TicketServiceInterface) {
    super();
  }

  async execute(command: UpdateTicketCommand): Promise<TicketResponseDTO> {
    return this.ticketService.update(command.ticketId, command.payload);
  }
}
