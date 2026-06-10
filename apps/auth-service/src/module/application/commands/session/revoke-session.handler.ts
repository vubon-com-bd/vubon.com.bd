/**
 * Revoke Session Command Handler - Application Layer (Enterprise Enhanced v3.0)
 *
 * @module application/commands/session/revoke-session.handler
 *
 * @description
 * Handles revoking a specific user session with enterprise-grade features:
 * - Ownership validation with admin override support
 * - Refresh token revocation
 * - Cache invalidation strategy
 * - Rate limiting for revocation attempts
 * - Transaction management for data consistency
 * - Event publishing with correlation tracking
 * - Comprehensive audit logging with severity levels
 * - Distributed tracing with correlation ID
 * - Bengali error messages for better UX in Bangladesh
 * - Device fingerprint tracking for fraud detection
 * - Geographic location tracking (Bangladesh districts)
 * - Email/WhatsApp notification for suspicious revocations
 *
 * Enterprise Rules:
 * ✅ Single responsibility - handles only session revocation
 * ✅ Repository coordination with transaction support
 * ✅ Security validation with proper error messages
 * ✅ Event publishing with correlation tracking
 * ✅ Audit logging with severity levels
 * ✅ Cache invalidation strategy
 * ✅ Rate limiting for abuse prevention
 * ✅ Bangladesh-specific fields (district, networkType, mobileOperator)
 */

import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
  BadRequestException,
  Logger,
  Inject,
} from '@nestjs/common';
import { randomUUID } from 'crypto';

import { RevokeSessionCommand, isRevokeSessionCommand } from './revoke-session.command';
import { SessionRepository } from '../../../domain/repositories/session.repository.interface';
import { RefreshTokenRepository } from '../../../domain/repositories/refresh-token.repository.interface';
import { AuditRepository } from '../../../domain/repositories/audit.repository.interface';

// Import events
import {
  UserLoggedOutEvent,
  LogoutReason,
  LogoutSource,
  LogoutScope,
} from '../../events/user-logged-out.event';
import { SessionRevokedEvent } from '../../events/session-revoked.event';

// Import shared packages
import { AUDIT_SEVERITIES, SESSION_CONFIG } from '@vubon/shared-constants';
import type { BulkOperationProgress } from '@vubon/shared-types';
import { maskEmail, maskPhone } from '@vubon/shared-utils';

// Import infrastructure interfaces
import {
  EventBus,
  AuditService,
  TransactionManager,
  CacheService,
  NotificationService,
} from '../../commands/infrastructure.interface';
import { CacheKeyBuilder } from '../../services/interfaces/cache.service.interface';

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
        throw new Error(`Circuit breaker is OPEN. Service unavailable.`);
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
}

// ============================================================
// Retry Helper with Exponential Backoff
// ============================================================

async function withRetry<T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  baseDelayMs: number = 100,
  backoffMultiplier: number = 2
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
// Revoke Session Response DTO (Enhanced)
// ============================================================

export interface RevokeSessionResponseDto {
  success: boolean;
  message: string;
  messageBn?: string;
  sessionId: string;
  wasCurrentSession: boolean;
  refreshTokenRevoked: boolean;
  revokedAt: string;
  correlationId?: string;
  remainingTimeMs?: number;
}

// ============================================================
// Revoke Session Handler (Enterprise Enhanced v3.0)
// ============================================================

@Injectable()
export class RevokeSessionHandler {
  private readonly logger = new Logger(RevokeSessionHandler.name);
  private readonly notificationCircuitBreaker =
    CircuitBreaker.getInstance('notification');

  constructor(
    private readonly sessionRepository: SessionRepository,
    private readonly refreshTokenRepository: RefreshTokenRepository,
    private readonly auditRepository: AuditRepository,
    private readonly eventBus: EventBus,
    private readonly auditService: AuditService,
    private readonly transactionManager: TransactionManager,
    private readonly cacheService: CacheService,
    private readonly notificationService: NotificationService
  ) {}

  /**
   * Execute the Revoke Session command
   *
   * @param command - Revoke session command with userId included
   * @returns Response with revocation details
   */
  async execute(
    command: RevokeSessionCommand
  ): Promise<RevokeSessionResponseDto> {
    const startTime = Date.now();
    const {
      userId,
      sessionId,
      deviceInfo,
      correlationId,
      reason,
      isAdminOverride,
      targetUserId,
    } = command;
    const effectiveUserId = command.getEffectiveUserId();

    this.logger.log(
      `Executing RevokeSessionCommand for user ${effectiveUserId}, session: ${sessionId}, adminOverride: ${isAdminOverride}, correlationId: ${correlationId}`
    );

    try {
      // 1. Check rate limit for revocation attempts
      await this.checkRateLimit(effectiveUserId);

      // 2. Find session
      const session = await this.sessionRepository.findById(sessionId);
      if (!session) {
        throw new NotFoundException(
          `Session with ID ${sessionId} not found`,
          `${sessionId} আইডি সহ সেশন পাওয়া যায়নি`
        );
      }

      // 3. Validate ownership (with admin override support)
      if (!isAdminOverride) {
        if (!session.validateOwnership(effectiveUserId)) {
          await this.auditUnauthorizedAccess(
            effectiveUserId,
            session,
            deviceInfo,
            correlationId
          );
          throw new UnauthorizedException(
            'Cannot revoke another user\'s session',
            'অন্য ব্যবহারকারীর সেশন রিভোক করা যাবে না'
          );
        }
      } else {
        // Admin override - log admin action
        this.logger.warn(
          `Admin ${userId} is revoking session ${sessionId} for user ${targetUserId}`
        );
      }

      // 4. Check if already revoked or expired
      if (session.isRevoked()) {
        return {
          success: true,
          message: 'Session was already revoked',
          messageBn: 'সেশন ইতিমধ্যে রিভোক করা হয়েছে',
          sessionId,
          wasCurrentSession: false,
          refreshTokenRevoked: false,
          revokedAt: session.getRevokedAt()?.toISOString() || new Date().toISOString(),
          correlationId,
          remainingTimeMs: Date.now() - startTime,
        };
      }

      if (session.isExpired()) {
        return {
          success: true,
          message: 'Session was already expired',
          messageBn: 'সেশন ইতিমধ্যে মেয়াদোত্তীর্ণ',
          sessionId,
          wasCurrentSession: false,
          refreshTokenRevoked: false,
          revokedAt: session.getExpiresAt().toISOString(),
          correlationId,
          remainingTimeMs: Date.now() - startTime,
        };
      }

      // 5. Determine if revoking current session
      const wasCurrentSession = deviceInfo?.sessionId === sessionId;

      // 6. Execute revocation in transaction
      let refreshTokenRevoked = false;

      await this.transactionManager.runInTransaction(async () => {
        // Revoke the session
        session.revoke(command.getReason());
        await this.sessionRepository.save(session);

        // Revoke associated refresh tokens
        const tokensRevoked = await this.refreshTokenRepository.revokeBySessionId(
          sessionId,
          command.getReason()
        );
        refreshTokenRevoked = tokensRevoked > 0;

        // Update device trust if needed (for security)
        if (wasCurrentSession && deviceInfo?.deviceId) {
          await this.deviceRepository?.untrustByDeviceId(deviceInfo.deviceId);
        }
      });

      // 7. Invalidate caches
      await this.invalidateCaches(effectiveUserId, sessionId);

      // 8. Publish events
      await this.publishRevocationEvents(
        effectiveUserId,
        session,
        wasCurrentSession,
        isAdminOverride,
        command,
        correlationId
      );

      // 9. Send notification (if not self-revocation and not admin)
      if (!wasCurrentSession && !isAdminOverride) {
        await this.sendRevocationNotification(
          effectiveUserId,
          session,
          command,
          correlationId
        );
      }

      // 10. Clear rate limit on success
      await this.clearRateLimit(effectiveUserId);

      // 11. Audit log
      await this.auditLog(
        effectiveUserId,
        session,
        wasCurrentSession,
        isAdminOverride,
        refreshTokenRevoked,
        command,
        startTime,
        correlationId
      );

      // 12. Return response
      const message = this.getSuccessMessage(wasCurrentSession, isAdminOverride);
      const messageBn = this.getSuccessMessageBn(wasCurrentSession, isAdminOverride);

      return {
        success: true,
        message,
        messageBn,
        sessionId,
        wasCurrentSession,
        refreshTokenRevoked,
        revokedAt: new Date().toISOString(),
        correlationId,
        remainingTimeMs: Date.now() - startTime,
      };
    } catch (error) {
      this.logger.error(
        `RevokeSessionCommand failed for session ${sessionId}: ${error.message}`
      );

      // Audit failure
      await this.auditService.log({
        action: 'REVOKE_SESSION_FAILED',
        userId: effectiveUserId,
        sessionId,
        targetUserId,
        isAdminOverride,
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
   * Check rate limit for revocation attempts
   */
  private async checkRateLimit(userId: string): Promise<void> {
    const rateLimitKey = CacheKeyBuilder.rateLimit(`revoke-session:${userId}`);
    const attempts = await this.cacheService.incr(rateLimitKey);

    if (attempts === 1) {
      await this.cacheService.expire(
        rateLimitKey,
        SESSION_CONFIG.RATE_LIMIT_WINDOW_SECONDS || 3600
      );
    }

    const maxAttempts = SESSION_CONFIG.MAX_REVOKE_ATTEMPTS_PER_HOUR || 20;
    if (attempts > maxAttempts) {
      throw new BadRequestException(
        'Too many revocation attempts. Please try again later.',
        'অনেকবার রিভোকের চেষ্টা করা হয়েছে। পরে আবার চেষ্টা করুন।'
      );
    }
  }

  /**
   * Clear rate limit on successful revocation
   */
  private async clearRateLimit(userId: string): Promise<void> {
    const rateLimitKey = CacheKeyBuilder.rateLimit(`revoke-session:${userId}`);
    await this.cacheService.del(rateLimitKey);
  }

  /**
   * Invalidate all user caches
   */
  private async invalidateCaches(userId: string, sessionId: string): Promise<void> {
    await this.cacheService.del(CacheKeyBuilder.user(userId));
    await this.cacheService.del(CacheKeyBuilder.userSessions(userId));
    await this.cacheService.del(CacheKeyBuilder.userPermissions(userId));
    await this.cacheService.del(CacheKeyBuilder.session(sessionId));
    await this.cacheService.delPattern(CacheKeyBuilder.userSessionPattern(userId));
  }

  /**
   * Audit unauthorized access attempt
   */
  private async auditUnauthorizedAccess(
    userId: string,
    session: any,
    deviceInfo: any,
    correlationId?: string
  ): Promise<void> {
    await this.auditService.log({
      action: 'REVOKE_SESSION_UNAUTHORIZED',
      userId,
      sessionId: session.getId(),
      sessionOwnerId: session.getUserId(),
      ipAddress: deviceInfo?.ipAddress,
      deviceId: deviceInfo?.deviceId,
      deviceFingerprint: deviceInfo?.deviceFingerprint,
      userAgent: deviceInfo?.userAgent,
      district: deviceInfo?.district,
      networkType: deviceInfo?.networkType,
      mobileOperator: deviceInfo?.mobileOperator,
      correlationId,
      timestamp: new Date().toISOString(),
      severity: AUDIT_SEVERITIES.WARNING,
    });
  }

  /**
   * Publish revocation events
   */
  private async publishRevocationEvents(
    userId: string,
    session: any,
    wasCurrentSession: boolean,
    isAdminOverride: boolean,
    command: RevokeSessionCommand,
    correlationId?: string
  ): Promise<void> {
    const { deviceInfo } = command;

    // Publish UserLoggedOutEvent
    await this.eventBus.publish(
      new UserLoggedOutEvent(
        userId,
        session.getId(),
        wasCurrentSession ? LogoutReason.USER_INITIATED : LogoutReason.USER_INITIATED,
        isAdminOverride ? LogoutSource.ADMIN : LogoutSource.USER,
        correlationId,
        undefined,
        deviceInfo?.deviceId,
        deviceInfo?.ipAddress,
        deviceInfo?.userAgent,
        undefined,
        command.getReason(),
        {
          scope: wasCurrentSession ? LogoutScope.SINGLE : LogoutScope.SINGLE,
          isAdminOverride,
          targetUserId: command.targetUserId,
          deviceFingerprint: deviceInfo?.deviceFingerprint,
          district: deviceInfo?.district,
          networkType: deviceInfo?.networkType,
        }
      )
    );

    // Publish SessionRevokedEvent
    await this.eventBus.publish(
      new SessionRevokedEvent(
        userId,
        session.getId(),
        command.getReason(),
        correlationId,
        deviceInfo?.ipAddress,
        deviceInfo?.deviceId,
        deviceInfo?.userAgent,
        {
          wasCurrentSession,
          isAdminOverride,
          initiatedBy: isAdminOverride ? 'admin' : 'user',
        }
      )
    );
  }

  /**
   * Send revocation notification (for suspicious activity)
   */
  private async sendRevocationNotification(
    userId: string,
    session: any,
    command: RevokeSessionCommand,
    correlationId?: string
  ): Promise<void> {
    const { deviceInfo } = command;

    await this.notificationCircuitBreaker.call(async () => {
      await withRetry(() =>
        this.notificationService.sendEmail(
          userId,
          `Session Terminated - ${new Date().toLocaleString()}`,
          `Your session has been terminated for the following reason: ${command.getReason()}\n\n` +
            `Device: ${session.getDeviceInfo()?.userAgent || 'Unknown'}\n` +
            `Location: ${deviceInfo?.district || 'Unknown'}\n` +
            `Time: ${new Date().toISOString()}\n\n` +
            `If you did not request this, please contact support immediately.`
        )
      );
    }).catch((err) => {
      this.logger.warn(`Failed to send revocation notification: ${err.message}`);
    });

    // Send WhatsApp notification for Bangladesh users
    const user = await this.userRepository?.findById(userId);
    const phone = user?.getPhone?.();
    if (phone) {
      await withRetry(() =>
        this.notificationService.sendWhatsAppNotification(
          phone.getValue(),
          `🔐 Security Alert\n\nYour session has been terminated.\nReason: ${command.getReason()}\nTime: ${new Date().toLocaleString()}\n\nIf this wasn't you, please contact support immediately.`
        )
      ).catch((err) => {
        this.logger.warn(`Failed to send WhatsApp notification: ${err.message}`);
      });
    }
  }

  /**
   * Audit log for session revocation
   */
  private async auditLog(
    userId: string,
    session: any,
    wasCurrentSession: boolean,
    isAdminOverride: boolean,
    refreshTokenRevoked: boolean,
    command: RevokeSessionCommand,
    startTime: number,
    correlationId?: string
  ): Promise<void> {
    const { deviceInfo, reason, targetUserId } = command;

    await this.auditService.log({
      action: 'REVOKE_SESSION',
      userId,
      sessionId: session.getId(),
      sessionOwnerId: session.getUserId(),
      wasCurrentSession,
      isAdminOverride,
      targetUserId,
      refreshTokenRevoked,
      reason: reason || command.getReason(),
      ipAddress: deviceInfo?.ipAddress,
      deviceId: deviceInfo?.deviceId,
      deviceFingerprint: deviceInfo?.deviceFingerprint,
      userAgent: deviceInfo?.userAgent,
      district: deviceInfo?.district,
      division: deviceInfo?.division,
      upazila: deviceInfo?.upazila,
      networkType: deviceInfo?.networkType,
      mobileOperator: deviceInfo?.mobileOperator,
      correlationId,
      timestamp: new Date().toISOString(),
      durationMs: Date.now() - startTime,
      severity: AUDIT_SEVERITIES.INFO,
    });
  }

  /**
   * Get success message in English
   */
  private getSuccessMessage(wasCurrentSession: boolean, isAdminOverride: boolean): string {
    if (wasCurrentSession) {
      return 'Successfully logged out from current session';
    }
    if (isAdminOverride) {
      return 'Session revoked successfully by administrator';
    }
    return 'Session revoked successfully';
  }

  /**
   * Get success message in Bengali
   */
  private getSuccessMessageBn(wasCurrentSession: boolean, isAdminOverride: boolean): string {
    if (wasCurrentSession) {
      return 'কারেন্ট সেশন থেকে সফলভাবে লগআউট করা হয়েছে';
    }
    if (isAdminOverride) {
      return 'অ্যাডমিন দ্বারা সেশন সফলভাবে রিভোক করা হয়েছে';
    }
    return 'সেশন সফলভাবে রিভোক করা হয়েছে';
  }
}

// ============================================================
// Type Exports
// ============================================================

export type { RevokeSessionResponseDto as RevokeSessionResponseDtoType };
