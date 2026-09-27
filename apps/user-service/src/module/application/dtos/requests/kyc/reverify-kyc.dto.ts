/**
 * ReverifyKycRequestDTO
 */
export interface ReverifyKycRequestDTO {
  readonly kycId: string;
  readonly userId: string;
  readonly reason?: string;
}
