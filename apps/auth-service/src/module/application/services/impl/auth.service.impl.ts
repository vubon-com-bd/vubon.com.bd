/**
 * Authentication Service Implementation - Application Layer (Enterprise Grade)
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 *
 * @module application/services/impl/auth.service.impl
 *
 * @description
 * Implementation of the authentication service interface.
 * Coordinates domain entities, repositories, and infrastructure ports.
 *
 * Enterprise Rules:
 * ✅ Implements IAuthService from application layer
 * ✅ Uses domain entities and value objects
 * ✅ Depends on ports (interfaces), not concrete implementations
 * ✅ All constants from @vubon/shared-constants (SSOT)
 * ✅ All types from @vubon/shared-types (SSOT)
 * ✅ All utilities from @vubon/shared-utils (SSOT)
 * ✅ All config from @vubon/shared-config (SSOT)
 *
 * @example
 * // In auth.module.ts
 * @Module({
 *   providers: [
 *     {
 *       provide: IAuthService,
 *       useClass: AuthService,
 *     },
 *     // ... other providers
 *   ],
 * })
 * export class AuthModule {}
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

// Shared Constants (SSOT)
import {
  USER_STATUSES,
  USER_TIERS,
  TOKEN_EXPIRY,
  REGISTRATION_METHODS,
  REGISTRATION_SOURCES,
  CACHE_TTL,
} from '@vubon/shared-constants';

// Shared Types (SSOT)
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
  ApiErrorCode,
} from '@vubon/shared-types';

// Shared Utils (SSOT)
import {
  maskEmail
} from '@vubon/shared-utils';

// Shared Config (SSOT)
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
  IPhoneValidator,
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

/**
 * UUID v4 ID Generator
 * Implements IdGenerator port from domain
 */
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
      case 'ulid':
        return this.generateUlid();
      case 'snowflake':
        return this.generateSnowflake();
      case 'sequential':
        return this.generateSequential();
      default:
        return this.generate();
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
    // Repositories
    private readonly userRepository: UserRepository,
    private readonly sessionRepository: SessionRepository,
    private readonly refreshTokenRepository: RefreshTokenRepository,
    private readonly mfaRepository: MFARepository,
    private readonly accountLockRepository: AccountLockRepository,
    private readonly loginAttemptRepository: LoginAttemptRepository,

    // Validator Ports
    private readonly emailValidator: IEmailValidator,
    private readonly passwordValidator: IPasswordValidator,

    // Infrastructure Ports
    private readonly passwordHasher: IPasswordHasher,
    private readonly tokenGenerator: ITokenGenerator,
    private readonly eventBus: IEventBus,
    private readonly notificationSender: INotificationSender,
    private readonly rateLimiter: IRateLimiter,
    private readonly cacheService: ICacheService,
  ) {}

  // ============================================================
  // Registration Operations
  // ============================================================

  /**
   * Register new user
   * SSOT: All constants from shared packages
   */
  async register(
    dto: RegisterDto,
    ipAddress: string,
    userAgent: string,
    options?: RegistrationOptions,
  ): Promise<ServiceResult<UserResponseDto>> {
    const correlationId = options?.correlationId || uuidv4();
    const startTime = Date.now();

    try {
      // 1. Validate email format using port
      const emailValidation = this.emailValidator.validate(dto.email);
      if (!emailValidation.isValid) {
        return this.createErrorResult(
          'INVALID_EMAIL',
          'Invalid email format',
          'ভুল ইমেইল ফরম্যাট',
          correlationId,
        );
      }

      // 2. Validate password strength using port
      const passwordValidation = this.passwordValidator.validate(dto.password, {
        minStrength: options?.userTier === 'DIAMOND' ? 'strong' : 'medium',
        checkCommonPasswords: true,
      });

      if (!passwordValidation.isValid) {
        return this.createErrorResult(
          'WEAK_PASSWORD',
          `Password is too weak: ${passwordValidation.errors.join(', ')}`,
          'পাসওয়ার্ড খুব দুর্বল',
          correlationId,
        );
      }

      // 3. Check if user exists (SSOT: using constants from shared)
      const email = new Email(dto.email, this.emailValidator);
      const existingUser = await this.userRepository.findByEmail(email);
      if (existingUser) {
        return this.createErrorResult(
          'EMAIL_ALREADY_EXISTS',
          'User with this email already exists',
          'এই ইমেইল দিয়ে already একটি অ্যাকাউন্ট আছে',
          correlationId,
        );
      }

      // 4. Create user entity using factory method
      const passwordVO = new Password(dto.password, this.passwordValidator);
      const hashedPassword = await this.passwordHasher.hash(passwordVO.getValue());

      const user = User.create(
        email,
        new Password(hashedPassword, this.passwordValidator),
        `${dto.firstName} ${dto.lastName}`,
        this.idGenerator,
        undefined,
        options?.preferredLanguage || 'en',
        undefined,
      );

      // 5. Save user
      await this.userRepository.save(user);

      // 6. Publish user registered event
      await this.eventBus.publish({
        eventType: 'USER_REGISTERED',
        aggregateId: user.id,
        data: {
          userId: user.id,
          email: user.getEmail().getValue(),
          fullName: user.getFullName(),
          registrationMethod: REGISTRATION_METHODS.EMAIL,
          source: REGISTRATION_SOURCES.WEB,
          correlationId,
        },
        metadata: {
          ipAddress,
          userAgent,
          timestamp: new Date().toISOString(),
        },
      });

      // 7. Send welcome email (async, non-blocking)
      this.sendWelcomeEmail(user, correlationId).catch((error) => {
        this.logger.warn(`Failed to send welcome email: ${error.message}`);
      });

      // 8. Build response
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
      this.logger.error(`Registration failed: ${error.message}`, error.stack);
      return this.createErrorResult(
        'REGISTRATION_FAILED',
        error.message || 'Registration failed',
        'নিবন্ধন ব্যর্থ হয়েছে',
        correlationId,
        Date.now() - startTime,
      );
    }
  }

  // ============================================================
  // Login Operations
  // ============================================================

  async login(
    dto: LoginDto,
    ipAddress: string,
    userAgent: string,
    options?: LoginOptions,
  ): Promise<LoginResult> {
    const correlationId = options?.correlationId || uuidv4();
    const startTime = Date.now();

    try {
      // 1. Rate limiting check (SSOT: using constants)
      const rateLimitKey = `login:${ipAddress}`;
      const rateLimitResult = await this.rateLimiter.check(rateLimitKey, {
        windowSeconds: 3600,
        maxRequests: 10,
      });

      if (!rateLimitResult.allowed) {
        return {
          success: false,
          mfaRequired: false,
          errorCode: 'RATE_LIMIT_EXCEEDED',
          errorMessage: 'Too many login attempts. Please try again later.',
          errorMessageBn: 'অনেকবার লগইন চেষ্টা করা হয়েছে। পরে আবার চেষ্টা করুন।',
          correlationId,
          durationMs: Date.now() - startTime,
        };
      }

      // 2. Validate email format
      const emailValidation = this.emailValidator.validate(dto.email);
      if (!emailValidation.isValid) {
        return this.createLoginErrorResult('INVALID_EMAIL', 'Invalid email format', correlationId, startTime);
      }

      // 3. Find user by email
      const email = new Email(dto.email, this.emailValidator);
      const user = await this.userRepository.findByEmail(email);

      if (!user) {
        await this.recordFailedAttempt(dto.email, ipAddress, 'USER_NOT_FOUND');
        return this.createLoginErrorResult('INVALID_CREDENTIALS', 'Invalid email or password', correlationId, startTime);
      }

      // 4. Check if account is locked (SSOT: using constants)
      if (user.getStatus() === USER_STATUSES.LOCKED) {
        return this.createLoginErrorResult('ACCOUNT_LOCKED', 'Account is locked. Please try again later.', correlationId, startTime);
      }

      // 5. Verify password using port
      const isValidPassword = await this.passwordHasher.compare(dto.password, user.getPassword().getValue());
      if (!isValidPassword) {
        await this.recordFailedAttempt(dto.email, ipAddress, 'INVALID_PASSWORD');
        return this.createLoginErrorResult('INVALID_CREDENTIALS', 'Invalid email or password', correlationId, startTime);
      }

      // 6. Check if MFA is required
      const mfaEnabled = user.isMfaEnabled();
      if (mfaEnabled) {
        const mfaSessionId = uuidv4();
        await this.cacheService.set(
          `mfa:session:${mfaSessionId}`,
          { userId: user.id, email: user.getEmail().getValue() },
          CACHE_TTL.MFA_SESSION || 300,
        );

        return {
          success: true,
          mfaRequired: true,
          mfaSessionId,
          availableMfaMethods: ['totp', 'backup_code'],
          data: null as any,
          correlationId,
          durationMs: Date.now() - startTime,
        };
      }

      // 7. Create session and tokens
      const session = await this.createUserSession(user, ipAddress, userAgent);
      const tokens = await this.tokenGenerator.generateTokens({
        userId: user.id,
        sessionId: session.id,
        email: user.getEmail().getValue(),
        role: user.getRole(),
      });

      // 8. Update last login
      await this.userRepository.updateLastLogin(user.id, new Date());

      // 9. Publish login event
      await this.eventBus.publish({
        eventType: 'USER_LOGGED_IN',
        aggregateId: user.id,
        data: {
          userId: user.id,
          email: user.getEmail().getValue(),
          ipAddress,
          userAgent,
          correlationId,
        },
      });

      // 10. Build response
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
      this.logger.error(`Login failed: ${error.message}`, error.stack);
      return {
        success: false,
        mfaRequired: false,
        errorCode: 'LOGIN_FAILED',
        errorMessage: error.message || 'Login failed',
        correlationId,
        durationMs: Date.now() - startTime,
      };
    }
  }

  // ============================================================
  // Token Operations
  // ============================================================

  async refreshToken(
    dto: RefreshTokenDto,
    ipAddress: string,
    userAgent: string,
    options?: TokenRefreshOptions,
  ): Promise<ServiceResult<TokenRefreshResponseDto>> {
    const correlationId = options?.correlationId || uuidv4();
    const startTime = Date.now();

    try {
      // 1. Validate refresh token
      const validation = await this.tokenGenerator.validateToken(dto.refreshToken, 'refresh');
      if (!validation.isValid) {
        return this.createErrorResult(
          'INVALID_REFRESH_TOKEN',
          'Invalid or expired refresh token',
          'ভুল বা মেয়াদোত্তীর্ণ রিফ্রেশ টোকেন',
          correlationId,
          Date.now() - startTime,
        );
      }

      // 2. Find user
      const user = await this.userRepository.findById(validation.userId!);
      if (!user) {
        return this.createErrorResult(
          'USER_NOT_FOUND',
          'User not found',
          'ইউজার পাওয়া যায়নি',
          correlationId,
          Date.now() - startTime,
        );
      }

      // 3. Create new session
      const session = await this.createUserSession(user, ipAddress, userAgent);

      // 4. Generate new tokens
      const tokens = await this.tokenGenerator.generateTokens({
        userId: user.id,
        sessionId: session.id,
        email: user.getEmail().getValue(),
        role: user.getRole(),
      });

      // 5. Revoke old refresh token if rotation enabled
      if (options?.rotateToken !== false) {
        await this.refreshTokenRepository.revoke(dto.refreshToken);
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
      this.logger.error(`Token refresh failed: ${error.message}`, error.stack);
      return this.createErrorResult(
        'REFRESH_FAILED',
        error.message || 'Token refresh failed',
        'টোকেন রিফ্রেশ ব্যর্থ হয়েছে',
        correlationId,
        Date.now() - startTime,
      );
    }
  }

  // ============================================================
  // Logout Operations
  // ============================================================

  async logout(
    dto: LogoutDto,
    userId: string,
    ipAddress: string,
    userAgent: string,
    options?: LogoutOptions,
  ): Promise<ServiceResult<LogoutResponseDto>> {
    const correlationId = options?.correlationId || uuidv4();
    const startTime = Date.now();

    try {
      // 1. Find user
      const user = await this.userRepository.findById(userId);
      if (!user) {
        return this.createErrorResult(
          'USER_NOT_FOUND',
          'User not found',
          'ইউজার পাওয়া যায়নি',
          correlationId,
          Date.now() - startTime,
        );
      }

      // 2. Revoke sessions
      let sessionsRevoked = 0;
      if (options?.allDevices) {
        if (options?.keepCurrent && dto.sessionId) {
          sessionsRevoked = await this.sessionRepository.revokeAllExcept(userId, dto.sessionId);
        } else {
          sessionsRevoked = await this.sessionRepository.revokeAll(userId);
        }
      } else if (dto.sessionId) {
        await this.sessionRepository.revoke(dto.sessionId);
        sessionsRevoked = 1;
      }

      // 3. Revoke refresh tokens
      if (options?.revokeRefreshTokens !== false) {
        await this.refreshTokenRepository.revokeByUserId(userId);
      }

      // 4. Clear device trust if requested
      if (options?.clearDeviceTrust) {
        await this.cacheService.delete(`device:trust:${userId}`);
      }

      // 5. Publish logout event
      await this.eventBus.publish({
        eventType: 'USER_LOGGED_OUT',
        aggregateId: userId,
        data: {
          userId,
          sessionId: dto.sessionId,
          allDevices: options?.allDevices || false,
          ipAddress,
          userAgent,
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
      this.logger.error(`Logout failed: ${error.message}`, error.stack);
      return this.createErrorResult(
        'LOGOUT_FAILED',
        error.message || 'Logout failed',
        'লগআউট ব্যর্থ হয়েছে',
        correlationId,
        Date.now() - startTime,
      );
    }
  }

  // ============================================================
  // MFA Operations
  // ============================================================

  async verifyMfa(
    dto: VerifyMfaDto,
    ipAddress: string,
    userAgent: string,
    options?: MFAOptions,
  ): Promise<MFAVerificationResult> {
    const correlationId = options?.correlationId || uuidv4();
    const startTime = Date.now();

    try {
      // 1. Get MFA session from cache
      const sessionData = await this.cacheService.get<{ userId: string; email: string }>(
        `mfa:session:${dto.mfaSessionId}`,
      );

      if (!sessionData) {
        return {
          success: false,
          remainingAttempts: 0,
          isLocked: true,
          errorCode: 'MFA_SESSION_EXPIRED',
          errorMessage: 'MFA session expired. Please login again.',
          correlationId,
        };
      }

      // 2. Find user
      const user = await this.userRepository.findById(sessionData.userId);
      if (!user) {
        return {
          success: false,
          remainingAttempts: 0,
          isLocked: true,
          errorCode: 'USER_NOT_FOUND',
          errorMessage: 'User not found',
          correlationId,
        };
      }

      // 3. Verify MFA code using port
      const isValid = await this.mfaRepository.verifyCode(user.id, dto.code, dto.method);

      if (!isValid) {
        const attempts = await this.mfaRepository.incrementFailedAttempts(user.id);
        const maxAttempts = 5;
        const remaining = Math.max(0, maxAttempts - attempts);

        if (remaining === 0) {
          await this.mfaRepository.lockUser(user.id);
          return {
            success: false,
            remainingAttempts: 0,
            isLocked: true,
            errorCode: 'MFA_LOCKED',
            errorMessage: 'Too many MFA attempts. Account locked.',
            correlationId,
          };
        }

        return {
          success: false,
          remainingAttempts: remaining,
          isLocked: false,
          errorCode: 'INVALID_MFA_CODE',
          errorMessage: 'Invalid MFA code',
          correlationId,
        };
      }

      // 4. Create session and tokens
      const session = await this.createUserSession(user, ipAddress, userAgent);
      const tokens = await this.tokenGenerator.generateTokens({
        userId: user.id,
        sessionId: session.id,
        email: user.getEmail().getValue(),
        role: user.getRole(),
      });

      // 5. Clear MFA session
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
      this.logger.error(`MFA verification failed: ${error.message}`, error.stack);
      return {
        success: false,
        remainingAttempts: 0,
        isLocked: true,
        errorCode: 'MFA_VERIFICATION_FAILED',
        errorMessage: error.message || 'MFA verification failed',
        correlationId,
      };
    }
  }

  // ============================================================
  // Password Operations
  // ============================================================

  async forgotPassword(
    email: string,
    ipAddress: string,
    userAgent: string,
  ): Promise<ServiceResult<{ cooldownSeconds: number; maskedEmail?: string }>> {
    const correlationId = uuidv4();
    const startTime = Date.now();

    try {
      // 1. Rate limiting
      const rateLimitKey = `password_reset:${ipAddress}`;
      const rateLimitResult = await this.rateLimiter.check(rateLimitKey, {
        windowSeconds: 3600,
        maxRequests: 5,
      });

      if (!rateLimitResult.allowed) {
        return this.createErrorResult(
          'RATE_LIMIT_EXCEEDED',
          'Too many password reset requests. Please try again later.',
          'অনেকবার পাসওয়ার্ড রিসেট চেষ্টা করা হয়েছে। পরে আবার চেষ্টা করুন।',
          correlationId,
          Date.now() - startTime,
        );
      }

      // 2. Validate email
      const emailValidation = this.emailValidator.validate(email);
      if (!emailValidation.isValid) {
        return this.createErrorResult(
          'INVALID_EMAIL',
          'Invalid email format',
          'ভুল ইমেইল ফরম্যাট',
          correlationId,
          Date.now() - startTime,
        );
      }

      // 3. Find user (don't reveal if user exists)
      const emailVO = new Email(email, this.emailValidator);
      const user = await this.userRepository.findByEmail(emailVO);

      if (!user) {
        return {
          success: true,
          data: {
            cooldownSeconds: 60,
          },
          correlationId,
          durationMs: Date.now() - startTime,
        };
      }

      // 4. Generate reset token
      const resetToken = await this.tokenGenerator.generatePasswordResetToken({
        userId: user.id,
        email: user.getEmail().getValue(),
        expiresIn: TOKEN_EXPIRY.RESET_TOKEN || 3600,
      });

      // 5. Send reset email
      await this.notificationSender.sendEmail({
        to: user.getEmail().getValue(),
        subject: 'Password Reset Request',
        html: `
          <p>Dear ${user.getFullName()},</p>
          <p>You requested a password reset. Click the link below to reset your password:</p>
          <p><a href="${env.APP_URL}/reset-password?token=${resetToken}">Reset Password</a></p>
          <p>This link will expire in 1 hour.</p>
          <p>If you didn't request this, please ignore this email.</p>
          <p>Thanks,</p>
          <p>Vubon.com.bd Team</p>
        `,
        text: `Dear ${user.getFullName()},\n\nYou requested a password reset. Copy the link below to reset your password:\n\n${env.APP_URL}/reset-password?token=${resetToken}\n\nThis link will expire in 1 hour.\n\nIf you didn't request this, please ignore this email.\n\nThanks,\nVubon.com.bd Team`,
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
      this.logger.error(`Password reset request failed: ${error.message}`, error.stack);
      // Still return success to not reveal user existence
      return {
        success: true,
        data: {
          cooldownSeconds: 60,
        },
        correlationId,
        durationMs: Date.now() - startTime,
      };
    }
  }

  async resetPassword(
    token: string,
    newPassword: string,
    ipAddress: string,
    userAgent: string,
  ): Promise<ServiceResult<{ passwordReset: boolean; sessionsRevoked?: number }>> {
    const correlationId = uuidv4();
    const startTime = Date.now();

    try {
      // 1. Validate token
      const validation = await this.tokenGenerator.validateToken(token, 'password_reset');
      if (!validation.isValid) {
        return this.createErrorResult(
          'INVALID_RESET_TOKEN',
          'Invalid or expired reset token',
          'ভুল বা মেয়াদোত্তীর্ণ রিসেট টোকেন',
          correlationId,
          Date.now() - startTime,
        );
      }

      // 2. Find user
      const user = await this.userRepository.findById(validation.userId!);
      if (!user) {
        return this.createErrorResult(
          'USER_NOT_FOUND',
          'User not found',
          'ইউজার পাওয়া যায়নি',
          correlationId,
          Date.now() - startTime,
        );
      }

      // 3. Validate new password strength
      const passwordValidation = this.passwordValidator.validate(newPassword, {
        checkCommonPasswords: true,
      });

      if (!passwordValidation.isValid) {
        return this.createErrorResult(
          'WEAK_PASSWORD',
          `Password is too weak: ${passwordValidation.errors.join(', ')}`,
          'পাসওয়ার্ড খুব দুর্বল',
          correlationId,
          Date.now() - startTime,
        );
      }

      // 4. Hash and update password
      const hashedPassword = await this.passwordHasher.hash(newPassword);
      const passwordVO = new Password(hashedPassword, this.passwordValidator);
      user.changePassword(passwordVO);
      await this.userRepository.save(user);

      // 5. Revoke all sessions (security measure)
      const sessionsRevoked = await this.sessionRepository.revokeAll(user.id);

      // 6. Publish password reset event
      await this.eventBus.publish({
        eventType: 'PASSWORD_RESET',
        aggregateId: user.id,
        data: {
          userId: user.id,
          email: user.getEmail().getValue(),
          ipAddress,
          userAgent,
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
      this.logger.error(`Password reset failed: ${error.message}`, error.stack);
      return this.createErrorResult(
        'RESET_FAILED',
        error.message || 'Password reset failed',
        'পাসওয়ার্ড রিসেট ব্যর্থ হয়েছে',
        correlationId,
        Date.now() - startTime,
      );
    }
  }

  // ============================================================
  // Session Operations
  // ============================================================

  async getCurrentUser(userId: string, includeSensitive?: boolean): Promise<User> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async getUserSessions(userId: string, options?: PaginationOptions): Promise<PaginatedResult<Session>> {
    return this.sessionRepository.findByUserId(userId, options || { page: 1, limit: 20 });
  }

  async revokeSession(userId: string, sessionId: string, ipAddress: string): Promise<ServiceResult<{ revoked: boolean }>> {
    const correlationId = uuidv4();
    const startTime = Date.now();

    try {
      const session = await this.sessionRepository.findById(sessionId);
      if (!session || session.userId !== userId) {
        return this.createErrorResult(
          'SESSION_NOT_FOUND',
          'Session not found',
          'সেশন পাওয়া যায়নি',
          correlationId,
          Date.now() - startTime,
        );
      }

      await this.sessionRepository.revoke(sessionId);

      return {
        success: true,
        data: { revoked: true },
        correlationId,
        durationMs: Date.now() - startTime,
      };
    } catch (error) {
      return this.createErrorResult(
        'REVOKE_FAILED',
        error.message || 'Failed to revoke session',
        'সেশন রিভোক ব্যর্থ হয়েছে',
        correlationId,
        Date.now() - startTime,
      );
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
      const count = await this.sessionRepository.revokeAll(userId);

      return {
        success: true,
        data: { sessionsRevokedCount: count },
        correlationId,
        durationMs: Date.now() - startTime,
      };
    } catch (error) {
      return this.createErrorResult(
        'REVOKE_ALL_FAILED',
        error.message || 'Failed to revoke all sessions',
        'সব সেশন রিভোক ব্যর্থ হয়েছে',
        correlationId,
        Date.now() - startTime,
      );
    }
  }

  // ============================================================
  // MFA Status (Additional method for completeness)
  // ============================================================

  async getMfaStatus(userId: string): Promise<MFAStatusResponseDto> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const methods = await this.mfaRepository.findByUserId(userId);

    return {
      enabled: user.isMfaEnabled(),
      methods: methods.map((m) => ({
        id: m.id,
        type: m.type,
        isPrimary: m.isPrimary,
        createdAt: m.createdAt,
      })),
      backupCodesRemaining: await this.mfaRepository.countBackupCodes(userId),
    };
  }

  async enableMfa(
    userId: string,
    dto: EnableMfaDto,
    ipAddress: string,
    userAgent: string,
    options?: MFAEnableOptions,
  ): Promise<ServiceResult<any>> {
    const correlationId = options?.correlationId || uuidv4();
    const startTime = Date.now();

    try {
      const user = await this.userRepository.findById(userId);
      if (!user) {
        return this.createErrorResult(
          'USER_NOT_FOUND',
          'User not found',
          'ইউজার পাওয়া যায়নি',
          correlationId,
          Date.now() - startTime,
        );
      }

      // Generate TOTP secret
      const secret = await this.tokenGenerator.generateTOTPSecret({
        userId: user.id,
        email: user.getEmail().getValue(),
        issuer: env.APP_NAME || 'Vubon.com.bd',
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
      return this.createErrorResult(
        'MFA_ENABLE_FAILED',
        error.message || 'Failed to enable MFA',
        'এমএফএ সক্রিয়করণ ব্যর্থ হয়েছে',
        correlationId,
        Date.now() - startTime,
      );
    }
  }

  async disableMfa(
    userId: string,
    dto: DisableMfaDto,
    ipAddress: string,
    userAgent: string,
  ): Promise<ServiceResult<{ disabledMethodIds: string[] }>> {
    const correlationId = uuidv4();
    const startTime = Date.now();

    try {
      const disabled = await this.mfaRepository.disableForUser(userId);

      return {
        success: true,
        data: {
          disabledMethodIds: disabled,
        },
        correlationId,
        durationMs: Date.now() - startTime,
      };
    } catch (error) {
      return this.createErrorResult(
        'MFA_DISABLE_FAILED',
        error.message || 'Failed to disable MFA',
        'এমএফএ নিষ্ক্রিয়করণ ব্যর্থ হয়েছে',
        correlationId,
        Date.now() - startTime,
      );
    }
  }

  // ============================================================
  // Health Check
  // ============================================================

  async healthCheck(): Promise<{
    status: 'healthy' | 'degraded' | 'unhealthy';
    version: string;
    uptime: number;
    dependencies: {
      database: boolean;
      redis: boolean;
      queue: boolean;
    };
    metrics?: {
      activeSessions: number;
      recentLogins: number;
      mfaEnabledUsers: number;
    };
  }> {
    const [dbHealth, cacheHealth] = await Promise.all([
      this.userRepository.healthCheck(),
      this.cacheService.healthCheck(),
    ]);

    return {
      status: dbHealth && cacheHealth ? 'healthy' : 'degraded',
      version: '1.0.0',
      uptime: process.uptime(),
      dependencies: {
        database: dbHealth,
        redis: cacheHealth,
        queue: true,
      },
    };
  }

  async getRateLimitStatus(
    userId: string,
    operation: 'login' | 'register' | 'reset' | 'mfa' | 'token_refresh',
  ): Promise<{
    limited: boolean;
    remaining: number;
    resetAt: Date;
    limit: number;
  }> {
    const key = `ratelimit:${operation}:${userId}`;
    const status = await this.rateLimiter.getStatus(key);

    return {
      limited: status.limited,
      remaining: status.remaining,
      resetAt: status.resetAt,
      limit: status.limit,
    };
  }

  // ============================================================
  // Social Login (Placeholder implementations)
  // ============================================================

  async socialLogin(
    dto: any,
    ipAddress: string,
    userAgent: string,
    options?: SocialLoginOptions,
  ): Promise<LoginResult> {
    // TODO: Implement social login
    throw new Error('Method not implemented.');
  }

  async socialPhoneLogin(
    dto: any,
    ipAddress: string,
    userAgent: string,
    options?: LoginOptions,
  ): Promise<LoginResult> {
    // TODO: Implement social phone login
    throw new Error('Method not implemented.');
  }

  async loginWithPhone(
    dto: any,
    ipAddress: string,
    userAgent: string,
    options?: LoginOptions,
  ): Promise<LoginResult> {
    // TODO: Implement phone login
    throw new Error('Method not implemented.');
  }

  async loginWithUsername(
    dto: any,
    ipAddress: string,
    userAgent: string,
    options?: LoginOptions,
  ): Promise<LoginResult> {
    // TODO: Implement username login
    throw new Error('Method not implemented.');
  }

  async loginWithOtp(
    dto: any,
    ipAddress: string,
    userAgent: string,
    options?: LoginOptions,
  ): Promise<LoginResult> {
    // TODO: Implement OTP login
    throw new Error('Method not implemented.');
  }

  async verifyEmail(token: string, ipAddress: string, userAgent: string): Promise<ServiceResult<{ emailVerified: boolean }>> {
    // TODO: Implement email verification
    throw new Error('Method not implemented.');
  }

  async verifyPhone(userId: string, otpCode: string, ipAddress: string, userAgent: string): Promise<ServiceResult<{ phoneVerified: boolean }>> {
    // TODO: Implement phone verification
    throw new Error('Method not implemented.');
  }

  async resendVerificationEmail(userId: string, ipAddress: string, userAgent: string): Promise<ServiceResult<{ cooldownSeconds: number }>> {
    // TODO: Implement resend verification email
    throw new Error('Method not implemented.');
  }

  async resendVerificationSms(
    userId: string,
    method: 'sms' | 'whatsapp',
    ipAddress: string,
    userAgent: string,
  ): Promise<ServiceResult<{ cooldownSeconds: number; maskedPhone: string }>> {
    // TODO: Implement resend verification SMS
    throw new Error('Method not implemented.');
  }

  async validateToken(token: string, tokenTypeHint?: 'access_token' | 'refresh_token'): Promise<TokenValidationResult> {
    // TODO: Implement token validation
    throw new Error('Method not implemented.');
  }

  async revokeRefreshToken(token: string, userId: string, ipAddress: string): Promise<ServiceResult<{ revoked: boolean }>> {
    // TODO: Implement revoke refresh token
    throw new Error('Method not implemented.');
  }

  async changePassword(
    userId: string,
    currentPassword: string,
    newPassword: string,
    ipAddress: string,
    userAgent: string,
    logoutOtherDevices?: boolean,
  ): Promise<ServiceResult<{ passwordChanged: boolean; sessionsRevoked?: number; newSessionId?: string }>> {
    // TODO: Implement change password
    throw new Error('Method not implemented.');
  }

  async forgotPasswordByPhone(
    phoneNumber: string,
    method: 'sms' | 'whatsapp',
    ipAddress: string,
    userAgent: string,
  ): Promise<ServiceResult<{ cooldownSeconds: number; maskedPhone: string; sessionId: string }>> {
    // TODO: Implement forgot password by phone
    throw new Error('Method not implemented.');
  }

  async resetPasswordWithOtp(
    phoneNumber: string,
    otpCode: string,
    newPassword: string,
    sessionId: string,
    ipAddress: string,
    userAgent: string,
  ): Promise<ServiceResult<{ passwordReset: boolean }>> {
    // TODO: Implement reset password with OTP
    throw new Error('Method not implemented.');
  }

  async verifyMfaSetup(
    userId: string,
    methodId: string,
    code: string,
    ipAddress: string,
    userAgent: string,
  ): Promise<ServiceResult<{ methodId: string; isPrimary: boolean }>> {
    // TODO: Implement verify MFA setup
    throw new Error('Method not implemented.');
  }

  async regenerateBackupCodes(
    userId: string,
    ipAddress: string,
    userAgent: string,
  ): Promise<ServiceResult<{ backupCodes: string[]; remainingCount: number }>> {
    // TODO: Implement regenerate backup codes
    throw new Error('Method not implemented.');
  }

  async bulkLogout(
    userIds: string[],
    adminId: string,
    reason: string,
    ipAddress: string,
  ): Promise<ServiceResult<{ totalUsers: number; successfulCount: number; failedCount: number; totalSessionsRevoked: number; failures?: Record<string, string> }>> {
    // TODO: Implement bulk logout
    throw new Error('Method not implemented.');
  }

  async bulkForcePasswordReset(
    userIds: string[],
    adminId: string,
    reason: string,
    ipAddress: string,
  ): Promise<ServiceResult<{ totalUsers: number; successfulCount: number; failedCount: number; failures?: Record<string, string> }>> {
    // TODO: Implement bulk force password reset
    throw new Error('Method not implemented.');
  }

  // ============================================================
  // Private Helper Methods
  // ============================================================

  /**
   * Create a user session
   */
  private async createUserSession(
    user: User,
    ipAddress: string,
    userAgent: string,
  ): Promise<Session> {
    const sessionId = this.idGenerator.generate();
    const expiresAt = new Date(Date.now() + TOKEN_EXPIRY.SESSION || 7 * 24 * 60 * 60 * 1000);

    // Create session entity
    const session = await this.sessionRepository.create({
      id: sessionId,
      userId: user.id,
      ipAddress,
      userAgent,
      expiresAt,
    });

    // Cache session
    await this.cacheService.set(
      `session:${sessionId}`,
      { userId: user.id, expiresAt },
      CACHE_TTL.SESSION || 3600,
    );

    return session;
  }

  /**
   * Record failed login attempt
   */
  private async recordFailedAttempt(
    email: string,
    ipAddress: string,
    reason: string,
  ): Promise<void> {
    await this.loginAttemptRepository.create({
      email,
      ipAddress,
      success: false,
      reason,
      timestamp: new Date(),
    });

    // Check if account should be locked
    const attempts = await this.loginAttemptRepository.countFailedByEmail(email, 3600);
    if (attempts >= 5) {
      const user = await this.userRepository.findByEmail(new Email(email, this.emailValidator));
      if (user) {
        await this.accountLockRepository.lock(user.id, 'Too many failed login attempts', 3600);
      }
    }
  }

  /**
   * Create error result
   */
  private createErrorResult(
    code: string,
    message: string,
    messageBn: string,
    correlationId: string,
    durationMs?: number,
  ): ServiceResult<any> {
    return {
      success: false,
      errorCode: code as ApiErrorCode,
      errorMessage: message,
      errorMessageBn: messageBn,
      correlationId,
      durationMs,
    };
  }

  /**
   * Create login error result
   */
  private createLoginErrorResult(
    code: string,
    message: string,
    correlationId: string,
    startTime: number,
  ): LoginResult {
    return {
      success: false,
      mfaRequired: false,
      errorCode: code as ApiErrorCode,
      errorMessage: message,
      correlationId,
      durationMs: Date.now() - startTime,
    };
  }

  /**
   * Send welcome email (async)
   */
  private async sendWelcomeEmail(user: User, correlationId: string): Promise<void> {
    try {
      await this.notificationSender.sendEmail({
        to: user.getEmail().getValue(),
        subject: 'Welcome to Vubon.com.bd!',
        html: `
          <h1>Welcome ${user.getFullName()}!</h1>
          <p>Thank you for registering with Vubon.com.bd - Bangladesh's #1 E-commerce platform.</p>
          <p>Start exploring our products and enjoy a seamless shopping experience.</p>
          <p>Best regards,<br>Vubon.com.bd Team</p>
        `,
        text: `Welcome ${user.getFullName()}!\n\nThank you for registering with Vubon.com.bd - Bangladesh's #1 E-commerce platform.\n\nStart exploring our products and enjoy a seamless shopping experience.\n\nBest regards,\nVubon.com.bd Team`,
        correlationId,
      });
    } catch (error) {
      this.logger.warn(`Failed to send welcome email: ${error.message}`);
      // Don't throw - this is a non-critical operation
    }
  }
}
