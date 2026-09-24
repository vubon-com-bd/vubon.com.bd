import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class ResolveTicketCommand extends BaseCommand {
  readonly type = 'support.ticket.resolve';

  constructor(
    public readonly ticketId: string,
    public readonly resolution?: string,
  ) {
    super();
  }
}
