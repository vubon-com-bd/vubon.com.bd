import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class RequestRefundCommand extends BaseCommand {
  readonly type = 'refund.request';

  constructor(
    public readonly paymentId: string,
    public readonly amount?: number,
    public readonly reason?: string,
    public readonly idempotencyKey?: string,
  ) {
    super();
  }
}
