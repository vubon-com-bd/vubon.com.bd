import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class SetDefaultVariantCommand extends BaseCommand {
  readonly type = 'product.variant.set-default';

  constructor(
    public readonly productId: string,
    public readonly variantId: string,
  ) {
    super();
  }
}
