import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export interface VariantOptionInput {
  readonly name: string;
  readonly value: string;
}

export class AddVariantCommand extends BaseCommand {
  readonly type = 'product.variant.add';

  constructor(
    public readonly productId: string,
    public readonly name: string,
    public readonly sku: string,
    public readonly price: number,
    public readonly variantType: string,
    public readonly options: readonly VariantOptionInput[],
    public readonly weight?: number,
    public readonly barcode?: string,
  ) {
    super();
  }
}
