import { BaseSagaCommand } from '@vubon/shared-kernel/application/sagas/base.saga.command';

export class ReserveInventoryCommand extends BaseSagaCommand {
  readonly type = 'saga.order.reserve-inventory';

  constructor(
    public readonly orderId: string,
    public readonly items: ReadonlyArray<{ productId: string; quantity: number }>,
  ) {
    super();
  }
}
