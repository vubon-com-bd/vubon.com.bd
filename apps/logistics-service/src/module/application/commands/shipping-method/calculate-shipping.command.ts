import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class CalculateShippingCommand extends BaseCommand {
  readonly type = 'logistics.shipping-method.calculate';

  constructor(
    public readonly weightKg: number,
    public readonly methodId?: string,
    public readonly courierId?: string,
    public readonly zoneId?: string,
    public readonly declaredValue?: number,
  ) {
    super();
  }
}
