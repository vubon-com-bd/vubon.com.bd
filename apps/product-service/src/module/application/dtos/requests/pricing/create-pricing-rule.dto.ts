/**
 * CreatePricingRuleRequestDTO
 */
export interface CreatePricingRuleRequestDTO {
  readonly name: string;
  readonly type: string;
  readonly conditions: Readonly<Record<string, unknown>>;
  readonly priceAdjustment: number;
  readonly isActive: boolean;
}
