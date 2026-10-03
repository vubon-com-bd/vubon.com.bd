/**
 * UpdatePriceRequestDTO
 */
export interface UpdatePriceRequestDTO {
  readonly pricingId: string;
  readonly basePrice?: number;
  readonly sellingPrice?: number;
  readonly compareAtPrice?: number;
  readonly costPrice?: number;
  readonly updatedBy: string;
}
