import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class ReopenTicketCommand extends BaseCommand {
  readonly type = 'support.ticket.reopen';

  constructor(
    public readonly ticketId: string,
    public readonly reason: string,
  ) {
    super();
  }
}
