import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class DeleteBrandCommand extends BaseCommand {
  readonly type = 'product.brand.delete';

  constructor(public readonly brandId: string) {
    super();
  }
}
