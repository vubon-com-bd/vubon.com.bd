import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { ProductPricingRuleEntity } from '../../../domain/entities/product-pricing-rule.entity';
import type { CreatePricingRuleRequestDTO } from '../../dtos/requests/pricing/create-pricing-rule.dto';

export interface ProductPricingRuleServiceInterface
  extends BaseServiceInterface<ProductPricingRuleEntity, string> {
  create(productId: string, input: CreatePricingRuleRequestDTO): Promise<unknown>;
  update(ruleId: string, value: string): Promise<unknown>;
  delete(ruleId: string): Promise<void>;
  listByPricing(productId: string): Promise<readonly unknown[]>;
}
