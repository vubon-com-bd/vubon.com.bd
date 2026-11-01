/**
 * IProductPricingRuleService — contract
 * @module product-service/application/services/interfaces
 */
import type {
  CreatePricingRuleRequestDTO,
  UpdatePricingRuleRequestDTO,
  DeletePricingRuleRequestDTO,
} from '../../dtos/requests/pricing/index.js';

export const PRICING_RULE_SERVICE = Symbol('PRICING_RULE_SERVICE');

export interface PricingRuleResponseDTO {
  readonly id: string;
  readonly name: string;
  readonly type: string;
  readonly conditions: Readonly<Record<string, unknown>>;
  readonly priceAdjustment: number;
  readonly isPercent: boolean;
  readonly priority: number;
  readonly isActive: boolean;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export interface PricingRuleListResponseDTO {
  readonly items: readonly PricingRuleResponseDTO[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}

export interface IProductPricingRuleService {
  // Commands
  create(dto: CreatePricingRuleRequestDTO): Promise<PricingRuleResponseDTO>;
  update(dto: UpdatePricingRuleRequestDTO): Promise<PricingRuleResponseDTO>;
  delete(dto: DeletePricingRuleRequestDTO): Promise<{ readonly success: true; readonly ruleId: string }>;

  // Queries
  getById(id: string): Promise<PricingRuleResponseDTO>;
  listActive(): Promise<readonly PricingRuleResponseDTO[]>;
  list(page?: number, limit?: number): Promise<PricingRuleListResponseDTO>;
}
