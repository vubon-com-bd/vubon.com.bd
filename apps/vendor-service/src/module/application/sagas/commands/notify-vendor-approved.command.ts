import { BaseSagaCommand } from '@vubon/shared-kernel/application/sagas';

export class NotifyVendorApprovedCommand extends BaseSagaCommand {
  readonly type = 'vendor.saga.notify_vendor_approved';

  constructor(
    public readonly vendorId: string,
    public readonly email: string,
    public readonly approvedAt: string,
    public readonly sagaId?: string,
  ) {
    super();
  }
}
