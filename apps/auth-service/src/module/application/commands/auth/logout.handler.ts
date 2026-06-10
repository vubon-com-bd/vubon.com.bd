/**
 * Logout Command Handler - Application Layer (Enterprise Enhanced v5.0)
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module application/commands/auth/logout.handler
 * 
 * @description
 * Handles the logout use case for one or all sessions with enterprise-grade features:
 * - Multi-scope logout (CURRENT, ALL, DEVICE, EXCEPT_CURRENT)
 * - Session and refresh token revocation
 * - Transaction management for data consistency
 * - Circuit breaker pattern for event publishing
 * - Multi-language error messages (English/Bengali)
 * - Distributed tracing with correlation ID
 * - Metrics collection for monitoring
 * - Health check for service monitoring
 * - Bangladesh specific - District, upazila, mobile operator, network type tracking
 * - Audit logging with Bengali messages
 * 
 * @example
 * const handler = new LogoutHandler(...);
 * const result = await handler.execute(userId, command, 'bn');
 */

import { Injectable, NotFoundException, UnauthorizedException, Logger, Inject, forwardRef } from '@nestjs/common';
import { CircuitBreaker } from 'opossum';
import { v4 as uuidv4 } from 'uuid';

// ============================================================
// Shared Packages Import (Enterprise Enhancement)
// ============================================================

import { 
  SESSION_CONFIG,
  LOGOUT_REASONS,
  LOGOUT_SOURCES,
  AUDIT_ACTIONS,
  CIRCUIT_BREAKER_CONFIG,
  ENV_CONFIG
} from '@vubon/shared-constants';

import type { 
  LogoutScope as SharedLogoutScope,
  LogoutReason,
  LogoutSource,
  AuditMetadata,
  DeviceInfo as SharedDeviceInfo,
  Locale,
  CircuitBreakerStatus,
  ServiceMetrics
} from '@vubon/shared-types';

import { maskString, maskDeviceId } from '@vubon/shared-utils';

// ============================================================
// Local Imports
// ============================================================

import { LogoutCommand, LogoutScope } from './logout.command';
import { RefreshTokenRepository } from '../../../domain/repositories/refresh-token.repository.interface';
import { SessionRepository } from '../../../domain/repositories/session.repository.interface';
import { Token, TokenType } from '../../../domain/value-objects/token.vo';

import { UserLoggedOutEvent, LogoutReason as EventLogoutReason, LogoutSource as EventLogoutSource } from '../../events/user-logged-out.event';

import { 
  EventBus, 
  AuditService, 
  TransactionManager,
  MetricsService,
  TracerService
} from './infrastructure.interface';

// ============================================================
// Constants (Using shared-constants)
// ============================================================

const IS_PRODUCTION = ENV_CONFIG?.IS_PRODUCTION ?? false;

const CIRCUIT_BREAKER_OPTIONS = {
  timeout: CIRCUIT_BREAKER_CONFIG?.TIMEOUT_MS ?? 10000,
  errorThresholdPercentage: CIRCUIT_BREAKER_CONFIG?.ERROR_THRESHOLD_PERCENTAGE ?? 50,
  resetTimeout: CIRCUIT_BREAKER_CONFIG?.RESET_TIMEOUT_MS ?? 30000,
  rollingCountTimeout: 10000,
  rollingCountBuckets: 10,
};

// ============================================================
// Bengali Error Messages
// ============================================================

const BENGALI_MESSAGES = {
  SESSION_NOT_FOUND: (sessionId: string) => `সেশন ${sessionId} পাওয়া যায়নি`,
  UNAUTHORIZED_SESSION: 'অন্যের সেশন রিভোক করা যাবে না',
  CURRENT_SESSION_REQUIRED: 'বর্তমান সেশন আইডি প্রয়োজন',
  DEVICE_ID_REQUIRED: 'ডিভাইস আইডি প্রয়োজন',
  LOGOUT_SUCCESS: (count: number, scope: string) => {
    const scopeMap: Record<string, string> = {
      all: `${count}টি ডিভাইস থেকে সফলভাবে লগআউট হয়েছে`,
      device: `ডিভাইস থেকে সফলভাবে লগআউট হয়েছে`,
      except_current: `${count}টি অন্যান্য ডিভাইস থেকে সফলভাবে লগআউট হয়েছে`,
      current: 'সফলভাবে লগআউট হয়েছে'
    };
    return scopeMap[scope] || scopeMap.current;
  },
};

// ============================================================
// Circuit Breaker for Event Publishing (Enterprise Pattern)
// ============================================================

class EventCircuitBreaker {
  private static instance: EventCircuitBreaker;
  private breaker: CircuitBreaker;
  private readonly logger = new Logger(EventCircuitBreaker.name);

  private constructor() {
    this.breaker = new CircuitBreaker(
      async (fn: () => Promise<void>) => {
        await fn();
      },
      CIRCUIT_BREAKER_OPTIONS
    );

    this.setupEventListeners();
  }

  static getInstance(): EventCircuitBreaker {
    if (!EventCircuitBreaker.instance) {
      EventCircuitBreaker.instance = new EventCircuitBreaker();
    }
    return EventCircuitBreaker.instance;
  }

  private setupEventListeners(): void {
    this.breaker.on('open', () => {
      this.logger.warn('Event circuit breaker opened');
    });

    this.breaker.on('halfOpen', () => {
      this.logger.log('Event circuit breaker half-open');
    });

    this.breaker.on('close', () => {
      this.logger.log('Event circuit breaker closed');
    });
  }

  async call(fn: () => Promise<void>): Promise<void> {
    return this.breaker.fire(fn);
  }

  getStatus(): CircuitBreakerStatus {
    const stats = this.breaker.stats;
    return {
      state: this.breaker.status?.state as 'open' | 'closed' | 'half-open' || 'closed',
      failures: stats?.failures || 0,
      successes: stats?.successes || 0,
      fallbacks: stats?.fallbacks || 0,
      rejects: stats?.rejects || 0,
    };
  }

  reset(): void {
    this.breaker.close();
  }
}

// ============================================================
// Types
// ============================================================

/**
 * Logout Response DTO (Enhanced)
 */
export interface LogoutResponseDto {
  success: boolean;
  message: string;
  messageBn?: string;
  sessionsRevoked: number;
  devicesAffected?: number;
  revokedSessionIds?: string[];
  revokedDeviceIds?: string[];
  currentSessionKept?: boolean;
  revokedAt: string;
  correlationId?: string;
  durationMs?: number;
}

/**
 * Revocation result interface
 */
interface RevocationResult {
  sessionsRevoked: number;
  revokedSessionIds: string[];
  devicesAffected?: number;
  revokedDeviceIds?: string[];
  currentSessionKept?: boolean;
}

// ============================================================
// Logout Handler (Enterprise Enhanced v5.0)
// ============================================================

@Injectable()
export class LogoutHandler {
  private readonly logger = new Logger(LogoutHandler.name);
  private readonly eventBreaker = EventCircuitBreaker.getInstance();
  
  // Performance metrics
  private metrics: ServiceMetrics = {
    totalExecutions: 0,
    successfulExecutions: 0,
    failedExecutions: 0,
    totalDurationMs: 0,
    averageDurationMs: 0,
    lastExecutionAt: undefined,
    errorRate: 0,
  };

  constructor(
    @Inject(forwardRef(() => RefreshTokenRepository))
    private readonly refreshTokenRepository: RefreshTokenRepository,
    @Inject(forwardRef(() => SessionRepository))
    private readonly sessionRepository: SessionRepository,
    private readonly eventBus: EventBus,
    private readonly auditService: AuditService,
    private readonly transactionManager: TransactionManager,
    private readonly metricsService: MetricsService,
    private readonly tracerService: TracerService
  ) {}

  // ============================================================
  // Main Execute Method with Distributed Tracing
  // ============================================================

  async execute(
    userId: string, 
    command: LogoutCommand,
    locale: Locale = 'en'
  ): Promise<LogoutResponseDto> {
    const startTime = Date.now();
    const span = this.tracerService?.startSpan('LogoutHandler.execute');
    const correlationId = command.correlationId || uuidv4();

    this.metrics.totalExecutions++;
    this.metrics.lastExecutionAt = new Date();
    this.metricsService?.incrementCounter('logout.attempted');
    this.metricsService?.incrementCounter(`logout.scope.${command.scope}`);

    try {
      // Add trace attributes
      this.addTraceAttributes(span, command, userId, correlationId);

      let result: RevocationResult;

      // Execute revocation in transaction
      await this.transactionManager.runInTransaction(async () => {
        result = await this.executeRevocation(userId, command, correlationId);
      });

      // Publish event with circuit breaker
      await this.publishLogoutEventWithBreaker(userId, command, result!, correlationId);

      // Audit log with Bengali support
      await this.auditLog(userId, command, result!, correlationId, locale);

      // Record success metrics
      this.metrics.successfulExecutions++;
      this.metrics.totalDurationMs += Date.now() - startTime;
      this.updateMetrics(true);
      this.metricsService?.incrementCounter('logout.successful');
      this.metricsService?.recordHistogram('logout.duration', Date.now() - startTime);
      this.metricsService?.recordHistogram('logout.sessions.revoked', result!.sessionsRevoked);

      // Get success message in appropriate language
      const { message, messageBn } = this.getSuccessMessage(result!.sessionsRevoked, command.scope, locale);

      span?.setStatus({ code: 0, message: 'Success' });
      span?.end();

      return {
        success: true,
        message,
        messageBn,
        sessionsRevoked: result!.sessionsRevoked,
        devicesAffected: result!.devicesAffected,
        revokedSessionIds: result!.revokedSessionIds,
        revokedDeviceIds: result!.revokedDeviceIds,
        currentSessionKept: result!.currentSessionKept,
        revokedAt: new Date().toISOString(),
        correlationId,
        durationMs: Date.now() - startTime,
      };

    } catch (error) {
      // Record failure metrics
      this.metrics.failedExecutions++;
      this.metrics.totalDurationMs += Date.now() - startTime;
      this.updateMetrics(false);
      this.metricsService?.incrementCounter('logout.failed');
      this.metricsService?.incrementCounter(`logout.error.${this.getErrorCode(error)}`);

      span?.setStatus({ code: 2, message: (error as Error).message });
      span?.setAttribute('error.code', this.getErrorCode(error));
      span?.setAttribute('error.message', (error as Error).message);
      span?.end();

      // Throw localized error message
      this.throwLocalizedError(error, locale);
      throw error; // This line won't be reached, but TypeScript needs it
    }
  }

  // ============================================================
  // Private Helper Methods
  // ============================================================

  /**
   * Execute revocation based on scope
   */
  private async executeRevocation(
    userId: string,
    command: LogoutCommand,
    correlationId?: string
  ): Promise<RevocationResult> {
    const { refreshToken, scope, sessionId, deviceId, reason, keepCurrent } = command;
    const currentSessionId = command.getCurrentSessionId();

    switch (scope) {
      case LogoutScope.ALL:
        return this.revokeAllUserSessions(
          userId,
          reason || 'User logged out from all devices',
          keepCurrent ? currentSessionId : undefined,
          correlationId
        );

      case LogoutScope.DEVICE:
        if (!deviceId) {
          throw new Error('Device ID is required for device scope logout');
        }
        return this.revokeSessionsByDevice(
          userId,
          deviceId,
          reason || 'User revoked sessions for this device',
          keepCurrent ? currentSessionId : undefined,
          correlationId
        );

      case LogoutScope.EXCEPT_CURRENT:
        if (!currentSessionId) {
          throw new Error('Current session ID is required for "except_current" scope');
        }
        return this.revokeAllExceptCurrent(
          userId,
          currentSessionId,
          reason || 'User logged out from all other devices',
          correlationId
        );

      case LogoutScope.CURRENT:
      default:
        return this.revokeCurrentSession(
          userId,
          refreshToken,
          sessionId,
          reason || 'User logged out',
          correlationId,
          command.getDeviceInfo()
        );
    }
  }

  /**
   * Revoke current session (logout from this device only)
   */
  private async revokeCurrentSession(
    userId: string,
    refreshTokenValue: string | undefined,
    sessionId: string | undefined,
    reason: string,
    correlationId?: string,
    deviceInfo?: any
  ): Promise<RevocationResult> {
    let revokedSessionIds: string[] = [];
    
    // If session ID provided, use it directly
    if (sessionId) {
      const session = await this.sessionRepository.findById(sessionId);
      if (session && session.validateOwnership(userId) && !session.isRevoked()) {
        session.revoke(reason);
        await this.sessionRepository.save(session);
        revokedSessionIds.push(sessionId);
        
        // Revoke associated refresh token
        const refreshToken = await this.refreshTokenRepository.findByToken(session.getToken());
        if (refreshToken && refreshToken.getUserId() === userId) {
          refreshToken.revoke();
          await this.refreshTokenRepository.save(refreshToken);
        }
      }
      return { sessionsRevoked: revokedSessionIds.length, revokedSessionIds };
    }
    
    // Otherwise use refresh token
    if (!refreshTokenValue) {
      return { sessionsRevoked: 0, revokedSessionIds: [] };
    }
    
    const token = new Token(refreshTokenValue, TokenType.REFRESH);
    const refreshToken = await this.refreshTokenRepository.findByToken(token);
    
    if (!refreshToken || refreshToken.getUserId() !== userId) {
      return { sessionsRevoked: 0, revokedSessionIds: [] };
    }
    
    // Find associated session
    const session = await this.sessionRepository.findByToken(token);
    
    refreshToken.revoke();
    await this.refreshTokenRepository.save(refreshToken);
    
    if (session && session.validateOwnership(userId) && !session.isRevoked()) {
      session.revoke(reason);
      await this.sessionRepository.save(session);
      revokedSessionIds.push(session.getId());
    }
    
    return { sessionsRevoked: revokedSessionIds.length || 1, revokedSessionIds };
  }

  /**
   * Revoke all sessions for a user
   */
  private async revokeAllUserSessions(
    userId: string,
    reason: string,
    excludeSessionId?: string,
    correlationId?: string
  ): Promise<RevocationResult> {
    let sessionsRevoked = 0;
    const revokedSessionIds: string[] = [];
    
    const sessions = await this.sessionRepository.findActiveSessions(userId);
    
    for (const session of sessions) {
      if (excludeSessionId && session.getId() === excludeSessionId) {
        continue;
      }
      
      session.revoke(reason);
      await this.sessionRepository.save(session);
      sessionsRevoked++;
      revokedSessionIds.push(session.getId());
      
      const refreshToken = await this.refreshTokenRepository.findByToken(session.getToken());
      if (refreshToken) {
        refreshToken.revoke();
        await this.refreshTokenRepository.save(refreshToken);
      }
    }
    
    // Revoke any orphaned refresh tokens
    await this.refreshTokenRepository.revokeAllByUserId(userId, reason);
    
    return {
      sessionsRevoked,
      revokedSessionIds,
      currentSessionKept: !!excludeSessionId
    };
  }

  /**
   * Revoke all sessions except current
   */
  private async revokeAllExceptCurrent(
    userId: string,
    currentSessionId: string,
    reason: string,
    correlationId?: string
  ): Promise<RevocationResult> {
    return this.revokeAllUserSessions(userId, reason, currentSessionId, correlationId);
  }

  /**
   * Revoke sessions by device (Bangladesh specific)
   */
  private async revokeSessionsByDevice(
    userId: string,
    deviceId: string,
    reason: string,
    excludeSessionId?: string,
    correlationId?: string
  ): Promise<RevocationResult> {
    let sessionsRevoked = 0;
    const revokedSessionIds: string[] = [];
    const revokedDeviceIds: string[] = [deviceId];
    
    const sessions = await this.sessionRepository.findActiveSessions(userId);
    
    for (const session of sessions) {
      const sessionDeviceId = session.getDeviceId()?.getValue();
      if (sessionDeviceId === deviceId) {
        if (excludeSessionId && session.getId() === excludeSessionId) {
          continue;
        }
        
        session.revoke(reason);
        await this.sessionRepository.save(session);
        sessionsRevoked++;
        revokedSessionIds.push(session.getId());
        
        const refreshToken = await this.refreshTokenRepository.findByToken(session.getToken());
        if (refreshToken) {
          refreshToken.revoke();
          await this.refreshTokenRepository.save(refreshToken);
        }
      }
    }
    
    return {
      sessionsRevoked,
      revokedSessionIds,
      revokedDeviceIds,
      devicesAffected: 1,
      currentSessionKept: !!excludeSessionId
    };
  }

  /**
   * Publish logout event with circuit breaker
   */
  private async publishLogoutEventWithBreaker(
    userId: string,
    command: LogoutCommand,
    result: RevocationResult,
    correlationId?: string
  ): Promise<void> {
    const deviceInfo = command.getDeviceInfo();
    
    const event = new UserLoggedOutEvent(
      userId,
      result.revokedSessionIds[0],
      command.scope === LogoutScope.ALL ? EventLogoutReason.USER_INITIATED_ALL : EventLogoutReason.USER_INITIATED,
      command.scope === LogoutScope.ALL ? EventLogoutSource.USER_ALL : EventLogoutSource.USER,
      correlationId,
      undefined,
      deviceInfo?.deviceId,
      deviceInfo?.ipAddress,
      deviceInfo?.userAgent,
      undefined,
      command.reason,
      result.sessionsRevoked,
      result.devicesAffected
    );

    await this.eventBreaker.call(async () => {
      await this.eventBus.publish(event);
    });
  }

  /**
   * Audit log with Bengali support
   */
  private async auditLog(
    userId: string,
    command: LogoutCommand,
    result: RevocationResult,
    correlationId?: string,
    locale: Locale = 'en'
  ): Promise<void> {
    const deviceInfo = command.getDeviceInfo();
    
    await this.auditService.log({
      action: AUDIT_ACTIONS.LOGOUT,
      userId,
      sessionsRevoked: result.sessionsRevoked,
      devicesAffected: result.devicesAffected,
      revokedSessionIds: result.revokedSessionIds,
      revokedDeviceIds: result.revokedDeviceIds,
      ipAddress: deviceInfo?.ipAddress,
      deviceId: deviceInfo?.deviceId,
      userAgent: deviceInfo?.userAgent,
      correlationId,
      reason: command.reason,
      scope: command.scope,
      currentSessionKept: result.currentSessionKept,
      // Bangladesh specific
      district: deviceInfo?.district,
      upazila: deviceInfo?.upazila,
      mobileOperator: deviceInfo?.mobileOperator,
      networkType: deviceInfo?.networkType,
      // Bengali message for audit
      messageBn: this.getSuccessMessage(result.sessionsRevoked, command.scope, 'bn').messageBn,
    });
  }

  /**
   * Get success message in English and Bengali
   */
  private getSuccessMessage(
    sessionsRevoked: number, 
    scope: LogoutScope, 
    locale: Locale = 'en'
  ): { message: string; messageBn: string } {
    const scopeKey = scope === LogoutScope.ALL ? 'all' 
      : scope === LogoutScope.DEVICE ? 'device'
      : scope === LogoutScope.EXCEPT_CURRENT ? 'except_current'
      : 'current';

    const messages: Record<string, { en: string; bn: string }> = {
      all: {
        en: `Successfully logged out from ${sessionsRevoked} device${sessionsRevoked !== 1 ? 's' : ''}`,
        bn: `${sessionsRevoked}টি ডিভাইস থেকে সফলভাবে লগআউট হয়েছে`
      },
      device: {
        en: 'Successfully logged out from device',
        bn: 'ডিভাইস থেকে সফলভাবে লগআউট হয়েছে'
      },
      except_current: {
        en: `Successfully logged out from ${sessionsRevoked} other device${sessionsRevoked !== 1 ? 's' : ''}`,
        bn: `${sessionsRevoked}টি অন্যান্য ডিভাইস থেকে সফলভাবে লগআউট হয়েছে`
      },
      current: {
        en: 'Successfully logged out',
        bn: 'সফলভাবে লগআউট হয়েছে'
      }
    };

    const selected = messages[scopeKey];
    return {
      message: selected.en,
      messageBn: selected.bn
    };
  }

  /**
   * Throw localized error message
   */
  private throwLocalizedError(error: unknown, locale: Locale): never {
    const errorMessage = (error as Error).message;
    
    if (errorMessage.includes('Session') && errorMessage.includes('not found')) {
      const sessionId = errorMessage.match(/Session (.+?) not found/)?.[1] || 'unknown';
      const msg = locale === 'bn' ? BENGALI_MESSAGES.SESSION_NOT_FOUND(sessionId) : errorMessage;
      throw new NotFoundException(msg);
    }
    
    if (errorMessage.includes('Cannot revoke another user\'s session')) {
      const msg = locale === 'bn' ? BENGALI_MESSAGES.UNAUTHORIZED_SESSION : errorMessage;
      throw new UnauthorizedException(msg);
    }
    
    if (errorMessage.includes('Current session ID is required')) {
      const msg = locale === 'bn' ? BENGALI_MESSAGES.CURRENT_SESSION_REQUIRED : errorMessage;
      throw new Error(msg);
    }
    
    if (errorMessage.includes('Device ID is required')) {
      const msg = locale === 'bn' ? BENGALI_MESSAGES.DEVICE_ID_REQUIRED : errorMessage;
      throw new Error(msg);
    }
    
    throw error;
  }

  /**
   * Get error code for metrics
   */
  private getErrorCode(error: unknown): string {
    if (error instanceof NotFoundException) return 'NOT_FOUND';
    if (error instanceof UnauthorizedException) return 'UNAUTHORIZED';
    if (error instanceof Error) {
      if (error.message.includes('Device ID')) return 'DEVICE_ID_REQUIRED';
      if (error.message.includes('Session ID')) return 'SESSION_ID_REQUIRED';
    }
    return 'INTERNAL_ERROR';
  }

  /**
   * Update metrics
   */
  private updateMetrics(success: boolean): void {
    this.metrics.averageDurationMs = this.metrics.totalDurationMs / this.metrics.totalExecutions;
    this.metrics.errorRate = (this.metrics.failedExecutions / this.metrics.totalExecutions) * 100;
  }

  /**
   * Add trace attributes for distributed tracing
   */
  private addTraceAttributes(
    span: unknown, 
    command: LogoutCommand, 
    userId: string, 
    correlationId: string
  ): void {
    const setAttribute = (key: string, value: unknown) => {
      if (span && typeof (span as any).setAttribute === 'function') {
        (span as any).setAttribute(key, value);
      }
    };

    setAttribute('command.id', command.commandId);
    setAttribute('correlation.id', correlationId);
    setAttribute('user.id', userId);
    setAttribute('logout.scope', command.scope);
    setAttribute('logout.reason', command.reason);
    setAttribute('has.refresh.token', command.hasRefreshToken());
    setAttribute('has.session.id', !!command.getSessionId());
    setAttribute('has.device.id', !!command.getDeviceId());
    setAttribute('keep.current', command.shouldKeepCurrent());
    setAttribute('all.devices', command.isAllDevices());
    setAttribute('device.type', command.getDeviceType() || 'unknown');
    setAttribute('has.device.info', !!command.getDeviceInfo());
    setAttribute('device.district', command.getDeviceInfo()?.district || 'unknown');
    setAttribute('device.mobile.operator', command.getDeviceInfo()?.mobileOperator || 'unknown');
    setAttribute('device.network.type', command.getDeviceInfo()?.networkType || 'unknown');
  }

  // ============================================================
  // Public Metrics & Health Methods
  // ============================================================

  /**
   * Get service metrics
   */
  getMetrics(): ServiceMetrics {
    return { ...this.metrics };
  }

  /**
   * Get circuit breaker status
   */
  getCircuitBreakerStatus(): CircuitBreakerStatus {
    return this.eventBreaker.getStatus();
  }

  /**
   * Reset circuit breaker
   */
  resetCircuitBreaker(): void {
    this.eventBreaker.reset();
  }

  /**
   * Reset metrics
   */
  resetMetrics(): void {
    this.metrics = {
      totalExecutions: 0,
      successfulExecutions: 0,
      failedExecutions: 0,
      totalDurationMs: 0,
      averageDurationMs: 0,
      lastExecutionAt: undefined,
      errorRate: 0,
    };
  }

  /**
   * Health check
   */
  async healthCheck(): Promise<{ 
    healthy: boolean; 
    latency: number; 
    circuitBreaker: string;
    error?: string;
  }> {
    const startTime = Date.now();
    
    try {
      // Test database connection
      await this.sessionRepository.count();
      const latency = Date.now() - startTime;
      
      return { 
        healthy: true, 
        latency,
        circuitBreaker: this.eventBreaker.getStatus().state,
      };
    } catch (error) {
      return {
        healthy: false,
        latency: Date.now() - startTime,
        circuitBreaker: this.eventBreaker.getStatus().state,
        error: (error as Error).message,
      };
    }
  }
}

// ============================================================
// Type Exports
// ============================================================

export type { LogoutResponseDto as LogoutResponseDtoType };
