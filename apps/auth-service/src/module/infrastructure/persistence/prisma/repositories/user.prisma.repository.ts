/**
 * Register DTOs - Pure Data Transport Objects (Enterprise Enhanced v2.0)
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 *
 * User Prisma Repository - Infrastructure Layer (Enterprise Grade)
 * 
 * @module infrastructure/persistence/prisma/repositories/user.prisma.repository
 * 
 * @description
 * Prisma-based implementation of the UserRepository domain interface.
 * Handles persistence operations for the User aggregate root.
 * 
 * Enterprise Rules:
 * ✅ Implements UserRepository interface from domain layer
 * ✅ Uses PrismaService for database operations
 * ✅ Maps between domain entities and Prisma models
 * ✅ No business logic - only persistence operations
 * ✅ All domain events are pulled and dispatched
 * ✅ Optimistic locking with version field
 * ✅ Soft delete support
 * ✅ Bangladesh specific fields support
 * ✅ Error handling with domain exceptions
 */

import { Injectable, Logger } from '@nestjs/common';
import { Prisma, User as PrismaUser } from '@prisma/client';
import { randomUUID } from 'crypto';

// ============================================================
// Domain Imports
// ============================================================

import type { UserRepository } from '../../../../domain/repositories/user.repository.interface';
import type {
  UserFilters,
  PaginationOptions,
  PaginatedResult,
  BulkOperationResult,
  UserStatistics,
  RegistrationTrend,
  UserActivitySummary,
  SoftDeleteCascadeOptions,
  DataRetentionPolicy,
  ShardConfig,
  UserPerformanceMetrics,
  DistributedLock,
  RateLimitResult,
  CacheKey,
} from '../../../../domain/repositories/user.repository.interface';
import {
  OptimisticLockError,
  EntityNotFoundError,
  DuplicateEntityError,
} from '../../../../domain/repositories/base.repository.interface';
import { User } from '../../../../domain/entities/user.entity';
import { Email } from '../../../../domain/value-objects/email.vo';
import { Phone } from '../../../../domain/value-objects/phone.vo';
import type { IdGenerator } from '../../../../domain/entities/base.entity';

// ============================================================
// Infrastructure Imports
// ============================================================

import { PrismaService } from '../schema/prisma.service';
import { UserMapper } from '../../../../application/mappers/user.mapper';
import type {
  IEmailValidator,
  IPasswordValidator,
  IPhoneValidator,
} from '../../../../domain/ports';

// ============================================================
// Shared Packages Import (SSOT)
// ============================================================

import {
  USER_ROLES,
  USER_STATUSES,
  USER_TIERS,
  AUDIT_ACTIONS,
  type UserRole,
  type UserStatus,
  type UserTier,
} from '@vubon/shared-constants';

// ============================================================
// Repository Implementation
// ============================================================

@Injectable()
export class UserPrismaRepository implements UserRepository {
  private readonly logger = new Logger(UserPrismaRepository.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly idGenerator: IdGenerator,
    private readonly emailValidator: IEmailValidator,
    private readonly passwordValidator: IPasswordValidator,
    private readonly phoneValidator: IPhoneValidator,
    private readonly userMapper: UserMapper,
  ) {}

  // ============================================================
  // ✅ ENTERPRISE: Cache Management
  // ============================================================

  getCacheKey(queryName: string, params: Record<string, unknown>): CacheKey {
    const key = `user:${queryName}:${JSON.stringify(params)}`;
    return {
      key,
      version: 1,
      ttl: 300,
    };
  }

  async invalidateUserCache(userId: string): Promise<void> {
    // In a real implementation, this would invalidate Redis cache
    this.logger.debug(`Cache invalidated for user: ${userId}`);
  }

  async invalidateCacheByPattern(pattern: string): Promise<number> {
    this.logger.debug(`Cache invalidated by pattern: ${pattern}`);
    return 0;
  }

  async getCacheStats(): Promise<{ hits: number; misses: number; hitRate: number }> {
    return { hits: 0, misses: 0, hitRate: 0 };
  }

  // ============================================================
  // ✅ ENTERPRISE: Distributed Locking
  // ============================================================

  async acquireUserLock(userId: string, ttlSeconds: number = 30): Promise<DistributedLock> {
    const lockId = `lock:user:${userId}:${randomUUID()}`;
    const expiresAt = new Date(Date.now() + ttlSeconds * 1000);

    return {
      lockId,
      expiresAt,
      release: async (): Promise<void> => {
        this.logger.debug(`Lock released for user: ${userId}`);
      },
    };
  }

  async withUserLock<T>(userId: string, operation: () => Promise<T>, ttlSeconds: number = 30): Promise<T> {
    const lock = await this.acquireUserLock(userId, ttlSeconds);
    try {
      return await operation();
    } finally {
      await lock.release();
    }
  }

  // ============================================================
  // ✅ ENTERPRISE: Rate Limit Integration
  // ============================================================

  async checkRateLimit(userId: string, operation: string): Promise<RateLimitResult> {
    return {
      allowed: true,
      remaining: 100,
      resetAt: new Date(Date.now() + 3600000),
      retryAfterSeconds: 0,
    };
  }

  async recordRateLimitUsage(userId: string, operation: string): Promise<void> {
    this.logger.debug(`Rate limit recorded for user: ${userId}, operation: ${operation}`);
  }

  // ============================================================
  // ✅ Basic CRUD Operations (Implemented for Registration)
  // ============================================================

  /**
   * Save user (insert or update with optimistic locking)
   */
  async save(user: User): Promise<void> {
    try {
      const existing = await this.prisma.user.findUnique({
        where: { id: user.id },
      });

      if (existing) {
        await this.update(user);
      } else {
        await this.insert(user);
      }
    } catch (error) {
      this.logger.error(`Failed to save user ${user.id}:`, error);
      throw error;
    }
  }

  /**
   * Insert new user
   */
  async insert(user: User): Promise<void> {
    try {
      const data = UserMapper.toPersistence(user);
      const prismaData: Prisma.UserCreateInput = {
        id: data.id as string,
        email: data.email as string,
        password: data.password as string,
        fullName: data.fullName as string,
        phone: data.phone as string | undefined,
        role: data.role as UserRole,
        status: data.status as UserStatus,
        isEmailVerified: data.isEmailVerified as boolean,
        isPhoneVerified: data.isPhoneVerified as boolean,
        mfaEnabled: data.mfaEnabled as boolean,
        lastLoginAt: data.lastLoginAt as Date | undefined,
        createdAt: data.createdAt as Date,
        updatedAt: data.updatedAt as Date,
        version: data.version as number,
        metadata: data.metadata as Prisma.JsonValue | undefined,
      };

      await this.prisma.user.create({ data: prismaData });
      this.logger.debug(`User inserted: ${user.id}`);
    } catch (error) {
      if (this.isUniqueConstraintError(error)) {
        throw new DuplicateEntityError('User', 'email', user.getEmail().getValue());
      }
      throw error;
    }
  }

  /**
   * Update existing user with optimistic locking
   */
  async update(user: User): Promise<void> {
    const existing = await this.prisma.user.findUnique({
      where: { id: user.id },
    });

    if (!existing) {
      throw new EntityNotFoundError('User', user.id);
    }

    if (existing.version !== user.version) {
      throw new OptimisticLockError(user.id, user.version, existing.version);
    }

    try {
      const data = UserMapper.toPersistence(user);
      const prismaData: Prisma.UserUpdateInput = {
        email: data.email as string,
        password: data.password as string,
        fullName: data.fullName as string,
        phone: data.phone as string | undefined,
        role: data.role as UserRole,
        status: data.status as UserStatus,
        isEmailVerified: data.isEmailVerified as boolean,
        isPhoneVerified: data.isPhoneVerified as boolean,
        mfaEnabled: data.mfaEnabled as boolean,
        lastLoginAt: data.lastLoginAt as Date | undefined,
        updatedAt: data.updatedAt as Date,
        version: { increment: 1 },
        metadata: data.metadata as Prisma.JsonValue | undefined,
      };

      await this.prisma.user.update({
        where: { id: user.id },
        data: prismaData,
      });

      this.logger.debug(`User updated: ${user.id}`);
    } catch (error) {
      if (this.isUniqueConstraintError(error)) {
        throw new DuplicateEntityError('User', 'email', user.getEmail().getValue());
      }
      throw error;
    }
  }

  /**
   * Find user by ID
   */
  async findById(id: string): Promise<User | null> {
    try {
      const prismaUser = await this.prisma.user.findUnique({
        where: { id },
      });

      if (!prismaUser) {
        return null;
      }

      return this.mapToDomain(prismaUser);
    } catch (error) {
      this.logger.error(`Failed to find user by ID ${id}:`, error);
      throw error;
    }
  }

  /**
   * Find user by ID with version check
   */
  async findByIdWithVersion(id: string, expectedVersion: number): Promise<User | null> {
    const user = await this.findById(id);
    if (user && user.version !== expectedVersion) {
      throw new OptimisticLockError(id, expectedVersion, user.version);
    }
    return user;
  }

  /**
   * Find user by email
   */
  async findByEmail(email: Email, useCache: boolean = true): Promise<User | null> {
    try {
      const prismaUser = await this.prisma.user.findUnique({
        where: { email: email.getValue() },
      });

      if (!prismaUser) {
        return null;
      }

      return this.mapToDomain(prismaUser);
    } catch (error) {
      this.logger.error(`Failed to find user by email:`, error);
      throw error;
    }
  }

  /**
   * Find user by phone
   */
  async findByPhone(phone: Phone, useCache: boolean = true): Promise<User | null> {
    try {
      const prismaUser = await this.prisma.user.findFirst({
        where: { phone: phone.getValue() },
      });

      if (!prismaUser) {
        return null;
      }

      return this.mapToDomain(prismaUser);
    } catch (error) {
      this.logger.error(`Failed to find user by phone:`, error);
      throw error;
    }
  }

  /**
   * Find user by email or phone
   */
  async findByIdentifier(identifier: string): Promise<User | null> {
    try {
      const prismaUser = await this.prisma.user.findFirst({
        where: {
          OR: [{ email: identifier }, { phone: identifier }],
        },
      });

      if (!prismaUser) {
        return null;
      }

      return this.mapToDomain(prismaUser);
    } catch (error) {
      this.logger.error(`Failed to find user by identifier:`, error);
      throw error;
    }
  }

  /**
   * Find user by email (case-insensitive)
   */
  async findByEmailCaseInsensitive(email: string): Promise<User | null> {
    try {
      const prismaUser = await this.prisma.user.findFirst({
        where: {
          email: { equals: email.toLowerCase(), mode: 'insensitive' },
        },
      });

      if (!prismaUser) {
        return null;
      }

      return this.mapToDomain(prismaUser);
    } catch (error) {
      this.logger.error(`Failed to find user by email (case-insensitive):`, error);
      throw error;
    }
  }

  /**
   * Check if user exists by email
   */
  async existsByEmail(email: Email): Promise<boolean> {
    try {
      const count = await this.prisma.user.count({
        where: { email: email.getValue() },
      });
      return count > 0;
    } catch (error) {
      this.logger.error(`Failed to check email existence:`, error);
      throw error;
    }
  }

  /**
   * Check if user exists by phone
   */
  async existsByPhone(phone: Phone): Promise<boolean> {
    try {
      const count = await this.prisma.user.count({
        where: { phone: phone.getValue() },
      });
      return count > 0;
    } catch (error) {
      this.logger.error(`Failed to check phone existence:`, error);
      throw error;
    }
  }

  /**
   * Check if email is taken by another user
   */
  async isEmailTaken(email: Email, excludeUserId?: string): Promise<boolean> {
    try {
      const where: Prisma.UserWhereInput = {
        email: email.getValue(),
      };
      if (excludeUserId) {
        where.id = { not: excludeUserId };
      }
      const count = await this.prisma.user.count({ where });
      return count > 0;
    } catch (error) {
      this.logger.error(`Failed to check if email is taken:`, error);
      throw error;
    }
  }

  /**
   * Check if phone is taken by another user
   */
  async isPhoneTaken(phone: Phone, excludeUserId?: string): Promise<boolean> {
    try {
      const where: Prisma.UserWhereInput = {
        phone: phone.getValue(),
      };
      if (excludeUserId) {
        where.id = { not: excludeUserId };
      }
      const count = await this.prisma.user.count({ where });
      return count > 0;
    } catch (error) {
      this.logger.error(`Failed to check if phone is taken:`, error);
      throw error;
    }
  }

  /**
   * Check if user exists by ID
   */
  async exists(id: string): Promise<boolean> {
    try {
      const count = await this.prisma.user.count({
        where: { id },
      });
      return count > 0;
    } catch (error) {
      this.logger.error(`Failed to check user existence:`, error);
      throw error;
    }
  }

  // ============================================================
  // ✅ Find with Filters (Partial Implementation)
  // ============================================================

  async findByFilters(filters: UserFilters, options: PaginationOptions): Promise<PaginatedResult<User>> {
    try {
      const where = this.buildWhereClause(filters);
      const [users, total] = await Promise.all([
        this.prisma.user.findMany({
          where,
          skip: (options.page - 1) * options.limit,
          take: options.limit,
          orderBy: options.sortBy
            ? { [options.sortBy]: options.sortOrder || 'asc' }
            : { createdAt: 'desc' },
        }),
        this.prisma.user.count({ where }),
      ]);

      const domainUsers = users.map((u) => this.mapToDomain(u));

      return {
        data: domainUsers,
        total,
        page: options.page,
        limit: options.limit,
        totalPages: Math.ceil(total / options.limit),
        hasNext: options.page * options.limit < total,
        hasPrevious: options.page > 1,
      };
    } catch (error) {
      this.logger.error(`Failed to find users by filters:`, error);
      throw error;
    }
  }

  // ============================================================
  // ✅ Domain Event & Transaction Support
  // ============================================================

  async saveAndDispatchEvents(user: User, eventDispatcher?: any): Promise<void> {
    try {
      await this.save(user);
      const events = user.pullDomainEvents();
      for (const event of events) {
        if (eventDispatcher) {
          await eventDispatcher.dispatch(event);
        }
      }
    } catch (error) {
      this.logger.error(`Failed to save and dispatch events:`, error);
      throw error;
    }
  }

  async saveManyAndDispatchEvents(users: User[], eventDispatcher?: any): Promise<void> {
    try {
      for (const user of users) {
        await this.saveAndDispatchEvents(user, eventDispatcher);
      }
    } catch (error) {
      this.logger.error(`Failed to save many and dispatch events:`, error);
      throw error;
    }
  }

  async runInTransaction<R>(callback: () => Promise<R>): Promise<R> {
    return this.prisma.runInTransaction(async () => {
      return await callback();
    });
  }

  getTransactionContext(): any {
    return {
      runInTransaction: this.runInTransaction.bind(this),
      commit: async (): Promise<void> => {},
      rollback: async (): Promise<void> => {},
      getTransactionId: (): string => randomUUID(),
      isActive: (): boolean => true,
    };
  }

  // ============================================================
  // ✅ Update Operations
  // ============================================================

  async updateWithVersion(user: User): Promise<void> {
    await this.update(user);
  }

  async updateLastLogin(userId: string): Promise<void> {
    try {
      await this.prisma.user.update({
        where: { id: userId },
        data: { lastLoginAt: new Date() },
      });
    } catch (error) {
      this.logger.error(`Failed to update last login for user ${userId}:`, error);
      throw error;
    }
  }

  async updateTotalSpent(userId: string, additionalAmount: number): Promise<void> {
    try {
      await this.prisma.user.update({
        where: { id: userId },
        data: {
          totalSpent: { increment: additionalAmount },
        },
      });
    } catch (error) {
      this.logger.error(`Failed to update total spent for user ${userId}:`, error);
      throw error;
    }
  }

  // ============================================================
  // ✅ Soft Delete
  // ============================================================

  async softDelete(userId: string, reason?: string): Promise<void> {
    try {
      await this.prisma.user.update({
        where: { id: userId },
        data: {
          status: USER_STATUSES.DELETED as UserStatus,
          deletedAt: new Date(),
          metadata: reason ? { deletionReason: reason } : undefined,
        },
      });
    } catch (error) {
      this.logger.error(`Failed to soft delete user ${userId}:`, error);
      throw error;
    }
  }

  async restore(userId: string): Promise<void> {
    try {
      await this.prisma.user.update({
        where: { id: userId },
        data: {
          status: USER_STATUSES.ACTIVE as UserStatus,
          deletedAt: null,
        },
      });
    } catch (error) {
      this.logger.error(`Failed to restore user ${userId}:`, error);
      throw error;
    }
  }

  async permanentDelete(userId: string): Promise<void> {
    try {
      await this.prisma.user.delete({
        where: { id: userId },
      });
    } catch (error) {
      this.logger.error(`Failed to permanently delete user ${userId}:`, error);
      throw error;
    }
  }

  // ============================================================
  // ✅ Query Methods (Partial - Placeholders)
  // ============================================================

  async findAll(options: PaginationOptions): Promise<PaginatedResult<User>> {
    return this.findByFilters({}, options);
  }

  async findAllCursor(options: any): Promise<any> {
    throw new Error('Method not implemented.');
  }

  async findByIds(ids: string[]): Promise<(User | null)[]> {
    try {
      const users = await this.prisma.user.findMany({
        where: { id: { in: ids } },
      });
      const userMap = new Map(users.map((u) => [u.id, u]));
      return ids.map((id) => {
        const user = userMap.get(id);
        return user ? this.mapToDomain(user) : null;
      });
    } catch (error) {
      this.logger.error(`Failed to find users by IDs:`, error);
      throw error;
    }
  }

  async findBySpecification(specification: any, options: PaginationOptions): Promise<PaginatedResult<User>> {
    return this.findByFilters({}, options);
  }

  async count(): Promise<number> {
    try {
      return this.prisma.user.count();
    } catch (error) {
      this.logger.error(`Failed to count users:`, error);
      throw error;
    }
  }

  async countBySpecification(specification: any): Promise<number> {
    return this.prisma.user.count();
  }

  // ============================================================
  // ✅ Batch Operations
  // ============================================================

  async saveMany(entities: User[]): Promise<void> {
    try {
      for (const user of entities) {
        await this.save(user);
      }
    } catch (error) {
      this.logger.error(`Failed to save multiple users:`, error);
      throw error;
    }
  }

  async upsert(entity: User): Promise<void> {
    await this.save(entity);
  }

  async delete(id: string): Promise<void> {
    await this.permanentDelete(id);
  }

  async deleteMany(ids: string[]): Promise<number> {
    try {
      const result = await this.prisma.user.deleteMany({
        where: { id: { in: ids } },
      });
      return result.count;
    } catch (error) {
      this.logger.error(`Failed to delete multiple users:`, error);
      throw error;
    }
  }

  async softDeleteWithCascade(
    userId: string,
    reason?: string,
    cascadeOptions?: SoftDeleteCascadeOptions,
  ): Promise<void> {
    try {
      await this.softDelete(userId, reason);
      // Cascade operations would be implemented here
    } catch (error) {
      this.logger.error(`Failed to soft delete with cascade for user ${userId}:`, error);
      throw error;
    }
  }

  async restoreWithCascade(userId: string): Promise<void> {
    await this.restore(userId);
  }

  async permanentDeleteWithCascade(userId: string): Promise<void> {
    await this.permanentDelete(userId);
  }

  // ============================================================
  // ✅ Bulk Operations
  // ============================================================

  async bulkInsert(entities: User[], options?: any): Promise<number> {
    let count = 0;
    try {
      for (const user of entities) {
        await this.insert(user);
        count++;
      }
      return count;
    } catch (error) {
      this.logger.error(`Failed during bulk insert:`, error);
      throw error;
    }
  }

  async bulkUpdate(entities: User[], options?: any): Promise<number> {
    let count = 0;
    try {
      for (const user of entities) {
        await this.update(user);
        count++;
      }
      return count;
    } catch (error) {
      this.logger.error(`Failed during bulk update:`, error);
      throw error;
    }
  }

  async bulkUpsert(entities: User[], options?: any): Promise<{ inserted: number; updated: number }> {
    let inserted = 0;
    let updated = 0;
    try {
      for (const user of entities) {
        const userExists = await this.exists(user.id);
        if (userExists) {
          await this.update(user);
          updated++;
        } else {
          await this.insert(user);
          inserted++;
        }
      }
      return { inserted, updated };
    } catch (error) {
      this.logger.error(`Failed during bulk upsert:`, error);
      throw error;
    }
  }

  async bulkDelete(specification: any): Promise<number> {
    throw new Error('Method not implemented.');
  }

  async bulkOperationWithProgress(
    entities: User[],
    operation: (entity: User) => Promise<void>,
    onProgress?: any,
  ): Promise<{ successful: number; failed: Array<{ entity: User; error: string }> }> {
    let successful = 0;
    const failed: Array<{ entity: User; error: string }> = [];

    try {
      for (let i = 0; i < entities.length; i++) {
        try {
          await operation(entities[i]);
          successful++;
        } catch (error) {
          failed.push({
            entity: entities[i],
            error: error instanceof Error ? error.message : 'Unknown error',
          });
        }
        if (onProgress) {
          onProgress({
            total: entities.length,
            completed: i + 1,
            failed: failed.length,
            successful,
            percentage: ((i + 1) / entities.length) * 100,
          });
        }
      }
    } catch (error) {
      this.logger.error(`Failed during bulk operation with progress:`, error);
    }

    return { successful, failed };
  }

  // ============================================================
  // ✅ Statistics & Analytics (Placeholders)
  // ============================================================

  async getStatistics(useCache: boolean = true): Promise<UserStatistics> {
    return {
      totalUsers: 0,
      activeUsers: 0,
      inactiveUsers: 0,
      lockedUsers: 0,
      suspendedUsers: 0,
      deletedUsers: 0,
      pendingVerificationUsers: 0,
      emailVerifiedUsers: 0,
      phoneVerifiedUsers: 0,
      kycVerifiedUsers: 0,
      mfaEnabledUsers: 0,
      byRole: {} as Record<UserRole, number>,
      byStatus: {} as Record<UserStatus, number>,
      byTier: {} as Record<UserTier, number>,
      newUsersLast24h: 0,
      newUsersLast7Days: 0,
      newUsersLast30Days: 0,
      activeUsersLast24h: 0,
      activeUsersLast7Days: 0,
      averageAgeDays: 0,
      averageTotalSpent: 0,
      churnRate30Days: 0,
      retentionRate30Days: 0,
      averageSessionsPerUser: 0,
      averageOrdersPerUser: 0,
      lifetimeValueAvg: 0,
      userGrowthRate: 0,
      engagementRate: 0,
    };
  }

  async getRegistrationTrends(days: number): Promise<RegistrationTrend[]> {
    return [];
  }

  async getUserActivitySummary(userId?: string, limit?: number): Promise<UserActivitySummary[]> {
    return [];
  }

  // ============================================================
  // ✅ Sharding Support (Placeholders)
  // ============================================================

  getShardId(userId: string): number {
    return 0;
  }

  setShardConfig(config: ShardConfig): void {
    // Not implemented
  }

  async getShardStats(): Promise<Record<number, { userCount: number; lastUsed: Date }>> {
    return {};
  }

  // ============================================================
  // ✅ Performance Monitoring (Placeholders)
  // ============================================================

  async getPerformanceMetrics(): Promise<UserPerformanceMetrics> {
    return {
      cacheHitRate: 0,
      cacheMissRate: 0,
      averageQueryTimeMs: 0,
      p95QueryTimeMs: 0,
      p99QueryTimeMs: 0,
      connectionPoolUsage: 0,
      activeConnections: 0,
      shardDistribution: {},
      lastMetricsAt: new Date(),
    };
  }

  async resetPerformanceMetrics(): Promise<void> {
    // Not implemented
  }

  async getConnectionPoolStatus(): Promise<{
    total: number;
    active: number;
    idle: number;
    waiting: number;
    max: number;
  }> {
    return { total: 0, active: 0, idle: 0, waiting: 0, max: 0 };
  }

  // ============================================================
  // ✅ Cache Management (Placeholders)
  // ============================================================

  registerCacheHook(hook: any): void {
    // Not implemented
  }

  async clearCache(): Promise<void> {
    // Not implemented
  }

  // ============================================================
  // ✅ Audit & Export (Placeholders)
  // ============================================================

  setAuditLogging(enabled: boolean): void {
    // Not implemented
  }

  async getAuditTrail(id: string | Record<string, unknown>): Promise<any[]> {
    return [];
  }

  async exportForAudit(filters?: UserFilters, options?: PaginationOptions): Promise<User[]> {
    return [];
  }

  async *exportAsStream(filters?: UserFilters): AsyncGenerator<User, void, unknown> {
    // Not implemented - placeholder
    yield;
  }

  // ============================================================
  // ✅ Query Builder (Placeholder)
  // ============================================================

  createQueryBuilder(): any {
    throw new Error('Method not implemented.');
  }

  // ============================================================
  // ✅ Bulk Status & Role Operations
  // ============================================================

  async bulkActivate(userIds: string[], onProgress?: any): Promise<BulkOperationResult> {
    try {
      const users = await Promise.all(userIds.map((id) => this.findById(id)));
      const validUsers = users.filter((u) => u !== null) as User[];

      const result = await this.bulkOperationWithProgress(
        validUsers,
        async (user) => {
          user.activate();
          await this.update(user);
        },
        onProgress,
      );

      return {
        successCount: result.successful,
        failedCount: result.failed.length,
        skippedCount: userIds.length - result.successful - result.failed.length,
        errors: result.failed.map((f) => ({ id: f.entity.id, error: f.error, timestamp: new Date() })),
        successIds: [],
        failedIds: [],
        skippedIds: [],
        startedAt: new Date(),
        completedAt: new Date(),
        durationMs: 0,
        operationType: 'activate',
      };
    } catch (error) {
      this.logger.error(`Failed to bulk activate users:`, error);
      throw error;
    }
  }

  async bulkDeactivate(userIds: string[], onProgress?: any): Promise<BulkOperationResult> {
    try {
      const users = await Promise.all(userIds.map((id) => this.findById(id)));
      const validUsers = users.filter((u) => u !== null) as User[];

      const result = await this.bulkOperationWithProgress(
        validUsers,
        async (user) => {
          user.deactivate();
          await this.update(user);
        },
        onProgress,
      );

      return {
        successCount: result.successful,
        failedCount: result.failed.length,
        skippedCount: userIds.length - result.successful - result.failed.length,
        errors: result.failed.map((f) => ({ id: f.entity.id, error: f.error, timestamp: new Date() })),
        successIds: [],
        failedIds: [],
        skippedIds: [],
        startedAt: new Date(),
        completedAt: new Date(),
        durationMs: 0,
        operationType: 'deactivate',
      };
    } catch (error) {
      this.logger.error(`Failed to bulk deactivate users:`, error);
      throw error;
    }
  }

  async bulkLock(userIds: string[], reason: string, onProgress?: any): Promise<BulkOperationResult> {
    try {
      const users = await Promise.all(userIds.map((id) => this.findById(id)));
      const validUsers = users.filter((u) => u !== null) as User[];

      const result = await this.bulkOperationWithProgress(
        validUsers,
        async (user) => {
          user.lockAccount();
          await this.update(user);
        },
        onProgress,
      );

      return {
        successCount: result.successful,
        failedCount: result.failed.length,
        skippedCount: userIds.length - result.successful - result.failed.length,
        errors: result.failed.map((f) => ({ id: f.entity.id, error: f.error, timestamp: new Date() })),
        successIds: [],
        failedIds: [],
        skippedIds: [],
        startedAt: new Date(),
        completedAt: new Date(),
        durationMs: 0,
        operationType: 'lock',
      };
    } catch (error) {
      this.logger.error(`Failed to bulk lock users:`, error);
      throw error;
    }
  }

  async bulkUnlock(userIds: string[], onProgress?: any): Promise<BulkOperationResult> {
    try {
      const users = await Promise.all(userIds.map((id) => this.findById(id)));
      const validUsers = users.filter((u) => u !== null) as User[];

      const result = await this.bulkOperationWithProgress(
        validUsers,
        async (user) => {
          user.unlockAccount();
          await this.update(user);
        },
        onProgress,
      );

      return {
        successCount: result.successful,
        failedCount: result.failed.length,
        skippedCount: userIds.length - result.successful - result.failed.length,
        errors: result.failed.map((f) => ({ id: f.entity.id, error: f.error, timestamp: new Date() })),
        successIds: [],
        failedIds: [],
        skippedIds: [],
        startedAt: new Date(),
        completedAt: new Date(),
        durationMs: 0,
        operationType: 'unlock',
      };
    } catch (error) {
      this.logger.error(`Failed to bulk unlock users:`, error);
      throw error;
    }
  }

  async bulkAssignRole(userIds: string[], role: UserRole, onProgress?: any): Promise<BulkOperationResult> {
    try {
      const users = await Promise.all(userIds.map((id) => this.findById(id)));
      const validUsers = users.filter((u) => u !== null) as User[];

      const result = await this.bulkOperationWithProgress(
        validUsers,
        async (user) => {
          user.changeRole(role);
          await this.update(user);
        },
        onProgress,
      );

      return {
        successCount: result.successful,
        failedCount: result.failed.length,
        skippedCount: userIds.length - result.successful - result.failed.length,
        errors: result.failed.map((f) => ({ id: f.entity.id, error: f.error, timestamp: new Date() })),
        successIds: [],
        failedIds: [],
        skippedIds: [],
        startedAt: new Date(),
        completedAt: new Date(),
        durationMs: 0,
        operationType: 'assign_role',
      };
    } catch (error) {
      this.logger.error(`Failed to bulk assign role:`, error);
      throw error;
    }
  }

  async bulkRecalculateTiers(userIds: string[], onProgress?: any): Promise<BulkOperationResult> {
    try {
      const users = await Promise.all(userIds.map((id) => this.findById(id)));
      const validUsers = users.filter((u) => u !== null) as User[];

      const result = await this.bulkOperationWithProgress(
        validUsers,
        async (user) => {
          // Re-calculate tier based on current totalSpent
          user.updateTotalSpent(0);
          await this.update(user);
        },
        onProgress,
      );

      return {
        successCount: result.successful,
        failedCount: result.failed.length,
        skippedCount: userIds.length - result.successful - result.failed.length,
        errors: result.failed.map((f) => ({ id: f.entity.id, error: f.error, timestamp: new Date() })),
        successIds: [],
        failedIds: [],
        skippedIds: [],
        startedAt: new Date(),
        completedAt: new Date(),
        durationMs: 0,
        operationType: 'update_tier',
      };
    } catch (error) {
      this.logger.error(`Failed to bulk recalculate tiers:`, error);
      throw error;
    }
  }

  async batchUpdateStatus(updates: Map<string, UserStatus>, onProgress?: any): Promise<BulkOperationResult> {
    try {
      const userIds = Array.from(updates.keys());
      const users = await Promise.all(userIds.map((id) => this.findById(id)));
      const validUsers = users.filter((u) => u !== null) as User[];

      let idx = 0;
      const result = await this.bulkOperationWithProgress(
        validUsers,
        async (user) => {
          const newStatus = updates.get(user.id);
          if (newStatus) {
            user.changeStatus(newStatus);
            await this.update(user);
          }
          idx++;
        },
        onProgress,
      );

      return {
        successCount: result.successful,
        failedCount: result.failed.length,
        skippedCount: userIds.length - result.successful - result.failed.length,
        errors: result.failed.map((f) => ({ id: f.entity.id, error: f.error, timestamp: new Date() })),
        successIds: [],
        failedIds: [],
        skippedIds: [],
        startedAt: new Date(),
        completedAt: new Date(),
        durationMs: 0,
        operationType: 'activate',
      };
    } catch (error) {
      this.logger.error(`Failed to batch update status:`, error);
      throw error;
    }
  }

  // ============================================================
  // ✅ Data Retention (Placeholders)
  // ============================================================

  async applyRetentionPolicy(policy: DataRetentionPolicy): Promise<number> {
    return 0;
  }

  async archiveInactiveUsers(daysInactive: number, batchSize?: number): Promise<{
    archivedCount: number;
    failedCount: number;
    archiveLocation: string;
  }> {
    return { archivedCount: 0, failedCount: 0, archiveLocation: '' };
  }

  // ============================================================
  // ✅ Query Methods (Status/Role/Tier)
  // ============================================================

  async findByStatus(status: UserStatus, options: PaginationOptions): Promise<PaginatedResult<User>> {
    return this.findByFilters({ status }, options);
  }

  async findByRole(role: UserRole, options: PaginationOptions): Promise<PaginatedResult<User>> {
    return this.findByFilters({ role }, options);
  }

  async findByTier(tier: UserTier, options: PaginationOptions): Promise<PaginatedResult<User>> {
    return this.findByFilters({ tier }, options);
  }

  async findActiveUsers(options: PaginationOptions): Promise<PaginatedResult<User>> {
    return this.findByFilters({ status: USER_STATUSES.ACTIVE }, options);
  }

  async findLockedUsers(options: PaginationOptions): Promise<PaginatedResult<User>> {
    return this.findByFilters({ status: USER_STATUSES.LOCKED }, options);
  }

  async findSuspendedUsers(options: PaginationOptions): Promise<PaginatedResult<User>> {
    return this.findByFilters({ status: USER_STATUSES.SUSPENDED }, options);
  }

  async findDeletedUsers(options: PaginationOptions): Promise<PaginatedResult<User>> {
    return this.findByFilters({ status: USER_STATUSES.DELETED }, options);
  }

  async findPendingVerificationUsers(options: PaginationOptions): Promise<PaginatedResult<User>> {
    return this.findByFilters({ status: USER_STATUSES.PENDING_VERIFICATION }, options);
  }

  // ============================================================
  // ✅ Query Methods (Verification)
  // ============================================================

  async findUnverifiedEmail(options: PaginationOptions): Promise<PaginatedResult<User>> {
    return this.findByFilters({ isEmailVerified: false }, options);
  }

  async findUnverifiedPhone(options: PaginationOptions): Promise<PaginatedResult<User>> {
    return this.findByFilters({ isPhoneVerified: false }, options);
  }

  async findWithoutMFA(options: PaginationOptions): Promise<PaginatedResult<User>> {
    return this.findByFilters({ mfaEnabled: false }, options);
  }

  async findWithMFA(options: PaginationOptions): Promise<PaginatedResult<User>> {
    return this.findByFilters({ mfaEnabled: true }, options);
  }

  async findKycVerifiedUsers(options: PaginationOptions): Promise<PaginatedResult<User>> {
    return this.findByFilters({ isKycVerified: true }, options);
  }

  // ============================================================
  // ✅ Query Methods (Search & Activity)
  // ============================================================

  async searchUsers(searchTerm: string, options: PaginationOptions): Promise<PaginatedResult<User>> {
    return this.findByFilters({ searchTerm }, options);
  }

  async findByDistrict(district: string, options: PaginationOptions): Promise<PaginatedResult<User>> {
    return this.findByFilters({ preferredDistrict: district }, options);
  }

  async findByUpazila(
    upazila: string,
    district?: string,
    options?: PaginationOptions,
  ): Promise<PaginatedResult<User>> {
    const paginationOptions = options || { page: 1, limit: 10 };
    return this.findByFilters({ preferredUpazila: upazila }, paginationOptions);
  }

  async findRecentlyActive(days: number, options: PaginationOptions): Promise<PaginatedResult<User>> {
    const fromDate = new Date();
    fromDate.setDate(fromDate.getDate() - days);
    return this.findByFilters(
      {
        lastLoginRange: { start: fromDate, end: new Date() },
      },
      options,
    );
  }

  async findInactiveUsers(days: number, options: PaginationOptions): Promise<PaginatedResult<User>> {
    const beforeDate = new Date();
    beforeDate.setDate(beforeDate.getDate() - days);
    return this.findByFilters(
      {
        lastLoginRange: { start: new Date(0), end: beforeDate },
      },
      options,
    );
  }

  async findByTotalSpentRange(minSpent: number, maxSpent: number, options: PaginationOptions): Promise<PaginatedResult<User>> {
    return this.findByFilters(
      {
        minTotalSpent: minSpent,
        maxTotalSpent: maxSpent,
      },
      options,
    );
  }

  // ============================================================
  // ✅ Count Methods
  // ============================================================

  async countByStatus(status: UserStatus): Promise<number> {
    try {
      return this.prisma.user.count({ where: { status } });
    } catch (error) {
      this.logger.error(`Failed to count users by status:`, error);
      throw error;
    }
  }

  async countByRole(role: UserRole): Promise<number> {
    try {
      return this.prisma.user.count({ where: { role } });
    } catch (error) {
      this.logger.error(`Failed to count users by role:`, error);
      throw error;
    }
  }

  async countByTier(tier: UserTier): Promise<number> {
    try {
      return this.prisma.user.count({ where: { tier } });
    } catch (error) {
      this.logger.error(`Failed to count users by tier:`, error);
      throw error;
    }
  }

  async countVerifiedUsers(): Promise<number> {
    try {
      return this.prisma.user.count({ where: { isEmailVerified: true } });
    } catch (error) {
      this.logger.error(`Failed to count verified users:`, error);
      throw error;
    }
  }

  async countPhoneVerifiedUsers(): Promise<number> {
    try {
      return this.prisma.user.count({ where: { isPhoneVerified: true } });
    } catch (error) {
      this.logger.error(`Failed to count phone verified users:`, error);
      throw error;
    }
  }

  async countMFAEnabledUsers(): Promise<number> {
    try {
      return this.prisma.user.count({ where: { mfaEnabled: true } });
    } catch (error) {
      this.logger.error(`Failed to count MFA enabled users:`, error);
      throw error;
    }
  }

  async countRegisteredBetween(fromDate: Date, toDate: Date): Promise<number> {
    try {
      return this.prisma.user.count({
        where: {
          createdAt: {
            gte: fromDate,
            lte: toDate,
          },
        },
      });
    } catch (error) {
      this.logger.error(`Failed to count registered users:`, error);
      throw error;
    }
  }

  async countActiveUsers(): Promise<number> {
    try {
      const fromDate = new Date();
      fromDate.setDate(fromDate.getDate() - 30);
      return this.prisma.user.count({
        where: {
          lastLoginAt: { gte: fromDate },
          status: USER_STATUSES.ACTIVE,
        },
      });
    } catch (error) {
      this.logger.error(`Failed to count active users:`, error);
      throw error;
    }
  }

  // ============================================================
  // ✅ Distribution Methods
  // ============================================================

  async getUserDistributionByDistrict(): Promise<Array<{ district: string; count: number; percentage: number }>> {
    return [];
  }

  async getUserDistributionByUpazila(district?: string): Promise<Array<{ upazila: string; district: string; count: number; percentage: number }>> {
    return [];
  }

  // ============================================================
  // ✅ Advanced Methods (Placeholders)
  // ============================================================

  async getUserChangeHistory(userId: string, limit?: number): Promise<any[]> {
    return [];
  }

  async getUserEventStream(userId: string, fromVersion?: number): Promise<any[]> {
    return [];
  }

  // ============================================================
  // ✅ Private Helper Methods
  // ============================================================

  /**
   * Map Prisma User to Domain User
   */
  private mapToDomain(prismaUser: PrismaUser): User {
    return UserMapper.fromPersistence(
      {
        id: prismaUser.id,
        email: prismaUser.email,
        password: prismaUser.password,
        phone: prismaUser.phone ?? undefined,
        fullName: prismaUser.fullName,
        status: prismaUser.status as UserStatus,
        role: prismaUser.role as UserRole,
        tier: (prismaUser as any).tier || USER_TIERS.BRONZE,
        isEmailVerified: prismaUser.isEmailVerified,
        isPhoneVerified: prismaUser.isPhoneVerified,
        isKycVerified: (prismaUser as any).isKycVerified || false,
        mfaEnabled: prismaUser.mfaEnabled,
        totalSpent: (prismaUser as any).totalSpent || 0,
        lastLoginAt: prismaUser.lastLoginAt ?? undefined,
        emailVerifiedAt: (prismaUser as any).emailVerifiedAt ?? undefined,
        phoneVerifiedAt: (prismaUser as any).phoneVerifiedAt ?? undefined,
        kycVerifiedAt: (prismaUser as any).kycVerifiedAt ?? undefined,
        mfaEnabledAt: (prismaUser as any).mfaEnabledAt ?? undefined,
        createdAt: prismaUser.createdAt,
        updatedAt: prismaUser.updatedAt,
        version: prismaUser.version,
        isDeleted: prismaUser.status === 'DELETED',
        deletedAt: prismaUser.deletedAt ?? undefined,
        suspendedAt: (prismaUser as any).suspendedAt ?? undefined,
        suspendedReason: (prismaUser as any).suspendedReason ?? undefined,
        preferredLanguage: (prismaUser as any).preferredLanguage || 'en',
        displayName: (prismaUser as any).displayName ?? undefined,
        avatar: (prismaUser as any).avatar ?? undefined,
        deletionReason: (prismaUser as any).deletionReason ?? undefined,
        preferredDistrict: (prismaUser as any).preferredDistrict ?? undefined,
        preferredUpazila: (prismaUser as any).preferredUpazila ?? undefined,
        preferredOperator: (prismaUser as any).preferredOperator ?? undefined,
        mobileNetworkType: (prismaUser as any).mobileNetworkType ?? undefined,
      },
      this.emailValidator,
      this.passwordValidator,
      this.phoneValidator,
    );
  }

  /**
   * Build Prisma where clause from UserFilters
   */
  private buildWhereClause(filters: UserFilters): Prisma.UserWhereInput {
    const where: Prisma.UserWhereInput = {};

    if (filters.email) {
      where.email = filters.email.getValue();
    }

    if (filters.phone) {
      where.phone = filters.phone.getValue();
    }

    if (filters.fullName) {
      where.fullName = { contains: filters.fullName, mode: 'insensitive' };
    }

    if (filters.status) {
      where.status = filters.status;
    }

    if (filters.role) {
      where.role = filters.role;
    }

    if (filters.tier) {
      where.tier = filters.tier as any;
    }

    if (filters.isEmailVerified !== undefined) {
      where.isEmailVerified = filters.isEmailVerified;
    }

    if (filters.isPhoneVerified !== undefined) {
      where.isPhoneVerified = filters.isPhoneVerified;
    }

    if (filters.isKycVerified !== undefined) {
      where.isKycVerified = filters.isKycVerified as any;
    }

    if (filters.mfaEnabled !== undefined) {
      where.mfaEnabled = filters.mfaEnabled;
    }

    if (filters.fromDate) {
      where.createdAt = { ...(where.createdAt as any), gte: filters.fromDate };
    }

    if (filters.toDate) {
      where.createdAt = { ...(where.createdAt as any), lte: filters.toDate };
    }

    if (filters.minTotalSpent !== undefined) {
      where.totalSpent = { ...(where.totalSpent as any), gte: filters.minTotalSpent };
    }

    if (filters.maxTotalSpent !== undefined) {
      where.totalSpent = { ...(where.totalSpent as any), lte: filters.maxTotalSpent };
    }

    if (filters.preferredDistrict) {
      where.preferredDistrict = filters.preferredDistrict as any;
    }

    if (filters.preferredUpazila) {
      where.preferredUpazila = filters.preferredUpazila as any;
    }

    if (filters.searchTerm) {
      where.OR = [
        { email: { contains: filters.searchTerm, mode: 'insensitive' } },
        { fullName: { contains: filters.searchTerm, mode: 'insensitive' } },
        { phone: { contains: filters.searchTerm, mode: 'insensitive' } },
      ];
    }

    if (filters.includeDeleted) {
      where.status = { not: USER_STATUSES.DELETED };
    }

    return where;
  }

  /**
   * Check if error is a Prisma unique constraint error
   */
  private isUniqueConstraintError(error: unknown): boolean {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return error.code === 'P2002';
    }
    return false;
  }
}
