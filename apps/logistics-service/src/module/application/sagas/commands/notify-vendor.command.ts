import { BaseSagaCommand } from '@vubon/shared-kernel/application/sagas/base.saga.command';

export class NotifyVendorCommand extends BaseSagaCommand {
  readonly type = 'saga.logistics.notify-vendor';

  constructor(
    public readonly vendorId: string,
    public readonly eventType: string,
    public readonly message: string,
  ) {
    super();
  }
}
