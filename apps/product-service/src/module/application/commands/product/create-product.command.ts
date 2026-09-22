import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class CreateProductCommand extends BaseCommand {
  readonly type = 'product.create';

  constructor(
    public readonly name: string,
    public readonly vendorId: string,
    public readonly productType: string = 'simple',
    public readonly categoryId?: string,
    public readonly brandId?: string,
    public readonly description?: string,
  ) {
    super();
  }
}
