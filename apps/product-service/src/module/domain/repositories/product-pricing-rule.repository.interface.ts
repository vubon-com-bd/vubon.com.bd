import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { ProductPricingRuleEntity } from '../entities/product-pricing-rule.entity';
import { PricingRuleIdVO } from '../value-objects/primitives/pricing-rule-id.vo';
import { PriceIdVO } from '../value-objects/primitives/price-id.vo';

export interface ProductPricingRuleRepository
  extends BaseRepository<ProductPricingRuleEntity, PricingRuleIdVO> {
  findByPricing(pricingId: PriceIdVO): Promise<readonly ProductPricingRuleEntity[]>;
  findActiveByPricing(pricingId: PriceIdVO): Promise<readonly ProductPricingRuleEntity[]>;
  deleteByPricing(pricingId: PriceIdVO): Promise<void>;
}
