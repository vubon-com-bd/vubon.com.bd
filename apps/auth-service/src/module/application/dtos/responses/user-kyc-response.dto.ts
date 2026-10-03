/**
 * UserKycResponseDTO
 * @module auth-service/application/dtos/responses
 */
export type UserKycStatusValue =
  | 'not_submitted'
  | 'pending'
  | 'approved'
  | 'rejected';

export type KycDocumentTypeValue =
  | 'nid'
  | 'passport'
  | 'driving_license'
  | 'birth_certificate';

export interface UserKycResponseDTO {
  readonly id: string;
  readonly userId: string;
  readonly status: UserKycStatusValue;
  readonly documentType: KycDocumentTypeValue;
  readonly documentNumberMasked: string;   // e.g. "****1234"
  readonly submittedAt?: string;
  readonly reviewedAt?: string;
  readonly rejectionReason?: string;
}
