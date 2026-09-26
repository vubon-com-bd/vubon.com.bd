/**
 * CreateTicketHandler
 * @module support-service/application/commands/ticket
 */
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { CreateTicketCommand } from './create-ticket.command';
import type { TicketResponseDTO } from '../../dtos/responses/ticket-response.dto';
import type { TicketServiceInterface } from '../../services/interfaces/ticket.service.interface';

export class CreateTicketHandler extends BaseCommandHandler<
  CreateTicketCommand,
  TicketResponseDTO
> {
  readonly commandType = 'support.ticket.create';

  constructor(private readonly ticketService: TicketServiceInterface) {
    super();
  }

  async execute(command: CreateTicketCommand): Promise<TicketResponseDTO> {
    return this.ticketService.create(command.payload);
  }
}
