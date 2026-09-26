/**
 * ResolveTicketHandler
 * @module support-service/application/commands/ticket
 */
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { ResolveTicketCommand } from './resolve-ticket.command';
import type { TicketResponseDTO } from '../../dtos/responses/ticket-response.dto';
import type { TicketServiceInterface } from '../../services/interfaces/ticket.service.interface';

export class ResolveTicketHandler extends BaseCommandHandler<
  ResolveTicketCommand,
  TicketResponseDTO
> {
  readonly commandType = 'support.ticket.resolve';

  constructor(private readonly ticketService: TicketServiceInterface) {
    super();
  }

  async execute(command: ResolveTicketCommand): Promise<TicketResponseDTO> {
    return this.ticketService.resolve(command.payload);
  }
}
