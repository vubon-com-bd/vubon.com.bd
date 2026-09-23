import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class CreatePackagingCommand extends BaseCommand {
  readonly type = 'logistics.packaging.create';

  constructor(
    public readonly packagingType: string,
    public readonly material: string,
    public readonly size: string,
    public readonly cost: number,
    public readonly currency: string = 'BDT',
    public readonly maxWeight?: number,
  ) {
    super();
  }
}
