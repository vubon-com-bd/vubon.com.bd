import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export interface PickItemInput {
  readonly productId: string;
  readonly locationId: string;
  readonly quantity: number;
}

export class PickItemsCommand extends BaseCommand {
  readonly type = 'logistics.fulfillment.pick-items';

  constructor(
    public readonly fulfillmentId: string,
    public readonly items: readonly PickItemInput[],
  ) {
    super();
  }
}
