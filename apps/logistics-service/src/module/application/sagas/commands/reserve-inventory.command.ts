import { BaseSagaCommand } from '@vubon/shared-kernel/application/sagas/base.saga.command';

export class ReserveInventoryCommand extends BaseSagaCommand {
  readonly type = 'saga.logistics.reserve-inventory';

  constructor(
    public readonly orderId: string,
    public readonly warehouseId: string,
  ) {
    super();
  }
}
