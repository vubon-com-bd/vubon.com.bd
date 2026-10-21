/**
 * ReverseTransactionCommand
 * @module payment-service/application/commands/transaction
 */
import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { ReverseTransactionRequestDTO } from '@application/dtos/requests/transaction/index.js';

export class ReverseTransactionCommand extends BaseCommand {
  readonly type = 'payment.transaction.reverse';
  constructor(
    public readonly dto: ReverseTransactionRequestDTO,
    public readonly actorId?: string,
  ) {
    super();
  }
}
