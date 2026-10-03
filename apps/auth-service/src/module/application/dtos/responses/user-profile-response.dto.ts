/**
 * UserProfileResponseDTO
 * @module auth-service/application/dtos/responses
 */
export interface UserProfileResponseDTO {
  readonly userId: string;
  readonly displayName: string;
  readonly bio?: string;
  readonly avatarUrl?: string;
  readonly locale: string;
  readonly updatedAt: string;
}
