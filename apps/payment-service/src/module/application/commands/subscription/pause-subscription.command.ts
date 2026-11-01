/**
 * PauseSubscriptionCommand
 * @module payment-service/application/commands/subscription
 */
import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { PauseSubscriptionRequestDTO } from '@application/dtos/requests/subscription/index.js';

export class PauseSubscriptionCommand extends BaseCommand {
  readonly type = 'payment.subscription.pause';
  constructor(
    public readonly dto: PauseSubscriptionRequestDTO,
    public readonly userId: string,
  ) {
    super();
  }
}
