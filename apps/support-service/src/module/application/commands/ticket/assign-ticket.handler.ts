/**
 * AssignTicketHandler
 * @module support-service/application/commands/ticket
 */
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { AssignTicketCommand } from './assign-ticket.command';
import type { TicketResponseDTO } from '../../dtos/responses/ticket-response.dto';
import type { TicketServiceInterface } from '../../services/interfaces/ticket.service.interface';

export class AssignTicketHandler extends BaseCommandHandler<
  AssignTicketCommand,
  TicketResponseDTO
> {
  readonly commandType = 'support.ticket.assign';

  constructor(private readonly ticketService: TicketServiceInterface) {
    super();
  }

  async execute(command: AssignTicketCommand): Promise<TicketResponseDTO> {
    return this.ticketService.assign(command.payload);
  }
}
