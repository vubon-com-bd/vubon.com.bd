import { BaseSagaCommand } from '@vubon/shared-kernel/application/sagas/base.saga.command';

export class NotifyVendorRejectedCommand extends BaseSagaCommand {
  readonly type = 'saga.notify-vendor-rejected';

  constructor(public readonly vendorId: string) {
    super();
  }
}
