/**
 * Reject Vendor Request DTO
 * @module vendor-service/application/dtos/requests/approval
 */
export interface RejectVendorRequestDTO {
  readonly vendorId: string;
  readonly reason:
    | 'complete'
    | 'incomplete_documents'
    | 'invalid_documents'
    | 'policy_violation'
    | 'fraud_suspected'
    | 'duplicate_account'
    | 'other';
  readonly notes?: string;
  readonly idempotencyKey?: string;
  readonly actorId?: string;
}
