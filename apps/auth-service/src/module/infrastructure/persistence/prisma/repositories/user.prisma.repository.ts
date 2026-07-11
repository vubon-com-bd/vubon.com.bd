/**
 * User Prisma Repository - Infrastructure Layer Implementation
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 *
 * @module infrastructure/persistence/prisma/repositories/user.prisma.repository
 *
 * @description
 * Prisma implementation of the UserRepository port.
 * Handles all database operations for User aggregate with enterprise-grade features.
 *
 * Enterprise Features:
 * ✅ Implements domain UserRepository interface
 * ✅ Complete CRUD operations with pagination and filtering
 * ✅ Caching strategy for hot data (Redis)
 * ✅ Soft delete support with filtering
 * ✅ Optimistic locking for concurrent updates
 * ✅ Audit trail for all operations
 * ✅ Performance optimized queries with indices
 * ✅ Connection pooling and retry logic
 * ✅ Error handling with domain-friendly exceptions
 * ✅ Bangladesh specific - District/Upazila filtering
 * ✅ Transaction support for complex operations
 *
 * @example
 * // In infrastructure module
 * @Module({
 *   providers: [
 *     PrismaService,
 *     {
 *       provide: 'UserRepository',
 *       useClass: UserPrismaRepository,
 *     },
 *   ],
 *   exports: ['UserRepository'],
 * })
 * export class DatabaseModule {}
 */

import { Injectable, Logger, Inject, Optional } from '@nestjs/common';
import { Prisma, User as PrismaUser, PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

// Shared packages for utilities and types
import { 
  USER_STATUS, 
  USER_ROLES, 
  USER_TIERS,
  USER_DELETION_REASONS,
  USER_SUSPENSION_REASONS,
} from '@vubon/shared-constants';
import type { UserStatus, UserRole, UserTier } from '@vubon/shared-types';
import { 
  maskEmail, 
  maskPhone, 
  normalizePhone,
  isValidEmail,
  isValidBdMobile,
} from '@vubon/shared-utils';

// Domain imports (ports and entities)
import { UserRepository } from '../../../domain/repositories/user.repository.interface';
import { User, UserStatus as DomainUserStatus, UserRole as DomainUserRole, UserTier as DomainUserTier } from '../../../domain/entities/user.entity';
import { Email } from '../../../domain/value-objects/email.vo';
import { Password } from '../../../domain/value-objects/password.vo';
import { Phone } from '../../../domain/value-objects/phone.vo';
import { IEmailValidator } from '../../../domain/ports/email-validator.port';
import { IPhoneValidator } from '../../../domain/ports/phone-validator.port';

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
 * Find options for user queries
 */
export interface FindOptions {
  includeDeleted?: boolean;
  includeSensitive?: boolean;
  withCache?: boolean;
  cacheTTL?: number;
}

/**
 * Pagination options for list queries
 */
export interface PaginationOptions {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

/**
 * Filter options for user search
 */
export interface UserFilterOptions {
  status?: DomainUserStatus | DomainUserStatus[];
  role?: DomainUserRole | DomainUserRole[];
  tier?: DomainUserTier | DomainUserTier[];
  isEmailVerified?: boolean;
  isPhoneVerified?: boolean;
  isKycVerified?: boolean;
  mfaEnabled?: boolean;
  isDeleted?: boolean;
  search?: string;
  email?: string;
  phone?: string;
  fullName?: string;
  district?: string;
  upazila?: string;
  fromDate?: Date;
  toDate?: Date;
  minTotalSpent?: number;
  maxTotalSpent?: number;
}

/**
 * Update options for user operations
 */
export interface UpdateOptions {
  optimisticLocking?: boolean;
  skipAudit?: boolean;
  skipCache?: boolean;
}

/**
 * Prisma user with relations (for complex queries)
 */
interface PrismaUserWithRelations extends PrismaUser {
  sessions?: unknown[];
  mfaConfigs?: unknown[];
  socialAccounts?: unknown[];
  devices?: unknown[];
  loginAttempts?: unknown[];
  passwordHistories?: unknown[];
  emailVerifications?: unknown[];
  passwordResets?: unknown[];
  accountLocks?: unknown[];
}

// ============================================================
// Cache Key Builder
// ============================================================

/**
 * Cache key generation for user entities
 */
class UserCacheKey {
  private static readonly PREFIX = 'auth:user:';
  private static readonly EMAIL_PREFIX = 'auth:user:email:';
  private static readonly PHONE_PREFIX = 'auth:user:phone:';

  static byId(id: string): string {
    return `${this.PREFIX}${id}`;
  }

  static byEmail(email: string): string {
    return `${this.EMAIL_PREFIX}${email.toLowerCase()}`;
  }

  static byPhone(phone: string): string {
    const normalized = normalizePhone(phone) || phone;
    return `${this.PHONE_PREFIX}${normalized}`;
  }

  static pattern(): string {
    return `${this.PREFIX}*`;
  }

  static emailPattern(): string {
    return `${this.EMAIL_PREFIX}*`;
  }

  static phonePattern(): string {
    return `${this.PHONE_PREFIX}*`;
  }
}

// ============================================================
// Prisma User Repository Implementation
// ============================================================

@Injectable()
export class UserPrismaRepository implements UserRepository {
  private readonly logger = new Logger(UserPrismaRepository.name);
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
    @Optional() @Inject('EmailValidator')
    private readonly emailValidator?: IEmailValidator,
    @Optional() @Inject('PhoneValidator')
    private readonly phoneValidator?: IPhoneValidator,
  ) {
    this.logger.log('UserPrismaRepository initialized');
  }

  // ============================================================
  // Core CRUD Operations
  // ============================================================

  /**
   * Find user by ID with caching
   */
  async findById(id: string, options: FindOptions = {}): Promise<User | null> {
    const startTime = Date.now();
    const { includeDeleted = false, withCache = true, cacheTTL = this.defaultCacheTTL } = options;

    try {
      // Check cache first
      if (withCache && this.cacheService) {
        const cacheKey = UserCacheKey.byId(id);
        const cached = await this.cacheService.get<User>(cacheKey);
        if (cached) {
          this.metricsService?.incrementCounter('user.repository.cache.hit');
          return cached;
        }
        this.metricsService?.incrementCounter('user.repository.cache.miss');
      }

      // Build query conditions
      const where: Prisma.UserWhereInput = { id };
      if (!includeDeleted) {
        where.deletedAt = null;
      }

      // Execute query with retry logic
      const prismaUser = await this.executeWithRetry(() =>
        this.prisma.user.findUnique({
          where,
        })
      );

      if (!prismaUser) {
        return null;
      }

      // Convert to domain entity
      const user = this.toDomain(prismaUser);

      // Cache the result
      if (withCache && this.cacheService) {
        await this.cacheService.set(UserCacheKey.byId(id), user, cacheTTL);
      }

      // Record metrics
      this.metricsService?.recordHistogram(
        'user.repository.findById.duration',
        Date.now() - startTime
      );

      return user;
    } catch (error) {
      this.logger.error(`Failed to find user by ID: ${id}`, error);
      this.metricsService?.incrementCounter('user.repository.error');
      throw this.wrapError(error);
    }
  }

  /**
   * Find user by email with caching
   */
  async findByEmail(email: Email, options: FindOptions = {}): Promise<User | null> {
    const startTime = Date.now();
    const { includeDeleted = false, withCache = true, cacheTTL = this.defaultCacheTTL } = options;
    const emailValue = email.getValue().toLowerCase();

    try {
      // Check cache first
      if (withCache && this.cacheService) {
        const cacheKey = UserCacheKey.byEmail(emailValue);
        const cached = await this.cacheService.get<User>(cacheKey);
        if (cached) {
          this.metricsService?.incrementCounter('user.repository.cache.hit');
          return cached;
        }
        this.metricsService?.incrementCounter('user.repository.cache.miss');
      }

      // Build query conditions
      const where: Prisma.UserWhereInput = { email: emailValue };
      if (!includeDeleted) {
        where.deletedAt = null;
      }

      const prismaUser = await this.executeWithRetry(() =>
        this.prisma.user.findUnique({
          where,
        })
      );

      if (!prismaUser) {
        return null;
      }

      const user = this.toDomain(prismaUser);

      // Cache the result
      if (withCache && this.cacheService) {
        await this.cacheService.set(UserCacheKey.byEmail(emailValue), user, cacheTTL);
      }

      this.metricsService?.recordHistogram(
        'user.repository.findByEmail.duration',
        Date.now() - startTime
      );

      return user;
    } catch (error) {
      this.logger.error(`Failed to find user by email: ${emailValue}`, error);
      this.metricsService?.incrementCounter('user.repository.error');
      throw this.wrapError(error);
    }
  }

  /**
   * Find user by phone number with caching
   */
  async findByPhone(phone: Phone, options: FindOptions = {}): Promise<User | null> {
    const startTime = Date.now();
    const { includeDeleted = false, withCache = true, cacheTTL = this.defaultCacheTTL } = options;
    const phoneValue = phone.getValue();

    try {
      // Check cache first
      if (withCache && this.cacheService) {
        const cacheKey = UserCacheKey.byPhone(phoneValue);
        const cached = await this.cacheService.get<User>(cacheKey);
        if (cached) {
          this.metricsService?.incrementCounter('user.repository.cache.hit');
          return cached;
        }
        this.metricsService?.incrementCounter('user.repository.cache.miss');
      }

      const where: Prisma.UserWhereInput = { phone: phoneValue };
      if (!includeDeleted) {
        where.deletedAt = null;
      }

      const prismaUser = await this.executeWithRetry(() =>
        this.prisma.user.findUnique({
          where,
        })
      );

      if (!prismaUser) {
        return null;
      }

      const user = this.toDomain(prismaUser);

      // Cache the result
      if (withCache && this.cacheService) {
        await this.cacheService.set(UserCacheKey.byPhone(phoneValue), user, cacheTTL);
      }

      this.metricsService?.recordHistogram(
        'user.repository.findByPhone.duration',
        Date.now() - startTime
      );

      return user;
    } catch (error) {
      this.logger.error(`Failed to find user by phone: ${maskPhone(phoneValue)}`, error);
      this.metricsService?.incrementCounter('user.repository.error');
      throw this.wrapError(error);
    }
  }

  /**
   * Find multiple users with filters and pagination
   */
  async findMany(
    filters: UserFilterOptions = {},
    pagination: PaginationOptions = {},
    options: FindOptions = {}
  ): Promise<{ users: User[]; total: number }> {
    const startTime = Date.now();
    const { includeDeleted = false, withCache = false } = options;
    const { page = 1, limit = 20, sortBy = 'createdAt', sortOrder = 'desc' } = pagination;

    try {
      const where = this.buildFilterConditions(filters, includeDeleted);

      // Build sort conditions
      const orderBy: Prisma.UserOrderByWithRelationInput = {};
      const sortField = this.mapSortField(sortBy);
      orderBy[sortField as keyof Prisma.UserOrderByWithRelationInput] = sortOrder;

      // Execute count and find in parallel
      const [total, prismaUsers] = await Promise.all([
        this.prisma.user.count({ where }),
        this.prisma.user.findMany({
          where,
          orderBy,
          skip: (page - 1) * limit,
          take: limit,
        }),
      ]);

      const users = prismaUsers.map((u: PrismaUser) => this.toDomain(u));

      this.metricsService?.recordHistogram(
        'user.repository.findMany.duration',
        Date.now() - startTime
      );

      return { users, total };
    } catch (error) {
      this.logger.error('Failed to find users', error);
      this.metricsService?.incrementCounter('user.repository.error');
      throw this.wrapError(error);
    }
  }

  /**
   * Check if a user exists by email
   */
  async existsByEmail(email: Email): Promise<boolean> {
    try {
      const count = await this.prisma.user.count({
        where: { email: email.getValue().toLowerCase(), deletedAt: null },
      });
      return count > 0;
    } catch (error) {
      this.logger.error(`Failed to check email existence: ${email.getValue()}`, error);
      throw this.wrapError(error);
    }
  }

  /**
   * Check if a user exists by phone
   */
  async existsByPhone(phone: Phone): Promise<boolean> {
    try {
      const count = await this.prisma.user.count({
        where: { phone: phone.getValue(), deletedAt: null },
      });
      return count > 0;
    } catch (error) {
      this.logger.error(`Failed to check phone existence: ${maskPhone(phone.getValue())}`, error);
      throw this.wrapError(error);
    }
  }

  /**
   * Save user (create or update) with optimistic locking and caching
   */
  async save(user: User, options: UpdateOptions = {}): Promise<void> {
    const startTime = Date.now();
    const { optimisticLocking = true, skipAudit = false, skipCache = false } = options;

    try {
      const data = this.toPrisma(user);

      // Check if user exists
      const existingUser = await this.prisma.user.findUnique({
        where: { id: user.getId() },
      });

      if (existingUser) {
        // Update existing user with optimistic locking
        if (optimisticLocking) {
          const updateResult = await this.prisma.user.updateMany({
            where: {
              id: user.getId(),
              version: existingUser.version,
              deletedAt: null,
            },
            data,
          });

          if (updateResult.count === 0) {
            throw new Error('Optimistic lock conflict: User was modified by another transaction');
          }
        } else {
          await this.prisma.user.update({
            where: { id: user.getId() },
            data,
          });
        }
      } else {
        // Create new user
        await this.prisma.user.create({
          data,
        });
      }

      // Invalidate cache
      if (!skipCache && this.cacheService) {
        await this.invalidateCache(user);
      }

      // Audit log
      if (!skipAudit && this.auditService) {
        await this.auditService.log({
          action: existingUser ? 'USER_UPDATED' : 'USER_CREATED',
          userId: user.getId(),
          email: user.getEmail().getValue(),
          metadata: {
            version: user.getVersion(),
            operation: existingUser ? 'UPDATE' : 'CREATE',
          },
        });
      }

      this.metricsService?.recordHistogram(
        'user.repository.save.duration',
        Date.now() - startTime
      );
      this.metricsService?.incrementCounter(
        existingUser ? 'user.repository.update' : 'user.repository.create'
      );
    } catch (error) {
      this.logger.error(`Failed to save user: ${user.getId()}`, error);
      this.metricsService?.incrementCounter('user.repository.error');
      throw this.wrapError(error);
    }
  }

  /**
   * Delete user (soft delete) with cache invalidation
   */
  async delete(user: User, reason: string = USER_DELETION_REASONS.USER_REQUESTED): Promise<void> {
    const startTime = Date.now();

    try {
      await this.prisma.$transaction(async (tx: Prisma.TransactionClient) => {
        // Soft delete the user
        await tx.user.update({
          where: { id: user.getId() },
          data: {
            deletedAt: new Date(),
            status: USER_STATUS.DELETED,
            // Invalidate sessions, tokens, etc.
          },
        });

        // Soft delete related entities
        await tx.session.updateMany({
          where: { userId: user.getId(), status: 'ACTIVE' },
          data: { status: 'REVOKED', revokedAt: new Date() },
        });

        await tx.refreshToken.updateMany({
          where: { userId: user.getId(), revokedAt: null },
          data: { revokedAt: new Date() },
        });
      });

      // Invalidate cache
      if (this.cacheService) {
        await this.invalidateCache(user);
      }

      // Audit log
      if (this.auditService) {
        await this.auditService.log({
          action: 'USER_DELETED',
          userId: user.getId(),
          email: user.getEmail().getValue(),
          metadata: { reason, deletedAt: new Date().toISOString() },
        });
      }

      this.metricsService?.incrementCounter('user.repository.delete');
      this.metricsService?.recordHistogram(
        'user.repository.delete.duration',
        Date.now() - startTime
      );
    } catch (error) {
      this.logger.error(`Failed to delete user: ${user.getId()}`, error);
      this.metricsService?.incrementCounter('user.repository.error');
      throw this.wrapError(error);
    }
  }

  /**
   * Restore a soft-deleted user
   */
  async restore(userId: string): Promise<User | null> {
    const startTime = Date.now();

    try {
      const updatedUser = await this.prisma.user.update({
        where: { id: userId },
        data: {
          deletedAt: null,
          status: USER_STATUS.ACTIVE,
          updatedAt: new Date(),
          version: { increment: 1 },
        },
      });

      const user = this.toDomain(updatedUser);

      // Invalidate cache
      if (this.cacheService) {
        await this.invalidateCache(user);
      }

      // Audit log
      if (this.auditService) {
        await this.auditService.log({
          action: 'USER_RESTORED',
          userId: user.getId(),
          email: user.getEmail().getValue(),
          metadata: { restoredAt: new Date().toISOString() },
        });
      }

      this.metricsService?.incrementCounter('user.repository.restore');
      this.metricsService?.recordHistogram(
        'user.repository.restore.duration',
        Date.now() - startTime
      );

      return user;
    } catch (error) {
      this.logger.error(`Failed to restore user: ${userId}`, error);
      this.metricsService?.incrementCounter('user.repository.error');
      throw this.wrapError(error);
    }
  }

  // ============================================================
  // Advanced Queries
  // ============================================================

  /**
   * Find users by status
   */
  async findByStatus(
    status: DomainUserStatus,
    pagination: PaginationOptions = {}
  ): Promise<{ users: User[]; total: number }> {
    return this.findMany({ status: [status] }, pagination);
  }

  /**
   * Find users by role
   */
  async findByRole(
    role: DomainUserRole,
    pagination: PaginationOptions = {}
  ): Promise<{ users: User[]; total: number }> {
    return this.findMany({ role: [role] }, pagination);
  }

  /**
   * Find users by tier
   */
  async findByTier(
    tier: DomainUserTier,
    pagination: PaginationOptions = {}
  ): Promise<{ users: User[]; total: number }> {
    return this.findMany({ tier: [tier] }, pagination);
  }

  /**
   * Search users by keyword (email, fullName, phone)
   */
  async search(
    query: string,
    pagination: PaginationOptions = {}
  ): Promise<{ users: User[]; total: number }> {
    return this.findMany({ search: query }, pagination);
  }

  // ============================================================
  // Bulk Operations
  // ============================================================

  /**
   * Bulk update user status
   */
  async bulkUpdateStatus(
    userIds: string[],
    status: DomainUserStatus,
    reason?: string
  ): Promise<number> {
    const startTime = Date.now();

    try {
      const result = await this.prisma.user.updateMany({
        where: { id: { in: userIds }, deletedAt: null },
        data: {
          status: status as string,
          updatedAt: new Date(),
          version: { increment: 1 },
        },
      });

      // Invalidate cache for all users
      if (this.cacheService) {
        const cacheKeys = userIds.map((id) => UserCacheKey.byId(id));
        await this.cacheService.deleteMany(cacheKeys);
      }

      // Audit log
      if (this.auditService) {
        for (const userId of userIds) {
          await this.auditService.log({
            action: 'USER_STATUS_BULK_UPDATED',
            userId,
            metadata: { status, reason },
          });
        }
      }

      this.metricsService?.recordHistogram(
        'user.repository.bulkUpdateStatus.duration',
        Date.now() - startTime
      );

      return result.count;
    } catch (error) {
      this.logger.error(`Failed to bulk update status for ${userIds.length} users`, error);
      this.metricsService?.incrementCounter('user.repository.error');
      throw this.wrapError(error);
    }
  }

  /**
   * Bulk delete users (soft delete)
   */
  async bulkDelete(userIds: string[], reason: string = USER_DELETION_REASONS.ADMIN_ACTION): Promise<number> {
    const startTime = Date.now();

    try {
      const result = await this.prisma.user.updateMany({
        where: { id: { in: userIds }, deletedAt: null },
        data: {
          deletedAt: new Date(),
          status: USER_STATUS.DELETED,
          updatedAt: new Date(),
          version: { increment: 1 },
        },
      });

      // Invalidate cache
      if (this.cacheService) {
        const cacheKeys = userIds.map((id) => UserCacheKey.byId(id));
        await this.cacheService.deleteMany(cacheKeys);
      }

      // Audit log
      if (this.auditService) {
        for (const userId of userIds) {
          await this.auditService.log({
            action: 'USER_BULK_DELETED',
            userId,
            metadata: { reason },
          });
        }
      }

      this.metricsService?.recordHistogram(
        'user.repository.bulkDelete.duration',
        Date.now() - startTime
      );

      return result.count;
    } catch (error) {
      this.logger.error(`Failed to bulk delete ${userIds.length} users`, error);
      this.metricsService?.incrementCounter('user.repository.error');
      throw this.wrapError(error);
    }
  }

  // ============================================================
  // Stats & Analytics
  // ============================================================

  /**
   * Get user statistics by status, role, tier
   */
  async getStats(): Promise<{
    total: number;
    byStatus: Record<string, number>;
    byRole: Record<string, number>;
    byTier: Record<string, number>;
    verified: { email: number; phone: number; kyc: number };
    active7Days: number;
    active30Days: number;
  }> {
    const startTime = Date.now();

    try {
      const [
        total,
        byStatus,
        byRole,
        byTier,
        emailVerified,
        phoneVerified,
        kycVerified,
        active7Days,
        active30Days,
      ] = await Promise.all([
        this.prisma.user.count({ where: { deletedAt: null } }),
        this.prisma.user.groupBy({
          by: ['status'],
          where: { deletedAt: null },
          _count: true,
        }),
        this.prisma.user.groupBy({
          by: ['role'],
          where: { deletedAt: null },
          _count: true,
        }),
        this.prisma.user.groupBy({
          by: ['tier'],
          where: { deletedAt: null },
          _count: true,
        }),
        this.prisma.user.count({ where: { deletedAt: null, isEmailVerified: true } }),
        this.prisma.user.count({ where: { deletedAt: null, isPhoneVerified: true } }),
        this.prisma.user.count({ where: { deletedAt: null, isKycVerified: true } }),
        this.prisma.user.count({
          where: {
            deletedAt: null,
            lastLoginAt: { gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) },
          },
        }),
        this.prisma.user.count({
          where: {
            deletedAt: null,
            lastLoginAt: { gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
          },
        }),
      ]);

      const statusMap: Record<string, number> = {};
      for (const item of byStatus) {
        statusMap[item.status] = item._count;
      }

      const roleMap: Record<string, number> = {};
      for (const item of byRole) {
        roleMap[item.role] = item._count;
      }

      const tierMap: Record<string, number> = {};
      for (const item of byTier) {
        tierMap[item.tier] = item._count;
      }

      this.metricsService?.recordHistogram(
        'user.repository.getStats.duration',
        Date.now() - startTime
      );

      return {
        total,
        byStatus: statusMap,
        byRole: roleMap,
        byTier: tierMap,
        verified: {
          email: emailVerified,
          phone: phoneVerified,
          kyc: kycVerified,
        },
        active7Days,
        active30Days,
      };
    } catch (error) {
      this.logger.error('Failed to get user stats', error);
      this.metricsService?.incrementCounter('user.repository.error');
      throw this.wrapError(error);
    }
  }

  // ============================================================
  // Private Helper Methods
  // ============================================================

  /**
   * Build filter conditions for Prisma queries
   */
  private buildFilterConditions(
    filters: UserFilterOptions,
    includeDeleted: boolean
  ): Prisma.UserWhereInput {
    const where: Prisma.UserWhereInput = {};

    // Deleted filter
    if (!includeDeleted) {
      where.deletedAt = null;
    }

    // Status filter
    if (filters.status) {
      const statuses = Array.isArray(filters.status) ? filters.status : [filters.status];
      where.status = { in: statuses.map((s) => s as string) };
    }

    // Role filter
    if (filters.role) {
      const roles = Array.isArray(filters.role) ? filters.role : [filters.role];
      where.role = { in: roles.map((r) => r as string) };
    }

    // Tier filter
    if (filters.tier) {
      const tiers = Array.isArray(filters.tier) ? filters.tier : [filters.tier];
      where.tier = { in: tiers.map((t) => t as string) };
    }

    // Verification filters
    if (filters.isEmailVerified !== undefined) {
      where.isEmailVerified = filters.isEmailVerified;
    }
    if (filters.isPhoneVerified !== undefined) {
      where.isPhoneVerified = filters.isPhoneVerified;
    }
    if (filters.isKycVerified !== undefined) {
      where.isKycVerified = filters.isKycVerified;
    }
    if (filters.mfaEnabled !== undefined) {
      where.mfaEnabled = filters.mfaEnabled;
    }

    // Search filter (email, fullName, phone)
    if (filters.search) {
      const searchTerm = filters.search.trim();
      where.OR = [
        { email: { contains: searchTerm, mode: 'insensitive' } },
        { fullName: { contains: searchTerm, mode: 'insensitive' } },
        { displayName: { contains: searchTerm, mode: 'insensitive' } },
        { phone: { contains: searchTerm } },
      ];
    }

    // Exact email filter
    if (filters.email) {
      where.email = filters.email.toLowerCase();
    }

    // Exact phone filter
    if (filters.phone) {
      where.phone = filters.phone;
    }

    // Exact fullName filter
    if (filters.fullName) {
      where.fullName = { contains: filters.fullName, mode: 'insensitive' };
    }

    // District filter (Bangladesh specific)
    if (filters.district) {
      where.preferredDistrict = filters.district;
    }

    // Upazila filter (Bangladesh specific)
    if (filters.upazila) {
      where.preferredUpazila = filters.upazila;
    }

    // Date range filters
    if (filters.fromDate) {
      where.createdAt = { ...where.createdAt, gte: filters.fromDate };
    }
    if (filters.toDate) {
      where.createdAt = { ...where.createdAt, lte: filters.toDate };
    }

    // Total spent range filters
    if (filters.minTotalSpent !== undefined) {
      where.totalSpent = { ...where.totalSpent, gte: filters.minTotalSpent };
    }
    if (filters.maxTotalSpent !== undefined) {
      where.totalSpent = { ...where.totalSpent, lte: filters.maxTotalSpent };
    }

    return where;
  }

  /**
   * Map sort field for Prisma
   */
  private mapSortField(field: string): string {
    const fieldMap: Record<string, string> = {
      id: 'id',
      email: 'email',
      fullName: 'fullName',
      displayName: 'displayName',
      status: 'status',
      role: 'role',
      tier: 'tier',
      totalSpent: 'totalSpent',
      lastLoginAt: 'lastLoginAt',
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
      deletedAt: 'deletedAt',
    };

    return fieldMap[field] || 'createdAt';
  }

  /**
   * Convert Prisma user to Domain User entity
   */
  private toDomain(prismaUser: PrismaUser): User {
    const emailValidator = this.emailValidator;
    const phoneValidator = this.phoneValidator;

    // Create value objects
    const email = new Email(prismaUser.email, emailValidator);
    const phone = prismaUser.phone ? new Phone(prismaUser.phone, phoneValidator) : undefined;

    // Note: Password is stored as hash, domain entity expects Password VO
    // For reconstitution, we need to create Password VO with the hash
    const password = new Password(prismaUser.password); // This will treat hash as a valid password

    return User.reconstitute({
      id: prismaUser.id,
      email,
      password,
      phone,
      fullName: prismaUser.fullName,
      displayName: prismaUser.displayName || undefined,
      avatar: prismaUser.avatar || undefined,
      status: prismaUser.status as DomainUserStatus,
      role: prismaUser.role as DomainUserRole,
      tier: prismaUser.tier as DomainUserTier,
      isEmailVerified: prismaUser.isEmailVerified,
      isPhoneVerified: prismaUser.isPhoneVerified,
      isKycVerified: prismaUser.isKycVerified,
      mfaEnabled: prismaUser.mfaEnabled,
      totalSpent: prismaUser.totalSpent || 0,
      lastLoginAt: prismaUser.lastLoginAt || undefined,
      emailVerifiedAt: prismaUser.emailVerifiedAt || undefined,
      phoneVerifiedAt: prismaUser.phoneVerifiedAt || undefined,
      kycVerifiedAt: prismaUser.kycVerifiedAt || undefined,
      mfaEnabledAt: prismaUser.mfaEnabledAt || undefined,
      deletedAt: prismaUser.deletedAt || undefined,
      suspendedAt: prismaUser.suspendedAt || undefined,
      suspendedReason: prismaUser.suspendedReason || undefined,
      preferredLanguage: (prismaUser.preferredLanguage as 'en' | 'bn') || 'en',
      preferredDistrict: prismaUser.preferredDistrict || undefined,
      preferredUpazila: prismaUser.preferredUpazila || undefined,
      createdAt: prismaUser.createdAt,
      updatedAt: prismaUser.updatedAt,
      version: prismaUser.version,
    });
  }

  /**
   * Convert Domain User to Prisma create/update data
   */
  private toPrisma(user: User): Prisma.UserUpdateInput {
    return {
      email: user.getEmail().getValue().toLowerCase(),
      password: user.getPassword().getValue(), // Already hashed
      phone: user.getPhone()?.getValue(),
      fullName: user.getFullName(),
      displayName: user.getDisplayName(),
      avatar: user.getAvatar(),
      status: user.getStatus() as string,
      role: user.getRole() as string,
      tier: user.getTier() as string,
      isEmailVerified: user.isEmailVerified(),
      isPhoneVerified: user.isPhoneVerified(),
      isKycVerified: user.isKycVerified(),
      mfaEnabled: user.isMfaEnabled(),
      totalSpent: user.getTotalSpent(),
      lastLoginAt: user.getLastLoginAt(),
      emailVerifiedAt: user.getEmailVerifiedAt(),
      phoneVerifiedAt: user.getPhoneVerifiedAt(),
      kycVerifiedAt: user.getKycVerifiedAt(),
      mfaEnabledAt: user.getMfaEnabledAt(),
      deletedAt: user.getDeletedAt(),
      suspendedAt: user.getSuspendedAt(),
      suspendedReason: user.getSuspendedReason(),
      preferredLanguage: user.getPreferredLanguage(),
      preferredDistrict: user.getPreferredDistrict(),
      preferredUpazila: user.getPreferredUpazila(),
      version: user.getVersion() + 1,
      updatedAt: new Date(),
    };
  }

  /**
   * Invalidate user cache
   */
  private async invalidateCache(user: User): Promise<void> {
    if (!this.cacheService) return;

    const keys = [
      UserCacheKey.byId(user.getId()),
      UserCacheKey.byEmail(user.getEmail().getValue()),
    ];

    const phone = user.getPhone();
    if (phone) {
      keys.push(UserCacheKey.byPhone(phone.getValue()));
    }

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
    // Handle Prisma-specific errors
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      switch (error.code) {
        case 'P2002':
          return new Error('Duplicate entry: A user with this email or phone already exists');
        case 'P2025':
          return new Error('User not found');
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
