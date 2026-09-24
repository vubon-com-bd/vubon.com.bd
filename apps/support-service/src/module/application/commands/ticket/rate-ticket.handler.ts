import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { RateTicketCommand } from './rate-ticket.command';
import type { TicketSatisfactionServiceInterface } from '../../services/interfaces/ticket-satisfaction.service.interface';

@CommandHandler(RateTicketCommand)
export class RateTicketHandler
  extends BaseCommandHandler<RateTicketCommand, { id: string; score: number }>
  implements ICommandHandler<RateTicketCommand>
{
  readonly commandType = 'support.ticket.rate';

  constructor(private readonly satisfactionService: TicketSatisfactionServiceInterface) {
    super();
  }

  async execute(command: RateTicketCommand): Promise<{ id: string; score: number }> {
    return this.satisfactionService.rate({
      ticketId: command.ticketId,
      score: command.score,
      comment: command.comment,
    });
  }
}
