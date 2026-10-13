/**
 * Update Pricing Rule Request DTO
 * @module product-service/application/dtos/requests/pricing
 */
export interface UpdatePricingRuleRequestDTO {
  readonly ruleId: string;
  readonly name?: string;
  readonly conditions?: Readonly<Record<string, unknown>>;
  readonly priceAdjustment?: number;
  readonly isPercent?: boolean;
  readonly priority?: number;
  readonly isActive?: boolean;
  readonly actorId?: string;
}
