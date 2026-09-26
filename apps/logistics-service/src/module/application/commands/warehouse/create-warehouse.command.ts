import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class CreateWarehouseCommand extends BaseCommand {
  readonly type = 'logistics.warehouse.create';

  constructor(
    public readonly code: string,
    public readonly name: string,
    public readonly warehouseType: string,
    public readonly division?: string,
    public readonly district?: string,
    public readonly address?: string,
    public readonly capacity?: number,
  ) {
    super();
  }
}
