import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class CreateBrandCommand extends BaseCommand {
  readonly type = 'product.brand.create';

  constructor(
    public readonly name: string,
    public readonly slug: string,
    public readonly logo?: string,
  ) {
    super();
  }
}
