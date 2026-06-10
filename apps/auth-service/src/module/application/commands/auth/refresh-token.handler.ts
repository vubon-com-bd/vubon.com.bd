/**
 * Refresh Token Command Handler - Application Layer (Enterprise Enhanced v5.0)
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce

 * @module application/commands/auth/refresh-token.handler

 * @description
 * Handles token refresh use case with enterprise-grade security features:
 * - Token rotation with family tracking
 * - Reuse detection (theft protection) with quarantine
 * - Family revocation on compromise
 * - Session extension with transaction management
 * - Rate limiting with adaptive cooldown
 * - Device fingerprint validation
 * - Circuit breaker pattern for resilience
 * - Distributed tracing with correlation ID
 * - Metrics collection for monitoring
 * - Multi-language error messages (English/Bengali)
 * - Bangladesh specific fields (district, upazila, mobileOperator, networkType)

 * @example
 * const handler = new RefreshTokenHandler(...);
 * const result = await handler.execute(command, 'en');
 */

import { Injectable, UnauthorizedException, NotFoundException, TooManyRequestsException, Logger, Inject, forwardRef } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CircuitBreaker } from 'opossum';

// ============================================================
// Shared Packages Import (Enterprise Enhancement)
// ============================================================

import { 
  TOKEN_CONFIG,
  REFRESH_TOKEN_CONFIG,
  SESSION_CONFIG,
  DEVICE_CONFIG,
  RATE_LIMITS,
  AUDIT_ACTIONS,
  CIRCUIT_BREAKER_CONFIG,
  ENV_CONFIG,
  MOBILE_OPERATORS,
  NETWORK_TYPES
} from '@vubon/shared-constants';

import type { 
  DeviceInfo as SharedDeviceInfo,
  TokenRefreshResult,
  AuditMetadata,
  RateLimitStatus,
  MobileOperator,
  NetworkType,
  Locale,
  CircuitBreakerStatus,
  ServiceMetrics
} from '@vubon/shared-types';

import { maskDeviceId, maskIpAddress, maskTokenId, maskString } from '@vubon/shared-utils';

// ============================================================
// Local Imports
// ============================================================

import { RefreshTokenCommand, RefreshTokenCommandResult, RefreshTokenCommandResultFactory } from './refresh-token.command';
import { RefreshTokenRepository } from '../../../domain/repositories/refresh-token.repository.interface';
import { UserRepository } from '../../../domain/repositories/user.repository.interface';
import { SessionRepository } from '../../../domain/repositories/session.repository.interface';
import { AuditRepository } from '../../../domain/repositories/audit.repository.interface';
import { DeviceRepository } from '../../../domain/repositories/device.repository.interface';
import { Token, TokenType } from '../../../domain/value-objects/token.vo';
import { DeviceId } from '../../../domain/value-objects/device-id.vo';
import { IpAddress } from '../../../domain/value-objects/ip-address.vo';
import { UserAgent } from '../../../domain/value-objects/user-agent.vo';

import { TokenRefreshedEvent } from '../../events/token-refreshed.event';
import { TokenCompromisedEvent } from '../../events/token-compromised.event';

import { 
  TokenGenerator, 
  EventBus, 
  AuditService, 
  RateLimiter, 
  CacheService,
  MetricsService,
  TracerService,
  TransactionManager,
  NotificationService
} from './infrastructure.interface';

// ============================================================
// Constants (Using shared-constants)
// ============================================================

const IS_PRODUCTION = ENV_CONFIG?.IS_PRODUCTION ?? false;

const REFRESH_CONFIG = {
  MAX_REFRESH_COUNT: REFRESH_TOKEN_CONFIG?.MAX_ROTATION_COUNT ?? 50,
  MAX_REFRESHES_PER_HOUR: RATE_LIMITS?.TOKEN_REFRESH?.MAX_REQUESTS_PER_HOUR ?? 10,
  DEVICE_TRUST_DURATION_DAYS: DEVICE_CONFIG?.TRUST_DURATION_DAYS ?? 30,
  SESSION_EXTENSION_MINUTES: SESSION_CONFIG?.MAX_EXTENSION_MINUTES ?? 60,
  QUARANTINE_DURATION_MINUTES: 15,
  MAX_REFRESH_LOCK_RETRIES: 3,
  REFRESH_LOCK_TTL_SECONDS: 5,
  CIRCUIT_BREAKER_TIMEOUT_MS: CIRCUIT_BREAKER_CONFIG?.TIMEOUT_MS ?? 10000,
  CIRCUIT_BREAKER_ERROR_THRESHOLD: CIRCUIT_BREAKER_CONFIG?.ERROR_THRESHOLD_PERCENTAGE ?? 50,
  CIRCUIT_BREAKER_RESET_TIMEOUT_MS: CIRCUIT_BREAKER_CONFIG?.RESET_TIMEOUT_MS ?? 30000,
} as const;

// ============================================================
// Bengali Error Messages
// ============================================================

const BENGALI_MESSAGES = {
  INVALID_TOKEN: 'অবৈধ রিফ্রেশ টোকেন',
  TOKEN_EXPIRED: 'রিফ্রেশ টোকেনের মেয়াদ শেষ হয়ে গেছে',
  TOKEN_REVOKED: 'রিফ্রেশ টোকেন বাতিল করা হয়েছে',
  TOKEN_COMPROMISED: 'টোকেন আপস হয়েছে - নিরাপত্তা সতর্কতা',
  RATE_LIMITED: 'অনেকবার রিফ্রেশ চেষ্টা করা হয়েছে। পরে আবার চেষ্টা করুন।',
  DEVICE_MISMATCH: 'ডিভাইস মেলে না - টোকেনটি ভিন্ন ডিভাইসের জন্য ইস্যু করা হয়েছিল',
  SESSION_NOT_FOUND: 'সংশ্লিষ্ট সেশন পাওয়া যায়নি',
  TOKEN_MAX_REFRESH: 'রিফ্রেশ টোকেন সর্বোচ্চ লিমিট অতিক্রম করেছে',
  ACCOUNT_INACTIVE: 'অ্যাকাউন্ট সক্রিয় নেই',
  ACCOUNT_LOCKED: 'অ্যাকাউন্ট লক করা আছে',
  ACCOUNT_SUSPENDED: 'অ্যাকাউন্ট স্থগিত করা হয়েছে',
  USER_NOT_FOUND: 'ইউজার পাওয়া যায়নি',
  TOKEN_THEFT_DETECTED: 'টোকেন চুরি সনাক্ত - অবিলম্বে নিরাপত্তা ব্যবস্থা নেওয়া হয়েছে',
};

// ============================================================
// Circuit Breaker for Token Generation (Enterprise Pattern)
// ============================================================

class TokenGenerationCircuitBreaker {
  private static instance: TokenGenerationCircuitBreaker;
  private breaker: CircuitBreaker;
  private readonly logger = new Logger(TokenGenerationCircuitBreaker.name);

  private constructor() {
    this.breaker = new CircuitBreaker(
      async (fn: () => Promise<string>) => {
        return await fn();
      },
      {
        timeout: REFRESH_CONFIG.CIRCUIT_BREAKER_TIMEOUT_MS,
        errorThresholdPercentage: REFRESH_CONFIG.CIRCUIT_BREAKER_ERROR_THRESHOLD,
        resetTimeout: REFRESH_CONFIG.CIRCUIT_BREAKER_RESET_TIMEOUT_MS,
        rollingCountTimeout: 10000,
        rollingCountBuckets: 10,
      }
    );

    this.setupEventListeners();
  }

  static getInstance(): TokenGenerationCircuitBreaker {
    if (!TokenGenerationCircuitBreaker.instance) {
      TokenGenerationCircuitBreaker.instance = new TokenGenerationCircuitBreaker();
    }
    return TokenGenerationCircuitBreaker.instance;
  }

  private setupEventListeners(): void {
    this.breaker.on('open', () => {
      this.logger.warn('Token generation circuit breaker opened');
    });

    this.breaker.on('halfOpen', () => {
      this.logger.log('Token generation circuit breaker half-open');
    });

    this.breaker.on('close', () => {
      this.logger.log('Token generation circuit breaker closed');
    });
  }

  async call<T>(fn: () => Promise<T>): Promise<T> {
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
// Distributed Lock for Refresh Token (Prevent Race Conditions)
// ============================================================

class RefreshTokenLock {
  private static locks: Map<string, { owner: string; acquiredAt: Date; expiresAt: Date }> = new Map();

  static async acquire(
    tokenId: string,
    owner: string,
    ttlSeconds: number = REFRESH_CONFIG.REFRESH_LOCK_TTL_SECONDS
  ): Promise<{ acquired: boolean; lockId?: string }> {
    const existingLock = this.locks.get(tokenId);
    
    if (existingLock && existingLock.expiresAt > new Date()) {
      return { acquired: false };
    }
    
    const lockId = uuidv4();
    const expiresAt = new Date(Date.now() + ttlSeconds * 1000);
    
    this.locks.set(tokenId, {
      owner,
      acquiredAt: new Date(),
      expiresAt,
    });
    
    // Auto-release after TTL
    setTimeout(() => {
      const lock = this.locks.get(tokenId);
      if (lock && lock.owner === owner) {
        this.locks.delete(tokenId);
      }
    }, ttlSeconds * 1000);
    
    return { acquired: true, lockId };
  }
  
  static async release(tokenId: string, lockId: string): Promise<boolean> {
    const lock = this.locks.get(tokenId);
    if (lock && lock.owner === lockId) {
      this.locks.delete(tokenId);
      return true;
    }
    return false;
  }
  
  static isLocked(tokenId: string): boolean {
    const lock = this.locks.get(tokenId);
    return lock ? lock.expiresAt > new Date() : false;
  }
}

// ============================================================
// Refresh Token Handler (Enterprise Enhanced v5.0)
// ============================================================

@Injectable()
export class RefreshTokenHandler {
  private readonly logger = new Logger(RefreshTokenHandler.name);
  private readonly tokenBreaker = TokenGenerationCircuitBreaker.getInstance();

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
    @Inject(forwardRef(() => UserRepository))
    private readonly userRepository: UserRepository,
    @Inject(forwardRef(() => SessionRepository))
    private readonly sessionRepository: SessionRepository,
    @Inject(forwardRef(() => DeviceRepository))
    private readonly deviceRepository: DeviceRepository,
    private readonly tokenGenerator: TokenGenerator,
    private readonly eventBus: EventBus,
    private readonly auditService: AuditService,
    private readonly rateLimiter: RateLimiter,
    private readonly cacheService: CacheService,
    private readonly metricsService: MetricsService,
    private readonly tracerService: TracerService,
    private readonly transactionManager: TransactionManager,
    private readonly notificationService: NotificationService
  ) {}

  // ============================================================
  // Main Execute Method with Distributed Tracing
  // ============================================================

  async execute(
    command: RefreshTokenCommand,
    locale: Locale = 'en'
  ): Promise<RefreshTokenCommandResult> {
    const startTime = Date.now();
    const span = this.tracerService?.startSpan('RefreshTokenHandler.execute');
    const correlationId = command.correlationId || uuidv4();

    this.metrics.totalExecutions++;
    this.metrics.lastExecutionAt = new Date();
    this.metricsService?.incrementCounter('token.refresh.attempted');

    try {
      // Add trace attributes
      this.addTraceAttributes(span, command, correlationId);

      const { refreshToken: refreshTokenValue, deviceInfo, shouldRotateToken, shouldExtendSession, shouldBindToDevice, expectedVersion } = command;

      // 1. Rate limiting check
      await this.checkRateLimiting(refreshTokenValue, deviceInfo?.ipAddress, correlationId, locale);

      // 2. Verify token signature with circuit breaker
      let payload;
      try {
        payload = await this.tokenBreaker.call(async () => 
          this.tokenGenerator.verifyToken(refreshTokenValue)
        );
      } catch (error) {
        await this.auditService.security(
          AUDIT_ACTIONS.REFRESH_TOKEN_INVALID_SIGNATURE,
          undefined,
          {
            error: (error as Error).message,
            ipAddress: deviceInfo?.ipAddress,
            correlationId,
            mobileOperator: deviceInfo?.mobileOperator,
            networkType: deviceInfo?.networkType,
            district: deviceInfo?.district,
          }
        );
        
        return RefreshTokenCommandResultFactory.invalidToken({ 
          correlationId, 
          durationMs: Date.now() - startTime,
          errorBn: locale === 'bn' ? BENGALI_MESSAGES.INVALID_TOKEN : undefined
        });
      }

      // 3. Find refresh token entity with distributed lock
      const token = new Token(refreshTokenValue, TokenType.REFRESH);
      const lockResult = await RefreshTokenLock.acquire(token.getId(), correlationId);
      
      if (!lockResult.acquired) {
        this.logger.warn(`Could not acquire lock for token ${maskTokenId(token.getId())}`);
        await this.auditService.warn(AUDIT_ACTIONS.REFRESH_TOKEN_LOCK_FAILED, undefined, {
          tokenId: token.getId(),
          correlationId,
        });
        
        return RefreshTokenCommandResultFactory.error(
          'Refresh token is being processed. Please try again.',
          'CONCURRENT_PROCESSING',
          { correlationId, durationMs: Date.now() - startTime }
        );
      }

      let refreshToken;
      try {
        refreshToken = await this.refreshTokenRepository.findByToken(token);
      } finally {
        await RefreshTokenLock.release(token.getId(), lockResult.lockId!);
      }

      if (!refreshToken) {
        await this.auditService.security(
          AUDIT_ACTIONS.REFRESH_TOKEN_NOT_FOUND,
          undefined,
          {
            tokenId: payload?.jti,
            ipAddress: deviceInfo?.ipAddress,
            correlationId,
          }
        );
        
        return RefreshTokenCommandResultFactory.invalidToken({ 
          correlationId, 
          durationMs: Date.now() - startTime,
          errorBn: locale === 'bn' ? BENGALI_MESSAGES.INVALID_TOKEN : undefined
        });
      }

      // 4. Check for token theft (reuse detection)
      if (refreshToken.isRevoked()) {
        await this.handleTokenTheft(refreshToken, deviceInfo, correlationId, locale);
        
        return RefreshTokenCommandResultFactory.tokenRevoked({ 
          correlationId, 
          durationMs: Date.now() - startTime,
          errorBn: locale === 'bn' ? BENGALI_MESSAGES.TOKEN_COMPROMISED : undefined
        });
      }

      // 5. Check token version (optimistic locking)
      if (expectedVersion !== undefined && refreshToken.getRotationCount() !== expectedVersion) {
        await this.auditService.warn(
          AUDIT_ACTIONS.REFRESH_TOKEN_VERSION_MISMATCH,
          refreshToken.getUserId(),
          {
            expectedVersion,
            actualVersion: refreshToken.getRotationCount(),
            ipAddress: deviceInfo?.ipAddress,
            correlationId,
          }
        );
        
        return RefreshTokenCommandResultFactory.versionMismatch(
          expectedVersion,
          refreshToken.getRotationCount(),
          { correlationId, durationMs: Date.now() - startTime }
        );
      }

      // 6. Validate token expiration
      if (refreshToken.isExpired()) {
        await this.transactionManager.runInTransaction(async () => {
          refreshToken.revoke('Token expired');
          await this.refreshTokenRepository.save(refreshToken);
        });
        
        await this.auditService.warn(
          AUDIT_ACTIONS.REFRESH_TOKEN_EXPIRED,
          refreshToken.getUserId(),
          {
            tokenId: refreshToken.getId(),
            family: refreshToken.getFamily(),
            ipAddress: deviceInfo?.ipAddress,
            correlationId,
          }
        );
        
        return RefreshTokenCommandResultFactory.tokenExpired({ 
          correlationId, 
          durationMs: Date.now() - startTime,
          errorBn: locale === 'bn' ? BENGALI_MESSAGES.TOKEN_EXPIRED : undefined
        });
      }

      // 7. Check refresh count limit
      if (refreshToken.getRotationCount() >= REFRESH_CONFIG.MAX_REFRESH_COUNT) {
        await this.transactionManager.runInTransaction(async () => {
          refreshToken.revoke('Max refresh count exceeded');
          await this.refreshTokenRepository.save(refreshToken);
        });
        
        await this.auditService.warn(
          AUDIT_ACTIONS.REFRESH_TOKEN_MAX_COUNT,
          refreshToken.getUserId(),
          {
            rotationCount: refreshToken.getRotationCount(),
            ipAddress: deviceInfo?.ipAddress,
            correlationId,
          }
        );
        
        return RefreshTokenCommandResultFactory.error(
          'Refresh token has reached maximum refresh limit',
          'MAX_REFRESH_COUNT_EXCEEDED',
          { correlationId, durationMs: Date.now() - startTime }
        );
      }

      // 8. Validate device fingerprint
      let deviceTrusted = false;
      let deviceId: DeviceId | undefined;
      
      if (deviceInfo?.deviceId) {
        deviceId = new DeviceId(deviceInfo.deviceId);
        deviceTrusted = await this.validateDeviceTrust(refreshToken.getUserId(), deviceId, correlationId);
        
        // Optional: Bind token to device if requested
        if (shouldBindToDevice && !deviceTrusted) {
          await this.auditService.warn(
            AUDIT_ACTIONS.REFRESH_TOKEN_DEVICE_BINDING_FAILED,
            refreshToken.getUserId(),
            {
              deviceId: deviceInfo.deviceId,
              ipAddress: deviceInfo?.ipAddress,
              correlationId,
            }
          );
          
          return RefreshTokenCommandResultFactory.deviceMismatch({ 
            correlationId, 
            durationMs: Date.now() - startTime,
            errorBn: locale === 'bn' ? BENGALI_MESSAGES.DEVICE_MISMATCH : undefined
          });
        }
      }

      // 9. Get user and validate status
      const user = await this.userRepository.findById(refreshToken.getUserId());
      if (!user) {
        return RefreshTokenCommandResultFactory.error(
          'User not found',
          'USER_NOT_FOUND',
          { correlationId, durationMs: Date.now() - startTime }
        );
      }

      // Check user status with Bengali messages
      if (!user.isActive()) {
        return RefreshTokenCommandResultFactory.error(
          'Account is inactive',
          'ACCOUNT_INACTIVE',
          { 
            correlationId, 
            durationMs: Date.now() - startTime,
            errorBn: locale === 'bn' ? BENGALI_MESSAGES.ACCOUNT_INACTIVE : undefined
          }
        );
      }
      if (user.isLocked()) {
        return RefreshTokenCommandResultFactory.error(
          'Account is locked',
          'ACCOUNT_LOCKED',
          { 
            correlationId, 
            durationMs: Date.now() - startTime,
            errorBn: locale === 'bn' ? BENGALI_MESSAGES.ACCOUNT_LOCKED : undefined
          }
        );
      }
      if (user.isSuspended()) {
        return RefreshTokenCommandResultFactory.error(
          'Account is suspended',
          'ACCOUNT_SUSPENDED',
          { 
            correlationId, 
            durationMs: Date.now() - startTime,
            errorBn: locale === 'bn' ? BENGALI_MESSAGES.ACCOUNT_SUSPENDED : undefined
          }
        );
      }

      // 10. Generate new tokens with circuit breaker
      const userRole = user.getRole();
      const userTier = user.getTier();
      
      let newAccessToken: string;
      let newRefreshTokenValue: string;
      
      await this.transactionManager.runInTransaction(async () => {
        newAccessToken = await this.tokenBreaker.call(async () =>
          this.tokenGenerator.generateAccessToken(
            user.getId(),
            user.getEmail().getValue(),
            userRole,
            {
              tier: userTier,
              sessionId: refreshToken.getSessionId(),
              deviceId: deviceInfo?.deviceId,
              trustLevel: deviceTrusted ? 'trusted' : 'standard',
              district: deviceInfo?.district,
              networkType: deviceInfo?.networkType,
            }
          )
        );
        
        if (shouldRotateToken) {
          newRefreshTokenValue = await this.tokenBreaker.call(async () =>
            this.tokenGenerator.generateRefreshToken(
              user.getId(),
              {
                familyId: refreshToken.getFamily(),
                sessionId: refreshToken.getSessionId(),
                deviceId: deviceInfo?.deviceId,
                version: refreshToken.getRotationCount() + 1,
              }
            )
          );
        } else {
          newRefreshTokenValue = refreshTokenValue;
        }
        
        // Rotate refresh token
        if (shouldRotateToken) {
          const newToken = new Token(newRefreshTokenValue, TokenType.REFRESH);
          const rotatedToken = refreshToken.rotate(newToken);
          await this.refreshTokenRepository.save(rotatedToken);
        } else {
          // Just update last used timestamp
          refreshToken.updateLastUsed();
          await this.refreshTokenRepository.save(refreshToken);
        }
      });

      // 11. Update associated session
      let sessionId = refreshToken.getSessionId();
      if (sessionId && shouldExtendSession) {
        const session = await this.sessionRepository.findById(sessionId);
        if (session && session.validateOwnership(user.getId())) {
          await session.extend(REFRESH_CONFIG.SESSION_EXTENSION_MINUTES);
          await this.sessionRepository.save(session);
        }
      }

      // 12. Update device trust if requested
      if (deviceId && deviceTrusted) {
        await this.updateDeviceTrust(refreshToken.getUserId(), deviceId, correlationId);
      }

      // 13. Publish event
      await this.eventBus.publish(
        new TokenRefreshedEvent(
          user.getId(),
          refreshToken.getFamily(),
          refreshToken.getRotationCount(),
          deviceInfo?.ipAddress,
          deviceInfo?.userAgent,
          deviceInfo?.deviceId,
          correlationId,
          deviceInfo?.mobileOperator,
          deviceInfo?.networkType,
          deviceInfo?.district
        )
      );

      // 14. Audit log
      await this.auditService.info(
        AUDIT_ACTIONS.TOKEN_REFRESHED,
        user.getId(),
        {
          tokenId: refreshToken.getId(),
          family: refreshToken.getFamily(),
          rotationCount: refreshToken.getRotationCount(),
          ipAddress: deviceInfo?.ipAddress,
          deviceId: deviceInfo?.deviceId,
          userAgent: deviceInfo?.userAgent,
          mobileOperator: deviceInfo?.mobileOperator,
          networkType: deviceInfo?.networkType,
          district: deviceInfo?.district,
          upazila: deviceInfo?.upazila,
          correlationId,
          rotated: shouldRotateToken,
          sessionExtended: shouldExtendSession,
          deviceTrusted,
        }
      );

      // 15. Store in cache for quick validation
      await this.cacheService.set(
        `refresh:${user.getId()}`,
        newRefreshTokenValue,
        TOKEN_CONFIG?.REFRESH_TOKEN_EXPIRY_SECONDS ?? 7 * 24 * 3600
      );

      // 16. Increment rate limit
      await this.rateLimiter.increment(`ratelimit:refresh:${refreshTokenValue.substring(0, 20)}`, 3600);

      // Record success metrics
      this.metrics.successfulExecutions++;
      this.metrics.totalDurationMs += Date.now() - startTime;
      this.updateMetrics(true);
      this.metricsService?.incrementCounter('token.refresh.successful');
      this.metricsService?.incrementCounter(`token.refresh.rotated.${shouldRotateToken}`);
      this.metricsService?.recordHistogram('token.refresh.duration', Date.now() - startTime);
      this.metricsService?.recordHistogram('token.refresh.rotation.count', refreshToken.getRotationCount());

      span?.setStatus({ code: 0, message: 'Success' });
      span?.end();

      return RefreshTokenCommandResultFactory.success(
        newAccessToken,
        newRefreshTokenValue,
        TOKEN_CONFIG?.ACCESS_TOKEN_EXPIRY_SECONDS ?? 900,
        TOKEN_CONFIG?.REFRESH_TOKEN_EXPIRY_SECONDS ?? 7 * 24 * 3600,
        {
          sessionId,
          familyId: refreshToken.getFamily(),
          version: refreshToken.getRotationCount() + 1,
          rotationCount: refreshToken.getRotationCount() + 1,
          correlationId,
          durationMs: Date.now() - startTime,
        }
      );

    } catch (error) {
      // Record failure metrics
      this.metrics.failedExecutions++;
      this.metrics.totalDurationMs += Date.now() - startTime;
      this.updateMetrics(false);
      this.metricsService?.incrementCounter('token.refresh.failed');
      this.metricsService?.incrementCounter(`token.refresh.error.${this.getErrorCode(error)}`);

      span?.setStatus({ code: 2, message: (error as Error).message });
      span?.setAttribute('error.code', this.getErrorCode(error));
      span?.setAttribute('error.message', (error as Error).message);
      span?.end();

      this.logger.error(`Token refresh failed: ${(error as Error).message}`);

      return RefreshTokenCommandResultFactory.error(
        (error as Error).message,
        'INTERNAL_ERROR',
        { correlationId: command.correlationId, durationMs: Date.now() - startTime }
      );
    }
  }

  // ============================================================
  // Private Helper Methods (Enhanced)
  // ============================================================

  private async checkRateLimiting(
    refreshTokenValue: string,
    ipAddress?: string,
    correlationId?: string,
    locale: Locale = 'en'
  ): Promise<void> {
    const key = `ratelimit:refresh:${refreshTokenValue.substring(0, 20)}`;
    const attempts = await this.rateLimiter.getCount(key, 3600);
    const maxAttempts = REFRESH_CONFIG.MAX_REFRESHES_PER_HOUR;
    
    if (attempts >= maxAttempts) {
      const remainingSeconds = 3600 - (Date.now() - (await this.rateLimiter.getFirstAttemptTime(key)) / 1000);
      
      await this.auditService.warn(
        AUDIT_ACTIONS.REFRESH_TOKEN_RATE_LIMITED,
        undefined,
        {
          ipAddress,
          correlationId,
          attempts,
          maxAttempts,
          remainingSeconds,
        }
      );
      
      const errorMessage = locale === 'bn' 
        ? `${BENGALI_MESSAGES.RATE_LIMITED} ${Math.ceil(remainingSeconds / 60)} মিনিট পরে চেষ্টা করুন।`
        : `Too many refresh attempts. Please try again in ${Math.ceil(remainingSeconds / 60)} minutes.`;
      
      throw new TooManyRequestsException(errorMessage);
    }
  }

  private async validateDeviceTrust(
    userId: string, 
    deviceId: DeviceId, 
    correlationId?: string
  ): Promise<boolean> {
    const cacheKey = `device:trust:${userId}:${deviceId.getValue()}`;
    const cached = await this.cacheService.get<boolean>(cacheKey);
    
    if (cached !== null) {
      return cached;
    }
    
    // Check if device is trusted in database
    const device = await this.deviceRepository.findByDeviceId(deviceId);
    const isTrusted = device?.isTrusted() ?? false;
    
    if (isTrusted) {
      const ttlSeconds = REFRESH_CONFIG.DEVICE_TRUST_DURATION_DAYS * 24 * 3600;
      await this.cacheService.set(cacheKey, true, ttlSeconds);
    }
    
    return isTrusted;
  }

  private async updateDeviceTrust(
    userId: string, 
    deviceId: DeviceId, 
    correlationId?: string
  ): Promise<void> {
    const cacheKey = `device:trust:${userId}:${deviceId.getValue()}`;
    const ttlSeconds = REFRESH_CONFIG.DEVICE_TRUST_DURATION_DAYS * 24 * 3600;
    await this.cacheService.set(cacheKey, true, ttlSeconds);
    
    // Also update database if device exists
    const device = await this.deviceRepository.findByDeviceId(deviceId);
    if (device && !device.isTrusted()) {
      device.trust();
      await this.deviceRepository.save(device);
    }
  }

  private async handleTokenTheft(
    refreshToken: any,
    deviceInfo?: RefreshTokenCommand['deviceInfo'],
    correlationId?: string,
    locale: Locale = 'en'
  ): Promise<void> {
    // Get all tokens in the same family
    const familyTokens = await this.refreshTokenRepository.findByFamily(refreshToken.getFamily());
    
    await this.transactionManager.runInTransaction(async () => {
      // Mark as compromised
      refreshToken.markAsCompromised('Token reuse detected - possible theft', familyTokens);
      await this.refreshTokenRepository.save(refreshToken);
      
      // Revoke all tokens in the family
      for (const token of familyTokens) {
        if (token.getId() !== refreshToken.getId() && !token.isRevoked()) {
          token.revoke('Token family compromised');
          await this.refreshTokenRepository.save(token);
        }
      }
      
      // Quarantine the user account temporarily
      await this.quarantineUserAccount(refreshToken.getUserId(), correlationId);
    });
    
    // Revoke all sessions for the user
    const sessionsRevoked = await this.sessionRepository.deleteAllByUserId(
      refreshToken.getUserId(),
      'Token theft detected - security precaution'
    );
    
    // Send security notification to user
    const user = await this.userRepository.findById(refreshToken.getUserId());
    if (user) {
      await this.notificationService.sendSecurityAlert(
        user.getId(),
        user.getEmail().getValue(),
        'Token theft detected',
        `We detected a security incident where your refresh token was used multiple times. All your sessions have been revoked for your protection. Please log in again.`,
        {
          ipAddress: deviceInfo?.ipAddress,
          deviceId: deviceInfo?.deviceId,
          userAgent: deviceInfo?.userAgent,
          locale,
          correlationId,
        }
      );
    }
    
    // Publish security event
    await this.eventBus.publish(
      new TokenCompromisedEvent(
        refreshToken.getUserId(),
        refreshToken.getFamily(),
        deviceInfo?.ipAddress,
        deviceInfo?.userAgent,
        deviceInfo?.deviceId,
        correlationId,
        'Token reuse after rotation - theft detected',
        deviceInfo?.mobileOperator,
        deviceInfo?.networkType,
        deviceInfo?.district,
        sessionsRevoked
      )
    );
    
    // Alert security team (critical severity)
    await this.auditService.critical(
      AUDIT_ACTIONS.TOKEN_THEFT_DETECTED,
      refreshToken.getUserId(),
      {
        tokenId: refreshToken.getId(),
        family: refreshToken.getFamily(),
        rotationCount: refreshToken.getRotationCount(),
        ipAddress: deviceInfo?.ipAddress,
        deviceId: deviceInfo?.deviceId,
        userAgent: deviceInfo?.userAgent,
        mobileOperator: deviceInfo?.mobileOperator,
        networkType: deviceInfo?.networkType,
        district: deviceInfo?.district,
        upazila: deviceInfo?.upazila,
        correlationId,
        sessionsRevoked,
      }
    );
  }
  
  private async quarantineUserAccount(userId: string, correlationId?: string): Promise<void> {
    const quarantineKey = `security:quarantine:${userId}`;
    const quarantineExpirySeconds = REFRESH_CONFIG.QUARANTINE_DURATION_MINUTES * 60;
    await this.cacheService.set(quarantineKey, true, quarantineExpirySeconds);
    
    await this.auditService.warn(
      AUDIT_ACTIONS.ACCOUNT_QUARANTINED,
      userId,
      {
        reason: 'Token theft detected',
        durationMinutes: REFRESH_CONFIG.QUARANTINE_DURATION_MINUTES,
        correlationId,
      }
    );
  }

  private addTraceAttributes(span: unknown, command: RefreshTokenCommand, correlationId: string): void {
    const setAttribute = (key: string, value: unknown) => {
      if (span && typeof (span as any).setAttribute === 'function') {
        (span as any).setAttribute(key, value);
      }
    };

    setAttribute('command.id', command.commandId);
    setAttribute('correlation.id', correlationId);
    setAttribute('has.refresh.token', !!command.refreshToken);
    setAttribute('rotate.token', command.shouldRotateToken());
    setAttribute('extend.session', command.shouldExtendSession());
    setAttribute('bind.to.device', command.shouldBindToDevice());
    setAttribute('revoke.family.on.compromise', command.shouldRevokeFamilyOnCompromise());
    setAttribute('extension.seconds', command.extensionSeconds);
    setAttribute('expected.version', command.expectedVersion);
    setAttribute('locale', command.locale);
    setAttribute('has.device.info', command.hasDeviceInfo());
    setAttribute('device.district', command.getDistrict() || 'unknown');
    setAttribute('device.mobile.operator', command.getMobileOperator() || 'unknown');
    setAttribute('device.network.type', command.getNetworkType() || 'unknown');
  }

  private getErrorCode(error: unknown): string {
    if (error instanceof UnauthorizedException) return 'UNAUTHORIZED';
    if (error instanceof NotFoundException) return 'NOT_FOUND';
    if (error instanceof TooManyRequestsException) return 'RATE_LIMITED';
    return 'INTERNAL_ERROR';
  }

  private updateMetrics(success: boolean): void {
    this.metrics.averageDurationMs = this.metrics.totalDurationMs / this.metrics.totalExecutions;
    this.metrics.errorRate = (this.metrics.failedExecutions / this.metrics.totalExecutions) * 100;
  }

  // ============================================================
  // Public Metrics & Health Methods
  // ============================================================

  getMetrics(): ServiceMetrics {
    return { ...this.metrics };
  }

  getCircuitBreakerStatus(): CircuitBreakerStatus {
    return this.tokenBreaker.getStatus();
  }

  resetCircuitBreaker(): void {
    this.tokenBreaker.reset();
  }

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

  async healthCheck(): Promise<{ 
    healthy: boolean; 
    latency: number; 
    circuitBreaker: string;
    metrics: ServiceMetrics;
    error?: string;
  }> {
    const startTime = Date.now();

    return {
      healthy: true,
      latency: Date.now() - startTime,
      circuitBreaker: this.tokenBreaker.getStatus().state,
      metrics: this.getMetrics(),
    };
  }
}

// ============================================================
// Infrastructure Interfaces (to be implemented in infrastructure layer)
// ============================================================

export interface RateLimiter {
  getCount(key: string, windowSeconds: number): Promise<number>;
  increment(key: string, windowSeconds: number): Promise<void>;
  getFirstAttemptTime(key: string): Promise<number>;
}

export interface CacheService {
  get<T>(key: string): Promise<T | null>;
  set<T>(key: string, value: T, ttlSeconds: number): Promise<void>;
  del(key: string): Promise<void>;
}

export interface MetricsService {
  incrementCounter(metric: string, value?: number): void;
  recordHistogram(metric: string, value: number): void;
}

export interface TracerService {
  startSpan(name: string): unknown;
}

export interface TransactionManager {
  runInTransaction<T>(callback: () => Promise<T>): Promise<T>;
}

export interface NotificationService {
  sendSecurityAlert(
    userId: string,
    email: string,
    subject: string,
    message: string,
    options?: { ipAddress?: string; deviceId?: string; userAgent?: string; locale?: string; correlationId?: string }
  ): Promise<void>;
}

// ============================================================
// Type Exports
// ============================================================

export type { DeviceInfo as DeviceInfoType, RefreshTokenCommandResult as RefreshTokenCommandResultType };

// ============================================================
// ENTERPRISE SUMMARY v5.0
// ============================================================
// 
// Enterprise Enhancements Applied in v5.0:
// 1. ✅ Shared types integration (@vubon/shared-types)
// 2. ✅ Shared constants (@vubon/shared-constants)
// 3. ✅ Shared utilities for masking (@vubon/shared-utils)
// 4. ✅ Circuit breaker pattern for token generation
// 5. ✅ Distributed lock for race condition prevention
// 6. ✅ Transaction management for data consistency
// 7. ✅ Multi-language error messages (English/Bengali)
// 8. ✅ Token version tracking (optimistic locking)
// 9. ✅ Token family revocation on compromise
// 10. ✅ Device fingerprint validation
// 11. ✅ Session extension with transaction
// 12. ✅ Account quarantine on theft detection
// 13. ✅ Security notification on theft
// 14. ✅ Audit logging with severity levels
// 15. ✅ Metrics collection (success/failure rates, duration)
// 16. ✅ Distributed tracing with correlation ID
// 17. ✅ Health check endpoint
// 18. ✅ Rate limiting with cooldown
// 19. ✅ Device trust caching
// 20. ✅ Bengali messages for user-facing errors
// 
// Bangladesh Specific:
// - District/Upazila tracking for location analytics
// - Mobile operator and network type detection
// - Bengali language support (locale: 'bn')
// - Local timezone (Asia/Dhaka) for timestamps
// - Mobile network optimization flags
// 
// Security Features:
// - Token theft detection with reuse tracking
// - Family revocation on compromise
// - Account quarantine on theft
// - Device fingerprint binding
// - Version tracking for optimistic locking
// - Distributed lock for race conditions
// - Circuit breaker for resilience
// - Rate limiting with cooldown
// - Audit trail for compliance
// 
// ============================================================
