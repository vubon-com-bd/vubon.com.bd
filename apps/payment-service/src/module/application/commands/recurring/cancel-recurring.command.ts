/**
 * CancelRecurringCommand
 * @module payment-service/application/commands/recurring
 */
import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { CancelRecurringRequestDTO } from '@application/dtos/requests/recurring/index.js';

export class CancelRecurringCommand extends BaseCommand {
  readonly type = 'payment.recurring.cancel';
  constructor(
    public readonly dto: CancelRecurringRequestDTO,
    public readonly actorId?: string,
  ) {
    super();
  }
}
