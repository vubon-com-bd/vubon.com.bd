/**
 * EscalateTicketHandler
 * @module support-service/application/commands/ticket
 */
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { EscalateTicketCommand } from './escalate-ticket.command';
import type { TicketResponseDTO } from '../../dtos/responses/ticket-response.dto';
import type { TicketServiceInterface } from '../../services/interfaces/ticket.service.interface';

export class EscalateTicketHandler extends BaseCommandHandler<
  EscalateTicketCommand,
  TicketResponseDTO
> {
  readonly commandType = 'support.ticket.escalate';

  constructor(private readonly ticketService: TicketServiceInterface) {
    super();
  }

  async execute(command: EscalateTicketCommand): Promise<TicketResponseDTO> {
    return this.ticketService.escalate(command.payload);
  }
}
