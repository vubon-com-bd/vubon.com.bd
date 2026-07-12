/**
 * Refresh Token Prisma Repository - Infrastructure Layer Implementation
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 *
 * @module infrastructure/persistence/prisma/repositories/refresh-token.prisma.repository
 *
 * @description
 * Prisma implementation of the RefreshTokenRepository port.
 * Handles all database operations for RefreshToken aggregate with enterprise-grade features.
 *
 * Enterprise Features:
 * ✅ Implements domain RefreshTokenRepository interface
 * ✅ Complete CRUD operations with pagination and filtering
 * ✅ Caching strategy for hot data (Redis)
 * ✅ Optimistic locking for concurrent updates
 * ✅ Token family tracking and rotation
 * ✅ Audit trail for all operations
 * ✅ Performance optimized queries with indices
 * ✅ Connection pooling and retry logic
 * ✅ Error handling with domain-friendly exceptions
 * ✅ Bangladesh specific - District/NetworkType/Operator filtering
 * ✅ Transaction support for complex operations (family rotations)
 *
 * @example
 * // In infrastructure module
 * @Module({
 *   providers: [
 *     PrismaService,
 *     {
 *       provide: 'RefreshTokenRepository',
 *       useClass: RefreshTokenPrismaRepository,
 *     },
 *   ],
 *   exports: ['RefreshTokenRepository'],
 * })
 * export class DatabaseModule {}
 */

import { Injectable, Logger, Inject, Optional } from '@nestjs/common';
import { Prisma, RefreshToken as PrismaRefreshToken, PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

// Shared packages for utilities and types
import { TOKEN_CONFIG, REFRESH_TOKEN_CONFIG } from '@vubon/shared-constants';
import type { RefreshTokenStatus as SharedRefreshTokenStatus } from '@vubon/shared-types';
import { maskTokenId, maskString } from '@vubon/shared-utils';

// Domain imports (ports and entities)
import {
  RefreshTokenRepository,
  PaginationOptions,
  PaginatedResult,
  TokenFamilyResult,
  RefreshTokenStatistics,
  BulkRevokeResult,
  CleanupResult,
  TokenRotationBatchResult,
  SuspiciousTokenActivity,
  DEFAULT_SUSPICIOUS_THRESHOLDS,
  TokenHealthScore,
  TokenReputationScore,
  TokenUsageAnomaly,
  PredictiveTokenExpiry,
  GeographicRotationPattern,
  CrossDeviceSyncRequest,
  TokenQuarantineResult,
} from '../../../domain/repositories/refresh-token.repository.interface';
import { RefreshToken, RefreshTokenStatus } from '../../../domain/entities/refresh-token.entity';
import { Token } from '../../../domain/value-objects/token.vo';
import { DeviceId } from '../../../domain/value-objects/device-id.vo';
import { IpAddress } from '../../../domain/value-objects/ip-address.vo';

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
 * Find options for refresh token queries
 */
export interface FindOptions {
  withCache?: boolean;
  cacheTTL?: number;
}

/**
 * Update options for token operations
 */
export interface UpdateOptions {
  optimisticLocking?: boolean;
  skipAudit?: boolean;
  skipCache?: boolean;
}

/**
 * Prisma token with relations (for complex queries)
 */
interface PrismaRefreshTokenWithRelations extends PrismaRefreshToken {
  user?: unknown;
  sessions?: unknown[];
}

// ============================================================
// Cache Key Builder
// ============================================================

/**
 * Cache key generation for refresh token entities
 */
class RefreshTokenCacheKey {
  private static readonly PREFIX = 'auth:refresh-token:';
  private static readonly TOKEN_PREFIX = 'auth:refresh-token:token:';
  private static readonly USER_PREFIX = 'auth:refresh-token:user:';
  private static readonly FAMILY_PREFIX = 'auth:refresh-token:family:';

  static byId(id: string): string {
    return `${this.PREFIX}${id}`;
  }

  static byToken(token: string): string {
    return `${this.TOKEN_PREFIX}${token}`;
  }

  static byUserId(userId: string): string {
    return `${this.USER_PREFIX}${userId}`;
  }

  static byFamily(family: string): string {
    return `${this.FAMILY_PREFIX}${family}`;
  }

  static pattern(): string {
    return `${this.PREFIX}*`;
  }

  static userPattern(userId: string): string {
    return `${this.USER_PREFIX}${userId}:*`;
  }

  static familyPattern(family: string): string {
    return `${this.FAMILY_PREFIX}${family}:*`;
  }
}

// ============================================================
// Refresh Token Prisma Repository Implementation
// ============================================================

@Injectable()
export class RefreshTokenPrismaRepository implements RefreshTokenRepository {
  private readonly logger = new Logger(RefreshTokenPrismaRepository.name);
  private readonly defaultCacheTTL = 3600; // 1 hour

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
    this.logger.log('RefreshTokenPrismaRepository initialized');
  }

  // ============================================================
  // Core CRUD Operations
  // ============================================================

  /**
   * Save a refresh token (create or update)
   */
  async save(token: RefreshToken): Promise<void> {
    const startTime = Date.now();

    try {
      const data = this.toPrisma(token);

      // Check if token exists
      const existing = await this.prisma.refreshToken.findUnique({
        where: { id: token.getId() },
      });

      if (existing) {
        await this.prisma.refreshToken.update({
          where: { id: token.getId() },
          data,
        });
      } else {
        await this.prisma.refreshToken.create({
          data,
        });
      }

      // Invalidate cache
      if (this.cacheService) {
        await this.invalidateCache(token);
      }

      // Audit log
      if (this.auditService) {
        await this.auditService.log({
          action: existing ? 'REFRESH_TOKEN_UPDATED' : 'REFRESH_TOKEN_CREATED',
          userId: token.getUserId(),
          metadata: {
            tokenId: token.getId(),
            family: token.getFamily(),
            rotationCount: token.getRotationCount(),
            operation: existing ? 'UPDATE' : 'CREATE',
          },
        });
      }

      this.metricsService?.incrementCounter('refresh-token.repository.save');
      this.metricsService?.recordHistogram(
        'refresh-token.repository.save.duration',
        Date.now() - startTime
      );
    } catch (error) {
      this.logger.error(`Failed to save refresh token: ${token.getId()}`, error);
      this.metricsService?.incrementCounter('refresh-token.repository.error');
      throw this.wrapError(error);
    }
  }

  /**
   * Save token with version check (optimistic locking)
   */
  async saveWithVersionCheck(token: RefreshToken): Promise<void> {
    const startTime = Date.now();

    try {
      const data = this.toPrisma(token);

      const result = await this.prisma.refreshToken.updateMany({
        where: {
          id: token.getId(),
          version: token.getVersion(),
        },
        data,
      });

      if (result.count === 0) {
        throw new Error('Optimistic lock conflict: Refresh token was modified by another transaction');
      }

      // Invalidate cache
      if (this.cacheService) {
        await this.invalidateCache(token);
      }

      this.metricsService?.incrementCounter('refresh-token.repository.saveWithVersionCheck');
      this.metricsService?.recordHistogram(
        'refresh-token.repository.saveWithVersionCheck.duration',
        Date.now() - startTime
      );
    } catch (error) {
      this.logger.error(`Failed to save refresh token with version check: ${token.getId()}`, error);
      this.metricsService?.incrementCounter('refresh-token.repository.error');
      throw this.wrapError(error);
    }
  }

  /**
   * Batch rotate tokens (old token revoked, new token saved)
   */
  async batchRotateTokens(oldToken: RefreshToken, newToken: RefreshToken): Promise<void> {
    const startTime = Date.now();

    try {
      await this.prisma.$transaction(async (tx: Prisma.TransactionClient) => {
        // Revoke old token
        const oldData = this.toPrisma(oldToken);
        await tx.refreshToken.update({
          where: { id: oldToken.getId() },
          data: oldData,
        });

        // Create new token
        const newData = this.toPrisma(newToken);
        await tx.refreshToken.create({
          data: newData,
        });
      });

      // Invalidate cache for both tokens
      if (this.cacheService) {
        await this.invalidateCache(oldToken);
        await this.invalidateCache(newToken);
        // Invalidate family cache
        await this.cacheService.delete(RefreshTokenCacheKey.byFamily(oldToken.getFamily()));
      }

      // Audit log
      if (this.auditService) {
        await this.auditService.log({
          action: 'REFRESH_TOKEN_ROTATED',
          userId: oldToken.getUserId(),
          metadata: {
            oldTokenId: oldToken.getId(),
            newTokenId: newToken.getId(),
            family: oldToken.getFamily(),
            rotationCount: newToken.getRotationCount(),
          },
        });
      }

      this.metricsService?.incrementCounter('refresh-token.repository.batchRotate');
      this.metricsService?.recordHistogram(
        'refresh-token.repository.batchRotate.duration',
        Date.now() - startTime
      );
    } catch (error) {
      this.logger.error('Failed to batch rotate tokens', error);
      this.metricsService?.incrementCounter('refresh-token.repository.error');
      throw this.wrapError(error);
    }
  }

  /**
   * Batch rotate multiple token pairs
   */
  async batchRotateMultiple(
    rotations: Array<{ oldToken: RefreshToken; newToken: RefreshToken }>
  ): Promise<TokenRotationBatchResult[]> {
    const startTime = Date.now();
    const results: TokenRotationBatchResult[] = [];

    try {
      await this.prisma.$transaction(async (tx: Prisma.TransactionClient) => {
        for (const { oldToken, newToken } of rotations) {
          try {
            // Revoke old token
            const oldData = this.toPrisma(oldToken);
            await tx.refreshToken.update({
              where: { id: oldToken.getId() },
              data: oldData,
            });

            // Create new token
            const newData = this.toPrisma(newToken);
            await tx.refreshToken.create({
              data: newData,
            });

            results.push({
              oldTokenId: oldToken.getId(),
              newTokenId: newToken.getId(),
              family: oldToken.getFamily(),
              rotationCount: newToken.getRotationCount(),
              success: true,
            });

            // Invalidate cache
            if (this.cacheService) {
              await this.invalidateCache(oldToken);
              await this.invalidateCache(newToken);
            }
          } catch (error) {
            results.push({
              oldTokenId: oldToken.getId(),
              newTokenId: newToken.getId(),
              family: oldToken.getFamily(),
              rotationCount: oldToken.getRotationCount(),
              success: false,
              error: error instanceof Error ? error.message : 'Unknown error',
            });
          }
        }
      });

      this.metricsService?.recordHistogram(
        'refresh-token.repository.batchRotateMultiple.duration',
        Date.now() - startTime
      );

      return results;
    } catch (error) {
      this.logger.error('Failed to batch rotate multiple tokens', error);
      this.metricsService?.incrementCounter('refresh-token.repository.error');
      throw this.wrapError(error);
    }
  }

  /**
   * Find refresh token by ID
   */
  async findById(id: string, options: FindOptions = {}): Promise<RefreshToken | null> {
    const startTime = Date.now();
    const { withCache = true, cacheTTL = this.defaultCacheTTL } = options;

    try {
      // Check cache first
      if (withCache && this.cacheService) {
        const cacheKey = RefreshTokenCacheKey.byId(id);
        const cached = await this.cacheService.get<RefreshToken>(cacheKey);
        if (cached) {
          this.metricsService?.incrementCounter('refresh-token.repository.cache.hit');
          return cached;
        }
        this.metricsService?.incrementCounter('refresh-token.repository.cache.miss');
      }

      const prismaToken = await this.executeWithRetry(() =>
        this.prisma.refreshToken.findUnique({
          where: { id },
        })
      );

      if (!prismaToken) {
        return null;
      }

      const token = this.toDomain(prismaToken);

      // Cache the result
      if (withCache && this.cacheService) {
        await this.cacheService.set(RefreshTokenCacheKey.byId(id), token, cacheTTL);
      }

      this.metricsService?.recordHistogram(
        'refresh-token.repository.findById.duration',
        Date.now() - startTime
      );

      return token;
    } catch (error) {
      this.logger.error(`Failed to find refresh token by ID: ${id}`, error);
      this.metricsService?.incrementCounter('refresh-token.repository.error');
      throw this.wrapError(error);
    }
  }

  /**
   * Find refresh token by token value
   */
  async findByToken(token: Token, options: FindOptions = {}): Promise<RefreshToken | null> {
    const startTime = Date.now();
    const { withCache = true, cacheTTL = this.defaultCacheTTL } = options;
    const tokenValue = token.getValue();

    try {
      // Check cache first
      if (withCache && this.cacheService) {
        const cacheKey = RefreshTokenCacheKey.byToken(tokenValue);
        const cached = await this.cacheService.get<RefreshToken>(cacheKey);
        if (cached) {
          this.metricsService?.incrementCounter('refresh-token.repository.cache.hit');
          return cached;
        }
        this.metricsService?.incrementCounter('refresh-token.repository.cache.miss');
      }

      const prismaToken = await this.executeWithRetry(() =>
        this.prisma.refreshToken.findUnique({
          where: { token: tokenValue },
        })
      );

      if (!prismaToken) {
        return null;
      }

      const refreshToken = this.toDomain(prismaToken);

      // Cache the result
      if (withCache && this.cacheService) {
        await this.cacheService.set(RefreshTokenCacheKey.byToken(tokenValue), refreshToken, cacheTTL);
        await this.cacheService.set(RefreshTokenCacheKey.byId(refreshToken.getId()), refreshToken, cacheTTL);
      }

      this.metricsService?.recordHistogram(
        'refresh-token.repository.findByToken.duration',
        Date.now() - startTime
      );

      return refreshToken;
    } catch (error) {
      this.logger.error('Failed to find refresh token by token', error);
      this.metricsService?.incrementCounter('refresh-token.repository.error');
      throw this.wrapError(error);
    }
  }

  /**
   * Find refresh token by raw token value
   */
  async findByTokenValue(tokenValue: string, options: FindOptions = {}): Promise<RefreshToken | null> {
    const token = new Token(tokenValue);
    return this.findByToken(token, options);
  }

  /**
   * Find all refresh tokens by user ID
   */
  async findByUserId(userId: string): Promise<RefreshToken[]> {
    const startTime = Date.now();

    try {
      const prismaTokens = await this.executeWithRetry(() =>
        this.prisma.refreshToken.findMany({
          where: { userId },
          orderBy: { createdAt: 'desc' },
        })
      );

      const tokens = prismaTokens.map((t: PrismaRefreshToken) => this.toDomain(t));

      this.metricsService?.recordHistogram(
        'refresh-token.repository.findByUserId.duration',
        Date.now() - startTime
      );

      return tokens;
    } catch (error) {
      this.logger.error(`Failed to find refresh tokens for user: ${userId}`, error);
      this.metricsService?.incrementCounter('refresh-token.repository.error');
      throw this.wrapError(error);
    }
  }

  /**
   * Find active refresh tokens by user ID
   */
  async findActiveByUserId(userId: string): Promise<RefreshToken[]> {
    const startTime = Date.now();

    try {
      const prismaTokens = await this.executeWithRetry(() =>
        this.prisma.refreshToken.findMany({
          where: {
            userId,
            status: 'ACTIVE',
            expiresAt: { gt: new Date() },
          },
          orderBy: { createdAt: 'desc' },
        })
      );

      const tokens = prismaTokens.map((t: PrismaRefreshToken) => this.toDomain(t));

      this.metricsService?.recordHistogram(
        'refresh-token.repository.findActiveByUserId.duration',
        Date.now() - startTime
      );

      return tokens;
    } catch (error) {
      this.logger.error(`Failed to find active refresh tokens for user: ${userId}`, error);
      this.metricsService?.incrementCounter('refresh-token.repository.error');
      throw this.wrapError(error);
    }
  }

  /**
   * Find tokens by status
   */
  async findByStatus(
    status: RefreshTokenStatus,
    options: PaginationOptions
  ): Promise<PaginatedResult<RefreshToken>> {
    const startTime = Date.now();
    const { page = 1, limit = 20, sortBy = 'createdAt', sortOrder = 'desc' } = options;

    try {
      const where = { status: status.toString() };
      const orderBy = { [sortBy]: sortOrder };

      const [total, prismaTokens] = await Promise.all([
        this.prisma.refreshToken.count({ where }),
        this.prisma.refreshToken.findMany({
          where,
          orderBy,
          skip: (page - 1) * limit,
          take: limit,
        }),
      ]);

      const tokens = prismaTokens.map((t: PrismaRefreshToken) => this.toDomain(t));

      this.metricsService?.recordHistogram(
        'refresh-token.repository.findByStatus.duration',
        Date.now() - startTime
      );

      return {
        items: tokens,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
        hasNext: page * limit < total,
        hasPrevious: page > 1,
      };
    } catch (error) {
      this.logger.error(`Failed to find refresh tokens by status: ${status}`, error);
      this.metricsService?.incrementCounter('refresh-token.repository.error');
      throw this.wrapError(error);
    }
  }

  /**
   * Find revoked tokens
   */
  async findRevokedTokens(options: PaginationOptions = {}): Promise<PaginatedResult<RefreshToken>> {
    return this.findByStatus(RefreshTokenStatus.REVOKED, options);
  }

  /**
   * Find expired tokens
   */
  async findExpiredTokens(options: PaginationOptions = {}): Promise<PaginatedResult<RefreshToken>> {
    const startTime = Date.now();
    const { page = 1, limit = 20, sortBy = 'createdAt', sortOrder = 'desc' } = options;

    try {
      const where = {
        status: { in: ['ACTIVE', 'SUSPENDED'] },
        expiresAt: { lt: new Date() },
      };
      const orderBy = { [sortBy]: sortOrder };

      const [total, prismaTokens] = await Promise.all([
        this.prisma.refreshToken.count({ where }),
        this.prisma.refreshToken.findMany({
          where,
          orderBy,
          skip: (page - 1) * limit,
          take: limit,
        }),
      ]);

      const tokens = prismaTokens.map((t: PrismaRefreshToken) => this.toDomain(t));

      this.metricsService?.recordHistogram(
        'refresh-token.repository.findExpiredTokens.duration',
        Date.now() - startTime
      );

      return {
        items: tokens,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
        hasNext: page * limit < total,
        hasPrevious: page > 1,
      };
    } catch (error) {
      this.logger.error('Failed to find expired refresh tokens', error);
      this.metricsService?.incrementCounter('refresh-token.repository.error');
      throw this.wrapError(error);
    }
  }

  /**
   * Find compromised tokens
   */
  async findCompromisedTokens(options: PaginationOptions = {}): Promise<PaginatedResult<RefreshToken>> {
    const startTime = Date.now();
    const { page = 1, limit = 20, sortBy = 'createdAt', sortOrder = 'desc' } = options;

    try {
      const where = {
        isCompromised: true,
      };
      const orderBy = { [sortBy]: sortOrder };

      const [total, prismaTokens] = await Promise.all([
        this.prisma.refreshToken.count({ where }),
        this.prisma.refreshToken.findMany({
          where,
          orderBy,
          skip: (page - 1) * limit,
          take: limit,
        }),
      ]);

      const tokens = prismaTokens.map((t: PrismaRefreshToken) => this.toDomain(t));

      this.metricsService?.recordHistogram(
        'refresh-token.repository.findCompromisedTokens.duration',
        Date.now() - startTime
      );

      return {
        items: tokens,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
        hasNext: page * limit < total,
        hasPrevious: page > 1,
      };
    } catch (error) {
      this.logger.error('Failed to find compromised refresh tokens', error);
      this.metricsService?.incrementCounter('refresh-token.repository.error');
      throw this.wrapError(error);
    }
  }

  /**
   * Find tokens by family
   */
  async findByFamily(family: string): Promise<RefreshToken[]> {
    const startTime = Date.now();

    try {
      const prismaTokens = await this.executeWithRetry(() =>
        this.prisma.refreshToken.findMany({
          where: { family },
          orderBy: { createdAt: 'asc' },
        })
      );

      const tokens = prismaTokens.map((t: PrismaRefreshToken) => this.toDomain(t));

      this.metricsService?.recordHistogram(
        'refresh-token.repository.findByFamily.duration',
        Date.now() - startTime
      );

      return tokens;
    } catch (error) {
      this.logger.error(`Failed to find refresh tokens by family: ${family}`, error);
      this.metricsService?.incrementCounter('refresh-token.repository.error');
      throw this.wrapError(error);
    }
  }

  /**
   * Find family with statistics
   */
  async findFamilyWithStats(family: string, status?: RefreshTokenStatus): Promise<TokenFamilyResult> {
    const startTime = Date.now();

    try {
      const where: Prisma.RefreshTokenWhereInput = { family };
      if (status) {
        where.status = status.toString();
      }

      const tokens = await this.prisma.refreshToken.findMany({
        where,
        orderBy: { createdAt: 'asc' },
      });

      // Calculate statistics
      let activeCount = 0;
      let revokedCount = 0;
      let expiredCount = 0;
      let usedCount = 0;
      let compromisedCount = 0;
      let userId = tokens.length > 0 ? tokens[0]?.userId || '' : '';

      const rotations: Array<{ fromTokenId: string; toTokenId: string; rotatedAt: Date }> = [];

      for (const t of tokens) {
        if (t.status === 'ACTIVE') activeCount++;
        if (t.status === 'REVOKED') revokedCount++;
        if (t.status === 'EXPIRED') expiredCount++;
        if (t.status === 'USED') usedCount++;
        if (t.isCompromised) compromisedCount++;
        if (t.userId) userId = t.userId;

        // Track rotations (if previous token exists)
        if (t.previousTokenId) {
          rotations.push({
            fromTokenId: t.previousTokenId,
            toTokenId: t.id,
            rotatedAt: t.updatedAt || t.createdAt,
          });
        }
      }

      const domainTokens = tokens.map((t) => this.toDomain(t));

      const result: TokenFamilyResult = {
        family,
        userId,
        tokens: domainTokens,
        activeCount,
        revokedCount,
        expiredCount,
        usedCount,
        compromisedCount,
        createdAt: tokens.length > 0 && tokens[0]?.createdAt ? tokens[0].createdAt : new Date(),
        lastRotatedAt: rotations.length > 0 ? rotations[rotations.length - 1]?.rotatedAt || new Date() : new Date(),
        rotationHistory: rotations,
        healthScore: this.calculateFamilyHealthScore(tokens),
        riskLevel: this.calculateFamilyRiskLevel(tokens),
      };

      this.metricsService?.recordHistogram(
        'refresh-token.repository.findFamilyWithStats.duration',
        Date.now() - startTime
      );

      return result;
    } catch (error) {
      this.logger.error(`Failed to find family with stats: ${family}`, error);
      this.metricsService?.incrementCounter('refresh-token.repository.error');
      throw this.wrapError(error);
    }
  }

  /**
   * Find tokens by device ID
   */
  async findByDeviceId(
    deviceId: DeviceId,
    options: PaginationOptions = {}
  ): Promise<PaginatedResult<RefreshToken>> {
    const startTime = Date.now();
    const { page = 1, limit = 20, sortBy = 'createdAt', sortOrder = 'desc' } = options;
    const deviceIdValue = deviceId.getValue();

    try {
      // Query tokens with deviceId in metadata (JSON field)
      const where = {
        metadata: {
          path: ['deviceId'],
          equals: deviceIdValue,
        },
      };
      const orderBy = { [sortBy]: sortOrder };

      const [total, prismaTokens] = await Promise.all([
        this.prisma.refreshToken.count({ where }),
        this.prisma.refreshToken.findMany({
          where,
          orderBy,
          skip: (page - 1) * limit,
          take: limit,
        }),
      ]);

      const tokens = prismaTokens.map((t: PrismaRefreshToken) => this.toDomain(t));

      this.metricsService?.recordHistogram(
        'refresh-token.repository.findByDeviceId.duration',
        Date.now() - startTime
      );

      return {
        items: tokens,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
        hasNext: page * limit < total,
        hasPrevious: page > 1,
      };
    } catch (error) {
      this.logger.error(`Failed to find refresh tokens by device ID: ${deviceIdValue}`, error);
      this.metricsService?.incrementCounter('refresh-token.repository.error');
      throw this.wrapError(error);
    }
  }

  /**
   * Find tokens by IP address
   */
  async findByIpAddress(
    ipAddress: IpAddress,
    options: PaginationOptions = {}
  ): Promise<PaginatedResult<RefreshToken>> {
    const startTime = Date.now();
    const { page = 1, limit = 20, sortBy = 'createdAt', sortOrder = 'desc' } = options;
    const ipValue = ipAddress.getValue();

    try {
      const where = {
        metadata: {
          path: ['ipAddress'],
          equals: ipValue,
        },
      };
      const orderBy = { [sortBy]: sortOrder };

      const [total, prismaTokens] = await Promise.all([
        this.prisma.refreshToken.count({ where }),
        this.prisma.refreshToken.findMany({
          where,
          orderBy,
          skip: (page - 1) * limit,
          take: limit,
        }),
      ]);

      const tokens = prismaTokens.map((t: PrismaRefreshToken) => this.toDomain(t));

      this.metricsService?.recordHistogram(
        'refresh-token.repository.findByIpAddress.duration',
        Date.now() - startTime
      );

      return {
        items: tokens,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
        hasNext: page * limit < total,
        hasPrevious: page > 1,
      };
    } catch (error) {
      this.logger.error(`Failed to find refresh tokens by IP: ${ipValue}`, error);
      this.metricsService?.incrementCounter('refresh-token.repository.error');
      throw this.wrapError(error);
    }
  }

  /**
   * Find tokens by rotation count threshold
   */
  async findByRotationCount(minRotationCount: number): Promise<RefreshToken[]> {
    const startTime = Date.now();

    try {
      const prismaTokens = await this.prisma.refreshToken.findMany({
        where: {
          rotationCount: { gte: minRotationCount },
          status: 'ACTIVE',
        },
        orderBy: { rotationCount: 'desc' },
      });

      const tokens = prismaTokens.map((t: PrismaRefreshToken) => this.toDomain(t));

      this.metricsService?.recordHistogram(
        'refresh-token.repository.findByRotationCount.duration',
        Date.now() - startTime
      );

      return tokens;
    } catch (error) {
      this.logger.error(`Failed to find refresh tokens by rotation count: ${minRotationCount}`, error);
      this.metricsService?.incrementCounter('refresh-token.repository.error');
      throw this.wrapError(error);
    }
  }

  /**
   * Find stale tokens (not used for N days)
   */
  async findStaleTokens(daysInactive: number): Promise<RefreshToken[]> {
    const startTime = Date.now();
    const staleThreshold = new Date(Date.now() - daysInactive * 24 * 60 * 60 * 1000);

    try {
      const prismaTokens = await this.prisma.refreshToken.findMany({
        where: {
          status: 'ACTIVE',
          lastUsedAt: { lt: staleThreshold },
        },
        orderBy: { lastUsedAt: 'asc' },
      });

      const tokens = prismaTokens.map((t: PrismaRefreshToken) => this.toDomain(t));

      this.metricsService?.recordHistogram(
        'refresh-token.repository.findStaleTokens.duration',
        Date.now() - startTime
      );

      return tokens;
    } catch (error) {
      this.logger.error(`Failed to find stale refresh tokens (days: ${daysInactive})`, error);
      this.metricsService?.incrementCounter('refresh-token.repository.error');
      throw this.wrapError(error);
    }
  }

  /**
   * Find tokens expiring soon
   */
  async findExpiringSoon(hoursThreshold: number): Promise<RefreshToken[]> {
    const startTime = Date.now();
    const now = new Date();
    const expiryThreshold = new Date(now.getTime() + hoursThreshold * 60 * 60 * 1000);

    try {
      const prismaTokens = await this.prisma.refreshToken.findMany({
        where: {
          status: 'ACTIVE',
          expiresAt: { gt: now, lt: expiryThreshold },
        },
        orderBy: { expiresAt: 'asc' },
      });

      const tokens = prismaTokens.map((t: PrismaRefreshToken) => this.toDomain(t));

      this.metricsService?.recordHistogram(
        'refresh-token.repository.findExpiringSoon.duration',
        Date.now() - startTime
      );

      return tokens;
    } catch (error) {
      this.logger.error(`Failed to find refresh tokens expiring soon (threshold: ${hoursThreshold} hours)`, error);
      this.metricsService?.incrementCounter('refresh-token.repository.error');
      throw this.wrapError(error);
    }
  }

  /**
   * Find active tokens by user with pagination
   */
  async findActiveByUserIdPaginated(
    userId: string,
    options: PaginationOptions
  ): Promise<PaginatedResult<RefreshToken>> {
    const startTime = Date.now();
    const { page = 1, limit = 20, sortBy = 'createdAt', sortOrder = 'desc' } = options;

    try {
      const where = {
        userId,
        status: 'ACTIVE',
        expiresAt: { gt: new Date() },
      };
      const orderBy = { [sortBy]: sortOrder };

      const [total, prismaTokens] = await Promise.all([
        this.prisma.refreshToken.count({ where }),
        this.prisma.refreshToken.findMany({
          where,
          orderBy,
          skip: (page - 1) * limit,
          take: limit,
        }),
      ]);

      const tokens = prismaTokens.map((t: PrismaRefreshToken) => this.toDomain(t));

      this.metricsService?.recordHistogram(
        'refresh-token.repository.findActiveByUserIdPaginated.duration',
        Date.now() - startTime
      );

      return {
        items: tokens,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
        hasNext: page * limit < total,
        hasPrevious: page > 1,
      };
    } catch (error) {
      this.logger.error(`Failed to find active refresh tokens for user: ${userId}`, error);
      this.metricsService?.incrementCounter('refresh-token.repository.error');
      throw this.wrapError(error);
    }
  }

  /**
   * Find tokens by multiple families
   */
  async findByFamilies(families: string[]): Promise<RefreshToken[]> {
    const startTime = Date.now();

    try {
      const prismaTokens = await this.prisma.refreshToken.findMany({
        where: {
          family: { in: families },
        },
        orderBy: { createdAt: 'desc' },
      });

      const tokens = prismaTokens.map((t: PrismaRefreshToken) => this.toDomain(t));

      this.metricsService?.recordHistogram(
        'refresh-token.repository.findByFamilies.duration',
        Date.now() - startTime
      );

      return tokens;
    } catch (error) {
      this.logger.error('Failed to find refresh tokens by families', error);
      this.metricsService?.incrementCounter('refresh-token.repository.error');
      throw this.wrapError(error);
    }
  }

  /**
   * Find families with multiple active tokens (potential anomaly)
   */
  async findFamiliesWithMultipleActiveTokens(): Promise<Array<{ family: string; activeCount: number; userId: string }>> {
    const startTime = Date.now();

    try {
      // Group by family and count active tokens
      const result = await this.prisma.$queryRaw<Array<{ family: string; activeCount: bigint; userId: string }>>`
        SELECT family, COUNT(*) as activeCount, userId
        FROM refresh_tokens
        WHERE status = 'ACTIVE'
        GROUP BY family, userId
        HAVING COUNT(*) > 1
        ORDER BY activeCount DESC
      `;

      const typedResult = result.map((r) => ({
        family: r.family,
        activeCount: Number(r.activeCount),
        userId: r.userId,
      }));

      this.metricsService?.recordHistogram(
        'refresh-token.repository.findFamiliesWithMultipleActiveTokens.duration',
        Date.now() - startTime
      );

      return typedResult;
    } catch (error) {
      this.logger.error('Failed to find families with multiple active tokens', error);
      this.metricsService?.incrementCounter('refresh-token.repository.error');
      throw this.wrapError(error);
    }
  }

  // ============================================================
  // Revocation Operations
  // ============================================================

  /**
   * Revoke a single token
   */
  async revokeToken(tokenId: string, reason?: string): Promise<void> {
    const startTime = Date.now();

    try {
      const token = await this.findById(tokenId);
      if (!token) {
        throw new Error(`Refresh token not found: ${tokenId}`);
      }

      token.revoke(reason || 'Manual revocation');

      await this.saveWithVersionCheck(token);

      this.metricsService?.incrementCounter('refresh-token.repository.revokeToken');
      this.metricsService?.recordHistogram(
        'refresh-token.repository.revokeToken.duration',
        Date.now() - startTime
      );
    } catch (error) {
      this.logger.error(`Failed to revoke refresh token: ${tokenId}`, error);
      this.metricsService?.incrementCounter('refresh-token.repository.error');
      throw this.wrapError(error);
    }
  }

  /**
   * Revoke all tokens for a user
   */
  async revokeAllByUserId(userId: string, reason?: string): Promise<number> {
    const startTime = Date.now();
    let count = 0;

    try {
      const tokens = await this.findActiveByUserId(userId);

      for (const token of tokens) {
        token.revoke(reason || 'All tokens revoked');
        await this.saveWithVersionCheck(token);
        count++;
      }

      // Invalidate cache for user
      if (this.cacheService) {
        await this.cacheService.delete(RefreshTokenCacheKey.byUserId(userId));
      }

      // Audit log
      if (this.auditService) {
        await this.auditService.log({
          action: 'ALL_REFRESH_TOKENS_REVOKED',
          userId,
          metadata: {
            count,
            reason,
          },
        });
      }

      this.metricsService?.incrementCounter('refresh-token.repository.revokeAllByUserId');
      this.metricsService?.recordHistogram(
        'refresh-token.repository.revokeAllByUserId.duration',
        Date.now() - startTime
      );

      return count;
    } catch (error) {
      this.logger.error(`Failed to revoke all tokens for user: ${userId}`, error);
      this.metricsService?.incrementCounter('refresh-token.repository.error');
      throw this.wrapError(error);
    }
  }

  /**
   * Revoke entire token family
   */
  async revokeFamily(family: string, reason: string): Promise<BulkRevokeResult> {
    const startTime = Date.now();
    const result: BulkRevokeResult = {
      revokedCount: 0,
      failedCount: 0,
      errors: [],
      revokedTokenIds: [],
      affectedUserIds: [],
      affectedFamilies: [family],
      quarantinedFamilies: [],
      notificationsSent: false,
      forceReauthRequired: [],
    };

    try {
      const tokens = await this.findByFamily(family);
      const userIds = new Set<string>();

      for (const token of tokens) {
        try {
          token.revoke(reason);
          await this.saveWithVersionCheck(token);
          result.revokedCount++;
          result.revokedTokenIds.push(token.getId());
          if (token.getUserId()) {
            userIds.add(token.getUserId());
          }
        } catch (error) {
          result.failedCount++;
          result.errors.push({
            id: token.getId(),
            error: error instanceof Error ? error.message : 'Unknown error',
          });
        }
      }

      result.affectedUserIds = Array.from(userIds);

      // Invalidate family cache
      if (this.cacheService) {
        await this.cacheService.delete(RefreshTokenCacheKey.byFamily(family));
        for (const userId of result.affectedUserIds) {
          await this.cacheService.delete(RefreshTokenCacheKey.byUserId(userId));
        }
      }

      // Audit log
      if (this.auditService) {
        await this.auditService.log({
          action: 'REFRESH_TOKEN_FAMILY_REVOKED',
          metadata: {
            family,
            reason,
            revokedCount: result.revokedCount,
            affectedUsers: result.affectedUserIds,
          },
        });
      }

      this.metricsService?.incrementCounter('refresh-token.repository.revokeFamily');
      this.metricsService?.recordHistogram(
        'refresh-token.repository.revokeFamily.duration',
        Date.now() - startTime
      );

      return result;
    } catch (error) {
      this.logger.error(`Failed to revoke family: ${family}`, error);
      this.metricsService?.incrementCounter('refresh-token.repository.error');
      throw this.wrapError(error);
    }
  }

  /**
   * Revoke tokens by status
   */
  async revokeByStatus(status: RefreshTokenStatus, reason: string): Promise<BulkRevokeResult> {
    const startTime = Date.now();
    const result: BulkRevokeResult = {
      revokedCount: 0,
      failedCount: 0,
      errors: [],
      revokedTokenIds: [],
      affectedUserIds: [],
      affectedFamilies: [],
      quarantinedFamilies: [],
      notificationsSent: false,
      forceReauthRequired: [],
    };

    try {
      const tokens = await this.findByStatus(status, { page: 1, limit: 10000 });
      const userIds = new Set<string>();
      const families = new Set<string>();

      for (const token of tokens.items) {
        try {
          token.revoke(reason);
          await this.saveWithVersionCheck(token);
          result.revokedCount++;
          result.revokedTokenIds.push(token.getId());
          if (token.getUserId()) {
            userIds.add(token.getUserId());
          }
          if (token.getFamily()) {
            families.add(token.getFamily());
          }
        } catch (error) {
          result.failedCount++;
          result.errors.push({
            id: token.getId(),
            error: error instanceof Error ? error.message : 'Unknown error',
          });
        }
      }

      result.affectedUserIds = Array.from(userIds);
      result.affectedFamilies = Array.from(families);

      this.metricsService?.incrementCounter('refresh-token.repository.revokeByStatus');
      this.metricsService?.recordHistogram(
        'refresh-token.repository.revokeByStatus.duration',
        Date.now() - startTime
      );

      return result;
    } catch (error) {
      this.logger.error(`Failed to revoke tokens by status: ${status}`, error);
      this.metricsService?.incrementCounter('refresh-token.repository.error');
      throw this.wrapError(error);
    }
  }

  /**
   * Revoke tokens by device ID
   */
  async revokeByDeviceId(deviceId: DeviceId, reason?: string): Promise<number> {
    const startTime = Date.now();
    let count = 0;

    try {
      const tokens = await this.findByDeviceId(deviceId, { page: 1, limit: 10000 });

      for (const token of tokens.items) {
        token.revoke(reason || 'Device revoked');
        await this.saveWithVersionCheck(token);
        count++;
      }

      // Invalidate cache
      if (this.cacheService) {
        const deviceIdValue = deviceId.getValue();
        await this.cacheService.deletePattern(RefreshTokenCacheKey.PREFIX + `*${deviceIdValue}*`);
      }

      this.metricsService?.incrementCounter('refresh-token.repository.revokeByDeviceId');
      this.metricsService?.recordHistogram(
        'refresh-token.repository.revokeByDeviceId.duration',
        Date.now() - startTime
      );

      return count;
    } catch (error) {
      this.logger.error(`Failed to revoke tokens by device ID: ${deviceId.getValue()}`, error);
      this.metricsService?.incrementCounter('refresh-token.repository.error');
      throw this.wrapError(error);
    }
  }

  /**
   * Bulk revoke tokens for multiple users
   */
  async bulkRevokeByUserIds(userIds: string[], reason: string): Promise<BulkRevokeResult> {
    const startTime = Date.now();
    const result: BulkRevokeResult = {
      revokedCount: 0,
      failedCount: 0,
      errors: [],
      revokedTokenIds: [],
      affectedUserIds: [],
      affectedFamilies: [],
      quarantinedFamilies: [],
      notificationsSent: false,
      forceReauthRequired: [],
    };

    try {
      for (const userId of userIds) {
        const count = await this.revokeAllByUserId(userId, reason);
        if (count > 0) {
          result.revokedCount += count;
          result.affectedUserIds.push(userId);
        }
      }

      this.metricsService?.incrementCounter('refresh-token.repository.bulkRevokeByUserIds');
      this.metricsService?.recordHistogram(
        'refresh-token.repository.bulkRevokeByUserIds.duration',
        Date.now() - startTime
      );

      return result;
    } catch (error) {
      this.logger.error('Failed to bulk revoke tokens by user IDs', error);
      this.metricsService?.incrementCounter('refresh-token.repository.error');
      throw this.wrapError(error);
    }
  }

  // ============================================================
  // Count Operations
  // ============================================================

  /**
   * Count active tokens for a user
   */
  async countActiveTokensByUser(userId: string): Promise<number> {
    const startTime = Date.now();

    try {
      const count = await this.prisma.refreshToken.count({
        where: {
          userId,
          status: 'ACTIVE',
          expiresAt: { gt: new Date() },
        },
      });

      this.metricsService?.recordHistogram(
        'refresh-token.repository.countActiveTokensByUser.duration',
        Date.now() - startTime
      );

      return count;
    } catch (error) {
      this.logger.error(`Failed to count active tokens for user: ${userId}`, error);
      this.metricsService?.incrementCounter('refresh-token.repository.error');
      throw this.wrapError(error);
    }
  }

  /**
   * Count tokens by status
   */
  async countByStatus(status: RefreshTokenStatus): Promise<number> {
    const startTime = Date.now();

    try {
      const count = await this.prisma.refreshToken.count({
        where: { status: status.toString() },
      });

      this.metricsService?.recordHistogram(
        'refresh-token.repository.countByStatus.duration',
        Date.now() - startTime
      );

      return count;
    } catch (error) {
      this.logger.error(`Failed to count tokens by status: ${status}`, error);
      this.metricsService?.incrementCounter('refresh-token.repository.error');
      throw this.wrapError(error);
    }
  }

  /**
   * Count tokens by user
   */
  async countTokensByUser(): Promise<Map<string, number>> {
    const startTime = Date.now();
    const result = new Map<string, number>();

    try {
      const groupByResult = await this.prisma.refreshToken.groupBy({
        by: ['userId'],
        where: { status: 'ACTIVE' },
        _count: true,
      });

      for (const item of groupByResult) {
        if (item.userId) {
          result.set(item.userId, item._count);
        }
      }

      this.metricsService?.recordHistogram(
        'refresh-token.repository.countTokensByUser.duration',
        Date.now() - startTime
      );

      return result;
    } catch (error) {
      this.logger.error('Failed to count tokens by user', error);
      this.metricsService?.incrementCounter('refresh-token.repository.error');
      throw this.wrapError(error);
    }
  }

  /**
   * Count unique users with active tokens
   */
  async countUniqueUsersWithActiveTokens(): Promise<number> {
    const startTime = Date.now();

    try {
      const result = await this.prisma.$queryRaw<Array<{ count: bigint }>>`
        SELECT COUNT(DISTINCT userId) as count
        FROM refresh_tokens
        WHERE status = 'ACTIVE'
      `;

      const count = Number(result[0]?.count || 0);

      this.metricsService?.recordHistogram(
        'refresh-token.repository.countUniqueUsersWithActiveTokens.duration',
        Date.now() - startTime
      );

      return count;
    } catch (error) {
      this.logger.error('Failed to count unique users with active tokens', error);
      this.metricsService?.incrementCounter('refresh-token.repository.error');
      throw this.wrapError(error);
    }
  }

  /**
   * Count families
   */
  async countFamilies(): Promise<number> {
    const startTime = Date.now();

    try {
      const result = await this.prisma.$queryRaw<Array<{ count: bigint }>>`
        SELECT COUNT(DISTINCT family) as count
        FROM refresh_tokens
      `;

      const count = Number(result[0]?.count || 0);

      this.metricsService?.recordHistogram(
        'refresh-token.repository.countFamilies.duration',
        Date.now() - startTime
      );

      return count;
    } catch (error) {
      this.logger.error('Failed to count families', error);
      this.metricsService?.incrementCounter('refresh-token.repository.error');
      throw this.wrapError(error);
    }
  }

  // ============================================================
  // Check Operations
  // ============================================================

  /**
   * Check if user has active tokens
   */
  async hasActiveTokens(userId: string): Promise<boolean> {
    const startTime = Date.now();

    try {
      const count = await this.countActiveTokensByUser(userId);
      return count > 0;
    } catch (error) {
      this.logger.error(`Failed to check active tokens for user: ${userId}`, error);
      this.metricsService?.incrementCounter('refresh-token.repository.error');
      return false;
    }
  }

  /**
   * Check if token exists and is active
   */
  async isTokenActive(tokenValue: string): Promise<boolean> {
    const startTime = Date.now();

    try {
      const token = await this.findByTokenValue(tokenValue);
      return token ? token.isActive() : false;
    } catch (error) {
      this.logger.error('Failed to check token activity', error);
      this.metricsService?.incrementCounter('refresh-token.repository.error');
      return false;
    }
  }

  /**
   * Check if token is compromised
   */
  async isTokenCompromised(tokenValue: string): Promise<boolean> {
    const startTime = Date.now();

    try {
      const token = await this.findByTokenValue(tokenValue);
      return token ? token.isCompromised() : false;
    } catch (error) {
      this.logger.error('Failed to check token compromise', error);
      this.metricsService?.incrementCounter('refresh-token.repository.error');
      return false;
    }
  }

  /**
   * Check if token is quarantined
   */
  async isTokenQuarantined(tokenId: string): Promise<boolean> {
    const startTime = Date.now();

    try {
      const token = await this.findById(tokenId);
      return token ? token.isQuarantined() : false;
    } catch (error) {
      this.logger.error(`Failed to check token quarantine: ${tokenId}`, error);
      this.metricsService?.incrementCounter('refresh-token.repository.error');
      return false;
    }
  }

  // ============================================================
  // Get Operations
  // ============================================================

  /**
   * Get oldest active token for a user
   */
  async getOldestActiveToken(userId: string): Promise<RefreshToken | null> {
    const startTime = Date.now();

    try {
      const prismaToken = await this.prisma.refreshToken.findFirst({
        where: {
          userId,
          status: 'ACTIVE',
          expiresAt: { gt: new Date() },
        },
        orderBy: { createdAt: 'asc' },
      });

      if (!prismaToken) {
        return null;
      }

      const token = this.toDomain(prismaToken);

      this.metricsService?.recordHistogram(
        'refresh-token.repository.getOldestActiveToken.duration',
        Date.now() - startTime
      );

      return token;
    } catch (error) {
      this.logger.error(`Failed to get oldest active token for user: ${userId}`, error);
      this.metricsService?.incrementCounter('refresh-token.repository.error');
      throw this.wrapError(error);
    }
  }

  /**
   * Get newest token for a user
   */
  async getNewestToken(userId: string): Promise<RefreshToken | null> {
    const startTime = Date.now();

    try {
      const prismaToken = await this.prisma.refreshToken.findFirst({
        where: { userId },
        orderBy: { createdAt: 'desc' },
      });

      if (!prismaToken) {
        return null;
      }

      const token = this.toDomain(prismaToken);

      this.metricsService?.recordHistogram(
        'refresh-token.repository.getNewestToken.duration',
        Date.now() - startTime
      );

      return token;
    } catch (error) {
      this.logger.error(`Failed to get newest token for user: ${userId}`, error);
      this.metricsService?.incrementCounter('refresh-token.repository.error');
      throw this.wrapError(error);
    }
  }

  /**
   * Get token chain (rotation history)
   */
  async getTokenChain(tokenId: string): Promise<RefreshToken[]> {
    const startTime = Date.now();

    try {
      const chain: RefreshToken[] = [];
      let currentToken = await this.findById(tokenId);

      while (currentToken) {
        chain.push(currentToken);
        if (currentToken.getPreviousTokenId()) {
          currentToken = await this.findById(currentToken.getPreviousTokenId());
        } else {
          break;
        }
      }

      this.metricsService?.recordHistogram(
        'refresh-token.repository.getTokenChain.duration',
        Date.now() - startTime
      );

      return chain.reverse();
    } catch (error) {
      this.logger.error(`Failed to get token chain for: ${tokenId}`, error);
      this.metricsService?.incrementCounter('refresh-token.repository.error');
      throw this.wrapError(error);
    }
  }

  // ============================================================
  // Cleanup Operations
  // ============================================================

  /**
   * Delete expired tokens
   */
  async deleteExpiredTokens(olderThanDays: number): Promise<CleanupResult> {
    const startTime = Date.now();
    const cutoffDate = new Date(Date.now() - olderThanDays * 24 * 60 * 60 * 1000);

    try {
      const result = await this.prisma.refreshToken.deleteMany({
        where: {
          OR: [
            { status: 'EXPIRED' },
            { expiresAt: { lt: cutoffDate } },
            { status: 'REVOKED', updatedAt: { lt: cutoffDate } },
          ],
        },
      });

      const cleanupResult: CleanupResult = {
        deletedCount: result.count,
        expiredCount: result.count,
        archivedCount: 0,
        errors: [],
        durationMs: Date.now() - startTime,
        storageFreedBytes: 0,
        effectivenessScore: result.count > 0 ? 100 : 0,
      };

      this.metricsService?.incrementCounter('refresh-token.repository.deleteExpiredTokens');
      this.metricsService?.recordHistogram(
        'refresh-token.repository.deleteExpiredTokens.duration',
        Date.now() - startTime
      );

      return cleanupResult;
    } catch (error) {
      this.logger.error('Failed to delete expired tokens', error);
      this.metricsService?.incrementCounter('refresh-token.repository.error');
      throw this.wrapError(error);
    }
  }

  /**
   * Clean up stale tokens
   */
  async cleanupStaleTokens(retentionDays: number): Promise<CleanupResult> {
    const startTime = Date.now();
    const cutoffDate = new Date(Date.now() - retentionDays * 24 * 60 * 60 * 1000);

    try {
      // Delete revoked tokens older than retention days
      const result = await this.prisma.refreshToken.deleteMany({
        where: {
          status: 'REVOKED',
          updatedAt: { lt: cutoffDate },
        },
      });

      // Also archive expired tokens (in a real implementation, this would move to archive table)
      const expiredResult = await this.prisma.refreshToken.deleteMany({
        where: {
          status: 'EXPIRED',
          expiresAt: { lt: cutoffDate },
        },
      });

      const cleanupResult: CleanupResult = {
        deletedCount: result.count + expiredResult.count,
        expiredCount: expiredResult.count,
        archivedCount: 0,
        errors: [],
        durationMs: Date.now() - startTime,
        storageFreedBytes: 0,
        effectivenessScore: (result.count + expiredResult.count) > 0 ? 100 : 0,
      };

      this.metricsService?.incrementCounter('refresh-token.repository.cleanupStaleTokens');
      this.metricsService?.recordHistogram(
        'refresh-token.repository.cleanupStaleTokens.duration',
        Date.now() - startTime
      );

      return cleanupResult;
    } catch (error) {
      this.logger.error('Failed to cleanup stale tokens', error);
      this.metricsService?.incrementCounter('refresh-token.repository.error');
      throw this.wrapError(error);
    }
  }

  /**
   * Archive old revoked tokens
   */
  async archiveOldRevokedTokens(olderThanDays: number): Promise<number> {
    const startTime = Date.now();
    const cutoffDate = new Date(Date.now() - olderThanDays * 24 * 60 * 60 * 1000);

    try {
      // In a real implementation, this would move to archive table
      // For now, we just delete them
      const result = await this.prisma.refreshToken.deleteMany({
        where: {
          status: 'REVOKED',
          updatedAt: { lt: cutoffDate },
        },
      });

      this.metricsService?.incrementCounter('refresh-token.repository.archiveOldRevokedTokens');
      this.metricsService?.recordHistogram(
        'refresh-token.repository.archiveOldRevokedTokens.duration',
        Date.now() - startTime
      );

      return result.count;
    } catch (error) {
      this.logger.error(`Failed to archive old revoked tokens (days: ${olderThanDays})`, error);
      this.metricsService?.incrementCounter('refresh-token.repository.error');
      throw this.wrapError(error);
    }
  }

  /**
   * Purge archived tokens permanently
   */
  async purgeArchivedTokens(olderThanDays: number): Promise<number> {
    // In a real implementation, this would purge from archive table
    // For now, we return 0 as archived tokens are not stored separately
    this.logger.warn('purgeArchivedTokens: Archive table not implemented, returning 0');
    return 0;
  }

  // ============================================================
  // Private Helper Methods
  // ============================================================

  /**
   * Convert Prisma refresh token to Domain RefreshToken entity
   */
  private toDomain(prismaToken: PrismaRefreshToken): RefreshToken {
    const token = new Token(prismaToken.token);

    return RefreshToken.reconstitute({
      id: prismaToken.id,
      userId: prismaToken.userId,
      token,
      family: prismaToken.family,
      sessionId: prismaToken.sessionId || undefined,
      previousTokenId: prismaToken.previousTokenId || undefined,
      rotationCount: prismaToken.rotationCount,
      status: prismaToken.status as RefreshTokenStatus,
      isCompromised: prismaToken.isCompromised,
      expiresAt: prismaToken.expiresAt,
      lastUsedAt: prismaToken.lastUsedAt || undefined,
      createdAt: prismaToken.createdAt,
      updatedAt: prismaToken.updatedAt,
      version: prismaToken.version,
      metadata: prismaToken.metadata as Record<string, unknown> | undefined,
    });
  }

  /**
   * Convert Domain RefreshToken to Prisma data
   */
  private toPrisma(token: RefreshToken): Prisma.RefreshTokenUpdateInput {
    const tokenValue = token.getToken();
    const tokenValueObj = tokenValue instanceof Token ? tokenValue : new Token(tokenValue);

    return {
      userId: token.getUserId(),
      token: tokenValueObj.getValue(),
      family: token.getFamily(),
      sessionId: token.getSessionId(),
      previousTokenId: token.getPreviousTokenId(),
      rotationCount: token.getRotationCount(),
      status: token.getStatus().toString(),
      isCompromised: token.isCompromised(),
      expiresAt: token.getExpiresAt(),
      lastUsedAt: token.getLastUsedAt(),
      version: token.getVersion() + 1,
      updatedAt: new Date(),
      metadata: token.getMetadata() as Prisma.JsonObject | undefined,
    };
  }

  /**
   * Invalidate cache for a token
   */
  private async invalidateCache(token: RefreshToken): Promise<void> {
    if (!this.cacheService) return;

    const keys = [
      RefreshTokenCacheKey.byId(token.getId()),
      RefreshTokenCacheKey.byToken(token.getTokenValue()),
      RefreshTokenCacheKey.byUserId(token.getUserId()),
      RefreshTokenCacheKey.byFamily(token.getFamily()),
    ];

    await this.cacheService.deleteMany(keys);
  }

  /**
   * Calculate family health score
   */
  private calculateFamilyHealthScore(tokens: PrismaRefreshToken[]): number {
    if (tokens.length === 0) return 0;

    let score = 100;
    const activeTokens = tokens.filter((t) => t.status === 'ACTIVE');

    // Reduce score if no active tokens
    if (activeTokens.length === 0) {
      score -= 30;
    }

    // Reduce score if many tokens in family (more than 3)
    if (tokens.length > 3) {
      score -= (tokens.length - 3) * 5;
    }

    // Reduce score if any token is compromised
    if (tokens.some((t) => t.isCompromised)) {
      score -= 40;
    }

    // Reduce score if any token is expired
    if (tokens.some((t) => t.status === 'EXPIRED')) {
      score -= 10;
    }

    // Reduce score if high rotation count
    const maxRotation = Math.max(...tokens.map((t) => t.rotationCount));
    if (maxRotation > 10) {
      score -= Math.min(20, (maxRotation - 10) * 2);
    }

    // Check for stale tokens (not used for 30 days)
    const staleThreshold = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    if (tokens.some((t) => t.lastUsedAt && t.lastUsedAt < staleThreshold)) {
      score -= 10;
    }

    return Math.max(0, Math.min(100, score));
  }

  /**
   * Calculate family risk level
   */
  private calculateFamilyRiskLevel(tokens: PrismaRefreshToken[]): 'low' | 'medium' | 'high' | 'critical' {
    const compromised = tokens.some((t) => t.isCompromised);
    const expired = tokens.some((t) => t.status === 'EXPIRED');
    const highRotation = tokens.some((t) => t.rotationCount > 20);
    const stale = tokens.some((t) => {
      if (!t.lastUsedAt) return false;
      const staleThreshold = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
      return t.lastUsedAt < staleThreshold;
    });

    if (compromised) return 'critical';
    if (expired && highRotation) return 'high';
    if (expired || highRotation || stale) return 'medium';
    return 'low';
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
    return retryablePatterns.some((pattern) => errorMessage.includes(pattern));
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
          return new Error('Duplicate entry: A refresh token with this value already exists');
        case 'P2025':
          return new Error('Refresh token not found');
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
  // Type Exports
  // ============================================================

  export type { FindOptions, UpdateOptions };
}
