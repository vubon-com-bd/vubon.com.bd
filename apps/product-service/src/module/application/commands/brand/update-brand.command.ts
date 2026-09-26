import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class UpdateBrandCommand extends BaseCommand {
  readonly type = 'product.brand.update';

  constructor(
    public readonly brandId: string,
    public readonly name?: string,
    public readonly logo?: string | null,
  ) {
    super();
  }
}
