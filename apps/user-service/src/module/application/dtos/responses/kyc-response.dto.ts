/**
 * KycResponseDTO
 */
export interface KycResponseDTO {
  readonly userId: string;
  readonly status: string;
  readonly level: number;
  readonly documents: readonly {
    readonly id: string;
    readonly type: string;
    readonly number?: string;
    readonly frontUrl: string;
    readonly backUrl?: string;
    readonly selfieUrl?: string;
    readonly verified: boolean;
    readonly uploadedAt: string;
  }[];
  readonly submittedAt?: string;
  readonly reviewedAt?: string;
  readonly reviewedBy?: string;
  readonly rejectionReason?: string;
  readonly expiresAt?: string;
  readonly updatedAt: string;
}
