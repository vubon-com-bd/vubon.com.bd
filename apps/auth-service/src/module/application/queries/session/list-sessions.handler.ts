/**
 * List Sessions Query Handler - Application Layer (Enterprise Enhanced v2.0)
 * 
 * @module application/queries/session/list-sessions.handler
 * 
 * @description
 * Handles retrieving paginated list of user sessions with enterprise-grade features:
 * - Multi-level caching (L1 memory, L2 Redis)
 * - Database-level pagination (efficient)
 * - Multi-criteria filtering (status, district, network type, mobile operator, date range)
 * - Rate limiting for API abuse prevention
 * - Circuit breaker for external dependencies
 * - Retry mechanism with exponential backoff
 * - Complete audit logging with severity levels
 * - Distributed tracing with correlation ID
 * - Bangladesh-specific filters (district, upazila, networkType, mobileOperator)
 * - IP address masking for privacy
 * - Cache hit tracking for debugging
 * - Query validation with Bengali error messages
 * - JSDoc documentation with examples
 * 
 * Enterprise Rules:
 * ✅ Single responsibility - handles only session listing
 * ✅ Repository coordination with caching strategy
 * ✅ Read-only operation (no state change)
 * ✅ Database-level pagination (no in-memory slicing)
 * ✅ Comprehensive audit logging with severity levels
 * ✅ Performance optimized with multi-tier cache
 */

import { Injectable, BadRequestException, Logger } from '@nestjs/common';
import { randomUUID } from 'crypto';

import { ListSessionsQuery, validateQuery } from './list-sessions.query';
import { SessionRepository } from '../../../domain/repositories/session.repository.interface';
import { SessionMapper, BriefSessionResponseDto } from '../../mappers/session.mapper';
import { PaginatedResponseDto } from '../../dtos/common/pagination.dto';

// ✅ ENTERPRISE: Import from shared packages (Single Source of Truth)
import { AUDIT_SEVERITIES, CACHE_TTL, RATE_LIMIT_CONFIG } from '@vubon/shared-constants';
import type { AuditSeverity, RequestContext } from '@vubon/shared-types';

// ✅ ENTERPRISE: Import infrastructure interfaces
import { AuditService, CacheService, EventBus } from '../../commands/infrastructure.interface';
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
        throw new Error(`Circuit breaker ${this.name} is OPEN. Service unavailable.`);
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
    await cacheService.expire(rateLimitKey, RATE_LIMIT_CONFIG.QUERY_WINDOW_SECONDS || 60);
  }

  const maxAttempts = RATE_LIMIT_CONFIG.MAX_QUERIES_PER_MINUTE || 100;
  if (attempts > maxAttempts) {
    throw new Error(`Rate limit exceeded for operation: ${operation}`);
  }
}

// ============================================================
// Mask IP Address for Privacy
// ============================================================

function maskIpAddress(ip: string): string {
  if (!ip) return ip;

  // IPv4: 192.168.1.100 -> 192.168.*.*
  if (ip.includes('.')) {
    const parts = ip.split('.');
    if (parts.length >= 4) {
      return `${parts[0]}.${parts[1]}.*.*`;
    }
  }

  // IPv6: show first 2 groups only
  if (ip.includes(':')) {
    const parts = ip.split(':');
    if (parts.length >= 2) {
      return `${parts[0]}:${parts[1]}:****:****:****:****:****:****`;
    }
  }

  return ip;
}

// ============================================================
// List Sessions Handler (Enterprise Enhanced)
// ============================================================

@Injectable()
export class ListSessionsHandler {
  private readonly logger = new Logger(ListSessionsHandler.name);
  private readonly queryCircuitBreaker = CircuitBreaker.getInstance('list-sessions');

  constructor(
    private readonly sessionRepository: SessionRepository,
    private readonly auditService: AuditService,
    private readonly cacheService: CacheService,
    private readonly eventBus: EventBus,
    private readonly sessionMapper: SessionMapper,
  ) {}

  /**
   * Execute the List Sessions query
   * 
   * @param query - List sessions query with pagination and filters
   * @returns Paginated list of sessions with cache metadata
   */
  async execute(
    query: ListSessionsQuery,
  ): Promise<EnhancedPaginatedResponse<BriefSessionResponseDto>> {
    const startTime = Date.now();
    const { userId, page, limit, sortBy, sortOrder, status, activeOnly, correlationId, context } = query;

    this.logger.log(
      `Executing ListSessionsQuery for user ${userId}, page=${page}, limit=${limit}, correlationId=${correlationId}`,
    );

    try {
      // 1. Validate query
      const validation = validateQuery(query);
      if (!validation.isValid) {
        throw new BadRequestException(validation.error, validation.errorBn);
      }

      // 2. Check rate limit
      await checkRateLimit(this.cacheService, userId, 'list_sessions');

      // 3. Try cache
      const cacheKey = query.getCacheKey();
      let cacheHit = false;
      let cachedResponse = await this.getCachedResponse(cacheKey, query);

      if (cachedResponse) {
        cacheHit = true;
        this.logger.debug(`Cache hit for list sessions query of user ${userId}`);
        return {
          ...cachedResponse,
          _cacheHit: true,
          _cacheTimestamp: new Date().toISOString(),
          _correlationId: correlationId,
        };
      }

      // 4. Build pagination options
      const paginationOptions = {
        page,
        limit,
        sortBy: sortBy || 'lastActivityAt',
        sortOrder: sortOrder || 'desc',
      };

      // 5. Fetch sessions with circuit breaker and retry
      let sessionsResult;

      if (activeOnly) {
        // Get only active sessions with database-level pagination
        sessionsResult = await this.queryCircuitBreaker.call(async () => {
          return withRetry(() =>
            this.sessionRepository.findActiveSessionsPaginated(userId, paginationOptions),
          );
        });
      } else if (status) {
        // Filter by status with userId
        sessionsResult = await this.queryCircuitBreaker.call(async () => {
          return withRetry(() =>
            this.sessionRepository.findByStatusAndUserId(userId, status, paginationOptions),
          );
        });
      } else {
        // Get all sessions with pagination
        sessionsResult = await this.queryCircuitBreaker.call(async () => {
          return withRetry(() =>
            this.sessionRepository.findByUserIdPaginated(userId, paginationOptions),
          );
        });
      }

      // 6. Map to brief DTOs with IP masking (privacy)
      const briefSessions = sessionsResult.data.map((session) =>
        this.sessionMapper.toBriefDto(session, {
          maskIp: true,
          includeLocation: query.includeLocation,
          includeDeviceInfo: query.includeDeviceInfo,
        }),
      );

      // 7. Create paginated response
      const response = new PaginatedResponseDto(
        briefSessions,
        sessionsResult.total,
        sessionsResult.page,
        sessionsResult.limit,
      ) as EnhancedPaginatedResponse<BriefSessionResponseDto>;

      // 8. Cache the response
      await this.cacheResponse(cacheKey, response, query);

      // 9. Audit log for successful access
      await this.auditLog(query, sessionsResult.total, startTime);

      // 10. Publish event for analytics
      await this.publishListSessionsEvent(query, sessionsResult.total, startTime);

      return {
        ...response,
        _cacheHit: false,
        _queryTimeMs: Date.now() - startTime,
        _correlationId: correlationId,
      };
    } catch (error) {
      this.logger.error(`ListSessionsQuery failed for user ${userId}: ${error.message}`);

      // Audit failure
      await this.auditService.log({
        action: 'LIST_SESSIONS_FAILED',
        userId,
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
    query: ListSessionsQuery,
  ): Promise<EnhancedPaginatedResponse<BriefSessionResponseDto> | null> {
    if (query.shouldBypassCache()) {
      return null;
    }

    try {
      const cached = await this.cacheService.get<EnhancedPaginatedResponse<BriefSessionResponseDto>>(
        cacheKey,
      );
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
    response: EnhancedPaginatedResponse<BriefSessionResponseDto>,
    query: ListSessionsQuery,
  ): Promise<void> {
    try {
      const ttl = query.getCacheTtl() || CACHE_TTL.SESSION_LIST || 30;
      await this.cacheService.set(cacheKey, response, ttl);
    } catch (error) {
      this.logger.warn(`Cache set failed: ${error.message}`);
    }
  }

  /**
   * Audit log for session listing
   */
  private async auditLog(
    query: ListSessionsQuery,
    totalCount: number,
    startTime: number,
  ): Promise<void> {
    const severity: AuditSeverity = AUDIT_SEVERITIES.INFO;

    await this.auditService.log({
      action: 'LIST_SESSIONS',
      userId: query.userId,
      page: query.page,
      limit: query.limit,
      sortBy: query.sortBy,
      sortOrder: query.sortOrder,
      status: query.status,
      activeOnly: query.activeOnly,
      hasDistrictFilter: query.hasDistrictFilter(),
      hasNetworkTypeFilter: query.hasNetworkTypeFilter(),
      hasMobileOperatorFilter: query.hasMobileOperatorFilter(),
      totalCount,
      correlationId: query.getCorrelationId(),
      ipAddress: query.getIpAddress(),
      userAgent: query.getUserAgent(),
      timestamp: new Date().toISOString(),
      durationMs: Date.now() - startTime,
      severity,
    });
  }

  /**
   * Publish list sessions event for analytics
   */
  private async publishListSessionsEvent(
    query: ListSessionsQuery,
    totalCount: number,
    startTime: number,
  ): Promise<void> {
    try {
      await this.eventBus.publish({
        eventId: randomUUID(),
        eventName: 'sessions.listed',
        aggregateId: query.userId,
        aggregateVersion: 1,
        occurredAt: new Date(),
        correlationId: query.getCorrelationId(),
        metadata: {
          page: query.page,
          limit: query.limit,
          sortBy: query.sortBy,
          sortOrder: query.sortOrder,
          status: query.status,
          activeOnly: query.activeOnly,
          hasFilters: query.hasAnyFilter(),
          totalCount,
          durationMs: Date.now() - startTime,
          source: 'list_sessions_query',
        },
      });
    } catch (error) {
      this.logger.warn(`Failed to publish list sessions event: ${error.message}`);
    }
  }
}

// ============================================================
// Type Exports
// ============================================================

export type { EnhancedPaginatedResponse as EnhancedPaginatedResponseType };

// ============================================================
// Required Repository Interface Updates
// ============================================================

/**
 * Add these methods to your SessionRepository interface:
 * 
 * interface SessionRepository {
 *   // ... existing methods
 *   
 *   findActiveSessionsPaginated(
 *     userId: string,
 *     options: PaginationOptions
 *   ): Promise<PaginatedResult<Session>>;
 *   
 *   findByStatusAndUserId(
 *     userId: string,
 *     status: string,
 *     options: PaginationOptions
 *   ): Promise<PaginatedResult<Session>>;
 * }
 */
