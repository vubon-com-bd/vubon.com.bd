/**
 * CreateSplitPaymentCommand
 * @module payment-service/application/commands/split
 */
import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { CreateSplitPaymentRequestDTO } from '@application/dtos/requests/split/index.js';

export class CreateSplitPaymentCommand extends BaseCommand {
  readonly type = 'payment.split.create';
  constructor(
    public readonly dto: CreateSplitPaymentRequestDTO,
    public readonly actorId?: string,
  ) {
    super();
  }
}
