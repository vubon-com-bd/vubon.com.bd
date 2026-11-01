/**
 * Update Commission Request DTO
 * @module vendor-service/application/dtos/requests/commission
 */
export interface UpdateCommissionRequestDTO {
  readonly vendorId: string;
  readonly type?: 'percentage' | 'fixed' | 'tiered' | 'hybrid' | 'category_based';
  readonly rate?: number;
  readonly fixedAmount?: number;
  readonly minAmount?: number;
  readonly maxAmount?: number;
  readonly categoryOverrides?: Readonly<Record<string, number>>;
  readonly effectiveFrom?: string;
  readonly effectiveTo?: string;
  readonly idempotencyKey?: string;
  readonly actorId?: string;
}
