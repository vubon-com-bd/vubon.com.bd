import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { UpdateTicketCommand } from './update-ticket.command';
import type { TicketServiceInterface } from '../../services/interfaces/ticket.service.interface';
import { TicketIdVO } from '../../../domain/value-objects/primitives/ticket-id.vo';
import type { TicketResponseDTO } from '../../dtos/responses/ticket-response.dto';

@CommandHandler(UpdateTicketCommand)
export class UpdateTicketHandler
  extends BaseCommandHandler<UpdateTicketCommand, TicketResponseDTO>
  implements ICommandHandler<UpdateTicketCommand>
{
  readonly commandType = 'support.ticket.update';

  constructor(private readonly ticketService: TicketServiceInterface) {
    super();
  }

  async execute(command: UpdateTicketCommand): Promise<TicketResponseDTO> {
    return this.ticketService.update(TicketIdVO.create(command.ticketId), {
      subject: command.subject,
      description: command.description,
      priority: command.priority,
      tags: command.tags ? [...command.tags] : undefined,
    });
  }
}
