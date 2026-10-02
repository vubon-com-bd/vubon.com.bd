/**
 * ProductVariantEntity — Child of Product aggregate
 * @module product-service/domain/entities
 */
import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import { VARIANT, VARIANT_STATUS } from '@vubon/shared-constants/business/product';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { VariantIdVO } from '../value-objects/primitives/variant-id.vo.js';
import { VariantNameVO } from '../value-objects/primitives/variant-name.vo.js';
import { VariantSkuVO } from '../value-objects/primitives/variant-sku.vo.js';
import { ProductIdVO } from '../value-objects/primitives/product-id.vo.js';
import { PriceVO } from '../value-objects/primitives/price.vo.js';

export interface ProductVariantOptionItem {
  readonly name: string;
  readonly value: string;
}

export interface ProductVariantEntityProps {
  readonly productId: ProductIdVO;
  readonly name: VariantNameVO;
  readonly sku: VariantSkuVO;
  readonly barcode?: string;
  readonly type: string;
  readonly options: readonly ProductVariantOptionItem[];
  readonly price: PriceVO;
  readonly compareAtPrice?: PriceVO;
  readonly cost?: PriceVO;
  readonly weight?: number;
  readonly imageUrl?: string;
  readonly status: string;
  readonly stock: number;
}

export class ProductVariantEntity extends BaseEntity<string> {
  private readonly _productId: ProductIdVO;
  private readonly _name: VariantNameVO;
  private readonly _sku: VariantSkuVO;
  private readonly _barcode?: string;
  private readonly _type: string;
  private readonly _options: readonly ProductVariantOptionItem[];
  private _price: PriceVO;
  private _compareAtPrice?: PriceVO;
  private _cost?: PriceVO;
  private _weight?: number;
  private _imageUrl?: string;
  private _status: string;
  private _stock: number;

  private constructor(
    id: string,
    createdAt: string,
    updatedAt: string,
    props: ProductVariantEntityProps,
    deletedAt?: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._productId = props.productId;
    this._name = props.name;
    this._sku = props.sku;
    this._barcode = props.barcode;
    this._type = props.type;
    this._options = Object.freeze([...props.options]);
    this._price = props.price;
    this._compareAtPrice = props.compareAtPrice;
    this._cost = props.cost;
    this._weight = props.weight;
    this._imageUrl = props.imageUrl;
    this._status = props.status;
    this._stock = props.stock;

    this.assertInvariants();
  }

  private assertInvariants(): void {
    if (this._options.length === 0) {
      throw new ValidationError('Variant must have at least one option', 'options');
    }
    if (this._options.length > VARIANT.MAX_OPTIONS_PER_VARIANT) {
      throw new ValidationError(
        `Variant cannot have more than ${VARIANT.MAX_OPTIONS_PER_VARIANT} options`,
        'options',
      );
    }
    if (this._stock < 0) {
      throw new ValidationError('Variant stock cannot be negative', 'stock');
    }
  }

  // Getters
  get productId(): ProductIdVO { return this._productId; }
  get name(): VariantNameVO { return this._name; }
  get sku(): VariantSkuVO { return this._sku; }
  get barcode(): string | undefined { return this._barcode; }
  get type(): string { return this._type; }
  get options(): readonly ProductVariantOptionItem[] { return this._options; }
  get price(): PriceVO { return this._price; }
  get compareAtPrice(): PriceVO | undefined { return this._compareAtPrice; }
  get cost(): PriceVO | undefined { return this._cost; }
  get weight(): number | undefined { return this._weight; }
  get imageUrl(): string | undefined { return this._imageUrl; }
  get status(): string { return this._status; }
  get stock(): number { return this._stock; }

  // ─── Business methods ─────────────────────────────────────

  public changePrice(newPrice: PriceVO, now: string): void {
    void now;
    if (this._price.amount === newPrice.amount) return;
    this._price = newPrice;
  }

  public changeStock(newStock: number, now: string): void {
    void now;
    if (newStock < 0) {
      throw new ValidationError('Stock cannot be negative', 'stock');
    }
    this._stock = newStock;
    if (this._stock === 0) {
      this._status = VARIANT_STATUS.OUT_OF_STOCK;
    } else if (this._status === VARIANT_STATUS.OUT_OF_STOCK) {
      this._status = VARIANT_STATUS.ACTIVE;
    }
  }

  public updateImage(url: string | undefined): void {
    this._imageUrl = url;
  }

  public updateCost(cost: PriceVO | undefined): void {
    this._cost = cost;
  }

  public updateWeight(weight: number | undefined): void {
    if (weight !== undefined && weight <= 0) {
      throw new ValidationError('Weight must be positive', 'weight');
    }
    this._weight = weight;
  }

  public activate(): void {
    this._status = VARIANT_STATUS.ACTIVE;
  }

  public deactivate(): void {
    this._status = VARIANT_STATUS.INACTIVE;
  }

  // ─── Queries ──────────────────────────────────────────────

  public isAvailable(): boolean {
    return (
      this._status === VARIANT_STATUS.ACTIVE &&
      this._stock > 0 &&
      !this.isDeleted()
    );
  }

  public isOutOfStock(): boolean {
    return this._status === VARIANT_STATUS.OUT_OF_STOCK || this._stock === 0;
  }

  public getProfitMargin(): number {
    if (!this._cost || this._price.amount === 0) return 0;
    const profit = this._price.amount - this._cost.amount;
    return Math.round((profit / this._price.amount) * 100);
  }

  public hasDiscount(): boolean {
    return (
      this._compareAtPrice !== undefined &&
      this._compareAtPrice.amount > this._price.amount
    );
  }

  public matchesOptions(needle: readonly ProductVariantOptionItem[]): boolean {
    if (needle.length !== this._options.length) return false;
    return needle.every((n) =>
      this._options.some(
        (o) =>
          o.name.toLowerCase() === n.name.toLowerCase() &&
          o.value.toLowerCase() === n.value.toLowerCase(),
      ),
    );
  }

  public optionsSignature(): string {
    return [...this._options]
      .map((o) => `${o.name}:${o.value}`)
      .sort()
      .join('|');
  }

  // ─── Factories ────────────────────────────────────────────

  public static create(params: {
    id: string;
    props: ProductVariantEntityProps;
    now: string;
  }): ProductVariantEntity {
    return new ProductVariantEntity(params.id, params.now, params.now, params.props);
  }

  public static reconstitute(params: {
    id: string;
    createdAt: string;
    updatedAt: string;
    deletedAt?: string | null;
    props: ProductVariantEntityProps;
  }): ProductVariantEntity {
    return new ProductVariantEntity(
      params.id,
      params.createdAt,
      params.updatedAt,
      params.props,
      params.deletedAt,
    );
  }
}
