import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class PartialRefundCommand extends BaseCommand {
  readonly type = 'refund.partial';

  constructor(
    public readonly paymentId: string,
    public readonly amount: number,
    public readonly reason?: string,
    public readonly idempotencyKey?: string,
  ) {
    super();
  }
}
