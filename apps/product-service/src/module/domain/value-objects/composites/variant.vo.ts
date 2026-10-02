/**
 * VariantCompositeVO — Variant value composition
 * @module product-service/domain/value-objects/composites
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { VariantIdVO } from '../primitives/variant-id.vo.js';
import { VariantNameVO } from '../primitives/variant-name.vo.js';
import { VariantSkuVO } from '../primitives/variant-sku.vo.js';
import { ProductIdVO } from '../primitives/product-id.vo.js';
import { PriceVO } from '../primitives/price.vo.js';

export interface VariantOptionVO {
  readonly name: string;
  readonly value: string;
}

export interface VariantCompositeProps {
  readonly id: VariantIdVO;
  readonly productId: ProductIdVO;
  readonly name: VariantNameVO;
  readonly sku: VariantSkuVO;
  readonly type: string;
  readonly options: readonly VariantOptionVO[];
  readonly price: PriceVO;
  readonly compareAtPrice?: PriceVO;
  readonly cost?: PriceVO;
  readonly weight?: number;
  readonly imageUrl?: string;
  readonly status: string;
  readonly stock: number;
}

export class VariantCompositeVO extends BaseVO<VariantCompositeProps> {
  private constructor(props: VariantCompositeProps) {
    super(props);
  }

  static create(props: VariantCompositeProps): VariantCompositeVO {
    if (props.options.length === 0) {
      throw new Error('Variant must have at least one option');
    }
    if (props.options.length > 50) {
      throw new Error('Variant cannot have more than 50 options');
    }
    if (props.stock < 0) {
      throw new Error('Variant stock cannot be negative');
    }
    return new VariantCompositeVO(props);
  }

  static reconstitute(props: VariantCompositeProps): VariantCompositeVO {
    return new VariantCompositeVO(props);
  }

  get id(): VariantIdVO { return this.value.id; }
  get productId(): ProductIdVO { return this.value.productId; }
  get name(): VariantNameVO { return this.value.name; }
  get sku(): VariantSkuVO { return this.value.sku; }
  get options(): readonly VariantOptionVO[] { return this.value.options; }
  get price(): PriceVO { return this.value.price; }
  get compareAtPrice(): PriceVO | undefined { return this.value.compareAtPrice; }
  get cost(): PriceVO | undefined { return this.value.cost; }
  get stock(): number { return this.value.stock; }
  get status(): string { return this.value.status; }

  isAvailable(): boolean {
    return this.value.stock > 0 && this.value.status === 'active';
  }

  getProfitMargin(): number {
    if (!this.value.cost) return 0;
    const profit = this.value.price.amount - this.value.cost.amount;
    return Math.round((profit / this.value.price.amount) * 100);
  }

  toPlainJSON(): Readonly<Record<string, unknown>> {
    return {
      id: this.value.id.value,
      productId: this.value.productId.value,
      name: this.value.name.value,
      sku: this.value.sku.value,
      options: [...this.value.options],
      price: this.value.price.amount,
      stock: this.value.stock,
      status: this.value.status,
    };
  }
}
