import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class SetCourierRatesCommand extends BaseCommand {
  readonly type = 'logistics.courier.set-rates';

  constructor(
    public readonly courierId: string,
    public readonly weightMin: number,
    public readonly weightMax: number,
    public readonly baseRate: number,
    public readonly perKgRate: number,
    public readonly currency: string = 'BDT',
  ) {
    super();
  }
}
