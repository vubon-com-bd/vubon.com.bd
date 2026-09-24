import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { EscalateTicketCommand } from './escalate-ticket.command';
import type { TicketEscalationServiceInterface } from '../../services/interfaces/ticket-escalation.service.interface';

@CommandHandler(EscalateTicketCommand)
export class EscalateTicketHandler
  extends BaseCommandHandler<EscalateTicketCommand, { id: string; level: string }>
  implements ICommandHandler<EscalateTicketCommand>
{
  readonly commandType = 'support.ticket.escalate';

  constructor(private readonly escalationService: TicketEscalationServiceInterface) {
    super();
  }

  async execute(command: EscalateTicketCommand): Promise<{ id: string; level: string }> {
    return this.escalationService.escalate({
      ticketId: command.ticketId,
      reason: command.reason,
      level: command.level,
    });
  }
}
