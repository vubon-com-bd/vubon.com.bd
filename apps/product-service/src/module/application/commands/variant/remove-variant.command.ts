import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class RemoveVariantCommand extends BaseCommand {
  readonly type = 'product.variant.remove';

  constructor(public readonly variantId: string) {
    super();
  }
}
