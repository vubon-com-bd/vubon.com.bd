/**
 * Enable MFA Command Handler - Application Layer (Enterprise Enhanced)
 * 
 * @module application/commands/mfa/enable-mfa.handler
 * 
 * @description
 * Handles MFA enable use case with enterprise-grade features:
 * - TOTP secret generation with QR code
 * - Backup code generation (cryptographically secure)
 * - Support for all MFA types (TOTP, SMS, WhatsApp, WebAuthn, bKash/Nagad/Rocket PIN)
 * - Phone number validation for Bangladesh
 * - Transaction management for data consistency
 * - Circuit breaker pattern for external services
 * - Complete audit logging with severity levels
 * - Event publishing with correlation tracking
 * - Distributed tracing support
 * - Bengali error messages
 * - Rate limiting for setup attempts
 * 
 * Enterprise Rules:
 * ✅ Single responsibility - handles only MFA enable
 * ✅ Repository coordination with transaction support
 * ✅ Security validation with proper error messages
 * ✅ Event publishing with correlation ID
 * ✅ Audit logging with severity levels
 * ✅ Circuit breaker for external dependencies
 * ✅ Retry mechanism for transient failures
 */

import { Injectable, NotFoundException, ConflictException, BadRequestException, Logger, Inject, forwardRef } from '@nestjs/common';
import { randomInt } from 'crypto';
import { v4 as uuidv4 } from 'uuid';

import { EnableMfaCommand, MfaType, isPhoneOptions, isMFSPinOptions } from './enable-mfa.command';
import { MFARepository } from '../../../domain/repositories/mfa.repository.interface';
import { UserRepository } from '../../../domain/repositories/user.repository.interface';
import { AuditRepository } from '../../../domain/repositories/audit.repository.interface';
import { MFA, MFAType, MFAStatus } from '../../../domain/entities/mfa.entity';
import { User } from '../../../domain/entities/user.entity';
import { Email } from '../../../domain/value-objects/email.vo';
import { Phone } from '../../../domain/value-objects/phone.vo';

// Import events
import { MfaSetupInitiatedEvent } from '../../events/mfa-setup-initiated.event';
import { MfaMethodAddedEvent } from '../../events/mfa-method-added.event';

// Import shared packages
import { MFA_CONFIG, BACKUP_CODE_CONFIG } from '@vubon/shared-constants';
import type { MFAType as SharedMFAType } from '@vubon/shared-types';
import { isValidBdMobile, maskPhone } from '@vubon/shared-utils';

// Import infrastructure interfaces
import { MfaGenerator, EventBus, AuditService, TransactionManager, CacheService, PasswordHasher } from './infrastructure.interface';
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
// Enable MFA Response DTO (Enhanced)
// ============================================================

export interface EnableMfaResponseDto {
  /** Method ID for verification */
  methodId: string;
  /** Secret key (for TOTP) */
  secret?: string;
  /** QR code as data URL (for TOTP) */
  qrCode?: string;
  /** Provisioning URI (for TOTP) */
  provisioningUri?: string;
  /** Recovery backup codes */
  backupCodes: string[];
  /** Number of backup codes generated */
  recoveryCodesCount: number;
  /** Masked identifier (phone/email/account) */
  maskedIdentifier?: string;
  /** Resend cooldown in seconds (for SMS/WhatsApp) */
  resendCooldownSeconds?: number;
  /** WebAuthn challenge (for WebAuthn) */
  webAuthnChallenge?: string;
  /** WebAuthn options (for WebAuthn) */
  webAuthnOptions?: Record<string, unknown>;
  /** Expiry time in seconds */
  expiresInSeconds?: number;
  /** Correlation ID for tracing */
  correlationId?: string;
  /** Message in Bengali */
  messageBn?: string;
}

// ============================================================
// Enable MFA Handler (Enterprise Enhanced)
// ============================================================

@Injectable()
export class EnableMfaHandler {
  private readonly logger = new Logger(EnableMfaHandler.name);
  private readonly mfaCircuitBreaker = CircuitBreaker.getInstance('mfa');
  private readonly smsCircuitBreaker = CircuitBreaker.getInstance('sms');
  private readonly whatsAppCircuitBreaker = CircuitBreaker.getInstance('whatsapp');

  constructor(
    private readonly mfaRepository: MFARepository,
    private readonly userRepository: UserRepository,
    private readonly auditRepository: AuditRepository,
    private readonly mfaGenerator: MfaGenerator,
    private readonly eventBus: EventBus,
    private readonly auditService: AuditService,
    private readonly transactionManager: TransactionManager,
    private readonly cacheService: CacheService,
    private readonly passwordHasher: PasswordHasher
  ) {}

  /**
   * Execute the Enable MFA command
   * 
   * @param command - Enable MFA command with userId included
   * @returns Response with setup data for verification
   */
  async execute(command: EnableMfaCommand): Promise<EnableMfaResponseDto> {
    const startTime = Date.now();
    const { userId, type, deviceInfo, correlationId, backupCodeCount, makePrimary } = command;
    
    this.logger.log(`Executing EnableMfaCommand for user ${userId}, type: ${type}, correlationId: ${correlationId}`);

    try {
      // 1. Check rate limit for setup attempts
      await this.checkRateLimit(userId, type);

      // 2. Find user
      const user = await this.findUserOrThrow(userId);

      // 3. Validate method-specific requirements
      this.validateMethodRequirements(command);

      // 4. Check if MFA already enabled
      await this.checkExistingMfa(userId, type);

      // 5. Execute setup in transaction
      const result = await this.transactionManager.runInTransaction(async () => {
        return this.setupMfaMethod(user, command);
      });

      // 6. Publish events
      await this.publishEvents(user, command, result, startTime);

      // 7. Audit logging
      await this.auditLog(user, command, result, startTime);

      // 8. Cache invalidation
      await this.invalidateUserCache(userId);

      return result;

    } catch (error) {
      this.logger.error(`EnableMfaCommand failed for user ${userId}: ${error.message}`);
      
      // Audit failure
      await this.auditService.log({
        action: 'MFA_SETUP_FAILED',
        userId,
        mfaType: type,
        error: error.message,
        correlationId,
        timestamp: new Date().toISOString(),
        severity: 'error'
      });

      throw error;
    }
  }

  // ============================================================
  // Private Helper Methods
  // ============================================================

  /**
   * Check rate limit for MFA setup attempts
   */
  private async checkRateLimit(userId: string, type: MfaType): Promise<void> {
    const rateLimitKey = CacheKeyBuilder.rateLimit(`mfa-setup:${userId}:${type}`);
    const attempts = await this.cacheService.incr(rateLimitKey);
    
    if (attempts === 1) {
      await this.cacheService.expire(rateLimitKey, 3600); // 1 hour window
    }
    
    const maxAttempts = MFA_CONFIG.MAX_SETUP_ATTEMPTS_PER_HOUR || 5;
    if (attempts > maxAttempts) {
      throw new BadRequestException(
        `Too many MFA setup attempts. Please try again later.`,
        `অনেকবার MFA সেটআপের চেষ্টা করা হয়েছে। পরে আবার চেষ্টা করুন।`
      );
    }
  }

  /**
   * Find user by ID or throw exception
   */
  private async findUserOrThrow(userId: string): Promise<User> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found', 'ইউজার পাওয়া যায়নি');
    }
    return user;
  }

  /**
   * Validate method-specific requirements
   */
  private validateMethodRequirements(command: EnableMfaCommand): void {
    const { type, options } = command;

    // Phone-based MFA validation
    if (command.isPhoneBased()) {
      if (!isPhoneOptions(options)) {
        throw new BadRequestException(
          `Phone number is required for ${type} MFA`,
          `${type} MFA এর জন্য ফোন নম্বর প্রয়োজন`
        );
      }
      
      if (!isValidBdMobile(options.phoneNumber)) {
        throw new BadRequestException(
          'Invalid Bangladesh phone number format. Use format: +8801XXXXXXXXX',
          'ভুল বাংলাদেশ ফোন নম্বর ফরম্যাট। ফরম্যাট: +8801XXXXXXXXX'
        );
      }
    }

    // MFS PIN-based MFA validation
    if (command.isMFSPinBased()) {
      if (!isMFSPinOptions(options)) {
        throw new BadRequestException(
          `Account number is required for ${type} MFA`,
          `${type} MFA এর জন্য অ্যাকাউন্ট নম্বর প্রয়োজন`
        );
      }
      
      if (!isValidBdMobile(options.accountNumber)) {
        throw new BadRequestException(
          'Invalid account number format. Use format: +8801XXXXXXXXX',
          'ভুল অ্যাকাউন্ট নম্বর ফরম্যাট। ফরম্যাট: +8801XXXXXXXXX'
        );
      }
    }
  }

  /**
   * Check if MFA already enabled for this type
   */
  private async checkExistingMfa(userId: string, type: MfaType): Promise<void> {
    const existingMfa = await this.mfaRepository.findByUserIdAndType(userId, type as SharedMFAType);
    
    if (existingMfa && existingMfa.isEnabled()) {
      throw new ConflictException(
        `MFA with type ${type} is already enabled`,
        `${type} টাইপের MFA ইতিমধ্যে সক্রিয় আছে`
      );
    }
    
    // Delete pending setup if exists (cleanup)
    if (existingMfa && existingMfa.isPending()) {
      await this.mfaRepository.delete(existingMfa.getId());
    }
  }

  /**
   * Setup MFA method based on type (with circuit breaker)
   */
  private async setupMfaMethod(user: User, command: EnableMfaCommand): Promise<EnableMfaResponseDto> {
    const { type, options, backupCodeCount, makePrimary, correlationId } = command;

    switch (type) {
      case MfaType.TOTP:
        return this.setupTOTP(user, command);
      
      case MfaType.SMS:
        return this.setupSMS(user, command);
      
      case MfaType.WHATSAPP:
        return this.setupWhatsApp(user, command);
      
      case MfaType.WEBAUTHN:
        return this.setupWebAuthn(user, command);
      
      case MfaType.BKASH_PIN:
        return this.setupBkashPin(user, command);
      
      case MfaType.NAGAD_PIN:
        return this.setupNagadPin(user, command);
      
      case MfaType.ROCKET_PIN:
        return this.setupRocketPin(user, command);
      
      case MfaType.EMAIL:
        return this.setupEmail(user, command);
      
      case MfaType.IMO:
        return this.setupImo(user, command);
      
      case MfaType.VOICE_CALL:
        return this.setupVoiceCall(user, command);
      
      default:
        throw new BadRequestException(`Unsupported MFA type: ${type}`);
    }
  }

  /**
   * Setup TOTP MFA (Google Authenticator)
   */
  private async setupTOTP(user: User, command: EnableMfaCommand): Promise<EnableMfaResponseDto> {
    const email = user.getEmail().getValue();
    const deviceName = command.getDeviceName();
    
    // Generate TOTP secret with circuit breaker
    const secret = await this.mfaCircuitBreaker.call(async () => {
      return withRetry(() => this.mfaGenerator.generateTOTPSecret(email, deviceName));
    });
    
    // Generate QR code
    const qrCode = await this.mfaGenerator.generateQrCode(secret.secret, email, 'Vubon');
    const provisioningUri = this.mfaGenerator.getProvisioningUri(secret.secret, email, 'Vubon');
    
    // Generate backup codes (cryptographically secure)
    const backupCodes = await this.generateSecureBackupCodes(command.backupCodeCount);
    const hashedBackupCodes = await this.hashBackupCodes(backupCodes);
    
    // Get priority for this method
    const priority = await this.getMethodPriority(MfaType.TOTP);
    
    // Create MFA entity
    const mfa = MFA.enable(
      user.getId(),
      MFAType.TOTP,
      email,
      secret.secret,
      hashedBackupCodes,
      command.makePrimary,
      priority,
      { generate: () => uuidv4() }
    );
    
    await this.mfaRepository.save(mfa);
    
    return {
      methodId: mfa.getId(),
      secret: secret.secret,
      qrCode,
      provisioningUri,
      backupCodes,
      recoveryCodesCount: backupCodes.length,
      expiresInSeconds: MFA_CONFIG.TOTP_SETUP_EXPIRY || 300,
      correlationId: command.correlationId
    };
  }

  /**
   * Setup SMS MFA
   */
  private async setupSMS(user: User, command: EnableMfaCommand): Promise<EnableMfaResponseDto> {
    const options = command.options as { phoneNumber: string; language?: 'en' | 'bn' };
    const phoneNumber = options.phoneNumber;
    const language = options.language || 'en';
    
    // Send OTP via SMS with circuit breaker
    let otpResult;
    await this.smsCircuitBreaker.call(async () => {
      otpResult = await withRetry(() => 
        this.mfaGenerator.generateSmsOtp(phoneNumber, language)
      );
    });
    
    // Generate backup codes
    const backupCodes = await this.generateSecureBackupCodes(command.backupCodeCount);
    const hashedBackupCodes = await this.hashBackupCodes(backupCodes);
    
    // Get priority
    const priority = await this.getMethodPriority(MfaType.SMS);
    
    // Create MFA entity (pending verification)
    const mfa = MFA.enable(
      user.getId(),
      MFAType.SMS,
      phoneNumber,
      '', // No secret for SMS
      hashedBackupCodes,
      command.makePrimary,
      priority,
      { generate: () => uuidv4() }
    );
    
    await this.mfaRepository.save(mfa);
    
    // Store OTP session in cache
    const otpKey = CacheKeyBuilder.mfaOtp(mfa.getId());
    await this.cacheService.set(
      otpKey,
      { sessionId: otpResult!.sessionId, phoneNumber, attempts: 0 },
      MFA_CONFIG.VERIFICATION_SESSION_TTL_SECONDS || 300
    );
    
    return {
      methodId: mfa.getId(),
      backupCodes,
      recoveryCodesCount: backupCodes.length,
      maskedIdentifier: maskPhone(phoneNumber),
      resendCooldownSeconds: otpResult!.resendCooldownSeconds || 30,
      expiresInSeconds: MFA_CONFIG.VERIFICATION_SESSION_TTL_SECONDS || 300,
      correlationId: command.correlationId,
      messageBn: language === 'bn' ? 'আপনার ফোনে ভেরিফিকেশন কোড পাঠানো হয়েছে' : undefined
    };
  }

  /**
   * Setup WhatsApp MFA (Bangladesh specific)
   */
  private async setupWhatsApp(user: User, command: EnableMfaCommand): Promise<EnableMfaResponseDto> {
    const options = command.options as { phoneNumber: string; language?: 'en' | 'bn' };
    const phoneNumber = options.phoneNumber;
    const language = options.language || 'bn'; // Default Bengali for WhatsApp
    
    // Send OTP via WhatsApp with circuit breaker
    let otpResult;
    await this.whatsAppCircuitBreaker.call(async () => {
      otpResult = await withRetry(() => 
        this.mfaGenerator.generateWhatsAppOtp(phoneNumber, language)
      );
    });
    
    // Generate backup codes
    const backupCodes = await this.generateSecureBackupCodes(command.backupCodeCount);
    const hashedBackupCodes = await this.hashBackupCodes(backupCodes);
    
    // Get priority
    const priority = await this.getMethodPriority(MfaType.WHATSAPP);
    
    // Create MFA entity
    const mfa = MFA.enable(
      user.getId(),
      MFAType.WHATSAPP,
      phoneNumber,
      '',
      hashedBackupCodes,
      command.makePrimary,
      priority,
      { generate: () => uuidv4() }
    );
    
    await this.mfaRepository.save(mfa);
    
    // Store OTP session
    const otpKey = CacheKeyBuilder.mfaOtp(mfa.getId());
    await this.cacheService.set(
      otpKey,
      { sessionId: otpResult!.sessionId, phoneNumber, attempts: 0 },
      MFA_CONFIG.VERIFICATION_SESSION_TTL_SECONDS || 300
    );
    
    return {
      methodId: mfa.getId(),
      backupCodes,
      recoveryCodesCount: backupCodes.length,
      maskedIdentifier: maskPhone(phoneNumber),
      resendCooldownSeconds: otpResult!.resendCooldownSeconds || 30,
      expiresInSeconds: MFA_CONFIG.VERIFICATION_SESSION_TTL_SECONDS || 300,
      correlationId: command.correlationId,
      messageBn: 'আপনার হোয়াটসঅ্যাপে ভেরিফিকেশন কোড পাঠানো হয়েছে'
    };
  }

  /**
   * Setup WebAuthn (Biometric/Passkey)
   */
  private async setupWebAuthn(user: User, command: EnableMfaCommand): Promise<EnableMfaResponseDto> {
    const deviceName = command.getDeviceName() || 'Security Key';
    
    // Get WebAuthn registration options
    const webAuthnOptions = await this.mfaGenerator.getWebAuthnRegistrationOptions(
      user.getId(),
      user.getEmail().getValue(),
      user.getFullName(),
      { deviceName }
    );
    
    // Generate backup codes
    const backupCodes = await this.generateSecureBackupCodes(command.backupCodeCount);
    const hashedBackupCodes = await this.hashBackupCodes(backupCodes);
    
    // Get priority
    const priority = await this.getMethodPriority(MfaType.WEBAUTHN);
    
    // Create MFA entity (pending verification)
    const mfa = MFA.enable(
      user.getId(),
      MFAType.WEBAUTHN,
      user.getId(), // identifier
      webAuthnOptions.challenge,
      hashedBackupCodes,
      command.makePrimary,
      priority,
      { generate: () => uuidv4() }
    );
    
    await this.mfaRepository.save(mfa);
    
    // Store WebAuthn challenge
    const challengeKey = CacheKeyBuilder.webauthnChallenge(mfa.getId());
    await this.cacheService.set(challengeKey, webAuthnOptions.challenge, 300);
    
    return {
      methodId: mfa.getId(),
      backupCodes,
      recoveryCodesCount: backupCodes.length,
      webAuthnChallenge: webAuthnOptions.challenge,
      webAuthnOptions: webAuthnOptions as unknown as Record<string, unknown>,
      expiresInSeconds: 300,
      correlationId: command.correlationId
    };
  }

  /**
   * Setup bKash PIN MFA
   */
  private async setupBkashPin(user: User, command: EnableMfaCommand): Promise<EnableMfaResponseDto> {
    const options = command.options as { accountNumber: string; maxAttempts?: number };
    const accountNumber = options.accountNumber;
    
    // Generate backup codes
    const backupCodes = await this.generateSecureBackupCodes(command.backupCodeCount);
    const hashedBackupCodes = await this.hashBackupCodes(backupCodes);
    
    // Get priority
    const priority = await this.getMethodPriority(MfaType.BKASH_PIN);
    
    // Create MFA entity (pending verification - requires PIN verification)
    const mfa = MFA.enable(
      user.getId(),
      MFAType.BKASH_PIN,
      accountNumber,
      '', // No secret
      hashedBackupCodes,
      command.makePrimary,
      priority,
      { generate: () => uuidv4() }
    );
    
    await this.mfaRepository.save(mfa);
    
    return {
      methodId: mfa.getId(),
      backupCodes,
      recoveryCodesCount: backupCodes.length,
      maskedIdentifier: maskPhone(accountNumber),
      expiresInSeconds: MFA_CONFIG.MFS_PIN_SETUP_EXPIRY || 600,
      correlationId: command.correlationId,
      messageBn: 'আপনার বিকাশ পিন যাচাই করুন'
    };
  }

  /**
   * Setup Nagad PIN MFA
   */
  private async setupNagadPin(user: User, command: EnableMfaCommand): Promise<EnableMfaResponseDto> {
    const options = command.options as { accountNumber: string; maxAttempts?: number };
    const accountNumber = options.accountNumber;
    
    const backupCodes = await this.generateSecureBackupCodes(command.backupCodeCount);
    const hashedBackupCodes = await this.hashBackupCodes(backupCodes);
    const priority = await this.getMethodPriority(MfaType.NAGAD_PIN);
    
    const mfa = MFA.enable(
      user.getId(),
      MFAType.NAGAD_PIN,
      accountNumber,
      '',
      hashedBackupCodes,
      command.makePrimary,
      priority,
      { generate: () => uuidv4() }
    );
    
    await this.mfaRepository.save(mfa);
    
    return {
      methodId: mfa.getId(),
      backupCodes,
      recoveryCodesCount: backupCodes.length,
      maskedIdentifier: maskPhone(accountNumber),
      expiresInSeconds: MFA_CONFIG.MFS_PIN_SETUP_EXPIRY || 600,
      correlationId: command.correlationId,
      messageBn: 'আপনার নগদ পিন যাচাই করুন'
    };
  }

  /**
   * Setup Rocket PIN MFA
   */
  private async setupRocketPin(user: User, command: EnableMfaCommand): Promise<EnableMfaResponseDto> {
    const options = command.options as { accountNumber: string; maxAttempts?: number };
    const accountNumber = options.accountNumber;
    
    const backupCodes = await this.generateSecureBackupCodes(command.backupCodeCount);
    const hashedBackupCodes = await this.hashBackupCodes(backupCodes);
    const priority = await this.getMethodPriority(MfaType.ROCKET_PIN);
    
    const mfa = MFA.enable(
      user.getId(),
      MFAType.ROCKET_PIN,
      accountNumber,
      '',
      hashedBackupCodes,
      command.makePrimary,
      priority,
      { generate: () => uuidv4() }
    );
    
    await this.mfaRepository.save(mfa);
    
    return {
      methodId: mfa.getId(),
      backupCodes,
      recoveryCodesCount: backupCodes.length,
      maskedIdentifier: maskPhone(accountNumber),
      expiresInSeconds: MFA_CONFIG.MFS_PIN_SETUP_EXPIRY || 600,
      correlationId: command.correlationId,
      messageBn: 'আপনার রকেট পিন যাচাই করুন'
    };
  }

  /**
   * Setup Email MFA
   */
  private async setupEmail(user: User, command: EnableMfaCommand): Promise<EnableMfaResponseDto> {
    const email = user.getEmail().getValue();
    
    // Send OTP via email with circuit breaker
    let otpResult;
    await this.mfaCircuitBreaker.call(async () => {
      otpResult = await withRetry(() => 
        this.mfaGenerator.generateEmailOtp(email, 'bn')
      );
    });
    
    const backupCodes = await this.generateSecureBackupCodes(command.backupCodeCount);
    const hashedBackupCodes = await this.hashBackupCodes(backupCodes);
    const priority = await this.getMethodPriority(MfaType.EMAIL);
    
    const mfa = MFA.enable(
      user.getId(),
      MFAType.EMAIL,
      email,
      '',
      hashedBackupCodes,
      command.makePrimary,
      priority,
      { generate: () => uuidv4() }
    );
    
    await this.mfaRepository.save(mfa);
    
    const otpKey = CacheKeyBuilder.mfaOtp(mfa.getId());
    await this.cacheService.set(
      otpKey,
      { sessionId: otpResult!.sessionId, email, attempts: 0 },
      MFA_CONFIG.VERIFICATION_SESSION_TTL_SECONDS || 600
    );
    
    return {
      methodId: mfa.getId(),
      backupCodes,
      recoveryCodesCount: backupCodes.length,
      maskedIdentifier: maskEmail(email),
      resendCooldownSeconds: 60,
      expiresInSeconds: MFA_CONFIG.VERIFICATION_SESSION_TTL_SECONDS || 600,
      correlationId: command.correlationId
    };
  }

  /**
   * Setup Imo MFA (Bangladesh specific)
   */
  private async setupImo(user: User, command: EnableMfaCommand): Promise<EnableMfaResponseDto> {
    const options = command.options as { phoneNumber: string; language?: 'en' | 'bn' };
    const phoneNumber = options.phoneNumber;
    
    let otpResult;
    await this.mfaCircuitBreaker.call(async () => {
      otpResult = await withRetry(() => 
        this.mfaGenerator.generateImoOtp(phoneNumber, 'bn')
      );
    });
    
    const backupCodes = await this.generateSecureBackupCodes(command.backupCodeCount);
    const hashedBackupCodes = await this.hashBackupCodes(backupCodes);
    const priority = await this.getMethodPriority(MfaType.IMO);
    
    const mfa = MFA.enable(
      user.getId(),
      MFAType.IMO,
      phoneNumber,
      '',
      hashedBackupCodes,
      command.makePrimary,
      priority,
      { generate: () => uuidv4() }
    );
    
    await this.mfaRepository.save(mfa);
    
    const otpKey = CacheKeyBuilder.mfaOtp(mfa.getId());
    await this.cacheService.set(
      otpKey,
      { sessionId: otpResult!.sessionId, phoneNumber, attempts: 0 },
      300
    );
    
    return {
      methodId: mfa.getId(),
      backupCodes,
      recoveryCodesCount: backupCodes.length,
      maskedIdentifier: maskPhone(phoneNumber),
      resendCooldownSeconds: 30,
      expiresInSeconds: 300,
      correlationId: command.correlationId,
      messageBn: 'আপনার আইএমওতে ভেরিফিকেশন কোড পাঠানো হয়েছে'
    };
  }

  /**
   * Setup Voice Call MFA (for feature phones)
   */
  private async setupVoiceCall(user: User, command: EnableMfaCommand): Promise<EnableMfaResponseDto> {
    const options = command.options as { phoneNumber: string; language?: 'en' | 'bn' };
    const phoneNumber = options.phoneNumber;
    
    let otpResult;
    await this.mfaCircuitBreaker.call(async () => {
      otpResult = await withRetry(() => 
        this.mfaGenerator.generateVoiceOtp(phoneNumber, 'bn')
      );
    });
    
    const backupCodes = await this.generateSecureBackupCodes(command.backupCodeCount);
    const hashedBackupCodes = await this.hashBackupCodes(backupCodes);
    const priority = await this.getMethodPriority(MfaType.VOICE_CALL);
    
    const mfa = MFA.enable(
      user.getId(),
      MFAType.VOICE_CALL,
      phoneNumber,
      '',
      hashedBackupCodes,
      command.makePrimary,
      priority,
      { generate: () => uuidv4() }
    );
    
    await this.mfaRepository.save(mfa);
    
    const otpKey = CacheKeyBuilder.mfaOtp(mfa.getId());
    await this.cacheService.set(
      otpKey,
      { sessionId: otpResult!.sessionId, phoneNumber, attempts: 0 },
      300
    );
    
    return {
      methodId: mfa.getId(),
      backupCodes,
      recoveryCodesCount: backupCodes.length,
      maskedIdentifier: maskPhone(phoneNumber),
      resendCooldownSeconds: 60,
      expiresInSeconds: 300,
      correlationId: command.correlationId,
      messageBn: 'আপনার ফোনে ভয়েস কলের মাধ্যমে OTP পাঠানো হবে'
    };
  }

  // ============================================================
  // Utility Methods
  // ============================================================

  /**
   * Generate cryptographically secure backup codes
   */
  private async generateSecureBackupCodes(count: number): Promise<string[]> {
    const codes: string[] = [];
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // Removed ambiguous: 0, O, I, l
    const charsLength = chars.length;
    const codeLength = BACKUP_CODE_CONFIG.DEFAULT_LENGTH || 8;
    const useHyphen = BACKUP_CODE_CONFIG.FORMAT_WITH_HYPHEN !== false;
    
    for (let i = 0; i < count; i++) {
      let code = '';
      for (let j = 0; j < codeLength; j++) {
        const randomIndex = randomInt(0, charsLength);
        code += chars[randomIndex];
        if (useHyphen && j === 3) code += '-';
      }
      codes.push(code);
    }
    
    return codes;
  }

  /**
   * Hash backup codes for secure storage
   */
  private async hashBackupCodes(codes: string[]): Promise<string[]> {
    const saltRounds = BACKUP_CODE_CONFIG.SALT_ROUNDS || 12;
    const hashedCodes: string[] = [];
    
    for (const code of codes) {
      const hashed = await this.passwordHasher.hash(code, saltRounds);
      hashedCodes.push(hashed);
    }
    
    return hashedCodes;
  }

  /**
   * Get method priority (from database config or fallback)
   */
  private async getMethodPriority(type: MfaType): Promise<number> {
    // Try to get from repository configuration
    const configPriority = await this.mfaRepository.getMethodPriority(type as SharedMFAType);
    if (configPriority !== undefined) {
      return configPriority;
    }
    
    // Fallback priority map
    const priorityMap: Record<MfaType, number> = {
      [MfaType.WEBAUTHN]: 1,
      [MfaType.TOTP]: 2,
      [MfaType.WHATSAPP]: 3,
      [MfaType.SMS]: 4,
      [MfaType.IMO]: 5,
      [MfaType.BKASH_PIN]: 6,
      [MfaType.NAGAD_PIN]: 6,
      [MfaType.ROCKET_PIN]: 6,
      [MfaType.EMAIL]: 7,
      [MfaType.VOICE_CALL]: 8
    };
    
    return priorityMap[type] || 10;
  }

  /**
   * Invalidate user cache after MFA setup
   */
  private async invalidateUserCache(userId: string): Promise<void> {
    await this.cacheService.del(CacheKeyBuilder.user(userId));
    await this.cacheService.del(CacheKeyBuilder.userMFAStatus(userId));
    await this.cacheService.delPattern(CacheKeyBuilder.userMfaMethods(userId));
  }

  /**
   * Publish events after successful MFA setup
   */
  private async publishEvents(
    user: User,
    command: EnableMfaCommand,
    result: EnableMfaResponseDto,
    startTime: number
  ): Promise<void> {
    const { type, deviceInfo, correlationId, makePrimary } = command;
    
    await this.eventBus.publish(
      new MfaSetupInitiatedEvent(
        user.getId(),
        type,
        deviceInfo?.ipAddress,
        deviceInfo?.deviceId,
        deviceInfo?.userAgent,
        correlationId,
        {
          deviceName: command.getDeviceName(),
          maskedIdentifier: result.maskedIdentifier,
          backupCodeCount: result.recoveryCodesCount,
          makePrimary
        }
      )
    );
    
    await this.eventBus.publish(
      new MfaMethodAddedEvent(
        user.getId(),
        type as SharedMFAType,
        result.methodId,
        makePrimary,
        correlationId,
        deviceInfo?.ipAddress,
        deviceInfo?.deviceId,
        deviceInfo?.userAgent
      )
    );
  }

  /**
   * Audit log for MFA setup
   */
  private async auditLog(
    user: User,
    command: EnableMfaCommand,
    result: EnableMfaResponseDto,
    startTime: number
  ): Promise<void> {
    const { type, deviceInfo, correlationId, makePrimary } = command;
    
    await this.auditService.log({
      action: 'MFA_SETUP_INITIATED',
      userId: user.getId(),
      userEmail: user.getEmail().getValue(),
      mfaType: type,
      methodId: result.methodId,
      makePrimary,
      backupCodeCount: result.recoveryCodesCount,
      deviceInfo: {
        ipAddress: deviceInfo?.ipAddress,
        deviceId: deviceInfo?.deviceId,
        userAgent: deviceInfo?.userAgent,
        deviceFingerprint: deviceInfo?.deviceFingerprint,
        district: deviceInfo?.district,
        networkType: deviceInfo?.networkType,
        mobileOperator: deviceInfo?.mobileOperator
      },
      correlationId,
      timestamp: new Date().toISOString(),
      durationMs: Date.now() - startTime,
      severity: 'info'
    });
  }
}

// ============================================================
// Helper Functions
// ============================================================

/**
 * Mask email for privacy
 */
function maskEmail(email: string): string {
  const [localPart, domain] = email.split('@');
  if (!localPart || !domain) return email;
  if (localPart.length <= 2) {
    return `${localPart[0]}***@${domain}`;
  }
  const firstChar = localPart[0];
  const lastChar = localPart[localPart.length - 1];
  return `${firstChar}***${lastChar}@${domain}`;
}

// ============================================================
// Type Exports
// ============================================================

export type { EnableMfaResponseDto as EnableMfaResponseDtoType };
