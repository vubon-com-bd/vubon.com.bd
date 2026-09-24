import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { ReopenTicketCommand } from './reopen-ticket.command';
import type { TicketRepository } from '../../../domain/repositories/ticket.repository.interface';
import { TicketIdVO } from '../../../domain/value-objects/primitives/ticket-id.vo';
import { TicketStatusVO } from '../../../domain/value-objects/primitives/ticket-status.vo';
import { TicketNotFoundError } from '../../errors/ticket.errors';

@CommandHandler(ReopenTicketCommand)
export class ReopenTicketHandler
  extends BaseCommandHandler<ReopenTicketCommand, void>
  implements ICommandHandler<ReopenTicketCommand>
{
  readonly commandType = 'support.ticket.reopen';

  constructor(
    private readonly ticketRepo: TicketRepository,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: ReopenTicketCommand): Promise<void> {
    void command.reason;
    const ticket = await this.ticketRepo.findById(TicketIdVO.create(command.ticketId));
    if (!ticket) throw new TicketNotFoundError(command.ticketId);
    const updated = ticket.changeStatus(TicketStatusVO.create('reopened'));
    await this.ticketRepo.save(updated);
    void this.eventBus;
  }
}
