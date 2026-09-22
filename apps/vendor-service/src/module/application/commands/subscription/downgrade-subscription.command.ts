import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class DowngradeSubscriptionCommand extends BaseCommand {
  readonly type = 'vendor.subscription.downgrade';

  constructor(
    public readonly subscriptionId: string,
    public readonly plan: string,
  ) {
    super();
  }
}
