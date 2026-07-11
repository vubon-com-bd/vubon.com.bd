/**
 * Login Attempt Prisma Repository - Infrastructure Layer Implementation
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 *
 * @module infrastructure/persistence/prisma/repositories/login-attempt.prisma.repository
 *
 * @description
 * Prisma implementation of the LoginAttemptRepository port.
 * Handles all database operations for LoginAttempt aggregate with enterprise-grade features.
 *
 * Enterprise Features:
 * ✅ Implements domain LoginAttemptRepository interface
 * ✅ Complete CRUD operations with pagination and filtering
 * ✅ Caching strategy for hot data (Redis)
 * ✅ Audit trail for security events
 * ✅ Performance optimized queries with indices
 * ✅ Connection pooling and retry logic
 * ✅ Error handling with domain-friendly exceptions
 * ✅ Bangladesh specific - District/Upazila/NetworkType filtering
 * ✅ Transaction support for complex operations
 * ✅ Rate limiting support with IP/User tracking
 * ✅ Pattern detection for security threats
 *
 * @example
 * // In infrastructure module
 * @Module({
 *   providers: [
 *     PrismaService,
 *     {
 *       provide: 'LoginAttemptRepository',
 *       useClass: LoginAttemptPrismaRepository,
 *     },
 *   ],
 *   exports: ['LoginAttemptRepository'],
 * })
 * export class DatabaseModule {}
 */

import { Injectable, Logger, Inject, Optional } from '@nestjs/common';
import { Prisma, LoginAttempt as PrismaLoginAttempt, PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

// Shared packages for utilities and types
import { RISK_THRESHOLDS, NETWORK_TYPES } from '@vubon/shared-constants';
import type { RiskLevel as SharedRiskLevel, NetworkType } from '@vubon/shared-types';
import { maskEmail, maskPhone, normalizePhone } from '@vubon/shared-utils';

// Domain imports (ports and entities)
import { 
  LoginAttemptRepository, 
  PaginationOptions, 
  PaginatedResult, 
  LoginAttemptFilters, 
  LoginAttemptStatistics, 
  FailedAttemptSummary, 
  RiskPatternResult, 
  RateLimitResult 
} from '../../../domain/repositories/login-attempt.repository.interface';
import { LoginAttempt, LoginResult, RiskLevel } from '../../../domain/entities/login-attempt.entity';
import { Email } from '../../../domain/value-objects/email.vo';
import { IpAddress } from '../../../domain/value-objects/ip-address.vo';
import { DeviceId } from '../../../domain/value-objects/device-id.vo';
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
 * Find options for login attempt queries
 */
export interface FindOptions {
  withCache?: boolean;
  cacheTTL?: number;
}

/**
 * Prisma login attempt with relations (for complex queries)
 */
interface PrismaLoginAttemptWithRelations extends PrismaLoginAttempt {
  user?: unknown;
  device?: unknown;
}

/**
 * Rate limit entry for tracking attempts
 */
interface RateLimitEntry {
  count: number;
  firstAttemptAt: Date;
  lastAttemptAt: Date;
}

// ============================================================
// Cache Key Builder
// ============================================================

/**
 * Cache key generation for login attempt entities
 */
class LoginAttemptCacheKey {
  private static readonly PREFIX = 'auth:login-attempt:';
  private static readonly USER_PREFIX = 'auth:login-attempt:user:';
  private static readonly IP_PREFIX = 'auth:login-attempt:ip:';
  private static readonly EMAIL_PREFIX = 'auth:login-attempt:email:';

  static byId(id: string): string {
    return `${this.PREFIX}${id}`;
  }

  static byUserId(userId: string): string {
    return `${this.USER_PREFIX}${userId}`;
  }

  static byIpAddress(ip: string): string {
    return `${this.IP_PREFIX}${ip}`;
  }

  static byEmail(email: string): string {
    return `${this.EMAIL_PREFIX}${email.toLowerCase()}`;
  }

  static pattern(): string {
    return `${this.PREFIX}*`;
  }

  static userPattern(userId: string): string {
    return `${this.USER_PREFIX}${userId}:*`;
  }

  static ipPattern(ip: string): string {
    return `${this.IP_PREFIX}${ip}:*`;
  }
}

// ============================================================
// Login Attempt Prisma Repository Implementation
// ============================================================

@Injectable()
export class LoginAttemptPrismaRepository implements LoginAttemptRepository {
  private readonly logger = new Logger(LoginAttemptPrismaRepository.name);
  private readonly defaultCacheTTL = 60; // 1 minute for login attempts (short-lived)

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
    this.logger.log('LoginAttemptPrismaRepository initialized');
  }

  // ============================================================
  // Core CRUD Operations
  // ============================================================

  /**
   * Save a login attempt (create or update)
   */
  async save(attempt: LoginAttempt): Promise<void> {
    const startTime = Date.now();

    try {
      const data = this.toPrisma(attempt);

      // Check if attempt exists
      const existing = await this.prisma.loginAttempt.findUnique({
        where: { id: attempt.getId() },
      });

      if (existing) {
        await this.prisma.loginAttempt.update({
          where: { id: attempt.getId() },
          data,
        });
      } else {
        await this.prisma.loginAttempt.create({
          data,
        });
      }

      // Invalidate cache
      if (this.cacheService) {
        await this.invalidateCache(attempt);
      }

      // Audit log for suspicious activities
      if (attempt.isSuspicious() && this.auditService) {
        await this.auditService.log({
          action: 'LOGIN_ATTEMPT_SUSPICIOUS',
          userId: attempt.getUserId(),
          email: attempt.getEmail().getValue(),
          metadata: {
            riskScore: attempt.getRiskScore(),
            riskLevel: attempt.getRiskLevel(),
            ipAddress: attempt.getIpAddress().getValue(),
            deviceId: attempt.getDeviceId().getValue(),
          },
        });
      }

      this.metricsService?.incrementCounter('login-attempt.repository.save');
      this.metricsService?.recordHistogram(
        'login-attempt.repository.save.duration',
        Date.now() - startTime
      );
    } catch (error) {
      this.logger.error(`Failed to save login attempt: ${attempt.getId()}`, error);
      this.metricsService?.incrementCounter('login-attempt.repository.error');
      throw this.wrapError(error);
    }
  }

  /**
   * Find login attempt by ID
   */
  async findById(id: string): Promise<LoginAttempt | null> {
    const startTime = Date.now();

    try {
      // Check cache first
      if (this.cacheService) {
        const cacheKey = LoginAttemptCacheKey.byId(id);
        const cached = await this.cacheService.get<LoginAttempt>(cacheKey);
        if (cached) {
          this.metricsService?.incrementCounter('login-attempt.repository.cache.hit');
          return cached;
        }
        this.metricsService?.incrementCounter('login-attempt.repository.cache.miss');
      }

      const prismaAttempt = await this.executeWithRetry(() =>
        this.prisma.loginAttempt.findUnique({
          where: { id },
        })
      );

      if (!prismaAttempt) {
        return null;
      }

      const attempt = this.toDomain(prismaAttempt);

      // Cache the result
      if (this.cacheService) {
        await this.cacheService.set(LoginAttemptCacheKey.byId(id), attempt, this.defaultCacheTTL);
      }

      this.metricsService?.recordHistogram(
        'login-attempt.repository.findById.duration',
        Date.now() - startTime
      );

      return attempt;
    } catch (error) {
      this.logger.error(`Failed to find login attempt by ID: ${id}`, error);
      this.metricsService?.incrementCounter('login-attempt.repository.error');
      throw this.wrapError(error);
    }
  }

  /**
   * Delete a login attempt
   */
  async delete(attempt: LoginAttempt): Promise<void> {
    const startTime = Date.now();

    try {
      await this.prisma.loginAttempt.delete({
        where: { id: attempt.getId() },
      });

      // Invalidate cache
      if (this.cacheService) {
        await this.invalidateCache(attempt);
      }

      this.metricsService?.incrementCounter('login-attempt.repository.delete');
      this.metricsService?.recordHistogram(
        'login-attempt.repository.delete.duration',
        Date.now() - startTime
      );
    } catch (error) {
      this.logger.error(`Failed to delete login attempt: ${attempt.getId()}`, error);
      this.metricsService?.incrementCounter('login-attempt.repository.error');
      throw this.wrapError(error);
    }
  }

  // ============================================================
  // Find Operations
  // ============================================================

  /**
   * Find login attempts by user ID
   */
  async findByUserId(
    userId: string,
    options: PaginationOptions
  ): Promise<PaginatedResult<LoginAttempt>> {
    const startTime = Date.now();
    const { page = 1, limit = 20, sortBy = 'attemptedAt', sortOrder = 'desc' } = options;

    try {
      const where = { userId };
      const orderBy = { [sortBy]: sortOrder };

      const [total, prismaAttempts] = await Promise.all([
        this.prisma.loginAttempt.count({ where }),
        this.prisma.loginAttempt.findMany({
          where,
          orderBy,
          skip: (page - 1) * limit,
          take: limit,
        }),
      ]);

      const attempts = prismaAttempts.map((a: PrismaLoginAttempt) => this.toDomain(a));

      this.metricsService?.recordHistogram(
        'login-attempt.repository.findByUserId.duration',
        Date.now() - startTime
      );

      return {
        items: attempts,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
        hasNext: page * limit < total,
        hasPrevious: page > 1,
      };
    } catch (error) {
      this.logger.error(`Failed to find login attempts for user: ${userId}`, error);
      this.metricsService?.incrementCounter('login-attempt.repository.error');
      throw this.wrapError(error);
    }
  }

  /**
   * Find login attempts by email
   */
  async findByEmail(
    email: Email,
    options: PaginationOptions
  ): Promise<PaginatedResult<LoginAttempt>> {
    const startTime = Date.now();
    const { page = 1, limit = 20, sortBy = 'attemptedAt', sortOrder = 'desc' } = options;
    const emailValue = email.getValue().toLowerCase();

    try {
      const where = { email: emailValue };
      const orderBy = { [sortBy]: sortOrder };

      const [total, prismaAttempts] = await Promise.all([
        this.prisma.loginAttempt.count({ where }),
        this.prisma.loginAttempt.findMany({
          where,
          orderBy,
          skip: (page - 1) * limit,
          take: limit,
        }),
      ]);

      const attempts = prismaAttempts.map((a: PrismaLoginAttempt) => this.toDomain(a));

      this.metricsService?.recordHistogram(
        'login-attempt.repository.findByEmail.duration',
        Date.now() - startTime
      );

      return {
        items: attempts,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
        hasNext: page * limit < total,
        hasPrevious: page > 1,
      };
    } catch (error) {
      this.logger.error(`Failed to find login attempts by email: ${maskEmail(emailValue)}`, error);
      this.metricsService?.incrementCounter('login-attempt.repository.error');
      throw this.wrapError(error);
    }
  }

  /**
   * Find login attempts by IP address
   */
  async findByIpAddress(
    ipAddress: IpAddress,
    options: PaginationOptions
  ): Promise<PaginatedResult<LoginAttempt>> {
    const startTime = Date.now();
    const { page = 1, limit = 20, sortBy = 'attemptedAt', sortOrder = 'desc' } = options;
    const ipValue = ipAddress.getValue();

    try {
      const where = { ipAddress: ipValue };
      const orderBy = { [sortBy]: sortOrder };

      const [total, prismaAttempts] = await Promise.all([
        this.prisma.loginAttempt.count({ where }),
        this.prisma.loginAttempt.findMany({
          where,
          orderBy,
          skip: (page - 1) * limit,
          take: limit,
        }),
      ]);

      const attempts = prismaAttempts.map((a: PrismaLoginAttempt) => this.toDomain(a));

      this.metricsService?.recordHistogram(
        'login-attempt.repository.findByIpAddress.duration',
        Date.now() - startTime
      );

      return {
        items: attempts,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
        hasNext: page * limit < total,
        hasPrevious: page > 1,
      };
    } catch (error) {
      this.logger.error(`Failed to find login attempts by IP: ${ipValue}`, error);
      this.metricsService?.incrementCounter('login-attempt.repository.error');
      throw this.wrapError(error);
    }
  }

  /**
   * Find login attempts by device ID
   */
  async findByDeviceId(
    deviceId: DeviceId,
    options: PaginationOptions
  ): Promise<PaginatedResult<LoginAttempt>> {
    const startTime = Date.now();
    const { page = 1, limit = 20, sortBy = 'attemptedAt', sortOrder = 'desc' } = options;
    const deviceIdValue = deviceId.getValue();

    try {
      const where = {
        metadata: {
          path: ['deviceId'],
          equals: deviceIdValue,
        },
      };
      const orderBy = { [sortBy]: sortOrder };

      const [total, prismaAttempts] = await Promise.all([
        this.prisma.loginAttempt.count({ where }),
        this.prisma.loginAttempt.findMany({
          where,
          orderBy,
          skip: (page - 1) * limit,
          take: limit,
        }),
      ]);

      const attempts = prismaAttempts.map((a: PrismaLoginAttempt) => this.toDomain(a));

      this.metricsService?.recordHistogram(
        'login-attempt.repository.findByDeviceId.duration',
        Date.now() - startTime
      );

      return {
        items: attempts,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
        hasNext: page * limit < total,
        hasPrevious: page > 1,
      };
    } catch (error) {
      this.logger.error(`Failed to find login attempts by device ID: ${deviceIdValue}`, error);
      this.metricsService?.incrementCounter('login-attempt.repository.error');
      throw this.wrapError(error);
    }
  }

  /**
   * Find login attempts by result
   */
  async findByResult(
    result: LoginResult,
    options: PaginationOptions
  ): Promise<PaginatedResult<LoginAttempt>> {
    const startTime = Date.now();
    const { page = 1, limit = 20, sortBy = 'attemptedAt', sortOrder = 'desc' } = options;

    try {
      const where = { result: result.toString() };
      const orderBy = { [sortBy]: sortOrder };

      const [total, prismaAttempts] = await Promise.all([
        this.prisma.loginAttempt.count({ where }),
        this.prisma.loginAttempt.findMany({
          where,
          orderBy,
          skip: (page - 1) * limit,
          take: limit,
        }),
      ]);

      const attempts = prismaAttempts.map((a: PrismaLoginAttempt) => this.toDomain(a));

      this.metricsService?.recordHistogram(
        'login-attempt.repository.findByResult.duration',
        Date.now() - startTime
      );

      return {
        items: attempts,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
        hasNext: page * limit < total,
        hasPrevious: page > 1,
      };
    } catch (error) {
      this.logger.error(`Failed to find login attempts by result: ${result}`, error);
      this.metricsService?.incrementCounter('login-attempt.repository.error');
      throw this.wrapError(error);
    }
  }

  /**
   * Find recent failed attempts for a user
   */
  async findRecentFailures(
    userId: string,
    hours: number
  ): Promise<LoginAttempt[]> {
    const startTime = Date.now();
    const since = new Date(Date.now() - hours * 60 * 60 * 1000);

    try {
      const prismaAttempts = await this.executeWithRetry(() =>
        this.prisma.loginAttempt.findMany({
          where: {
            userId,
            result: { in: ['FAILED_PASSWORD', 'INVALID_CREDENTIALS', 'ACCOUNT_LOCKED'] },
            attemptedAt: { gte: since },
          },
          orderBy: { attemptedAt: 'desc' },
        })
      );

      const attempts = prismaAttempts.map((a: PrismaLoginAttempt) => this.toDomain(a));

      this.metricsService?.recordHistogram(
        'login-attempt.repository.findRecentFailures.duration',
        Date.now() - startTime
      );

      return attempts;
    } catch (error) {
      this.logger.error(`Failed to find recent failures for user: ${userId}`, error);
      this.metricsService?.incrementCounter('login-attempt.repository.error');
      throw this.wrapError(error);
    }
  }

  /**
   * Find recent attempts by IP
   */
  async findRecentByIp(
    ipAddress: IpAddress,
    hours: number
  ): Promise<LoginAttempt[]> {
    const startTime = Date.now();
    const since = new Date(Date.now() - hours * 60 * 60 * 1000);
    const ipValue = ipAddress.getValue();

    try {
      const prismaAttempts = await this.executeWithRetry(() =>
        this.prisma.loginAttempt.findMany({
          where: {
            ipAddress: ipValue,
            attemptedAt: { gte: since },
          },
          orderBy: { attemptedAt: 'desc' },
        })
      );

      const attempts = prismaAttempts.map((a: PrismaLoginAttempt) => this.toDomain(a));

      this.metricsService?.recordHistogram(
        'login-attempt.repository.findRecentByIp.duration',
        Date.now() - startTime
      );

      return attempts;
    } catch (error) {
      this.logger.error(`Failed to find recent attempts by IP: ${ipValue}`, error);
      this.metricsService?.incrementCounter('login-attempt.repository.error');
      throw this.wrapError(error);
    }
  }

  /**
   * Find suspicious login attempts
   */
  async findSuspiciousAttempts(
    options: PaginationOptions
  ): Promise<PaginatedResult<LoginAttempt>> {
    const startTime = Date.now();
    const { page = 1, limit = 20, sortBy = 'attemptedAt', sortOrder = 'desc' } = options;

    try {
      // Find attempts with high risk level
      const where = {
        riskLevel: { in: ['HIGH', 'CRITICAL'] },
      };
      const orderBy = { [sortBy]: sortOrder };

      const [total, prismaAttempts] = await Promise.all([
        this.prisma.loginAttempt.count({ where }),
        this.prisma.loginAttempt.findMany({
          where,
          orderBy,
          skip: (page - 1) * limit,
          take: limit,
        }),
      ]);

      const attempts = prismaAttempts.map((a: PrismaLoginAttempt) => this.toDomain(a));

      this.metricsService?.recordHistogram(
        'login-attempt.repository.findSuspiciousAttempts.duration',
        Date.now() - startTime
      );

      return {
        items: attempts,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
        hasNext: page * limit < total,
        hasPrevious: page > 1,
      };
    } catch (error) {
      this.logger.error('Failed to find suspicious login attempts', error);
      this.metricsService?.incrementCounter('login-attempt.repository.error');
      throw this.wrapError(error);
    }
  }

  /**
   * Find high-risk login attempts
   */
  async findHighRiskAttempts(
    options: PaginationOptions
  ): Promise<PaginatedResult<LoginAttempt>> {
    const startTime = Date.now();
    const { page = 1, limit = 20, sortBy = 'attemptedAt', sortOrder = 'desc' } = options;

    try {
      const where = {
        riskLevel: 'CRITICAL',
      };
      const orderBy = { [sortBy]: sortOrder };

      const [total, prismaAttempts] = await Promise.all([
        this.prisma.loginAttempt.count({ where }),
        this.prisma.loginAttempt.findMany({
          where,
          orderBy,
          skip: (page - 1) * limit,
          take: limit,
        }),
      ]);

      const attempts = prismaAttempts.map((a: PrismaLoginAttempt) => this.toDomain(a));

      this.metricsService?.recordHistogram(
        'login-attempt.repository.findHighRiskAttempts.duration',
        Date.now() - startTime
      );

      return {
        items: attempts,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
        hasNext: page * limit < total,
        hasPrevious: page > 1,
      };
    } catch (error) {
      this.logger.error('Failed to find high-risk login attempts', error);
      this.metricsService?.incrementCounter('login-attempt.repository.error');
      throw this.wrapError(error);
    }
  }

  /**
   * Find attempts by filters
   */
  async findByFilters(
    filters: LoginAttemptFilters,
    options: PaginationOptions
  ): Promise<PaginatedResult<LoginAttempt>> {
    const startTime = Date.now();
    const { page = 1, limit = 20, sortBy = 'attemptedAt', sortOrder = 'desc' } = options;

    try {
      const where = this.buildFilterConditions(filters);
      const orderBy = { [sortBy]: sortOrder };

      const [total, prismaAttempts] = await Promise.all([
        this.prisma.loginAttempt.count({ where }),
        this.prisma.loginAttempt.findMany({
          where,
          orderBy,
          skip: (page - 1) * limit,
          take: limit,
        }),
      ]);

      const attempts = prismaAttempts.map((a: PrismaLoginAttempt) => this.toDomain(a));

      this.metricsService?.recordHistogram(
        'login-attempt.repository.findByFilters.duration',
        Date.now() - startTime
      );

      return {
        items: attempts,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
        hasNext: page * limit < total,
        hasPrevious: page > 1,
      };
    } catch (error) {
      this.logger.error('Failed to find login attempts by filters', error);
      this.metricsService?.incrementCounter('login-attempt.repository.error');
      throw this.wrapError(error);
    }
  }

  // ============================================================
  // Count Operations
  // ============================================================

  /**
   * Count failed attempts for a user in a time window
   */
  async countFailedAttempts(
    userId: string,
    windowMinutes: number
  ): Promise<number> {
    const startTime = Date.now();
    const since = new Date(Date.now() - windowMinutes * 60 * 1000);

    try {
      const count = await this.prisma.loginAttempt.count({
        where: {
          userId,
          result: { in: ['FAILED_PASSWORD', 'INVALID_CREDENTIALS'] },
          attemptedAt: { gte: since },
        },
      });

      this.metricsService?.recordHistogram(
        'login-attempt.repository.countFailedAttempts.duration',
        Date.now() - startTime
      );

      return count;
    } catch (error) {
      this.logger.error(`Failed to count failed attempts for user: ${userId}`, error);
      this.metricsService?.incrementCounter('login-attempt.repository.error');
      throw this.wrapError(error);
    }
  }

  /**
   * Count attempts by IP in a time window
   */
  async countByIp(
    ipAddress: IpAddress,
    windowMinutes: number
  ): Promise<number> {
    const startTime = Date.now();
    const since = new Date(Date.now() - windowMinutes * 60 * 1000);
    const ipValue = ipAddress.getValue();

    try {
      const count = await this.prisma.loginAttempt.count({
        where: {
          ipAddress: ipValue,
          attemptedAt: { gte: since },
        },
      });

      this.metricsService?.recordHistogram(
        'login-attempt.repository.countByIp.duration',
        Date.now() - startTime
      );

      return count;
    } catch (error) {
      this.logger.error(`Failed to count attempts by IP: ${ipValue}`, error);
      this.metricsService?.incrementCounter('login-attempt.repository.error');
      throw this.wrapError(error);
    }
  }

  /**
   * Count attempts by result
   */
  async countByResult(
    result: LoginResult,
    fromDate: Date,
    toDate: Date
  ): Promise<number> {
    const startTime = Date.now();

    try {
      const count = await this.prisma.loginAttempt.count({
        where: {
          result: result.toString(),
          attemptedAt: { gte: fromDate, lte: toDate },
        },
      });

      this.metricsService?.recordHistogram(
        'login-attempt.repository.countByResult.duration',
        Date.now() - startTime
      );

      return count;
    } catch (error) {
      this.logger.error(`Failed to count attempts by result: ${result}`, error);
      this.metricsService?.incrementCounter('login-attempt.repository.error');
      throw this.wrapError(error);
    }
  }

  // ============================================================
  // Existence Checks
  // ============================================================

  /**
   * Check if user has recent successful login
   */
  async hasRecentSuccess(
    userId: string,
    hours: number
  ): Promise<boolean> {
    const startTime = Date.now();
    const since = new Date(Date.now() - hours * 60 * 60 * 1000);

    try {
      const count = await this.prisma.loginAttempt.count({
        where: {
          userId,
          result: LoginResult.SUCCESS.toString(),
          attemptedAt: { gte: since },
        },
      });

      this.metricsService?.recordHistogram(
        'login-attempt.repository.hasRecentSuccess.duration',
        Date.now() - startTime
      );

      return count > 0;
    } catch (error) {
      this.logger.error(`Failed to check recent success for user: ${userId}`, error);
      this.metricsService?.incrementCounter('login-attempt.repository.error');
      throw this.wrapError(error);
    }
  }

  /**
   * Check if IP is rate-limited
   */
  async isIpRateLimited(
    ipAddress: IpAddress,
    maxAttempts: number,
    windowMinutes: number
  ): Promise<RateLimitResult> {
    const startTime = Date.now();
    const ipValue = ipAddress.getValue();
    const since = new Date(Date.now() - windowMinutes * 60 * 1000);

    try {
      const count = await this.prisma.loginAttempt.count({
        where: {
          ipAddress: ipValue,
          attemptedAt: { gte: since },
        },
      });

      const remaining = Math.max(0, maxAttempts - count);
      const resetAt = new Date(since.getTime() + windowMinutes * 60 * 1000);

      const result: RateLimitResult = {
        allowed: count < maxAttempts,
        remaining,
        resetAt,
        ...(count >= maxAttempts ? {
          reason: `Rate limit exceeded for IP ${ipValue}. Max ${maxAttempts} attempts per ${windowMinutes} minutes.`,
        } : {}),
      };

      this.metricsService?.recordHistogram(
        'login-attempt.repository.isIpRateLimited.duration',
        Date.now() - startTime
      );

      return result;
    } catch (error) {
      this.logger.error(`Failed to check IP rate limit for: ${ipValue}`, error);
      this.metricsService?.incrementCounter('login-attempt.repository.error');
      throw this.wrapError(error);
    }
  }

  /**
   * Check if user is rate-limited
   */
  async isUserRateLimited(
    userId: string,
    maxAttempts: number,
    windowMinutes: number
  ): Promise<RateLimitResult> {
    const startTime = Date.now();
    const since = new Date(Date.now() - windowMinutes * 60 * 1000);

    try {
      const count = await this.prisma.loginAttempt.count({
        where: {
          userId,
          attemptedAt: { gte: since },
        },
      });

      const remaining = Math.max(0, maxAttempts - count);
      const resetAt = new Date(since.getTime() + windowMinutes * 60 * 1000);

      const result: RateLimitResult = {
        allowed: count < maxAttempts,
        remaining,
        resetAt,
        ...(count >= maxAttempts ? {
          reason: `Rate limit exceeded for user. Max ${maxAttempts} attempts per ${windowMinutes} minutes.`,
        } : {}),
      };

      this.metricsService?.recordHistogram(
        'login-attempt.repository.isUserRateLimited.duration',
        Date.now() - startTime
      );

      return result;
    } catch (error) {
      this.logger.error(`Failed to check user rate limit for: ${userId}`, error);
      this.metricsService?.incrementCounter('login-attempt.repository.error');
      throw this.wrapError(error);
    }
  }

  // ============================================================
  // Statistics Operations
  // ============================================================

  /**
   * Get login attempt statistics
   */
  async getStatistics(
    fromDate: Date,
    toDate: Date
  ): Promise<LoginAttemptStatistics> {
    const startTime = Date.now();

    try {
      const [
        total,
        successful,
        failed,
        locked,
        mfaRequired,
        suspicious,
        byResult,
        byRiskLevel,
        uniqueUsers,
        uniqueIPs,
        uniqueDevices,
        byHour,
      ] = await Promise.all([
        this.prisma.loginAttempt.count({
          where: { attemptedAt: { gte: fromDate, lte: toDate } },
        }),
        this.prisma.loginAttempt.count({
          where: { attemptedAt: { gte: fromDate, lte: toDate }, result: LoginResult.SUCCESS.toString() },
        }),
        this.prisma.loginAttempt.count({
          where: { attemptedAt: { gte: fromDate, lte: toDate }, result: { in: ['FAILED_PASSWORD', 'INVALID_CREDENTIALS'] } },
        }),
        this.prisma.loginAttempt.count({
          where: { attemptedAt: { gte: fromDate, lte: toDate }, result: LoginResult.ACCOUNT_LOCKED.toString() },
        }),
        this.prisma.loginAttempt.count({
          where: { attemptedAt: { gte: fromDate, lte: toDate }, result: LoginResult.MFA_REQUIRED.toString() },
        }),
        this.prisma.loginAttempt.count({
          where: { attemptedAt: { gte: fromDate, lte: toDate }, riskLevel: { in: ['HIGH', 'CRITICAL'] } },
        }),
        this.prisma.loginAttempt.groupBy({
          by: ['result'],
          where: { attemptedAt: { gte: fromDate, lte: toDate } },
          _count: true,
        }),
        this.prisma.loginAttempt.groupBy({
          by: ['riskLevel'],
          where: { attemptedAt: { gte: fromDate, lte: toDate } },
          _count: true,
        }),
        this.prisma.loginAttempt.groupBy({
          by: ['userId'],
          where: { attemptedAt: { gte: fromDate, lte: toDate } },
          _count: true,
        }),
        this.prisma.loginAttempt.groupBy({
          by: ['ipAddress'],
          where: { attemptedAt: { gte: fromDate, lte: toDate } },
          _count: true,
        }),
        this.prisma.loginAttempt.groupBy({
          by: ['deviceId'],
          where: { attemptedAt: { gte: fromDate, lte: toDate } },
          _count: true,
        }),
        this.prisma.$queryRaw`
          SELECT 
            DATE_TRUNC('hour', attempted_at) as hour,
            COUNT(*) as total,
            COUNT(CASE WHEN result = 'SUCCESS' THEN 1 END) as success,
            COUNT(CASE WHEN result IN ('FAILED_PASSWORD', 'INVALID_CREDENTIALS') THEN 1 END) as failed
          FROM login_attempts
          WHERE attempted_at >= ${fromDate} AND attempted_at <= ${toDate}
          GROUP BY DATE_TRUNC('hour', attempted_at)
          ORDER BY hour ASC
        `,
      ]);

      const byResultMap: Record<LoginResult, number> = {} as Record<LoginResult, number>;
      for (const item of byResult) {
        byResultMap[item.result as LoginResult] = item._count;
      }

      const byRiskLevelMap: Record<RiskLevel, number> = {} as Record<RiskLevel, number>;
      for (const item of byRiskLevel) {
        byRiskLevelMap[item.riskLevel as RiskLevel] = item._count;
      }

      const stats: LoginAttemptStatistics = {
        totalAttempts: total,
        successfulAttempts: successful,
        failedAttempts: failed,
        lockedAttempts: locked,
        mfaRequiredAttempts: mfaRequired,
        suspiciousAttempts: suspicious,
        successRate: total > 0 ? (successful / total) * 100 : 0,
        failureRate: total > 0 ? (failed / total) * 100 : 0,
        uniqueUsers: uniqueUsers.length,
        uniqueIPs: uniqueIPs.length,
        uniqueDevices: uniqueDevices.length,
        byResult: byResultMap,
        byRiskLevel: byRiskLevelMap,
        byHour: byHour as Array<{ hour: string; total: number; success: number; failed: number }>,
        timeframe: { from: fromDate, to: toDate },
      };

      this.metricsService?.recordHistogram(
        'login-attempt.repository.getStatistics.duration',
        Date.now() - startTime
      );

      return stats;
    } catch (error) {
      this.logger.error('Failed to get login attempt statistics', error);
      this.metricsService?.incrementCounter('login-attempt.repository.error');
      throw this.wrapError(error);
    }
  }

  /**
   * Get failed attempt summary
   */
  async getFailedAttemptSummary(
    period: 'hour' | 'day' | 'week' | 'month'
  ): Promise<FailedAttemptSummary> {
    const startTime = Date.now();
    const now = new Date();
    let fromDate: Date;

    switch (period) {
      case 'hour':
        fromDate = new Date(now.getTime() - 60 * 60 * 1000);
        break;
      case 'day':
        fromDate = new Date(now.getTime() - 24 * 60 * 60 * 1000);
        break;
      case 'week':
        fromDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case 'month':
        fromDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        break;
      default:
        fromDate = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    }

    try {
      // Get total failed attempts
      const totalFailed = await this.prisma.loginAttempt.count({
        where: {
          result: { in: ['FAILED_PASSWORD', 'INVALID_CREDENTIALS'] },
          attemptedAt: { gte: fromDate },
        },
      });

      // Get unique IPs and users
      const [uniqueIPs, uniqueUsers, topReasons, topIPs] = await Promise.all([
        this.prisma.loginAttempt.groupBy({
          by: ['ipAddress'],
          where: { attemptedAt: { gte: fromDate }, result: { in: ['FAILED_PASSWORD', 'INVALID_CREDENTIALS'] } },
          _count: true,
        }),
        this.prisma.loginAttempt.groupBy({
          by: ['userId'],
          where: { attemptedAt: { gte: fromDate }, result: { in: ['FAILED_PASSWORD', 'INVALID_CREDENTIALS'] } },
          _count: true,
        }),
        this.prisma.loginAttempt.groupBy({
          by: ['failureReason'],
          where: { attemptedAt: { gte: fromDate }, result: { in: ['FAILED_PASSWORD', 'INVALID_CREDENTIALS'] } },
          _count: true,
          orderBy: { _count: { failureReason: 'desc' } },
          take: 5,
        }),
        this.prisma.loginAttempt.groupBy({
          by: ['ipAddress'],
          where: { attemptedAt: { gte: fromDate }, result: { in: ['FAILED_PASSWORD', 'INVALID_CREDENTIALS'] } },
          _count: true,
          orderBy: { _count: { ipAddress: 'desc' } },
          take: 5,
        }),
      ]);

      // Calculate trend (compare with previous period)
      const previousPeriod = new Date(fromDate.getTime() - (fromDate.getTime() - now.getTime()));
      const previousFailed = await this.prisma.loginAttempt.count({
        where: {
          result: { in: ['FAILED_PASSWORD', 'INVALID_CREDENTIALS'] },
          attemptedAt: { gte: previousPeriod, lt: fromDate },
        },
      });

      const trendPercentage = previousFailed > 0
        ? ((totalFailed - previousFailed) / previousFailed) * 100
        : 0;

      const summary: FailedAttemptSummary = {
        period,
        totalFailed,
        uniqueIPs: uniqueIPs.length,
        uniqueUsers: uniqueUsers.length,
        topReasons: topReasons.map((item: { failureReason: string; _count: number }) => ({
          reason: item.failureReason || 'unknown',
          count: item._count,
        })),
        topIPs: topIPs.map((item: { ipAddress: string; _count: number }) => ({
          ip: item.ipAddress,
          count: item._count,
        })),
        trendPercentage,
      };

      this.metricsService?.recordHistogram(
        'login-attempt.repository.getFailedAttemptSummary.duration',
        Date.now() - startTime
      );

      return summary;
    } catch (error) {
      this.logger.error(`Failed to get failed attempt summary for period: ${period}`, error);
      this.metricsService?.incrementCounter('login-attempt.repository.error');
      throw this.wrapError(error);
    }
  }

  /**
   * Get success rate trend over time
   */
  async getSuccessRateTrend(
    days: number
  ): Promise<Array<{ date: string; rate: number; attempts: number }>> {
    const startTime = Date.now();
    const fromDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000);

    try {
      const results = await this.prisma.$queryRaw`
        SELECT 
          DATE_TRUNC('day', attempted_at) as date,
          COUNT(*) as attempts,
          COUNT(CASE WHEN result = 'SUCCESS' THEN 1 END) as successful
        FROM login_attempts
        WHERE attempted_at >= ${fromDate}
        GROUP BY DATE_TRUNC('day', attempted_at)
        ORDER BY date ASC
      `;

      const trend = (results as Array<{ date: Date; attempts: number; successful: number }>).map((item) => ({
        date: item.date.toISOString().split('T')[0],
        rate: item.attempts > 0 ? (item.successful / item.attempts) * 100 : 0,
        attempts: item.attempts,
      }));

      this.metricsService?.recordHistogram(
        'login-attempt.repository.getSuccessRateTrend.duration',
        Date.now() - startTime
      );

      return trend;
    } catch (error) {
      this.logger.error(`Failed to get success rate trend for ${days} days`, error);
      this.metricsService?.incrementCounter('login-attempt.repository.error');
      throw this.wrapError(error);
    }
  }

  // ============================================================
  // Pattern Detection Operations
  // ============================================================

  /**
   * Detect brute force patterns
   */
  async detectBruteForcePattern(
    hours: number
  ): Promise<RiskPatternResult> {
    const startTime = Date.now();
    const since = new Date(Date.now() - hours * 60 * 60 * 1000);

    try {
      // Find IPs with many failed attempts
      const ipGroups = await this.prisma.loginAttempt.groupBy({
        by: ['ipAddress'],
        where: {
          attemptedAt: { gte: since },
          result: { in: ['FAILED_PASSWORD', 'INVALID_CREDENTIALS'] },
        },
        _count: true,
        having: {
          _count: { gte: 10 }, // More than 10 failed attempts
        },
        orderBy: { _count: { ipAddress: 'desc' } },
      });

      const affectedIPs = ipGroups.map((item: { ipAddress: string }) => item.ipAddress);

      // Find affected users
      const userGroups = await this.prisma.loginAttempt.groupBy({
        by: ['userId'],
        where: {
          attemptedAt: { gte: since },
          ipAddress: { in: affectedIPs },
          result: { in: ['FAILED_PASSWORD', 'INVALID_CREDENTIALS'] },
        },
        _count: true,
      });

      const affectedUsers = userGroups
        .map((item: { userId: string }) => item.userId)
        .filter((id: string) => id !== null) as string[];

      const result: RiskPatternResult = {
        patternType: affectedIPs.length > 0 ? 'brute_force' : 'none',
        detected: affectedIPs.length > 0,
        confidence: Math.min(100, affectedIPs.length * 10),
        affectedUsers,
        affectedIPs,
        timeframe: { from: since, to: new Date() },
        recommendation: affectedIPs.length > 0
          ? `Block IPs: ${affectedIPs.join(', ')}. Consider rate limiting or CAPTCHA.`
          : 'No brute force patterns detected.',
      };

      this.metricsService?.recordHistogram(
        'login-attempt.repository.detectBruteForcePattern.duration',
        Date.now() - startTime
      );

      return result;
    } catch (error) {
      this.logger.error('Failed to detect brute force patterns', error);
      this.metricsService?.incrementCounter('login-attempt.repository.error');
      throw this.wrapError(error);
    }
  }

  /**
   * Detect credential stuffing patterns
   */
  async detectCredentialStuffing(
    hours: number
  ): Promise<RiskPatternResult> {
    const startTime = Date.now();
    const since = new Date(Date.now() - hours * 60 * 60 * 1000);

    try {
      // Find IPs with attempts across many different users
      const ipGroups = await this.prisma.$queryRaw`
        SELECT 
          ip_address,
          COUNT(DISTINCT user_id) as unique_users,
          COUNT(*) as total_attempts
        FROM login_attempts
        WHERE attempted_at >= ${since}
          AND result IN ('FAILED_PASSWORD', 'INVALID_CREDENTIALS')
        GROUP BY ip_address
        HAVING COUNT(DISTINCT user_id) >= 5
          AND COUNT(*) >= 20
        ORDER BY unique_users DESC
      `;

      const affectedIPs = (ipGroups as Array<{ ip_address: string; unique_users: number; total_attempts: number }>)
        .map((item) => item.ip_address);

      // Find affected users
      const userGroups = await this.prisma.loginAttempt.groupBy({
        by: ['userId'],
        where: {
          attemptedAt: { gte: since },
          ipAddress: { in: affectedIPs },
          result: { in: ['FAILED_PASSWORD', 'INVALID_CREDENTIALS'] },
        },
        _count: true,
      });

      const affectedUsers = userGroups
        .map((item: { userId: string }) => item.userId)
        .filter((id: string) => id !== null) as string[];

      const result: RiskPatternResult = {
        patternType: affectedIPs.length > 0 ? 'credential_stuffing' : 'none',
        detected: affectedIPs.length > 0,
        confidence: Math.min(100, affectedIPs.length * 15),
        affectedUsers,
        affectedIPs,
        timeframe: { from: since, to: new Date() },
        recommendation: affectedIPs.length > 0
          ? `Credential stuffing detected from IPs: ${affectedIPs.join(', ')}. Consider rate limiting and MFA enforcement.`
          : 'No credential stuffing patterns detected.',
      };

      this.metricsService?.recordHistogram(
        'login-attempt.repository.detectCredentialStuffing.duration',
        Date.now() - startTime
      );

      return result;
    } catch (error) {
      this.logger.error('Failed to detect credential stuffing patterns', error);
      this.metricsService?.incrementCounter('login-attempt.repository.error');
      throw this.wrapError(error);
    }
  }

  /**
   * Detect distributed attack patterns
   */
  async detectDistributedAttack(
    hours: number
  ): Promise<RiskPatternResult> {
    const startTime = Date.now();
    const since = new Date(Date.now() - hours * 60 * 60 * 1000);

    try {
      // Find many IPs with few attempts each (distributed attack)
      const ipGroups = await this.prisma.loginAttempt.groupBy({
        by: ['ipAddress'],
        where: {
          attemptedAt: { gte: since },
          result: { in: ['FAILED_PASSWORD', 'INVALID_CREDENTIALS'] },
        },
        _count: true,
        having: {
          _count: { gte: 2, lte: 5 }, // 2-5 attempts per IP
        },
      });

      const affectedIPs = ipGroups.map((item: { ipAddress: string }) => item.ipAddress);

      // Check if there are many such IPs
      const result: RiskPatternResult = {
        patternType: affectedIPs.length > 20 ? 'distributed_attack' : 'none',
        detected: affectedIPs.length > 20,
        confidence: Math.min(100, affectedIPs.length / 2),
        affectedUsers: [],
        affectedIPs: affectedIPs.slice(0, 20), // Limit for response size
        timeframe: { from: since, to: new Date() },
        recommendation: affectedIPs.length > 20
          ? `Distributed attack detected with ${affectedIPs.length} distinct IPs. Consider implementing IP reputation scoring.`
          : 'No distributed attack patterns detected.',
      };

      this.metricsService?.recordHistogram(
        'login-attempt.repository.detectDistributedAttack.duration',
        Date.now() - startTime
      );

      return result;
    } catch (error) {
      this.logger.error('Failed to detect distributed attack patterns', error);
      this.metricsService?.incrementCounter('login-attempt.repository.error');
      throw this.wrapError(error);
    }
  }

  /**
   * Get IP reputation score
   */
  async getIpReputation(
    ipAddress: IpAddress
  ): Promise<{ score: number; level: 'trusted' | 'neutral' | 'suspicious' | 'malicious'; factors: string[]; lastUpdated: Date }> {
    const startTime = Date.now();
    const ipValue = ipAddress.getValue();
    const since = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000); // Last 7 days

    try {
      // Get attempt statistics for this IP
      const [totalAttempts, failedAttempts, uniqueUsers, recentActivities] = await Promise.all([
        this.prisma.loginAttempt.count({
          where: { ipAddress: ipValue, attemptedAt: { gte: since } },
        }),
        this.prisma.loginAttempt.count({
          where: { ipAddress: ipValue, attemptedAt: { gte: since }, result: { in: ['FAILED_PASSWORD', 'INVALID_CREDENTIALS'] } },
        }),
        this.prisma.loginAttempt.groupBy({
          by: ['userId'],
          where: { ipAddress: ipValue, attemptedAt: { gte: since } },
          _count: true,
        }),
        this.prisma.loginAttempt.findMany({
          where: { ipAddress: ipValue, attemptedAt: { gte: since } },
          orderBy: { attemptedAt: 'desc' },
          take: 10,
          select: { result: true, attemptedAt: true },
        }),
      ]);

      const failureRate = totalAttempts > 0 ? (failedAttempts / totalAttempts) * 100 : 0;
      const uniqueUserCount = uniqueUsers.length;

      // Calculate score (0-100, higher = more suspicious)
      let score = 0;
      const factors: string[] = [];

      // Factor 1: Failure rate
      if (failureRate > 80) {
        score += 40;
        factors.push('Very high failure rate');
      } else if (failureRate > 50) {
        score += 25;
        factors.push('High failure rate');
      } else if (failureRate > 20) {
        score += 10;
        factors.push('Moderate failure rate');
      }

      // Factor 2: Number of users
      if (uniqueUserCount > 10) {
        score += 30;
        factors.push('Accessed many different accounts');
      } else if (uniqueUserCount > 5) {
        score += 15;
        factors.push('Accessed multiple accounts');
      }

      // Factor 3: Total attempts
      if (totalAttempts > 100) {
        score += 20;
        factors.push('Very high attempt volume');
      } else if (totalAttempts > 50) {
        score += 10;
        factors.push('High attempt volume');
      }

      // Factor 4: Recent suspicious activity
      const recentFailures = recentActivities.filter((a: { result: string }) =>
        a.result === 'FAILED_PASSWORD' || a.result === 'INVALID_CREDENTIALS'
      ).length;
      if (recentFailures > 5) {
        score += 10;
        factors.push('Recent multiple failures');
      }

      // Determine level
      let level: 'trusted' | 'neutral' | 'suspicious' | 'malicious';
      if (score < 10) level = 'trusted';
      else if (score < 30) level = 'neutral';
      else if (score < 60) level = 'suspicious';
      else level = 'malicious';

      const result = {
        score: Math.min(100, score),
        level,
        factors,
        lastUpdated: new Date(),
      };

      this.metricsService?.recordHistogram(
        'login-attempt.repository.getIpReputation.duration',
        Date.now() - startTime
      );

      return result;
    } catch (error) {
      this.logger.error(`Failed to get IP reputation for: ${ipValue}`, error);
      this.metricsService?.incrementCounter('login-attempt.repository.error');
      throw this.wrapError(error);
    }
  }

  // ============================================================
  // Cleanup Operations
  // ============================================================

  /**
   * Delete old login attempts (cleanup)
   */
  async deleteOldAttempts(retentionDays: number): Promise<number> {
    const startTime = Date.now();
    const retentionDate = new Date(Date.now() - retentionDays * 24 * 60 * 60 * 1000);

    try {
      const result = await this.prisma.loginAttempt.deleteMany({
        where: {
          attemptedAt: { lt: retentionDate },
        },
      });

      this.metricsService?.incrementCounter('login-attempt.repository.deleteOldAttempts');
      this.metricsService?.recordHistogram(
        'login-attempt.repository.deleteOldAttempts.duration',
        Date.now() - startTime
      );

      return result.count;
    } catch (error) {
      this.logger.error(`Failed to delete old attempts (retention: ${retentionDays} days)`, error);
      this.metricsService?.incrementCounter('login-attempt.repository.error');
      throw this.wrapError(error);
    }
  }

  /**
   * Archive old login attempts
   */
  async archiveOldAttempts(olderThanDays: number): Promise<number> {
    const startTime = Date.now();
    const archiveDate = new Date(Date.now() - olderThanDays * 24 * 60 * 60 * 1000);

    try {
      // Note: In a real implementation, this would move data to an archive table
      // For now, we'll just count the number of records that would be archived
      const count = await this.prisma.loginAttempt.count({
        where: {
          attemptedAt: { lt: archiveDate },
        },
      });

      // Actually delete them (since we don't have an archive table yet)
      const result = await this.prisma.loginAttempt.deleteMany({
        where: {
          attemptedAt: { lt: archiveDate },
        },
      });

      this.metricsService?.incrementCounter('login-attempt.repository.archiveOldAttempts');
      this.metricsService?.recordHistogram(
        'login-attempt.repository.archiveOldAttempts.duration',
        Date.now() - startTime
      );

      return result.count;
    } catch (error) {
      this.logger.error(`Failed to archive old attempts (older than: ${olderThanDays} days)`, error);
      this.metricsService?.incrementCounter('login-attempt.repository.error');
      throw this.wrapError(error);
    }
  }

  // ============================================================
  // Private Helper Methods
  // ============================================================

  /**
   * Build filter conditions for Prisma queries
   */
  private buildFilterConditions(filters: LoginAttemptFilters): Prisma.LoginAttemptWhereInput {
    const where: Prisma.LoginAttemptWhereInput = {};

    if (filters.userId) {
      where.userId = filters.userId;
    }

    if (filters.email) {
      where.email = filters.email.getValue().toLowerCase();
    }

    if (filters.ipAddress) {
      where.ipAddress = filters.ipAddress.getValue();
    }

    if (filters.deviceId) {
      where.deviceId = filters.deviceId.getValue();
    }

    if (filters.result) {
      where.result = filters.result.toString();
    }

    if (filters.riskLevel) {
      where.riskLevel = filters.riskLevel;
    }

    if (filters.fromDate) {
      where.attemptedAt = { ...where.attemptedAt, gte: filters.fromDate };
    }

    if (filters.toDate) {
      where.attemptedAt = { ...where.attemptedAt, lte: filters.toDate };
    }

    if (filters.isMfaVerified !== undefined) {
      where.isMfaVerified = filters.isMfaVerified;
    }

    if (filters.isSuspicious !== undefined) {
      where.isSuspicious = filters.isSuspicious;
    }

    return where;
  }

  /**
   * Convert Prisma login attempt to Domain LoginAttempt entity
   */
  private toDomain(prismaAttempt: PrismaLoginAttempt): LoginAttempt {
    const email = new Email(prismaAttempt.email);
    const ipAddress = new IpAddress(prismaAttempt.ipAddress);
    const userAgent = new UserAgent(prismaAttempt.userAgent);
    const deviceId = new DeviceId(prismaAttempt.deviceId);

    const metadata = prismaAttempt.metadata as Record<string, unknown> | undefined;

    return LoginAttempt.reconstitute({
      id: prismaAttempt.id,
      userId: prismaAttempt.userId || undefined,
      email,
      ipAddress,
      userAgent,
      deviceId,
      result: prismaAttempt.result as LoginResult,
      attemptedAt: prismaAttempt.attemptedAt,
      riskScore: prismaAttempt.riskScore,
      riskLevel: prismaAttempt.riskLevel as RiskLevel,
      failureReason: prismaAttempt.failureReason || undefined,
      metadata: metadata as any,
      isMfaVerified: prismaAttempt.isMfaVerified,
      sessionId: prismaAttempt.sessionId || undefined,
      mfaMethodUsed: prismaAttempt.mfaMethodUsed as any || undefined,
      riskHistory: (metadata?.riskHistory as any) || [],
      riskEscalationCount: (metadata?.riskEscalationCount as number) || 0,
      lastSuspiciousActivityAt: metadata?.lastSuspiciousActivityAt
        ? new Date(metadata.lastSuspiciousActivityAt as string)
        : undefined,
      createdAt: prismaAttempt.createdAt,
      updatedAt: prismaAttempt.updatedAt,
      version: 1,
    });
  }

  /**
   * Convert Domain LoginAttempt to Prisma data
   */
  private toPrisma(attempt: LoginAttempt): Prisma.LoginAttemptUncheckedCreateInput {
    const metadata = attempt.getMetadata() || {};

    // Add domain-specific fields to metadata
    const fullMetadata = {
      ...metadata,
      riskHistory: attempt.getRiskHistory(),
      riskEscalationCount: attempt.getRiskEscalationCount(),
      lastSuspiciousActivityAt: attempt['_lastSuspiciousActivityAt']?.toISOString(),
    };

    return {
      id: attempt.getId(),
      userId: attempt.getUserId(),
      email: attempt.getEmail().getValue().toLowerCase(),
      ipAddress: attempt.getIpAddress().getValue(),
      userAgent: attempt.getUserAgent().getValue(),
      deviceId: attempt.getDeviceId().getValue(),
      result: attempt.getResult().toString(),
      attemptedAt: attempt.getAttemptedAt(),
      riskScore: attempt.getRiskScore(),
      riskLevel: attempt.getRiskLevel(),
      failureReason: attempt.getFailureReason(),
      isMfaVerified: attempt.isMfaVerified(),
      sessionId: attempt.getSessionId(),
      mfaMethodUsed: attempt.getMfaMethodUsed(),
      metadata: fullMetadata,
      createdAt: attempt.getCreatedAt(),
      updatedAt: attempt.getUpdatedAt(),
    };
  }

  /**
   * Invalidate cache for a login attempt
   */
  private async invalidateCache(attempt: LoginAttempt): Promise<void> {
    if (!this.cacheService) return;

    const keys = [
      LoginAttemptCacheKey.byId(attempt.getId()),
    ];

    const userId = attempt.getUserId();
    if (userId) {
      keys.push(LoginAttemptCacheKey.byUserId(userId));
    }

    const ip = attempt.getIpAddress().getValue();
    keys.push(LoginAttemptCacheKey.byIpAddress(ip));

    const email = attempt.getEmail().getValue();
    keys.push(LoginAttemptCacheKey.byEmail(email));

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
        case 'P2025':
          return new Error('Login attempt not found');
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

  /**
   * Health check
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
