import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { CloseTicketCommand } from './close-ticket.command';
import type { TicketRepository } from '../../../domain/repositories/ticket.repository.interface';
import { TicketIdVO } from '../../../domain/value-objects/primitives/ticket-id.vo';
import { TicketNotFoundError } from '../../errors/ticket.errors';

@CommandHandler(CloseTicketCommand)
export class CloseTicketHandler
  extends BaseCommandHandler<CloseTicketCommand, void>
  implements ICommandHandler<CloseTicketCommand>
{
  readonly commandType = 'support.ticket.close';

  constructor(
    private readonly ticketRepo: TicketRepository,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: CloseTicketCommand): Promise<void> {
    void command.reason;
    const ticket = await this.ticketRepo.findById(TicketIdVO.create(command.ticketId));
    if (!ticket) throw new TicketNotFoundError(command.ticketId);
    const closed = ticket.close();
    await this.ticketRepo.save(closed);
    const events = closed.pullDomainEvents();
    for (const event of events) {
      this.eventBus.publish(event as never);
    }
  }
}
