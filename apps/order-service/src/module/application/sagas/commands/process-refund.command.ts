import { BaseSagaCommand } from '@vubon/shared-kernel/application/sagas/base.saga.command';

export class ProcessRefundCommand extends BaseSagaCommand {
  readonly type = 'saga.order.process-refund';

  constructor(
    public readonly orderId: string,
    public readonly paymentId: string,
    public readonly amount: number,
  ) {
    super();
  }
}
