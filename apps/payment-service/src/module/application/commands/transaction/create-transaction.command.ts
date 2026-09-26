import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class CreateTransactionCommand extends BaseCommand {
  readonly type = 'transaction.create';

  constructor(
    public readonly paymentId: string,
    public readonly transactionType: string,
    public readonly amount: number,
    public readonly currency: string,
    public readonly gateway?: string,
    public readonly reference?: string,
    public readonly idempotencyKey?: string,
    public readonly metadata?: Readonly<Record<string, unknown>>,
  ) {
    super();
  }
}
