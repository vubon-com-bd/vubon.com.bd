import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class InitiatePaymentCommand extends BaseCommand {
  readonly type = 'payment.initiate';

  constructor(
    public readonly orderId: string,
    public readonly userId: string,
    public readonly method: string,
    public readonly amount: number,
    public readonly currency: string,
    public readonly gateway?: string,
    public readonly returnUrl?: string,
    public readonly idempotencyKey?: string,
    public readonly metadata?: Readonly<Record<string, unknown>>,
  ) {
    super();
  }
}
