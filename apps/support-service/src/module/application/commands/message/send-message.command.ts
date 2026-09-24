import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class SendMessageCommand extends BaseCommand {
  readonly type = 'support.message.send';

  constructor(
    public readonly ticketId: string,
    public readonly senderId: string,
    public readonly content: string,
    public readonly type_: string = 'text',
    public readonly isInternal: boolean = false,
  ) {
    super();
  }
}
