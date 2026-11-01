/**
 * ProductPricingRuleEntity — Child of Product aggregate
 * @module product-service/domain/entities
 */
import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import { ProductPricingRuleVO } from '../value-objects/composites/product-pricing-rule.vo.js';

export class ProductPricingRuleEntity extends BaseEntity<string> {
  private _vo: ProductPricingRuleVO;

  private constructor(
    id: string,
    createdAt: string,
    updatedAt: string,
    vo: ProductPricingRuleVO,
    deletedAt?: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._vo = vo;
  }

  get vo(): ProductPricingRuleVO { return this._vo; }
  get ruleId(): ProductPricingRuleVO['id'] { return this._vo.id; }
  get name(): string { return this._vo.name; }
  get priority(): number { return this._vo.priority; }
  get isActive(): boolean { return this._vo.isActive; }

  apply(basePrice: number): number { return this._vo.apply(basePrice); }

  activate(now: string = new Date().toISOString()): void {
    this._vo = ProductPricingRuleVO.create({ ...this._vo.value, isActive: true });
    (this as unknown as { updatedAt: string }).updatedAt = now;
  }

  deactivate(now: string = new Date().toISOString()): void {
    this._vo = ProductPricingRuleVO.create({ ...this._vo.value, isActive: false });
    (this as unknown as { updatedAt: string }).updatedAt = now;
  }

  static create(params: {
    id: string;
    vo: ProductPricingRuleVO;
    now: string;
  }): ProductPricingRuleEntity {
    return new ProductPricingRuleEntity(params.id, params.now, params.now, params.vo, null);
  }

  static reconstitute(params: {
    id: string;
    createdAt: string;
    updatedAt: string;
    deletedAt?: string | null;
    vo: ProductPricingRuleVO;
  }): ProductPricingRuleEntity {
    return new ProductPricingRuleEntity(
      params.id,
      params.createdAt,
      params.updatedAt,
      params.vo,
      params.deletedAt ?? null,
    );
  }
}
