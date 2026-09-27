/**
 * RejectKycRequestDTO
 */
export interface RejectKycRequestDTO {
  readonly kycId: string;
  readonly reason: string;
  readonly rejectedBy: string;
}
