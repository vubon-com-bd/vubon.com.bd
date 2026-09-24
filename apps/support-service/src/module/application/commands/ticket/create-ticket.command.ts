import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class CreateTicketCommand extends BaseCommand {
  readonly type = 'support.ticket.create';

  constructor(
    public readonly subject: string,
    public readonly description: string,
    public readonly userId: string,
    public readonly priority: string = 'normal',
    public readonly type_: string = 'question',
    public readonly channel: string = 'web',
    public readonly tags: readonly string[] = [],
  ) {
    super();
  }
}
