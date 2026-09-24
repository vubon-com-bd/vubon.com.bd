import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { ResolveTicketCommand } from './resolve-ticket.command';
import type { TicketRepository } from '../../../domain/repositories/ticket.repository.interface';
import { TicketIdVO } from '../../../domain/value-objects/primitives/ticket-id.vo';
import { TicketNotFoundError } from '../../errors/ticket.errors';

@CommandHandler(ResolveTicketCommand)
export class ResolveTicketHandler
  extends BaseCommandHandler<ResolveTicketCommand, void>
  implements ICommandHandler<ResolveTicketCommand>
{
  readonly commandType = 'support.ticket.resolve';

  constructor(
    private readonly ticketRepo: TicketRepository,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: ResolveTicketCommand): Promise<void> {
    void command.resolution;
    const ticket = await this.ticketRepo.findById(TicketIdVO.create(command.ticketId));
    if (!ticket) throw new TicketNotFoundError(command.ticketId);
    const resolved = ticket.resolve();
    await this.ticketRepo.save(resolved);
    const events = resolved.pullDomainEvents();
    for (const event of events) {
      this.eventBus.publish(event as never);
    }
  }
}
