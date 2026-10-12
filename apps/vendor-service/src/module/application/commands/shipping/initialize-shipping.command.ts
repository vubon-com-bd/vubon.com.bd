import { BaseCommand } from '@vubon/shared-kernel/application/commands';

export class InitializeShippingCommand extends BaseCommand {
  readonly type = 'vendor.shipping.initialize';
  constructor(
    public readonly vendorId: string,
    public readonly defaultMethod: string,
    public readonly actorId?: string,
  ) { super(); }
}
