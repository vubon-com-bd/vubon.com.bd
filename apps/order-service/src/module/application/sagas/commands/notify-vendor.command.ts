import { BaseSagaCommand } from '@vubon/shared-kernel/application/sagas/base.saga.command';

export class NotifyVendorCommand extends BaseSagaCommand {
  readonly type = 'saga.order.notify-vendor';

  constructor(
    public readonly orderId: string,
    public readonly vendorId: string,
  ) {
    super();
  }
}
