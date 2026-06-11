/**
 * Get Session Query Handler - Application Layer (Enterprise Enhanced v4.0)
 * 
 * @module application/queries/session/get-session.handler
 * 
 * @description
 * Handles retrieving a specific session by ID with enterprise-grade features:
 * - Multi-level caching (L1 memory, L2 Redis)
 * - Ownership validation with role-based access
 * - Session health scoring (0-100) with risk assessment
 * - Rate limiting for API abuse prevention
 * - Circuit breaker for external dependencies
 * - Retry mechanism with exponential backoff
 * - Complete audit logging with severity levels
 * - Distributed tracing with correlation ID
 * - Bangladesh-specific fields (district, division, networkType, mobileOperator)
 * - Cache hit tracking for debugging
 * - Bengali error messages
 * - Feature phone detection support
 * 
 * Enterprise Rules:
 * ✅ Single responsibility - handles only session retrieval
 * ✅ Repository coordination with caching strategy
 * ✅ Read-only operation (no state change)
 * ✅ Ownership validation with admin override
 * ✅ Comprehensive audit logging with severity levels
 * ✅ Performance optimized with multi-tier cache
 */

import { Injectable, NotFoundException, UnauthorizedException, BadRequestException, Logger } from '@nestjs/common';
import { randomUUID } from 'crypto';

import { GetSessionQuery, validateQuery, getDefaultCacheTtl } from './get-session.query';
import { SessionRepository } from '../../../domain/repositories/session.repository.interface';
import { UserRepository } from '../../../domain/repositories/user.repository.interface';
import { Session, SessionStatus } from '../../../domain/entities/session.entity';
import { SessionMapper, SessionResponseDto } from '../../mappers/session.mapper';

// ✅ ENTERPRISE: Import from shared packages (Single Source of Truth)
import { AUDIT_SEVERITIES, CACHE_TTL, RATE_LIMIT_CONFIG, SESSION_HEALTH_THRESHOLDS } from '@vubon/shared-constants';
import type { AuditSeverity, RequestContext } from '@vubon/shared-types';
import { maskEmail, maskPhone } from '@vubon/shared-utils';

// ✅ ENTERPRISE: Import infrastructure interfaces
import { AuditService, CacheService, EventBus } from '../../commands/infrastructure.interface';
import { CacheKeyBuilder } from '../../services/interfaces/cache.service.interface';

// ============================================================
// Session Health Score Interface
// ============================================================

export interface SessionHealthScore {
  score: number;
  status: 'excellent' | 'good' | 'fair' | 'poor' | 'critical';
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  factors: {
    age: { score: number; weight: number; description: string; descriptionBn?: string };
    activityFrequency: { score: number; weight: number; description: string; descriptionBn?: string };
    locationStability: { score: number; weight: number; description: string; descriptionBn?: string };
    deviceConsistency: { score: number; weight: number; description: string; descriptionBn?: string };
    networkReliability: { score: number; weight: number; description: string; descriptionBn?: string };
  };
  recommendations: string[];
  recommendationsBn?: string[];
  requiresAction: boolean;
  suggestedAction?: 'reauthenticate' | 'extend' | 'terminate' | 'monitor';
  assessedAt: Date;
}

// ============================================================
// Enhanced Response DTO with Cache Metadata
// ============================================================

export interface EnhancedSessionResponseDto extends SessionResponseDto {
  _cacheHit?: boolean;
  _cacheTimestamp?: string;
  _queryTimeMs?: number;
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
      nextAttemptAt: this.state.nextAttemptTime ? new Date(this.state.nextAttemptTime) : undefined,
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
// Get Session Handler (Enterprise Enhanced)
// ============================================================

@Injectable()
export class GetSessionHandler {
  private readonly logger = new Logger(GetSessionHandler.name);
  private readonly sessionCircuitBreaker = CircuitBreaker.getInstance('session-query');

  constructor(
    private readonly sessionRepository: SessionRepository,
    private readonly userRepository: UserRepository,
    private readonly auditService: AuditService,
    private readonly cacheService: CacheService,
    private readonly eventBus: EventBus,
    private readonly sessionMapper: SessionMapper,
  ) {}

  /**
   * Execute the Get Session query
   * 
   * @param query - Get session query with sessionId and userId
   * @returns Enhanced session response with health score and cache metadata
   */
  async execute(query: GetSessionQuery): Promise<EnhancedSessionResponseDto> {
    const startTime = Date.now();
    const { sessionId, userId, context, options, correlationId } = query;

    this.logger.log(`Executing GetSessionQuery for session ${sessionId}, user ${userId}, correlationId: ${correlationId}`);

    try {
      // 1. Validate query
      const validation = validateQuery(query);
      if (!validation.isValid) {
        throw new BadRequestException(validation.error, validation.errorBn);
      }

      // 2. Check rate limit
      await checkRateLimit(this.cacheService, userId, 'get_session');

      // 3. Try multi-level cache
      const cacheKey = query.getCacheKey();
      let cacheHit = false;
      let session = await this.getCachedSession(cacheKey, query);

      if (session) {
        cacheHit = true;
        this.logger.debug(`Cache hit for session ${sessionId}`);
      } else {
        // 4. Fetch from repository with circuit breaker and retry
        session = await this.sessionCircuitBreaker.call(async () => {
          return withRetry(() => this.sessionRepository.findById(sessionId));
        });

        if (!session) {
          throw new NotFoundException(
            `Session with ID ${sessionId} not found`,
            `আইডি ${sessionId} সহ সেশন পাওয়া যায়নি`,
          );
        }

        // 5. Cache the result
        await this.cacheSession(cacheKey, session, query);
      }

      // 6. Ownership validation (with admin override)
      const isOwner = session.validateOwnership(userId);
      const isAdmin = context?.isAdmin === true;

      if (!isOwner && !isAdmin) {
        await this.auditUnauthorizedAccess(query, session);
        throw new UnauthorizedException(
          'Cannot view another user\'s session',
          'অন্য ব্যবহারকারীর সেশন দেখার অনুমতি নেই',
        );
      }

      // 7. Check if session is expired
      if (session.isExpired()) {
        this.logger.debug(`Session ${sessionId} is expired`);
      }

      // 8. Calculate health score if requested
      let healthScore: SessionHealthScore | undefined;
      if (query.shouldIncludeHealthScore()) {
        healthScore = await this.calculateSessionHealthScore(session);
      }

      // 9. Get user info for Bangladesh fields
      const user = await this.userRepository.findById(userId);

      // 10. Map to DTO with all computed fields
      const response = this.sessionMapper.toDto(session, {
        includeDeviceInfo: query.shouldIncludeDeviceInfo(),
        includeLocation: query.shouldIncludeLocation(),
        includeMetadata: query.shouldIncludeMetadata(),
        includeActivityTimeline: query.shouldIncludeActivityTimeline(),
        healthScore,
        user,
        cacheHit,
      });

      // 11. Add Bangladesh-specific fields
      const enhancedResponse: EnhancedSessionResponseDto = {
        ...response,
        district: session.getDistrict(),
        division: session.getDivision(),
        networkType: session.getNetworkType(),
        mobileOperator: session.getMobileOperator(),
        upazila: session.getUpazila(),
        _cacheHit: cacheHit,
        _cacheTimestamp: cacheHit ? new Date().toISOString() : undefined,
        _queryTimeMs: Date.now() - startTime,
        _correlationId: correlationId,
      };

      // 12. Audit log for successful access
      await this.auditLog(query, session, cacheHit, startTime);

      // 13. Publish session accessed event (for analytics)
      await this.publishSessionAccessedEvent(query, session, startTime);

      return enhancedResponse;
    } catch (error) {
      this.logger.error(`GetSessionQuery failed for session ${sessionId}: ${error.message}`);

      // Audit failure
      await this.auditService.log({
        action: 'GET_SESSION_FAILED',
        userId,
        sessionId,
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
   * Get cached session if available and not bypassed
   */
  private async getCachedSession(
    cacheKey: string,
    query: GetSessionQuery,
  ): Promise<Session | null> {
    if (query.shouldBypassCache()) {
      return null;
    }

    try {
      const cached = await this.cacheService.get<Session>(cacheKey);
      return cached || null;
    } catch (error) {
      this.logger.warn(`Cache get failed: ${error.message}`);
      return null;
    }
  }

  /**
   * Cache session with appropriate TTL
   */
  private async cacheSession(
    cacheKey: string,
    session: Session,
    query: GetSessionQuery,
  ): Promise<void> {
    try {
      const ttl = query.getCacheTtl() || getDefaultCacheTtl();
      await this.cacheService.set(cacheKey, session, ttl);
    } catch (error) {
      this.logger.warn(`Cache set failed: ${error.message}`);
    }
  }

  /**
   * Calculate session health score (0-100)
   */
  private async calculateSessionHealthScore(session: Session): Promise<SessionHealthScore> {
    let score = 100;
    const factors = {
      age: { score: 100, weight: 0.2, description: 'Session age', descriptionBn: 'সেশনের বয়স' },
      activityFrequency: { score: 100, weight: 0.25, description: 'Activity frequency', descriptionBn: 'অ্যাক্টিভিটি ফ্রিকোয়েন্সি' },
      locationStability: { score: 100, weight: 0.2, description: 'Location stability', descriptionBn: 'লোকেশন স্থিতিশীলতা' },
      deviceConsistency: { score: 100, weight: 0.2, description: 'Device consistency', descriptionBn: 'ডিভাইস কনসিসটেন্সি' },
      networkReliability: { score: 100, weight: 0.15, description: 'Network reliability', descriptionBn: 'নেটওয়ার্ক নির্ভরযোগ্যতা' },
    };

    // Age factor (older sessions = lower score)
    const ageHours = session.getAgeMinutes() / 60;
    if (ageHours > 24) factors.age.score = 60;
    else if (ageHours > 12) factors.age.score = 80;
    else if (ageHours > 6) factors.age.score = 90;

    // Activity frequency
    const idleMinutes = session.getIdleTimeMinutes();
    if (idleMinutes > 60) factors.activityFrequency.score = 50;
    else if (idleMinutes > 30) factors.activityFrequency.score = 70;
    else if (idleMinutes > 15) factors.activityFrequency.score = 85;

    // Location stability
    const metadata = session.getMetadata();
    if (metadata.district && metadata.previousDistrict && metadata.district !== metadata.previousDistrict) {
      factors.locationStability.score = 60;
    }

    // Device consistency
    const deviceFingerprint = metadata.deviceFingerprint;
    const previousDeviceFingerprint = metadata.previousDeviceFingerprint;
    if (deviceFingerprint && previousDeviceFingerprint && deviceFingerprint !== previousDeviceFingerprint) {
      factors.deviceConsistency.score = 50;
    }

    // Network reliability
    const networkType = metadata.networkType;
    if (networkType === '2g') factors.networkReliability.score = 60;
    else if (networkType === '3g') factors.networkReliability.score = 75;
    else if (networkType === '4g') factors.networkReliability.score = 90;
    else if (networkType === '5g' || networkType === 'wifi') factors.networkReliability.score = 100;

    // Calculate total score
    for (const factor of Object.values(factors)) {
      score -= (100 - factor.score) * factor.weight;
    }
    score = Math.max(0, Math.min(100, Math.round(score)));

    let status: 'excellent' | 'good' | 'fair' | 'poor' | 'critical';
    if (score >= 80) status = 'excellent';
    else if (score >= 60) status = 'good';
    else if (score >= 40) status = 'fair';
    else if (score >= 20) status = 'poor';
    else status = 'critical';

    let riskLevel: 'low' | 'medium' | 'high' | 'critical';
    if (score >= 70) riskLevel = 'low';
    else if (score >= 50) riskLevel = 'medium';
    else if (score >= 30) riskLevel = 'high';
    else riskLevel = 'critical';

    const recommendations: string[] = [];
    const recommendationsBn: string[] = [];

    if (factors.age.score < 80) {
      recommendations.push('Session is old. Consider re-authenticating.');
      recommendationsBn.push('সেশন পুরানো। পুনরায় অথেনটিকেট করার পরামর্শ দেওয়া হচ্ছে।');
    }
    if (factors.activityFrequency.score < 70) {
      recommendations.push('Session is inactive. Please use the application to keep it active.');
      recommendationsBn.push('সেশন নিষ্ক্রিয়। অ্যাপ্লিকেশন ব্যবহার করুন সেশন সক্রিয় রাখতে।');
    }
    if (factors.locationStability.score < 80) {
      recommendations.push('Location changed. This may affect security.');
      recommendationsBn.push('লোকেশন পরিবর্তন হয়েছে। এটি নিরাপত্তা প্রভাবিত করতে পারে।');
    }
    if (factors.deviceConsistency.score < 80) {
      recommendations.push('Device fingerprint changed. Verify your device.');
      recommendationsBn.push('ডিভাইস ফিঙ্গারপ্রিন্ট পরিবর্তন হয়েছে। আপনার ডিভাইস যাচাই করুন।');
    }

    return {
      score,
      status,
      riskLevel,
      factors,
      recommendations,
      recommendationsBn,
      requiresAction: score < 50,
      suggestedAction: score < 30 ? 'terminate' : score < 50 ? 'reauthenticate' : 'monitor',
      assessedAt: new Date(),
    };
  }

  /**
   * Audit log for unauthorized access attempt
   */
  private async auditUnauthorizedAccess(
    query: GetSessionQuery,
    session: Session,
  ): Promise<void> {
    await this.auditService.log({
      action: 'GET_SESSION_UNAUTHORIZED',
      userId: query.userId,
      sessionId: query.sessionId,
      sessionOwnerId: session.getUserId(),
      correlationId: query.correlationId,
      ipAddress: query.getIpAddress(),
      userAgent: query.getUserAgent(),
      timestamp: new Date().toISOString(),
      severity: AUDIT_SEVERITIES.WARNING,
    });
  }

  /**
   * Audit log for successful access
   */
  private async auditLog(
    query: GetSessionQuery,
    session: Session,
    cacheHit: boolean,
    startTime: number,
  ): Promise<void> {
    const severity: AuditSeverity = AUDIT_SEVERITIES.INFO;

    await this.auditService.log({
      action: 'GET_SESSION',
      userId: query.userId,
      sessionId: query.sessionId,
      sessionOwnerId: session.getUserId(),
      isOwner: session.validateOwnership(query.userId),
      isAdmin: query.context?.isAdmin === true,
      cacheHit,
      includeDeviceInfo: query.shouldIncludeDeviceInfo(),
      includeLocation: query.shouldIncludeLocation(),
      includeHealthScore: query.shouldIncludeHealthScore(),
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
   * Publish session accessed event for analytics
   */
  private async publishSessionAccessedEvent(
    query: GetSessionQuery,
    session: Session,
    startTime: number,
  ): Promise<void> {
    try {
      await this.eventBus.publish({
        eventId: randomUUID(),
        eventName: 'session.accessed',
        aggregateId: query.sessionId,
        aggregateVersion: 1,
        occurredAt: new Date(),
        correlationId: query.correlationId,
        metadata: {
          userId: query.userId,
          isOwner: session.validateOwnership(query.userId),
          isAdmin: query.context?.isAdmin === true,
          includeHealthScore: query.shouldIncludeHealthScore(),
          cacheHit: false,
          durationMs: Date.now() - startTime,
          source: 'get_session_query',
        },
      });
    } catch (error) {
      this.logger.warn(`Failed to publish session accessed event: ${error.message}`);
    }
  }
}

// ============================================================
// Type Exports
// ============================================================

export type { SessionHealthScore as SessionHealthScoreType, EnhancedSessionResponseDto as EnhancedSessionResponseDtoType };
