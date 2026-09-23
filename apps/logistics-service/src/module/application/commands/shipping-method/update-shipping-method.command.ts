import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class UpdateShippingMethodCommand extends BaseCommand {
  readonly type = 'logistics.shipping-method.update';

  constructor(
    public readonly methodId: string,
    public readonly name?: string,
    public readonly baseRate?: number,
    public readonly perKgRate?: number,
  ) {
    super();
  }
}
