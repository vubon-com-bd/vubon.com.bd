/**
 * UpdatePricingRuleRequestDTO
 */
export interface UpdatePricingRuleRequestDTO {
  readonly ruleId: string;
  readonly name?: string;
  readonly conditions?: Readonly<Record<string, unknown>>;
  readonly priceAdjustment?: number;
  readonly isActive?: boolean;
}
