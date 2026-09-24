import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class CloseTicketCommand extends BaseCommand {
  readonly type = 'support.ticket.close';

  constructor(
    public readonly ticketId: string,
    public readonly reason?: string,
  ) {
    super();
  }
}
