import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { AssignTicketCommand } from './assign-ticket.command';
import type { TicketRepository } from '../../../domain/repositories/ticket.repository.interface';
import { TicketIdVO } from '../../../domain/value-objects/primitives/ticket-id.vo';
import { AgentIdVO } from '../../../domain/value-objects/primitives/agent-id.vo';
import { TicketNotFoundError } from '../../errors/ticket.errors';

@CommandHandler(AssignTicketCommand)
export class AssignTicketHandler
  extends BaseCommandHandler<AssignTicketCommand, void>
  implements ICommandHandler<AssignTicketCommand>
{
  readonly commandType = 'support.ticket.assign';

  constructor(
    private readonly ticketRepo: TicketRepository,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: AssignTicketCommand): Promise<void> {
    const ticket = await this.ticketRepo.findById(TicketIdVO.create(command.ticketId));
    if (!ticket) throw new TicketNotFoundError(command.ticketId);
    const updated = ticket.assignTo(AgentIdVO.create(command.agentId));
    await this.ticketRepo.save(updated);
    const events = updated.pullDomainEvents();
    for (const event of events) {
      this.eventBus.publish(event as never);
    }
  }
}
