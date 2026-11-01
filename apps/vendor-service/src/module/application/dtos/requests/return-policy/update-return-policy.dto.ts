/**
 * Update Return Policy Request DTO
 * @module vendor-service/application/dtos/requests/return-policy
 */
export interface UpdateReturnPolicyRequestDTO {
  readonly vendorId: string;
  readonly type?:
    | 'no_return'
    | 'full_return'
    | 'exchange_only'
    | 'partial_return'
    | 'conditional';
  readonly windowDays?: number;
  readonly isFreeReturn?: boolean;
  readonly restockFeePercent?: number;
  readonly requireReason?: boolean;
  readonly requireImages?: boolean;
  readonly maxImages?: number;
  readonly autoApprove?: boolean;
  readonly approvalSlaHours?: number;
  readonly excludedCategories?: readonly string[];
  readonly notes?: string;
  readonly idempotencyKey?: string;
  readonly actorId?: string;
}
