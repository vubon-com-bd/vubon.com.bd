import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class UpdateTicketCommand extends BaseCommand {
  readonly type = 'support.ticket.update';

  constructor(
    public readonly ticketId: string,
    public readonly subject?: string,
    public readonly description?: string,
    public readonly priority?: string,
    public readonly tags?: readonly string[],
  ) {
    super();
  }
}
