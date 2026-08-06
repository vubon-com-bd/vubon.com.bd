import type { SocialAccount } from '../entities/social-account.entity';
import type { IBaseRepository } from './base.repository.interface';
import type { UserId, Email } from '../value-objects';
import type { SocialProvider } from '../entities/social-account.entity';

/**
 * Social Account Repository Interface
 * Extends the base repository with social account-specific operations
 * Follows DIP (Dependency Inversion Principle) - domain layer depends on this abstraction
 */
export interface ISocialAccountRepository extends IBaseRepository<SocialAccount> {
  /**
   * Find a social account by provider and provider user ID
   * @param provider - The social provider (google, facebook, github, etc.)
   * @param providerUserId - The user ID from the social provider
   * @returns The found social account or null if not found
   */
  findByProvider(provider: SocialProvider, providerUserId: string): Promise<SocialAccount | null>;

  /**
   * Find all social accounts for a specific user
   * @param userId - The UserId value object of the user
   * @param page - Page number for pagination (1-indexed)
   * @param limit - Number of items per page
   * @returns A paginated result containing social accounts and total count
   */
  findByUserId(
    userId: UserId,
    page: number,
    limit: number
  ): Promise<{
    items: SocialAccount[];
    total: number;
  }>;

  /**
   * Find all social accounts by email (Value Object)
   * @param email - The Email value object to search for
   * @param page - Page number for pagination (1-indexed)
   * @param limit - Number of items per page
   * @returns A paginated result containing social accounts and total count
   */
  findByEmail(
    email: Email,
    page: number,
    limit: number
  ): Promise<{
    items: SocialAccount[];
    total: number;
  }>;

  /**
   * Find all social accounts by provider
   * @param provider - The social provider to filter by
   * @param page - Page number for pagination (1-indexed)
   * @param limit - Number of items per page
   * @returns A paginated result containing social accounts and total count
   */
  findByProviderOnly(
    provider: SocialProvider,
    page: number,
    limit: number
  ): Promise<{
    items: SocialAccount[];
    total: number;
  }>;

  /**
   * Find all active social accounts for a specific user
   * @param userId - The UserId value object of the user
   * @param page - Page number for pagination (1-indexed)
   * @param limit - Number of items per page
   * @returns A paginated result containing active social accounts and total count
   */
  findActiveByUserId(
    userId: UserId,
    page: number,
    limit: number
  ): Promise<{
    items: SocialAccount[];
    total: number;
  }>;

  /**
   * Check if a social account exists for a provider and provider user ID
   * @param provider - The social provider
   * @param providerUserId - The user ID from the social provider
   * @returns True if the social account exists, false otherwise
   */
  existsByProvider(provider: SocialProvider, providerUserId: string): Promise<boolean>;

  /**
   * Check if a user has a specific social account linked
   * @param userId - The UserId value object of the user
   * @param provider - The social provider to check
   * @returns True if the user has the social account linked, false otherwise
   */
  hasProvider(userId: UserId, provider: SocialProvider): Promise<boolean>;

  /**
   * Deactivate all social accounts for a specific user
   * @param userId - The UserId value object of the user
   * @param reason - Optional reason for deactivation
   * @returns Number of social accounts deactivated
   */
  deactivateAllByUserId(userId: UserId, reason?: string): Promise<number>;

  /**
   * Reactivate all social accounts for a specific user
   * @param userId - The UserId value object of the user
   * @returns Number of social accounts reactivated
   */
  reactivateAllByUserId(userId: UserId): Promise<number>;

  /**
   * Get the count of social accounts by provider
   * @param provider - The social provider to filter by
   * @returns The number of social accounts for the provider
   */
  countByProvider(provider: SocialProvider): Promise<number>;

  /**
   * Get the count of social accounts for a user
   * @param userId - The UserId value object of the user
   * @returns The number of social accounts for the user
   */
  countByUserId(userId: UserId): Promise<number>;

  /**
   * Update access token for a social account
   * @param id - The unique identifier of the social account
   * @param accessToken - The new access token
   * @param refreshToken - The new refresh token (optional)
   * @param expiresAt - The new expiry date (optional)
   * @returns True if update was successful, false if not found
   */
  updateTokens(
    id: string,
    accessToken: string,
    refreshToken?: string,
    expiresAt?: Date
  ): Promise<boolean>;

  /**
   * Update social account profile information
   * @param id - The unique identifier of the social account
   * @param email - The new email (Value Object)
   * @param name - The new name
   * @param avatar - The new avatar URL (optional)
   * @returns True if update was successful, false if not found
   */
  updateProfile(id: string, email: Email, name: string, avatar?: string): Promise<boolean>;
}
