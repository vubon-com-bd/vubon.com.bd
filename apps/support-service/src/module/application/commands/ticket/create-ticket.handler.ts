import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { CreateTicketCommand } from './create-ticket.command';
import type { TicketServiceInterface } from '../../services/interfaces/ticket.service.interface';
import type { TicketResponseDTO } from '../../dtos/responses/ticket-response.dto';

@CommandHandler(CreateTicketCommand)
export class CreateTicketHandler
  extends BaseCommandHandler<CreateTicketCommand, TicketResponseDTO>
  implements ICommandHandler<CreateTicketCommand>
{
  readonly commandType = 'support.ticket.create';

  constructor(
    private readonly ticketService: TicketServiceInterface,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: CreateTicketCommand): Promise<TicketResponseDTO> {
    void this.eventBus;
    const input = {
      subject: command.subject,
      description: command.description,
      priority: command.priority,
      type: command.type_,
      channel: command.channel,
      tags: [...command.tags],
      category: 'general',
      customerEmail: '',
      customerName: command.userId,
    };
    return this.ticketService.create(input as never);
  }
}
