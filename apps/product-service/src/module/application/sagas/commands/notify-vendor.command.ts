/**
 * NotifyVendorCommand — saga command
 * @module product-service/application/sagas/commands
 */
import { BaseSagaCommand } from '@vubon/shared-kernel/application/sagas';

export class NotifyVendorCommand extends BaseSagaCommand {
  readonly type = 'product.saga.notify_vendor';

  constructor(
    public readonly vendorId: string,
    public readonly productId: string,
    public readonly template: string,
    public readonly data: Readonly<Record<string, unknown>>,
    sagaId?: string,
  ) {
    super();
    if (sagaId) (this as { sagaId?: string }).sagaId = sagaId;
  }
}
