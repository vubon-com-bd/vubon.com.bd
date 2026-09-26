import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class CreateSubscriptionCommand extends BaseCommand {
  readonly type = 'vendor.subscription.create';

  constructor(
    public readonly vendorId: string,
    public readonly plan: string,
    public readonly autoRenew?: boolean,
  ) {
    super();
  }
}
