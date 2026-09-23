import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class AssignInventoryCommand extends BaseCommand {
  readonly type = 'logistics.warehouse.assign-inventory';

  constructor(
    public readonly warehouseId: string,
    public readonly locationId: string,
    public readonly productId: string,
    public readonly quantity: number,
  ) {
    super();
  }
}
