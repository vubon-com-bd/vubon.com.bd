import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class StartFulfillmentCommand extends BaseCommand {
  readonly type = 'logistics.fulfillment.start';

  constructor(
    public readonly orderId: string,
    public readonly warehouseId: string,
    public readonly fulfillmentType: string = 'standard',
    public readonly strategy?: string,
  ) {
    super();
  }
}
