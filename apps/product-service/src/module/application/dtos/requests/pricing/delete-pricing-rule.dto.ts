/**
 * Delete Pricing Rule Request DTO
 * @module product-service/application/dtos/requests/pricing
 */
export interface DeletePricingRuleRequestDTO {
  readonly ruleId: string;
  readonly reason?: string;
  readonly actorId?: string;
}
