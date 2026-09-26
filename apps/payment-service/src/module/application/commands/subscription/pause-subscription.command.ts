import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class PauseSubscriptionCommand extends BaseCommand {
  readonly type = 'subscription.pause';

  constructor(
    public readonly subscriptionId: string,
    public readonly reason?: string,
  ) {
    super();
  }
}
