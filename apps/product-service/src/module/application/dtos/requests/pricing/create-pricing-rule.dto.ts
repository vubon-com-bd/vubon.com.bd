/**
 * Create Pricing Rule Request DTO
 * @module product-service/application/dtos/requests/pricing
 */
import type { PricingTypeSchemaType } from '@vubon/shared-schemas/business';

export interface CreatePricingRuleRequestDTO {
  readonly name: string;
  readonly type: PricingTypeSchemaType;
  readonly conditions: Readonly<Record<string, unknown>>;
  readonly priceAdjustment: number;
  readonly isPercent: boolean;
  readonly priority?: number;
  readonly isActive?: boolean;
  readonly actorId?: string;
}
