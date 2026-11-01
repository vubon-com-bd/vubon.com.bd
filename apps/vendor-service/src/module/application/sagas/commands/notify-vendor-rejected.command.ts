import { BaseSagaCommand } from '@vubon/shared-kernel/application/sagas';

export class NotifyVendorRejectedCommand extends BaseSagaCommand {
  readonly type = 'vendor.saga.notify_vendor_rejected';

  constructor(
    public readonly vendorId: string,
    public readonly email: string,
    public readonly reason: string,
    public readonly rejectedAt: string,
    public readonly sagaId?: string,
  ) {
    super();
  }
}
