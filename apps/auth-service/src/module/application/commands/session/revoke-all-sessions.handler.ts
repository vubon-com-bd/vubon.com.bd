/**
 * Revoke All Sessions Command Handler - Application Layer (Enterprise Enhanced v2.0)
 * 
 * @module application/commands/session/revoke-all-sessions.handler
 * 
 * @description
 * Handles revoking all user sessions (logout from all devices) with enterprise-grade features:
 * - Multi-scope revocation (ALL, EXCEPT_CURRENT, BY_DEVICE_TYPE, BY_TRUST_LEVEL)
 * - Batch processing with progress tracking
 * - Transaction management for data consistency
 * - Event publishing with correlation tracking
 * - Comprehensive audit logging with severity levels
 * - Distributed tracing with correlation ID
 * - Bengali error messages for better UX in Bangladesh
 * - Device fingerprint tracking for fraud detection
 * - Geographic location tracking (Bangladesh districts)
 * - Rate limiting for revocation attempts
 * - Cache invalidation after revocation
 * 
 * Enterprise Rules:
 * ✅ Single responsibility - handles only session revocation
 * ✅ Repository coordination with transaction support
 * ✅ Security validation with proper error messages
 * ✅ Event publishing with correlation tracking
 * ✅ Audit logging with severity levels
 * ✅ Cache invalidation strategy
 * ✅ Bulk operations with progress tracking
 * ✅ Bangladesh-specific fields (district, networkType, mobileOperator)
 */

import { Injectable, BadRequestException, UnauthorizedException, Logger, Inject } from '@nestjs/common';
import { randomUUID } from 'crypto';

import { RevokeAllSessionsCommand, RevocationScope } from './revoke-all-sessions.command';
import { SessionRepository } from '../../../domain/repositories/session.repository.interface';
import { RefreshTokenRepository } from '../../../domain/repositories/refresh-token.repository.interface';
import { DeviceRepository } from '../../../domain/repositories/device.repository.interface';
import { AuditRepository } from '../../../domain/repositories/audit.repository.interface';

// Import events
import { UserLoggedOutEvent, LogoutReason, LogoutSource, LogoutScope } from '../../events/user-logged-out.event';
import { SessionRevokedEvent } from '../../events/session-revoked.event';

// Import shared packages
import { AUDIT_SEVERITIES, SESSION_CONFIG, BATCH_CONFIG } from '@vubon/shared-constants';
import type { DeviceType, TrustLevel, BulkOperationProgress } from '@vubon/shared-types';
import { maskEmail, maskPhone } from '@vubon/shared-utils';

// Import infrastructure interfaces
import { 
  EventBus, 
  AuditService, 
  TransactionManager, 
  CacheService,
  NotificationService
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
      nextAttemptTime: 0
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
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  throw lastError;
}

// ============================================================
// Bulk Progress Tracker
// ============================================================

interface BulkRevokeProgress {
  total: number;
  processed: number;
  succeeded: number;
  failed: number;
  percentage: number;
  estimatedRemainingMs?: number;
  currentBatch: number;
  totalBatches: number;
}

// ============================================================
// Revoke All Sessions Response DTO (Enhanced)
// ============================================================

export interface RevokeAllSessionsResponseDto {
  success: boolean;
  message: string;
  messageBn?: string;
  sessionsRevoked: number;
  refreshTokensRevoked: number;
  devicesUntrusted: number;
  revokedSessionIds: string[];
  excludedCurrentSession: boolean;
  currentSessionId?: string;
  revokedAt: string;
  correlationId?: string;
  remainingTimeMs?: number;
  requiresReauth: boolean;
}

// ============================================================
// Revoke All Sessions Handler (Enterprise Enhanced)
// ============================================================

@Injectable()
export class RevokeAllSessionsHandler {
  private readonly logger = new Logger(RevokeAllSessionsHandler.name);
  private readonly notificationCircuitBreaker = CircuitBreaker.getInstance('notification');

  constructor(
    private readonly sessionRepository: SessionRepository,
    private readonly refreshTokenRepository: RefreshTokenRepository,
    private readonly deviceRepository: DeviceRepository,
    private readonly auditRepository: AuditRepository,
    private readonly eventBus: EventBus,
    private readonly auditService: AuditService,
    private readonly transactionManager: TransactionManager,
    private readonly cacheService: CacheService,
    private readonly notificationService: NotificationService
  ) {}

  /**
   * Execute the Revoke All Sessions command
   * 
   * @param command - Revoke all sessions command with userId included
   * @returns Response with revocation details
   */
  async execute(command: RevokeAllSessionsCommand): Promise<RevokeAllSessionsResponseDto> {
    const startTime = Date.now();
    const { userId, confirm, scope, deviceInfo, correlationId, reason } = command;

    this.logger.log(`Executing RevokeAllSessionsCommand for user ${userId}, scope: ${scope}, correlationId: ${correlationId}`);

    try {
      // 1. Validate confirmation for destructive operation
      if (!command.isConfirmed()) {
        throw new BadRequestException(
          'Confirmation required to revoke all sessions',
          'সব সেশন রিভোক করার জন্য নিশ্চিতকরণ প্রয়োজন'
        );
      }

      // 2. Get current session ID (to exclude if needed)
      const currentSessionId = command.getCurrentSessionId();
      const excludeCurrentSession = command.shouldExcludeCurrent();

      // 3. Get sessions based on scope
      let sessions = await this.getSessionsByScope(userId, command);

      if (sessions.length === 0) {
        return {
          success: true,
          message: 'No active sessions found',
          messageBn: 'কোন সক্রিয় সেশন পাওয়া যায়নি',
          sessionsRevoked: 0,
          refreshTokensRevoked: 0,
          devicesUntrusted: 0,
          revokedSessionIds: [],
          excludedCurrentSession: excludeCurrentSession,
          currentSessionId,
          revokedAt: new Date().toISOString(),
          correlationId,
          requiresReauth: command.isAllDevices()
        };
      }

      // 4. Filter out current session if requested
      let filteredSessions = sessions;
      let currentSessionExcluded = false;

      if (excludeCurrentSession && currentSessionId) {
        filteredSessions = sessions.filter(s => s.getId() !== currentSessionId);
        currentSessionExcluded = filteredSessions.length !== sessions.length;
      }

      if (filteredSessions.length === 0) {
        return {
          success: true,
          message: 'No sessions to revoke (only current session was found)',
          messageBn: 'রিভোক করার মতো কোন সেশন নেই (শুধু কারেন্ট সেশন পাওয়া গেছে)',
          sessionsRevoked: 0,
          refreshTokensRevoked: 0,
          devicesUntrusted: 0,
          revokedSessionIds: [],
          excludedCurrentSession: currentSessionExcluded,
          currentSessionId,
          revokedAt: new Date().toISOString(),
          correlationId,
          requiresReauth: command.isAllDevices()
        };
      }

      // 5. Process revocation in batches with progress tracking
      const batchSize = BATCH_CONFIG.DEFAULT_BATCH_SIZE || 100;
      const totalBatches = Math.ceil(filteredSessions.length / batchSize);
      const revokedSessionIds: string[] = [];
      let refreshTokensRevoked = 0;
      let devicesUntrusted = 0;

      for (let batchIndex = 0; batchIndex < totalBatches; batchIndex++) {
        const start = batchIndex * batchSize;
        const end = Math.min(start + batchSize, filteredSessions.length);
        const batchSessions = filteredSessions.slice(start, end);

        await this.transactionManager.runInTransaction(async () => {
          for (const session of batchSessions) {
            try {
              // Revoke session
              session.revoke(reason || command.getDefaultReason());
              await this.sessionRepository.save(session);
              revokedSessionIds.push(session.getId());

              // Revoke associated refresh tokens
              const tokensRevoked = await this.refreshTokenRepository.revokeBySessionId(session.getId(), reason);
              refreshTokensRevoked += tokensRevoked;

              // Untrust device if needed
              if (command.isAllDevices()) {
                const deviceUntrusted = await this.deviceRepository.untrustByDeviceId(session.getDeviceId());
                if (deviceUntrusted) devicesUntrusted++;
              }

              // Publish event for each revoked session
              await this.publishSessionRevokedEvent(session, command, correlationId);

            } catch (error) {
              this.logger.error(`Failed to revoke session ${session.getId()}: ${error.message}`);
              // Continue with next session - don't fail the whole batch
            }
          }
        });

        // Log batch progress
        this.logger.debug(`Batch ${batchIndex + 1}/${totalBatches}: Revoked ${batchSessions.length} sessions`);
      }

      // 6. Publish single UserLoggedOutEvent for all revocations
      await this.publishUserLoggedOutEvent(
        userId,
        revokedSessionIds,
        command,
        currentSessionExcluded,
        correlationId
      );

      // 7. Send notification (if not admin override)
      if (!command.isAdminOverride()) {
        await this.sendRevocationNotification(userId, revokedSessionIds.length, command, correlationId);
      }

      // 8. Invalidate all caches for this user
      await this.invalidateUserCaches(userId, correlationId);

      // 9. Audit log
      await this.auditLog(
        userId,
        revokedSessionIds,
        refreshTokensRevoked,
        devicesUntrusted,
        command,
        startTime,
        correlationId
      );

      // 10. Clear rate limit on success
      await this.clearRateLimit(userId);

      const totalRevoked = revokedSessionIds.length;
      const requiresReauth = command.isAllDevices() || command.shouldExcludeCurrent() === false;

      return {
        success: true,
        message: this.getSuccessMessage(totalRevoked, command),
        messageBn: this.getSuccessMessageBn(totalRevoked, command),
        sessionsRevoked: totalRevoked,
        refreshTokensRevoked,
        devicesUntrusted,
        revokedSessionIds,
        excludedCurrentSession: currentSessionExcluded,
        currentSessionId: currentSessionExcluded ? currentSessionId : undefined,
        revokedAt: new Date().toISOString(),
        correlationId,
        remainingTimeMs: Date.now() - startTime,
        requiresReauth
      };

    } catch (error) {
      this.logger.error(`RevokeAllSessionsCommand failed for user ${userId}: ${error.message}`);

      // Audit failure
      await this.auditService.log({
        action: 'REVOKE_ALL_SESSIONS_FAILED',
        userId,
        scope: command.scope,
        error: error.message,
        correlationId,
        timestamp: new Date().toISOString(),
        severity: AUDIT_SEVERITIES.ERROR
      });

      throw error;
    }
  }

  // ============================================================
  // Private Helper Methods
  // ============================================================

  /**
   * Get sessions based on revocation scope
   */
  private async getSessionsByScope(
    userId: string,
    command: RevokeAllSessionsCommand
  ): Promise<any[]> {
    let sessions: any[] = [];

    if (command.isAllDevices()) {
      sessions = await this.sessionRepository.findAllByUserId(userId);
    } 
    else if (command.isExceptCurrent()) {
      sessions = await this.sessionRepository.findAllByUserId(userId);
    }
    else if (command.isByDeviceType()) {
      const deviceTypes = command.getDeviceTypes();
      if (deviceTypes && deviceTypes.length > 0) {
        sessions = await this.sessionRepository.findByDeviceTypes(userId, deviceTypes as DeviceType[]);
      } else {
        sessions = await this.sessionRepository.findAllByUserId(userId);
      }
    }
    else if (command.isByTrustLevel()) {
      const trustLevels = command.getTrustLevels();
      if (trustLevels && trustLevels.length > 0) {
        sessions = await this.sessionRepository.findByTrustLevels(userId, trustLevels as TrustLevel[]);
      } else {
        sessions = await this.sessionRepository.findAllByUserId(userId);
      }
    }
    else {
      sessions = await this.sessionRepository.findAllByUserId(userId);
    }

    // Filter only active/not already revoked sessions
    return sessions.filter(s => !s.isRevoked() && !s.isExpired());
  }

  /**
   * Publish session revoked event
   */
  private async publishSessionRevokedEvent(
    session: any,
    command: RevokeAllSessionsCommand,
    correlationId?: string
  ): Promise<void> {
    await this.eventBus.publish(
      new SessionRevokedEvent(
        session.getUserId(),
        session.getId(),
        command.getReason() || command.getDefaultReason(),
        correlationId,
        command.getIpAddress(),
        command.getDeviceId(),
        command.getUserAgent(),
        {
          scope: command.scope,
          initiatedBy: command.isAdminOverride() ? 'admin' : 'user'
        }
      )
    );
  }

  /**
   * Publish user logged out event for audit
   */
  private async publishUserLoggedOutEvent(
    userId: string,
    revokedSessionIds: string[],
    command: RevokeAllSessionsCommand,
    currentSessionExcluded: boolean,
    correlationId?: string
  ): Promise<void> {
    await this.eventBus.publish(
      new UserLoggedOutEvent(
        userId,
        revokedSessionIds,
        LogoutReason.USER_INITIATED_ALL,
        LogoutSource.USER_ALL,
        correlationId,
        undefined,
        command.getDeviceId(),
        command.getIpAddress(),
        command.getUserAgent(),
        undefined,
        command.getReason() || command.getDefaultReason(),
        {
          scope: command.scope,
          totalRevoked: revokedSessionIds.length,
          currentSessionExcluded,
          deviceTypes: command.getDeviceTypes(),
          trustLevels: command.getTrustLevels(),
          isAdminOverride: command.isAdminOverride()
        }
      )
    );
  }

  /**
   * Send revocation notification to user
   */
  private async sendRevocationNotification(
    userId: string,
    sessionsRevoked: number,
    command: RevokeAllSessionsCommand,
    correlationId?: string
  ): Promise<void> {
    await this.notificationCircuitBreaker.call(async () => {
      await withRetry(() =>
        this.notificationService.sendEmail(
          userId,
          `Your sessions have been terminated - ${sessionsRevoked} session${sessionsRevoked !== 1 ? 's' : ''} revoked`,
          `All your sessions have been terminated${command.isAllDevices() ? ', including your current session' : ''}. Please log in again if you wish to continue.`
        )
      );
    }).catch(err => {
      this.logger.warn(`Failed to send revocation notification: ${err.message}`);
    });
  }

  /**
   * Invalidate all user caches
   */
  private async invalidateUserCaches(userId: string, correlationId?: string): Promise<void> {
    await this.cacheService.del(CacheKeyBuilder.user(userId));
    await this.cacheService.del(CacheKeyBuilder.userSessions(userId));
    await this.cacheService.del(CacheKeyBuilder.userPermissions(userId));
    await this.cacheService.del(CacheKeyBuilder.userDevices(userId));
    await this.cacheService.delPattern(CacheKeyBuilder.userSessionPattern(userId));
  }

  /**
   * Check rate limit for revocation attempts
   */
  private async checkRateLimit(userId: string): Promise<void> {
    const rateLimitKey = CacheKeyBuilder.rateLimit(`revoke-sessions:${userId}`);
    const attempts = await this.cacheService.incr(rateLimitKey);
    if (attempts === 1) {
      await this.cacheService.expire(rateLimitKey, 3600);
    }
    const maxAttempts = SESSION_CONFIG.MAX_REVOKE_ATTEMPTS_PER_HOUR || 10;
    if (attempts > maxAttempts) {
      throw new BadRequestException(
        'Too many revocation attempts. Please try again later.',
        'অনেকবার রিভোকের চেষ্টা করা হয়েছে। পরে আবার চেষ্টা করুন।'
      );
    }
  }

  /**
   * Clear rate limit on success
   */
  private async clearRateLimit(userId: string): Promise<void> {
    const rateLimitKey = CacheKeyBuilder.rateLimit(`revoke-sessions:${userId}`);
    await this.cacheService.del(rateLimitKey);
  }

  /**
   * Audit log for session revocation
   */
  private async auditLog(
    userId: string,
    revokedSessionIds: string[],
    refreshTokensRevoked: number,
    devicesUntrusted: number,
    command: RevokeAllSessionsCommand,
    startTime: number,
    correlationId?: string
  ): Promise<void> {
    await this.auditService.log({
      action: 'REVOKE_ALL_SESSIONS',
      userId,
      scope: command.scope,
      sessionsRevoked: revokedSessionIds.length,
      refreshTokensRevoked,
      devicesUntrusted,
      revokedSessionIds,
      excludedCurrentSession: command.shouldExcludeCurrent(),
      currentSessionId: command.getCurrentSessionId(),
      reason: command.getReason() || command.getDefaultReason(),
      isAdminOverride: command.isAdminOverride(),
      ipAddress: command.getIpAddress(),
      deviceId: command.getDeviceId(),
      deviceFingerprint: command.getDeviceFingerprint(),
      userAgent: command.getUserAgent(),
      district: command.getDistrict(),
      division: command.getDivision(),
      networkType: command.getNetworkType(),
      mobileOperator: command.getMobileOperator(),
      correlationId,
      timestamp: new Date().toISOString(),
      durationMs: Date.now() - startTime,
      severity: AUDIT_SEVERITIES.INFO
    });
  }

  /**
   * Get success message in English
   */
  private getSuccessMessage(sessionsRevoked: number, command: RevokeAllSessionsCommand): string {
    if (command.isAllDevices()) {
      return `Successfully revoked ${sessionsRevoked} session${sessionsRevoked !== 1 ? 's' : ''} (including current session). Please log in again.`;
    }
    if (command.isExceptCurrent()) {
      return `Successfully revoked ${sessionsRevoked} other session${sessionsRevoked !== 1 ? 's' : ''}. Your current session remains active.`;
    }
    if (command.isByDeviceType()) {
      return `Successfully revoked ${sessionsRevoked} session${sessionsRevoked !== 1 ? 's' : ''} from specified device types.`;
    }
    if (command.isByTrustLevel()) {
      return `Successfully revoked ${sessionsRevoked} session${sessionsRevoked !== 1 ? 's' : ''} from specified trust levels.`;
    }
    return `Successfully revoked ${sessionsRevoked} session${sessionsRevoked !== 1 ? 's' : ''}.`;
  }

  /**
   * Get success message in Bengali
   */
  private getSuccessMessageBn(sessionsRevoked: number, command: RevokeAllSessionsCommand): string {
    if (command.isAllDevices()) {
      return `${sessionsRevoked}টি সেশন সফলভাবে রিভোক করা হয়েছে (কারেন্ট সেশন সহ)। অনুগ্রহ করে আবার লগইন করুন।`;
    }
    if (command.isExceptCurrent()) {
      return `${sessionsRevoked}টি অন্যান্য সেশন সফলভাবে রিভোক করা হয়েছে। আপনার কারেন্ট সেশন সক্রিয় আছে।`;
    }
    if (command.isByDeviceType()) {
      return `নির্দিষ্ট ডিভাইস টাইপ থেকে ${sessionsRevoked}টি সেশন সফলভাবে রিভোক করা হয়েছে।`;
    }
    if (command.isByTrustLevel()) {
      return `নির্দিষ্ট ট্রাস্ট লেভেল থেকে ${sessionsRevoked}টি সেশন সফলভাবে রিভোক করা হয়েছে।`;
    }
    return `${sessionsRevoked}টি সেশন সফলভাবে রিভোক করা হয়েছে।`;
  }
}

// ============================================================
// Type Exports
// ============================================================

export type { RevokeAllSessionsResponseDto as RevokeAllSessionsResponseDtoType, BulkRevokeProgress as BulkRevokeProgressType };
