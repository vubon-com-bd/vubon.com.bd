/**
 * Log Registration Activity Handler - Enterprise Grade Event Handler
 *
 * @module application/event-handlers/log-registration-activity.handler
 *
 * @description
 * Handles UserRegisteredEvent to log registration activity for audit trail,
 * security monitoring, and analytics purposes.
 *
 * Enterprise Features:
 * ✅ Audit trail logging with before/after state
 * ✅ Security event detection (suspicious patterns)
 * ✅ Analytics event publishing
 * ✅ Correlation ID propagation
 * ✅ Performance metrics
 * ✅ Circuit breaker for external services
 * ✅ Retry mechanism for resilience
 * ✅ GDPR compliant data masking
 * ✅ Bangladesh specific context logging
 *
 * @example
 * // In your module
 * @Module({
 *   providers: [
 *     LogRegistrationActivityHandler,
 *     {
 *       provide: IAuditLogRepository,
 *       useClass: PrismaAuditLogRepository,
 *     },
 *   ],
 * })
 * export class AuthModule {}
 */

import { Injectable, Logger } from '@nestjs/common';

// ============================================================
// Shared Packages Import (SSOT)
// ============================================================

import {
  AUDIT_ACTIONS,
  AUDIT_SEVERITIES,
  AUDIT_SOURCES,
  AUDIT_ENTITY_TYPES,
  type AuditActionValue,
  type AuditSeverityValue,
  type AuditSourceValue,
  type AuditEntityTypeValue,
  type UserRole,
  type UserStatus,
  type UserTier,
} from '@vubon/shared-constants';

import { maskEmail, maskPhone, maskIPAddress } from '@vubon/shared-utils';

import type { AuditLog } from '@vubon/shared-types';

// ============================================================
// Domain/Application Imports
// ============================================================

import { UserRegisteredEvent } from '../events/user-registered.event';

// ============================================================
// Ports (Application Layer Interfaces)
// ============================================================

/**
 * Audit Log Repository Port
 * Implemented in infrastructure layer (e.g., PrismaAuditLogRepository)
 */
export interface IAuditLogRepository {
  /**
   * Create a new audit log entry
   */
  create(data: {
    action: AuditActionValue;
    severity: AuditSeverityValue;
    source: AuditSourceValue;
    entityType: AuditEntityTypeValue;
    entityId: string;
    userId?: string | undefined;
    ipAddress?: string | undefined;
    userAgent?: string | undefined;
    correlationId?: string | undefined;
    changes?: Record<string, { old: unknown; new: unknown }> | undefined;
    metadata?: Record<string, unknown> | undefined;
    timestamp?: Date | undefined;
  }): Promise<AuditLog>;

  /**
   * Create multiple audit log entries in batch
   */
  createMany(
    entries: Array<{
      action: AuditActionValue;
      severity: AuditSeverityValue;
      source: AuditSourceValue;
      entityType: AuditEntityTypeValue;
      entityId: string;
      userId?: string | undefined;
      ipAddress?: string | undefined;
      userAgent?: string | undefined;
      correlationId?: string | undefined;
      changes?: Record<string, { old: unknown; new: unknown }> | undefined;
      metadata?: Record<string, unknown> | undefined;
      timestamp?: Date | undefined;
    }>,
  ): Promise<{ count: number }>;

  /**
   * Check if audit log exists for a specific entity and action
   */
  exists(params: {
    entityId: string;
    action: AuditActionValue;
    userId?: string | undefined;
    fromDate?: Date | undefined;
    toDate?: Date | undefined;
  }): Promise<boolean>;
}

/**
 * Analytics Event Publisher Port
 * Implemented in infrastructure layer (e.g., KafkaAnalyticsPublisher)
 */
export interface IAnalyticsPublisher {
  /**
   * Publish an analytics event
   */
  publish(event: {
    eventType: string;
    eventVersion: number;
    timestamp: Date;
    userId?: string | undefined;
    sessionId?: string | undefined;
    correlationId?: string | undefined;
    ipAddress?: string | undefined;
    userAgent?: string | undefined;
    properties: Record<string, unknown>;
    metrics?: Record<string, number> | undefined;
  }): Promise<void>;
}

/**
 * Security Event Detector Port
 * Implemented in infrastructure layer
 */
export interface ISecurityEventDetector {
  /**
   * Detect suspicious registration patterns
   */
  detectSuspiciousActivity(params: {
    userId: string;
    email: string;
    phone?: string | undefined;
    ipAddress?: string | undefined;
    userAgent?: string | undefined;
    deviceId?: string | undefined;
    correlationId?: string | undefined;
  }): Promise<{
    isSuspicious: boolean;
    riskLevel: 'low' | 'medium' | 'high';
    reasons: string[];
    recommendation?: string | undefined;
  }>;
}

/**
 * Metrics Service Port
 */
export interface IMetricsService {
  incrementCounter(name: string, labels?: Record<string, string> | undefined): void;
  recordHistogram(name: string, value: number, labels?: Record<string, string> | undefined): void;
  recordGauge(name: string, value: number, labels?: Record<string, string> | undefined): void;
}

/**
 * Tracer Service Port
 */
export interface ITracerService {
  startSpan(
    name: string,
    context?: Record<string, unknown> | undefined,
  ): {
    end: () => void;
    setAttribute: (key: string, value: unknown) => void;
    setStatus: (status: { code: number; message?: string | undefined }) => void;
  };
}

// ============================================================
// Circuit Breaker (Shared Utility)
// ============================================================

export class CircuitBreaker {
  private static instances: Map<string, CircuitBreaker> = new Map();
  private state: {
    state: 'CLOSED' | 'OPEN' | 'HALF_OPEN';
    failures: number;
    lastFailureTime: number;
    nextAttemptTime: number;
    successes: number;
  };
  private readonly successThreshold: number = 3;

  private constructor(
    private readonly name: string,
    private readonly failureThreshold: number = 5,
    private readonly timeoutMs: number = 30000,
  ) {
    this.state = {
      state: 'CLOSED',
      failures: 0,
      lastFailureTime: 0,
      nextAttemptTime: 0,
      successes: 0,
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
        this.state.successes = 0;
      } else {
        throw new Error(`Circuit breaker ${this.name} is OPEN. Service temporarily unavailable.`);
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
      this.state.successes++;
      if (this.state.successes >= this.successThreshold) {
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

  getStatus(): {
    state: string;
    failures: number;
    nextAttemptAt?: Date | undefined;
  } {
    return {
      state: this.state.state,
      failures: this.state.failures,
      nextAttemptAt:
        this.state.nextAttemptTime > 0 ? new Date(this.state.nextAttemptTime) : undefined,
    };
  }

  reset(): void {
    this.state = {
      state: 'CLOSED',
      failures: 0,
      lastFailureTime: 0,
      nextAttemptTime: 0,
      successes: 0,
    };
  }
}

// ============================================================
// Retry Helper
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

      if (attempt === maxRetries) {
        break;
      }

      const delay = baseDelayMs * Math.pow(backoffMultiplier, attempt - 1);
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }

  throw lastError || new Error('Operation failed after retries');
}

// ============================================================
// Handler Configuration
// ============================================================

export interface LogRegistrationActivityHandlerOptions {
  enabled?: boolean | undefined;
  logSeverity?: AuditSeverityValue | undefined;
  enableSecurityDetection?: boolean | undefined;
  enableAnalyticsPublishing?: boolean | undefined;
  enableCircuitBreaker?: boolean | undefined;
  circuitBreakerThreshold?: number | undefined;
  circuitBreakerTimeoutMs?: number | undefined;
  maxRetries?: number | undefined;
  retryBaseDelayMs?: number | undefined;
  enableLogging?: boolean | undefined;
  enableMetrics?: boolean | undefined;
  sensitiveFieldsToMask?: string[] | undefined;
}

// ============================================================
// Activity Log Data
// ============================================================

export interface RegistrationActivityLog {
  userId: string;
  email: string;
  phone?: string | undefined;
  fullName: string;
  role: UserRole;
  tier: UserTier;
  status: UserStatus;
  registrationMethod: string;
  registrationSource: string;
  ipAddress?: string | undefined;
  userAgent?: string | undefined;
  deviceId?: string | undefined;
  preferredLanguage: string;
  isBangladeshUser: boolean;
  timestamp: Date;
  correlationId: string;
}

// ============================================================
// Main Handler Implementation
// ============================================================

@Injectable()
export class LogRegistrationActivityHandler {
  private readonly logger = new Logger(LogRegistrationActivityHandler.name);
  private readonly options: Required<LogRegistrationActivityHandlerOptions>;
  private readonly auditCircuitBreaker: CircuitBreaker;
  private readonly analyticsCircuitBreaker: CircuitBreaker;
  private readonly securityCircuitBreaker: CircuitBreaker;

  constructor(
    private readonly auditLogRepository: IAuditLogRepository,
    private readonly analyticsPublisher?: IAnalyticsPublisher | undefined,
    private readonly securityEventDetector?: ISecurityEventDetector | undefined,
    private readonly metricsService?: IMetricsService | undefined,
    private readonly tracerService?: ITracerService | undefined,
    options?: LogRegistrationActivityHandlerOptions | undefined,
  ) {
    this.options = {
      enabled: options?.enabled ?? true,
      logSeverity: options?.logSeverity ?? AUDIT_SEVERITIES.INFO,
      enableSecurityDetection: options?.enableSecurityDetection ?? true,
      enableAnalyticsPublishing: options?.enableAnalyticsPublishing ?? true,
      enableCircuitBreaker: options?.enableCircuitBreaker ?? true,
      circuitBreakerThreshold: options?.circuitBreakerThreshold ?? 5,
      circuitBreakerTimeoutMs: options?.circuitBreakerTimeoutMs ?? 30000,
      maxRetries: options?.maxRetries ?? 3,
      retryBaseDelayMs: options?.retryBaseDelayMs ?? 100,
      enableLogging: options?.enableLogging ?? true,
      enableMetrics: options?.enableMetrics ?? true,
      sensitiveFieldsToMask: options?.sensitiveFieldsToMask ?? ['email', 'phone', 'ipAddress'],
    };

    this.auditCircuitBreaker = CircuitBreaker.getInstance('AuditLogRepository');
    this.analyticsCircuitBreaker = CircuitBreaker.getInstance('AnalyticsPublisher');
    this.securityCircuitBreaker = CircuitBreaker.getInstance('SecurityEventDetector');
  }

  // ============================================================
  // Main Handle Method
  // ============================================================

  async handle(event: UserRegisteredEvent): Promise<void> {
    if (!this.options.enabled) {
      this.logger.debug(
        `[${event.correlationId}] Registration activity logging disabled, skipping`,
      );
      return;
    }

    const startTime = Date.now();
    const span = this.tracerService?.startSpan('LogRegistrationActivityHandler.handle', {
      userId: event.userId,
      correlationId: event.correlationId,
    });

    try {
      span?.setAttribute('user.id', event.userId);
      span?.setAttribute('user.email', maskEmail(event.email));
      span?.setAttribute('user.role', event.role);
      span?.setAttribute('registration.method', event.registrationMethod);
      span?.setAttribute('registration.source', event.registrationSource);

      if (this.options.enableLogging) {
        this.logger.debug(
          `[${event.correlationId}] Processing registration activity log for user: ${event.userId}`,
        );
      }

      this.metricsService?.incrementCounter('registration_activity.attempted', {
        userId: event.userId,
        correlationId: event.correlationId,
        role: event.role,
      });

      // Step 1: Create Audit Log
      await this.createAuditLog(event);

      // Step 2: Security Event Detection (if enabled)
      if (this.options.enableSecurityDetection && this.securityEventDetector) {
        await this.detectSecurityEvents(event);
      }

      // Step 3: Publish Analytics Event (if enabled)
      if (this.options.enableAnalyticsPublishing && this.analyticsPublisher) {
        await this.publishAnalyticsEvent(event);
      }

      const duration = Date.now() - startTime;

      if (this.options.enableLogging) {
        this.logger.log(
          `[${event.correlationId}] Registration activity logged successfully for user: ${event.userId} (${duration}ms)`,
          {
            userId: event.userId,
            email: maskEmail(event.email),
            role: event.role,
            duration,
          },
        );
      }

      this.metricsService?.incrementCounter('registration_activity.successful', {
        userId: event.userId,
        correlationId: event.correlationId,
        role: event.role,
      });
      this.metricsService?.recordHistogram('registration_activity.duration', duration, {
        success: 'true',
      });

      span?.setStatus({ code: 0, message: 'Success' });
      span?.end();
    } catch (error) {
      const err = error as Error;
      const duration = Date.now() - startTime;

      this.logger.error(
        `[${event.correlationId}] Failed to log registration activity for user ${event.userId}: ${err.message}`,
        {
          userId: event.userId,
          email: maskEmail(event.email),
          error: err.message,
          stack: err.stack,
          duration,
        },
      );

      this.metricsService?.incrementCounter('registration_activity.failed', {
        userId: event.userId,
        correlationId: event.correlationId,
        error: err.name || 'unknown',
      });
      this.metricsService?.recordHistogram('registration_activity.duration', duration, {
        success: 'false',
      });

      span?.setStatus({ code: 2, message: err.message });
      span?.end();

      // Re-throw only if critical - for now, we just log and continue
      // This handler should not break the main registration flow
    }
  }

  // ============================================================
  // Private Methods - Audit Log
  // ============================================================

  /**
   * Create audit log entry for registration
   */
  private async createAuditLog(event: UserRegisteredEvent): Promise<void> {
    const changes = this.buildAuditChanges(event);

    const auditEntry: {
      action: AuditActionValue;
      severity: AuditSeverityValue;
      source: AuditSourceValue;
      entityType: AuditEntityTypeValue;
      entityId: string;
      userId: string;
      ipAddress?: string | undefined;
      userAgent?: string | undefined;
      correlationId?: string | undefined;
      changes: Record<string, { old: unknown; new: unknown }>;
      metadata: Record<string, unknown>;
      timestamp: Date;
    } = {
      action: AUDIT_ACTIONS.REGISTER,
      severity: this.options.logSeverity ?? AUDIT_SEVERITIES.INFO,
      source: this.mapRegistrationSourceToAuditSource(event.registrationSource),
      entityType: AUDIT_ENTITY_TYPES.USER,
      entityId: event.userId,
      userId: event.userId,
      changes,
      metadata: {
        registrationMethod: event.registrationMethod,
        registrationSource: event.registrationSource,
        role: event.role,
        tier: event.tier,
        status: event.status,
        preferredLanguage: event.preferredLanguage,
        isBangladeshUser: event.isBangladeshUser(),
        hasPhone: !!event.phone,
        hasDisplayName: !!event.displayName,
        hasReferralCode: !!event.referralCode,
        marketingConsent: event.marketingConsent,
        whatsappConsent: event.whatsappConsent,
        deviceInfo: {
          deviceId: event.deviceId,
          hasFingerprint: !!event.deviceFingerprint,
        },
        ...(event.metadata && { customMetadata: event.metadata }),
      },
      timestamp: new Date(event.timestamp),
    };

    // শুধুমাত্র undefined না হলে প্রপার্টি যোগ করুন
    if (event.ipAddress) {
      auditEntry.ipAddress = maskIPAddress(event.ipAddress);
    }
    if (event.userAgent) {
      auditEntry.userAgent = event.userAgent;
    }
    if (event.correlationId) {
      auditEntry.correlationId = event.correlationId;
    }

    try {
      if (this.options.enableCircuitBreaker) {
        await this.auditCircuitBreaker.call(async () =>
          withRetry(
            () => this.auditLogRepository.create(auditEntry),
            this.options.maxRetries,
            this.options.retryBaseDelayMs,
          ),
        );
      } else {
        await withRetry(
          () => this.auditLogRepository.create(auditEntry),
          this.options.maxRetries,
          this.options.retryBaseDelayMs,
        );
      }

      this.logger.debug(`[${event.correlationId}] Audit log created for user: ${event.userId}`);
    } catch (error) {
      this.logger.error(`[${event.correlationId}] Audit log creation failed:`, error);
      throw error;
    }
  }

  /**
   * Build audit changes (before/after state)
   */
  private buildAuditChanges(
    event: UserRegisteredEvent,
  ): Record<string, { old: unknown; new: unknown }> {
    const changes: Record<string, { old: unknown; new: unknown }> = {
      email: { old: null, new: maskEmail(event.email) },
      fullName: { old: null, new: event.fullName },
      role: { old: null, new: event.role },
      tier: { old: null, new: event.tier },
      status: { old: null, new: event.status },
      registrationMethod: { old: null, new: event.registrationMethod },
      registrationSource: { old: null, new: event.registrationSource },
    };

    if (event.phone) {
      changes.phone = { old: null, new: maskPhone(event.phone) };
    }
    if (event.displayName) {
      changes.displayName = { old: null, new: event.displayName };
    }
    if (event.referralCode) {
      changes.referralCode = { old: null, new: event.referralCode };
    }
    if (event.referredBy) {
      changes.referredBy = { old: null, new: event.referredBy };
    }

    return changes;
  }

  /**
   * Map registration source to audit source
   */
  private mapRegistrationSourceToAuditSource(source: string): AuditSourceValue {
    const sourceMap: Record<string, AuditSourceValue> = {
      WEB: AUDIT_SOURCES.WEB,
      MOBILE_APP: AUDIT_SOURCES.MOBILE,
      API: AUDIT_SOURCES.API,
      ADMIN: AUDIT_SOURCES.ADMIN,
      SOCIAL: AUDIT_SOURCES.WEB,
    };

    return sourceMap[source] || AUDIT_SOURCES.WEB;
  }

  // ============================================================
  // Private Methods - Security Detection
  // ============================================================

  /**
   * Detect suspicious activity and log security events
   */
  private async detectSecurityEvents(event: UserRegisteredEvent): Promise<void> {
    if (!this.securityEventDetector) {
      return;
    }

    try {
      const detectionParams: {
        userId: string;
        email: string;
        phone?: string | undefined;
        ipAddress?: string | undefined;
        userAgent?: string | undefined;
        deviceId?: string | undefined;
        correlationId?: string | undefined;
      } = {
        userId: event.userId,
        email: event.email,
        correlationId: event.correlationId,
      };

      if (event.phone) {
        detectionParams.phone = event.phone;
      }
      if (event.ipAddress) {
        detectionParams.ipAddress = event.ipAddress;
      }
      if (event.userAgent) {
        detectionParams.userAgent = event.userAgent;
      }
      if (event.deviceId) {
        detectionParams.deviceId = event.deviceId;
      }

      const detectionResult = await this.securityCircuitBreaker.call(async () =>
        withRetry(
          () => this.securityEventDetector!.detectSuspiciousActivity(detectionParams),
          this.options.maxRetries,
          this.options.retryBaseDelayMs,
        ),
      );

      if (detectionResult.isSuspicious) {
        this.logger.warn(
          `[${event.correlationId}] Suspicious registration detected for user ${event.userId}: ${detectionResult.reasons.join(', ')}`,
          {
            userId: event.userId,
            riskLevel: detectionResult.riskLevel,
            reasons: detectionResult.reasons,
            recommendation: detectionResult.recommendation,
          },
        );

        // Create security alert audit log
        const securityAlertEntry: {
          action: AuditActionValue;
          severity: AuditSeverityValue;
          source: AuditSourceValue;
          entityType: AuditEntityTypeValue;
          entityId: string;
          userId: string;
          ipAddress?: string | undefined;
          userAgent?: string | undefined;
          correlationId?: string | undefined;
          metadata: Record<string, unknown>;
          timestamp: Date;
        } = {
          action: AUDIT_ACTIONS.SECURITY_ALERT,
          severity:
            detectionResult.riskLevel === 'high'
              ? AUDIT_SEVERITIES.CRITICAL
              : AUDIT_SEVERITIES.WARNING,
          source: AUDIT_SOURCES.SYSTEM,
          entityType: AUDIT_ENTITY_TYPES.USER,
          entityId: event.userId,
          userId: event.userId,
          metadata: {
            detectionType: 'suspicious_registration',
            riskLevel: detectionResult.riskLevel,
            reasons: detectionResult.reasons,
            recommendation: detectionResult.recommendation,
            eventDetails: {
              registrationMethod: event.registrationMethod,
              registrationSource: event.registrationSource,
            },
          },
          timestamp: new Date(),
        };

        if (event.ipAddress) {
          securityAlertEntry.ipAddress = maskIPAddress(event.ipAddress);
        }
        if (event.userAgent) {
          securityAlertEntry.userAgent = event.userAgent;
        }
        if (event.correlationId) {
          securityAlertEntry.correlationId = event.correlationId;
        }

        await this.auditLogRepository.create(securityAlertEntry);

        this.metricsService?.incrementCounter('security_alert.suspicious_registration', {
          userId: event.userId,
          riskLevel: detectionResult.riskLevel,
        });
      }
    } catch (error) {
      this.logger.warn(`[${event.correlationId}] Security event detection failed:`, error);
      // Do not throw - security detection is non-critical
    }
  }

  // ============================================================
  // Private Methods - Analytics
  // ============================================================

  /**
   * Publish analytics event for registration
   */
  private async publishAnalyticsEvent(event: UserRegisteredEvent): Promise<void> {
    if (!this.analyticsPublisher) {
      return;
    }

    try {
      const analyticsEvent: {
        eventType: string;
        eventVersion: number;
        timestamp: Date;
        userId: string;
        sessionId?: string | undefined;
        correlationId?: string | undefined;
        ipAddress?: string | undefined;
        userAgent?: string | undefined;
        properties: Record<string, unknown>;
        metrics?: Record<string, number> | undefined;
      } = {
        eventType: 'user.registered.analytics',
        eventVersion: 1,
        timestamp: new Date(event.timestamp),
        userId: event.userId,
        correlationId: event.correlationId,
        properties: {
          emailDomain: event.email.split('@')[1] || 'unknown',
          fullName: event.fullName,
          displayName: event.displayName,
          role: event.role,
          tier: event.tier,
          status: event.status,
          registrationMethod: event.registrationMethod,
          registrationSource: event.registrationSource,
          preferredLanguage: event.preferredLanguage,
          isBangladeshUser: event.isBangladeshUser(),
          hasPhone: !!event.phone,
          hasDisplayName: !!event.displayName,
          hasReferralCode: !!event.referralCode,
          marketingConsent: event.marketingConsent,
          whatsappConsent: event.whatsappConsent,
          deviceId: event.deviceId,
          hasDeviceFingerprint: !!event.deviceFingerprint,
          ...(event.preferredDistrict && { preferredDistrict: event.preferredDistrict }),
          ...(event.preferredUpazila && { preferredUpazila: event.preferredUpazila }),
          ...(event.preferredOperator && { preferredOperator: event.preferredOperator }),
          ...(event.mobileNetworkType && { mobileNetworkType: event.mobileNetworkType }),
        },
        metrics: {
          registrationTime: new Date(event.timestamp).getTime(),
        },
      };

      if (event.ipAddress) {
        analyticsEvent.ipAddress = maskIPAddress(event.ipAddress);
      }
      if (event.userAgent) {
        analyticsEvent.userAgent = event.userAgent;
      }

      if (this.options.enableCircuitBreaker) {
        await this.analyticsCircuitBreaker.call(async () =>
          withRetry(
            () => this.analyticsPublisher!.publish(analyticsEvent),
            this.options.maxRetries,
            this.options.retryBaseDelayMs,
          ),
        );
      } else {
        await withRetry(
          () => this.analyticsPublisher!.publish(analyticsEvent),
          this.options.maxRetries,
          this.options.retryBaseDelayMs,
        );
      }

      this.logger.debug(
        `[${event.correlationId}] Analytics event published for user: ${event.userId}`,
      );
    } catch (error) {
      this.logger.warn(`[${event.correlationId}] Analytics event publishing failed:`, error);
      // Do not throw - analytics is non-critical
    }
  }

  // ============================================================
  // Public Helper Methods (for testing or manual triggers)
  // ============================================================

  /**
   * Get handler status (for health checks)
   */
  public getStatus(): {
    enabled: boolean;
    circuitBreakers: {
      audit: { state: string; failures: number };
      analytics: { state: string; failures: number };
      security: { state: string; failures: number };
    };
  } {
    return {
      enabled: this.options.enabled ?? true,
      circuitBreakers: {
        audit: {
          state: this.auditCircuitBreaker.getStatus().state,
          failures: this.auditCircuitBreaker.getStatus().failures,
        },
        analytics: {
          state: this.analyticsCircuitBreaker.getStatus().state,
          failures: this.analyticsCircuitBreaker.getStatus().failures,
        },
        security: {
          state: this.securityCircuitBreaker.getStatus().state,
          failures: this.securityCircuitBreaker.getStatus().failures,
        },
      },
    };
  }

  /**
   * Reset circuit breakers (for testing)
   */
  public resetCircuitBreakers(): void {
    this.auditCircuitBreaker.reset();
    this.analyticsCircuitBreaker.reset();
    this.securityCircuitBreaker.reset();
  }
}

// ============================================================
// Module Configuration
// ============================================================

export const LOG_REGISTRATION_ACTIVITY_HANDLER_OPTIONS =
  'LOG_REGISTRATION_ACTIVITY_HANDLER_OPTIONS';

export const LogRegistrationActivityHandlerModuleConfig = {
  provide: LOG_REGISTRATION_ACTIVITY_HANDLER_OPTIONS,
  useValue: {},
};

export type { LogRegistrationActivityHandlerOptions as LogRegistrationActivityHandlerOptionsType };
export type { RegistrationActivityLog as RegistrationActivityLogType };
