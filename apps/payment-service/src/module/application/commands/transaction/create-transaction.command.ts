/**
 * CreateTransactionCommand
 * @module payment-service/application/commands/transaction
 */
import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { CreateTransactionRequestDTO } from '@application/dtos/requests/transaction/index.js';

export class CreateTransactionCommand extends BaseCommand {
  readonly type = 'payment.transaction.create';
  constructor(
    public readonly dto: CreateTransactionRequestDTO,
    public readonly actorId?: string,
  ) {
    super();
  }
}
