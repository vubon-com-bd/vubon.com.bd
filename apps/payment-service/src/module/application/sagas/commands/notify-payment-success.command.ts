import { BaseSagaCommand } from '@vubon/shared-kernel/application/sagas/base.saga.command';

export class NotifyPaymentSuccessCommand extends BaseSagaCommand {
  readonly type = 'saga.notify-payment-success';

  constructor(public readonly paymentId: string) {
    super();
  }
}
