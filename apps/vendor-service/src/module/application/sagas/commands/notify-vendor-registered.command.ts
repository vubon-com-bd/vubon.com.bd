import { BaseSagaCommand } from '@vubon/shared-kernel/application/sagas/base.saga.command';

export class NotifyVendorRegisteredCommand extends BaseSagaCommand {
  readonly type = 'saga.notify-vendor-registered';

  constructor(public readonly vendorId: string) {
    super();
  }
}
