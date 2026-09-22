import { BaseSagaCommand } from '@vubon/shared-kernel/application/sagas/base.saga.command';

export class NotifyVendorSuspendedCommand extends BaseSagaCommand {
  readonly type = 'saga.notify-vendor-suspended';

  constructor(public readonly vendorId: string) {
    super();
  }
}
