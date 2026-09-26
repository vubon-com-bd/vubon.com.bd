import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class CreateSubscriptionCommand extends BaseCommand {
  readonly type = 'subscription.create';

  constructor(
    public readonly userId: string,
    public readonly plan: string,
    public readonly currentPeriodFrom: string,
    public readonly currentPeriodTo: string,
    public readonly paymentMethodId?: string,
    public readonly metadata?: Readonly<Record<string, unknown>>,
  ) {
    super();
  }
}
