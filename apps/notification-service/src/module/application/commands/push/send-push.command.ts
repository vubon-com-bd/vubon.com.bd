import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class SendPushCommand extends BaseCommand {
  readonly type = 'push.send';

  constructor(
    public readonly userId: string,
    public readonly title: string,
    public readonly body: string,
    public readonly icon?: string,
    public readonly image?: string,
    public readonly clickAction?: string,
    public readonly data?: Record<string, string>,
  ) {
    super();
  }
}
