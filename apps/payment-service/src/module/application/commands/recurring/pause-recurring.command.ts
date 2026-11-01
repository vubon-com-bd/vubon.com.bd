/**
 * PauseRecurringCommand
 * @module payment-service/application/commands/recurring
 */
import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { PauseRecurringRequestDTO } from '@application/dtos/requests/recurring/index.js';

export class PauseRecurringCommand extends BaseCommand {
  readonly type = 'payment.recurring.pause';
  constructor(
    public readonly dto: PauseRecurringRequestDTO,
    public readonly actorId?: string,
  ) {
    super();
  }
}
