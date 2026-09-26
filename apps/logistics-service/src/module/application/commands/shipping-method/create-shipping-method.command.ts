import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class CreateShippingMethodCommand extends BaseCommand {
  readonly type = 'logistics.shipping-method.create';

  constructor(
    public readonly name: string,
    public readonly methodType: string,
    public readonly baseRate: number,
    public readonly perKgRate?: number,
    public readonly currency: string = 'BDT',
    public readonly estimatedDays?: number,
  ) {
    super();
  }
}
