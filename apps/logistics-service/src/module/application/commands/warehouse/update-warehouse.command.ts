import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class UpdateWarehouseCommand extends BaseCommand {
  readonly type = 'logistics.warehouse.update';

  constructor(
    public readonly warehouseId: string,
    public readonly name?: string,
    public readonly address?: string,
    public readonly capacity?: number,
  ) {
    super();
  }
}
