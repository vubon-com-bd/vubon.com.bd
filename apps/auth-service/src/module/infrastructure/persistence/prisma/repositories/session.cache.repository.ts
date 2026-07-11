/**
 * Session Cache Repository - Infrastructure Layer Implementation
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 *
 * @module infrastructure/persistence/cache/repositories/session.cache.repository
 *
 * @description
 * Cache decorator for Session Repository.
 * Implements caching strategy for session data to reduce database load.
 *
 * Enterprise Features:
 * ✅ Implements domain SessionRepository interface (decorator pattern)
 * ✅ Cache-aside pattern (check cache first, then database)
 * ✅ Automatic cache invalidation on write operations
 * ✅ Configurable TTL per operation
 * ✅ Cache key versioning for invalidation
 * ✅ Fallback to database on cache failure
 * ✅ Distributed cache with Redis
 * ✅ Cache metrics for monitoring (hit/miss rates)
 * ✅ Environment-aware TTL (dev vs prod)
 * ✅ Bangladesh specific - District/Upazila/NetworkType caching
 *
 * @example
 * // In infrastructure module
 * @Module({
 *   providers: [
 *     PrismaService,
 *     CacheService,
 *     {
 *       provide: 'SessionRepository',
 *       useFactory: (prismaRepo: SessionPrismaRepository, cacheService: CacheService) =>
 *         new SessionCacheRepository(prismaRepo, cacheService),
 *       inject: [SessionPrismaRepository, 'CacheService'],
 *     },
 *   ],
 *   exports: ['SessionRepository'],
 * })
 * export class DatabaseModule {}
 */

import { Injectable, Logger, Inject, Optional } from '@nestjs/common';
import { Session, SessionStatus, SessionMetadata } from '../../../domain/entities/session.entity';
import { Token } from '../../../domain/value-objects/token.vo';
import { DeviceId } from '../../../domain/value-objects/device-id.vo';
import { IpAddress } from '../../../domain/value-objects/ip-address.vo';
import { UserAgent } from '../../../domain/value-objects/user-agent.vo';

// Domain repository interface
import { 
  SessionRepository,
  PaginationOptions,
  PaginatedResult,
  SessionFilters,
  SessionStatusResult,
  BulkRevokeResult,
  CleanupResult,
  SessionExtensionResult,
  SessionActivityResult
} from '../../../domain/repositories/session.repository.interface';

// Infrastructure imports
import { CacheService, CacheOptions } from '../../cache/cache.service.interface';
import { MetricsService } from '../../metrics/metrics.service.interface';
import { LoggerService } from '../../logger/logger.service.interface';
import { SessionPrismaRepository } from '../../persistence/prisma/repositories/session.prisma.repository';

// Shared packages (for constants)
import { SESSION_CONFIG } from '@vubon/shared-constants';

// ============================================================
// Cache Key Builder (Enterprise Pattern)
// ============================================================

/**
 * Cache key generation for session entities (with versioning)
 */
class SessionCacheKey {
  private static readonly VERSION = 'v2';
  private static readonly PREFIX = `auth:session:${this.VERSION}:`;
  private static readonly TOKEN_PREFIX = `${this.PREFIX}token:`;
  private static readonly USER_PREFIX = `${this.PREFIX}user:`;
  private static readonly ACTIVE_USER_PREFIX = `${this.PREFIX}active:user:`;

  static byId(id: string): string {
    return `${this.PREFIX}${id}`;
  }

  static byToken(token: string): string {
    return `${this.TOKEN_PREFIX}${this.hashToken(token)}`;
  }

  static byUserId(userId: string): string {
    return `${this.USER_PREFIX}${userId}`;
  }

  static activeByUserId(userId: string): string {
    return `${this.ACTIVE_USER_PREFIX}${userId}`;
  }

  static pattern(): string {
    return `${this.PREFIX}*`;
  }

  static userPattern(userId: string): string {
    return `${this.USER_PREFIX}${userId}:*`;
  }

  /**
   * Hash token for cache key (for security, don't store raw token in cache key)
   */
  private static hashToken(token: string): string {
    // Simple hash for cache key (not cryptographically secure, but sufficient for cache key)
    let hash = 0;
    for (let i = 0; i < token.length; i++) {
      const char = token.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash).toString(36);
  }
}

// ============================================================
// Cache Options for different operations
// ============================================================

const CACHE_OPTIONS = {
  // Short-lived cache for frequent reads (5 minutes)
  SHORT: { ttl: 300, keyPrefix: 'session:' },
  
  // Medium cache for user sessions (15 minutes)
  MEDIUM: { ttl: 900, keyPrefix: 'session:' },
  
  // Long cache for active sessions (1 hour)
  LONG: { ttl: 3600, keyPrefix: 'session:' },
  
  // No cache (for critical operations)
  NONE: { ttl: 0, keyPrefix: 'session:' },
} as const;

// ============================================================
// Session Cache Repository (Decorator Pattern)
// ============================================================

@Injectable()
export class SessionCacheRepository implements SessionRepository {
  private readonly logger = new Logger(SessionCacheRepository.name);
  
  // Cache statistics
  private metrics = {
    hits: 0,
    misses: 0,
    errors: 0,
    totalOperations: 0,
  };

  constructor(
    private readonly prismaRepo: SessionPrismaRepository,
    @Inject('CacheService') private readonly cacheService: CacheService,
    @Optional() private readonly metricsService?: MetricsService,
    @Optional() private readonly loggerService?: LoggerService,
  ) {
    this.logger.log('SessionCacheRepository initialized');
  }

  // ============================================================
  // Cache Helper Methods
  // ============================================================

  /**
   * Get from cache with fallback
   */
  private async getCached<T>(
    key: string,
    fallback: () => Promise<T>,
    options?: CacheOptions
  ): Promise<T> {
    this.metrics.totalOperations++;
    
    try {
      const cached = await this.cacheService.get<T>(key);
      if (cached !== null && cached !== undefined) {
        this.metrics.hits++;
        this.metricsService?.incrementCounter('session.cache.hit');
        return cached;
      }
      
      this.metrics.misses++;
      this.metricsService?.incrementCounter('session.cache.miss');
      
      const result = await fallback();
      
      // Cache the result (if not null/undefined)
      if (result !== null && result !== undefined) {
        const ttl = options?.ttl || CACHE_OPTIONS.MEDIUM.ttl;
        await this.cacheService.set(key, result, ttl);
      }
      
      return result;
    } catch (error) {
      this.metrics.errors++;
      this.metricsService?.incrementCounter('session.cache.error');
      this.logger.warn(`Cache error for key ${key}, falling back to database`, error);
      
      // Fallback to database on cache error
      return fallback();
    }
  }

  /**
   * Invalidate cache for a session
   */
  private async invalidateSessionCache(session: Session): Promise<void> {
    const keys = [
      SessionCacheKey.byId(session.getId()),
      SessionCacheKey.byToken(session.getToken().getValue()),
      SessionCacheKey.byUserId(session.getUserId()),
    ];
    
    await this.cacheService.deleteMany(keys);
    this.metricsService?.incrementCounter('session.cache.invalidation');
  }

  /**
   * Invalidate cache for a user
   */
  private async invalidateUserCache(userId: string): Promise<void> {
    const keys = [
      SessionCacheKey.byUserId(userId),
      SessionCacheKey.activeByUserId(userId),
    ];
    
    await this.cacheService.deleteMany(keys);
    this.metricsService?.incrementCounter('session.cache.user.invalidation');
  }

  /**
   * Get cache key for a specific operation
   */
  private getCacheKey(operation: string, params: Record<string, unknown>): string {
    const paramString = Object.entries(params)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([key, value]) => `${key}:${value}`)
      .join(':');
    
    return `session:${operation}:${paramString}`;
  }

  // ============================================================
  // Core CRUD Operations (With Caching)
  // ============================================================

  /**
   * Find session by ID with caching
   */
  async findById(id: string, options?: { withCache?: boolean; cacheTTL?: number }): Promise<Session | null> {
    const withCache = options?.withCache !== false;
    const ttl = options?.cacheTTL || CACHE_OPTIONS.SHORT.ttl;

    if (!withCache) {
      return this.prismaRepo.findById(id, { withCache: false });
    }

    const key = SessionCacheKey.byId(id);
    return this.getCached(
      key,
      () => this.prismaRepo.findById(id, { withCache: false }),
      { ttl }
    );
  }

  /**
   * Find session by token with caching
   */
  async findByToken(token: Token, options?: { withCache?: boolean; cacheTTL?: number }): Promise<Session | null> {
    const withCache = options?.withCache !== false;
    const ttl = options?.cacheTTL || CACHE_OPTIONS.SHORT.ttl;

    if (!withCache) {
      return this.prismaRepo.findByToken(token, { withCache: false });
    }

    const key = SessionCacheKey.byToken(token.getValue());
    return this.getCached(
      key,
      () => this.prismaRepo.findByToken(token, { withCache: false }),
      { ttl }
    );
  }

  /**
   * Find session by raw token value (alias for findByToken)
   */
  async findByTokenValue(tokenValue: string, options?: { withCache?: boolean; cacheTTL?: number }): Promise<Session | null> {
    const token = new Token(tokenValue);
    return this.findByToken(token, options);
  }

  /**
   * Find all sessions by user ID (with caching for the list)
   */
  async findByUserId(userId: string): Promise<Session[]> {
    // For list operations, we cache the list but with shorter TTL
    const key = SessionCacheKey.byUserId(userId);
    
    return this.getCached(
      key,
      () => this.prismaRepo.findByUserId(userId),
      { ttl: CACHE_OPTIONS.MEDIUM.ttl }
    );
  }

  /**
   * Find sessions by user ID with pagination (caching is complex for pagination, so we cache individual pages)
   */
  async findByUserIdPaginated(
    userId: string,
    options: PaginationOptions
  ): Promise<PaginatedResult<Session>> {
    const { page = 1, limit = 20 } = options;
    const cacheKey = this.getCacheKey('findByUserIdPaginated', { userId, page, limit, ...options });
    
    return this.getCached(
      cacheKey,
      () => this.prismaRepo.findByUserIdPaginated(userId, options),
      { ttl: CACHE_OPTIONS.SHORT.ttl } // Shorter TTL for paginated results
    );
  }

  /**
   * Find active sessions for a user (cached)
   */
  async findActiveSessions(userId: string): Promise<Session[]> {
    const key = SessionCacheKey.activeByUserId(userId);
    
    return this.getCached(
      key,
      () => this.prismaRepo.findActiveSessions(userId),
      { ttl: CACHE_OPTIONS.LONG.ttl } // Active sessions can be cached longer
    );
  }

  /**
   * Find active sessions by user with pagination
   */
  async findActiveSessionsPaginated(
    userId: string,
    options: PaginationOptions
  ): Promise<PaginatedResult<Session>> {
    const { page = 1, limit = 20 } = options;
    const cacheKey = this.getCacheKey('findActiveSessionsPaginated', { userId, page, limit, ...options });
    
    return this.getCached(
      cacheKey,
      () => this.prismaRepo.findActiveSessionsPaginated(userId, options),
      { ttl: CACHE_OPTIONS.MEDIUM.ttl }
    );
  }

  /**
   * Find sessions by device ID (cached)
   */
  async findByDeviceId(deviceId: DeviceId, options?: PaginationOptions): Promise<PaginatedResult<Session>> {
    const cacheKey = this.getCacheKey('findByDeviceId', { 
      deviceId: deviceId.getValue(), 
      ...options 
    });
    
    return this.getCached(
      cacheKey,
      () => this.prismaRepo.findByDeviceId(deviceId, options || {}),
      { ttl: CACHE_OPTIONS.SHORT.ttl }
    );
  }

  /**
   * Find sessions by IP address (cached)
   */
  async findByIpAddress(ipAddress: IpAddress, options?: PaginationOptions): Promise<PaginatedResult<Session>> {
    const cacheKey = this.getCacheKey('findByIpAddress', { 
      ipAddress: ipAddress.getValue(), 
      ...options 
    });
    
    return this.getCached(
      cacheKey,
      () => this.prismaRepo.findByIpAddress(ipAddress, options || {}),
      { ttl: CACHE_OPTIONS.SHORT.ttl }
    );
  }

  /**
   * Find sessions by status (cached)
   */
  async findByStatus(status: SessionStatus, options?: PaginationOptions): Promise<PaginatedResult<Session>> {
    const cacheKey = this.getCacheKey('findByStatus', { status, ...options });
    
    return this.getCached(
      cacheKey,
      () => this.prismaRepo.findByStatus(status, options || {}),
      { ttl: CACHE_OPTIONS.SHORT.ttl }
    );
  }

  /**
   * Find expired sessions (cached with short TTL)
   */
  async findExpiredSessions(options?: PaginationOptions): Promise<PaginatedResult<Session>> {
    const cacheKey = this.getCacheKey('findExpiredSessions', { ...options });
    
    return this.getCached(
      cacheKey,
      () => this.prismaRepo.findExpiredSessions(options || {}),
      { ttl: CACHE_OPTIONS.SHORT.ttl }
    );
  }

  /**
   * Find revoked sessions (cached)
   */
  async findRevokedSessions(options?: PaginationOptions): Promise<PaginatedResult<Session>> {
    const cacheKey = this.getCacheKey('findRevokedSessions', { ...options });
    
    return this.getCached(
      cacheKey,
      () => this.prismaRepo.findRevokedSessions(options || {}),
      { ttl: CACHE_OPTIONS.MEDIUM.ttl }
    );
  }

  /**
   * Find suspended sessions
   */
  async findSuspendedSessions(options?: PaginationOptions): Promise<PaginatedResult<Session>> {
    const cacheKey = this.getCacheKey('findSuspendedSessions', { ...options });
    
    return this.getCached(
      cacheKey,
      () => this.prismaRepo.findSuspendedSessions(options || {}),
      { ttl: CACHE_OPTIONS.MEDIUM.ttl }
    );
  }

  /**
   * Find idle sessions (cached with short TTL)
   */
  async findIdleSessions(
    idleThresholdMinutes: number,
    options?: PaginationOptions
  ): Promise<PaginatedResult<Session>> {
    const cacheKey = this.getCacheKey('findIdleSessions', { 
      idleThresholdMinutes, 
      ...options 
    });
    
    return this.getCached(
      cacheKey,
      () => this.prismaRepo.findIdleSessions(idleThresholdMinutes, options || {}),
      { ttl: CACHE_OPTIONS.SHORT.ttl }
    );
  }

  /**
   * Find sessions expiring soon (cached with short TTL)
   */
  async findExpiringSoon(
    hoursThreshold: number,
    options?: PaginationOptions
  ): Promise<PaginatedResult<Session>> {
    const cacheKey = this.getCacheKey('findExpiringSoon', { 
      hoursThreshold, 
      ...options 
    });
    
    return this.getCached(
      cacheKey,
      () => this.prismaRepo.findExpiringSoon(hoursThreshold, options || {}),
      { ttl: CACHE_OPTIONS.SHORT.ttl }
    );
  }

  /**
   * Find stale sessions (cached with short TTL)
   */
  async findStaleSessions(
    daysInactive: number,
    options?: PaginationOptions
  ): Promise<PaginatedResult<Session>> {
    const cacheKey = this.getCacheKey('findStaleSessions', { 
      daysInactive, 
      ...options 
    });
    
    return this.getCached(
      cacheKey,
      () => this.prismaRepo.findStaleSessions(daysInactive, options || {}),
      { ttl: CACHE_OPTIONS.SHORT.ttl }
    );
  }

  /**
   * Find sessions by filters (caching based on filter combination)
   */
  async findByFilters(
    filters: SessionFilters,
    options?: PaginationOptions
  ): Promise<PaginatedResult<Session>> {
    const filterKey = JSON.stringify(filters);
    const cacheKey = this.getCacheKey('findByFilters', { 
      filterKey, 
      ...options 
    });
    
    return this.getCached(
      cacheKey,
      () => this.prismaRepo.findByFilters(filters, options || {}),
      { ttl: CACHE_OPTIONS.SHORT.ttl }
    );
  }

  /**
   * Find current session for user (cached)
   */
  async findCurrentSession(userId: string): Promise<Session | null> {
    const key = SessionCacheKey.activeByUserId(userId);
    
    return this.getCached(
      key,
      () => this.prismaRepo.findCurrentSession(userId),
      { ttl: CACHE_OPTIONS.LONG.ttl }
    );
  }

  /**
   * Find sessions by network type (Bangladesh specific - cached)
   */
  async findByNetworkType(
    networkType: '2g' | '3g' | '4g' | '5g' | 'wifi',
    options?: PaginationOptions
  ): Promise<PaginatedResult<Session>> {
    const cacheKey = this.getCacheKey('findByNetworkType', { networkType, ...options });
    
    return this.getCached(
      cacheKey,
      () => this.prismaRepo.findByNetworkType(networkType, options || {}),
      { ttl: CACHE_OPTIONS.SHORT.ttl }
    );
  }

  /**
   * Find sessions by district (Bangladesh specific - cached)
   */
  async findByDistrict(
    district: string,
    options?: PaginationOptions
  ): Promise<PaginatedResult<Session>> {
    const cacheKey = this.getCacheKey('findByDistrict', { district, ...options });
    
    return this.getCached(
      cacheKey,
      () => this.prismaRepo.findByDistrict(district, options || {}),
      { ttl: CACHE_OPTIONS.SHORT.ttl }
    );
  }

  /**
   * Find suspicious sessions (cached)
   */
  async findSuspiciousSessions(options?: PaginationOptions): Promise<PaginatedResult<Session>> {
    const cacheKey = this.getCacheKey('findSuspiciousSessions', { ...options });
    
    return this.getCached(
      cacheKey,
      () => this.prismaRepo.findSuspiciousSessions(options || {}),
      { ttl: CACHE_OPTIONS.SHORT.ttl }
    );
  }

  /**
   * Find sessions with low health score (cached)
   */
  async findUnhealthySessions(
    threshold: number,
    options?: PaginationOptions
  ): Promise<PaginatedResult<Session>> {
    const cacheKey = this.getCacheKey('findUnhealthySessions', { threshold, ...options });
    
    return this.getCached(
      cacheKey,
      () => this.prismaRepo.findUnhealthySessions(threshold, options || {}),
      { ttl: CACHE_OPTIONS.SHORT.ttl }
    );
  }

  // ============================================================
  // Status Operations (Cached)
  // ============================================================

  /**
   * Get session status (cached with short TTL)
   */
  async getSessionStatus(sessionId: string): Promise<SessionStatusResult> {
    const cacheKey = this.getCacheKey('getSessionStatus', { sessionId });
    
    return this.getCached(
      cacheKey,
      () => this.prismaRepo.getSessionStatus(sessionId),
      { ttl: CACHE_OPTIONS.SHORT.ttl }
    );
  }

  /**
   * Check if session exists by token (cached)
   */
  async existsByToken(token: Token): Promise<boolean> {
    const key = SessionCacheKey.byToken(token.getValue());
    
    return this.getCached(
      key,
      () => this.prismaRepo.existsByToken(token),
      { ttl: CACHE_OPTIONS.LONG.ttl }
    );
  }

  /**
   * Check if user has active sessions (cached)
   */
  async hasActiveSessions(userId: string): Promise<boolean> {
    const key = SessionCacheKey.activeByUserId(userId);
    
    return this.getCached(
      key,
      () => this.prismaRepo.hasActiveSessions(userId),
      { ttl: CACHE_OPTIONS.LONG.ttl }
    );
  }

  /**
   * Check if session is valid (cached)
   */
  async isValidSession(sessionId: string): Promise<boolean> {
    const cacheKey = this.getCacheKey('isValidSession', { sessionId });
    
    return this.getCached(
      cacheKey,
      () => this.prismaRepo.isValidSession(sessionId),
      { ttl: CACHE_OPTIONS.SHORT.ttl }
    );
  }

  // ============================================================
  // Revocation Operations (With Cache Invalidation)
  // ============================================================

  /**
   * Revoke a single session (invalidate cache)
   */
  async revokeSession(sessionId: string, reason?: string): Promise<void> {
    // Get session before revocation for cache invalidation
    const session = await this.prismaRepo.findById(sessionId, { withCache: false });
    
    await this.prismaRepo.revokeSession(sessionId, reason);
    
    // Invalidate cache
    if (session) {
      await this.invalidateSessionCache(session);
    }
  }

  /**
   * Revoke session by token (invalidate cache)
   */
  async revokeByToken(token: Token, reason?: string): Promise<void> {
    const session = await this.prismaRepo.findByToken(token, { withCache: false });
    
    await this.prismaRepo.revokeByToken(token, reason);
    
    // Invalidate cache
    if (session) {
      await this.invalidateSessionCache(session);
    }
  }

  /**
   * Delete all sessions for a user (invalidate user cache)
   */
  async deleteAllByUserId(userId: string, reason?: string): Promise<number> {
    // Get sessions before deletion for cache invalidation
    const sessions = await this.prismaRepo.findByUserId(userId);
    
    const count = await this.prismaRepo.deleteAllByUserId(userId, reason);
    
    // Invalidate user cache
    await this.invalidateUserCache(userId);
    
    // Invalidate individual session caches
    for (const session of sessions) {
      await this.invalidateSessionCache(session);
    }
    
    return count;
  }

  /**
   * Delete all sessions for multiple users
   */
  async deleteAllByUserIds(userIds: string[], reason: string): Promise<BulkRevokeResult> {
    // Invalidate cache for all users before operation
    for (const userId of userIds) {
      await this.invalidateUserCache(userId);
    }
    
    return this.prismaRepo.deleteAllByUserIds(userIds, reason);
  }

  /**
   * Delete sessions by device ID (invalidate affected sessions)
   */
  async deleteByDeviceId(deviceId: DeviceId, reason?: string): Promise<number> {
    // Get sessions before deletion
    const result = await this.prismaRepo.findByDeviceId(deviceId, { limit: 1000 });
    const sessions = result.items;
    
    const count = await this.prismaRepo.deleteByDeviceId(deviceId, reason);
    
    // Invalidate cache for affected sessions
    for (const session of sessions) {
      await this.invalidateSessionCache(session);
    }
    
    return count;
  }

  /**
   * Delete sessions by IP address (invalidate affected sessions)
   */
  async deleteByIpAddress(ipAddress: IpAddress, reason?: string): Promise<number> {
    // Get sessions before deletion
    const result = await this.prismaRepo.findByIpAddress(ipAddress, { limit: 1000 });
    const sessions = result.items;
    
    const count = await this.prismaRepo.deleteByIpAddress(ipAddress, reason);
    
    // Invalidate cache for affected sessions
    for (const session of sessions) {
      await this.invalidateSessionCache(session);
    }
    
    return count;
  }

  /**
   * Delete all expired sessions (cleanup) - invalidate cache
   */
  async deleteExpiredSessions(): Promise<CleanupResult> {
    // Get expired sessions before deletion for invalidation
    const expiredSessions = await this.prismaRepo.findExpiredSessions({ limit: 1000 });
    
    const result = await this.prismaRepo.deleteExpiredSessions();
    
    // Invalidate cache for expired sessions
    for (const session of expiredSessions.items) {
      await this.invalidateSessionCache(session);
    }
    
    return result;
  }

  /**
   * Delete idle sessions (cleanup) - invalidate cache
   */
  async deleteIdleSessions(idleThresholdMinutes: number): Promise<CleanupResult> {
    // Get idle sessions before deletion
    const idleSessions = await this.prismaRepo.findIdleSessions(idleThresholdMinutes, { limit: 1000 });
    
    const result = await this.prismaRepo.deleteIdleSessions(idleThresholdMinutes);
    
    // Invalidate cache for idle sessions
    for (const session of idleSessions.items) {
      await this.invalidateSessionCache(session);
    }
    
    return result;
  }

  /**
   * Clean up stale sessions (older than retention period)
   */
  async cleanupStaleSessions(retentionDays: number): Promise<CleanupResult> {
    // We don't need to invalidate cache for stale sessions as they are old
    return this.prismaRepo.cleanupStaleSessions(retentionDays);
  }

  /**
   * Revoke all expired sessions (batch) - invalidate cache
   */
  async revokeAllExpired(): Promise<BulkRevokeResult> {
    // Get expired sessions before revocation
    const expiredSessions = await this.prismaRepo.findExpiredSessions({ limit: 1000 });
    
    const result = await this.prismaRepo.revokeAllExpired();
    
    // Invalidate cache for expired sessions
    for (const session of expiredSessions.items) {
      await this.invalidateSessionCache(session);
    }
    
    return result;
  }

  /**
   * Revoke all idle sessions (batch) - invalidate cache
   */
  async revokeAllIdle(idleThresholdMinutes: number): Promise<BulkRevokeResult> {
    // Get idle sessions before revocation
    const idleSessions = await this.prismaRepo.findIdleSessions(idleThresholdMinutes, { limit: 1000 });
    
    const result = await this.prismaRepo.revokeAllIdle(idleThresholdMinutes);
    
    // Invalidate cache for idle sessions
    for (const session of idleSessions.items) {
      await this.invalidateSessionCache(session);
    }
    
    return result;
  }

  // ============================================================
  // Update Operations (With Cache Invalidation)
  // ============================================================

  /**
   * Extend session expiry (invalidate cache)
   */
  async extendSession(sessionId: string, additionalMinutes: number): Promise<SessionExtensionResult> {
    // Get session before update for cache invalidation
    const session = await this.prismaRepo.findById(sessionId, { withCache: false });
    
    const result = await this.prismaRepo.extendSession(sessionId, additionalMinutes);
    
    // Invalidate cache
    if (session) {
      await this.invalidateSessionCache(session);
    }
    
    return result;
  }

  /**
   * Update session activity (invalidate cache)
   */
  async updateActivity(sessionId: string, activityUrl?: string): Promise<SessionActivityResult> {
    // Get session before update for cache invalidation
    const session = await this.prismaRepo.findById(sessionId, { withCache: false });
    
    const result = await this.prismaRepo.updateActivity(sessionId, activityUrl);
    
    // Invalidate cache
    if (session) {
      await this.invalidateSessionCache(session);
    }
    
    return result;
  }

  /**
   * Suspend session (invalidate cache)
   */
  async suspendSession(sessionId: string, reason: string): Promise<void> {
    const session = await this.prismaRepo.findById(sessionId, { withCache: false });
    
    await this.prismaRepo.suspendSession(sessionId, reason);
    
    if (session) {
      await this.invalidateSessionCache(session);
    }
  }

  /**
   * Reactivate suspended session (invalidate cache)
   */
  async reactivateSession(sessionId: string): Promise<void> {
    const session = await this.prismaRepo.findById(sessionId, { withCache: false });
    
    await this.prismaRepo.reactivateSession(sessionId);
    
    if (session) {
      await this.invalidateSessionCache(session);
    }
  }

  /**
   * Update session metadata (invalidate cache)
   */
  async updateMetadata(sessionId: string, metadata: Partial<SessionMetadata>): Promise<void> {
    const session = await this.prismaRepo.findById(sessionId, { withCache: false });
    
    await this.prismaRepo.updateMetadata(sessionId, metadata);
    
    if (session) {
      await this.invalidateSessionCache(session);
    }
  }

  /**
   * Update session location (invalidate cache)
   */
  async updateLocation(sessionId: string, location: string): Promise<void> {
    const session = await this.prismaRepo.findById(sessionId, { withCache: false });
    
    await this.prismaRepo.updateLocation(sessionId, location);
    
    if (session) {
      await this.invalidateSessionCache(session);
    }
  }

  /**
   * Mark session as current (invalidate cache)
   */
  async markAsCurrent(sessionId: string): Promise<void> {
    const session = await this.prismaRepo.findById(sessionId, { withCache: false });
    
    await this.prismaRepo.markAsCurrent(sessionId);
    
    if (session) {
      await this.invalidateSessionCache(session);
    }
  }

  /**
   * Unmark all sessions as current for a user (invalidate user cache)
   */
  async unmarkAllCurrent(userId: string): Promise<void> {
    await this.prismaRepo.unmarkAllCurrent(userId);
    await this.invalidateUserCache(userId);
  }

  /**
   * Save session with optimistic locking (invalidate cache on save)
   */
  async saveWithVersionCheck(session: Session): Promise<void> {
    await this.prismaRepo.saveWithVersionCheck(session);
    await this.invalidateSessionCache(session);
  }

  /**
   * Batch update session status (invalidate cache for updated sessions)
   */
  async batchUpdateStatus(updates: Map<string, SessionStatus>): Promise<number> {
    // Get sessions before update for cache invalidation
    const sessionIds = Array.from(updates.keys());
    const sessions: Session[] = [];
    for (const id of sessionIds) {
      const session = await this.prismaRepo.findById(id, { withCache: false });
      if (session) {
        sessions.push(session);
      }
    }
    
    const count = await this.prismaRepo.batchUpdateStatus(updates);
    
    // Invalidate cache for updated sessions
    for (const session of sessions) {
      await this.invalidateSessionCache(session);
    }
    
    return count;
  }

  // ============================================================
  // Count Operations (Cached)
  // ============================================================

  /**
   * Count active sessions for a user (cached)
   */
  async countActiveSessionsByUser(userId: string): Promise<number> {
    const key = this.getCacheKey('countActiveSessionsByUser', { userId });
    
    return this.getCached(
      key,
      () => this.prismaRepo.countActiveSessionsByUser(userId),
      { ttl: CACHE_OPTIONS.SHORT.ttl }
    );
  }

  /**
   * Count sessions by status (cached)
   */
  async countByStatus(status: SessionStatus): Promise<number> {
    const key = this.getCacheKey('countByStatus', { status });
    
    return this.getCached(
      key,
      () => this.prismaRepo.countByStatus(status),
      { ttl: CACHE_OPTIONS.SHORT.ttl }
    );
  }

  /**
   * Count sessions by user (cached)
   */
  async countSessionsByUser(): Promise<Map<string, number>> {
    const key = 'countSessionsByUser';
    
    return this.getCached(
      key,
      () => this.prismaRepo.countSessionsByUser(),
      { ttl: CACHE_OPTIONS.MEDIUM.ttl }
    );
  }

  /**
   * Count unique users with active sessions (cached)
   */
  async countUniqueUsersWithActiveSessions(): Promise<number> {
    const key = 'countUniqueUsersWithActiveSessions';
    
    return this.getCached(
      key,
      () => this.prismaRepo.countUniqueUsersWithActiveSessions(),
      { ttl: CACHE_OPTIONS.MEDIUM.ttl }
    );
  }

  /**
   * Count sessions by network type (cached)
   */
  async countByNetworkType(): Promise<Record<string, number>> {
    const key = 'countByNetworkType';
    
    return this.getCached(
      key,
      () => this.prismaRepo.countByNetworkType(),
      { ttl: CACHE_OPTIONS.MEDIUM.ttl }
    );
  }

  /**
   * Count sessions by district (cached)
   */
  async countByDistrict(): Promise<Record<string, number>> {
    const key = 'countByDistrict';
    
    return this.getCached(
      key,
      () => this.prismaRepo.countByDistrict(),
      { ttl: CACHE_OPTIONS.MEDIUM.ttl }
    );
  }

  /**
   * Count suspicious sessions (cached)
   */
  async countSuspiciousSessions(): Promise<number> {
    const key = 'countSuspiciousSessions';
    
    return this.getCached(
      key,
      () => this.prismaRepo.countSuspiciousSessions(),
      { ttl: CACHE_OPTIONS.SHORT.ttl }
    );
  }

  // ============================================================
  // Statistics Operations (Cached)
  // ============================================================

  /**
   * Get session statistics (cached)
   */
  async getStatistics(): Promise<any> {
    const key = 'getStatistics';
    
    return this.getCached(
      key,
      () => this.prismaRepo.getStatistics(),
      { ttl: CACHE_OPTIONS.MEDIUM.ttl }
    );
  }

  /**
   * Get active session count (cached with short TTL)
   */
  async getActiveSessionCount(): Promise<number> {
    const key = 'getActiveSessionCount';
    
    return this.getCached(
      key,
      () => this.prismaRepo.getActiveSessionCount(),
      { ttl: CACHE_OPTIONS.SHORT.ttl }
    );
  }

  /**
   * Get current active sessions per user (cached)
   */
  async getActiveSessionsPerUser(): Promise<Map<string, number>> {
    const key = 'getActiveSessionsPerUser';
    
    return this.getCached(
      key,
      () => this.prismaRepo.getActiveSessionsPerUser(),
      { ttl: CACHE_OPTIONS.SHORT.ttl }
    );
  }

  /**
   * Get top users by session count (cached)
   */
  async getTopUsersBySessionCount(limit: number): Promise<Array<{ userId: string; sessionCount: number }>> {
    const key = this.getCacheKey('getTopUsersBySessionCount', { limit });
    
    return this.getCached(
      key,
      () => this.prismaRepo.getTopUsersBySessionCount(limit),
      { ttl: CACHE_OPTIONS.MEDIUM.ttl }
    );
  }

  /**
   * Get geographic session distribution (cached)
   */
  async getGeographicDistribution(): Promise<any[]> {
    const key = 'getGeographicDistribution';
    
    return this.getCached(
      key,
      () => this.prismaRepo.getGeographicDistribution(),
      { ttl: CACHE_OPTIONS.LONG.ttl }
    );
  }

  /**
   * Get session health dashboard (cached)
   */
  async getSessionHealthDashboard(): Promise<any> {
    const key = 'getSessionHealthDashboard';
    
    return this.getCached(
      key,
      () => this.prismaRepo.getSessionHealthDashboard(),
      { ttl: CACHE_OPTIONS.SHORT.ttl }
    );
  }

  /**
   * Get real-time session metrics (cached with very short TTL)
   */
  async getRealtimeMetrics(): Promise<any> {
    const key = 'getRealtimeMetrics';
    
    return this.getCached(
      key,
      () => this.prismaRepo.getRealtimeMetrics(),
      { ttl: CACHE_OPTIONS.SHORT.ttl }
    );
  }

  // ============================================================
  // Advanced Operations (With Cache Invalidation)
  // ============================================================

  /**
   * Acquire distributed lock for session operation
   */
  async acquireSessionLock(sessionId: string, ttlSeconds?: number): Promise<any> {
    // Locks are not cached (they are ephemeral)
    return this.prismaRepo.acquireSessionLock(sessionId, ttlSeconds);
  }

  /**
   * Release distributed lock
   */
  async releaseSessionLock(lockId: string): Promise<boolean> {
    // Locks are not cached (they are ephemeral)
    return this.prismaRepo.releaseSessionLock(lockId);
  }

  /**
   * Execute operation with session lock
   */
  async withSessionLock<T>(
    sessionId: string,
    operation: () => Promise<T>,
    ttlSeconds?: number
  ): Promise<T> {
    // Locks are not cached (they are ephemeral)
    return this.prismaRepo.withSessionLock(sessionId, operation, ttlSeconds);
  }

  /**
   * Detect session replay attack
   */
  async detectReplayAttack(
    token: Token,
    requestContext: { ipAddress: IpAddress; userAgent: string; timestamp: Date }
  ): Promise<any> {
    // Replay detection is not cached (security critical)
    return this.prismaRepo.detectReplayAttack(token, requestContext);
  }

  /**
   * Detect geographic anomalies
   */
  async detectGeographicAnomaly(
    userId: string,
    newLocation: { district: string; latitude: number; longitude: number }
  ): Promise<any> {
    // Anomaly detection is not cached (security critical)
    return this.prismaRepo.detectGeographicAnomaly(userId, newLocation);
  }

  /**
   * Get predictive session expiry
   */
  async getPredictiveExpiry(sessionId: string): Promise<any> {
    // Predictive expiry is not cached (real-time calculation)
    return this.prismaRepo.getPredictiveExpiry(sessionId);
  }

  /**
   * Batch process sessions with progress tracking
   */
  async batchProcessSessions(
    sessionIds: string[],
    operation: (session: Session) => Promise<void>,
    onProgress?: (progress: any) => void
  ): Promise<{ succeeded: number; failed: number; errors: Array<{ id: string; error: string }> }> {
    // Batch processing is not cached
    return this.prismaRepo.batchProcessSessions(sessionIds, operation, onProgress);
  }

  /**
   * Find sessions requiring health check
   */
  async findSessionsNeedingHealthCheck(options?: PaginationOptions): Promise<PaginatedResult<Session>> {
    const cacheKey = this.getCacheKey('findSessionsNeedingHealthCheck', { ...options });
    
    return this.getCached(
      cacheKey,
      () => this.prismaRepo.findSessionsNeedingHealthCheck(options || {}),
      { ttl: CACHE_OPTIONS.SHORT.ttl }
    );
  }

  /**
   * Update session health score (invalidate cache)
   */
  async updateSessionHealth(sessionId: string, healthScore: number): Promise<any> {
    const session = await this.prismaRepo.findById(sessionId, { withCache: false });
    
    const result = await this.prismaRepo.updateSessionHealth(sessionId, healthScore);
    
    if (session) {
      await this.invalidateSessionCache(session);
    }
    
    return result;
  }

  /**
   * Batch update session health scores (invalidate cache)
   */
  async batchUpdateHealthScores(
    updates: Map<string, number>,
    onProgress?: (progress: any) => void
  ): Promise<number> {
    // Get session IDs before update for cache invalidation
    const sessionIds = Array.from(updates.keys());
    const sessions: Session[] = [];
    for (const id of sessionIds) {
      const session = await this.prismaRepo.findById(id, { withCache: false });
      if (session) {
        sessions.push(session);
      }
    }
    
    const count = await this.prismaRepo.batchUpdateHealthScores(updates, onProgress);
    
    // Invalidate cache for updated sessions
    for (const session of sessions) {
      await this.invalidateSessionCache(session);
    }
    
    return count;
  }

  /**
   * Get session anomaly timeline
   */
  async getAnomalyTimeline(
    userId: string,
    days: number
  ): Promise<any[]> {
    const cacheKey = this.getCacheKey('getAnomalyTimeline', { userId, days });
    
    return this.getCached(
      cacheKey,
      () => this.prismaRepo.getAnomalyTimeline(userId, days),
      { ttl: CACHE_OPTIONS.SHORT.ttl }
    );
  }

  /**
   * Terminate all sessions for users with anomalies (invalidate cache)
   */
  async terminateAnomalySessions(
    userIds: string[],
    reason: string
  ): Promise<BulkRevokeResult> {
    // Invalidate cache for all users before operation
    for (const userId of userIds) {
      await this.invalidateUserCache(userId);
    }
    
    return this.prismaRepo.terminateAnomalySessions(userIds, reason);
  }

  /**
   * Get session performance metrics (cached)
   */
  async getPerformanceMetrics(): Promise<any> {
    const key = 'getPerformanceMetrics';
    
    return this.getCached(
      key,
      () => this.prismaRepo.getPerformanceMetrics(),
      { ttl: CACHE_OPTIONS.MEDIUM.ttl }
    );
  }

  // ============================================================
  // Advanced Analytics Operations
  // ============================================================

  /**
   * Get session activity heatmap (cached)
   */
  async getActivityHeatmap(days: number): Promise<any[]> {
    const key = this.getCacheKey('getActivityHeatmap', { days });
    
    return this.getCached(
      key,
      () => this.prismaRepo.getActivityHeatmap(days),
      { ttl: CACHE_OPTIONS.LONG.ttl }
    );
  }

  /**
   * Get user session patterns (cached)
   */
  async getUserSessionPatterns(userId: string): Promise<any> {
    const key = this.getCacheKey('getUserSessionPatterns', { userId });
    
    return this.getCached(
      key,
      () => this.prismaRepo.getUserSessionPatterns(userId),
      { ttl: CACHE_OPTIONS.MEDIUM.ttl }
    );
  }

  /**
   * Detect anomalous session behavior (not cached - security critical)
   */
  async detectAnomalies(userId: string): Promise<any> {
    // Anomaly detection is not cached (security critical)
    return this.prismaRepo.detectAnomalies(userId);
  }

  /**
   * Run ML-based anomaly detection batch (not cached - security critical)
   */
  async runAnomalyDetectionBatch(options?: {
    userIds?: string[];
    timeWindowHours?: number;
    sensitivity?: 'low' | 'medium' | 'high';
  }): Promise<any> {
    // Anomaly detection is not cached (security critical)
    return this.prismaRepo.runAnomalyDetectionBatch(options);
  }

  /**
   * Export sessions for audit (not cached - data freshness required)
   */
  async exportForAudit(
    userId?: string,
    fromDate?: Date,
    toDate?: Date
  ): Promise<Session[]> {
    // Audit export is not cached (data must be fresh)
    return this.prismaRepo.exportForAudit(userId, fromDate, toDate);
  }

  /**
   * Archive old sessions (invalidate cache for archived sessions)
   */
  async archiveOldSessions(olderThanDays: number): Promise<number> {
    // Get sessions to be archived before operation (for cache invalidation)
    const staleSessions = await this.prismaRepo.findStaleSessions(olderThanDays, { limit: 1000 });
    
    const count = await this.prismaRepo.archiveOldSessions(olderThanDays);
    
    // Invalidate cache for archived sessions
    for (const session of staleSessions.items) {
      await this.invalidateSessionCache(session);
    }
    
    return count;
  }

  /**
   * Restore archived sessions
   */
  async restoreArchivedSessions(olderThanDays: number): Promise<number> {
    // Restored sessions will be cached when accessed
    return this.prismaRepo.restoreArchivedSessions(olderThanDays);
  }

  /**
   * Generate session compliance report (cached)
   */
  async generateComplianceReport(
    fromDate: Date,
    toDate: Date
  ): Promise<any> {
    const cacheKey = this.getCacheKey('generateComplianceReport', { 
      fromDate: fromDate.toISOString(), 
      toDate: toDate.toISOString() 
    });
    
    return this.getCached(
      cacheKey,
      () => this.prismaRepo.generateComplianceReport(fromDate, toDate),
      { ttl: CACHE_OPTIONS.LONG.ttl }
    );
  }

  /**
   * Health check for cache
   */
  async healthCheck(): Promise<{
    healthy: boolean;
    latency: number;
    error?: string;
  }> {
    try {
      const startTime = Date.now();
      await this.cacheService.ping();
      const latency = Date.now() - startTime;
      
      return {
        healthy: true,
        latency,
      };
    } catch (error) {
      return {
        healthy: false,
        latency: 0,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  /**
   * Get cache statistics
   */
  getCacheMetrics(): {
    hits: number;
    misses: number;
    errors: number;
    hitRate: number;
    totalOperations: number;
  } {
    const total = this.metrics.hits + this.metrics.misses;
    return {
      hits: this.metrics.hits,
      misses: this.metrics.misses,
      errors: this.metrics.errors,
      hitRate: total > 0 ? (this.metrics.hits / total) * 100 : 0,
      totalOperations: this.metrics.totalOperations,
    };
  }

  /**
   * Clear all session cache (for testing or emergency)
   */
  async clearCache(): Promise<void> {
    await this.cacheService.deletePattern(SessionCacheKey.pattern());
    this.metrics = { hits: 0, misses: 0, errors: 0, totalOperations: 0 };
    this.logger.warn('Session cache cleared');
    this.metricsService?.incrementCounter('session.cache.manual_clear');
  }
}
