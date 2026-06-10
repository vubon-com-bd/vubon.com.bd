/**
 * Verify MFA Command Handler - Application Layer (Enterprise Enhanced v3.0)
 * 
 * @module application/commands/mfa/verify-mfa.handler
 * 
 * @description
 * Handles MFA verification use case for both:
 * - Setup verification (enabling MFA)
 * - Login verification (authenticating)
 * 
 * ENTERPRISE FEATURES:
 * ✅ Dual use case support (setup + login)
 * ✅ Rate limiting with Redis-based tracking
 * ✅ Progressive lockout after max attempts
 * ✅ Backup code verification with bcrypt
 * ✅ Device trust management with database persistence
 * ✅ Transaction management for data consistency
 * ✅ Distributed tracing with correlation ID
 * ✅ Bengali error messages for better UX
 * ✅ Circuit breaker pattern for external services
 * ✅ Retry mechanism with exponential backoff
 * ✅ Complete audit logging with severity levels
 * ✅ Event publishing with correlation tracking
 * ✅ Cache invalidation after successful verification
 * ✅ Shared-constants integration (Single Source of Truth)
 * ✅ Shared-types integration for type safety
 * ✅ Bangladesh specific - WhatsApp/Imo/Voice/MFS PIN support
 * ✅ Comprehensive error handling with specific error codes
 */

import { 
  Injectable, 
  BadRequestException, 
  UnauthorizedException, 
  NotFoundException,
  TooManyRequestsException,
  Logger 
} from '@nestjs/common';
import { randomUUID } from 'crypto';

import { VerifyMfaCommand, isVerifyMfaCommand } from './verify-mfa.command';
import { MFARepository } from '../../../domain/repositories/mfa.repository.interface';
import { MFASessionRepository } from '../../../domain/repositories/mfa-session.repository.interface';
import { UserRepository } from '../../../domain/repositories/user.repository.interface';
import { SessionRepository } from '../../../domain/repositories/session.repository.interface';
import { DeviceRepository } from '../../../domain/repositories/device.repository.interface';
import { AuditRepository } from '../../../domain/repositories/audit.repository.interface';
import { RefreshTokenRepository } from '../../../domain/repositories/refresh-token.repository.interface';
import { MFA, MFAType, MFAStatus } from '../../../domain/entities/mfa.entity';
import { MFASession, MFASessionStatus } from '../../../domain/entities/mfa-session.entity';
import { User } from '../../../domain/entities/user.entity';
import { DeviceId } from '../../../domain/value-objects/device-id.vo';

// Import events
import { MfaEnabledEvent } from '../../events/mfa-enabled.event';
import { MfaVerificationFailedEvent } from '../../events/mfa-verification-failed.event';
import { MfaBackupCodeUsedEvent } from '../../events/mfa-backup-code-used.event';
import { UserLoggedInEvent } from '../../events/user-logged-in.event';

// Import shared packages
import { 
  MFA_CONFIG, 
  MFA_LOCKOUT_CONFIG,
  MFA_RATE_LIMIT_CONFIG,
  AUDIT_SEVERITIES,
  TOKEN_EXPIRY
} from '@vubon/shared-constants';
import type { MFAType as SharedMFAType, LoginMethod, LoginType } from '@vubon/shared-types';
import { maskPhone } from '@vubon/shared-utils';

// Import infrastructure interfaces
import { 
  MfaGenerator, 
  EventBus, 
  AuditService, 
  TransactionManager, 
  CacheService, 
  TokenGenerator, 
  PasswordHasher,
  MfaVerificationService
} from './infrastructure.interface';
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
      nextAttemptAt: this.state.nextAttemptTime ? new Date(this.state.nextAttemptTime) : undefined
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
// Verify MFA Response DTO (Enhanced)
// ============================================================

export interface VerifyMfaResponseDto {
  success: boolean;
  message?: string;
  messageBn?: string;
  requiresMfa?: boolean;
  remainingAttempts?: number;
  isLocked?: boolean;
  remainingLockTimeMinutes?: number;
  mfaSessionId?: string;
  accessToken?: string;
  refreshToken?: string;
  refreshExpiresIn?: number;
  expiresIn?: number;
  user?: {
    id: string;
    email: string;
    fullName: string;
    role: string;
    tier?: string;
    avatar?: string;
  };
  sessionId?: string;
  correlationId?: string;
  deviceTrusted?: boolean;
}

// ============================================================
// Verify MFA Handler (Enterprise Enhanced)
// ============================================================

@Injectable()
export class VerifyMfaHandler {
  private readonly logger = new Logger(VerifyMfaHandler.name);
  private readonly verificationCircuitBreaker = CircuitBreaker.getInstance('verification');

  constructor(
    private readonly mfaRepository: MFARepository,
    private readonly mfaSessionRepository: MFASessionRepository,
    private readonly userRepository: UserRepository,
    private readonly sessionRepository: SessionRepository,
    private readonly deviceRepository: DeviceRepository,
    private readonly refreshTokenRepository: RefreshTokenRepository,
    private readonly auditRepository: AuditRepository,
    private readonly mfaGenerator: MfaGenerator,
    private readonly eventBus: EventBus,
    private readonly auditService: AuditService,
    private readonly transactionManager: TransactionManager,
    private readonly cacheService: CacheService,
    private readonly tokenGenerator: TokenGenerator,
    private readonly passwordHasher: PasswordHasher,
    private readonly mfaVerificationService: MfaVerificationService
  ) {}

  /**
   * Execute the Verify MFA command
   * 
   * @param command - Verify MFA command with verification data
   * @returns Response with tokens for login flow or success for setup flow
   */
  async execute(command: VerifyMfaCommand): Promise<VerifyMfaResponseDto> {
    const startTime = Date.now();
    const { mfaSessionId, deviceInfo, correlationId, trustDevice } = command;

    this.logger.log(`Executing VerifyMfaCommand for session ${mfaSessionId}, type: ${command.getVerificationType()}, correlationId: ${correlationId}`);

    try {
      // 1. Validate command
      if (!command.isValid()) {
        throw new BadRequestException(
          command.getValidationError(),
          'ভুল ভেরিফিকেশন ডাটা'
        );
      }

      // 2. Get MFA session from repository (with cache fallback)
      let mfaSession = await this.mfaSessionRepository.findById(mfaSessionId);
      
      if (!mfaSession) {
        // Try cache fallback
        mfaSession = await this.cacheService.get<MFASession>(CacheKeyBuilder.mfaLoginSession(mfaSessionId));
      }
      
      if (!mfaSession || mfaSession.isExpired()) {
        throw new UnauthorizedException(
          'Invalid or expired MFA session',
          'অবৈধ বা মেয়াদোত্তীর্ণ MFA সেশন'
        );
      }

      const userId = mfaSession.getUserId();
      const isSetupFlow = mfaSession.getStatus() === MFASessionStatus.SETUP;

      // 3. Check rate limit for verification attempts
      await this.checkRateLimit(userId);

      // 4. Find MFA configuration (supports multiple methods)
      const mfaMethods = await this.mfaRepository.findAllByUserId(userId);
      const enabledMethods = mfaMethods.filter(m => m.isEnabled());
      
      if (enabledMethods.length === 0 && !isSetupFlow) {
        throw new BadRequestException(
          'MFA is not set up for this user',
          'এই ব্যবহারকারীর জন্য MFA সক্রিয় নেই'
        );
      }

      // For verification, use primary method or the one specified
      let targetMethod: MFA | undefined;
      if (command.getVerificationType() === 'CODE') {
        targetMethod = enabledMethods.find(m => m.isPrimary()) || enabledMethods[0];
      } else if (command.getVerificationType() === 'BACKUP_CODE') {
        // Backup codes are shared across all methods
        targetMethod = enabledMethods[0];
      } else if (command.isMFSPinVerification()) {
        const provider = command.getMFSProvider();
        targetMethod = enabledMethods.find(m => {
          if (provider === 'bkash') return m.getType() === MFAType.BKASH_PIN;
          if (provider === 'nagad') return m.getType() === MFAType.NAGAD_PIN;
          if (provider === 'rocket') return m.getType() === MFAType.ROCKET_PIN;
          return false;
        });
      } else if (command.isWhatsAppVerification()) {
        targetMethod = enabledMethods.find(m => m.getType() === MFAType.WHATSAPP);
      } else if (command.isImoVerification()) {
        targetMethod = enabledMethods.find(m => m.getType() === MFAType.IMO);
      } else if (command.isVoiceVerification()) {
        targetMethod = enabledMethods.find(m => m.getType() === MFAType.VOICE_CALL);
      }

      if (!targetMethod && !isSetupFlow) {
        throw new BadRequestException(
          'No suitable MFA method found',
          'কোন উপযুক্ত MFA পদ্ধতি পাওয়া যায়নি'
        );
      }

      // 5. Check if MFA is locked
      if (targetMethod && targetMethod.isLocked()) {
        const remainingMinutes = targetMethod.getRemainingLockTimeMinutes();
        throw new UnauthorizedException(
          `MFA is locked. Please try again in ${remainingMinutes} minutes.`,
          `MFA লক করা হয়েছে। অনুগ্রহ করে ${remainingMinutes} মিনিট পরে আবার চেষ্টা করুন।`
        );
      }

      // 6. Verify the code with circuit breaker
      let verified = false;
      let verificationMethod: string = 'unknown';

      await this.verificationCircuitBreaker.call(async () => {
        if (command.isBackupCodeVerification()) {
          verificationMethod = 'backup_code';
          verified = await this.verifyBackupCode(
            targetMethod || enabledMethods[0]!,
            command.getBackupCode()!,
            userId,
            command,
            isSetupFlow
          );
        } else if (command.isCodeVerification()) {
          verificationMethod = 'code';
          verified = await this.verifyCode(
            targetMethod!,
            command.getCode()!,
            userId,
            command,
            isSetupFlow
          );
        } else if (command.isMFSPinVerification()) {
          verificationMethod = 'mfs_pin';
          verified = await this.verifyMFSPin(
            targetMethod!,
            command.getMFSPin()!,
            userId,
            command
          );
        } else if (command.isPhoneBasedVerification()) {
          verificationMethod = command.getVerificationType().toLowerCase();
          verified = await this.verifyPhoneOtp(
            userId,
            command.getPhoneOtpCode()!,
            command.getPhoneNumber(),
            command.getVerificationType(),
            command
          );
        }
      });

      // 7. Handle failed verification
      if (!verified) {
        const remainingAttempts = targetMethod ? targetMethod.getRemainingAttempts() : 
                                  MFA_CONFIG.MAX_VERIFICATION_ATTEMPTS - 1;
        const isLocked = targetMethod ? targetMethod.isLocked() : false;
        
        // Track failed attempt in cache for rate limiting
        await this.trackFailedAttempt(userId, verificationMethod, deviceInfo, correlationId);
        
        // Record failure in domain entity
        if (targetMethod) {
          targetMethod.recordVerificationFailure();
          await this.mfaRepository.save(targetMethod);
        }

        await this.auditService.log({
          action: 'MFA_VERIFICATION_FAILED',
          userId,
          verificationMethod,
          remainingAttempts,
          isLocked,
          ipAddress: command.getIpAddress(),
          deviceId: command.getDeviceId(),
          deviceFingerprint: command.getDeviceFingerprint(),
          district: command.getDistrict(),
          networkType: command.getNetworkType(),
          correlationId,
          timestamp: new Date().toISOString(),
          severity: AUDIT_SEVERITIES.WARNING
        });

        await this.eventBus.publish(
          new MfaVerificationFailedEvent(
            userId,
            command.getIpAddress(),
            remainingAttempts,
            correlationId,
            verificationMethod,
            deviceInfo?.deviceId
          )
        );

        const remainingLockTimeMinutes = targetMethod ? targetMethod.getRemainingLockTimeMinutes() : 0;

        return {
          success: false,
          message: 'Invalid verification code',
          messageBn: 'ভুল ভেরিফিকেশন কোড',
          remainingAttempts,
          isLocked,
          remainingLockTimeMinutes: isLocked ? remainingLockTimeMinutes : undefined,
          correlationId
        };
      }

      // 8. Handle successful verification
      let sessionsRevoked = 0;
      let deviceTrusted = false;

      await this.transactionManager.runInTransaction(async () => {
        // Record successful verification
        if (targetMethod) {
          targetMethod.recordSuccessfulVerification();
          await this.mfaRepository.save(targetMethod);
        }

        if (isSetupFlow) {
          // Complete MFA setup
          if (targetMethod) {
            targetMethod.markAsVerified();
            await this.mfaRepository.save(targetMethod);
          }

          const user = await this.userRepository.findById(userId);
          if (user && !user.isMfaEnabled()) {
            user.enableMFA();
            await this.userRepository.save(user);
          }

          await this.eventBus.publish(
            new MfaEnabledEvent(
              userId,
              targetMethod?.getType() || 'UNKNOWN',
              this.getMFAMethodForType(targetMethod?.getType()),
              correlationId,
              command.getIpAddress(),
              command.getDeviceId(),
              command.getUserAgent(),
              command.getDeviceFingerprint()
            )
          );
        } else {
          // For login flow, create session and generate tokens
          const user = await this.userRepository.findById(userId);
          if (!user) {
            throw new NotFoundException('User not found', 'ইউজার পাওয়া যায়নি');
          }

          // Trust device if requested
          if (trustDevice && command.getDeviceId()) {
            deviceTrusted = await this.trustDevice(userId, command.getDeviceId()!, command);
          }

          // Clear failed attempts cache on success
          await this.clearFailedAttempts(userId);
        }

        // Update MFA session status
        mfaSession.complete();
        await this.mfaSessionRepository.save(mfaSession);
      });

      // 9. Clear rate limit on success
      await this.clearRateLimit(userId);

      // 10. Invalidate cache
      await this.invalidateUserCache(userId);
      await this.cacheService.del(CacheKeyBuilder.mfaLoginSession(mfaSessionId));

      // 11. Generate tokens for login flow
      let accessToken: string | undefined;
      let refreshToken: string | undefined;
      let sessionId: string | undefined;
      let userData: any;

      if (!isSetupFlow) {
        const user = await this.userRepository.findById(userId);
        if (!user) {
          throw new NotFoundException('User not found', 'ইউজার পাওয়া যায়নি');
        }

        // Generate token pair
        const tokenPair = await this.tokenGenerator.generateTokenPair(
          userId,
          user.getEmail().getValue(),
          user.getRole(),
          {
            sessionId: mfaSession.getSessionId(),
            deviceId: command.getDeviceId(),
            district: command.getDistrict(),
            trustDevice: trustDevice
          }
        );

        accessToken = tokenPair.accessToken;
        refreshToken = tokenPair.refreshToken!;
        sessionId = mfaSession.getSessionId();

        // Create refresh token entity
        const refreshTokenEntity = await this.refreshTokenRepository.create(
          userId,
          refreshToken,
          mfaSession.getSessionId(),
          command.getDeviceId()
        );
        await this.refreshTokenRepository.save(refreshTokenEntity);

        userData = {
          id: user.getId(),
          email: user.getEmail().getValue(),
          fullName: user.getFullName(),
          displayName: user.getDisplayName(),
          role: user.getRole(),
          tier: user.getTier(),
          avatar: user.getAvatar(),
          isEmailVerified: user.isEmailVerified(),
          isPhoneVerified: user.isPhoneVerified(),
          mfaEnabled: user.isMfaEnabled()
        };

        // Publish login event
        await this.eventBus.publish(
          new UserLoggedInEvent(
            userId,
            'MFA' as LoginMethod,
            'MFA_VERIFIED' as LoginType,
            correlationId,
            undefined,
            command.getIpAddress(),
            command.getDeviceId(),
            command.getUserAgent(),
            sessionId,
            undefined,
            false,
            false,
            trustDevice || false
          )
        );
      }

      // 12. Audit log
      await this.auditLog(
        userId,
        targetMethod,
        verificationMethod,
        isSetupFlow,
        deviceTrusted,
        command,
        startTime
      );

      return {
        success: true,
        message: isSetupFlow ? 'MFA enabled successfully' : 'Verification successful',
        messageBn: isSetupFlow ? 'MFA সফলভাবে সক্রিয় করা হয়েছে' : 'ভেরিফিকেশন সফল হয়েছে',
        ...(isSetupFlow ? {} : {
          accessToken,
          refreshToken,
          refreshExpiresIn: TOKEN_EXPIRY.REFRESH_TOKEN,
          expiresIn: TOKEN_EXPIRY.ACCESS_TOKEN,
          user: userData,
          sessionId,
          deviceTrusted
        }),
        correlationId
      };

    } catch (error) {
      this.logger.error(`VerifyMfaCommand failed for session ${mfaSessionId}: ${error.message}`);

      // Audit failure
      await this.auditService.log({
        action: 'MFA_VERIFICATION_ERROR',
        mfaSessionId,
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
   * Check rate limit for MFA verification attempts
   */
  private async checkRateLimit(userId: string): Promise<void> {
    const rateLimitKey = CacheKeyBuilder.rateLimit(`mfa-verify:${userId}`);
    const attempts = await this.cacheService.incr(rateLimitKey);

    if (attempts === 1) {
      await this.cacheService.expire(rateLimitKey, MFA_RATE_LIMIT_CONFIG.WINDOW_SECONDS || 3600);
    }

    const maxAttempts = MFA_RATE_LIMIT_CONFIG.MAX_VERIFICATION_ATTEMPTS || 10;
    if (attempts > maxAttempts) {
      throw new TooManyRequestsException(
        'Too many MFA verification attempts. Please try again later.',
        'অনেকবার MFA ভেরিফিকেশনের চেষ্টা করা হয়েছে। পরে আবার চেষ্টা করুন।'
      );
    }
  }

  /**
   * Clear rate limit on successful verification
   */
  private async clearRateLimit(userId: string): Promise<void> {
    const rateLimitKey = CacheKeyBuilder.rateLimit(`mfa-verify:${userId}`);
    await this.cacheService.del(rateLimitKey);
  }

  /**
   * Track failed verification attempt
   */
  private async trackFailedAttempt(
    userId: string,
    verificationMethod: string,
    deviceInfo: any,
    correlationId?: string
  ): Promise<void> {
    const failKey = CacheKeyBuilder.mfaFailedAttempts(userId);
    const failCount = await this.cacheService.incr(failKey);
    if (failCount === 1) {
      await this.cacheService.expire(failKey, MFA_LOCKOUT_CONFIG.TRACKING_WINDOW_SECONDS || 3600);
    }
  }

  /**
   * Clear failed attempts on success
   */
  private async clearFailedAttempts(userId: string): Promise<void> {
    const failKey = CacheKeyBuilder.mfaFailedAttempts(userId);
    await this.cacheService.del(failKey);
  }

  /**
   * Verify code (TOTP/SMS/Email)
   */
  private async verifyCode(
    mfa: MFA,
    code: string,
    userId: string,
    command: VerifyMfaCommand,
    isSetupFlow: boolean
  ): Promise<boolean> {
    let isValid = false;

    switch (mfa.getType()) {
      case MFAType.TOTP:
        isValid = this.mfaGenerator.verifyTOTPCode(mfa.getSecret(), code);
        break;
      case MFAType.SMS:
      case MFAType.EMAIL:
      case MFAType.WHATSAPP:
      case MFAType.IMO:
      case MFAType.VOICE_CALL:
        isValid = await this.mfaVerificationService.verifyOtpCode(
          userId,
          code,
          mfa.getIdentifier(),
          mfa.getType()
        );
        break;
      default:
        isValid = false;
    }

    if (!isValid) {
      if (!isSetupFlow) {
        mfa.recordVerificationFailure();
        await this.mfaRepository.save(mfa);
      }
      return false;
    }

    if (!isSetupFlow) {
      mfa.recordSuccessfulVerification();
      await this.mfaRepository.save(mfa);
    }

    return true;
  }

  /**
   * Verify backup code with bcrypt comparison
   */
  private async verifyBackupCode(
    mfa: MFA,
    backupCode: string,
    userId: string,
    command: VerifyMfaCommand,
    isSetupFlow: boolean
  ): Promise<boolean> {
    const storedHashes = mfa.getBackupCodes();
    
    for (const storedHash of storedHashes) {
      const isValid = await this.passwordHasher.compare(backupCode, storedHash);
      if (isValid) {
        // Remove used backup code
        mfa.removeBackupCode(storedHash);
        await this.mfaRepository.save(mfa);

        await this.auditService.log({
          action: 'MFA_BACKUP_CODE_USED',
          userId,
          remainingCodes: mfa.getRemainingBackupCodesCount(),
          ipAddress: command.getIpAddress(),
          deviceId: command.getDeviceId(),
          correlationId: command.correlationId,
          timestamp: new Date().toISOString(),
          severity: AUDIT_SEVERITIES.INFO
        });

        await this.eventBus.publish(
          new MfaBackupCodeUsedEvent(
            userId,
            mfa.getRemainingBackupCodesCount(),
            command.correlationId,
            command.getIpAddress(),
            command.getDeviceId()
          )
        );

        return true;
      }
    }

    if (!isSetupFlow) {
      mfa.recordVerificationFailure();
      await this.mfaRepository.save(mfa);
    }

    return false;
  }

  /**
   * Verify MFS PIN (bKash/Nagad/Rocket)
   */
  private async verifyMFSPin(
    mfa: MFA,
    pin: string,
    userId: string,
    command: VerifyMfaCommand
  ): Promise<boolean> {
    // MFS PIN verification would integrate with bKash/Nagad/Rocket APIs
    // This is a placeholder - actual implementation would call external service
    const isValid = await this.mfaVerificationService.verifyMFSPin(
      userId,
      mfa.getIdentifier(),
      pin,
      mfa.getType()
    );

    if (!isValid) {
      mfa.recordVerificationFailure();
      await this.mfaRepository.save(mfa);
      return false;
    }

    mfa.recordSuccessfulVerification();
    await this.mfaRepository.save(mfa);
    return true;
  }

  /**
   * Verify phone-based OTP (WhatsApp/Imo/Voice)
   */
  private async verifyPhoneOtp(
    userId: string,
    code: string,
    phoneNumber: string | undefined,
    verificationType: string,
    command: VerifyMfaCommand
  ): Promise<boolean> {
    const isValid = await this.mfaVerificationService.verifyPhoneOtp(
      userId,
      code,
      phoneNumber,
      verificationType
    );

    if (!isValid) {
      return false;
    }

    return true;
  }

  /**
   * Trust device for future logins (skip MFA)
   */
  private async trustDevice(
    userId: string,
    deviceId: string,
    command: VerifyMfaCommand
  ): Promise<boolean> {
    try {
      const device = await this.deviceRepository.findByDeviceId(new DeviceId(deviceId));
      
      if (device) {
        device.trust();
        device.setTrustExpiry(new Date(Date.now() + MFA_CONFIG.TRUSTED_DEVICE_TTL_DAYS * 24 * 60 * 60 * 1000));
        await this.deviceRepository.save(device);
        
        // Cache trusted device for quick lookup
        const cacheKey = CacheKeyBuilder.trustedDevice(deviceId);
        await this.cacheService.set(cacheKey, true, MFA_CONFIG.TRUSTED_DEVICE_TTL_DAYS * 24 * 3600);
        
        return true;
      }
      
      return false;
    } catch (error) {
      this.logger.warn(`Failed to trust device ${deviceId}: ${error.message}`);
      return false;
    }
  }

  /**
   * Get MFA method display name for events
   */
  private getMFAMethodForType(type?: string): string {
    const methodMap: Record<string, string> = {
      [MFAType.TOTP]: 'AUTHENTICATOR_APP',
      [MFAType.SMS]: 'SMS_OTP',
      [MFAType.EMAIL]: 'EMAIL_OTP',
      [MFAType.WEBAUTHN]: 'WEBAUTHN',
      [MFAType.WHATSAPP]: 'WHATSAPP_OTP',
      [MFAType.IMO]: 'IMO_OTP',
      [MFAType.VOICE_CALL]: 'VOICE_CALL',
      [MFAType.BKASH_PIN]: 'BKASH_PIN',
      [MFAType.NAGAD_PIN]: 'NAGAD_PIN',
      [MFAType.ROCKET_PIN]: 'ROCKET_PIN'
    };
    return methodMap[type || ''] || 'AUTHENTICATOR_APP';
  }

  /**
   * Invalidate user cache after successful verification
   */
  private async invalidateUserCache(userId: string): Promise<void> {
    await this.cacheService.del(CacheKeyBuilder.user(userId));
    await this.cacheService.del(CacheKeyBuilder.userMFAStatus(userId));
    await this.cacheService.del(CacheKeyBuilder.userPermissions(userId));
    await this.cacheService.del(CacheKeyBuilder.userSessions(userId));
  }

  /**
   * Audit log for MFA verification
   */
  private async auditLog(
    userId: string,
    mfaMethod: MFA | undefined,
    verificationMethod: string,
    isSetupFlow: boolean,
    deviceTrusted: boolean,
    command: VerifyMfaCommand,
    startTime: number
  ): Promise<void> {
    await this.auditService.log({
      action: isSetupFlow ? 'MFA_SETUP_COMPLETED' : 'MFA_VERIFIED',
      userId,
      mfaType: mfaMethod?.getType(),
      verificationMethod,
      deviceTrusted,
      ipAddress: command.getIpAddress(),
      deviceId: command.getDeviceId(),
      deviceFingerprint: command.getDeviceFingerprint(),
      userAgent: command.getUserAgent(),
      district: command.getDistrict(),
      division: command.getDivision(),
      networkType: command.getNetworkType(),
      mobileOperator: command.getMobileOperator(),
      upazila: command.getUpazila(),
      correlationId: command.correlationId,
      timestamp: new Date().toISOString(),
      durationMs: Date.now() - startTime,
      severity: AUDIT_SEVERITIES.INFO
    });
  }
}

// ============================================================
// Type Exports
// ============================================================

export type { VerifyMfaResponseDto as VerifyMfaResponseDtoType };
