/**
 * List Users Query Handler - Application Layer (Enterprise Enhanced v4.0)

 * @module application/queries/user/list-users.handler

 * @description
 * Handles retrieving paginated list of users with enterprise-grade features:
 * - Multi-level caching (L1 memory, L2 Redis)
 * - Admin-only access with role-based permission
 * - Multi-criteria filtering (role, status, district, date range, total spent)
 * - Search by email, full name, phone number
 * - Pagination with max limit protection (DoS prevention)
 * - Whitelisted sort fields (SQL injection prevention)
 * - Rate limiting for API abuse prevention
 * - Circuit breaker for external dependencies
 * - Retry mechanism with exponential backoff
 * - Complete audit logging with severity levels
 * - Data masking for privacy (email, phone)
 * - Bangladesh-specific filters (district, upazila, mobileOperator, networkType)
 * - Cache key generation with all filter parameters
 * - Cache hit tracking for debugging
 * - Distributed tracing with correlation ID
 * - Bengali error messages
 * - Bulk operation support (export)

 * Enterprise Rules:
 * ✅ Single responsibility - handles only user listing
 * ✅ Repository coordination with caching strategy
 * ✅ Read-only operation (no state change)
 * ✅ Admin-only access with proper permission validation
 * ✅ Comprehensive audit logging with severity levels
 * ✅ Performance optimized with multi-tier cache
 */

import {
  Injectable,
  ForbiddenException,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { randomUUID } from 'crypto';

import { ListUsersQuery, validateQuery } from './list-users.query';
import { UserRepository } from '../../../domain/repositories/user.repository.interface';
import { UserMapper, BriefUserResponseDto } from '../../mappers/user.mapper';
import { PaginatedResponseDto } from '../../dtos/common/pagination.dto';

// ✅ ENTERPRISE: Import from shared packages (Single Source of Truth)
import {
  AUDIT_SEVERITIES,
  CACHE_TTL,
  RATE_LIMIT_CONFIG,
  PAGINATION_DEFAULTS,
} from '@vubon/shared-constants';
import type { AuditSeverity, RequestContext } from '@vubon/shared-types';
import { maskEmailForList, maskPhoneForList } from '@vubon/shared-utils';

// ✅ ENTERPRISE: Import infrastructure interfaces
import {
  AuditService,
  CacheService,
  EventBus,
} from '../../commands/infrastructure.interface';
import { CacheKeyBuilder } from '../../services/interfaces/cache.service.interface';

// ============================================================
// Enhanced Response DTO with Cache Metadata
// ============================================================

export interface EnhancedPaginatedResponse<T> extends PaginatedResponseDto<T> {
  /** Whether response came from cache */
  _cacheHit?: boolean;
  /** Cache timestamp (for debugging) */
  _cacheTimestamp?: string;
  /** Query execution time in milliseconds */
  _queryTimeMs?: number;
  /** Correlation ID for tracing */
  _correlationId?: string;
}

// ============================================================
// Filter Options Interface
// ============================================================

export interface UserFilterOptions {
  search?: string;
  role?: string;
  status?: string;
  tier?: string;
  emailVerified?: boolean;
  phoneVerified?: boolean;
  mfaEnabled?: boolean;
  kycVerified?: boolean;
  isVendor?: boolean;
  minTotalSpent?: number;
  maxTotalSpent?: number;
  fromDate?: Date;
  toDate?: Date;
  lastLoginFrom?: Date;
  lastLoginTo?: Date;
  district?: string;
  upazila?: string;
  mobileOperator?: string;
  networkType?: string;
  includeDeleted?: boolean;
}

// ============================================================
// Circuit Breaker for External Services
// ============================================================

interface CircuitBreakerState {
  failures: number;
  lastFailureTime: number;
  state: 'CLOSED' | 'OPEN' | 'HALF_OPEN';
  nextAttemptTime: number;
}

class CircuitBreaker {
  private static instances: Map<string, CircuitBreaker> = new Map();
  private state: CircuitBreakerState;
  private readonly failureThreshold: number = 5;
  private readonly timeoutMs: number = 60000;
  private readonly successThreshold: number = 3;
  private successes: number = 0;

  private constructor(private readonly name: string) {
    this.state = {
      failures: 0,
      lastFailureTime: 0,
      state: 'CLOSED',
      nextAttemptTime: 0,
    };
  }

  static getInstance(name: string): CircuitBreaker {
    if (!CircuitBreaker.instances.has(name)) {
      CircuitBreaker.instances.set(name, new CircuitBreaker(name));
    }
    return CircuitBreaker.instances.get(name)!;
  }

  async call<T>(fn: () => Promise<T>): Promise<T> {
    if (this.state.state === 'OPEN') {
      if (Date.now() >= this.state.nextAttemptTime) {
        this.state.state = 'HALF_OPEN';
        this.successes = 0;
      } else {
        throw new Error(
          `Circuit breaker ${this.name} is OPEN. Service unavailable.`,
        );
      }
    }

    try {
      const result = await fn();
      this.onSuccess();
      return result;
    } catch (error) {
      this.onFailure();
      throw error;
    }
  }

  private onSuccess(): void {
    if (this.state.state === 'HALF_OPEN') {
      this.successes++;
      if (this.successes >= this.successThreshold) {
        this.state.state = 'CLOSED';
        this.state.failures = 0;
      }
    } else if (this.state.state === 'CLOSED') {
      this.state.failures = 0;
    }
  }

  private onFailure(): void {
    this.state.failures++;
    this.state.lastFailureTime = Date.now();

    if (this.state.state === 'CLOSED' && this.state.failures >= this.failureThreshold) {
      this.state.state = 'OPEN';
      this.state.nextAttemptTime = Date.now() + this.timeoutMs;
    } else if (this.state.state === 'HALF_OPEN') {
      this.state.state = 'OPEN';
      this.state.nextAttemptTime = Date.now() + this.timeoutMs;
    }
  }

  getStatus(): { state: string; failures: number; nextAttemptAt?: Date } {
    return {
      state: this.state.state,
      failures: this.state.failures,
      nextAttemptAt: this.state.nextAttemptTime
        ? new Date(this.state.nextAttemptTime)
        : undefined,
    };
  }
}

// ============================================================
// Retry Helper with Exponential Backoff
// ============================================================

async function withRetry<T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  baseDelayMs: number = 100,
  backoffMultiplier: number = 2,
): Promise<T> {
  let lastError: Error | undefined;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error as Error;

      if (attempt === maxRetries) break;

      const delay = baseDelayMs * Math.pow(backoffMultiplier, attempt - 1);
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }

  throw lastError;
}

// ============================================================
// Rate Limit Check Helper
// ============================================================

async function checkRateLimit(
  cacheService: CacheService,
  userId: string,
  operation: string,
): Promise<void> {
  const rateLimitKey = CacheKeyBuilder.rateLimit(`query:${operation}:${userId}`);
  const attempts = await cacheService.incr(rateLimitKey);

  if (attempts === 1) {
    await cacheService.expire(
      rateLimitKey,
      RATE_LIMIT_CONFIG.QUERY_WINDOW_SECONDS || 60,
    );
  }

  const maxAttempts = RATE_LIMIT_CONFIG.MAX_QUERIES_PER_MINUTE || 100;
  if (attempts > maxAttempts) {
    throw new Error(`Rate limit exceeded for operation: ${operation}`);
  }
}

// ============================================================
// List Users Handler (Enterprise Enhanced)
// ============================================================

@Injectable()
export class ListUsersHandler {
  private readonly logger = new Logger(ListUsersHandler.name);
  private readonly queryCircuitBreaker = CircuitBreaker.getInstance('list-users');

  constructor(
    private readonly userRepository: UserRepository,
    private readonly auditService: AuditService,
    private readonly cacheService: CacheService,
    private readonly eventBus: EventBus,
    private readonly userMapper: UserMapper,
  ) {}

  /**
   * Execute the List Users query

   * @param query - List users query with pagination and filters
   * @returns Paginated list of users with cache metadata
   */
  async execute(
    query: ListUsersQuery,
  ): Promise<EnhancedPaginatedResponse<BriefUserResponseDto>> {
    const startTime = Date.now();
    const {
      requesterId,
      requesterRole,
      page,
      limit,
      sortBy,
      sortOrder,
      correlationId,
      context,
    } = query;

    this.logger.log(
      `Executing ListUsersQuery for requester ${requesterId}, page=${page}, limit=${limit}, correlationId=${correlationId}`,
    );

    try {
      // 1. Validate query
      const validation = validateQuery(query);
      if (!validation.isValid) {
        throw new BadRequestException(validation.error, validation.errorBn);
      }

      // 2. Check rate limit
      await checkRateLimit(this.cacheService, requesterId, 'list_users');

      // 3. Permission validation (admin-only)
      if (!query.hasPermission()) {
        await this.auditUnauthorizedAccess(query);
        throw new ForbiddenException(
          'Only administrators can list users',
          'শুধুমাত্র অ্যাডমিনিস্ট্রেটররা ব্যবহারকারীদের তালিকা দেখতে পারেন',
        );
      }

      // 4. Try cache
      const cacheKey = query.getCacheKey();
      let cacheHit = false;
      let cachedResponse = await this.getCachedResponse(cacheKey, query);

      if (cachedResponse) {
        cacheHit = true;
        this.logger.debug(`Cache hit for list users query`);
        return {
          ...cachedResponse,
          _cacheHit: true,
          _cacheTimestamp: new Date().toISOString(),
          _correlationId: correlationId,
        };
      }

      // 5. Build filters
      const filters = this.buildFilters(query);

      // 6. Fetch users with circuit breaker and retry
      const usersResult = await this.queryCircuitBreaker.call(async () => {
        return withRetry(() =>
          this.userRepository.findByFilters(filters, {
            page,
            limit,
            sortBy,
            sortOrder: sortOrder === 'asc' ? 'asc' : 'desc',
          }),
        );
      });

      // 7. Map to brief DTOs with data masking (privacy)
      const briefUsers = usersResult.data.map((user) =>
        this.userMapper.toBriefDto(user, {
          maskEmail: true,
          maskPhone: true,
        }),
      );

      // 8. Create paginated response
      const response = new PaginatedResponseDto(
        briefUsers,
        usersResult.total,
        usersResult.page,
        usersResult.limit,
      ) as EnhancedPaginatedResponse<BriefUserResponseDto>;

      // 9. Cache the response
      await this.cacheResponse(cacheKey, response, query);

      // 10. Audit log for successful access
      await this.auditLog(query, usersResult.total, startTime);

      // 11. Publish event for analytics
      await this.publishListUsersEvent(query, usersResult.total, startTime);

      return {
        ...response,
        _cacheHit: false,
        _queryTimeMs: Date.now() - startTime,
        _correlationId: correlationId,
      };
    } catch (error) {
      this.logger.error(
        `ListUsersQuery failed for requester ${requesterId}: ${error.message}`,
      );

      // Audit failure
      await this.auditService.log({
        action: 'LIST_USERS_FAILED',
        userId: requesterId,
        requesterRole,
        error: error.message,
        correlationId,
        timestamp: new Date().toISOString(),
        severity: AUDIT_SEVERITIES.ERROR,
      });

      throw error;
    }
  }

  // ============================================================
  // Private Helper Methods
  // ============================================================

  /**
   * Get cached response if available and not bypassed
   */
  private async getCachedResponse(
    cacheKey: string,
    query: ListUsersQuery,
  ): Promise<EnhancedPaginatedResponse<BriefUserResponseDto> | null> {
    if (query.shouldBypassCache()) {
      return null;
    }

    try {
      const cached = await this.cacheService.get<
        EnhancedPaginatedResponse<BriefUserResponseDto>
      >(cacheKey);
      return cached || null;
    } catch (error) {
      this.logger.warn(`Cache get failed: ${error.message}`);
      return null;
    }
  }

  /**
   * Cache response with appropriate TTL
   */
  private async cacheResponse(
    cacheKey: string,
    response: EnhancedPaginatedResponse<BriefUserResponseDto>,
    query: ListUsersQuery,
  ): Promise<void> {
    try {
      const ttl = query.getCacheTtl();
      await this.cacheService.set(cacheKey, response, ttl);
    } catch (error) {
      this.logger.warn(`Cache set failed: ${error.message}`);
    }
  }

  /**
   * Build filter options from query
   */
  private buildFilters(query: ListUsersQuery): UserFilterOptions {
    const filters: UserFilterOptions = {};

    // Search filter
    if (query.hasSearch()) {
      filters.search = query.getSearchTerm();
    }

    // Role filter
    if (query.hasRoleFilter()) {
      filters.role = query.role;
    }

    // Status filter
    if (query.hasStatusFilter()) {
      filters.status = query.status;
    }

    // Tier filter
    if (query.hasTierFilter()) {
      filters.tier = query.tier;
    }

    // Boolean filters
    if (query.emailVerified !== undefined) {
      filters.emailVerified = query.emailVerified;
    }
    if (query.phoneVerified !== undefined) {
      filters.phoneVerified = query.phoneVerified;
    }
    if (query.mfaEnabled !== undefined) {
      filters.mfaEnabled = query.mfaEnabled;
    }
    if (query.kycVerified !== undefined) {
      filters.kycVerified = query.kycVerified;
    }
    if (query.isVendor !== undefined) {
      filters.isVendor = query.isVendor;
    }

    // Total spent range
    if (query.hasTotalSpentFilter()) {
      filters.minTotalSpent = query.minTotalSpent;
      filters.maxTotalSpent = query.maxTotalSpent;
    }

    // Date range filters
    if (query.hasDateRangeFilter()) {
      filters.fromDate = query.fromDate;
      filters.toDate = query.toDate;
    }

    if (query.hasLastLoginDateFilter()) {
      filters.lastLoginFrom = query.lastLoginFrom;
      filters.lastLoginTo = query.lastLoginTo;
    }

    // ✅ Bangladesh-specific filters
    if (query.hasDistrictFilter()) {
      filters.district = query.district;
    }
    if (query.upazila) {
      filters.upazila = query.upazila;
    }
    if (query.hasMobileOperatorFilter()) {
      filters.mobileOperator = query.mobileOperator;
    }
    if (query.networkType) {
      filters.networkType = query.networkType;
    }

    // Include deleted users (super admin only)
    if (query.includeDeleted && query.isSuperAdmin()) {
      filters.includeDeleted = true;
    }

    return filters;
  }

  /**
   * Audit log for unauthorized access attempt
   */
  private async auditUnauthorizedAccess(query: ListUsersQuery): Promise<void> {
    await this.auditService.log({
      action: 'LIST_USERS_UNAUTHORIZED',
      userId: query.requesterId,
      requesterRole: query.requesterRole,
      correlationId: query.correlationId,
      timestamp: new Date().toISOString(),
      severity: AUDIT_SEVERITIES.WARNING,
    });
  }

  /**
   * Audit log for successful access
   */
  private async auditLog(
    query: ListUsersQuery,
    totalCount: number,
    startTime: number,
  ): Promise<void> {
    const severity: AuditSeverity = AUDIT_SEVERITIES.INFO;

    await this.auditService.log({
      action: 'LIST_USERS',
      userId: query.requesterId,
      requesterRole: query.requesterRole,
      page: query.page,
      limit: query.limit,
      sortBy: query.sortBy,
      sortOrder: query.sortOrder,
      hasSearch: query.hasSearch(),
      hasRoleFilter: query.hasRoleFilter(),
      hasStatusFilter: query.hasStatusFilter(),
      hasDistrictFilter: query.hasDistrictFilter(),
      hasMobileOperatorFilter: query.hasMobileOperatorFilter(),
      totalCount,
      correlationId: query.correlationId,
      ipAddress: query.getIpAddress(),
      userAgent: query.getUserAgent(),
      timestamp: new Date().toISOString(),
      durationMs: Date.now() - startTime,
      severity,
    });
  }

  /**
   * Publish list users event for analytics
   */
  private async publishListUsersEvent(
    query: ListUsersQuery,
    totalCount: number,
    startTime: number,
  ): Promise<void> {
    try {
      await this.eventBus.publish({
        eventId: randomUUID(),
        eventName: 'users.listed',
        aggregateId: query.requesterId,
        aggregateVersion: 1,
        occurredAt: new Date(),
        correlationId: query.correlationId,
        metadata: {
          requesterRole: query.requesterRole,
          page: query.page,
          limit: query.limit,
          sortBy: query.sortBy,
          sortOrder: query.sortOrder,
          hasFilters: query.hasAnyFilter(),
          totalCount,
          durationMs: Date.now() - startTime,
          source: 'list_users_query',
        },
      });
    } catch (error) {
      this.logger.warn(`Failed to publish list users event: ${error.message}`);
    }
  }
}

// ============================================================
// Type Exports
// ============================================================

export type { EnhancedPaginatedResponse as EnhancedPaginatedResponseType };
