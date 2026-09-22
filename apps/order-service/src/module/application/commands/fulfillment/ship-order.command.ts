import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class ShipOrderCommand extends BaseCommand {
  readonly type = 'fulfillment.ship';

  constructor(
    public readonly fulfillmentId: string,
    public readonly trackingNumber?: string,
  ) {
    super();
  }
}
