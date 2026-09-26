import { BaseSagaCommand } from '@vubon/shared-kernel/application/sagas/base.saga.command';

export class CancelPaymentCommand extends BaseSagaCommand {
  readonly type = 'saga.order.cancel-payment';

  constructor(
    public readonly orderId: string,
    public readonly paymentId: string,
  ) {
    super();
  }
}
