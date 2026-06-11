/**
 * Get User Query Handler - Application Layer (Enterprise Enhanced v3.0)
 *
 * @module application/queries/user/get-user.handler
 *
 * @description
 * Handles retrieving user details by ID with enterprise-grade features:
 * - Multi-level caching (L1 memory, L2 Redis)
 * - Role-based access control with shared-constants
 * - Conditional field exposure (sensitive fields only for authorized)
 * - Distributed tracing with correlation ID
 * - Rate limiting for sensitive data access
 * - Circuit breaker for external dependencies
 * - Retry mechanism with exponential backoff
 * - Complete audit logging with severity levels
 * - Bangladesh-specific fields support
 * - Bengali error messages
 *
 * Enterprise Rules:
 * ✅ Single responsibility - handles only user retrieval
 * ✅ Repository coordination with caching strategy
 * ✅ Read-only operation (no state change)
 * ✅ Permission validation with shared-constants
 * ✅ Comprehensive audit logging
 * ✅ Performance optimized with multi-tier cache
 */

import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { randomUUID } from 'crypto';

import { GetUserQuery, isGetUserQuery, validateQuery } from './get-user.query';
import { UserRepository } from '../../../domain/repositories/user.repository.interface';
import { PermissionRepository } from '../../../domain/repositories/permission.repository.interface';
import { UserMapper, UserResponseDto } from '../../mappers/user.mapper';

// ✅ ENTERPRISE: Import from shared packages (Single Source of Truth)
import {
  USER_ROLES,
  AUDIT_SEVERITIES,
  CACHE_TTL,
  RATE_LIMIT_CONFIG,
} from '@vubon/shared-constants';
import type { AuditSeverity, RequestContext } from '@vubon/shared-types';
import { maskEmail, maskPhone } from '@vubon/shared-utils';

// ✅ ENTERPRISE: Import infrastructure interfaces
import {
  AuditService,
  CacheService,
  EventBus,
} from '../commands/infrastructure.interface';
import { CacheKeyBuilder } from '../../services/interfaces/cache.service.interface';

// ============================================================
// Enhanced Response DTO with Bangladesh Fields
// ============================================================

export interface EnhancedUserResponseDto extends UserResponseDto {
  /** User permissions (if requested) */
  permissions?: string[];

  /** User preferences */
  preferences?: {
    language: 'en' | 'bn';
    timezone: string;
    currency: 'BDT' | 'USD';
    emailNotifications: boolean;
    smsNotifications: boolean;
    pushNotifications: boolean;
  };

  /** User activity summary */
  activitySummary?: {
    totalLogins: number;
    lastLoginAt?: Date;
    totalOrders: number;
    totalSpent: number;
    averageOrderValue: number;
    accountAgeDays: number;
  };

  // ✅ ENTERPRISE: Bangladesh-specific fields
  /** Preferred district (Bangladesh) */
  preferredDistrict?: string;

  /** Preferred upazila/sub-district (Bangladesh) */
  preferredUpazila?: string;

  /** Preferred language (en/bn) */
  preferredLanguage?: 'en' | 'bn';

  /** Current district (from last login) */
  district?: string;

  /** Mobile operator detection */
  mobileOperator?: 'gp' | 'robi' | 'banglalink' | 'teletalk' | 'unknown';

  /** Network type at last login */
  networkType?: '2g' | '3g' | '4g' | '5g' | 'wifi' | 'unknown';

  /** Whether user is a vendor */
  isVendor?: boolean;

  /** Whether KYC is verified */
  isKycVerified?: boolean;

  /** Total amount spent */
  totalSpent?: number;

  /** Cache timestamp (for debugging) */
  _cacheHit?: boolean;
  _cacheTimestamp?: string;
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
// Rate Limit Check
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
// Get User Handler (Enterprise Enhanced)
// ============================================================

@Injectable()
export class GetUserHandler {
  private readonly logger = new Logger(GetUserHandler.name);
  private readonly queryCircuitBreaker = CircuitBreaker.getInstance('user-query');

  constructor(
    private readonly userRepository: UserRepository,
    private readonly permissionRepository: PermissionRepository,
    private readonly auditService: AuditService,
    private readonly cacheService: CacheService,
    private readonly eventBus: EventBus,
    private readonly userMapper: UserMapper,
  ) {}

  /**
   * Execute the Get User query
   *
   * @param query - Get user query with targetUserId and options
   * @returns Enhanced user profile with privacy controls
   */
  async execute(query: GetUserQuery): Promise<EnhancedUserResponseDto> {
    const startTime = Date.now();
    const {
      targetUserId,
      requesterId,
      requesterRole,
      correlationId,
      context,
      options,
    } = query;

    this.logger.log(
      `Executing GetUserQuery for target ${targetUserId}, requester ${requesterId}, correlationId: ${correlationId}`,
    );

    try {
      // 1. Validate query
      const validation = validateQuery(query);
      if (!validation.isValid) {
        throw new BadRequestException(validation.error, validation.errorBn);
      }

      // 2. Check rate limit
      await checkRateLimit(this.cacheService, requesterId, 'get_user');

      // 3. Permission validation (using query methods)
      if (!query.hasPermission()) {
        await this.auditUnauthorizedAccess(
          requesterId,
          targetUserId,
          requesterRole,
          correlationId,
        );
        throw new ForbiddenException(
          'You do not have permission to view this user',
          'এই ব্যবহারকারী দেখার অনুমতি আপনার নেই',
        );
      }

      // 4. Try multi-level cache
      let cacheHit = false;
      let user = await this.getCachedUser(targetUserId, query);

      if (user) {
        cacheHit = true;
        this.logger.debug(`Cache hit for user ${targetUserId}`);
      } else {
        // 5. Fetch from repository with circuit breaker
        user = await this.queryCircuitBreaker.call(async () => {
          return withRetry(() => this.userRepository.findById(targetUserId));
        });

        if (!user) {
          throw new NotFoundException(
            `User with ID ${targetUserId} not found`,
            `আইডি ${targetUserId} সহ ইউজার পাওয়া যায়নি`,
          );
        }

        // 6. Cache the result
        await this.cacheUser(targetUserId, user, query);
      }

      // 7. Check permission for sensitive data access
      const canViewSensitive = query.canViewSensitiveFields();

      // 8. Audit log for sensitive data access
      if (canViewSensitive) {
        await this.auditSensitiveDataAccess(
          requesterId,
          targetUserId,
          requesterRole,
          correlationId,
        );
      }

      // 9. Map to DTO with permission-based field filtering
      let userProfile = this.userMapper.toResponseDto(user, {
        includeSensitive: canViewSensitive,
        includePermissions: query.shouldIncludePermissions(),
        includePreferences: query.shouldIncludePreferences(),
        includeActivitySummary: query.shouldIncludeActivitySummary(),
        cacheHit,
      });

      // 10. Add Bangladesh-specific fields
      userProfile = this.addBangladeshFields(userProfile, user);

      // 11. Get permissions (if requested)
      let permissions: string[] | undefined;
      if (query.shouldIncludePermissions()) {
        permissions = await this.getUserPermissions(targetUserId);
      }

      // 12. Get preferences (if requested)
      let preferences: EnhancedUserResponseDto['preferences'] | undefined;
      if (query.shouldIncludePreferences()) {
        preferences = await this.getUserPreferences(user);
      }

      // 13. Get activity summary (if requested)
      let activitySummary: EnhancedUserResponseDto['activitySummary'] | undefined;
      if (query.shouldIncludeActivitySummary()) {
        activitySummary = await this.getActivitySummary(user, targetUserId);
      }

      // 14. Build response
      const response: EnhancedUserResponseDto = {
        ...userProfile,
        permissions,
        preferences,
        activitySummary,
        _cacheHit: cacheHit,
        _cacheTimestamp: cacheHit ? new Date().toISOString() : undefined,
      };

      // 15. Audit log for successful access
      await this.auditLog(
        requesterId,
        targetUserId,
        requesterRole,
        canViewSensitive,
        query,
        startTime,
      );

      // 16. Publish user accessed event (for analytics)
      await this.publishUserAccessedEvent(targetUserId, requesterId, query, startTime);

      return response;
    } catch (error) {
      this.logger.error(
        `GetUserQuery failed for target ${targetUserId}: ${error.message}`,
      );

      // Audit failure
      await this.auditService.log({
        action: 'GET_USER_FAILED',
        userId: requesterId,
        targetUserId,
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
   * Get cached user with proper TTL based on query options
   */
  private async getCachedUser(
    userId: string,
    query: GetUserQuery,
  ): Promise<any | null> {
    const cacheKey = query.getCacheKey();

    try {
      const cached = await this.cacheService.get(cacheKey);
      if (cached && !query.shouldBypassCache()) {
        return cached;
      }
      return null;
    } catch (error) {
      this.logger.warn(`Cache get failed for user ${userId}: ${error.message}`);
      return null;
    }
  }

  /**
   * Cache user with appropriate TTL
   */
  private async cacheUser(
    userId: string,
    user: any,
    query: GetUserQuery,
  ): Promise<void> {
    const cacheKey = query.getCacheKey();
    const ttl = query.getCacheTtlSeconds() || CACHE_TTL.USER_PROFILE;

    try {
      await this.cacheService.set(cacheKey, user, ttl);
    } catch (error) {
      this.logger.warn(`Cache set failed for user ${userId}: ${error.message}`);
    }
  }

  /**
   * Add Bangladesh-specific fields to response
   */
  private addBangladeshFields(
    profile: UserResponseDto,
    user: any,
  ): UserResponseDto {
    return {
      ...profile,
      preferredDistrict: user.getPreferredDistrict?.(),
      preferredUpazila: user.getPreferredUpazila?.(),
      preferredLanguage: user.getPreferredLanguage?.() || 'en',
      district: user.getLastLoginDistrict?.(),
      mobileOperator: user.getLastLoginMobileOperator?.(),
      networkType: user.getLastLoginNetworkType?.(),
      isVendor: user.getRole?.() === USER_ROLES.VENDOR,
      isKycVerified: user.isKycVerified?.(),
      totalSpent: user.getTotalSpent?.(),
    };
  }

  /**
   * Get user permissions
   */
  private async getUserPermissions(userId: string): Promise<string[]> {
    const cacheKey = CacheKeyBuilder.userPermissions(userId);

    try {
      const cached = await this.cacheService.get<string[]>(cacheKey);
      if (cached) return cached;
    } catch (error) {
      this.logger.warn(`Permission cache get failed: ${error.message}`);
    }

    const permissions = await this.permissionRepository.getUserPermissions(userId);

    try {
      await this.cacheService.set(cacheKey, permissions, CACHE_TTL.USER_PERMISSIONS);
    } catch (error) {
      this.logger.warn(`Permission cache set failed: ${error.message}`);
    }

    return permissions;
  }

  /**
   * Get user preferences
   */
  private async getUserPreferences(
    user: any,
  ): Promise<EnhancedUserResponseDto['preferences']> {
    return {
      language: user.getPreferredLanguage?.() || 'en',
      timezone: user.getTimezone?.() || 'Asia/Dhaka',
      currency: 'BDT',
      emailNotifications: user.getPreferences?.()?.emailNotifications ?? true,
      smsNotifications: user.getPreferences?.()?.smsNotifications ?? true,
      pushNotifications: user.getPreferences?.()?.pushNotifications ?? true,
    };
  }

  /**
   * Get user activity summary
   */
  private async getActivitySummary(
    user: any,
    userId: string,
  ): Promise<EnhancedUserResponseDto['activitySummary']> {
    const cacheKey = CacheKeyBuilder.userActivitySummary(userId);

    try {
      const cached = await this.cacheService.get(cacheKey);
      if (cached) return cached as any;
    } catch (error) {
      this.logger.warn(`Activity summary cache get failed: ${error.message}`);
    }

    const summary = {
      totalLogins: user.getTotalLogins?.() || 0,
      lastLoginAt: user.getLastLoginAt?.(),
      totalOrders: user.getTotalOrders?.() || 0,
      totalSpent: user.getTotalSpent?.() || 0,
      averageOrderValue: user.getTotalOrders?.()
        ? (user.getTotalSpent?.() || 0) / user.getTotalOrders()
        : 0,
      accountAgeDays: Math.floor(
        (Date.now() - (user.getCreatedAt?.() || new Date()).getTime()) /
          (1000 * 60 * 60 * 24),
      ),
    };

    try {
      await this.cacheService.set(cacheKey, summary, CACHE_TTL.USER_ACTIVITY);
    } catch (error) {
      this.logger.warn(`Activity summary cache set failed: ${error.message}`);
    }

    return summary;
  }

  /**
   * Audit log for unauthorized access attempt
   */
  private async auditUnauthorizedAccess(
    requesterId: string,
    targetUserId: string,
    requesterRole: string,
    correlationId?: string,
  ): Promise<void> {
    await this.auditService.log({
      action: 'GET_USER_UNAUTHORIZED',
      userId: requesterId,
      targetUserId,
      requesterRole,
      correlationId,
      timestamp: new Date().toISOString(),
      severity: AUDIT_SEVERITIES.WARNING,
    });
  }

  /**
   * Audit log for sensitive data access
   */
  private async auditSensitiveDataAccess(
    requesterId: string,
    targetUserId: string,
    requesterRole: string,
    correlationId?: string,
  ): Promise<void> {
    await this.auditService.log({
      action: 'GET_USER_SENSITIVE_DATA_ACCESSED',
      userId: requesterId,
      targetUserId,
      requesterRole,
      fieldsAccessed: ['email', 'phone'],
      correlationId,
      timestamp: new Date().toISOString(),
      severity: AUDIT_SEVERITIES.INFO,
    });
  }

  /**
   * Audit log for successful access
   */
  private async auditLog(
    requesterId: string,
    targetUserId: string,
    requesterRole: string,
    accessedSensitive: boolean,
    query: GetUserQuery,
    startTime: number,
  ): Promise<void> {
    const severity: AuditSeverity = accessedSensitive
      ? AUDIT_SEVERITIES.INFO
      : AUDIT_SEVERITIES.LOW;

    await this.auditService.log({
      action: 'GET_USER',
      userId: requesterId,
      targetUserId,
      requesterRole,
      isSelf: query.isSelf(),
      isAdmin: query.isAdmin(),
      includeSensitive: accessedSensitive,
      includePermissions: query.shouldIncludePermissions(),
      includePreferences: query.shouldIncludePreferences(),
      includeActivitySummary: query.shouldIncludeActivitySummary(),
      bypassCache: query.shouldBypassCache(),
      correlationId: query.correlationId,
      ipAddress: query.getIpAddress(),
      userAgent: query.getUserAgent(),
      district: query.getDistrict(),
      networkType: query.getNetworkType(),
      timestamp: new Date().toISOString(),
      durationMs: Date.now() - startTime,
      severity,
    });
  }

  /**
   * Publish user accessed event for analytics
   */
  private async publishUserAccessedEvent(
    targetUserId: string,
    requesterId: string,
    query: GetUserQuery,
    startTime: number,
  ): Promise<void> {
    try {
      await this.eventBus.publish({
        eventId: randomUUID(),
        eventName: 'user.profile.accessed',
        aggregateId: targetUserId,
        aggregateVersion: 1,
        occurredAt: new Date(),
        correlationId: query.correlationId,
        metadata: {
          requesterId,
          isSelf: query.isSelf(),
          isAdmin: query.isAdmin(),
          includeSensitive: query.canViewSensitiveFields(),
          includePermissions: query.shouldIncludePermissions(),
          source: 'get_user_query',
          durationMs: Date.now() - startTime,
        },
      });
    } catch (error) {
      this.logger.warn(`Failed to publish user accessed event: ${error.message}`);
    }
  }
}

// ============================================================
// Type Exports
// ============================================================

export type { EnhancedUserResponseDto as EnhancedUserResponseDtoType };
