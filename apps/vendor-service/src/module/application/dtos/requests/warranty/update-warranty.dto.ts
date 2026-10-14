/**
 * Update Warranty Request DTO
 * @module vendor-service/application/dtos/requests/warranty
 */
export interface UpdateWarrantyRequestDTO {
  readonly vendorId: string;
  readonly type?:
    | 'none'
    | 'manufacturer'
    | 'seller'
    | 'extended'
    | 'international'
    | 'limited';
  readonly periodDays?: number;
  readonly requireProof?: boolean;
  readonly coverShipping?: boolean;
  readonly autoRegister?: boolean;
  readonly excludedCategories?: readonly string[];
  readonly terms?: string;
  readonly idempotencyKey?: string;
  readonly actorId?: string;
}
