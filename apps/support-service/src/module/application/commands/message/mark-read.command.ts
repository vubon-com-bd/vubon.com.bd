import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class MarkMessageReadCommand extends BaseCommand {
  readonly type = 'support.message.mark-read';

  constructor(public readonly messageId: string) {
    super();
  }
}
