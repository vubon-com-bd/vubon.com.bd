import { BaseSagaCommand } from '@vubon/shared-kernel/application/sagas/base.saga.command';

export class NotifyPaymentFailedCommand extends BaseSagaCommand {
  readonly type = 'saga.notify-payment-failed';

  constructor(
    public readonly paymentId: string,
    public readonly reason: string,
  ) {
    super();
  }
}
