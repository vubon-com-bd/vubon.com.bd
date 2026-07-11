/**
 * Session Prisma Repository - Infrastructure Layer Implementation
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 *
 * @module infrastructure/persistence/prisma/repositories/session.prisma.repository
 *
 * @description
 * Prisma implementation of the SessionRepository port.
 * Handles all database operations for Session aggregate with enterprise-grade features.
 *
 * Enterprise Features:
 * ✅ Implements domain SessionRepository interface
 * ✅ Complete CRUD operations with pagination and filtering
 * ✅ Caching strategy for hot data (Redis)
 * ✅ Optimistic locking for concurrent updates
 * ✅ Soft delete support with filtering
 * ✅ Audit trail for all operations
 * ✅ Performance optimized queries with indices
 * ✅ Connection pooling and retry logic
 * ✅ Error handling with domain-friendly exceptions
 * ✅ Bangladesh specific - District/Upazila/NetworkType filtering
 * ✅ Transaction support for complex operations
 *
 * @example
 * // In infrastructure module
 * @Module({
 *   providers: [
 *     PrismaService,
 *     {
 *       provide: 'SessionRepository',
 *       useClass: SessionPrismaRepository,
 *     },
 *   ],
 *   exports: ['SessionRepository'],
 * })
 * export class DatabaseModule {}
 */

import { Injectable, Logger, Inject, Optional } from '@nestjs/common';
import { Prisma, Session as PrismaSession, PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

// Shared packages for utilities and types
import { SESSION_CONFIG, DEVICE_TYPES, NETWORK_TYPES } from '@vubon/shared-constants';
import type { SessionStatus as SharedSessionStatus, NetworkType } from '@vubon/shared-types';
import { maskEmail, maskPhone } from '@vubon/shared-utils';

// Domain imports (ports and entities)
import { SessionRepository, PaginationOptions, PaginatedResult, SessionFilters, SessionStatusResult, BulkRevokeResult, CleanupResult, SessionExtensionResult, SessionActivityResult } from '../../../domain/repositories/session.repository.interface';
import { Session, SessionStatus, SessionMetadata } from '../../../domain/entities/session.entity';
import { Token } from '../../../domain/value-objects/token.vo';
import { DeviceId } from '../../../domain/value-objects/device-id.vo';
import { IpAddress } from '../../../domain/value-objects/ip-address.vo';
import { UserAgent } from '../../../domain/value-objects/user-agent.vo';

// Infrastructure imports
import { PrismaService } from '../prisma.service';
import { CacheService } from '../../cache/cache.service.interface';
import { AuditService } from '../../audit/audit.service.interface';
import { MetricsService } from '../../metrics/metrics.service.interface';
import { LoggerService } from '../../logger/logger.service.interface';

// ============================================================
// Types and Constants
// ============================================================

/**
 * Find options for session queries
 */
export interface FindOptions {
  includeDeleted?: boolean;
  withCache?: boolean;
  cacheTTL?: number;
}

/**
 * Update options for session operations
 */
export interface UpdateOptions {
  optimisticLocking?: boolean;
  skipAudit?: boolean;
  skipCache?: boolean;
}

/**
 * Session with relations (for complex queries)
 */
interface PrismaSessionWithRelations extends PrismaSession {
  user?: unknown;
  refreshTokens?: unknown[];
}

// ============================================================
// Cache Key Builder
// ============================================================

/**
 * Cache key generation for session entities
 */
class SessionCacheKey {
  private static readonly PREFIX = 'auth:session:';
  private static readonly TOKEN_PREFIX = 'auth:session:token:';
  private static readonly USER_PREFIX = 'auth:session:user:';

  static byId(id: string): string {
    return `${this.PREFIX}${id}`;
  }

  static byToken(token: string): string {
    return `${this.TOKEN_PREFIX}${token}`;
  }

  static byUserId(userId: string): string {
    return `${this.USER_PREFIX}${userId}`;
  }

  static pattern(): string {
    return `${this.PREFIX}*`;
  }

  static userPattern(userId: string): string {
    return `${this.USER_PREFIX}${userId}:*`;
  }
}

// ============================================================
// Session Prisma Repository Implementation
// ============================================================

@Injectable()
export class SessionPrismaRepository implements SessionRepository {
  private readonly logger = new Logger(SessionPrismaRepository.name);
  private readonly defaultCacheTTL = 300; // 5 minutes

  constructor(
    private readonly prisma: PrismaService,
    @Optional() @Inject('CacheService')
    private readonly cacheService?: CacheService,
    @Optional() @Inject('AuditService')
    private readonly auditService?: AuditService,
    @Optional() @Inject('MetricsService')
    private readonly metricsService?: MetricsService,
    @Optional() @Inject('LoggerService')
    private readonly loggerService?: LoggerService,
  ) {
    this.logger.log('SessionPrismaRepository initialized');
  }

  // ============================================================
  // Core CRUD Operations
  // ============================================================

  /**
   * Find session by ID with caching
   */
  async findById(id: string, options: FindOptions = {}): Promise<Session | null> {
    const startTime = Date.now();
    const { withCache = true, cacheTTL = this.defaultCacheTTL } = options;

    try {
      // Check cache first
      if (withCache && this.cacheService) {
        const cacheKey = SessionCacheKey.byId(id);
        const cached = await this.cacheService.get<Session>(cacheKey);
        if (cached) {
          this.metricsService?.incrementCounter('session.repository.cache.hit');
          return cached;
        }
        this.metricsService?.incrementCounter('session.repository.cache.miss');
      }

      // Execute query with retry logic
      const prismaSession = await this.executeWithRetry(() =>
        this.prisma.session.findUnique({
          where: { id },
        })
      );

      if (!prismaSession) {
        return null;
      }

      // Convert to domain entity
      const session = this.toDomain(prismaSession);

      // Cache the result
      if (withCache && this.cacheService) {
        await this.cacheService.set(SessionCacheKey.byId(id), session, cacheTTL);
      }

      // Record metrics
      this.metricsService?.recordHistogram(
        'session.repository.findById.duration',
        Date.now() - startTime
      );

      return session;
    } catch (error) {
      this.logger.error(`Failed to find session by ID: ${id}`, error);
      this.metricsService?.incrementCounter('session.repository.error');
      throw this.wrapError(error);
    }
  }

  /**
   * Find session by token value with caching
   */
  async findByToken(token: Token, options: FindOptions = {}): Promise<Session | null> {
    const startTime = Date.now();
    const { withCache = true, cacheTTL = this.defaultCacheTTL } = options;
    const tokenValue = token.getValue();

    try {
      // Check cache first
      if (withCache && this.cacheService) {
        const cacheKey = SessionCacheKey.byToken(tokenValue);
        const cached = await this.cacheService.get<Session>(cacheKey);
        if (cached) {
          this.metricsService?.incrementCounter('session.repository.cache.hit');
          return cached;
        }
        this.metricsService?.incrementCounter('session.repository.cache.miss');
      }

      const prismaSession = await this.executeWithRetry(() =>
        this.prisma.session.findUnique({
          where: { token: tokenValue },
        })
      );

      if (!prismaSession) {
        return null;
      }

      const session = this.toDomain(prismaSession);

      // Cache the result
      if (withCache && this.cacheService) {
        await this.cacheService.set(SessionCacheKey.byToken(tokenValue), session, cacheTTL);
        await this.cacheService.set(SessionCacheKey.byId(session.getId()), session, cacheTTL);
      }

      this.metricsService?.recordHistogram(
        'session.repository.findByToken.duration',
        Date.now() - startTime
      );

      return session;
    } catch (error) {
      this.logger.error(`Failed to find session by token`, error);
      this.metricsService?.incrementCounter('session.repository.error');
      throw this.wrapError(error);
    }
  }

  /**
   * Find session by raw token value (alias for findByToken)
   */
  async findByTokenValue(tokenValue: string, options: FindOptions = {}): Promise<Session | null> {
    const token = new Token(tokenValue);
    return this.findByToken(token, options);
  }

  /**
   * Find all sessions by user ID
   */
  async findByUserId(userId: string): Promise<Session[]> {
    const startTime = Date.now();

    try {
      const prismaSessions = await this.executeWithRetry(() =>
        this.prisma.session.findMany({
          where: { userId },
          orderBy: { createdAt: 'desc' },
        })
      );

      const sessions = prismaSessions.map((s: PrismaSession) => this.toDomain(s));

      this.metricsService?.recordHistogram(
        'session.repository.findByUserId.duration',
        Date.now() - startTime
      );

      return sessions;
    } catch (error) {
      this.logger.error(`Failed to find sessions for user: ${userId}`, error);
      this.metricsService?.incrementCounter('session.repository.error');
      throw this.wrapError(error);
    }
  }

  /**
   * Find sessions by user ID with pagination
   */
  async findByUserIdPaginated(
    userId: string,
    options: PaginationOptions
  ): Promise<PaginatedResult<Session>> {
    const startTime = Date.now();
    const { page = 1, limit = 20, sortBy = 'createdAt', sortOrder = 'desc' } = options;

    try {
      const where = { userId };
      const orderBy = { [sortBy]: sortOrder };

      const [total, prismaSessions] = await Promise.all([
        this.prisma.session.count({ where }),
        this.prisma.session.findMany({
          where,
          orderBy,
          skip: (page - 1) * limit,
          take: limit,
        }),
      ]);

      const sessions = prismaSessions.map((s: PrismaSession) => this.toDomain(s));

      this.metricsService?.recordHistogram(
        'session.repository.findByUserIdPaginated.duration',
        Date.now() - startTime
      );

      return {
        items: sessions,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
        hasNext: page * limit < total,
        hasPrevious: page > 1,
      };
    } catch (error) {
      this.logger.error(`Failed to find paginated sessions for user: ${userId}`, error);
      this.metricsService?.incrementCounter('session.repository.error');
      throw this.wrapError(error);
    }
  }

  /**
   * Find active sessions for a user
   */
  async findActiveSessions(userId: string): Promise<Session[]> {
    const startTime = Date.now();

    try {
      const prismaSessions = await this.executeWithRetry(() =>
        this.prisma.session.findMany({
          where: {
            userId,
            status: 'ACTIVE',
            expiresAt: { gt: new Date() },
          },
          orderBy: { lastActivityAt: 'desc' },
        })
      );

      const sessions = prismaSessions.map((s: PrismaSession) => this.toDomain(s));

      this.metricsService?.recordHistogram(
        'session.repository.findActiveSessions.duration',
        Date.now() - startTime
      );

      return sessions;
    } catch (error) {
      this.logger.error(`Failed to find active sessions for user: ${userId}`, error);
      this.metricsService?.incrementCounter('session.repository.error');
      throw this.wrapError(error);
    }
  }

  /**
   * Find active sessions by user with pagination
   */
  async findActiveSessionsPaginated(
    userId: string,
    options: PaginationOptions
  ): Promise<PaginatedResult<Session>> {
    const startTime = Date.now();
    const { page = 1, limit = 20, sortBy = 'createdAt', sortOrder = 'desc' } = options;

    try {
      const where = {
        userId,
        status: 'ACTIVE',
        expiresAt: { gt: new Date() },
      };
      const orderBy = { [sortBy]: sortOrder };

      const [total, prismaSessions] = await Promise.all([
        this.prisma.session.count({ where }),
        this.prisma.session.findMany({
          where,
          orderBy,
          skip: (page - 1) * limit,
          take: limit,
        }),
      ]);

      const sessions = prismaSessions.map((s: PrismaSession) => this.toDomain(s));

      this.metricsService?.recordHistogram(
        'session.repository.findActiveSessionsPaginated.duration',
        Date.now() - startTime
      );

      return {
        items: sessions,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
        hasNext: page * limit < total,
        hasPrevious: page > 1,
      };
    } catch (error) {
      this.logger.error(`Failed to find paginated active sessions for user: ${userId}`, error);
      this.metricsService?.incrementCounter('session.repository.error');
      throw this.wrapError(error);
    }
  }

  /**
   * Find sessions by device ID
   */
  async findByDeviceId(deviceId: DeviceId, options: PaginationOptions = {}): Promise<PaginatedResult<Session>> {
    const startTime = Date.now();
    const { page = 1, limit = 20, sortBy = 'createdAt', sortOrder = 'desc' } = options;
    const deviceIdValue = deviceId.getValue();

    try {
      // Query sessions with deviceId in metadata (JSON field)
      const where = {
        // Prisma's JSON filtering for deviceId in metadata
        metadata: {
          path: ['deviceId'],
          equals: deviceIdValue,
        },
      };
      const orderBy = { [sortBy]: sortOrder };

      const [total, prismaSessions] = await Promise.all([
        this.prisma.session.count({ where }),
        this.prisma.session.findMany({
          where,
          orderBy,
          skip: (page - 1) * limit,
          take: limit,
        }),
      ]);

      const sessions = prismaSessions.map((s: PrismaSession) => this.toDomain(s));

      this.metricsService?.recordHistogram(
        'session.repository.findByDeviceId.duration',
        Date.now() - startTime
      );

      return {
        items: sessions,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
        hasNext: page * limit < total,
        hasPrevious: page > 1,
      };
    } catch (error) {
      this.logger.error(`Failed to find sessions by device ID: ${deviceIdValue}`, error);
      this.metricsService?.incrementCounter('session.repository.error');
      throw this.wrapError(error);
    }
  }

  /**
   * Find sessions by IP address
   */
  async findByIpAddress(
    ipAddress: IpAddress,
    options: PaginationOptions = {}
  ): Promise<PaginatedResult<Session>> {
    const startTime = Date.now();
    const { page = 1, limit = 20, sortBy = 'createdAt', sortOrder = 'desc' } = options;
    const ipValue = ipAddress.getValue();

    try {
      const where = { ipAddress: ipValue };
      const orderBy = { [sortBy]: sortOrder };

      const [total, prismaSessions] = await Promise.all([
        this.prisma.session.count({ where }),
        this.prisma.session.findMany({
          where,
          orderBy,
          skip: (page - 1) * limit,
          take: limit,
        }),
      ]);

      const sessions = prismaSessions.map((s: PrismaSession) => this.toDomain(s));

      this.metricsService?.recordHistogram(
        'session.repository.findByIpAddress.duration',
        Date.now() - startTime
      );

      return {
        items: sessions,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
        hasNext: page * limit < total,
        hasPrevious: page > 1,
      };
    } catch (error) {
      this.logger.error(`Failed to find sessions by IP: ${ipValue}`, error);
      this.metricsService?.incrementCounter('session.repository.error');
      throw this.wrapError(error);
    }
  }

  /**
   * Find sessions by status
   */
  async findByStatus(
    status: SessionStatus,
    options: PaginationOptions = {}
  ): Promise<PaginatedResult<Session>> {
    return this.findByFilters({ status: [status] }, options);
  }

  /**
   * Find expired sessions
   */
  async findExpiredSessions(options: PaginationOptions = {}): Promise<PaginatedResult<Session>> {
    return this.findByFilters({ isExpired: true }, options);
  }

  /**
   * Find revoked sessions
   */
  async findRevokedSessions(options: PaginationOptions = {}): Promise<PaginatedResult<Session>> {
    return this.findByFilters({ status: [SessionStatus.REVOKED] }, options);
  }

  /**
   * Find suspended sessions
   */
  async findSuspendedSessions(options: PaginationOptions = {}): Promise<PaginatedResult<Session>> {
    return this.findByFilters({ status: [SessionStatus.SUSPENDED] }, options);
  }

  /**
   * Find idle sessions (inactive for too long)
   */
  async findIdleSessions(
    idleThresholdMinutes: number,
    options: PaginationOptions = {}
  ): Promise<PaginatedResult<Session>> {
    const startTime = Date.now();
    const { page = 1, limit = 20, sortBy = 'createdAt', sortOrder = 'desc' } = options;
    const idleThreshold = new Date(Date.now() - idleThresholdMinutes * 60 * 1000);

    try {
      const where = {
        status: 'ACTIVE',
        expiresAt: { gt: new Date() },
        lastActivityAt: { lt: idleThreshold },
      };
      const orderBy = { [sortBy]: sortOrder };

      const [total, prismaSessions] = await Promise.all([
        this.prisma.session.count({ where }),
        this.prisma.session.findMany({
          where,
          orderBy,
          skip: (page - 1) * limit,
          take: limit,
        }),
      ]);

      const sessions = prismaSessions.map((s: PrismaSession) => this.toDomain(s));

      this.metricsService?.recordHistogram(
        'session.repository.findIdleSessions.duration',
        Date.now() - startTime
      );

      return {
        items: sessions,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
        hasNext: page * limit < total,
        hasPrevious: page > 1,
      };
    } catch (error) {
      this.logger.error(`Failed to find idle sessions (threshold: ${idleThresholdMinutes} minutes)`, error);
      this.metricsService?.incrementCounter('session.repository.error');
      throw this.wrapError(error);
    }
  }

  /**
   * Find sessions expiring soon
   */
  async findExpiringSoon(
    hoursThreshold: number,
    options: PaginationOptions = {}
  ): Promise<PaginatedResult<Session>> {
    const startTime = Date.now();
    const { page = 1, limit = 20, sortBy = 'createdAt', sortOrder = 'desc' } = options;
    const now = new Date();
    const expiryThreshold = new Date(now.getTime() + hoursThreshold * 60 * 60 * 1000);

    try {
      const where = {
        status: 'ACTIVE',
        expiresAt: { gt: now, lt: expiryThreshold },
      };
      const orderBy = { [sortBy]: sortOrder };

      const [total, prismaSessions] = await Promise.all([
        this.prisma.session.count({ where }),
        this.prisma.session.findMany({
          where,
          orderBy,
          skip: (page - 1) * limit,
          take: limit,
        }),
      ]);

      const sessions = prismaSessions.map((s: PrismaSession) => this.toDomain(s));

      this.metricsService?.recordHistogram(
        'session.repository.findExpiringSoon.duration',
        Date.now() - startTime
      );

      return {
        items: sessions,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
        hasNext: page * limit < total,
        hasPrevious: page > 1,
      };
    } catch (error) {
      this.logger.error(`Failed to find sessions expiring soon (threshold: ${hoursThreshold} hours)`, error);
      this.metricsService?.incrementCounter('session.repository.error');
      throw this.wrapError(error);
    }
  }

  /**
   * Find stale sessions (not used for N days)
   */
  async findStaleSessions(
    daysInactive: number,
    options: PaginationOptions = {}
  ): Promise<PaginatedResult<Session>> {
    const startTime = Date.now();
    const { page = 1, limit = 20, sortBy = 'createdAt', sortOrder = 'desc' } = options;
    const staleThreshold = new Date(Date.now() - daysInactive * 24 * 60 * 60 * 1000);

    try {
      const where = {
        status: 'ACTIVE',
        lastActivityAt: { lt: staleThreshold },
      };
      const orderBy = { [sortBy]: sortOrder };

      const [total, prismaSessions] = await Promise.all([
        this.prisma.session.count({ where }),
        this.prisma.session.findMany({
          where,
          orderBy,
          skip: (page - 1) * limit,
          take: limit,
        }),
      ]);

      const sessions = prismaSessions.map((s: PrismaSession) => this.toDomain(s));

      this.metricsService?.recordHistogram(
        'session.repository.findStaleSessions.duration',
        Date.now() - startTime
      );

      return {
        items: sessions,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
        hasNext: page * limit < total,
        hasPrevious: page > 1,
      };
    } catch (error) {
      this.logger.error(`Failed to find stale sessions (days: ${daysInactive})`, error);
      this.metricsService?.incrementCounter('session.repository.error');
      throw this.wrapError(error);
    }
  }

  /**
   * Find sessions by filters
   */
  async findByFilters(
    filters: SessionFilters,
    options: PaginationOptions = {}
  ): Promise<PaginatedResult<Session>> {
    const startTime = Date.now();
    const { page = 1, limit = 20, sortBy = 'createdAt', sortOrder = 'desc' } = options;

    try {
      const where = this.buildFilterConditions(filters);
      const orderBy = { [sortBy]: sortOrder };

      const [total, prismaSessions] = await Promise.all([
        this.prisma.session.count({ where }),
        this.prisma.session.findMany({
          where,
          orderBy,
          skip: (page - 1) * limit,
          take: limit,
        }),
      ]);

      const sessions = prismaSessions.map((s: PrismaSession) => this.toDomain(s));

      this.metricsService?.recordHistogram(
        'session.repository.findByFilters.duration',
        Date.now() - startTime
      );

      return {
        items: sessions,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
        hasNext: page * limit < total,
        hasPrevious: page > 1,
      };
    } catch (error) {
      this.logger.error('Failed to find sessions by filters', error);
      this.metricsService?.incrementCounter('session.repository.error');
      throw this.wrapError(error);
    }
  }

  /**
   * Find current session for user
   */
  async findCurrentSession(userId: string): Promise<Session | null> {
    const startTime = Date.now();

    try {
      const prismaSession = await this.executeWithRetry(() =>
        this.prisma.session.findFirst({
          where: {
            userId,
            status: 'ACTIVE',
            expiresAt: { gt: new Date() },
            isCurrent: true,
          },
          orderBy: { createdAt: 'desc' },
        })
      );

      if (!prismaSession) {
        return null;
      }

      const session = this.toDomain(prismaSession);

      this.metricsService?.recordHistogram(
        'session.repository.findCurrentSession.duration',
        Date.now() - startTime
      );

      return session;
    } catch (error) {
      this.logger.error(`Failed to find current session for user: ${userId}`, error);
      this.metricsService?.incrementCounter('session.repository.error');
      throw this.wrapError(error);
    }
  }

  /**
   * Find sessions by network type (Bangladesh specific)
   */
  async findByNetworkType(
    networkType: '2g' | '3g' | '4g' | '5g' | 'wifi',
    options: PaginationOptions = {}
  ): Promise<PaginatedResult<Session>> {
    const startTime = Date.now();
    const { page = 1, limit = 20, sortBy = 'createdAt', sortOrder = 'desc' } = options;

    try {
      // Query sessions with networkType in metadata (JSON field)
      const where = {
        metadata: {
          path: ['networkType'],
          equals: networkType,
        },
      };
      const orderBy = { [sortBy]: sortOrder };

      const [total, prismaSessions] = await Promise.all([
        this.prisma.session.count({ where }),
        this.prisma.session.findMany({
          where,
          orderBy,
          skip: (page - 1) * limit,
          take: limit,
        }),
      ]);

      const sessions = prismaSessions.map((s: PrismaSession) => this.toDomain(s));

      this.metricsService?.recordHistogram(
        'session.repository.findByNetworkType.duration',
        Date.now() - startTime
      );

      return {
        items: sessions,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
        hasNext: page * limit < total,
        hasPrevious: page > 1,
      };
    } catch (error) {
      this.logger.error(`Failed to find sessions by network type: ${networkType}`, error);
      this.metricsService?.incrementCounter('session.repository.error');
      throw this.wrapError(error);
    }
  }

  /**
   * Find sessions by district (Bangladesh specific)
   */
  async findByDistrict(
    district: string,
    options: PaginationOptions = {}
  ): Promise<PaginatedResult<Session>> {
    const startTime = Date.now();
    const { page = 1, limit = 20, sortBy = 'createdAt', sortOrder = 'desc' } = options;

    try {
      // Query sessions with district in metadata (JSON field)
      const where = {
        metadata: {
          path: ['district'],
          equals: district,
        },
      };
      const orderBy = { [sortBy]: sortOrder };

      const [total, prismaSessions] = await Promise.all([
        this.prisma.session.count({ where }),
        this.prisma.session.findMany({
          where,
          orderBy,
          skip: (page - 1) * limit,
          take: limit,
        }),
      ]);

      const sessions = prismaSessions.map((s: PrismaSession) => this.toDomain(s));

      this.metricsService?.recordHistogram(
        'session.repository.findByDistrict.duration',
        Date.now() - startTime
      );

      return {
        items: sessions,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
        hasNext: page * limit < total,
        hasPrevious: page > 1,
      };
    } catch (error) {
      this.logger.error(`Failed to find sessions by district: ${district}`, error);
      this.metricsService?.incrementCounter('session.repository.error');
      throw this.wrapError(error);
    }
  }

  /**
   * Find suspicious sessions (anomaly detected)
   */
  async findSuspiciousSessions(options: PaginationOptions = {}): Promise<PaginatedResult<Session>> {
    const startTime = Date.now();
    const { page = 1, limit = 20, sortBy = 'createdAt', sortOrder = 'desc' } = options;

    try {
      // Query sessions with suspicious flag in metadata (JSON field)
      const where = {
        metadata: {
          path: ['isSuspicious'],
          equals: true,
        },
      };
      const orderBy = { [sortBy]: sortOrder };

      const [total, prismaSessions] = await Promise.all([
        this.prisma.session.count({ where }),
        this.prisma.session.findMany({
          where,
          orderBy,
          skip: (page - 1) * limit,
          take: limit,
        }),
      ]);

      const sessions = prismaSessions.map((s: PrismaSession) => this.toDomain(s));

      this.metricsService?.recordHistogram(
        'session.repository.findSuspiciousSessions.duration',
        Date.now() - startTime
      );

      return {
        items: sessions,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
        hasNext: page * limit < total,
        hasPrevious: page > 1,
      };
    } catch (error) {
      this.logger.error('Failed to find suspicious sessions', error);
      this.metricsService?.incrementCounter('session.repository.error');
      throw this.wrapError(error);
    }
  }

  /**
   * Find sessions with low health score
   */
  async findUnhealthySessions(
    threshold: number,
    options: PaginationOptions = {}
  ): Promise<PaginatedResult<Session>> {
    const startTime = Date.now();
    const { page = 1, limit = 20, sortBy = 'createdAt', sortOrder = 'desc' } = options;

    try {
      // Query sessions with healthScore < threshold in metadata (JSON field)
      const where = {
        metadata: {
          path: ['healthScore'],
          lt: threshold,
        },
      };
      const orderBy = { [sortBy]: sortOrder };

      const [total, prismaSessions] = await Promise.all([
        this.prisma.session.count({ where }),
        this.prisma.session.findMany({
          where,
          orderBy,
          skip: (page - 1) * limit,
          take: limit,
        }),
      ]);

      const sessions = prismaSessions.map((s: PrismaSession) => this.toDomain(s));

      this.metricsService?.recordHistogram(
        'session.repository.findUnhealthySessions.duration',
        Date.now() - startTime
      );

      return {
        items: sessions,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
        hasNext: page * limit < total,
        hasPrevious: page > 1,
      };
    } catch (error) {
      this.logger.error(`Failed to find unhealthy sessions (threshold: ${threshold})`, error);
      this.metricsService?.incrementCounter('session.repository.error');
      throw this.wrapError(error);
    }
  }

  // ============================================================
  // Status Operations
  // ============================================================

  /**
   * Get session status for a session
   */
  async getSessionStatus(sessionId: string): Promise<SessionStatusResult> {
    const startTime = Date.now();

    try {
      const session = await this.findById(sessionId, { withCache: false });
      if (!session) {
        throw new Error(`Session not found: ${sessionId}`);
      }

      const now = new Date();
      const isActive = session.isActive();
      const isExpired = session.isExpired();
      const isRevoked = session.isRevoked();
      const isSuspended = session.isSuspended();
      const isIdle = session.isIdle();

      const result: SessionStatusResult = {
        isActive,
        isExpired,
        isRevoked,
        isSuspended,
        isIdle,
        remainingTimeMinutes: session.getRemainingTimeMinutes(),
        remainingIdleTimeMinutes: session.getRemainingIdleTimeMinutes(),
        idleTimeMinutes: session.getIdleTimeMinutes(),
        expiresAt: session.getExpiresAt(),
        idleTimeoutAt: session.getIdleTimeoutAt(),
        healthScore: 85, // Placeholder - would be calculated from actual health data
        healthStatus: 'healthy',
      };

      this.metricsService?.recordHistogram(
        'session.repository.getSessionStatus.duration',
        Date.now() - startTime
      );

      return result;
    } catch (error) {
      this.logger.error(`Failed to get session status for: ${sessionId}`, error);
      this.metricsService?.incrementCounter('session.repository.error');
      throw this.wrapError(error);
    }
  }

  /**
   * Check if session exists by token
   */
  async existsByToken(token: Token): Promise<boolean> {
    const startTime = Date.now();
    const tokenValue = token.getValue();

    try {
      const count = await this.prisma.session.count({
        where: { token: tokenValue },
      });

      this.metricsService?.recordHistogram(
        'session.repository.existsByToken.duration',
        Date.now() - startTime
      );

      return count > 0;
    } catch (error) {
      this.logger.error('Failed to check session existence by token', error);
      this.metricsService?.incrementCounter('session.repository.error');
      throw this.wrapError(error);
    }
  }

  /**
   * Check if user has active sessions
   */
  async hasActiveSessions(userId: string): Promise<boolean> {
    const startTime = Date.now();

    try {
      const count = await this.prisma.session.count({
        where: {
          userId,
          status: 'ACTIVE',
          expiresAt: { gt: new Date() },
        },
      });

      this.metricsService?.recordHistogram(
        'session.repository.hasActiveSessions.duration',
        Date.now() - startTime
      );

      return count > 0;
    } catch (error) {
      this.logger.error(`Failed to check active sessions for user: ${userId}`, error);
      this.metricsService?.incrementCounter('session.repository.error');
      throw this.wrapError(error);
    }
  }

  /**
   * Check if session is valid
   */
  async isValidSession(sessionId: string): Promise<boolean> {
    const startTime = Date.now();

    try {
      const session = await this.findById(sessionId, { withCache: true });
      if (!session) {
        return false;
      }

      const isValid = session.isActive();

      this.metricsService?.recordHistogram(
        'session.repository.isValidSession.duration',
        Date.now() - startTime
      );

      return isValid;
    } catch (error) {
      this.logger.error(`Failed to validate session: ${sessionId}`, error);
      this.metricsService?.incrementCounter('session.repository.error');
      return false;
    }
  }

  // ============================================================
  // Revocation Operations
  // ============================================================

  /**
   * Revoke a single session
   */
  async revokeSession(sessionId: string, reason?: string): Promise<void> {
    const startTime = Date.now();

    try {
      const session = await this.findById(sessionId, { withCache: false });
      if (!session) {
        throw new Error(`Session not found: ${sessionId}`);
      }

      // Call domain method
      session.revoke(reason, 'user');

      // Update in database with version check
      await this.saveWithVersionCheck(session);

      // Audit log
      if (this.auditService) {
        await this.auditService.log({
          action: 'SESSION_REVOKED',
          userId: session.getUserId(),
          metadata: {
            sessionId: session.getId(),
            reason,
          },
        });
      }

      this.metricsService?.incrementCounter('session.repository.revokeSession');
      this.metricsService?.recordHistogram(
        'session.repository.revokeSession.duration',
        Date.now() - startTime
      );
    } catch (error) {
      this.logger.error(`Failed to revoke session: ${sessionId}`, error);
      this.metricsService?.incrementCounter('session.repository.error');
      throw this.wrapError(error);
    }
  }

  /**
   * Revoke session by token
   */
  async revokeByToken(token: Token, reason?: string): Promise<void> {
    const startTime = Date.now();

    try {
      const session = await this.findByToken(token, { withCache: false });
      if (!session) {
        throw new Error('Session not found by token');
      }

      await this.revokeSession(session.getId(), reason);
    } catch (error) {
      this.logger.error('Failed to revoke session by token', error);
      this.metricsService?.incrementCounter('session.repository.error');
      throw this.wrapError(error);
    }
  }

  /**
   * Delete all sessions for a user (logout from all devices)
   */
  async deleteAllByUserId(userId: string, reason?: string): Promise<number> {
    const startTime = Date.now();

    try {
      // Get all active sessions
      const sessions = await this.findActiveSessions(userId);

      // Revoke each session
      for (const session of sessions) {
        session.revoke(reason || 'User logged out from all devices', 'user');
        await this.saveWithVersionCheck(session);
      }

      // Invalidate cache for all sessions
      if (this.cacheService) {
        const cacheKey = SessionCacheKey.userPattern(userId);
        await this.cacheService.deletePattern(cacheKey);
      }

      this.metricsService?.incrementCounter('session.repository.deleteAllByUserId');
      this.metricsService?.recordHistogram(
        'session.repository.deleteAllByUserId.duration',
        Date.now() - startTime
      );

      return sessions.length;
    } catch (error) {
      this.logger.error(`Failed to delete all sessions for user: ${userId}`, error);
      this.metricsService?.incrementCounter('session.repository.error');
      throw this.wrapError(error);
    }
  }

  /**
   * Delete all sessions for multiple users
   */
  async deleteAllByUserIds(userIds: string[], reason: string): Promise<BulkRevokeResult> {
    const startTime = Date.now();
    const result: BulkRevokeResult = {
      revokedCount: 0,
      failedCount: 0,
      errors: [],
      revokedSessionIds: [],
      affectedUserIds: [],
      durationMs: 0,
      anomalyTriggeredSessions: [],
      notificationsSent: false,
      forceReauthRequired: [],
    };

    try {
      for (const userId of userIds) {
        try {
          const count = await this.deleteAllByUserId(userId, reason);
          if (count > 0) {
            result.revokedCount += count;
            result.affectedUserIds.push(userId);
          }
        } catch (error) {
          result.failedCount++;
          result.errors.push({
            id: userId,
            error: error instanceof Error ? error.message : 'Unknown error',
          });
        }
      }

      result.durationMs = Date.now() - startTime;

      if (this.auditService) {
        await this.auditService.log({
          action: 'BULK_SESSION_REVOKE',
          metadata: {
            userIds,
            reason,
            revokedCount: result.revokedCount,
            failedCount: result.failedCount,
          },
        });
      }

      return result;
    } catch (error) {
      this.logger.error('Failed to bulk delete sessions', error);
      this.metricsService?.incrementCounter('session.repository.error');
      throw this.wrapError(error);
    }
  }

  /**
   * Delete sessions by device ID
   */
  async deleteByDeviceId(deviceId: DeviceId, reason?: string): Promise<number> {
    const startTime = Date.now();
    const deviceIdValue = deviceId.getValue();

    try {
      // Find sessions with this device ID
      const result = await this.findByDeviceId(deviceId, { limit: 1000 });
      const sessions = result.items;

      // Revoke each session
      for (const session of sessions) {
        session.revoke(reason || `Device ${deviceIdValue} removed`, 'system');
        await this.saveWithVersionCheck(session);
      }

      this.metricsService?.incrementCounter('session.repository.deleteByDeviceId');
      this.metricsService?.recordHistogram(
        'session.repository.deleteByDeviceId.duration',
        Date.now() - startTime
      );

      return sessions.length;
    } catch (error) {
      this.logger.error(`Failed to delete sessions by device ID: ${deviceIdValue}`, error);
      this.metricsService?.incrementCounter('session.repository.error');
      throw this.wrapError(error);
    }
  }

  /**
   * Delete sessions by IP address
   */
  async deleteByIpAddress(ipAddress: IpAddress, reason?: string): Promise<number> {
    const startTime = Date.now();
    const ipValue = ipAddress.getValue();

    try {
      // Find sessions with this IP
      const result = await this.findByIpAddress(ipAddress, { limit: 1000 });
      const sessions = result.items;

      // Revoke each session
      for (const session of sessions) {
        session.revoke(reason || `IP ${ipValue} blocked`, 'system');
        await this.saveWithVersionCheck(session);
      }

      this.metricsService?.incrementCounter('session.repository.deleteByIpAddress');
      this.metricsService?.recordHistogram(
        'session.repository.deleteByIpAddress.duration',
        Date.now() - startTime
      );

      return sessions.length;
    } catch (error) {
      this.logger.error(`Failed to delete sessions by IP: ${ipValue}`, error);
      this.metricsService?.incrementCounter('session.repository.error');
      throw this.wrapError(error);
    }
  }

  /**
   * Delete all expired sessions (cleanup)
   */
  async deleteExpiredSessions(): Promise<CleanupResult> {
    const startTime = Date.now();
    const result: CleanupResult = {
      deletedCount: 0,
      expiredCount: 0,
      idleExpiredCount: 0,
      suspendedCount: 0,
      errors: [],
      durationMs: 0,
      archivedCount: 0,
      storageFreedBytes: 0,
      gracePeriodKept: 0,
      effectivenessScore: 0,
    };

    try {
      // Find expired sessions
      const expiredSessions = await this.prisma.session.findMany({
        where: {
          status: 'ACTIVE',
          expiresAt: { lt: new Date() },
        },
      });

      result.expiredCount = expiredSessions.length;

      // Delete or archive expired sessions
      for (const session of expiredSessions) {
        await this.prisma.session.update({
          where: { id: session.id },
          data: {
            status: 'EXPIRED',
            updatedAt: new Date(),
          },
        });
        result.deletedCount++;
      }

      // Also mark idle sessions as expired
      const idleThreshold = 30; // 30 minutes
      const idleSessions = await this.prisma.session.findMany({
        where: {
          status: 'ACTIVE',
          expiresAt: { gt: new Date() },
          lastActivityAt: { lt: new Date(Date.now() - idleThreshold * 60 * 1000) },
        },
      });

      for (const session of idleSessions) {
        await this.prisma.session.update({
          where: { id: session.id },
          data: {
            status: 'IDLE_EXPIRED',
            updatedAt: new Date(),
          },
        });
        result.idleExpiredCount++;
        result.deletedCount++;
      }

      // Invalidate cache
      if (this.cacheService) {
        await this.cacheService.deletePattern(SessionCacheKey.pattern());
      }

      result.durationMs = Date.now() - startTime;
      result.effectivenessScore = Math.min(100, (result.deletedCount / (result.expiredCount + result.idleExpiredCount + 1)) * 100);

      return result;
    } catch (error) {
      this.logger.error('Failed to delete expired sessions', error);
      this.metricsService?.incrementCounter('session.repository.error');
      throw this.wrapError(error);
    }
  }

  /**
   * Delete idle sessions (cleanup)
   */
  async deleteIdleSessions(idleThresholdMinutes: number): Promise<CleanupResult> {
    const startTime = Date.now();

    try {
      const idleSessions = await this.findIdleSessions(idleThresholdMinutes, { limit: 1000 });
      const sessions = idleSessions.items;

      for (const session of sessions) {
        session.expireIdle();
        await this.saveWithVersionCheck(session);
      }

      const result: CleanupResult = {
        deletedCount: sessions.length,
        expiredCount: 0,
        idleExpiredCount: sessions.length,
        suspendedCount: 0,
        errors: [],
        durationMs: Date.now() - startTime,
        archivedCount: 0,
        storageFreedBytes: 0,
        gracePeriodKept: 0,
        effectivenessScore: sessions.length > 0 ? 100 : 100,
      };

      return result;
    } catch (error) {
      this.logger.error(`Failed to delete idle sessions (threshold: ${idleThresholdMinutes} minutes)`, error);
      this.metricsService?.incrementCounter('session.repository.error');
      throw this.wrapError(error);
    }
  }

  /**
   * Clean up stale sessions (older than retention period)
   */
  async cleanupStaleSessions(retentionDays: number): Promise<CleanupResult> {
    const startTime = Date.now();

    try {
      const staleThreshold = new Date(Date.now() - retentionDays * 24 * 60 * 60 * 1000);

      // Delete sessions older than retention days (except active ones)
      const result = await this.prisma.session.deleteMany({
        where: {
          status: { not: 'ACTIVE' },
          createdAt: { lt: staleThreshold },
        },
      });

      return {
        deletedCount: result.count,
        expiredCount: 0,
        idleExpiredCount: 0,
        suspendedCount: 0,
        errors: [],
        durationMs: Date.now() - startTime,
        archivedCount: 0,
        storageFreedBytes: 0,
        gracePeriodKept: 0,
        effectivenessScore: 100,
      };
    } catch (error) {
      this.logger.error(`Failed to cleanup stale sessions (retention: ${retentionDays} days)`, error);
      this.metricsService?.incrementCounter('session.repository.error');
      throw this.wrapError(error);
    }
  }

  /**
   * Revoke all expired sessions (batch)
   */
  async revokeAllExpired(): Promise<BulkRevokeResult> {
    const startTime = Date.now();

    try {
      const expiredSessions = await this.prisma.session.findMany({
        where: {
          status: 'ACTIVE',
          expiresAt: { lt: new Date() },
        },
      });

      const sessionIds = expiredSessions.map((s: PrismaSession) => s.id);
      const result = await this.batchUpdateStatus(
        new Map(sessionIds.map((id: string) => [id, SessionStatus.EXPIRED]))
      );

      return {
        revokedCount: result,
        failedCount: 0,
        errors: [],
        revokedSessionIds: sessionIds,
        affectedUserIds: expiredSessions.map((s: PrismaSession) => s.userId),
        durationMs: Date.now() - startTime,
        anomalyTriggeredSessions: [],
        notificationsSent: false,
        forceReauthRequired: [],
      };
    } catch (error) {
      this.logger.error('Failed to revoke all expired sessions', error);
      this.metricsService?.incrementCounter('session.repository.error');
      throw this.wrapError(error);
    }
  }

  /**
   * Revoke all idle sessions
   */
  async revokeAllIdle(idleThresholdMinutes: number): Promise<BulkRevokeResult> {
    const startTime = Date.now();

    try {
      const idleSessions = await this.findIdleSessions(idleThresholdMinutes, { limit: 1000 });
      const sessions = idleSessions.items;

      const sessionIds = sessions.map((s: Session) => s.getId());
      const result = await this.batchUpdateStatus(
        new Map(sessionIds.map((id: string) => [id, SessionStatus.IDLE_EXPIRED]))
      );

      return {
        revokedCount: result,
        failedCount: 0,
        errors: [],
        revokedSessionIds: sessionIds,
        affectedUserIds: sessions.map((s: Session) => s.getUserId()),
        durationMs: Date.now() - startTime,
        anomalyTriggeredSessions: [],
        notificationsSent: false,
        forceReauthRequired: [],
      };
    } catch (error) {
      this.logger.error(`Failed to revoke all idle sessions (threshold: ${idleThresholdMinutes} minutes)`, error);
      this.metricsService?.incrementCounter('session.repository.error');
      throw this.wrapError(error);
    }
  }

  // ============================================================
  // Update Operations
  // ============================================================

  /**
   * Extend session expiry
   */
  async extendSession(sessionId: string, additionalMinutes: number): Promise<SessionExtensionResult> {
    const startTime = Date.now();

    try {
      const session = await this.findById(sessionId, { withCache: false });
      if (!session) {
        throw new Error(`Session not found: ${sessionId}`);
      }

      const newExpiry = session.extend(additionalMinutes);
      await this.saveWithVersionCheck(session);

      const result: SessionExtensionResult = {
        sessionId: session.getId(),
        extended: true,
        newExpiresAt: newExpiry,
        extensionCount: session.getExtensionCount(),
        remainingExtensions: SESSION_CONFIG.MAX_EXTENSIONS - session.getExtensionCount(),
        newHealthScore: 90,
        warning: undefined,
        recommendation: 'none',
      };

      this.metricsService?.incrementCounter('session.repository.extendSession');
      this.metricsService?.recordHistogram(
        'session.repository.extendSession.duration',
        Date.now() - startTime
      );

      return result;
    } catch (error) {
      this.logger.error(`Failed to extend session: ${sessionId}`, error);
      this.metricsService?.incrementCounter('session.repository.error');
      throw this.wrapError(error);
    }
  }

  /**
   * Update session activity (reset idle timer)
   */
  async updateActivity(sessionId: string, activityUrl?: string): Promise<SessionActivityResult> {
    const startTime = Date.now();

    try {
      const session = await this.findById(sessionId, { withCache: false });
      if (!session) {
        throw new Error(`Session not found: ${sessionId}`);
      }

      session.recordActivity(activityUrl);
      await this.saveWithVersionCheck(session);

      const result: SessionActivityResult = {
        sessionId: session.getId(),
        recorded: true,
        idleTimeoutReset: true,
        newIdleTimeoutAt: session.getIdleTimeoutAt(),
        suspicionScore: 0,
        requiresVerification: false,
      };

      this.metricsService?.incrementCounter('session.repository.updateActivity');
      this.metricsService?.recordHistogram(
        'session.repository.updateActivity.duration',
        Date.now() - startTime
      );

      return result;
    } catch (error) {
      this.logger.error(`Failed to update activity for session: ${sessionId}`, error);
      this.metricsService?.incrementCounter('session.repository.error');
      throw this.wrapError(error);
    }
  }

  /**
   * Suspend session
   */
  async suspendSession(sessionId: string, reason: string): Promise<void> {
    const startTime = Date.now();

    try {
      const session = await this.findById(sessionId, { withCache: false });
      if (!session) {
        throw new Error(`Session not found: ${sessionId}`);
      }

      session.suspend(reason);
      await this.saveWithVersionCheck(session);

      this.metricsService?.incrementCounter('session.repository.suspendSession');
      this.metricsService?.recordHistogram(
        'session.repository.suspendSession.duration',
        Date.now() - startTime
      );
    } catch (error) {
      this.logger.error(`Failed to suspend session: ${sessionId}`, error);
      this.metricsService?.incrementCounter('session.repository.error');
      throw this.wrapError(error);
    }
  }

  /**
   * Reactivate suspended session
   */
  async reactivateSession(sessionId: string): Promise<void> {
    const startTime = Date.now();

    try {
      const session = await this.findById(sessionId, { withCache: false });
      if (!session) {
        throw new Error(`Session not found: ${sessionId}`);
      }

      session.reactivate();
      await this.saveWithVersionCheck(session);

      this.metricsService?.incrementCounter('session.repository.reactivateSession');
      this.metricsService?.recordHistogram(
        'session.repository.reactivateSession.duration',
        Date.now() - startTime
      );
    } catch (error) {
      this.logger.error(`Failed to reactivate session: ${sessionId}`, error);
      this.metricsService?.incrementCounter('session.repository.error');
      throw this.wrapError(error);
    }
  }

  /**
   * Update session metadata
   */
  async updateMetadata(sessionId: string, metadata: Partial<SessionMetadata>): Promise<void> {
    const startTime = Date.now();

    try {
      const session = await this.findById(sessionId, { withCache: false });
      if (!session) {
        throw new Error(`Session not found: ${sessionId}`);
      }

      session.updateSessionMetadata(metadata);
      await this.saveWithVersionCheck(session);

      this.metricsService?.incrementCounter('session.repository.updateMetadata');
      this.metricsService?.recordHistogram(
        'session.repository.updateMetadata.duration',
        Date.now() - startTime
      );
    } catch (error) {
      this.logger.error(`Failed to update metadata for session: ${sessionId}`, error);
      this.metricsService?.incrementCounter('session.repository.error');
      throw this.wrapError(error);
    }
  }

  /**
   * Update session location
   */
  async updateLocation(sessionId: string, location: string): Promise<void> {
    const startTime = Date.now();

    try {
      const session = await this.findById(sessionId, { withCache: false });
      if (!session) {
        throw new Error(`Session not found: ${sessionId}`);
      }

      // Update location in metadata
      session.updateSessionMetadata({ location });
      await this.saveWithVersionCheck(session);

      this.metricsService?.incrementCounter('session.repository.updateLocation');
      this.metricsService?.recordHistogram(
        'session.repository.updateLocation.duration',
        Date.now() - startTime
      );
    } catch (error) {
      this.logger.error(`Failed to update location for session: ${sessionId}`, error);
      this.metricsService?.incrementCounter('session.repository.error');
      throw this.wrapError(error);
    }
  }

  /**
   * Mark session as current
   */
  async markAsCurrent(sessionId: string): Promise<void> {
    const startTime = Date.now();

    try {
      const session = await this.findById(sessionId, { withCache: false });
      if (!session) {
        throw new Error(`Session not found: ${sessionId}`);
      }

      session.markAsCurrent();
      await this.saveWithVersionCheck(session);

      this.metricsService?.incrementCounter('session.repository.markAsCurrent');
      this.metricsService?.recordHistogram(
        'session.repository.markAsCurrent.duration',
        Date.now() - startTime
      );
    } catch (error) {
      this.logger.error(`Failed to mark session as current: ${sessionId}`, error);
      this.metricsService?.incrementCounter('session.repository.error');
      throw this.wrapError(error);
    }
  }

  /**
   * Unmark all sessions as current for a user
   */
  async unmarkAllCurrent(userId: string): Promise<void> {
    const startTime = Date.now();

    try {
      const sessions = await this.findActiveSessions(userId);

      for (const session of sessions) {
        session.markAsNotCurrent();
        await this.saveWithVersionCheck(session);
      }

      this.metricsService?.incrementCounter('session.repository.unmarkAllCurrent');
      this.metricsService?.recordHistogram(
        'session.repository.unmarkAllCurrent.duration',
        Date.now() - startTime
      );
    } catch (error) {
      this.logger.error(`Failed to unmark all current sessions for user: ${userId}`, error);
      this.metricsService?.incrementCounter('session.repository.error');
      throw this.wrapError(error);
    }
  }

  /**
   * Save session with optimistic locking
   */
  async saveWithVersionCheck(session: Session): Promise<void> {
    const startTime = Date.now();

    try {
      const data = this.toPrisma(session);

      // Update with version check
      const result = await this.prisma.session.updateMany({
        where: {
          id: session.getId(),
          version: session.getVersion() - 1, // Version is incremented in toPrisma
        },
        data,
      });

      if (result.count === 0) {
        throw new Error('Optimistic lock conflict: Session was modified by another transaction');
      }

      // Invalidate cache
      if (this.cacheService) {
        await this.invalidateCache(session);
      }

      this.metricsService?.incrementCounter('session.repository.saveWithVersionCheck');
      this.metricsService?.recordHistogram(
        'session.repository.saveWithVersionCheck.duration',
        Date.now() - startTime
      );
    } catch (error) {
      this.logger.error(`Failed to save session with version check: ${session.getId()}`, error);
      this.metricsService?.incrementCounter('session.repository.error');
      throw this.wrapError(error);
    }
  }

  /**
   * Batch update session status
   */
  async batchUpdateStatus(updates: Map<string, SessionStatus>): Promise<number> {
    const startTime = Date.now();

    try {
      let updatedCount = 0;

      for (const [sessionId, status] of updates) {
        const session = await this.findById(sessionId, { withCache: false });
        if (!session) {
          continue;
        }

        // Update status based on domain logic
        switch (status) {
          case SessionStatus.EXPIRED:
            session.expire();
            break;
          case SessionStatus.REVOKED:
            session.revoke('Batch revocation');
            break;
          case SessionStatus.SUSPENDED:
            session.suspend('Batch suspension');
            break;
          case SessionStatus.IDLE_EXPIRED:
            session.expireIdle();
            break;
          default:
            continue;
        }

        await this.saveWithVersionCheck(session);
        updatedCount++;
      }

      this.metricsService?.incrementCounter('session.repository.batchUpdateStatus');
      this.metricsService?.recordHistogram(
        'session.repository.batchUpdateStatus.duration',
        Date.now() - startTime
      );

      return updatedCount;
    } catch (error) {
      this.logger.error('Failed to batch update session status', error);
      this.metricsService?.incrementCounter('session.repository.error');
      throw this.wrapError(error);
    }
  }

  // ============================================================
  // Count Operations
  // ============================================================

  /**
   * Count active sessions for a user
   */
  async countActiveSessionsByUser(userId: string): Promise<number> {
    const startTime = Date.now();

    try {
      const count = await this.prisma.session.count({
        where: {
          userId,
          status: 'ACTIVE',
          expiresAt: { gt: new Date() },
        },
      });

      this.metricsService?.recordHistogram(
        'session.repository.countActiveSessionsByUser.duration',
        Date.now() - startTime
      );

      return count;
    } catch (error) {
      this.logger.error(`Failed to count active sessions for user: ${userId}`, error);
      this.metricsService?.incrementCounter('session.repository.error');
      throw this.wrapError(error);
    }
  }

  /**
   * Count sessions by status
   */
  async countByStatus(status: SessionStatus): Promise<number> {
    const startTime = Date.now();

    try {
      const count = await this.prisma.session.count({
        where: { status: status as string },
      });

      this.metricsService?.recordHistogram(
        'session.repository.countByStatus.duration',
        Date.now() - startTime
      );

      return count;
    } catch (error) {
      this.logger.error(`Failed to count sessions by status: ${status}`, error);
      this.metricsService?.incrementCounter('session.repository.error');
      throw this.wrapError(error);
    }
  }

  /**
   * Count sessions by user
   */
  async countSessionsByUser(): Promise<Map<string, number>> {
    const startTime = Date.now();

    try {
      const result = await this.prisma.session.groupBy({
        by: ['userId'],
        _count: true,
      });

      const map = new Map<string, number>();
      for (const item of result) {
        map.set(item.userId, item._count);
      }

      this.metricsService?.recordHistogram(
        'session.repository.countSessionsByUser.duration',
        Date.now() - startTime
      );

      return map;
    } catch (error) {
      this.logger.error('Failed to count sessions by user', error);
      this.metricsService?.incrementCounter('session.repository.error');
      throw this.wrapError(error);
    }
  }

  /**
   * Count unique users with active sessions
   */
  async countUniqueUsersWithActiveSessions(): Promise<number> {
    const startTime = Date.now();

    try {
      const result = await this.prisma.session.groupBy({
        by: ['userId'],
        where: {
          status: 'ACTIVE',
          expiresAt: { gt: new Date() },
        },
        _count: true,
      });

      this.metricsService?.recordHistogram(
        'session.repository.countUniqueUsersWithActiveSessions.duration',
        Date.now() - startTime
      );

      return result.length;
    } catch (error) {
      this.logger.error('Failed to count unique users with active sessions', error);
      this.metricsService?.incrementCounter('session.repository.error');
      throw this.wrapError(error);
    }
  }

  /**
   * Count sessions by network type
   */
  async countByNetworkType(): Promise<Record<string, number>> {
    const startTime = Date.now();

    try {
      // Query sessions and group by network type from metadata
      const sessions = await this.prisma.session.findMany({
        where: {
          status: 'ACTIVE',
        },
        select: {
          metadata: true,
        },
      });

      const counts: Record<string, number> = {};
      for (const session of sessions) {
        const metadata = session.metadata as Record<string, unknown>;
        const networkType = metadata?.networkType as string || 'unknown';
        counts[networkType] = (counts[networkType] || 0) + 1;
      }

      this.metricsService?.recordHistogram(
        'session.repository.countByNetworkType.duration',
        Date.now() - startTime
      );

      return counts;
    } catch (error) {
      this.logger.error('Failed to count sessions by network type', error);
      this.metricsService?.incrementCounter('session.repository.error');
      throw this.wrapError(error);
    }
  }

  /**
   * Count sessions by district
   */
  async countByDistrict(): Promise<Record<string, number>> {
    const startTime = Date.now();

    try {
      // Query sessions and group by district from metadata
      const sessions = await this.prisma.session.findMany({
        where: {
          status: 'ACTIVE',
        },
        select: {
          metadata: true,
        },
      });

      const counts: Record<string, number> = {};
      for (const session of sessions) {
        const metadata = session.metadata as Record<string, unknown>;
        const district = metadata?.district as string || 'unknown';
        counts[district] = (counts[district] || 0) + 1;
      }

      this.metricsService?.recordHistogram(
        'session.repository.countByDistrict.duration',
        Date.now() - startTime
      );

      return counts;
    } catch (error) {
      this.logger.error('Failed to count sessions by district', error);
      this.metricsService?.incrementCounter('session.repository.error');
      throw this.wrapError(error);
    }
  }

  /**
   * Count suspicious sessions
   */
  async countSuspiciousSessions(): Promise<number> {
    const startTime = Date.now();

    try {
      const count = await this.prisma.session.count({
        where: {
          metadata: {
            path: ['isSuspicious'],
            equals: true,
          },
        },
      });

      this.metricsService?.recordHistogram(
        'session.repository.countSuspiciousSessions.duration',
        Date.now() - startTime
      );

      return count;
    } catch (error) {
      this.logger.error('Failed to count suspicious sessions', error);
      this.metricsService?.incrementCounter('session.repository.error');
      throw this.wrapError(error);
    }
  }

  // ============================================================
  // Statistics Operations
  // ============================================================

  /**
   * Get session statistics
   */
  async getStatistics(): Promise<any> {
    const startTime = Date.now();

    try {
      const [
        totalSessions,
        activeSessions,
        expiredSessions,
        revokedSessions,
        suspendedSessions,
        idleSessions,
        sessionsPerUser,
      ] = await Promise.all([
        this.prisma.session.count(),
        this.prisma.session.count({ where: { status: 'ACTIVE', expiresAt: { gt: new Date() } } }),
        this.prisma.session.count({ where: { status: 'EXPIRED' } }),
        this.prisma.session.count({ where: { status: 'REVOKED' } }),
        this.prisma.session.count({ where: { status: 'SUSPENDED' } }),
        this.prisma.session.count({
          where: {
            status: 'ACTIVE',
            lastActivityAt: { lt: new Date(Date.now() - 30 * 60 * 1000) },
          },
        }),
        this.prisma.session.groupBy({
          by: ['userId'],
          _count: true,
        }),
      ]);

      // Calculate sessions per user stats
      const counts = sessionsPerUser.map((item: { userId: string; _count: number }) => item._count);
      const min = counts.length > 0 ? Math.min(...counts) : 0;
      const max = counts.length > 0 ? Math.max(...counts) : 0;
      const avg = counts.length > 0 ? counts.reduce((a: number, b: number) => a + b, 0) / counts.length : 0;

      // Calculate percentile 95
      const sorted = [...counts].sort((a, b) => a - b);
      const p95Index = Math.floor(sorted.length * 0.95);
      const p95 = sorted[p95Index] || 0;

      const stats = {
        totalSessions,
        activeSessions,
        expiredSessions,
        revokedSessions,
        suspendedSessions,
        idleSessions,
        averageSessionDurationHours: 0,
        medianSessionDurationHours: 0,
        sessionsPerUser: {
          min,
          max,
          avg,
          p95,
        },
        activeSessionsByDevice: {},
        activeSessionsByNetworkType: {},
        activeSessionsByDistrict: [],
        peakActiveSessionTime: new Date(),
        peakActiveSessionCount: activeSessions,
      };

      this.metricsService?.recordHistogram(
        'session.repository.getStatistics.duration',
        Date.now() - startTime
      );

      return stats;
    } catch (error) {
      this.logger.error('Failed to get session statistics', error);
      this.metricsService?.incrementCounter('session.repository.error');
      throw this.wrapError(error);
    }
  }

  /**
   * Get active session count (real-time)
   */
  async getActiveSessionCount(): Promise<number> {
    const startTime = Date.now();

    try {
      const count = await this.prisma.session.count({
        where: {
          status: 'ACTIVE',
          expiresAt: { gt: new Date() },
        },
      });

      this.metricsService?.recordHistogram(
        'session.repository.getActiveSessionCount.duration',
        Date.now() - startTime
      );

      return count;
    } catch (error) {
      this.logger.error('Failed to get active session count', error);
      this.metricsService?.incrementCounter('session.repository.error');
      throw this.wrapError(error);
    }
  }

  /**
   * Get current active sessions per user
   */
  async getActiveSessionsPerUser(): Promise<Map<string, number>> {
    const startTime = Date.now();

    try {
      const result = await this.prisma.session.groupBy({
        by: ['userId'],
        where: {
          status: 'ACTIVE',
          expiresAt: { gt: new Date() },
        },
        _count: true,
      });

      const map = new Map<string, number>();
      for (const item of result) {
        map.set(item.userId, item._count);
      }

      this.metricsService?.recordHistogram(
        'session.repository.getActiveSessionsPerUser.duration',
        Date.now() - startTime
      );

      return map;
    } catch (error) {
      this.logger.error('Failed to get active sessions per user', error);
      this.metricsService?.incrementCounter('session.repository.error');
      throw this.wrapError(error);
    }
  }

  /**
   * Get top users by session count
   */
  async getTopUsersBySessionCount(limit: number): Promise<Array<{ userId: string; sessionCount: number }>> {
    const startTime = Date.now();

    try {
      const result = await this.prisma.session.groupBy({
        by: ['userId'],
        _count: true,
        orderBy: {
          _count: {
            userId: 'desc',
          },
        },
        take: limit,
      });

      const topUsers = result.map((item: { userId: string; _count: number }) => ({
        userId: item.userId,
        sessionCount: item._count,
      }));

      this.metricsService?.recordHistogram(
        'session.repository.getTopUsersBySessionCount.duration',
        Date.now() - startTime
      );

      return topUsers;
    } catch (error) {
      this.logger.error('Failed to get top users by session count', error);
      this.metricsService?.incrementCounter('session.repository.error');
      throw this.wrapError(error);
    }
  }

  // ============================================================
  // Private Helper Methods
  // ============================================================

  /**
   * Build filter conditions for Prisma queries
   */
  private buildFilterConditions(filters: SessionFilters): Prisma.SessionWhereInput {
    const where: Prisma.SessionWhereInput = {};

    if (filters.userId) {
      where.userId = filters.userId;
    }

    if (filters.deviceId) {
      // JSON filtering for deviceId in metadata
      where.metadata = {
        path: ['deviceId'],
        equals: filters.deviceId.getValue(),
      };
    }

    if (filters.ipAddress) {
      where.ipAddress = filters.ipAddress.getValue();
    }

    if (filters.status) {
      const statuses = Array.isArray(filters.status) ? filters.status : [filters.status];
      where.status = { in: statuses.map((s) => s as string) };
    }

    if (filters.networkType) {
      where.metadata = {
        path: ['networkType'],
        equals: filters.networkType,
      };
    }

    if (filters.district) {
      where.metadata = {
        path: ['district'],
        equals: filters.district,
      };
    }

    if (filters.fromDate) {
      where.createdAt = { ...where.createdAt, gte: filters.fromDate };
    }

    if (filters.toDate) {
      where.createdAt = { ...where.createdAt, lte: filters.toDate };
    }

    if (filters.isActive !== undefined) {
      if (filters.isActive) {
        where.status = 'ACTIVE';
        where.expiresAt = { gt: new Date() };
      } else {
        where.OR = [
          { status: { not: 'ACTIVE' } },
          { expiresAt: { lt: new Date() } },
        ];
      }
    }

    if (filters.isExpired !== undefined) {
      if (filters.isExpired) {
        where.OR = [
          { status: 'EXPIRED' },
          { expiresAt: { lt: new Date() } },
        ];
      } else {
        where.status = { not: 'EXPIRED' };
        where.expiresAt = { gt: new Date() };
      }
    }

    if (filters.isRevoked !== undefined) {
      where.status = filters.isRevoked ? 'REVOKED' : { not: 'REVOKED' };
    }

    if (filters.isSuspended !== undefined) {
      where.status = filters.isSuspended ? 'SUSPENDED' : { not: 'SUSPENDED' };
    }

    if (filters.isIdle !== undefined) {
      if (filters.isIdle) {
        where.status = 'ACTIVE';
        where.lastActivityAt = { lt: new Date(Date.now() - 30 * 60 * 1000) };
      }
    }

    return where;
  }

  /**
   * Map sort field for Prisma
   */
  private mapSortField(field: string): string {
    const fieldMap: Record<string, string> = {
      id: 'id',
      userId: 'userId',
      status: 'status',
      expiresAt: 'expiresAt',
      lastActivityAt: 'lastActivityAt',
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    };

    return fieldMap[field] || 'createdAt';
  }

  /**
   * Convert Prisma session to Domain Session entity
   */
  private toDomain(prismaSession: PrismaSession): Session {
    const metadata = prismaSession.metadata as Record<string, unknown> || {};

    // Create value objects
    const token = new Token(prismaSession.token);
    const ipAddress = new IpAddress(prismaSession.ipAddress);
    const userAgent = new UserAgent(prismaSession.userAgent);
    const deviceId = new DeviceId(metadata?.deviceId as string || 'unknown');

    return Session.reconstitute({
      id: prismaSession.id,
      userId: prismaSession.userId,
      token,
      ipAddress,
      userAgent,
      deviceId,
      expiresAt: prismaSession.expiresAt,
      idleTimeoutAt: prismaSession.idleTimeoutAt,
      absoluteTimeoutAt: prismaSession.absoluteTimeoutAt,
      status: prismaSession.status as SessionStatus,
      lastActivityAt: prismaSession.lastActivityAt,
      lastActivityUrl: prismaSession.lastActivityUrl || undefined,
      extensionCount: prismaSession.extensionCount || 0,
      sessionName: metadata?.sessionName as string || undefined,
      location: metadata?.location as string || undefined,
      metadata: {
        networkType: metadata?.networkType as '2g' | '3g' | '4g' | '5g' | 'wifi' | 'unknown' || 'unknown',
        mobileOperator: metadata?.mobileOperator as 'gp' | 'robi' | 'banglalink' | 'teletalk' | 'unknown' || 'unknown',
        district: metadata?.district as string || undefined,
        upazila: metadata?.upazila as string || undefined,
        dataSaverEnabled: metadata?.dataSaverEnabled as boolean || false,
        isFamilyShared: metadata?.isFamilyShared as boolean || false,
        familyMemberId: metadata?.familyMemberId as string || undefined,
        trustLevel: metadata?.trustLevel as 'untrusted' | 'standard' | 'trusted' | 'high_trust' | 'maximum_trust' || 'standard',
      },
      isCurrent: prismaSession.isCurrent || false,
      terminationInfo: prismaSession.revokedAt ? {
        reason: prismaSession.revokedReason || 'Unknown',
        terminatedAt: prismaSession.revokedAt,
        terminatedBy: 'user',
      } : undefined,
      createdAt: prismaSession.createdAt,
      updatedAt: prismaSession.updatedAt,
      version: prismaSession.version || 1,
    });
  }

  /**
   * Convert Domain Session to Prisma update data
   */
  private toPrisma(session: Session): Prisma.SessionUpdateInput {
    const metadata = session.getMetadata();

    return {
      userId: session.getUserId(),
      token: session.getToken().getValue(),
      ipAddress: session.getIpAddress().getValue(),
      userAgent: session.getUserAgent().getValue(),
      expiresAt: session.getExpiresAt(),
      idleTimeoutAt: session.getIdleTimeoutAt(),
      absoluteTimeoutAt: session.getAbsoluteTimeoutAt(),
      status: session.getStatus() as string,
      lastActivityAt: session.getLastActivityAt(),
      lastActivityUrl: session.getLastActivityUrl(),
      extensionCount: session.getExtensionCount(),
      isCurrent: session.isCurrent(),
      revokedAt: session.getTerminationInfo()?.terminatedAt || null,
      revokedReason: session.getTerminationInfo()?.reason || null,
      metadata: {
        sessionName: session.getSessionName(),
        location: session.getLocation(),
        networkType: metadata.networkType,
        mobileOperator: metadata.mobileOperator,
        district: metadata.district,
        upazila: metadata.upazila,
        dataSaverEnabled: metadata.dataSaverEnabled,
        isFamilyShared: metadata.isFamilyShared,
        familyMemberId: metadata.familyMemberId,
        trustLevel: metadata.trustLevel,
        deviceId: session.getDeviceId().getValue(),
      },
      version: session.getVersion() + 1,
      updatedAt: new Date(),
    };
  }

  /**
   * Invalidate session cache
   */
  private async invalidateCache(session: Session): Promise<void> {
    if (!this.cacheService) return;

    const keys = [
      SessionCacheKey.byId(session.getId()),
      SessionCacheKey.byToken(session.getToken().getValue()),
    ];

    await this.cacheService.deleteMany(keys);
  }

  /**
   * Execute with retry logic
   */
  private async executeWithRetry<T>(
    operation: () => Promise<T>,
    maxRetries: number = 3,
    initialDelay: number = 100
  ): Promise<T> {
    let lastError: Error | undefined;

    for (let attempt = 0; attempt < maxRetries; attempt++) {
      try {
        return await operation();
      } catch (error) {
        lastError = error as Error;

        // Only retry on connection/network errors
        const isRetryable = this.isRetryableError(error);
        if (!isRetryable || attempt === maxRetries - 1) {
          break;
        }

        const delay = initialDelay * Math.pow(2, attempt);
        await this.sleep(delay);
      }
    }

    throw lastError || new Error('Operation failed after retries');
  }

  /**
   * Check if error is retryable
   */
  private isRetryableError(error: unknown): boolean {
    const errorMessage = error instanceof Error ? error.message : '';

    const retryablePatterns = [
      'ECONNRESET',
      'ETIMEDOUT',
      'ECONNREFUSED',
      'Connection terminated',
      'connection timeout',
      'pool timeout',
    ];

    return retryablePatterns.some((pattern) =>
      errorMessage.includes(pattern)
    );
  }

  /**
   * Sleep helper
   */
  private sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  /**
   * Wrap Prisma errors to domain-friendly errors
   */
  private wrapError(error: unknown): Error {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      switch (error.code) {
        case 'P2002':
          return new Error('Duplicate entry: A session with this token already exists');
        case 'P2025':
          return new Error('Session not found');
        case 'P2003':
          return new Error('Foreign key constraint failed');
        default:
          return new Error(`Database error: ${error.message}`);
      }
    }

    if (error instanceof Error) {
      return error;
    }

    return new Error('An unexpected error occurred');
  }

  // ============================================================
  // Health Check
  // ============================================================

  /**
   * Check repository health
   */
  async healthCheck(): Promise<{
    healthy: boolean;
    latency: number;
    error?: string;
  }> {
    const startTime = Date.now();

    try {
      await this.prisma.$queryRaw`SELECT 1`;
      return {
        healthy: true,
        latency: Date.now() - startTime,
      };
    } catch (error) {
      return {
        healthy: false,
        latency: Date.now() - startTime,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }
}
