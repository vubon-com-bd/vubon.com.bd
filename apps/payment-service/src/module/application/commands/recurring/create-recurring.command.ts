/**
 * CreateRecurringCommand
 * @module payment-service/application/commands/recurring
 */
import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { CreateRecurringRequestDTO } from '@application/dtos/requests/recurring/index.js';

export class CreateRecurringCommand extends BaseCommand {
  readonly type = 'payment.recurring.create';
  constructor(
    public readonly dto: CreateRecurringRequestDTO,
    public readonly userId: string,
  ) {
    super();
  }
}
