import type { RefreshToken } from '../entities/refresh-token.entity';
import type { IBaseRepository } from './base.repository.interface';
import type { Token, UserId } from '../value-objects';

/**
 * Refresh Token Repository Interface
 * Extends the base repository with refresh token-specific operations
 * Follows DIP (Dependency Inversion Principle) - domain layer depends on this abstraction
 */
export interface IRefreshTokenRepository extends IBaseRepository<RefreshToken> {
  /**
   * Find a refresh token by its token value (Value Object)
   * @param token - The Token value object to search for
   * @returns The found refresh token or null if not found
   */
  findByToken(token: Token): Promise<RefreshToken | null>;

  /**
   * Find all refresh tokens by family ID
   * @param familyId - The family ID to search for
   * @param page - Page number for pagination (1-indexed)
   * @param limit - Number of items per page
   * @returns A paginated result containing refresh tokens and total count
   */
  findByFamilyId(
    familyId: string,
    page: number,
    limit: number
  ): Promise<{
    items: RefreshToken[];
    total: number;
  }>;

  /**
   * Find all refresh tokens for a specific user
   * @param userId - The UserId value object of the user
   * @param page - Page number for pagination (1-indexed)
   * @param limit - Number of items per page
   * @returns A paginated result containing refresh tokens and total count
   */
  findByUserId(
    userId: UserId,
    page: number,
    limit: number
  ): Promise<{
    items: RefreshToken[];
    total: number;
  }>;

  /**
   * Find the latest refresh token in a family
   * @param familyId - The family ID to search for
   * @returns The latest refresh token or null if not found
   */
  findLatestByFamilyId(familyId: string): Promise<RefreshToken | null>;

  /**
   * Revoke all refresh tokens in a family
   * @param familyId - The family ID to revoke
   * @param reason - Optional reason for revocation
   * @returns Number of tokens revoked
   */
  revokeAllByFamilyId(familyId: string, reason?: string): Promise<number>;

  /**
   * Revoke all refresh tokens for a specific user
   * @param userId - The UserId value object of the user
   * @param reason - Optional reason for revocation
   * @returns Number of tokens revoked
   */
  revokeAllByUserId(userId: UserId, reason?: string): Promise<number>;

  /**
   * Revoke all expired refresh tokens
   * @returns Number of tokens revoked
   */
  revokeAllExpired(): Promise<number>;

  /**
   * Rotate a refresh token (create a new one in the same family)
   * @param oldToken - The old refresh token entity
   * @param newToken - The new Token value object
   * @param expiresInSeconds - New token expiry in seconds
   * @returns The new refresh token entity
   */
  rotate(oldToken: RefreshToken, newToken: Token, expiresInSeconds: number): Promise<RefreshToken>;

  /**
   * Check if a token is valid (not revoked and not expired)
   * @param id - The unique identifier of the refresh token
   * @returns True if the token is valid, false otherwise
   */
  isValid(id: string): Promise<boolean>;

  /**
   * Get the count of active tokens for a user
   * @param userId - The UserId value object of the user
   * @returns The number of active tokens
   */
  countActiveByUserId(userId: UserId): Promise<number>;

  /**
   * Get the count of tokens by family ID
   * @param familyId - The family ID to count
   * @returns The number of tokens in the family
   */
  countByFamilyId(familyId: string): Promise<number>;

  /**
   * Update token's last used timestamp
   * @param id - The unique identifier of the refresh token
   * @returns True if update was successful, false if not found
   */
  updateLastUsed(id: string): Promise<boolean>;
}
