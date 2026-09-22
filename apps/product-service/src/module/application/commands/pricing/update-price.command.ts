import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class UpdatePriceCommand extends BaseCommand {
  readonly type = 'product.price.update';

  constructor(
    public readonly productId: string,
    public readonly amount: number,
    public readonly currency?: string,
  ) {
    super();
  }
}
