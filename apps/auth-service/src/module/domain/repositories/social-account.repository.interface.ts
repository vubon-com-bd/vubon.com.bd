/**
 * Social Account Repository Interface - Pure Domain Contract
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module domain/repositories/social-account.repository.interface
 * 
 * @description
 * Repository interface for SocialAccount entity persistence.
 * Manages social account linking for OAuth authentication.
 * 
 * Enterprise Rules:
 * ✅ ONLY interface definitions - NO implementation
 * ✅ Extends BaseRepository for consistency
 * ✅ Supports multiple providers (including Bangladesh-specific)
 * ✅ Batch operations for security events
 * ✅ Statistics and analytics support
 * ✅ Framework-free, infrastructure-agnostic
 */

import { BaseRepository, PaginationOptions, PaginatedResult } from './base.repository.interface';
import { SocialAccount, SocialProvider, SocialAccountStatus } from '../entities/social-account.entity';
import { Email } from '../value-objects/email.vo';
import { Phone } from '../value-objects/phone.vo';

// ==================== Types ====================

/**
 * Provider linking result
 */
export interface ProviderLinkingResult {
  userId: string;
  provider: SocialProvider;
  isLinked: boolean;
  isPrimary: boolean;
  linkedAt?: Date;
  linkedCount: number;
  providerUserId: string;
}

/**
 * Provider statistics
 */
export interface ProviderStatistics {
  provider: SocialProvider;
  providerDisplayName: string;
  totalAccounts: number;
  activeAccounts: number;
  suspendedAccounts: number;
  unlinkedAccounts: number;
  primaryAccounts: number;
  linkingTrendLast7Days: number;
  unlinkingTrendLast7Days: number;
  verificationRate: number;
}

/**
 * Social account statistics
 */
export interface SocialAccountStatistics {
  totalAccounts: number;
  activeAccounts: number;
  suspendedAccounts: number;
  unlinkedAccounts: number;
  uniqueUsersWithSocialLogin: number;
  socialLoginAdoptionRate: number;
  accountsPerUser: {
    min: number;
    max: number;
    avg: number;
    p95: number;
  };
  providerDistribution: Record<SocialProvider, ProviderStatistics>;
  mostLinkedProvider: SocialProvider;
  mostActiveProvider: SocialProvider;
  averageLinkDurationDays: number;
  linksLast24Hours: number;
  linksLast7Days: number;
  linksLast30Days: number;
  // Bangladesh specific
  bdProviderAdoption: Record<SocialProvider, number>;
}

/**
 * Bulk unlink result
 */
export interface BulkUnlinkResult {
  unlinkedCount: number;
  failedCount: number;
  errors: Array<{ id: string; error: string }>;
  unlinkedAccountIds: string[];
  affectedUserIds: string[];
}

/**
 * Social account filters
 */
export interface SocialAccountFilters {
  userId?: string;
  provider?: SocialProvider;
  status?: SocialAccountStatus;
  email?: Email;
  phone?: Phone;
  isLinked?: boolean;
  isActive?: boolean;
  isPrimary?: boolean;
  fromDate?: Date;
  toDate?: Date;
  district?: string;
}

/**
 * Social account merge result
 */
export interface SocialAccountMergeResult {
  mergedCount: number;
  primaryUserId: string;
  secondaryUserId: string;
  conflicts: Array<{ field: string; primaryValue: string; secondaryValue: string }>;
  resolvedAt: Date;
}

/**
 * Anomaly detection result
 */
export interface SocialAnomalyDetectionResult {
  hasAnomaly: boolean;
  severity: 'low' | 'medium' | 'high' | 'critical';
  suspiciousActivities: Array<{
    userId: string;
    provider: SocialProvider;
    reason: string;
    timestamp: Date;
    recommendation: string;
  }>;
  detectedAt: Date;
}

// ==================== Repository Interface ====================

/**
 * Social Account Repository Interface
 * 
 * Manages social account linking and provider integration
 */
export interface SocialAccountRepository extends BaseRepository<SocialAccount> {
  // ========== Find Operations ==========
  
  /**
   * Find social account by provider and provider user ID
   * @param provider - Social provider
   * @param providerUserId - Provider's user ID
   * @returns Social account or null
   */
  findByProvider(
    provider: SocialProvider,
    providerUserId: string
  ): Promise<SocialAccount | null>;
  
  /**
   * Find social account by provider and email
   * @param provider - Social provider
   * @param email - Provider email
   * @returns Social account or null
   */
  findByProviderAndEmail(
    provider: SocialProvider,
    email: Email
  ): Promise<SocialAccount | null>;
  
  /**
   * Find social account by provider and phone (Bangladesh specific)
   * @param provider - Social provider (WhatsApp, Imo, Telegram, bKash, Nagad, Rocket)
   * @param phone - Phone number
   * @returns Social account or null
   */
  findByProviderAndPhone(
    provider: SocialProvider,
    phone: Phone
  ): Promise<SocialAccount | null>;
  
  /**
   * Find all social accounts for a user
   * @param userId - User ID
   * @returns Array of social accounts
   */
  findByUserId(userId: string): Promise<SocialAccount[]>;
  
  /**
   * Find social accounts for a user with pagination
   * @param userId - User ID
   * @param options - Pagination options
   * @returns Paginated social accounts
   */
  findByUserIdPaginated(
    userId: string,
    options: PaginationOptions
  ): Promise<PaginatedResult<SocialAccount>>;
  
  /**
   * Find social accounts by status
   * @param status - Account status
   * @param options - Pagination options
   * @returns Paginated social accounts
   */
  findByStatus(
    status: SocialAccountStatus,
    options: PaginationOptions
  ): Promise<PaginatedResult<SocialAccount>>;
  
  /**
   * Find active social accounts (status = ACTIVE)
   * @param options - Pagination options
   * @returns Paginated active accounts
   */
  findActiveAccounts(options: PaginationOptions): Promise<PaginatedResult<SocialAccount>>;
  
  /**
   * Find suspended social accounts
   * @param options - Pagination options
   * @returns Paginated suspended accounts
   */
  findSuspendedAccounts(options: PaginationOptions): Promise<PaginatedResult<SocialAccount>>;
  
  /**
   * Find social accounts by provider
   * @param provider - Social provider
   * @param options - Pagination options
   * @returns Paginated accounts by provider
   */
  findByProviderPaginated(
    provider: SocialProvider,
    options: PaginationOptions
  ): Promise<PaginatedResult<SocialAccount>>;
  
  /**
   * Find primary social account for a user
   * @param userId - User ID
   * @returns Primary social account or null
   */
  findPrimaryByUserId(userId: string): Promise<SocialAccount | null>;
  
  /**
   * Find social accounts by filters
   * @param filters - Query filters
   * @param options - Pagination options
   * @returns Paginated social accounts
   */
  findByFilters(
    filters: SocialAccountFilters,
    options: PaginationOptions
  ): Promise<PaginatedResult<SocialAccount>>;
  
  /**
   * Find all providers linked to a user
   * @param userId - User ID
   * @returns Array of linked providers
   */
  findLinkedProviders(userId: string): Promise<SocialProvider[]>;
  
  /**
   * Find users by provider (for notifications, etc.)
   * @param provider - Social provider
   * @param options - Pagination options
   * @returns Paginated users with the provider
   */
  findUsersByProvider(
    provider: SocialProvider,
    options: PaginationOptions
  ): Promise<PaginatedResult<{ userId: string; email: Email | null; phone: Phone | null }>>;
  
  /**
   * Find accounts by email (for account merging)
   * @param email - Email to search
   * @returns Array of social accounts
   */
  findByEmail(email: Email): Promise<SocialAccount[]>;
  
  /**
   * Find accounts by phone (Bangladesh specific)
   * @param phone - Phone number
   * @returns Array of social accounts
   */
  findByPhone(phone: Phone): Promise<SocialAccount[]>;
  
  // ========== Status Check Operations ==========
  
  /**
   * Check if user has linked a specific provider
   * @param userId - User ID
   * @param provider - Social provider
   * @returns True if provider is linked
   */
  isProviderLinked(userId: string, provider: SocialProvider): Promise<boolean>;
  
  /**
   * Check if email is linked to any account
   * @param email - Email to check
   * @returns True if email is linked
   */
  isEmailLinked(email: Email): Promise<boolean>;
  
  /**
   * Check if phone is linked to any account (Bangladesh specific)
   * @param phone - Phone number
   * @returns True if phone is linked
   */
  isPhoneLinked(phone: Phone): Promise<boolean>;
  
  /**
   * Get linking status for a user
   * @param userId - User ID
   * @returns Provider linking result
   */
  getLinkingStatus(userId: string): Promise<ProviderLinkingResult[]>;
  
  // ========== Count Operations ==========
  
  /**
   * Count accounts by provider
   * @param provider - Social provider
   * @returns Count of accounts
   */
  countByProvider(provider: SocialProvider): Promise<number>;
  
  /**
   * Count accounts by user
   * @param userId - User ID
   * @returns Number of accounts
   */
  countByUser(userId: string): Promise<number>;
  
  /**
   * Count active accounts by user
   * @param userId - User ID
   * @returns Number of active accounts
   */
  countActiveByUser(userId: string): Promise<number>;
  
  /**
   * Count users who have linked any social account
   * @returns Number of users
   */
  countUsersWithSocialLogin(): Promise<number>;
  
  // ========== Update Operations ==========
  
  /**
   * Set primary social account for a user
   * @param userId - User ID
   * @param accountId - Account ID to set as primary
   * @returns void
   */
  setPrimaryAccount(userId: string, accountId: string): Promise<void>;
  
  /**
   * Update account profile information
   * @param accountId - Account ID
   * @param name - Updated name
   * @param profilePictureUrl - Updated profile picture URL
   * @param profileUrl - Updated profile URL
   * @returns void
   */
  updateProfile(
    accountId: string,
    name?: string,
    profilePictureUrl?: string,
    profileUrl?: string
  ): Promise<void>;
  
  /**
   * Update last sync timestamp
   * @param accountId - Account ID
   * @returns void
   */
  updateLastSync(accountId: string): Promise<void>;
  
  // ========== Delete/Unlink Operations ==========
  
  /**
   * Unlink social account
   * @param accountId - Account ID
   * @param reason - Unlinking reason
   * @returns void
   */
  unlinkAccount(accountId: string, reason?: string): Promise<void>;
  
  /**
   * Delete all social accounts for a user (unlink all)
   * @param userId - User ID
   * @param reason - Unlinking reason
   * @returns Number of unlinked accounts
   */
  deleteAllByUserId(userId: string, reason?: string): Promise<number>;
  
  /**
   * Unlink all accounts for multiple users
   * @param userIds - Array of user IDs
   * @param reason - Unlinking reason
   * @returns Bulk unlink result
   */
  bulkUnlinkByUserIds(userIds: string[], reason: string): Promise<BulkUnlinkResult>;
  
  /**
   * Unlink accounts by provider
   * @param provider - Social provider
   * @param reason - Unlinking reason
   * @returns Bulk unlink result
   */
  bulkUnlinkByProvider(provider: SocialProvider, reason: string): Promise<BulkUnlinkResult>;
  
  /**
   * Suspend accounts by user
   * @param userId - User ID
   * @param reason - Suspension reason
   * @returns Number of suspended accounts
   */
  suspendAccountsByUser(userId: string, reason: string): Promise<number>;
  
  /**
   * Reactivate suspended accounts for a user
   * @param userId - User ID
   * @returns Number of reactivated accounts
   */
  reactivateAccountsByUser(userId: string): Promise<number>;
  
  /**
   * Clean up stale/unlinked accounts
   * @param retentionDays - Days to keep unlinked accounts
   * @returns Number of deleted accounts
   */
  cleanupUnlinkedAccounts(retentionDays: number): Promise<number>;
  
  // ========== Statistics Operations ==========
  
  /**
   * Get social account statistics
   * @returns Social account statistics
   */
  getStatistics(): Promise<SocialAccountStatistics>;
  
  /**
   * Get provider distribution (for analytics)
   * @returns Provider distribution statistics
   */
  getProviderDistribution(): Promise<Record<SocialProvider, number>>;
  
  /**
   * Get linking trends over time
   * @param days - Number of days to analyze
   * @returns Daily linking data
   */
  getLinkingTrends(days: number): Promise<Array<{ date: string; count: number; provider: SocialProvider }>>;
  
  /**
   * Get top users by social accounts
   * @param limit - Number of users to return
   * @returns Top users with most social accounts
   */
  getTopUsersBySocialAccounts(limit: number): Promise<Array<{ userId: string; count: number }>>;
  
  // ========== Merge Operations ==========
  
  /**
   * Find duplicate social accounts (same provider, different users)
   * @returns Duplicate accounts
   */
  findDuplicateAccounts(): Promise<Array<{ provider: SocialProvider; providerUserId: string; userIds: string[] }>>;
  
  /**
   * Merge social accounts (when users have duplicate provider accounts)
   * @param primaryUserId - Primary user ID
   * @param secondaryUserId - Secondary user ID to merge from
   * @returns Number of merged accounts
   */
  mergeSocialAccounts(primaryUserId: string, secondaryUserId: string): Promise<SocialAccountMergeResult>;
  
  // ========== Anomaly Detection ==========
  
  /**
   * Detect anomalous linking patterns
   * @returns Anomaly detection results
   */
  detectAnomalies(): Promise<SocialAnomalyDetectionResult>;
  
  /**
   * Get cross-provider analysis
   * @returns Cross-provider linking patterns
   */
  getCrossProviderAnalysis(): Promise<{
    usersWithMultipleProviders: number;
    averageProvidersPerUser: number;
    mostCommonCombinations: Array<{ providers: SocialProvider[]; count: number }>;
  }>;
  
  /**
   * Get conversion rate (social login vs email login)
   * @param days - Number of days to analyze
   * @returns Conversion metrics
   */
  getConversionRate(days: number): Promise<{
    socialLogins: number;
    emailLogins: number;
    conversionRate: number;
    preferredProvider: SocialProvider;
  }>;
  
  // ========== Audit Operations ==========
  
  /**
   * Export social accounts for audit
   * @param userId - User ID (optional)
   * @param fromDate - Start date
   * @param toDate - End date
   * @returns Social accounts for audit
   */
  exportForAudit(
    userId?: string,
    fromDate?: Date,
    toDate?: Date
  ): Promise<SocialAccount[]>;
  
  /**
   * Get linking history for a user
   * @param userId - User ID
   * @param limit - Maximum number of entries
   * @returns Linking history entries
   */
  getLinkingHistory(userId: string, limit?: number): Promise<Array<{
    id: string;
    provider: SocialProvider;
    action: 'linked' | 'unlinked' | 'suspended' | 'reactivated';
    timestamp: Date;
    reason?: string;
  }>>;
}

// ============================================================
// Type Exports
// ============================================================

export type { 
  ProviderLinkingResult, 
  ProviderStatistics, 
  SocialAccountStatistics, 
  BulkUnlinkResult,
  SocialAccountFilters,
  SocialAccountMergeResult,
  SocialAnomalyDetectionResult
};
