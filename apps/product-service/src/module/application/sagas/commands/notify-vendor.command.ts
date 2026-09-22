import { BaseSagaCommand } from '@vubon/shared-kernel/application/sagas/base.saga.command';

export class NotifyVendorCommand extends BaseSagaCommand {
  readonly type = 'saga.product.notify-vendor';

  constructor(
    public readonly vendorId: string,
    public readonly productId: string,
  ) {
    super();
  }
}
