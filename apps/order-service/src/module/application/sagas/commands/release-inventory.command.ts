import { BaseSagaCommand } from '@vubon/shared-kernel/application/sagas/base.saga.command';

export class ReleaseInventoryCommand extends BaseSagaCommand {
  readonly type = 'saga.order.release-inventory';

  constructor(public readonly orderId: string) {
    super();
  }
}
