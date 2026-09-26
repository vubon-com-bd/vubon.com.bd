import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class AddLocationCommand extends BaseCommand {
  readonly type = 'logistics.warehouse.add-location';

  constructor(
    public readonly warehouseId: string,
    public readonly code: string,
    public readonly locationType: string,
    public readonly name?: string,
    public readonly capacity?: number,
  ) {
    super();
  }
}
