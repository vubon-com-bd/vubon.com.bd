/**
 * UpgradeSubscriptionCommand
 * @module payment-service/application/commands/subscription
 */
import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { UpgradeSubscriptionRequestDTO } from '@application/dtos/requests/subscription/index.js';

export class UpgradeSubscriptionCommand extends BaseCommand {
  readonly type = 'payment.subscription.upgrade';
  constructor(
    public readonly dto: UpgradeSubscriptionRequestDTO,
    public readonly userId: string,
  ) {
    super();
  }
}
