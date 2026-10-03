import { BaseCommand } from '@vubon/shared-kernel/application/commands';

export class NotifyVendorCommand extends BaseCommand {
  readonly type = 'saga.notify_vendor';
  constructor(
    public readonly vendorId: string,
    public readonly orderId: string,
    public readonly message: string,
  ) { super(); }
}
