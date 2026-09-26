import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class UnsubscribeCommand extends BaseCommand {
  readonly type = 'preference.unsubscribe';

  constructor(
    public readonly userId: string,
    public readonly channel: string,
    public readonly reason?: string,
  ) {
    super();
  }
}
