/**
 * Notify Suspicious Login Handler - Enterprise Grade Event Handler
 *
 * @module application/event-handlers/notify-suspicious-login.handler
 *
 * @description
 * Handles login events to detect suspicious patterns (new device, new location, unusual time)
 * and sends real-time notifications via email, SMS, or push notification.
 *
 * Enterprise Features:
 * ✅ Detects new devices, new locations, unusual login times
 * ✅ Multi-channel notification (Email, SMS, Push, WhatsApp)
 * ✅ Rate limiting per user to prevent notification spam
 * ✅ Circuit breaker for external services
 * ✅ Retry mechanism with exponential backoff
 * ✅ User preference respect (opt-out for notifications)
 * ✅ Bengali and English language support
 * ✅ Correlation ID for distributed tracing
 * ✅ Performance metrics for monitoring
 *
 * @example
 * // In your module
 * @Module({
 *   providers: [
 *     NotifySuspiciousLoginHandler,
 *     {
 *       provide: INotificationService,
 *       useClass: NotificationAdapter,
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
  NOTIFICATION_CHANNELS,
  NOTIFICATION_PRIORITY,
  NOTIFICATION_TYPES,
  SUSPICIOUS_LOGIN_CONFIG,
  AUTH_EVENTS,
  type NotificationChannel,
  type NotificationPriority,
  type NotificationType,
} from '@vubon/shared-constants';

import { maskEmail, maskIPAddress, formatDateTime } from '@vubon/shared-utils';

import type { User, Session, DeviceInfo, LocationInfo } from '@vubon/shared-types';

// ============================================================
// Domain/Application Imports
// ============================================================

// Assuming you have these event classes
import { UserLoggedInEvent } from '../events/user-logged-in.event';

// ============================================================
// Ports (Application Layer Interfaces)
// ============================================================

/**
 * Notification Service Port
 * Implemented in infrastructure layer (e.g., NotificationAdapter)
 */
export interface INotificationService {
  /**
   * Send a notification via multiple channels
   */
  sendNotification(params: {
    userId: string;
    email?: string | undefined;
    phone?: string | undefined;
    channels: NotificationChannel[];
    templateName: string;
    templateData: Record<string, unknown>;
    priority: NotificationPriority;
    correlationId?: string | undefined;
    language: 'en' | 'bn';
  }): Promise<{
    success: boolean;
    channelResults: Array<{
      channel: NotificationChannel;
      success: boolean;
      error?: string | undefined;
      messageId?: string | undefined;
    }>;
  }>;
}

/**
 * Device Trust Service Port
 * Implemented in infrastructure layer
 */
export interface IDeviceTrustService {
  /**
   * Check if a device is trusted for a user
   */
  isDeviceTrusted(params: {
    userId: string;
    deviceId: string;
    deviceFingerprint?: string | undefined;
  }): Promise<boolean>;

  /**
   * Check if a location is known for a user
   */
  isLocationKnown(params: {
    userId: string;
    ipAddress: string;
    countryCode?: string | undefined;
    city?: string | undefined;
  }): Promise<boolean>;

  /**
   * Register a new trusted device
   */
  registerTrustedDevice(params: {
    userId: string;
    deviceId: string;
    deviceFingerprint?: string | undefined;
    deviceName?: string | undefined;
    ipAddress: string;
    userAgent: string;
    expiresInDays?: number | undefined;
  }): Promise<void>;
}

/**
 * User Preferences Service Port
 * Implemented in infrastructure layer
 */
export interface IUserPreferencesService {
  /**
   * Get user notification preferences
   */
  getNotificationPreferences(userId: string): Promise<{
    suspiciousLoginEmail: boolean;
    suspiciousLoginSms: boolean;
    suspiciousLoginPush: boolean;
    suspiciousLoginWhatsapp: boolean;
    language: 'en' | 'bn';
  }>;
}

/**
 * Metrics Service Port
 */
export interface IMetricsService {
  incrementCounter(name: string, labels?: Record<string, string> | undefined): void;
  recordHistogram(name: string, value: number, labels?: Record<string, string> | undefined): void;
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

/**
 * Rate Limiter Port
 */
export interface IRateLimiter {
  /**
   * Check if a key has exceeded the rate limit
   */
  isRateLimited(key: string, windowSeconds: number, limit: number): Promise<boolean>;

  /**
   * Increment the counter for a key
   */
  increment(key: string, windowSeconds: number): Promise<number>;
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

export interface NotifySuspiciousLoginHandlerOptions {
  enabled?: boolean | undefined;
  notificationChannels?: NotificationChannel[] | undefined;
  enableCircuitBreaker?: boolean | undefined;
  circuitBreakerThreshold?: number | undefined;
  circuitBreakerTimeoutMs?: number | undefined;
  maxRetries?: number | undefined;
  retryBaseDelayMs?: number | undefined;
  enableLogging?: boolean | undefined;
  enableMetrics?: boolean | undefined;
  rateLimitWindowSeconds?: number | undefined;
  rateLimitMaxNotifications?: number | undefined;
  newDeviceDetectionEnabled?: boolean | undefined;
  newLocationDetectionEnabled?: boolean | undefined;
  unusualTimeDetectionEnabled?: boolean | undefined;
  unusualTimeStartHour?: number | undefined;
  unusualTimeEndHour?: number | undefined;
}

// ============================================================
// Suspicious Login Context
// ============================================================

export interface SuspiciousLoginContext {
  userId: string;
  email: string;
  fullName: string;
  ipAddress: string;
  userAgent: string;
  deviceId: string;
  deviceFingerprint?: string | undefined;
  sessionId: string;
  locationInfo?: {
    country?: string | undefined;
    city?: string | undefined;
    region?: string | undefined;
    timezone?: string | undefined;
  };
  loginTime: Date;
  correlationId: string;
  isNewDevice: boolean;
  isNewLocation: boolean;
  isUnusualTime: boolean;
  knownDevicesCount: number;
  knownLocationsCount: number;
}

// ============================================================
// Main Handler Implementation
// ============================================================

@Injectable()
export class NotifySuspiciousLoginHandler {
  private readonly logger = new Logger(NotifySuspiciousLoginHandler.name);
  private readonly options: Required<NotifySuspiciousLoginHandlerOptions>;
  private readonly notificationCircuitBreaker: CircuitBreaker;

  constructor(
    private readonly notificationService: INotificationService,
    private readonly deviceTrustService: IDeviceTrustService,
    private readonly userPreferencesService: IUserPreferencesService,
    private readonly rateLimiter: IRateLimiter,
    private readonly metricsService?: IMetricsService | undefined,
    private readonly tracerService?: ITracerService | undefined,
    options?: NotifySuspiciousLoginHandlerOptions | undefined,
  ) {
    const defaultChannels: NotificationChannel[] = [
      NOTIFICATION_CHANNELS.EMAIL,
      NOTIFICATION_CHANNELS.SMS,
    ];

    this.options = {
      enabled: options?.enabled ?? true,
      notificationChannels: options?.notificationChannels ?? defaultChannels,
      enableCircuitBreaker: options?.enableCircuitBreaker ?? true,
      circuitBreakerThreshold: options?.circuitBreakerThreshold ?? 5,
      circuitBreakerTimeoutMs: options?.circuitBreakerTimeoutMs ?? 30000,
      maxRetries: options?.maxRetries ?? 3,
      retryBaseDelayMs: options?.retryBaseDelayMs ?? 100,
      enableLogging: options?.enableLogging ?? true,
      enableMetrics: options?.enableMetrics ?? true,
      rateLimitWindowSeconds: options?.rateLimitWindowSeconds ?? 86400, // 24 hours
      rateLimitMaxNotifications: options?.rateLimitMaxNotifications ?? 3,
      newDeviceDetectionEnabled: options?.newDeviceDetectionEnabled ?? true,
      newLocationDetectionEnabled: options?.newLocationDetectionEnabled ?? true,
      unusualTimeDetectionEnabled: options?.unusualTimeDetectionEnabled ?? true,
      unusualTimeStartHour: options?.unusualTimeStartHour ?? 23, // 11 PM
      unusualTimeEndHour: options?.unusualTimeEndHour ?? 5, // 5 AM
    };

    this.notificationCircuitBreaker = CircuitBreaker.getInstance('NotifySuspiciousLoginHandler');
  }

  // ============================================================
  // Main Handle Method
  // ============================================================

  async handle(event: UserLoggedInEvent): Promise<void> {
    if (!this.options.enabled) {
      this.logger.debug(`[${event.correlationId}] Suspicious login handler disabled, skipping`);
      return;
    }

    const startTime = Date.now();
    const span = this.tracerService?.startSpan('NotifySuspiciousLoginHandler.handle', {
      userId: event.userId,
      correlationId: event.correlationId,
    });

    try {
      span?.setAttribute('user.id', event.userId);
      span?.setAttribute('user.email', maskEmail(event.email));
      span?.setAttribute('ip.address', maskIPAddress(event.ipAddress));
      span?.setAttribute('device.id', event.UserLoggedInEvent);

      // ============================================================
      // STEP 1: Build Suspicious Login Context
      // ============================================================

      const context = await this.buildSuspiciousLoginContext(event);

      // ============================================================
      // STEP 2: Detect Suspicious Patterns
      // ============================================================

      const isSuspicious = await this.detectSuspiciousActivity(context);

      if (!isSuspicious) {
        if (this.options.enableLogging) {
          this.logger.debug(
            `[${event.correlationId}] No suspicious pattern detected for user: ${event.userId}`,
          );
        }
        span?.setStatus({ code: 0, message: 'No suspicious activity' });
        span?.end();
        return;
      }

      // ============================================================
      // STEP 3: Rate Limit Check
      // ============================================================

      const rateLimitKey = `suspicious_login_notification:${event.userId}`;
      const isRateLimited = await this.rateLimiter.isRateLimited(
        rateLimitKey,
        this.options.rateLimitWindowSeconds,
        this.options.rateLimitMaxNotifications,
      );

      if (isRateLimited) {
        this.logger.warn(
          `[${event.correlationId}] Rate limit exceeded for suspicious login notifications: user ${event.userId}`,
        );
        this.metricsService?.incrementCounter('suspicious_login.rate_limited', {
          userId: event.userId,
        });
        span?.setAttribute('rate_limited', true);
        span?.end();
        return;
      }

      // ============================================================
      // STEP 4: Get User Preferences
      // ============================================================

      const preferences = await this.userPreferencesService.getNotificationPreferences(
        event.userId,
      );

      if (!this.shouldNotify(preferences)) {
        this.logger.debug(
          `[${event.correlationId}] User ${event.userId} opted out of suspicious login notifications`,
        );
        span?.setAttribute('opted_out', true);
        span?.end();
        return;
      }

      // ============================================================
      // STEP 5: Send Notification
      // ============================================================

      await this.sendSuspiciousLoginNotification(context, preferences);

      // ============================================================
      // STEP 6: Increment Rate Limit Counter
      // ============================================================

      await this.rateLimiter.increment(rateLimitKey, this.options.rateLimitWindowSeconds);

      // ============================================================
      // STEP 7: Register New Device/Location as Trusted (Optional)
      // ============================================================

      if (!context.isNewDevice && !context.isNewLocation) {
        // If this was a suspicious login but device/location is now verified,
        // we could mark it as trusted
        // This is typically handled by the user confirming via notification
      }

      const duration = Date.now() - startTime;

      if (this.options.enableLogging) {
        this.logger.log(
          `[${event.correlationId}] Suspicious login notification sent to ${maskEmail(event.email)} (${duration}ms)`,
          {
            userId: event.userId,
            email: maskEmail(event.email),
            isNewDevice: context.isNewDevice,
            isNewLocation: context.isNewLocation,
            isUnusualTime: context.isUnusualTime,
            duration,
          },
        );
      }

      this.metricsService?.incrementCounter('suspicious_login.notification_sent', {
        userId: event.userId,
        isNewDevice: String(context.isNewDevice),
        isNewLocation: String(context.isNewLocation),
        isUnusualTime: String(context.isUnusualTime),
      });
      this.metricsService?.recordHistogram('suspicious_login.duration', duration, {
        success: 'true',
      });

      span?.setStatus({ code: 0, message: 'Success' });
      span?.end();
    } catch (error) {
      const err = error as Error;
      const duration = Date.now() - startTime;

      this.logger.error(
        `[${event.correlationId}] Failed to process suspicious login for user ${event.userId}: ${err.message}`,
        {
          userId: event.userId,
          email: maskEmail(event.email),
          error: err.message,
          stack: err.stack,
          duration,
        },
      );

      this.metricsService?.incrementCounter('suspicious_login.error', {
        userId: event.userId,
        error: err.name || 'unknown',
      });
      this.metricsService?.recordHistogram('suspicious_login.duration', duration, {
        success: 'false',
      });

      span?.setStatus({ code: 2, message: err.message });
      span?.end();
    }
  }

  // ============================================================
  // Private Methods - Context Building
  // ============================================================

  /**
   * Build suspicious login context from event data
   */
  private async buildSuspiciousLoginContext(
    event: UserLoggedInEvent,
  ): Promise<SuspiciousLoginContext> {
    const knownDevicesCount = await this.getKnownDevicesCount(event.userId);
    const knownLocationsCount = await this.getKnownLocationsCount(event.userId);

    const isNewDevice = await this.deviceTrustService.isDeviceTrusted({
      userId: event.userId,
      deviceId: event.deviceId,
      deviceFingerprint: event.deviceFingerprint,
    });

    const isNewLocation = await this.deviceTrustService.isLocationKnown({
      userId: event.userId,
      ipAddress: event.ipAddress,
      countryCode: event.locationInfo?.country,
      city: event.locationInfo?.city,
    });

    const isUnusualTime = this.isUnusualLoginTime();

    return {
      userId: event.userId,
      email: event.email,
      fullName: event.fullName,
      ipAddress: event.ipAddress,
      userAgent: event.userAgent,
      deviceId: event.deviceId,
      deviceFingerprint: event.deviceFingerprint,
      sessionId: event.sessionId,
      locationInfo: event.locationInfo,
      loginTime: event.timestamp || new Date(),
      correlationId: event.correlationId,
      isNewDevice: !isNewDevice,
      isNewLocation: !isNewLocation,
      isUnusualTime,
      knownDevicesCount,
      knownLocationsCount,
    };
  }

  /**
   * Get known devices count for a user (mock - replace with actual implementation)
   */
  private async getKnownDevicesCount(userId: string): Promise<number> {
    // In real implementation, query the database for user's devices
    // This is a placeholder
    return 1;
  }

  /**
   * Get known locations count for a user (mock - replace with actual implementation)
   */
  private async getKnownLocationsCount(userId: string): Promise<number> {
    // In real implementation, query the database for user's locations
    // This is a placeholder
    return 1;
  }

  // ============================================================
  // Private Methods - Detection
  // ============================================================

  /**
   * Detect if login is suspicious
   */
  private async detectSuspiciousActivity(context: SuspiciousLoginContext): Promise<boolean> {
    let isSuspicious = false;

    if (this.options.newDeviceDetectionEnabled && context.isNewDevice) {
      isSuspicious = true;
    }

    if (this.options.newLocationDetectionEnabled && context.isNewLocation) {
      isSuspicious = true;
    }

    if (this.options.unusualTimeDetectionEnabled && context.isUnusualTime) {
      isSuspicious = true;
    }

    // If user has no known devices (new user), don't send notification
    if (context.knownDevicesCount === 0) {
      isSuspicious = false;
    }

    return isSuspicious;
  }

  /**
   * Check if login time is unusual (11 PM - 5 AM)
   */
  private isUnusualLoginTime(): boolean {
    if (!this.options.unusualTimeDetectionEnabled) {
      return false;
    }

    const now = new Date();
    const hour = now.getHours();

    const startHour = this.options.unusualTimeStartHour;
    const endHour = this.options.unusualTimeEndHour;

    if (startHour < endHour) {
      return hour >= startHour && hour < endHour;
    } else {
      // Crosses midnight (e.g., 23:00 to 05:00)
      return hour >= startHour || hour < endHour;
    }
  }

  // ============================================================
  // Private Methods - Notification
  // ============================================================

  /**
   * Check if user wants to be notified
   */
  private shouldNotify(preferences: {
    suspiciousLoginEmail: boolean;
    suspiciousLoginSms: boolean;
    suspiciousLoginPush: boolean;
    suspiciousLoginWhatsapp: boolean;
  }): boolean {
    return (
      preferences.suspiciousLoginEmail ||
      preferences.suspiciousLoginSms ||
      preferences.suspiciousLoginPush ||
      preferences.suspiciousLoginWhatsapp
    );
  }

  /**
   * Get appropriate notification channels based on user preferences
   */
  private getNotificationChannels(preferences: {
    suspiciousLoginEmail: boolean;
    suspiciousLoginSms: boolean;
    suspiciousLoginPush: boolean;
    suspiciousLoginWhatsapp: boolean;
  }): NotificationChannel[] {
    const channels: NotificationChannel[] = [];

    if (preferences.suspiciousLoginEmail) {
      channels.push(NOTIFICATION_CHANNELS.EMAIL);
    }
    if (preferences.suspiciousLoginSms) {
      channels.push(NOTIFICATION_CHANNELS.SMS);
    }
    if (preferences.suspiciousLoginPush) {
      channels.push(NOTIFICATION_CHANNELS.PUSH);
    }
    if (preferences.suspiciousLoginWhatsapp) {
      channels.push(NOTIFICATION_CHANNELS.WHATSAPP);
    }

    return channels.length > 0 ? channels : this.options.notificationChannels;
  }

  /**
   * Send suspicious login notification
   */
  private async sendSuspiciousLoginNotification(
    context: SuspiciousLoginContext,
    preferences: {
      suspiciousLoginEmail: boolean;
      suspiciousLoginSms: boolean;
      suspiciousLoginPush: boolean;
      suspiciousLoginWhatsapp: boolean;
      language: 'en' | 'bn';
    },
  ): Promise<void> {
    const channels = this.getNotificationChannels(preferences);
    const language = preferences.language || 'en';
    const isBengali = language === 'bn';

    const templateData = this.buildTemplateData(context, isBengali);

    const notificationParams: {
      userId: string;
      email: string;
      phone: string | undefined;
      channels: NotificationChannel[];
      templateName: string;
      templateData: Record<string, unknown>;
      priority: NotificationPriority;
      correlationId: string;
      language: 'en' | 'bn';
    } = {
      userId: context.userId,
      email: context.email,
      phone: undefined, // Should be fetched from user entity
      channels,
      templateName: isBengali ? 'suspicious-login-bn' : 'suspicious-login-en',
      templateData,
      priority: NOTIFICATION_PRIORITY.HIGH,
      correlationId: context.correlationId,
      language,
    };

    try {
      if (this.options.enableCircuitBreaker) {
        await this.notificationCircuitBreaker.call(async () =>
          withRetry(
            () => this.notificationService.sendNotification(notificationParams),
            this.options.maxRetries,
            this.options.retryBaseDelayMs,
          ),
        );
      } else {
        await withRetry(
          () => this.notificationService.sendNotification(notificationParams),
          this.options.maxRetries,
          this.options.retryBaseDelayMs,
        );
      }
    } catch (error) {
      const err = error as Error;
      this.logger.error(
        `[${context.correlationId}] Failed to send suspicious login notification: ${err.message}`,
        {
          userId: context.userId,
          error: err.message,
        },
      );
      // Re-throw to trigger circuit breaker
      throw error;
    }
  }

  /**
   * Build template data for notification
   */
  private buildTemplateData(
    context: SuspiciousLoginContext,
    isBengali: boolean,
  ): Record<string, unknown> {
    const appName = 'vubon.com.bd';
    const supportEmail = 'support@vubon.com.bd';

    const reasons: string[] = [];
    if (context.isNewDevice) {
      reasons.push(isBengali ? 'একটি নতুন ডিভাইস' : 'a new device');
    }
    if (context.isNewLocation) {
      reasons.push(isBengali ? 'একটি নতুন অবস্থান' : 'a new location');
    }
    if (context.isUnusualTime) {
      reasons.push(isBengali ? 'অস্বাভাবিক সময়' : 'an unusual time');
    }

    const reasonText = isBengali
      ? `আমরা ${reasons.join(' এবং ')} থেকে আপনার অ্যাকাউন্টে একটি লগইন শনাক্ত করেছি।`
      : `We detected a login to your account from ${reasons.join(' and ')}.`;

    const locationText = context.locationInfo
      ? `${context.locationInfo.city || ''} ${context.locationInfo.country || ''}`.trim() ||
        context.ipAddress
      : context.ipAddress;

    return {
      userName: context.fullName.split(' ')[0] || 'User',
      fullName: context.fullName,
      email: context.email,
      appName,
      supportEmail,
      year: new Date().getFullYear(),
      loginTime: formatDateTime(context.loginTime, isBengali ? 'bn' : 'en'),
      ipAddress: maskIPAddress(context.ipAddress),
      deviceInfo: context.userAgent,
      location: locationText,
      reason: reasonText,
      isNewDevice: context.isNewDevice,
      isNewLocation: context.isNewLocation,
      isUnusualTime: context.isUnusualTime,
      headerColor: isBengali ? '#0066cc' : '#0066cc',
      companyName: appName,
      securityTip: isBengali
        ? 'আপনি যদি এই লগইনটি না করে থাকেন, তাহলে আপনার পাসওয়ার্ড পরিবর্তন করুন এবং আমাদের সাপোর্ট টিমকে জানান।'
        : 'If you did not make this login, please change your password and contact our support team.',
      actionUrl: `https://${appName}/security/activity`,
    };
  }

  // ============================================================
  // Public Helper Methods (for testing or manual triggers)
  // ============================================================

  /**
   * Get handler status (for health checks)
   */
  public getStatus(): {
    enabled: boolean;
    circuitBreaker: {
      state: string;
      failures: number;
    };
  } {
    return {
      enabled: this.options.enabled ?? true,
      circuitBreaker: {
        state: this.notificationCircuitBreaker.getStatus().state,
        failures: this.notificationCircuitBreaker.getStatus().failures,
      },
    };
  }

  /**
   * Reset circuit breaker (for testing)
   */
  public resetCircuitBreaker(): void {
    this.notificationCircuitBreaker.reset();
  }
}

// ============================================================
// Module Configuration
// ============================================================

export const NOTIFY_SUSPICIOUS_LOGIN_HANDLER_OPTIONS = 'NOTIFY_SUSPICIOUS_LOGIN_HANDLER_OPTIONS';

export const NotifySuspiciousLoginHandlerModuleConfig = {
  provide: NOTIFY_SUSPICIOUS_LOGIN_HANDLER_OPTIONS,
  useValue: {},
};

export type { NotifySuspiciousLoginHandlerOptions as NotifySuspiciousLoginHandlerOptionsType };
export type { SuspiciousLoginContext as SuspiciousLoginContextType };
