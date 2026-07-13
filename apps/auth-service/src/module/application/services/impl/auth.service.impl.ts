/**
 * Authentication Service Implementation - Application Layer (Enterprise Grade)
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 *
 * @module application/services/impl/auth.service.impl
 */

import {
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

// ============================================================
// SSOT: All imports from shared packages
// ============================================================

import {
  USER_STATUSES,
  USER_TIERS,
  TOKEN_EXPIRY,
  CACHE_TTL,
} from '@vubon/shared-constants';

import type {
  LoginDto,
  RegisterDto,
  RefreshTokenDto,
  LogoutDto,
  LoginResponseDto,
  TokenRefreshResponseDto,
  LogoutResponseDto,
  UserResponseDto,
  EnableMfaDto,
  VerifyMfaDto,
  DisableMfaDto,
  MFAStatusResponseDto,
  ServiceResult,
  LoginResult,
  MFAVerificationResult,
  TokenValidationResult,
  PaginationOptions,
  PaginatedResult,
  MFATypes,
} from '@vubon/shared-types';

import { maskEmail } from '@vubon/shared-utils';
import { env } from '@vubon/shared-config';

// ============================================================
// Domain Imports
// ============================================================

import { User } from '../../../domain/entities/user.entity';
import type { Session } from '../../../domain/entities/session.entity';
import { Email } from '../../../domain/value-objects/email.vo';
import { Password } from '../../../domain/value-objects/password.vo';

// ============================================================
// Port Imports (Dependency Inversion)
// ============================================================

import type {
  UserRepository,
  SessionRepository,
  RefreshTokenRepository,
  MFARepository,
  AccountLockRepository,
  LoginAttemptRepository,
} from '../../../domain/repositories';

import type {
  IEmailValidator,
  IPasswordValidator,
  IPasswordHasher,
  ITokenGenerator,
  IEventBus,
  INotificationSender,
  IRateLimiter,
  ICacheService,
} from '../../../domain/ports';

import type { IdGenerator } from '../../../domain/entities/base.entity';

// ============================================================
// Application Imports
// ============================================================

import type {
  IAuthService,
  LoginOptions,
  RegistrationOptions,
  TokenRefreshOptions,
  LogoutOptions,
  MFAOptions,
  MFAEnableOptions,
  SocialLoginOptions,
} from '../interfaces/auth.service.interface';

// ============================================================
// ID Generator Implementation
// ============================================================

class UuidIdGenerator implements IdGenerator {
  generate(): string {
    return uuidv4();
  }
  generateUlid(): string {
    const timestamp = Date.now().toString(36).padStart(10, '0');
    const random = Math.random().toString(36).substring(2, 18);
    return `${timestamp}${random}`.toUpperCase();
  }
  generateSnowflake(): string {
    const timestamp = BigInt(Date.now()) - 1288834974657n;
    const machineId = 1n;
    const sequence = BigInt(Math.floor(Math.random() * 4096));
    const snowflake = (timestamp << 22n) | (machineId << 12n) | sequence;
    return snowflake.toString();
  }
  generateSequential(): string {
    return Date.now().toString();
  }
  generateOfType(type: 'uuid' | 'ulid' | 'snowflake' | 'sequential'): string {
    switch (type) {
      case 'ulid': return this.generateUlid();
      case 'snowflake': return this.generateSnowflake();
      case 'sequential': return this.generateSequential();
      default: return this.generate();
    }
  }
}

// ============================================================
// Service Implementation
// ============================================================

@Injectable()
export class AuthService implements IAuthService {
  private readonly logger = new Logger(AuthService.name);
  private readonly idGenerator: IdGenerator = new UuidIdGenerator();

  constructor(
    private readonly userRepository: UserRepository,
    private readonly sessionRepository: SessionRepository,
    private readonly refreshTokenRepository: RefreshTokenRepository,
    private readonly mfaRepository: MFARepository,
    private readonly accountLockRepository: AccountLockRepository,
    private readonly loginAttemptRepository: LoginAttemptRepository,
    private readonly emailValidator: IEmailValidator,
    private readonly passwordValidator: IPasswordValidator,
    private readonly passwordHasher: IPasswordHasher,
    private readonly tokenGenerator: ITokenGenerator,
    private readonly eventBus: IEventBus,
    private readonly notificationSender: INotificationSender,
    private readonly rateLimiter: IRateLimiter,
    private readonly cacheService: ICacheService,
  ) {}

  // ============================================================
  // 1. REGISTER
  // ============================================================

  async register(
    dto: RegisterDto,
    ipAddress: string,
    _userAgent: string,
    options?: RegistrationOptions,
  ): Promise<ServiceResult<UserResponseDto>> {
    const correlationId = options?.correlationId || uuidv4();
    const startTime = Date.now();

    try {
      const emailValidation = this.emailValidator.validate(dto.email);
      if (!emailValidation.isValid) {
        return {
          success: false,
          errorCode: 'INVALID_EMAIL',
          errorMessage: 'Invalid email format',
          errorMessageBn: 'ভুল ইমেইল ফরম্যাট',
          correlationId,
          durationMs: Date.now() - startTime,
        };
      }

      // ✅ FIX: PasswordValidator.validate() returns ValidationResult, not PasswordValidationResult
      const passwordValidation = this.passwordValidator.validate(dto.password);
      if (!passwordValidation.isValid) {
        return {
          success: false,
          errorCode: 'WEAK_PASSWORD',
          errorMessage: `Password is too weak: ${passwordValidation.errors.join(', ')}`,
          errorMessageBn: 'পাসওয়ার্ড খুব দুর্বল',
          correlationId,
          durationMs: Date.now() - startTime,
        };
      }

      const email = new Email(dto.email, this.emailValidator);
      const existingUser = await this.userRepository.findByEmail(email);
      if (existingUser) {
        return {
          success: false,
          errorCode: 'EMAIL_ALREADY_EXISTS',
          errorMessage: 'User with this email already exists',
          errorMessageBn: 'এই ইমেইল দিয়ে ইতিমধ্যে একটি অ্যাকাউন্ট আছে',
          correlationId,
          durationMs: Date.now() - startTime,
        };
      }

      const passwordVO = new Password(dto.password, this.passwordValidator);
      const hashedPassword = await this.passwordHasher.hash(passwordVO.getValue());
      const passwordString = typeof hashedPassword === 'string' ? hashedPassword : hashedPassword.hash;
      const passwordWithHash = new Password(passwordString, this.passwordValidator);

      const user = User.create(
        email,
        passwordWithHash,
        `${dto.firstName} ${dto.lastName}`,
        this.idGenerator,
        undefined,
        options?.preferredLanguage || 'en',
        undefined,
      );

      await this.userRepository.save(user);

      // ✅ FIX: IDomainEvent requires aggregateVersion and eventVersion
      await this.eventBus.publish({
        eventId: uuidv4(),
        eventType: 'USER_REGISTERED',
        aggregateId: user.id,
        aggregateVersion: 1,
        eventVersion: 1,
        occurredOn: new Date(),
        metadata: {
          userId: user.id,
          email: user.getEmail().getValue(),
          fullName: user.getFullName(),
          correlationId,
          ipAddress,
        },
      });

      this.sendWelcomeEmail(user, correlationId).catch((error) => {
        this.logger.warn(`Failed to send welcome email: ${error.message}`);
      });

      const response: UserResponseDto = {
        id: user.id,
        email: user.getEmail().getValue(),
        fullName: user.getFullName(),
        status: user.getStatus(),
        role: user.getRole(),
        tier: user.getTier() || USER_TIERS.BRONZE,
        isEmailVerified: user.isEmailVerified(),
        isPhoneVerified: user.isPhoneVerified(),
        createdAt: user.createdAt,
      };

      return {
        success: true,
        data: response,
        correlationId,
        durationMs: Date.now() - startTime,
      };
    } catch (error) {
      const err = error as Error;
      this.logger.error(`Registration failed: ${err.message}`, err.stack);
      return {
        success: false,
        errorCode: 'REGISTRATION_FAILED',
        errorMessage: err.message || 'Registration failed',
        errorMessageBn: 'নিবন্ধন ব্যর্থ হয়েছে',
        correlationId,
        durationMs: Date.now() - startTime,
      };
    }
  }

  // ============================================================
  // 2. LOGIN
  // ============================================================

  async login(
    dto: LoginDto,
    ipAddress: string,
    _userAgent: string,
    options?: LoginOptions,
  ): Promise<LoginResult> {
    const correlationId = options?.correlationId || uuidv4();
    const startTime = Date.now();

    try {
      const rateLimitKey = `login:${ipAddress}`;
      const rateLimitResult = await this.rateLimiter.check(
        rateLimitKey,
        3600,
        10,
      );

      if (!rateLimitResult.allowed) {
        return {
          success: false,
          mfaRequired: false,
          errorCode: 'RATE_LIMIT_EXCEEDED',
          errorMessage: 'Too many login attempts. Please try again later.',
          correlationId,
          durationMs: Date.now() - startTime,
        };
      }

      const emailValidation = this.emailValidator.validate(dto.email);
      if (!emailValidation.isValid) {
        return {
          success: false,
          mfaRequired: false,
          errorCode: 'INVALID_EMAIL',
          errorMessage: 'Invalid email format',
          correlationId,
          durationMs: Date.now() - startTime,
        };
      }

      const email = new Email(dto.email, this.emailValidator);
      const user = await this.userRepository.findByEmail(email);

      if (!user) {
        await this.recordFailedAttempt(dto.email, ipAddress, 'USER_NOT_FOUND');
        return {
          success: false,
          mfaRequired: false,
          errorCode: 'INVALID_CREDENTIALS',
          errorMessage: 'Invalid email or password',
          correlationId,
          durationMs: Date.now() - startTime,
        };
      }

      if (user.getStatus() === USER_STATUSES.LOCKED) {
        return {
          success: false,
          mfaRequired: false,
          errorCode: 'ACCOUNT_LOCKED',
          errorMessage: 'Account is locked. Please try again later.',
          correlationId,
          durationMs: Date.now() - startTime,
        };
      }

      const isValidPassword = await this.passwordHasher.compare(
        dto.password,
        user.getPassword().getValue(),
      );
      if (!isValidPassword) {
        await this.recordFailedAttempt(dto.email, ipAddress, 'INVALID_PASSWORD');
        return {
          success: false,
          mfaRequired: false,
          errorCode: 'INVALID_CREDENTIALS',
          errorMessage: 'Invalid email or password',
          correlationId,
          durationMs: Date.now() - startTime,
        };
      }

      if (user.isMfaEnabled()) {
        const mfaSessionId = uuidv4();
        await this.cacheService.set(
          `mfa:session:${mfaSessionId}`,
          { userId: user.id, email: user.getEmail().getValue() },
          { ttl: CACHE_TTL.MINUTE * 5 },
        );

        return {
          success: true,
          mfaRequired: true,
          mfaSessionId,
          availableMfaMethods: ['totp', 'backup_code'],
          correlationId,
          durationMs: Date.now() - startTime,
        };
      }

      // ✅ FIX: SessionRepository.create() expects Session entity
      const session = await this.sessionRepository.create({
        id: uuidv4(),
        userId: user.id,
        ipAddress,
        userAgent: '',
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      });

      // ✅ FIX: ITokenGenerator.generateTokenPair() exists
      const tokens = await this.tokenGenerator.generateTokenPair(
        user.id,
        session.id,
        user.getEmail().getValue(),
        user.getRole(),
      );

      await this.userRepository.updateLastLogin(user.id, new Date());

      // ✅ FIX: IDomainEvent requires aggregateVersion and eventVersion
      await this.eventBus.publish({
        eventId: uuidv4(),
        eventType: 'USER_LOGGED_IN',
        aggregateId: user.id,
        aggregateVersion: 1,
        eventVersion: 1,
        occurredOn: new Date(),
        metadata: {
          userId: user.id,
          email: user.getEmail().getValue(),
          ipAddress,
          correlationId,
        },
      });

      const response: LoginResponseDto = {
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
        expiresIn: TOKEN_EXPIRY.ACCESS_TOKEN || 900,
        tokenType: 'Bearer',
        user: {
          id: user.id,
          email: user.getEmail().getValue(),
          fullName: user.getFullName(),
          role: user.getRole(),
          tier: user.getTier() || USER_TIERS.BRONZE,
        },
      };

      return {
        success: true,
        mfaRequired: false,
        data: response,
        correlationId,
        durationMs: Date.now() - startTime,
      };
    } catch (error) {
      const err = error as Error;
      this.logger.error(`Login failed: ${err.message}`, err.stack);
      return {
        success: false,
        mfaRequired: false,
        errorCode: 'LOGIN_FAILED',
        errorMessage: err.message || 'Login failed',
        correlationId,
        durationMs: Date.now() - startTime,
      };
    }
  }

  // ============================================================
  // 3. REFRESH TOKEN
  // ============================================================

  async refreshToken(
    dto: RefreshTokenDto,
    _ipAddress: string,
    _userAgent: string,
    options?: TokenRefreshOptions,
  ): Promise<ServiceResult<TokenRefreshResponseDto>> {
    const correlationId = options?.correlationId || uuidv4();
    const startTime = Date.now();

    try {
      // ✅ FIX: ITokenGenerator.validateToken() exists
      const validation = await this.tokenGenerator.validateToken(
        dto.refreshToken,
        { tokenType: 'refresh' },
      );
      if (!validation.isValid) {
        return {
          success: false,
          errorCode: 'INVALID_REFRESH_TOKEN',
          errorMessage: 'Invalid or expired refresh token',
          errorMessageBn: 'ভুল বা মেয়াদোত্তীর্ণ রিফ্রেশ টোকেন',
          correlationId,
          durationMs: Date.now() - startTime,
        };
      }

      const user = await this.userRepository.findById(validation.userId!);
      if (!user) {
        return {
          success: false,
          errorCode: 'USER_NOT_FOUND',
          errorMessage: 'User not found',
          errorMessageBn: 'ইউজার পাওয়া যায়নি',
          correlationId,
          durationMs: Date.now() - startTime,
        };
      }

      // ✅ FIX: SessionRepository.create() expects Session entity
      const session = await this.sessionRepository.create({
        id: uuidv4(),
        userId: user.id,
        ipAddress: '',
        userAgent: '',
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      });

      const tokens = await this.tokenGenerator.generateTokenPair(
        user.id,
        session.id,
        user.getEmail().getValue(),
        user.getRole(),
      );

      // ✅ FIX: RefreshTokenRepository.revokeAllByUserId() exists
      if (options?.rotateToken !== false) {
        await this.refreshTokenRepository.revokeAllByUserId(user.id);
      }

      const response: TokenRefreshResponseDto = {
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
        expiresIn: TOKEN_EXPIRY.ACCESS_TOKEN || 900,
        tokenType: 'Bearer',
      };

      return {
        success: true,
        data: response,
        correlationId,
        durationMs: Date.now() - startTime,
      };
    } catch (error) {
      const err = error as Error;
      this.logger.error(`Token refresh failed: ${err.message}`, err.stack);
      return {
        success: false,
        errorCode: 'REFRESH_FAILED',
        errorMessage: err.message || 'Token refresh failed',
        errorMessageBn: 'টোকেন রিফ্রেশ ব্যর্থ হয়েছে',
        correlationId,
        durationMs: Date.now() - startTime,
      };
    }
  }

  // ============================================================
  // 4. LOGOUT
  // ============================================================

  async logout(
    dto: LogoutDto,
    userId: string,
    _ipAddress: string,
    _userAgent: string,
    options?: LogoutOptions,
  ): Promise<ServiceResult<LogoutResponseDto>> {
    const correlationId = options?.correlationId || uuidv4();
    const startTime = Date.now();

    try {
      const user = await this.userRepository.findById(userId);
      if (!user) {
        return {
          success: false,
          errorCode: 'USER_NOT_FOUND',
          errorMessage: 'User not found',
          errorMessageBn: 'ইউজার পাওয়া যায়নি',
          correlationId,
          durationMs: Date.now() - startTime,
        };
      }

      let sessionsRevoked = 0;
      // ✅ FIX: SessionRepository.revokeAll() exists
      if (options?.allDevices) {
        sessionsRevoked = await this.sessionRepository.revokeAll(userId);
      } else if (dto.sessionId) {
        // ✅ FIX: SessionRepository.revoke() exists
        await this.sessionRepository.revoke(dto.sessionId);
        sessionsRevoked = 1;
      }

      if (options?.revokeRefreshTokens !== false) {
        await this.refreshTokenRepository.revokeAllByUserId(userId);
      }

      if (options?.clearDeviceTrust) {
        await this.cacheService.delete(`device:trust:${userId}`);
      }

      // ✅ FIX: IDomainEvent requires aggregateVersion and eventVersion
      await this.eventBus.publish({
        eventId: uuidv4(),
        eventType: 'USER_LOGGED_OUT',
        aggregateId: userId,
        aggregateVersion: 1,
        eventVersion: 1,
        occurredOn: new Date(),
        metadata: {
          userId,
          sessionId: dto.sessionId,
          allDevices: options?.allDevices || false,
          correlationId,
        },
      });

      const response: LogoutResponseDto = {
        success: true,
        message: 'Logged out successfully',
        sessionsRevoked,
        timestamp: new Date().toISOString(),
      };

      return {
        success: true,
        data: response,
        correlationId,
        durationMs: Date.now() - startTime,
      };
    } catch (error) {
      const err = error as Error;
      this.logger.error(`Logout failed: ${err.message}`, err.stack);
      return {
        success: false,
        errorCode: 'LOGOUT_FAILED',
        errorMessage: err.message || 'Logout failed',
        errorMessageBn: 'লগআউট ব্যর্থ হয়েছে',
        correlationId,
        durationMs: Date.now() - startTime,
      };
    }
  }

  // ============================================================
  // 5. VERIFY MFA
  // ============================================================

  async verifyMfa(
    dto: VerifyMfaDto,
    _ipAddress: string,
    _userAgent: string,
    options?: MFAOptions,
  ): Promise<MFAVerificationResult> {
    const correlationId = options?.correlationId || uuidv4();
    const startTime = Date.now();

    try {
      const sessionData = await this.cacheService.get<{
        userId: string;
        email: string;
      }>(`mfa:session:${dto.mfaSessionId}`);

      if (!sessionData) {
        return {
          success: false,
          remainingAttempts: 0,
          isLocked: true,
          errorMessage: 'MFA session expired. Please login again.',
          correlationId,
          durationMs: Date.now() - startTime,
        };
      }

      const user = await this.userRepository.findById(sessionData.userId);
      if (!user) {
        return {
          success: false,
          remainingAttempts: 0,
          isLocked: true,
          errorMessage: 'User not found',
          correlationId,
          durationMs: Date.now() - startTime,
        };
      }

      // ✅ FIX: MFARepository.verifyCode() exists
      const isValid = await this.mfaRepository.verifyCode(
        user.id,
        dto.code,
        dto.method,
      );

      if (!isValid) {
        // ✅ FIX: MFARepository.getFailedAttempts() exists
        const attempts = await this.mfaRepository.getFailedAttempts(user.id);
        const maxAttempts = 5;
        const remaining = Math.max(0, maxAttempts - (attempts + 1));

        if (remaining === 0) {
          // ✅ FIX: AccountLockRepository.lock() exists
          await this.accountLockRepository.lock(
            user.id,
            'Too many MFA attempts',
            3600,
          );
          return {
            success: false,
            remainingAttempts: 0,
            isLocked: true,
            errorMessage: 'Too many MFA attempts. Account locked.',
            correlationId,
            durationMs: Date.now() - startTime,
          };
        }

        return {
          success: false,
          remainingAttempts: remaining,
          isLocked: false,
          errorMessage: 'Invalid MFA code',
          correlationId,
          durationMs: Date.now() - startTime,
        };
      }

      const session = await this.sessionRepository.create({
        id: uuidv4(),
        userId: user.id,
        ipAddress: '',
        userAgent: '',
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      });

      const tokens = await this.tokenGenerator.generateTokenPair(
        user.id,
        session.id,
        user.getEmail().getValue(),
        user.getRole(),
      );

      await this.cacheService.delete(`mfa:session:${dto.mfaSessionId}`);

      const response: LoginResponseDto = {
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
        expiresIn: TOKEN_EXPIRY.ACCESS_TOKEN || 900,
        tokenType: 'Bearer',
        user: {
          id: user.id,
          email: user.getEmail().getValue(),
          fullName: user.getFullName(),
          role: user.getRole(),
          tier: user.getTier() || USER_TIERS.BRONZE,
        },
      };

      return {
        success: true,
        remainingAttempts: 5,
        isLocked: false,
        data: response,
        correlationId,
        durationMs: Date.now() - startTime,
      };
    } catch (error) {
      const err = error as Error;
      this.logger.error(`MFA verification failed: ${err.message}`, err.stack);
      return {
        success: false,
        remainingAttempts: 0,
        isLocked: true,
        errorMessage: err.message || 'MFA verification failed',
        correlationId,
        durationMs: Date.now() - startTime,
      };
    }
  }

  // ============================================================
  // 6. FORGOT PASSWORD
  // ============================================================

  async forgotPassword(
    email: string,
    ipAddress: string,
    _userAgent: string,
  ): Promise<ServiceResult<{ cooldownSeconds: number; maskedEmail?: string }>> {
    const correlationId = uuidv4();
    const startTime = Date.now();

    try {
      const rateLimitResult = await this.rateLimiter.check(
        `password_reset:${ipAddress}`,
        3600,
        5,
      );

      if (!rateLimitResult.allowed) {
        return {
          success: false,
          errorCode: 'RATE_LIMIT_EXCEEDED',
          errorMessage: 'Too many password reset requests. Please try again later.',
          errorMessageBn: 'অনেকবার পাসওয়ার্ড রিসেট চেষ্টা করা হয়েছে। পরে আবার চেষ্টা করুন।',
          correlationId,
          durationMs: Date.now() - startTime,
        };
      }

      const emailValidation = this.emailValidator.validate(email);
      if (!emailValidation.isValid) {
        return {
          success: false,
          errorCode: 'INVALID_EMAIL',
          errorMessage: 'Invalid email format',
          errorMessageBn: 'ভুল ইমেইল ফরম্যাট',
          correlationId,
          durationMs: Date.now() - startTime,
        };
      }

      const emailVO = new Email(email, this.emailValidator);
      const user = await this.userRepository.findByEmail(emailVO);

      if (!user) {
        return {
          success: true,
          data: { cooldownSeconds: 60 },
          correlationId,
          durationMs: Date.now() - startTime,
        };
      }

      // ✅ FIX: ITokenGenerator.generateResetToken() exists
      const resetToken = await this.tokenGenerator.generateResetToken(
        user.id,
        user.getEmail().getValue(),
        { expiresInSeconds: TOKEN_EXPIRY.EMAIL_VERIFICATION_TOKEN || 3600 },
      );

      await this.notificationSender.sendEmail({
        to: user.getEmail().getValue(),
        subject: 'Password Reset Request',
        html: `
          <p>Dear ${user.getFullName()},</p>
          <p>You requested a password reset. Click the link below:</p>
          <p><a href="${env.APP_URL}/reset-password?token=${resetToken}">Reset Password</a></p>
          <p>This link expires in 1 hour.</p>
          <p>If you didn't request this, ignore this email.</p>
          <p>Thanks,<br>Vubon.com.bd Team</p>
        `,
        text: `Dear ${user.getFullName()},\n\nPassword reset link:\n${env.APP_URL}/reset-password?token=${resetToken}\n\nExpires in 1 hour.\n\nThanks,\nVubon.com.bd Team`,
        correlationId,
      });

      return {
        success: true,
        data: {
          cooldownSeconds: 60,
          maskedEmail: maskEmail(user.getEmail().getValue()),
        },
        correlationId,
        durationMs: Date.now() - startTime,
      };
    } catch (error) {
      const err = error as Error;
      this.logger.error(`Password reset request failed: ${err.message}`, err.stack);
      return {
        success: true,
        data: { cooldownSeconds: 60 },
        correlationId,
        durationMs: Date.now() - startTime,
      };
    }
  }

  // ============================================================
  // 7. RESET PASSWORD
  // ============================================================

  async resetPassword(
    token: string,
    newPassword: string,
    _ipAddress: string,
    _userAgent: string,
  ): Promise<ServiceResult<{ passwordReset: boolean; sessionsRevoked?: number }>> {
    const correlationId = uuidv4();
    const startTime = Date.now();

    try {
      const validation = await this.tokenGenerator.validateToken(token, {
        tokenType: 'password_reset',
      });
      if (!validation.isValid) {
        return {
          success: false,
          errorCode: 'INVALID_RESET_TOKEN',
          errorMessage: 'Invalid or expired reset token',
          errorMessageBn: 'ভুল বা মেয়াদোত্তীর্ণ রিসেট টোকেন',
          correlationId,
          durationMs: Date.now() - startTime,
        };
      }

      const user = await this.userRepository.findById(validation.userId!);
      if (!user) {
        return {
          success: false,
          errorCode: 'USER_NOT_FOUND',
          errorMessage: 'User not found',
          errorMessageBn: 'ইউজার পাওয়া যায়নি',
          correlationId,
          durationMs: Date.now() - startTime,
        };
      }

      const passwordValidation = this.passwordValidator.validate(newPassword);
      if (!passwordValidation.isValid) {
        return {
          success: false,
          errorCode: 'WEAK_PASSWORD',
          errorMessage: `Password is too weak: ${passwordValidation.errors.join(', ')}`,
          errorMessageBn: 'পাসওয়ার্ড খুব দুর্বল',
          correlationId,
          durationMs: Date.now() - startTime,
        };
      }

      const hashedPassword = await this.passwordHasher.hash(newPassword);
      const passwordString = typeof hashedPassword === 'string' ? hashedPassword : hashedPassword.hash;
      const passwordVO = new Password(passwordString, this.passwordValidator);
      user.changePassword(passwordVO);
      await this.userRepository.save(user);

      const sessionsRevoked = await this.sessionRepository.revokeAll(user.id);

      await this.eventBus.publish({
        eventId: uuidv4(),
        eventType: 'PASSWORD_RESET',
        aggregateId: user.id,
        aggregateVersion: 1,
        eventVersion: 1,
        occurredOn: new Date(),
        metadata: {
          userId: user.id,
          email: user.getEmail().getValue(),
          correlationId,
        },
      });

      return {
        success: true,
        data: {
          passwordReset: true,
          sessionsRevoked,
        },
        correlationId,
        durationMs: Date.now() - startTime,
      };
    } catch (error) {
      const err = error as Error;
      this.logger.error(`Password reset failed: ${err.message}`, err.stack);
      return {
        success: false,
        errorCode: 'RESET_FAILED',
        errorMessage: err.message || 'Password reset failed',
        errorMessageBn: 'পাসওয়ার্ড রিসেট ব্যর্থ হয়েছে',
        correlationId,
        durationMs: Date.now() - startTime,
      };
    }
  }

  // ============================================================
  // 8. SESSION OPERATIONS
  // ============================================================

  async getCurrentUser(
    userId: string,
    _includeSensitive?: boolean,
  ): Promise<User> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async getUserSessions(
    userId: string,
    options?: PaginationOptions,
  ): Promise<PaginatedResult<Session>> {
    // ✅ FIX: SessionRepository.findByUserId() accepts PaginationOptions
    return this.sessionRepository.findByUserId(userId, options);
  }

  async revokeSession(
    userId: string,
    sessionId: string,
    _ipAddress: string,
  ): Promise<ServiceResult<{ revoked: boolean }>> {
    const correlationId = uuidv4();
    const startTime = Date.now();

    try {
      const session = await this.sessionRepository.findById(sessionId);
      if (!session || session.userId !== userId) {
        return {
          success: false,
          errorCode: 'SESSION_NOT_FOUND',
          errorMessage: 'Session not found',
          errorMessageBn: 'সেশন পাওয়া যায়নি',
          correlationId,
          durationMs: Date.now() - startTime,
        };
      }

      await this.sessionRepository.revoke(sessionId);

      return {
        success: true,
        data: { revoked: true },
        correlationId,
        durationMs: Date.now() - startTime,
      };
    } catch (error) {
      const err = error as Error;
      return {
        success: false,
        errorCode: 'REVOKE_FAILED',
        errorMessage: err.message || 'Failed to revoke session',
        errorMessageBn: 'সেশন রিভোক ব্যর্থ হয়েছে',
        correlationId,
        durationMs: Date.now() - startTime,
      };
    }
  }

  async revokeAllSessions(
    userId: string,
    excludeCurrentSession: boolean,
    ipAddress: string,
  ): Promise<ServiceResult<{ sessionsRevokedCount: number }>> {
    const correlationId = uuidv4();
    const startTime = Date.now();

    try {
      let count: number;
      if (excludeCurrentSession && ipAddress) {
        // ✅ FIX: SessionRepository.revokeAllExcept() exists
        count = await this.sessionRepository.revokeAllExcept(userId, ipAddress);
      } else {
        count = await this.sessionRepository.revokeAll(userId);
      }

      return {
        success: true,
        data: { sessionsRevokedCount: count },
        correlationId,
        durationMs: Date.now() - startTime,
      };
    } catch (error) {
      const err = error as Error;
      return {
        success: false,
        errorCode: 'REVOKE_ALL_FAILED',
        errorMessage: err.message || 'Failed to revoke all sessions',
        errorMessageBn: 'সব সেশন রিভোক ব্যর্থ হয়েছে',
        correlationId,
        durationMs: Date.now() - startTime,
      };
    }
  }

  // ============================================================
  // 9. MFA STATUS
  // ============================================================

  async getMfaStatus(userId: string): Promise<MFAStatusResponseDto> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // ✅ FIX: MFARepository.findByUserId() exists
    const mfaMethods = await this.mfaRepository.findByUserId(userId);
    // ✅ FIX: MFARepository.getBackupCodes() exists
    const backupCodes = await this.mfaRepository.getBackupCodes(userId);

    return {
      enabled: user.isMfaEnabled(),
      methods: (mfaMethods || []).map((m: any): MFATypes => ({
        id: m.id,
        type: m.type,
        isPrimary: m.isPrimary || false,
        createdAt: m.createdAt,
        lastUsedAt: m.lastUsedAt,
      })),
      backupCodesRemaining: (backupCodes || []).length,
    };
  }

  // ============================================================
  // 10. ENABLE MFA
  // ============================================================

  async enableMfa(
    userId: string,
    dto: EnableMfaDto,
    _ipAddress: string,
    _userAgent: string,
    options?: MFAEnableOptions,
  ): Promise<ServiceResult<any>> {
    const correlationId = options?.correlationId || uuidv4();
    const startTime = Date.now();

    try {
      const user = await this.userRepository.findById(userId);
      if (!user) {
        return {
          success: false,
          errorCode: 'USER_NOT_FOUND',
          errorMessage: 'User not found',
          errorMessageBn: 'ইউজার পাওয়া যায়নি',
          correlationId,
          durationMs: Date.now() - startTime,
        };
      }

      // ✅ FIX: ITokenGenerator.generateTOTPSecret() exists
      const secret = await this.tokenGenerator.generateTOTPSecret({
        userId: user.id,
        email: user.getEmail().getValue(),
        issuer: process.env.APP_NAME || 'Vubon.com.bd',
      });

      return {
        success: true,
        data: {
          secret: secret.base32,
          qrCode: secret.qrCode,
          backupCodes: secret.backupCodes,
        },
        correlationId,
        durationMs: Date.now() - startTime,
      };
    } catch (error) {
      const err = error as Error;
      return {
        success: false,
        errorCode: 'MFA_ENABLE_FAILED',
        errorMessage: err.message || 'Failed to enable MFA',
        errorMessageBn: 'এমএফএ সক্রিয়করণ ব্যর্থ হয়েছে',
        correlationId,
        durationMs: Date.now() - startTime,
      };
    }
  }

  // ============================================================
  // 11. DISABLE MFA
  // ============================================================

  async disableMfa(
    userId: string,
    _dto: DisableMfaDto,
    _ipAddress: string,
    _userAgent: string,
  ): Promise<ServiceResult<{ disabledMethodIds: string[] }>> {
    const correlationId = uuidv4();
    const startTime = Date.now();

    try {
      // ✅ FIX: MFARepository.disableForUser() exists
      const disabledIds = await this.mfaRepository.disableForUser(userId);

      return {
        success: true,
        data: { disabledMethodIds: disabledIds },
        correlationId,
        durationMs: Date.now() - startTime,
      };
    } catch (error) {
      const err = error as Error;
      return {
        success: false,
        errorCode: 'MFA_DISABLE_FAILED',
        errorMessage: err.message || 'Failed to disable MFA',
        errorMessageBn: 'এমএফএ নিষ্ক্রিয়করণ ব্যর্থ হয়েছে',
        correlationId,
        durationMs: Date.now() - startTime,
      };
    }
  }

  // ============================================================
  // 12. HEALTH CHECK
  // ============================================================

  async healthCheck(): Promise<{
    status: 'healthy' | 'degraded' | 'unhealthy';
    version: string;
    uptime: number;
    dependencies: { database: boolean; redis: boolean; queue: boolean };
    metrics?: { activeSessions: number; recentLogins: number; mfaEnabledUsers: number };
  }> {
    const dbHealth = await this.userRepository.healthCheck?.() ?? true;
    const cacheHealth = await this.cacheService.healthCheck?.() ?? true;

    return {
      status: dbHealth && cacheHealth ? 'healthy' : 'degraded',
      version: '1.0.0',
      uptime: process.uptime(),
      dependencies: { database: dbHealth, redis: cacheHealth, queue: true },
    };
  }

  async getRateLimitStatus(
    userId: string,
    operation: 'login' | 'register' | 'reset' | 'mfa' | 'token_refresh',
  ): Promise<{ limited: boolean; remaining: number; resetAt: Date; limit: number }> {
    const key = `ratelimit:${operation}:${userId}`;
    const status = await this.rateLimiter.getStatus(key, 3600, 10);

    return {
      limited: status.limited || false,
      remaining: status.remaining || 10,
      resetAt: status.resetAt || new Date(),
      limit: status.limit || 10,
    };
  }

  // ============================================================
  // 13. SOCIAL LOGIN (Placeholder)
  // ============================================================

  async socialLogin(
    _dto: any,
    _ipAddress: string,
    _userAgent: string,
    _options?: SocialLoginOptions,
  ): Promise<LoginResult> {
    throw new Error('Method not implemented.');
  }

  async socialPhoneLogin(
    _dto: any,
    _ipAddress: string,
    _userAgent: string,
    _options?: LoginOptions,
  ): Promise<LoginResult> {
    throw new Error('Method not implemented.');
  }

  async loginWithPhone(
    _dto: any,
    _ipAddress: string,
    _userAgent: string,
    _options?: LoginOptions,
  ): Promise<LoginResult> {
    throw new Error('Method not implemented.');
  }

  async loginWithUsername(
    _dto: any,
    _ipAddress: string,
    _userAgent: string,
    _options?: LoginOptions,
  ): Promise<LoginResult> {
    throw new Error('Method not implemented.');
  }

  async loginWithOtp(
    _dto: any,
    _ipAddress: string,
    _userAgent: string,
    _options?: LoginOptions,
  ): Promise<LoginResult> {
    throw new Error('Method not implemented.');
  }

  async verifyEmail(
    _token: string,
    _ipAddress: string,
    _userAgent: string,
  ): Promise<ServiceResult<{ emailVerified: boolean }>> {
    throw new Error('Method not implemented.');
  }

  async verifyPhone(
    _userId: string,
    _otpCode: string,
    _ipAddress: string,
    _userAgent: string,
  ): Promise<ServiceResult<{ phoneVerified: boolean }>> {
    throw new Error('Method not implemented.');
  }

  async resendVerificationEmail(
    _userId: string,
    _ipAddress: string,
    _userAgent: string,
  ): Promise<ServiceResult<{ cooldownSeconds: number }>> {
    throw new Error('Method not implemented.');
  }

  async resendVerificationSms(
    _userId: string,
    _method: 'sms' | 'whatsapp',
    _ipAddress: string,
    _userAgent: string,
  ): Promise<ServiceResult<{ cooldownSeconds: number; maskedPhone: string }>> {
    throw new Error('Method not implemented.');
  }

  async validateToken(
    _token: string,
    _tokenTypeHint?: 'access_token' | 'refresh_token',
  ): Promise<TokenValidationResult> {
    throw new Error('Method not implemented.');
  }

  async revokeRefreshToken(
    _token: string,
    _userId: string,
    _ipAddress: string,
  ): Promise<ServiceResult<{ revoked: boolean }>> {
    throw new Error('Method not implemented.');
  }

  async changePassword(
    _userId: string,
    _currentPassword: string,
    _newPassword: string,
    _ipAddress: string,
    _userAgent: string,
    _logoutOtherDevices?: boolean,
  ): Promise<ServiceResult<{ passwordChanged: boolean; sessionsRevoked?: number; newSessionId?: string }>> {
    throw new Error('Method not implemented.');
  }

  async forgotPasswordByPhone(
    _phoneNumber: string,
    _method: 'sms' | 'whatsapp',
    _ipAddress: string,
    _userAgent: string,
  ): Promise<ServiceResult<{ cooldownSeconds: number; maskedPhone: string; sessionId: string }>> {
    throw new Error('Method not implemented.');
  }

  async resetPasswordWithOtp(
    _phoneNumber: string,
    _otpCode: string,
    _newPassword: string,
    _sessionId: string,
    _ipAddress: string,
    _userAgent: string,
  ): Promise<ServiceResult<{ passwordReset: boolean }>> {
    throw new Error('Method not implemented.');
  }

  async verifyMfaSetup(
    _userId: string,
    _methodId: string,
    _code: string,
    _ipAddress: string,
    _userAgent: string,
  ): Promise<ServiceResult<{ methodId: string; isPrimary: boolean }>> {
    throw new Error('Method not implemented.');
  }

  async regenerateBackupCodes(
    _userId: string,
    _ipAddress: string,
    _userAgent: string,
  ): Promise<ServiceResult<{ backupCodes: string[]; remainingCount: number }>> {
    throw new Error('Method not implemented.');
  }

  async bulkLogout(
    _userIds: string[],
    _adminId: string,
    _reason: string,
    _ipAddress: string,
  ): Promise<ServiceResult<{ totalUsers: number; successfulCount: number; failedCount: number; totalSessionsRevoked: number; failures?: Record<string, string> }>> {
    throw new Error('Method not implemented.');
  }

  async bulkForcePasswordReset(
    _userIds: string[],
    _adminId: string,
    _reason: string,
    _ipAddress: string,
  ): Promise<ServiceResult<{ totalUsers: number; successfulCount: number; failedCount: number; failures?: Record<string, string> }>> {
    throw new Error('Method not implemented.');
  }

  // ============================================================
  // PRIVATE HELPERS
  // ============================================================

  private async recordFailedAttempt(
    email: string,
    ipAddress: string,
    reason: string,
  ): Promise<void> {
    // ✅ FIX: LoginAttemptRepository.create() expects correct types
    await this.loginAttemptRepository.create({
      email,
      ipAddress,
      userAgent: '',
      status: 'failed',
      failureReason: reason,
      metadata: {},
    });

    const attempts = await this.loginAttemptRepository.countFailedByEmail(email, 3600);
    if (attempts >= 5) {
      const user = await this.userRepository.findByEmail(
        new Email(email, this.emailValidator),
      );
      if (user) {
        await this.accountLockRepository.lock(
          user.id,
          'Too many failed login attempts',
          3600,
        );
      }
    }
  }

  private async sendWelcomeEmail(user: User, correlationId: string): Promise<void> {
    try {
      await this.notificationSender.sendEmail({
        to: user.getEmail().getValue(),
        subject: 'Welcome to Vubon.com.bd!',
        html: `
          <h1>Welcome ${user.getFullName()}!</h1>
          <p>Thank you for registering with Vubon.com.bd.</p>
          <p>Best regards,<br>Vubon.com.bd Team</p>
        `,
        text: `Welcome ${user.getFullName()}!\n\nThank you for registering with Vubon.com.bd.\n\nBest regards,\nVubon.com.bd Team`,
        correlationId,
      });
    } catch (error) {
      const err = error as Error;
      this.logger.warn(`Failed to send welcome email: ${err.message}`);
    }
  }
}
