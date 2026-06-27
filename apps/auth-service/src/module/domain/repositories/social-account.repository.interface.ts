/**
 * Social Account Repository Interface - Pure Domain Contract (Enterprise Enhanced v2.0)
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce

 * @module domain/repositories/social-account.repository.interface

 * @description
 * Repository interface for SocialAccount entity persistence.
 * Manages social account linking for OAuth authentication.
 * 
 * ENTERPRISE ENHANCEMENTS (v2.0):
 * ✅ Token expiry tracking with expiry notifications
 * ✅ Provider-specific rate limiting
 * ✅ Batch refresh token operations
 * ✅ Account conflict resolution strategies
 * ✅ Provider health scoring (reliability tracking)
 * ✅ Cross-device sync tracking
 * ✅ Geo-location based provider recommendations
 * ✅ Provider deprecation lifecycle management
 * ✅ Webhook delivery tracking for OAuth events
 * ✅ Consent refresh reminders (GDPR compliance)
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
  /** ✅ Enterprise: Provider health score (0-100) */
  healthScore: number;
  /** ✅ Enterprise: Average response time (ms) */
  averageResponseTimeMs: number;
  /** ✅ Enterprise: Error rate (0-100) */
  errorRate: number;
  /** ✅ Enterprise: Last outage detected */
  lastOutageAt?: Date;
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
  /** ✅ Enterprise: Duration in milliseconds */
  durationMs: number;
  /** ✅ Enterprise: Notifications sent */
  notificationsSent: boolean;
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
  /** ✅ Enterprise: Filter by token expiry */
  tokenExpiringWithinDays?: number;
  /** ✅ Enterprise: Filter by token expired */
  tokenExpired?: boolean;
  /** ✅ Enterprise: Filter by needs consent refresh */
  needsConsentRefresh?: boolean;
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
  /** ✅ Enterprise: Resolution strategy used */
  resolutionStrategy: 'keep_primary' | 'keep_secondary' | 'merge_fields' | 'admin_review';
  /** ✅ Enterprise: User notified */
  userNotified: boolean;
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

/**
 * ✅ Enterprise: Token expiry notification result
 */
export interface TokenExpiryNotificationResult {
  accountId: string;
  userId: string;
  provider: SocialProvider;
  daysUntilExpiry: number;
  notificationSent: boolean;
  sentAt: Date;
  channel: 'email' | 'push' | 'whatsapp';
  acknowledged: boolean;
}

/**
 * ✅ Enterprise: Provider health status
 */
export interface ProviderHealthStatus {
  provider: SocialProvider;
  healthScore: number;  // 0-100
  status: 'healthy' | 'degraded' | 'unhealthy' | 'outage';
  lastSuccessAt: Date;
  lastFailureAt?: Date;
  consecutiveFailures: number;
  averageLatencyMs: number;
  uptimePercentage: number;
  recommendations: string[];
}

/**
 * ✅ Enterprise: Account conflict resolution options
 */
export interface AccountConflictResolution {
  accountId: string;
  userId: string;
  provider: SocialProvider;
  conflictType: 'duplicate_email' | 'duplicate_phone' | 'duplicate_provider_id';
  resolvedBy: 'auto' | 'admin' | 'user';
  resolutionAction: 'merge' | 'keep_both' | 'keep_primary' | 'unlink_secondary';
  resolvedAt: Date;
  resolvedByUserId?: string;
  notes?: string;
}

/**
 * ✅ Enterprise: Consent refresh reminder
 */
export interface ConsentRefreshReminder {
  accountId: string;
  userId: string;
  provider: SocialProvider;
  lastConsentAt: Date;
  expiresAt: Date;
  daysUntilExpiry: number;
  reminderSentAt?: Date;
  reminderCount: number;
  status: 'pending' | 'sent' | 'acknowledged' | 'expired' | 'refreshed';
}

/**
 * ✅ Enterprise: Provider deprecation plan
 */
export interface ProviderDeprecationPlan {
  provider: SocialProvider;
  deprecationDate: Date;
  sunsetDate: Date;
  alternativeProviders: SocialProvider[];
  migrationRequired: boolean;
  affectedUserCount: number;
  notificationSent: boolean;
  migrationStatus: 'pending' | 'in_progress' | 'completed' | 'cancelled';
}

/**
 * ✅ Enterprise: OAuth webhook delivery record
 */
export interface OAuthWebhookDelivery {
  id: string;
  provider: SocialProvider;
  eventType: 'link' | 'unlink' | 'token_refresh' | 'consent_revoked' | 'account_deleted';
  userId: string;
  payload: Record<string, unknown>;
  deliveredAt: Date;
  success: boolean;
  statusCode?: number;
  retryCount: number;
  errorMessage?: string;
}

/**
 * ✅ Enterprise: Cross-device sync request
 */
export interface SocialAccountSyncRequest {
  requestId: string;
  sourceUserId: string;
  targetUserId: string;
  sourceProvider: SocialProvider;
  targetProvider: SocialProvider;
  status: 'pending' | 'approved' | 'rejected' | 'completed' | 'failed';
  requestedAt: Date;
  expiresAt: Date;
  approvedBy?: string;
  approvedAt?: Date;
  syncData?: {
    accounts: string[];
    preferences: boolean;
    settings: boolean;
  };
}

/**
 * ✅ Enterprise: Geo-location based recommendation
 */
export interface GeoLocationRecommendation {
  district: string;
  division: string;
  recommendedProvider: SocialProvider;
  alternativeProviders: SocialProvider[];
  reason: string;
  confidenceScore: number;  // 0-100
  localPopularityRank: number;
}

// ==================== Repository Interface ====================

/**
 * Social Account Repository Interface (Enterprise Enhanced)
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
  
  // ========== ✅ Enterprise: Token Expiry Operations ==========
  
  /**
   * Find accounts with expiring tokens
   * @param daysThreshold - Days before expiry to consider "expiring soon"
   * @param options - Pagination options
   * @returns Paginated accounts with expiring tokens
   */
  findAccountsWithExpiringTokens(
    daysThreshold: number,
    options?: PaginationOptions
  ): Promise<PaginatedResult<SocialAccount>>;
  
  /**
   * Find accounts with expired tokens
   * @param options - Pagination options
   * @returns Paginated accounts with expired tokens
   */
  findAccountsWithExpiredTokens(options?: PaginationOptions): Promise<PaginatedResult<SocialAccount>>;
  
  /**
   * Send token expiry notifications
   * @param accounts - Accounts to notify
   * @returns Notification results
   */
  sendTokenExpiryNotifications(
    accounts: SocialAccount[]
  ): Promise<TokenExpiryNotificationResult[]>;
  
  /**
   * Record token refresh attempt
   * @param accountId - Account ID
   * @param success - Whether refresh succeeded
   * @param newExpiryDate - New expiry date (if success)
   * @returns Updated account
   */
  recordTokenRefresh(
    accountId: string,
    success: boolean,
    newExpiryDate?: Date
  ): Promise<SocialAccount>;
  
  /**
   * Batch refresh tokens for accounts
   * @param accountIds - Array of account IDs
   * @returns Refresh results
   */
  batchRefreshTokens(accountIds: string[]): Promise<Map<string, { success: boolean; newExpiryDate?: Date; error?: string }>>;
  
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
   * @param resolutionStrategy - Strategy for resolving conflicts
   * @returns Number of merged accounts
   */
  mergeSocialAccounts(
    primaryUserId: string, 
    secondaryUserId: string,
    resolutionStrategy?: 'keep_primary' | 'keep_secondary' | 'merge_fields' | 'admin_review'
  ): Promise<SocialAccountMergeResult>;
  
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
  
  // ========== ✅ Enterprise: Provider Health Management ==========
  
  /**
   * Get provider health status
   * @param provider - Social provider
   * @returns Provider health status
   */
  getProviderHealth(provider: SocialProvider): Promise<ProviderHealthStatus>;
  
  /**
   * Record provider operation result (for health scoring)
   * @param provider - Social provider
   * @param success - Whether operation succeeded
   * @param latencyMs - Operation latency in milliseconds
   * @returns Updated health status
   */
  recordProviderOperation(
    provider: SocialProvider,
    success: boolean,
    latencyMs: number
  ): Promise<ProviderHealthStatus>;
  
  /**
   * Get all provider health statuses
   * @returns Map of provider to health status
   */
  getAllProviderHealth(): Promise<Map<SocialProvider, ProviderHealthStatus>>;
  
  /**
   * Get recommended providers based on health and user context
   * @param userId - User ID (for personalization)
   * @param geoLocation - Optional geographic location
   * @returns Array of recommended providers with scores
   */
  getRecommendedProviders(
    userId?: string,
    geoLocation?: { district: string; division: string }
  ): Promise<Array<{ provider: SocialProvider; score: number; reason: string }>>;
  
  // ========== ✅ Enterprise: Consent Management ==========
  
  /**
   * Get accounts needing consent refresh
   * @param daysThreshold - Days before expiry to consider
   * @returns Array of consent refresh reminders
   */
  getAccountsNeedingConsentRefresh(daysThreshold: number): Promise<ConsentRefreshReminder[]>;
  
  /**
   * Send consent refresh reminders
   * @param reminders - Reminders to send
   * @returns Updated reminders with sent status
   */
  sendConsentRefreshReminders(reminders: ConsentRefreshReminder[]): Promise<ConsentRefreshReminder[]>;
  
  /**
   * Record consent refresh
   * @param accountId - Account ID
   * @returns Updated account
   */
  recordConsentRefresh(accountId: string): Promise<SocialAccount>;
  
  /**
   * Acknowledge consent reminder
   * @param reminderId - Reminder ID
   * @param acknowledgedBy - User ID
   * @returns Updated reminder
   */
  acknowledgeConsentReminder(reminderId: string, acknowledgedBy: string): Promise<ConsentRefreshReminder>;
  
  // ========== ✅ Enterprise: Provider Deprecation Management ==========
  
  /**
   * Create provider deprecation plan
   * @param plan - Deprecation plan
   * @returns Created plan
   */
  createDeprecationPlan(plan: Omit<ProviderDeprecationPlan, 'affectedUserCount' | 'notificationSent' | 'migrationStatus'>): Promise<ProviderDeprecationPlan>;
  
  /**
   * Get active deprecation plans
   * @returns Array of active deprecation plans
   */
  getActiveDeprecationPlans(): Promise<ProviderDeprecationPlan[]>;
  
  /**
   * Get users affected by deprecation
   * @param provider - Social provider being deprecated
   * @param options - Pagination options
   * @returns Paginated affected users
   */
  getUsersAffectedByDeprecation(
    provider: SocialProvider,
    options?: PaginationOptions
  ): Promise<PaginatedResult<{ userId: string; email: string; phone?: string }>>;
  
  /**
   * Migrate users from deprecated provider
   * @param fromProvider - Deprecated provider
   * @param toProvider - Target provider
   * @param options - Migration options
   * @returns Migration result
   */
  migrateUsersFromDeprecatedProvider(
    fromProvider: SocialProvider,
    toProvider: SocialProvider,
    options?: { batchSize?: number; dryRun?: boolean }
  ): Promise<{ migratedCount: number; failedCount: number; errors: Array<{ userId: string; error: string }> }>;
  
  // ========== ✅ Enterprise: Webhook Delivery Management ==========
  
  /**
   * Record OAuth webhook delivery
   * @param delivery - Webhook delivery record
   * @returns Created record ID
   */
  recordWebhookDelivery(delivery: Omit<OAuthWebhookDelivery, 'id'>): Promise<string>;
  
  /**
   * Get failed webhook deliveries for retry
   * @param maxRetries - Maximum retry count
   * @returns Failed deliveries
   */
  getFailedWebhookDeliveries(maxRetries: number): Promise<OAuthWebhookDelivery[]>;
  
  /**
   * Retry failed webhook delivery
   * @param deliveryId - Delivery ID
   * @returns Updated delivery record
   */
  retryWebhookDelivery(deliveryId: string): Promise<OAuthWebhookDelivery>;
  
  /**
   * Get webhook delivery statistics
   * @param provider - Optional provider filter
   * @returns Delivery statistics
   */
  getWebhookDeliveryStats(provider?: SocialProvider): Promise<{
    totalDeliveries: number;
    successRate: number;
    averageLatencyMs: number;
    failuresByReason: Record<string, number>;
  }>;
  
  // ========== ✅ Enterprise: Cross-Device Sync ==========
  
  /**
   * Create cross-device sync request
   * @param sourceUserId - Source user ID
   * @param targetUserId - Target user ID
   * @param sourceProvider - Source provider
   * @param targetProvider - Target provider
   * @param syncData - Data to sync
   * @returns Sync request ID
   */
  createCrossDeviceSyncRequest(
    sourceUserId: string,
    targetUserId: string,
    sourceProvider: SocialProvider,
    targetProvider: SocialProvider,
    syncData: SocialAccountSyncRequest['syncData']
  ): Promise<string>;
  
  /**
   * Get pending sync requests for user
   * @param userId - User ID
   * @returns Pending sync requests
   */
  getPendingSyncRequests(userId: string): Promise<SocialAccountSyncRequest[]>;
  
  /**
   * Approve cross-device sync request
   * @param requestId - Request ID
   * @param approvedBy - User ID approving the request
   * @returns Updated request
   */
  approveSyncRequest(requestId: string, approvedBy: string): Promise<SocialAccountSyncRequest>;
  
  /**
   * Reject cross-device sync request
   * @param requestId - Request ID
   * @param rejectedBy - User ID rejecting the request
   * @param reason - Rejection reason
   * @returns Updated request
   */
  rejectSyncRequest(requestId: string, rejectedBy: string, reason: string): Promise<SocialAccountSyncRequest>;
  
  /**
   * Complete sync request (transfer data)
   * @param requestId - Request ID
   * @returns Completion result
   */
  completeSyncRequest(requestId: string): Promise<{ success: boolean; syncedAccounts: number; errors?: string[] }>;
  
  // ========== ✅ Enterprise: Geo-Location Recommendations ==========
  
  /**
   * Get geo-location based provider recommendations
   * @param district - Bangladesh district
   * @param division - Bangladesh division (optional)
   * @returns Provider recommendations
   */
  getGeoLocationRecommendations(
    district: string,
    division?: string
  ): Promise<GeoLocationRecommendation>;
  
  /**
   * Update geo-location popularity data
   * @param district - District name
   * @param providerUsage - Provider usage counts
   * @returns Updated recommendations
   */
  updateGeoLocationPopularity(
    district: string,
    providerUsage: Record<SocialProvider, number>
  ): Promise<GeoLocationRecommendation>;
  
  /**
   * Get popular providers by district
   * @param limit - Number of districts to return
   * @returns Top providers by district
   */
  getPopularProvidersByDistrict(limit?: number): Promise<Array<{ district: string; topProvider: SocialProvider; adoptionRate: number }>>;
  
  // ========== ✅ Enterprise: Conflict Resolution ==========
  
  /**
   * Find account conflicts
   * @param userId - User ID to check
   * @returns Array of conflicts
   */
  findAccountConflicts(userId: string): Promise<AccountConflictResolution[]>;
  
  /**
   * Resolve account conflict
   * @param conflict - Conflict resolution details
   * @returns Resolved conflict
   */
  resolveAccountConflict(conflict: Omit<AccountConflictResolution, 'resolvedAt'>): Promise<AccountConflictResolution>;
  
  /**
   * Auto-resolve conflicts based on rules
   * @param userId - User ID
   * @param autoResolveRules - Rules for auto-resolution
   * @returns Number of resolved conflicts
   */
  autoResolveConflicts(
    userId: string,
    autoResolveRules?: { preferVerified: boolean; preferPrimary: boolean; keepNewest: boolean }
  ): Promise<number>;
  
  // ========== ✅ Enterprise: Rate Limiting ==========
  
  /**
   * Check rate limit for provider operation
   * @param userId - User ID
   * @param provider - Social provider
   * @param operationType - Type of operation
   * @returns Rate limit status
   */
  checkProviderRateLimit(
    userId: string,
    provider: SocialProvider,
    operationType: 'link' | 'unlink' | 'refresh' | 'sync'
  ): Promise<{ allowed: boolean; remaining: number; resetAt: Date; retryAfterSeconds?: number }>;
  
  /**
   * Increment rate limit counter for provider
   * @param userId - User ID
   * @param provider - Social provider
   * @param operationType - Type of operation
   * @returns Updated count
   */
  incrementProviderRateLimit(
    userId: string,
    provider: SocialProvider,
    operationType: 'link' | 'unlink' | 'refresh' | 'sync'
  ): Promise<number>;
  
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
    action: 'linked' | 'unlinked' | 'suspended' | 'reactivated' | 'token_refreshed' | 'consent_refreshed';
    timestamp: Date;
    reason?: string;
    metadata?: Record<string, unknown>;
  }>>;
  
  // ========== Batch Operations ==========
  
  /**
   * Batch update account statuses
   * @param updates - Map of account IDs to status
   * @returns Number of updated accounts
   */
  batchUpdateStatus(updates: Map<string, SocialAccountStatus>): Promise<number>;
  
  /**
   * Batch update last sync timestamps
   * @param accountIds - Array of account IDs
   * @returns Number of updated accounts
   */
  batchUpdateLastSync(accountIds: string[]): Promise<number>;
}


// ============================================================
// ENTERPRISE SUMMARY v2.0
// ============================================================
// 
// Enterprise Enhancements Applied:
// 1. ✅ Token expiry tracking with expiry notifications
// 2. ✅ Provider-specific rate limiting
// 3. ✅ Batch refresh token operations
// 4. ✅ Account conflict resolution strategies
// 5. ✅ Provider health scoring (reliability tracking)
// 6. ✅ Cross-device sync tracking
// 7. ✅ Geo-location based provider recommendations
// 8. ✅ Provider deprecation lifecycle management
// 9. ✅ Webhook delivery tracking for OAuth events
// 10. ✅ Consent refresh reminders (GDPR compliance)
// 11. ✅ Provider health status monitoring
// 12. ✅ Auto-resolution of account conflicts
// 13. ✅ Geo-location popularity tracking
// 14. ✅ Performance metrics (latency, error rate)
// 15. ✅ Migration support for deprecated providers
// 
// Bangladesh Specific:
// - District and division-based provider recommendations
// - Phone-based provider support (WhatsApp, Imo, bKash, Nagad, Rocket)
// - Local popularity tracking for BD providers
// - Geo-location based recommendations for BD districts
// 
// ============================================================
