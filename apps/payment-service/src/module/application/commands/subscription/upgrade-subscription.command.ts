import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class UpgradeSubscriptionCommand extends BaseCommand {
  readonly type = 'subscription.upgrade';

  constructor(
    public readonly subscriptionId: string,
    public readonly newPlan: string,
  ) {
    super();
  }
}
