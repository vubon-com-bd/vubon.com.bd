import { BaseSagaCommand } from '@vubon/shared-kernel/application/sagas/base.saga.command';

export class ReleaseInventoryCommand extends BaseSagaCommand {
  readonly type = 'saga.logistics.release-inventory';

  constructor(
    public readonly orderId: string,
    public readonly warehouseId: string,
  ) {
    super();
  }
}
