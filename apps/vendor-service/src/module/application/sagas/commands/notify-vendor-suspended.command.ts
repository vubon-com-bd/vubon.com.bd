import { BaseSagaCommand } from '@vubon/shared-kernel/application/sagas';

export class NotifyVendorSuspendedCommand extends BaseSagaCommand {
  readonly type = 'vendor.saga.notify_vendor_suspended';

  constructor(
    public readonly vendorId: string,
    public readonly suspensionId: string,
    public readonly reason: string,
    public readonly suspendedAt: string,
    public readonly durationDays?: number,
    public readonly sagaId?: string,
  ) {
    super();
  }
}
