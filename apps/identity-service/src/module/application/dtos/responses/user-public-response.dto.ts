/**
 * User Public Response DTO
 * @module identity-service/application/dtos/responses
 */
export interface UserPublicResponseDTO {
  readonly id: string;
  readonly email: string;
  readonly username?: string;
  readonly status: string;
  readonly type: string;
  readonly roles: readonly string[];
  readonly emailVerified: boolean;
  readonly displayName?: string;
  readonly avatarUrl?: string;
  readonly createdAt: string;
}
