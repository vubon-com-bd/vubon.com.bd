import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class AllocateFulfillmentCommand extends BaseCommand {
  readonly type = 'fulfillment.allocate';

  constructor(
    public readonly orderId: string,
    public readonly vendorId?: string,
  ) {
    super();
  }
}
