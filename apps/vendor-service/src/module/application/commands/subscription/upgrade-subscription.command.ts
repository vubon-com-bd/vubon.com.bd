import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class UpgradeSubscriptionCommand extends BaseCommand {
  readonly type = 'vendor.subscription.upgrade';

  constructor(
    public readonly subscriptionId: string,
    public readonly plan: string,
  ) {
    super();
  }
}
