/**
 * Suspend Vendor Request DTO
 * @module vendor-service/application/dtos/requests/suspension
 */
export interface SuspendVendorRequestDTO {
  readonly vendorId: string;
  readonly reason:
    | 'policy_violation'
    | 'fraud'
    | 'non_payment'
    | 'poor_performance'
    | 'customer_complaints'
    | 'document_expired'
    | 'inappropriate_content'
    | 'other';
  readonly description?: string;
  readonly durationDays?: number;
  readonly idempotencyKey?: string;
  readonly actorId?: string;
}
