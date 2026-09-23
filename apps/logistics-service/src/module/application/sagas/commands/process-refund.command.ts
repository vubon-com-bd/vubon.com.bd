import { BaseSagaCommand } from '@vubon/shared-kernel/application/sagas/base.saga.command';

export class ProcessRefundCommand extends BaseSagaCommand {
  readonly type = 'saga.logistics.process-refund';

  constructor(
    public readonly orderId: string,
    public readonly amount: number,
  ) {
    super();
  }
}
