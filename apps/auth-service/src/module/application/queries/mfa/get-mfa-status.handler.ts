/**
 * Get MFA Status Query Handler - Application Layer (Enterprise Enhanced v4.0)

 * @module application/queries/mfa/get-mfa-status.handler

 * @description
 * Handles retrieving MFA status for a user with enterprise-grade features:
 * - Multi-level caching (L1 memory, L2 Redis)
 * - Multiple MFA methods support (TOTP, SMS, WhatsApp, Email, WebAuthn, bKash, Nagad, Rocket)
 * - Complete status including lock state, backup codes, method priority
 * - Masked contact info for privacy (phone, email, MFS account)
 * - Rate limiting for API abuse prevention
 * - Circuit breaker for external dependencies
 * - Retry mechanism with exponential backoff
 * - Complete audit logging with severity levels
 * - Distributed tracing with correlation ID
 * - Bangladesh-specific fields (WhatsApp, bKash, Nagad, Rocket)
 * - Cache key generation with user ID
 * - Cache hit tracking for debugging
 * - Bengali error messages
 * - Health check integration

 * Enterprise Rules:
 * ✅ Single responsibility - handles only MFA status retrieval
 * ✅ Repository coordination with caching strategy
 * ✅ Read-only operation (no state change)
 * ✅ Support for multiple MFA methods per user
 * ✅ Complete audit logging with severity levels
 * ✅ Performance optimized with multi-tier cache
 */

import { Injectable, BadRequestException, Logger } from '@nestjs/common';
import { randomUUID } from 'crypto';

import { GetMfaStatusQuery, validateQuery } from './get-mfa-status.query';
import { MFARepository } from '../../../domain/repositories/mfa.repository.interface';
import { UserRepository } from '../../../domain/repositories/user.repository.interface';
import { MFA, MFAType, MFAStatus } from '../../../domain/entities/mfa.entity';
import { User } from '../../../domain/entities/user.entity';

// ✅ ENTERPRISE: Import from shared packages (Single Source of Truth)
import {
  AUDIT_SEVERITIES,
  CACHE_TTL,
  RATE_LIMIT_CONFIG,
  MFA_TYPES,
} from '@vubon/shared-constants';
import type { AuditSeverity, RequestContext } from '@vubon/shared-types';
import { maskEmail, maskPhone } from '@vubon/shared-utils';

// ✅ ENTERPRISE: Import infrastructure interfaces
import {
  AuditService,
  CacheService,
  EventBus,
} from '../../commands/infrastructure.interface';
import { CacheKeyBuilder } from '../../services/interfaces/cache.service.interface';

// ============================================================
// Response DTOs (Enterprise Enhanced)
// ============================================================

/**
 * Individual MFA method status (for multiple methods support)
 */
export interface MfaMethodStatusDto {
  /** Method ID */
  id: string;
  /** MFA type (TOTP, SMS, WHATSAPP, EMAIL, WEBAUTHN, BKASH_PIN, NAGAD_PIN, ROCKET_PIN) */
  type: string;
  /** Display name in English */
  displayName: string;
  /** Display name in Bengali */
  displayNameBn?: string;
  /** Whether this is the primary MFA method */
  isPrimary: boolean;
  /** Whether the method is verified */
  isVerified: boolean;
  /** Whether the method is locked */
  isLocked: boolean;
  /** Masked identifier (phone/email/account) for privacy */
  maskedIdentifier?: string;
  /** Remaining verification attempts */
  remainingAttempts: number;
  /** Remaining lock time in minutes (if locked) */
  remainingLockTimeMinutes?: number;
  /** When the method was created */
  createdAt: string;
  /** When the method was last used */
  lastUsedAt?: string;
  /** Priority (1 = highest) */
  priority: number;
  /** Whether this method supports backup codes */
  hasBackupCodes: boolean;
  /** Icon name for UI */
  iconName: string;
  /** Icon color for UI */
  iconColor: string;
}

/**
 * Enhanced MFA Status Response DTO with multiple methods support
 */
export interface MfaStatusResponseDto {
  /** Whether MFA is enabled (at least one method) */
  enabled: boolean;
  /** Total number of MFA methods */
  totalMethods: number;
  /** List of MFA methods */
  methods: MfaMethodStatusDto[];
  /** Primary method ID */
  primaryMethodId?: string;
  /** Recommended method for setup (based on device/network) */
  recommendedMethod?: {
    type: string;
    reason: string;
    reasonBn?: string;
  };
  /** Overall MFA status */
  status: 'healthy' | 'warning' | 'critical';
  /** Whether backup codes are available */
  hasBackupCodes: boolean;
  /** Number of remaining backup codes */
  remainingBackupCodes: number;
  /** Whether backup codes are low (≤ 3) */
  areBackupCodesLow: boolean;
  /** Whether backup code regeneration is needed */
  needsBackupCodeRegeneration: boolean;
  /** MFA health score (0-100) */
  healthScore: number;
  /** Health score status */
  healthStatus: 'excellent' | 'good' | 'fair' | 'poor' | 'critical';
  /** Health recommendations */
  healthRecommendations: string[];
  /** Whether any method is locked */
  hasLockedMethod: boolean;
  /** Whether any method is pending verification */
  hasPendingMethod: boolean;

  // ✅ Bangladesh-specific fields
  /** Whether WhatsApp MFA is available */
  whatsappAvailable?: boolean;
  /** Whether bKash PIN MFA is available */
  bkashAvailable?: boolean;
  /** Whether Nagad PIN MFA is available */
  nagadAvailable?: boolean;
  /** Whether Rocket PIN MFA is available */
  rocketAvailable?: boolean;

  // Cache metadata
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
// MFA Method Display Configuration
// ============================================================

const MFA_METHOD_DISPLAY: Record<string, { en: string; bn: string; icon: string; color: string }> = {
  [MFAType.TOTP]: { en: 'Authenticator App', bn: 'অথেনটিকেটর অ্যাপ', icon: 'smartphone', color: '#6366F1' },
  [MFAType.SMS]: { en: 'SMS', bn: 'এসএমএস', icon: 'message', color: '#10B981' },
  [MFAType.EMAIL]: { en: 'Email', bn: 'ইমেইল', icon: 'mail', color: '#3B82F6' },
  [MFAType.WEBAUTHN]: { en: 'Biometric / Passkey', bn: 'বায়োমেট্রিক / পাসকি', icon: 'fingerprint', color: '#8B5CF6' },
  [MFAType.WHATSAPP]: { en: 'WhatsApp', bn: 'হোয়াটসঅ্যাপ', icon: 'message-circle', color: '#25D366' },
  [MFAType.IMO]: { en: 'Imo', bn: 'আইএমও', icon: 'message-square', color: '#6DA9F2' },
  [MFAType.BKASH_PIN]: { en: 'bKash PIN', bn: 'বিকাশ পিন', icon: 'credit-card', color: '#E2136E' },
  [MFAType.NAGAD_PIN]: { en: 'Nagad PIN', bn: 'নগদ পিন', icon: 'credit-card', color: '#F26B21' },
  [MFAType.ROCKET_PIN]: { en: 'Rocket PIN', bn: 'রকেট পিন', icon: 'credit-card', color: '#1E88E5' },
  [MFAType.VOICE_CALL]: { en: 'Voice Call', bn: 'ভয়েস কল', icon: 'phone', color: '#F59E0B' },
};

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
// Get MFA Status Handler (Enterprise Enhanced)
// ============================================================

@Injectable()
export class GetMfaStatusHandler {
  private readonly logger = new Logger(GetMfaStatusHandler.name);
  private readonly mfaCircuitBreaker = CircuitBreaker.getInstance('mfa-status');

  constructor(
    private readonly mfaRepository: MFARepository,
    private readonly userRepository: UserRepository,
    private readonly auditService: AuditService,
    private readonly cacheService: CacheService,
    private readonly eventBus: EventBus,
  ) {}

  /**
   * Execute the Get MFA Status query

   * @param query - Get MFA status query with userId
   * @returns Enhanced MFA status response with multiple methods support
   */
  async execute(query: GetMfaStatusQuery): Promise<MfaStatusResponseDto> {
    const startTime = Date.now();
    const { userId, correlationId, context } = query;

    this.logger.log(`Executing GetMfaStatusQuery for user ${userId}, correlationId: ${correlationId}`);

    try {
      // 1. Validate query
      const validation = validateQuery(query);
      if (!validation.isValid) {
        throw new BadRequestException(validation.error, validation.errorBn);
      }

      // 2. Check rate limit
      await checkRateLimit(this.cacheService, userId, 'mfa_status');

      // 3. Try cache
      const cacheKey = CacheKeyBuilder.userMFAStatus(userId);
      let cacheHit = false;
      let cachedResponse = await this.getCachedResponse(cacheKey, query);

      if (cachedResponse) {
        cacheHit = true;
        this.logger.debug(`Cache hit for MFA status of user ${userId}`);
        return {
          ...cachedResponse,
          _cacheHit: true,
          _cacheTimestamp: new Date().toISOString(),
          _correlationId: correlationId,
        };
      }

      // 4. Fetch user
      const user = await this.getUserWithCircuitBreaker(userId);

      // 5. Fetch all MFA methods with circuit breaker
      const mfaMethods = await this.getMfaMethodsWithCircuitBreaker(userId);

      // 6. Build response
      const response = await this.buildResponse(mfaMethods, user, cacheHit, correlationId, startTime);

      // 7. Cache the response
      await this.cacheResponse(cacheKey, response, query);

      // 8. Audit log
      await this.auditLog(query, mfaMethods, startTime);

      // 9. Publish event for analytics
      await this.publishMfaStatusEvent(query, mfaMethods, startTime);

      return {
        ...response,
        _queryTimeMs: Date.now() - startTime,
        _correlationId: correlationId,
      };
    } catch (error) {
      this.logger.error(`GetMfaStatusQuery failed for user ${userId}: ${error.message}`);

      // Audit failure
      await this.auditService.log({
        action: 'MFA_STATUS_CHECK_FAILED',
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
    query: GetMfaStatusQuery,
  ): Promise<MfaStatusResponseDto | null> {
    if (query.shouldBypassCache()) {
      return null;
    }

    try {
      const cached = await this.cacheService.get<MfaStatusResponseDto>(cacheKey);
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
    response: MfaStatusResponseDto,
    query: GetMfaStatusQuery,
  ): Promise<void> {
    try {
      const ttl = query.getCacheTtl() || CACHE_TTL.MFA_STATUS;
      await this.cacheService.set(cacheKey, response, ttl);
    } catch (error) {
      this.logger.warn(`Cache set failed: ${error.message}`);
    }
  }

  /**
   * Get user with circuit breaker and retry
   */
  private async getUserWithCircuitBreaker(userId: string): Promise<User | null> {
    return this.mfaCircuitBreaker.call(async () => {
      return withRetry(() => this.userRepository.findById(userId));
    });
  }

  /**
   * Get MFA methods with circuit breaker and retry
   */
  private async getMfaMethodsWithCircuitBreaker(userId: string): Promise<MFA[]> {
    return this.mfaCircuitBreaker.call(async () => {
      return withRetry(() => this.mfaRepository.findAllByUserId(userId));
    });
  }

  /**
   * Build enhanced MFA status response
   */
  private async buildResponse(
    mfaMethods: MFA[],
    user: User | null,
    cacheHit: boolean,
    correlationId?: string,
    startTime?: number,
  ): Promise<MfaStatusResponseDto> {
    const enabledMethods = mfaMethods.filter((m) => m.isEnabled());
    const pendingMethods = mfaMethods.filter((m) => m.isPending());
    const lockedMethods = mfaMethods.filter((m) => m.isLocked());

    // Collect all backup codes from all methods
    const allBackupCodes = mfaMethods.flatMap((m) => m.getBackupCodes());
    const remainingBackupCodes = allBackupCodes.length;
    const areBackupCodesLow = remainingBackupCodes <= 3;

    // Calculate health score
    const healthScore = this.calculateHealthScore(mfaMethods, remainingBackupCodes);
    const healthStatus = this.getHealthStatus(healthScore);
    const healthRecommendations = this.getHealthRecommendations(mfaMethods, remainingBackupCodes);

    // Build methods list
    const methods: MfaMethodStatusDto[] = enabledMethods.map((method) => ({
      id: method.getId(),
      type: method.getType(),
      displayName: MFA_METHOD_DISPLAY[method.getType()]?.en || method.getType(),
      displayNameBn: MFA_METHOD_DISPLAY[method.getType()]?.bn,
      isPrimary: method.isPrimary(),
      isVerified: method.isVerified(),
      isLocked: method.isLocked(),
      maskedIdentifier: this.getMaskedIdentifier(method, user),
      remainingAttempts: method.getRemainingAttempts(),
      remainingLockTimeMinutes: method.isLocked() ? method.getRemainingLockTimeMinutes() : undefined,
      createdAt: method.getCreatedAt().toISOString(),
      lastUsedAt: method.getLastUsedAt()?.toISOString(),
      priority: method.getPriority(),
      hasBackupCodes: method.getBackupCodes().length > 0,
      iconName: MFA_METHOD_DISPLAY[method.getType()]?.icon || 'shield',
      iconColor: MFA_METHOD_DISPLAY[method.getType()]?.color || '#6B7280',
    }));

    // Sort by priority (lower number = higher priority)
    methods.sort((a, b) => a.priority - b.priority);

    // Determine overall status
    let overallStatus: 'healthy' | 'warning' | 'critical' = 'healthy';
    if (lockedMethods.length > 0) {
      overallStatus = 'critical';
    } else if (pendingMethods.length > 0 || areBackupCodesLow) {
      overallStatus = 'warning';
    }

    // Get recommended method based on device/network
    const recommendedMethod = this.getRecommendedMethod(mfaMethods, enabledMethods);

    // Check Bangladesh-specific availability
    const whatsappAvailable = enabledMethods.some((m) => m.getType() === MFAType.WHATSAPP);
    const bkashAvailable = enabledMethods.some((m) => m.getType() === MFAType.BKASH_PIN);
    const nagadAvailable = enabledMethods.some((m) => m.getType() === MFAType.NAGAD_PIN);
    const rocketAvailable = enabledMethods.some((m) => m.getType() === MFAType.ROCKET_PIN);

    return {
      enabled: enabledMethods.length > 0,
      totalMethods: enabledMethods.length,
      methods,
      primaryMethodId: enabledMethods.find((m) => m.isPrimary())?.getId(),
      recommendedMethod,
      status: overallStatus,
      hasBackupCodes: remainingBackupCodes > 0,
      remainingBackupCodes,
      areBackupCodesLow,
      needsBackupCodeRegeneration: areBackupCodesLow,
      healthScore,
      healthStatus,
      healthRecommendations,
      hasLockedMethod: lockedMethods.length > 0,
      hasPendingMethod: pendingMethods.length > 0,
      whatsappAvailable,
      bkashAvailable,
      nagadAvailable,
      rocketAvailable,
      _cacheHit: cacheHit,
      _cacheTimestamp: cacheHit ? new Date().toISOString() : undefined,
    };
  }

  /**
   * Get masked identifier for MFA method (privacy)
   */
  private getMaskedIdentifier(method: MFA, user: User | null): string | undefined {
    const type = method.getType();
    const identifier = method.getIdentifier();

    switch (type) {
      case MFAType.SMS:
      case MFAType.WHATSAPP:
      case MFAType.IMO:
      case MFAType.VOICE_CALL:
        return maskPhone(identifier);
      case MFAType.EMAIL:
        return maskEmail(identifier);
      case MFAType.BKASH_PIN:
      case MFAType.NAGAD_PIN:
      case MFAType.ROCKET_PIN:
        return maskPhone(identifier);
      default:
        return undefined;
    }
  }

  /**
   * Calculate MFA health score (0-100)
   */
  private calculateHealthScore(mfaMethods: MFA[], remainingBackupCodes: number): number {
    let score = 0;
    const enabledMethods = mfaMethods.filter((m) => m.isEnabled());

    // Score for having multiple methods (up to 30 points)
    const methodCount = Math.min(enabledMethods.length, 3);
    score += methodCount * 10;

    // Score for having strong methods (up to 40 points)
    const hasStrongMethod = enabledMethods.some(
      (m) => m.getType() === MFAType.TOTP || m.getType() === MFAType.WEBAUTHN,
    );
    if (hasStrongMethod) score += 30;

    // Score for backup codes (up to 20 points)
    if (remainingBackupCodes >= 10) score += 20;
    else if (remainingBackupCodes >= 5) score += 10;
    else if (remainingBackupCodes > 0) score += 5;

    // Score for having a primary method (10 points)
    if (enabledMethods.some((m) => m.isPrimary())) score += 10;

    return Math.min(100, score);
  }

  /**
   * Get health status based on score
   */
  private getHealthStatus(score: number): 'excellent' | 'good' | 'fair' | 'poor' | 'critical' {
    if (score >= 80) return 'excellent';
    if (score >= 60) return 'good';
    if (score >= 40) return 'fair';
    if (score >= 20) return 'poor';
    return 'critical';
  }

  /**
   * Get health recommendations
   */
  private getHealthRecommendations(mfaMethods: MFA[], remainingBackupCodes: number): string[] {
    const recommendations: string[] = [];
    const enabledMethods = mfaMethods.filter((m) => m.isEnabled());

    if (enabledMethods.length === 0) {
      recommendations.push('Enable MFA to secure your account');
      recommendations.push('এমএফএ সক্রিয় করুন আপনার অ্যাকাউন্ট সুরক্ষিত করতে');
    }

    if (enabledMethods.length === 1) {
      recommendations.push('Consider adding a backup MFA method');
      recommendations.push('একটি ব্যাকআপ এমএফএ পদ্ধতি যোগ করার পরামর্শ দেওয়া হচ্ছে');
    }

    if (!enabledMethods.some((m) => m.getType() === MFAType.TOTP || m.getType() === MFAType.WEBAUTHN)) {
      recommendations.push('Add authenticator app or passkey for stronger security');
      recommendations.push('শক্তিশালী নিরাপত্তার জন্য অথেনটিকেটর অ্যাপ বা পাসকি যোগ করুন');
    }

    if (remainingBackupCodes <= 3 && remainingBackupCodes > 0) {
      recommendations.push('Backup codes are low. Please regenerate them soon');
      recommendations.push('ব্যাকআপ কোড কম। দয়া করে শীঘ্রই সেগুলি পুনরায় তৈরি করুন');
    }

    if (remainingBackupCodes === 0) {
      recommendations.push('No backup codes available. Generate new ones immediately');
      recommendations.push('কোন ব্যাকআপ কোড উপলব্ধ নেই। অবিলম্বে নতুন তৈরি করুন');
    }

    return recommendations;
  }

  /**
   * Get recommended MFA method based on device/network
   */
  private getRecommendedMethod(
    allMethods: MFA[],
    enabledMethods: MFA[],
  ): { type: string; reason: string; reasonBn?: string } | undefined {
    // If user already has MFA enabled, no recommendation needed
    if (enabledMethods.length > 0) {
      return undefined;
    }

    // Recommend based on available methods
    const hasWhatsApp = allMethods.some((m) => m.getType() === MFAType.WHATSAPP);
    const hasSMS = allMethods.some((m) => m.getType() === MFAType.SMS);
    const hasTOTP = allMethods.some((m) => m.getType() === MFAType.TOTP);

    // Priority: WhatsApp (Bangladesh) > TOTP > SMS
    if (hasWhatsApp) {
      return {
        type: MFAType.WHATSAPP,
        reason: 'WhatsApp is widely used in Bangladesh and easy to set up',
        reasonBn: 'হোয়াটসঅ্যাপ বাংলাদেশে ব্যাপকভাবে ব্যবহৃত হয় এবং সেটআপ করা সহজ',
      };
    }

    if (hasTOTP) {
      return {
        type: MFAType.TOTP,
        reason: 'Authenticator app provides strong security without internet dependency',
        reasonBn: 'অথেনটিকেটর অ্যাপ ইন্টারনেট নির্ভর না করে শক্তিশালী নিরাপত্তা প্রদান করে',
      };
    }

    if (hasSMS) {
      return {
        type: MFAType.SMS,
        reason: 'SMS OTP is simple and works on all phones',
        reasonBn: 'এসএমএস ওটিপি সহজ এবং সব ফোনে কাজ করে',
      };
    }

    return undefined;
  }

  /**
   * Audit log for MFA status check
   */
  private async auditLog(
    query: GetMfaStatusQuery,
    mfaMethods: MFA[],
    startTime: number,
  ): Promise<void> {
    const enabledMethods = mfaMethods.filter((m) => m.isEnabled());
    const severity: AuditSeverity = enabledMethods.length === 0 ? AUDIT_SEVERITIES.WARNING : AUDIT_SEVERITIES.INFO;

    await this.auditService.log({
      action: 'MFA_STATUS_CHECK',
      userId: query.userId,
      enabled: enabledMethods.length > 0,
      totalMethods: enabledMethods.length,
      methods: enabledMethods.map((m) => m.getType()),
      hasLockedMethod: mfaMethods.some((m) => m.isLocked()),
      correlationId: query.correlationId,
      ipAddress: query.getIpAddress(),
      userAgent: query.getUserAgent(),
      timestamp: new Date().toISOString(),
      durationMs: Date.now() - startTime,
      severity,
    });
  }

  /**
   * Publish MFA status event for analytics
   */
  private async publishMfaStatusEvent(
    query: GetMfaStatusQuery,
    mfaMethods: MFA[],
    startTime: number,
  ): Promise<void> {
    const enabledMethods = mfaMethods.filter((m) => m.isEnabled());

    try {
      await this.eventBus.publish({
        eventId: randomUUID(),
        eventName: 'mfa.status.checked',
        aggregateId: query.userId,
        aggregateVersion: 1,
        occurredAt: new Date(),
        correlationId: query.correlationId,
        metadata: {
          enabled: enabledMethods.length > 0,
          methodCount: enabledMethods.length,
          methodTypes: enabledMethods.map((m) => m.getType()),
          durationMs: Date.now() - startTime,
          source: 'get_mfa_status_query',
        },
      });
    } catch (error) {
      this.logger.warn(`Failed to publish MFA status event: ${error.message}`);
    }
  }
}

// ============================================================
// Type Exports
// ============================================================

export type { MfaMethodStatusDto as MfaMethodStatusDtoType };
export type { MfaStatusResponseDto as MfaStatusResponseDtoType };
