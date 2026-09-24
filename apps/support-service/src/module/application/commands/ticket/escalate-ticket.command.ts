import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class EscalateTicketCommand extends BaseCommand {
  readonly type = 'support.ticket.escalate';

  constructor(
    public readonly ticketId: string,
    public readonly reason: string,
    public readonly level?: 'L1' | 'L2' | 'L3' | 'L4',
  ) {
    super();
  }
}
