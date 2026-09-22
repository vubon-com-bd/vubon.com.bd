import { BaseSagaCommand } from '@vubon/shared-kernel/application/sagas/base.saga.command';

export class NotifyVendorApprovedCommand extends BaseSagaCommand {
  readonly type = 'saga.notify-vendor-approved';

  constructor(public readonly vendorId: string) {
    super();
  }
}
