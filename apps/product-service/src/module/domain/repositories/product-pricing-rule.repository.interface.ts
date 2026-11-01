/**
 * Product Pricing Rule Repository Interface
 * @module product-service/domain/repositories
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import type { ProductPricingRuleEntity } from '../entities/product-pricing-rule.entity.js';
import type { PricingRuleIdVO } from '../value-objects/primitives/pricing-rule-id.vo.js';

export const PRICING_RULE_REPOSITORY = Symbol('PRICING_RULE_REPOSITORY');

export interface PricingRuleListFilter {
  readonly isActive?: boolean;
  readonly type?: string;
  readonly minPriority?: number;
}

export interface PricingRuleListOptions {
  readonly page: number;
  readonly limit: number;
  readonly sortBy?: 'priority' | 'createdAt';
  readonly sortDir?: 'asc' | 'desc';
  readonly filter?: PricingRuleListFilter;
}

export interface PricingRulePaginationResult {
  readonly items: readonly ProductPricingRuleEntity[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}

export interface ProductPricingRuleRepository extends BaseRepository<ProductPricingRuleEntity, string> {
  findByIdVO(id: PricingRuleIdVO): Promise<ProductPricingRuleEntity | null>;

  findActiveByPriority(): Promise<readonly ProductPricingRuleEntity[]>;
  findByType(type: string): Promise<readonly ProductPricingRuleEntity[]>;

  findPaginated(options: PricingRuleListOptions): Promise<PricingRulePaginationResult>;

  softDelete(id: string, deletedBy?: string): Promise<void>;
}
