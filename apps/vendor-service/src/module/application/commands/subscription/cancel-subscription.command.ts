import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class CancelSubscriptionCommand extends BaseCommand {
  readonly type = 'vendor.subscription.cancel';

  constructor(
    public readonly subscriptionId: string,
    public readonly reason?: string,
  ) {
    super();
  }
}
