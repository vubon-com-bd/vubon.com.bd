/**
 * NotifyVendorRegisteredCommand — saga side-effect
 * @module vendor-service/application/sagas/commands
 */
import { BaseSagaCommand } from '@vubon/shared-kernel/application/sagas';

export class NotifyVendorRegisteredCommand extends BaseSagaCommand {
  readonly type = 'vendor.saga.notify_vendor_registered';

  constructor(
    public readonly vendorId: string,
    public readonly userId: string,
    public readonly email: string,
    public readonly vendorName: string,
    public readonly sagaId?: string,
  ) {
    super();
  }
}
