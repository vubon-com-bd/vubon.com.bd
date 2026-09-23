import { BaseSagaCommand } from '@vubon/shared-kernel/application/sagas/base.saga.command';

export class UpdateOrderStatusCommand extends BaseSagaCommand {
  readonly type = 'saga.logistics.update-order-status';

  constructor(
    public readonly orderId: string,
    public readonly status: string,
  ) {
    super();
  }
}
