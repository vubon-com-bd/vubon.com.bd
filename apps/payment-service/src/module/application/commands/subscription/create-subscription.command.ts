/**
 * CreateSubscriptionCommand
 * @module payment-service/application/commands/subscription
 */
import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { CreateSubscriptionRequestDTO } from '@application/dtos/requests/subscription/index.js';

export class CreateSubscriptionCommand extends BaseCommand {
  readonly type = 'payment.subscription.create';
  constructor(
    public readonly dto: CreateSubscriptionRequestDTO,
    public readonly userId: string,
  ) {
    super();
  }
}
