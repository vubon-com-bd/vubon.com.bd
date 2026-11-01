/**
 * CancelSubscriptionCommand
 * @module payment-service/application/commands/subscription
 */
import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { CancelSubscriptionRequestDTO } from '@application/dtos/requests/subscription/index.js';

export class CancelSubscriptionCommand extends BaseCommand {
  readonly type = 'payment.subscription.cancel';
  constructor(
    public readonly dto: CancelSubscriptionRequestDTO,
    public readonly userId: string,
  ) {
    super();
  }
}
