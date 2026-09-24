import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class RateTicketCommand extends BaseCommand {
  readonly type = 'support.ticket.rate';

  constructor(
    public readonly ticketId: string,
    public readonly score: number,
    public readonly comment?: string,
  ) {
    super();
  }
}
