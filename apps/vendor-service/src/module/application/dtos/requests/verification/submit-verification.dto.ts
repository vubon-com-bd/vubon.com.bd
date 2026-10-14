/**
 * Submit Verification Request DTO
 * @module vendor-service/application/dtos/requests/verification
 */
export interface SubmitVerificationRequestDTO {
  readonly vendorId: string;
  readonly type:
    | 'email'
    | 'phone'
    | 'business_license'
    | 'tax_id'
    | 'bank_account'
    | 'identity'
    | 'address'
    | 'website';
  readonly referenceId?: string;
  readonly idempotencyKey?: string;
  readonly actorId?: string;
}
