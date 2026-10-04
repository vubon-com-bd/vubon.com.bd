/**
 * ProductPricingEntity — Child of Product aggregate
 * @module product-service/domain/entities
 *
 * Business rules:
 * - sellingPrice <= basePrice
 * - discount cannot exceed PRICING.MAX_DISCOUNT_PERCENT
 * - tax rate in [0, 1]
 * - currency consistent
 */
import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import { PRICING, PRICING_TYPE } from '@vubon/shared-constants/business/product';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { ProductIdVO } from '../value-objects/primitives/product-id.vo.js';
import { VariantIdVO } from '../value-objects/primitives/variant-id.vo.js';
import { PriceVO } from '../value-objects/primitives/price.vo.js';
import { DiscountPercentVO } from '../value-objects/primitives/discount-vo.js';
import { TaxRateVO } from '../value-objects/primitives/tax-rate.vo.js';

export interface ProductPricingEntityProps {
  readonly productId: ProductIdVO;
  readonly variantId?: VariantIdVO;
  readonly type: string;
  readonly basePrice: PriceVO;
  readonly sellingPrice: PriceVO;
  readonly compareAtPrice?: PriceVO;
  readonly costPrice?: PriceVO;
  readonly wholesalePrice?: PriceVO;
  readonly msrp?: PriceVO;
  readonly taxRate: TaxRateVO;
  readonly taxInclusive: boolean;
  readonly discountPercent: DiscountPercentVO;
  readonly effectiveFrom?: string;
  readonly effectiveTo?: string;
}

export class ProductPricingEntity extends BaseEntity<string> {
  private readonly _productId: ProductIdVO;
  private readonly _variantId?: VariantIdVO;
  private readonly _type: string;
  private _basePrice: PriceVO;
  private _sellingPrice: PriceVO;
  private _compareAtPrice?: PriceVO;
  private _costPrice?: PriceVO;
  private _wholesalePrice?: PriceVO;
  private _msrp?: PriceVO;
  private _taxRate: TaxRateVO;
  private readonly _taxInclusive: boolean;
  private _discountPercent: DiscountPercentVO;
  private readonly _effectiveFrom?: string;
  private readonly _effectiveTo?: string;

  private constructor(
    id: string,
    createdAt: string,
    updatedAt: string,
    props: ProductPricingEntityProps,
    deletedAt?: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._productId = props.productId;
    this._variantId = props.variantId;
    this._type = props.type;
    this._basePrice = props.basePrice;
    this._sellingPrice = props.sellingPrice;
    this._compareAtPrice = props.compareAtPrice;
    this._costPrice = props.costPrice;
    this._wholesalePrice = props.wholesalePrice;
    this._msrp = props.msrp;
    this._taxRate = props.taxRate;
    this._taxInclusive = props.taxInclusive;
    this._discountPercent = props.discountPercent;
    this._effectiveFrom = props.effectiveFrom;
    this._effectiveTo = props.effectiveTo;
    this.assertInvariants();
  }

  private assertInvariants(): void {
    if (this._sellingPrice.amount > this._basePrice.amount) {
      throw new BusinessRuleError(
        `Selling price (${this._sellingPrice.amount}) cannot exceed base price (${this._basePrice.amount})`,
        'SELLING_EXCEEDS_BASE',
        { pricingId: this.id },
      );
    }
    if (this._effectiveFrom && this._effectiveTo) {
      if (new Date(this._effectiveFrom) >= new Date(this._effectiveTo)) {
        throw new BusinessRuleError(
          'effectiveFrom must be before effectiveTo',
          'INVALID_EFFECTIVE_RANGE',
        );
      }
    }
  }

  // Getters
  get productId(): ProductIdVO { return this._productId; }
  get variantId(): VariantIdVO | undefined { return this._variantId; }
  get type(): string { return this._type; }
  get basePrice(): PriceVO { return this._basePrice; }
  get sellingPrice(): PriceVO { return this._sellingPrice; }
  get compareAtPrice(): PriceVO | undefined { return this._compareAtPrice; }
  get costPrice(): PriceVO | undefined { return this._costPrice; }
  get wholesalePrice(): PriceVO | undefined { return this._wholesalePrice; }
  get msrp(): PriceVO | undefined { return this._msrp; }
  get taxRate(): TaxRateVO { return this._taxRate; }
  get taxInclusive(): boolean { return this._taxInclusive; }
  get discountPercent(): DiscountPercentVO { return this._discountPercent; }
  get effectiveFrom(): string | undefined { return this._effectiveFrom; }
  get effectiveTo(): string | undefined { return this._effectiveTo; }

  // ─── Business methods ─────────────────────────────────────

  public changeBasePrice(newPrice: PriceVO): void {
    if (newPrice.amount < this._sellingPrice.amount) {
      throw new BusinessRuleError(
        'Base price cannot be lower than current selling price',
        'BASE_LOWER_THAN_SELLING',
      );
    }
    this._basePrice = newPrice;
  }

  public changeSellingPrice(newPrice: PriceVO): void {
    if (newPrice.amount > this._basePrice.amount) {
      throw new BusinessRuleError(
        'Selling price cannot exceed base price',
        'SELLING_EXCEEDS_BASE',
      );
    }
    this._sellingPrice = newPrice;
  }

  public changeCostPrice(newPrice: PriceVO | undefined): void {
    this._costPrice = newPrice;
  }

  public applyDiscount(percent: DiscountPercentVO): void {
    this._discountPercent = percent;
    const discountAmount = percent.applyTo(this._basePrice.amount);
    const newSelling = this._basePrice.amount - discountAmount;
    if (newSelling < 0) {
      throw new BusinessRuleError(
        'Discount would result in negative price',
        'DISCOUNT_TOO_LARGE',
      );
    }
    this._sellingPrice = PriceVO.create(newSelling, this._basePrice.currency);
  }

  public removeDiscount(): void {
    this._discountPercent = DiscountPercentVO.none();
    this._sellingPrice = PriceVO.create(this._basePrice.amount, this._basePrice.currency);
  }

  public changeTaxRate(newRate: TaxRateVO): void {
    this._taxRate = newRate;
  }

  // ─── Calculations ─────────────────────────────────────────

  public totalFor(quantity: number): number {
    if (quantity <= 0) throw new BusinessRuleError('Quantity must be positive', 'INVALID_QUANTITY');
    return Math.round(this._sellingPrice.amount * quantity * 100) / 100;
  }

  public finalPrice(): number {
    if (this._taxInclusive) return this._sellingPrice.amount;
    const tax = this._taxRate.calculateTax(this._sellingPrice.amount);
    return Math.round((this._sellingPrice.amount + tax) * 100) / 100;
  }

  public profitMargin(): number {
    if (!this._costPrice) return 0;
    const profit = this._sellingPrice.amount - this._costPrice.amount;
    return Math.round((profit / this._sellingPrice.amount) * 100);
  }

  public hasDiscount(): boolean {
    return (
      this._compareAtPrice !== undefined &&
      this._compareAtPrice.amount > this._sellingPrice.amount
    );
  }

  public effectiveDiscountPercent(): number {
    if (!this.hasDiscount()) return 0;
    const compare = this._compareAtPrice!;
    const diff = compare.amount - this._sellingPrice.amount;
    return Math.round((diff / compare.amount) * 100);
  }

  public isWithinDiscountLimit(): boolean {
    return this._discountPercent.value <= PRICING.MAX_DISCOUNT_PERCENT;
  }

  // Factories
  public static create(params: {
    id: string;
    props: ProductPricingEntityProps;
    now: string;
  }): ProductPricingEntity {
    return new ProductPricingEntity(params.id, params.now, params.now, params.props);
  }

  public static reconstitute(params: {
    id: string;
    createdAt: string;
    updatedAt: string;
    deletedAt?: string | null;
    props: ProductPricingEntityProps;
  }): ProductPricingEntity {
    return new ProductPricingEntity(
      params.id,
      params.createdAt,
      params.updatedAt,
      params.props,
      params.deletedAt,
    );
  }
}
