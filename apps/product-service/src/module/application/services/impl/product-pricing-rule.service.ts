import { Injectable } from '@nestjs/common';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { ProductPricingRuleServiceInterface } from '../interfaces/product-pricing-rule.service.interface';
import type { ProductPricingRuleRepository } from '../../../domain/repositories/product-pricing-rule.repository.interface';
import { ProductPricingRuleEntity } from '../../../domain/entities/product-pricing-rule.entity';
import { PricingRuleIdVO } from '../../../domain/value-objects/primitives/pricing-rule-id.vo';
import { PricingRuleValueVO } from '../../../domain/value-objects/primitives/pricing-rule-value.vo';
import { PriceIdVO } from '../../../domain/value-objects/primitives/price-id.vo';
import { PricingOperationFailedError } from '../../errors/pricing.errors';
import type { CreatePricingRuleRequestDTO } from '../../dtos/requests/pricing/create-pricing-rule.dto';

@Injectable()
export class ProductPricingRuleService
  extends BaseService<ProductPricingRuleEntity, string>
  implements ProductPricingRuleServiceInterface
{
  readonly name = 'ProductPricingRuleService';

  constructor(private readonly ruleRepo: ProductPricingRuleRepository) {
    super();
  }

  async create(productId: string, input: CreatePricingRuleRequestDTO): Promise<unknown> {
    void input;
    void productId;
    throw new PricingOperationFailedError('create rule not yet wired');
  }

  async update(ruleId: string, value: string): Promise<unknown> {
    const entity = await this.ruleRepo.findById(PricingRuleIdVO.create(ruleId));
    if (!entity) throw new PricingOperationFailedError('rule not found');
    await this.ruleRepo.save(entity);
    void value;
    return entity;
  }

  async delete(ruleId: string): Promise<void> {
    await this.ruleRepo.delete(PricingRuleIdVO.create(ruleId));
  }

  async listByPricing(productId: string): Promise<readonly unknown[]> {
    const rows = await this.ruleRepo.findByPricing(PriceIdVO.create(productId));
    return rows;
  }
}
