import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class UpdateVariantCommand extends BaseCommand {
  readonly type = 'product.variant.update';

  constructor(
    public readonly variantId: string,
    public readonly name?: string,
    public readonly price?: number,
  ) {
    super();
  }
}
