import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class StartFulfillmentCommand extends BaseCommand {
  readonly type = 'fulfillment.start';

  constructor(
    public readonly orderId: string,
    public readonly vendorId?: string,
  ) {
    super();
  }
}
