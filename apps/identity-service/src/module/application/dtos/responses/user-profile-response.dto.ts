/**
 * User Profile Response DTO
 * @module identity-service/application/dtos/responses
 */
export interface UserProfileResponseDTO {
  readonly userId: string;
  readonly firstName?: string;
  readonly lastName?: string;
  readonly displayName?: string;
  readonly bio?: string;
  readonly avatarUrl?: string;
  readonly coverUrl?: string;
  readonly dateOfBirth?: string;
  readonly gender?: string;
  readonly website?: string;
  readonly language?: string;
  readonly locale?: string;
  readonly timezone?: string;
  readonly visibility: string;
  readonly completionPercent: number;
  readonly updatedAt: string;
}
