import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class AssignTicketCommand extends BaseCommand {
  readonly type = 'support.ticket.assign';

  constructor(
    public readonly ticketId: string,
    public readonly agentId: string,
  ) {
    super();
  }
}
