/**
 * DowngradeSubscriptionCommand
 * @module payment-service/application/commands/subscription
 */
import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { DowngradeSubscriptionRequestDTO } from '@application/dtos/requests/subscription/index.js';

export class DowngradeSubscriptionCommand extends BaseCommand {
  readonly type = 'payment.subscription.downgrade';
  constructor(
    public readonly dto: DowngradeSubscriptionRequestDTO,
    public readonly userId: string,
  ) {
    super();
  }
}
