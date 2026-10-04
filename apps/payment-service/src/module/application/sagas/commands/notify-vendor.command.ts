import { BaseCommand } from '@vubon/shared-kernel/application/commands';

export class NotifyVendorCommand extends BaseCommand {
  readonly type = 'saga.notify_vendor';
  constructor(
    public readonly vendorId: string,
    public readonly paymentId: string,
    public readonly template: string,
    public readonly data?: Readonly<Record<string, unknown>>,
  ) {
    super();
  }
}
