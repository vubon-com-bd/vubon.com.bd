/**
 * Auth Service Implementation - Application Layer
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module application/services/impl/auth.service.impl
 * 
 * @description
 * Orchestrates authentication use cases.
 * NO business logic - coordinates domain entities, repositories, and infrastructure.
 * 
 * Enterprise Rules:
 * ✅ Use-case orchestration only
 * ✅ Repository coordination
 * ✅ Event publishing
 * ✅ DTO mapping
 * ✅ Transaction management
 * ✅ Bangladesh specific - Phone login, OTP login
 */

import { Injectable, Inject, UnauthorizedException, ConflictException, BadRequestException, ForbiddenException, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { LoginDto, LoginResponseDto, MFARequiredResponseDto } from '../../dtos/auth/login.dto';
import { RegisterDto, RegisterResponseDto, EmailVerificationRequiredResponseDto } from '../../dtos/auth/register.dto';
import { RefreshTokenDto, TokenRefreshResponseDto } from '../../dtos/auth/refresh-token.dto';
import { LogoutDto, LogoutResponseDto } from '../../dtos/auth/logout.dto';
import { ForgotPasswordDto, ForgotPasswordPhoneDto, ForgotPasswordResponseDto, ResetPasswordDto, ResetPasswordResponseDto, ValidateResetTokenResponseDto, ResetPasswordWithOtpDto, VerifyResetOtpDto } from '../../dtos/user/forgot-password.dto';
import { AuthService, DeviceInfo } from '../interfaces/auth.service.interface';

import { PasswordHasher } from '../interfaces/password-hasher.interface';
import { TokenGenerator } from '../interfaces/token-generator.interface';
import { EventBus, EventNames } from '../interfaces/event-bus.interface';
import { CacheService, CacheKeyBuilder } from '../interfaces/cache.service.interface';
import { TransactionManager } from '../interfaces/transaction-manager.interface';

import { UserRepository } from '../../../domain/repositories/user.repository.interface';
import { SessionRepository } from '../../../domain/repositories/session.repository.interface';
import { RefreshTokenRepository } from '../../../domain/repositories/refresh-token.repository.interface';
import { AccountLockRepository } from '../../../domain/repositories/account-lock.repository.interface';
import { EmailVerificationRepository } from '../../../domain/repositories/email-verification.repository.interface';

import { User, UserStatus, UserRole } from '../../../domain/entities/user.entity';
import { Session } from '../../../domain/entities/session.entity';
import { RefreshToken } from '../../../domain/entities/refresh-token.entity';
import { AccountLock, AccountLockReason } from '../../../domain/entities/account-lock.entity';
import { EmailVerification } from '../../../domain/entities/email-verification.entity';

import { Email } from '../../../domain/value-objects/email.vo';
import { Phone } from '../../../domain/value-objects/phone.vo';
import { Password } from '../../../domain/value-objects/password.vo';
import { Token, TokenType } from '../../../domain/value-objects/token.vo';
import { IpAddress } from '../../../domain/value-objects/ip-address.vo';
import { UserAgent } from '../../../domain/value-objects/user-agent.vo';
import { DeviceId } from '../../../domain/value-objects/device-id.vo';
import { OtpCode, OtpType, OtpPurpose } from '../../../domain/value-objects/otp-code.vo';

// Import Shared Constants (Phase 1)
import { 
  SESSION_CONFIG, 
  OTP_CONFIG, 
  MFA_CONFIG,
  TOKEN_EXPIRY,
  ACCOUNT_LOCK_POLICY,
  PASSWORD_POLICY
} from '@vubon/shared-constants';

// Import Shared Types (Phase 1)
import type { LoginMethod, LoginType, LogoutReason, LogoutSource, LoginFailureReason } from '@vubon/shared-types';

// Import Events
import { UserRegisteredEvent, RegistrationMethod, RegistrationSource } from '../../events/user-registered.event';
import { UserLoggedInEvent } from '../../events/user-logged-in.event';
import { UserLoggedOutEvent } from '../../events/user-logged-out.event';
import { LoginFailedEvent } from '../../events/login-failed.event';
import { AccountLockedEvent, AccountLockReason as LockReason, AccountLockMethod, AccountLockSource } from '../../events/account-locked.event';
import { PasswordResetRequestedEvent } from '../../events/password-reset-requested.event';
import { PasswordResetCompletedEvent } from '../../events/password-reset-completed.event';
import { WelcomeEmailEvent } from '../../events/welcome-email.event';

// ============================================================
// Custom Domain Errors
// ============================================================

export class AccountLockedError extends Error {
  constructor(
    message: string, 
    public readonly remainingTimeMinutes: number, 
    public readonly remainingTimeSeconds: number
  ) {
    super(message);
    this.name = 'AccountLockedError';
  }
}

export class MFASessionNotFoundError extends Error {
  constructor(message: string = 'MFA session not found or expired') {
    super(message);
    this.name = 'MFASessionNotFoundError';
  }
}

export class InvalidOTPError extends Error {
  constructor(message: string = 'Invalid or expired OTP', public readonly remainingAttempts?: number) {
    super(message);
    this.name = 'InvalidOTPError';
  }
}

// ============================================================
// Auth Service Implementation
// ============================================================

@Injectable()
export class AuthServiceImpl implements AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly sessionRepository: SessionRepository,
    private readonly refreshTokenRepository: RefreshTokenRepository,
    private readonly accountLockRepository: AccountLockRepository,
    private readonly emailVerificationRepository: EmailVerificationRepository,
    private readonly passwordHasher: PasswordHasher,
    private readonly tokenGenerator: TokenGenerator,
    private readonly eventBus: EventBus,
    private readonly cacheService: CacheService,
    private readonly transactionManager: TransactionManager
  ) {}

  // ============================================================
  // Authentication
  // ============================================================

  async login(
    dto: LoginDto,
    deviceInfo: DeviceInfo
  ): Promise<LoginResponseDto | MFARequiredResponseDto> {
    // 1. Validate email format
    let email: Email;
    try {
      email = new Email(dto.email);
    } catch (error) {
      await this.publishLoginFailedEvent(dto.email, deviceInfo, 'INVALID_EMAIL' as LoginFailureReason);
      throw new UnauthorizedException('Invalid credentials');
    }

    // 2. Find user
    const user = await this.userRepository.findByEmail(email);
    
    if (!user) {
      await this.publishLoginFailedEvent(dto.email, deviceInfo, 'USER_NOT_FOUND' as LoginFailureReason);
      throw new UnauthorizedException('Invalid credentials');
    }

    // 3. Check account lock status
    const accountLock = await this.accountLockRepository.findByUserId(user.getId());
    if (accountLock && accountLock.isLocked()) {
      const remainingMinutes = Math.ceil(accountLock.getRemainingLockTime() / 60000);
      const remainingSeconds = Math.ceil(accountLock.getRemainingLockTime() / 1000);
      throw new AccountLockedError(
        `Account is locked. Please try again in ${remainingMinutes} minutes.`,
        remainingMinutes,
        remainingSeconds
      );
    }

    // 4. Check account status
    if (user.getStatus() === UserStatus.SUSPENDED) {
      throw new UnauthorizedException('Account is suspended. Please contact support.');
    }
    
    if (user.getStatus() === UserStatus.DELETED) {
      throw new UnauthorizedException('Account no longer exists.');
    }

    // 5. Verify password
    const isPasswordValid = await this.passwordHasher.compare(
      dto.password,
      user.getPasswordHash()
    );

    if (!isPasswordValid) {
      await this.handleFailedLogin(user, deviceInfo);
      await this.publishLoginFailedEvent(
        dto.email,
        deviceInfo,
        'INVALID_PASSWORD' as LoginFailureReason,
        user.getId()
      );
      throw new UnauthorizedException('Invalid credentials');
    }

    // 6. Reset failure count on successful login
    if (accountLock) {
      await this.accountLockRepository.resetFailureCountForUser(user.getId());
    }

    // 7. Activate user if pending verification and email verified
    if (user.getStatus() === UserStatus.PENDING_VERIFICATION && user.isEmailVerified()) {
      user.activate();
      await this.userRepository.save(user);
    }

    // 8. MFA check
    if (user.isMfaEnabled()) {
      const mfaSessionId = await this.createMfaSession(user.getId(), deviceInfo);
      const availableMethods = await this.getAvailableMfaMethods(user.getId());
      return new MFARequiredResponseDto(
        mfaSessionId, 
        availableMethods, 
        undefined, 
        undefined, 
        MFA_CONFIG.MAX_VERIFICATION_ATTEMPTS
      );
    }

    // 9. Create session and tokens
    const { accessToken, refreshTokenValue, session, accessTokenExpiresIn, refreshTokenExpiresIn } = 
      await this.createUserSession(user, deviceInfo, dto.rememberMe || false);

    // 10. Record login
    user.recordLogin();
    await this.userRepository.save(user);

    // 11. Publish event
    await this.eventBus.publish(
      new UserLoggedInEvent(
        user.getId(),
        'PASSWORD' as LoginMethod,
        'INITIAL' as LoginType,
        deviceInfo.correlationId,
        undefined,
        deviceInfo.ipAddress,
        deviceInfo.deviceId,
        deviceInfo.userAgent,
        session.getId(),
        undefined,
        false,
        false,
        dto.rememberMe || false
      )
    );

    // 12. Return response
    return new LoginResponseDto(
      accessToken,
      refreshTokenValue,
      accessTokenExpiresIn,
      refreshTokenExpiresIn,
      {
        id: user.getId(),
        email: user.getEmail().getValue(),
        fullName: user.getFullName(),
        displayName: user.getDisplayName(),
        role: user.getRole(),
        tier: user.getTier(),
        isEmailVerified: user.isEmailVerified(),
        isPhoneVerified: user.isPhoneVerified(),
        mfaEnabled: user.isMfaEnabled(),
      },
      false,
      session.getId()
    );
  }

  async phoneLogin(
    phoneNumber: string,
    password: string,
    deviceInfo: DeviceInfo
  ): Promise<LoginResponseDto | MFARequiredResponseDto> {
    // 1. Validate phone number
    let phone: Phone;
    try {
      phone = new Phone(phoneNumber);
    } catch (error) {
      throw new UnauthorizedException('Invalid phone number format');
    }

    // 2. Find user by phone
    const user = await this.userRepository.findByPhone(phone);
    
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // 3. Check account lock status
    const accountLock = await this.accountLockRepository.findByUserId(user.getId());
    if (accountLock && accountLock.isLocked()) {
      const remainingMinutes = Math.ceil(accountLock.getRemainingLockTime() / 60000);
      const remainingSeconds = Math.ceil(accountLock.getRemainingLockTime() / 1000);
      throw new AccountLockedError(
        `Account is locked. Please try again in ${remainingMinutes} minutes.`,
        remainingMinutes,
        remainingSeconds
      );
    }

    // 4. Verify password
    const isPasswordValid = await this.passwordHasher.compare(
      password,
      user.getPasswordHash()
    );

    if (!isPasswordValid) {
      await this.handleFailedLogin(user, deviceInfo);
      throw new UnauthorizedException('Invalid credentials');
    }

    // 5. Reset failure count
    if (accountLock) {
      await this.accountLockRepository.resetFailureCountForUser(user.getId());
    }

    // 6. Create session and tokens
    const { accessToken, refreshTokenValue, session, accessTokenExpiresIn, refreshTokenExpiresIn } = 
      await this.createUserSession(user, deviceInfo, false);

    // 7. Record login
    user.recordLogin();
    await this.userRepository.save(user);

    // 8. Publish event
    await this.eventBus.publish(
      new UserLoggedInEvent(
        user.getId(),
        'PHONE' as LoginMethod,
        'INITIAL' as LoginType,
        deviceInfo.correlationId,
        undefined,
        deviceInfo.ipAddress,
        deviceInfo.deviceId,
        deviceInfo.userAgent,
        session.getId(),
        undefined,
        false,
        false,
        false
      )
    );

    return new LoginResponseDto(
      accessToken,
      refreshTokenValue,
      accessTokenExpiresIn,
      refreshTokenExpiresIn,
      {
        id: user.getId(),
        email: user.getEmail().getValue(),
        fullName: user.getFullName(),
        displayName: user.getDisplayName(),
        role: user.getRole(),
        tier: user.getTier(),
        isEmailVerified: user.isEmailVerified(),
        isPhoneVerified: user.isPhoneVerified(),
        mfaEnabled: user.isMfaEnabled(),
      },
      false,
      session.getId()
    );
  }

  async otpLogin(
    phoneNumber: string,
    otpCode: string,
    deviceInfo: DeviceInfo
  ): Promise<LoginResponseDto> {
    // 1. Validate OTP from cache
    const otpCacheKey = CacheKeyBuilder.otp(`login:${phoneNumber}`);
    const cachedOtp = await this.cacheService.get(otpCacheKey);
    
    if (!cachedOtp || cachedOtp !== otpCode) {
      // Track failed OTP attempt
      const attemptsKey = CacheKeyBuilder.otpAttempts(`login:${phoneNumber}`);
      const attempts = await this.cacheService.incr(attemptsKey);
      await this.cacheService.expire(attemptsKey, OTP_CONFIG.MAX_ATTEMPTS_WINDOW_SECONDS);
      
      if (attempts >= OTP_CONFIG.MAX_VERIFICATION_ATTEMPTS) {
        throw new UnauthorizedException('Too many failed attempts. Please request a new OTP.');
      }
      throw new UnauthorizedException('Invalid or expired OTP');
    }

    // 2. Find or create user
    let user = await this.userRepository.findByPhone(new Phone(phoneNumber));
    
    if (!user) {
      throw new UnauthorizedException('User not found. Please register first.');
    }

    // 3. Delete used OTP
    await this.cacheService.del(otpCacheKey);
    await this.cacheService.del(CacheKeyBuilder.otpAttempts(`login:${phoneNumber}`));

    // 4. Create session and tokens
    const { accessToken, refreshTokenValue, session, accessTokenExpiresIn, refreshTokenExpiresIn } = 
      await this.createUserSession(user, deviceInfo, false);

    // 5. Record login
    user.recordLogin();
    await this.userRepository.save(user);

    // 6. Publish event
    await this.eventBus.publish(
      new UserLoggedInEvent(
        user.getId(),
        'OTP' as LoginMethod,
        'INITIAL' as LoginType,
        deviceInfo.correlationId,
        undefined,
        deviceInfo.ipAddress,
        deviceInfo.deviceId,
        deviceInfo.userAgent,
        session.getId(),
        undefined,
        false,
        false,
        false
      )
    );

    return new LoginResponseDto(
      accessToken,
      refreshTokenValue,
      accessTokenExpiresIn,
      refreshTokenExpiresIn,
      {
        id: user.getId(),
        email: user.getEmail().getValue(),
        fullName: user.getFullName(),
        displayName: user.getDisplayName(),
        role: user.getRole(),
        tier: user.getTier(),
        isEmailVerified: user.isEmailVerified(),
        isPhoneVerified: user.isPhoneVerified(),
        mfaEnabled: user.isMfaEnabled(),
      },
      false,
      session.getId()
    );
  }

  async register(
    dto: RegisterDto,
    deviceInfo: DeviceInfo
  ): Promise<RegisterResponseDto | EmailVerificationRequiredResponseDto> {
    // 1. Check if passwords match
    if (dto.password !== dto.confirmPassword) {
      throw new BadRequestException('Passwords do not match');
    }

    // 2. Validate password strength
    const passwordStrength = await this.passwordHasher.validateStrength(dto.password);
    if (!passwordStrength.isValid) {
      throw new BadRequestException(
        `Password does not meet requirements: ${passwordStrength.errors.join(', ')}`
      );
    }

    // 3. Check if user exists by email
    const email = new Email(dto.email);
    const existsByEmail = await this.userRepository.existsByEmail(email);
    
    if (existsByEmail) {
      throw new ConflictException('User with this email already exists');
    }

    // 4. Check if user exists by phone (if provided)
    if (dto.phone) {
      const phone = new Phone(dto.phone);
      const existsByPhone = await this.userRepository.existsByPhone(phone);
      if (existsByPhone) {
        throw new ConflictException('User with this phone number already exists');
      }
    }

    // 5. Hash password
    const hashedPassword = await this.passwordHasher.hash(dto.password);
    
    // 6. Create user entity
    const user = User.create(
      email,
      new Password(hashedPassword),
      dto.fullName,
      dto.phone ? new Phone(dto.phone) : undefined,
      dto.displayName,
      dto.preferredLanguage
    );

    // 7. Save user (in transaction)
    await this.transactionManager.runInTransaction(async () => {
      await this.userRepository.save(user);
    });

    // 8. Create email verification
    const verificationCode = OtpCode.generate(OtpType.EMAIL);
    const verificationToken = new Token(verificationCode, TokenType.VERIFICATION);
    const verification = EmailVerification.create(
      user.getId(),
      email,
      verificationToken
    );
    await this.emailVerificationRepository.save(verification);

    // 9. Publish welcome email event
    await this.eventBus.publish(
      new WelcomeEmailEvent(
        user.getId(),
        user.getEmail().getValue(),
        user.getFullName(),
        verificationCode
      )
    );

    // 10. Publish user registered event
    await this.eventBus.publish(
      new UserRegisteredEvent(
        user.getId(),
        user.getEmail().getValue(),
        user.getFullName(),
        RegistrationMethod.EMAIL_PASSWORD,
        RegistrationSource.WEB,
        deviceInfo.correlationId,
        undefined,
        deviceInfo.ipAddress,
        deviceInfo.deviceId,
        deviceInfo.userAgent,
        false,
        false,
        user.getRole(),
        user.getTier()
      )
    );

    return new RegisterResponseDto(
      user.getId(),
      user.getEmail().getValue(),
      true,
      false,
      user.getCreatedAt(),
      undefined,
      undefined,
      user.getPhone()?.getE164(),
      undefined,
      user.getTier()
    );
  }

  async refreshToken(
    dto: RefreshTokenDto,
    deviceInfo: DeviceInfo
  ): Promise<TokenRefreshResponseDto> {
    // 1. Verify token signature
    const verificationResult = await this.tokenGenerator.verifyTokenSafe(dto.refreshToken);
    
    if (!verificationResult.isValid) {
      throw new UnauthorizedException(`Invalid refresh token: ${verificationResult.error}`);
    }

    const payload = verificationResult.payload;
    if (!payload || payload.type !== 'refresh') {
      throw new UnauthorizedException('Invalid token type. Expected refresh token.');
    }

    // 2. Find refresh token entity
    const token = new Token(dto.refreshToken, TokenType.REFRESH);
    const refreshToken = await this.refreshTokenRepository.findByToken(token);
    
    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token not found');
    }
    
    if (!refreshToken.isValidForRotation()) {
      if (refreshToken.isRevoked()) {
        throw new UnauthorizedException('Refresh token has been revoked');
      }
      if (refreshToken.isExpired()) {
        throw new UnauthorizedException('Refresh token has expired');
      }
      throw new UnauthorizedException('Invalid refresh token');
    }

    // 3. Get user
    const user = await this.userRepository.findById(refreshToken.getUserId());
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    // 4. Generate new tokens using TokenGenerator
    const tokenPair = await this.tokenGenerator.generateTokenPair(
      user.getId(),
      user.getEmail().getValue(),
      user.getRole(),
      { deviceId: deviceInfo.deviceId, sessionId: refreshToken.getSessionId() }
    );

    // 5. Rotate refresh token (revoke old, create new)
    const newToken = new Token(tokenPair.refreshToken!, TokenType.REFRESH);
    const rotatedToken = refreshToken.rotate(newToken);
    
    await this.transactionManager.runInTransaction(async () => {
      await this.refreshTokenRepository.save(rotatedToken);
    });

    // 6. Publish token refreshed event
    await this.eventBus.publish({
      eventId: uuidv4(),
      eventName: EventNames.TOKEN_REFRESHED,
      aggregateId: user.getId(),
      aggregateVersion: 1,
      eventVersion: 1,
      occurredAt: new Date(),
      userId: user.getId(),
      metadata: {
        oldTokenId: refreshToken.getId(),
        newTokenId: rotatedToken.getId(),
        deviceId: deviceInfo.deviceId,
        ipAddress: deviceInfo.ipAddress,
      },
    });

    return new TokenRefreshResponseDto(
      tokenPair.accessToken,
      tokenPair.refreshToken!,
      tokenPair.expiresIn,
      tokenPair.refreshExpiresIn!,
      true
    );
  }

  async logout(
    dto: LogoutDto,
    userId: string,
    deviceInfo: DeviceInfo
  ): Promise<LogoutResponseDto> {
    let sessionsRevoked = 0;
    let revokedSessionIds: string[] = [];

    await this.transactionManager.runInTransaction(async () => {
      if (dto.allDevices) {
        // Revoke all sessions
        const sessions = await this.sessionRepository.findActiveSessions(userId);
        for (const session of sessions) {
          session.revoke('User logged out from all devices');
          await this.sessionRepository.save(session);
          sessionsRevoked++;
          revokedSessionIds.push(session.getId());
        }
        
        // Revoke all refresh tokens
        await this.refreshTokenRepository.revokeAllByUserId(userId, 'User logged out from all devices');
      } else if (dto.sessionId) {
        // Revoke specific session
        const session = await this.sessionRepository.findById(dto.sessionId);
        if (session && session.validateOwnership(userId)) {
          session.revoke('User logged out');
          await this.sessionRepository.save(session);
          sessionsRevoked = 1;
          revokedSessionIds = [dto.sessionId];
        }
      } else {
        // Revoke current session by refresh token
        if (dto.refreshToken) {
          const verificationResult = await this.tokenGenerator.verifyTokenSafe(dto.refreshToken);
          if (verificationResult.isValid && verificationResult.payload) {
            const token = new Token(dto.refreshToken, TokenType.REFRESH);
            const refreshToken = await this.refreshTokenRepository.findByToken(token);
            if (refreshToken && refreshToken.getUserId() === userId) {
              const session = await this.sessionRepository.findById(refreshToken.getSessionId());
              if (session && session.validateOwnership(userId)) {
                session.revoke('User logged out');
                await this.sessionRepository.save(session);
                sessionsRevoked = 1;
                revokedSessionIds = [session.getId()];
              }
              await this.refreshTokenRepository.revoke(refreshToken.getId(), 'User logged out');
            }
          }
        }
      }
    });

    // Publish event
    await this.eventBus.publish(
      new UserLoggedOutEvent(
        userId,
        dto.sessionId,
        'USER_INITIATED' as LogoutReason,
        'USER' as LogoutSource,
        deviceInfo.correlationId,
        undefined,
        deviceInfo.deviceId,
        deviceInfo.ipAddress,
        deviceInfo.userAgent,
        sessionsRevoked
      )
    );

    return new LogoutResponseDto('Successfully logged out', sessionsRevoked, revokedSessionIds);
  }

  async logoutAllDevices(
    userId: string,
    deviceInfo: DeviceInfo
  ): Promise<LogoutAllDevicesResponseDto> {
    const sessions = await this.sessionRepository.findActiveSessions(userId);
    let sessionsRevoked = 0;

    await this.transactionManager.runInTransaction(async () => {
      for (const session of sessions) {
        session.revoke('User logged out from all devices');
        await this.sessionRepository.save(session);
        sessionsRevoked++;
      }
      
      await this.refreshTokenRepository.revokeAllByUserId(userId, 'User logged out from all devices');
    });

    await this.eventBus.publish(
      new UserLoggedOutEvent(
        userId,
        undefined,
        'USER_INITIATED' as LogoutReason,
        'USER' as LogoutSource,
        deviceInfo.correlationId,
        undefined,
        deviceInfo.deviceId,
        deviceInfo.ipAddress,
        deviceInfo.userAgent,
        sessionsRevoked
      )
    );

    return new LogoutAllDevicesResponseDto(sessionsRevoked, sessions.length, false);
  }

  // ============================================================
  // Password Management
  // ============================================================

  async forgotPassword(
    dto: ForgotPasswordDto,
    deviceInfo: DeviceInfo
  ): Promise<ForgotPasswordResponseDto> {
    const email = new Email(dto.email);
    const user = await this.userRepository.findByEmail(email);
    
    // Always return success (no user enumeration)
    if (user) {
      // Check rate limiting
      const rateLimitKey = CacheKeyBuilder.rateLimit(`forgot-password:${user.getId()}`);
      const requestCount = await this.cacheService.incr(rateLimitKey);
      if (requestCount === 1) {
        await this.cacheService.expire(rateLimitKey, 3600); // 1 hour window
      }
      
      if (requestCount > 3) {
        return ForgotPasswordResponseDto.rateLimited(3600, 'Too many requests. Please try again later.');
      }
      
      const resetToken = await this.tokenGenerator.generatePasswordResetToken(user.getId());
      await this.eventBus.publish(
        new PasswordResetRequestedEvent(
          user.getId(),
          user.getEmail().getValue(),
          resetToken,
          deviceInfo.correlationId,
          deviceInfo.ipAddress
        )
      );
    }

    return ForgotPasswordResponseDto.success('u***r@example.com');
  }

  async forgotPasswordPhone(
    dto: ForgotPasswordPhoneDto,
    deviceInfo: DeviceInfo
  ): Promise<ForgotPasswordResponseDto> {
    const phone = new Phone(dto.phoneNumber);
    const user = await this.userRepository.findByPhone(phone);
    
    if (user) {
      // Generate OTP
      const otpCode = OtpCode.generate(OtpType.SMS);
      const otpCacheKey = CacheKeyBuilder.otp(`reset:${phone.getE164()}`);
      await this.cacheService.set(otpCacheKey, otpCode, OTP_CONFIG.EXPIRY_SECONDS);
      
      // In production, send OTP via SMS/WhatsApp
      // await this.notificationService.sendOtp(phone.getE164(), otpCode, dto.method);
    }
    
    return ForgotPasswordResponseDto.success(null, uuidv4(), OTP_CONFIG.EXPIRY_SECONDS);
  }

  async resetPassword(
    dto: ResetPasswordDto,
    deviceInfo: DeviceInfo
  ): Promise<ResetPasswordResponseDto> {
    // 1. Verify token
    const verificationResult = await this.tokenGenerator.verifyTokenSafe(dto.token);
    
    if (!verificationResult.isValid) {
      throw new BadRequestException('Invalid or expired reset token');
    }

    const payload = verificationResult.payload;
    if (!payload || payload.type !== 'reset') {
      throw new BadRequestException('Invalid token type');
    }

    // 2. Get user
    const user = await this.userRepository.findById(payload.sub);
    if (!user) {
      throw new BadRequestException('User not found');
    }

    // 3. Check if user is deleted or suspended
    if (user.getStatus() === UserStatus.DELETED) {
      throw new BadRequestException('Account has been deleted');
    }
    if (user.getStatus() === UserStatus.SUSPENDED) {
      throw new BadRequestException('Account is suspended');
    }

    // 4. Validate new password strength
    const passwordStrength = await this.passwordHasher.validateStrength(dto.newPassword);
    if (!passwordStrength.isValid) {
      throw new BadRequestException(
        `Password does not meet requirements: ${passwordStrength.errors.join(', ')}`
      );
    }

    // 5. Check password history (prevent reuse)
    const passwordHistory = await this.userRepository.getPasswordHistory(user.getId(), 5);
    const isReused = await this.passwordHasher.checkHistory(dto.newPassword, passwordHistory);
    if (isReused.isNew === false) {
      throw new BadRequestException('Cannot reuse a recent password');
    }

    // 6. Hash new password
    const hashedPassword = await this.passwordHasher.hash(dto.newPassword);
    
    // 7. Update password
    user.changePassword(new Password(hashedPassword));
    await this.userRepository.save(user);

    // 8. Revoke all sessions
    const sessionsRevoked = await this.sessionRepository.deleteAllByUserId(user.getId(), 'Password reset');
    
    // 9. Revoke all refresh tokens
    await this.refreshTokenRepository.revokeAllByUserId(user.getId(), 'Password reset');

    // 10. Add to password history
    await this.userRepository.addPasswordHistory(user.getId(), hashedPassword);

    // 11. Publish event
    await this.eventBus.publish(
      new PasswordResetCompletedEvent(
        user.getId(),
        user.getEmail().getValue(),
        deviceInfo.correlationId,
        deviceInfo.ipAddress,
        deviceInfo.deviceId
      )
    );

    return ResetPasswordResponseDto.success(sessionsRevoked);
  }

  async resetPasswordWithOtp(
    dto: ResetPasswordWithOtpDto,
    deviceInfo: DeviceInfo
  ): Promise<ResetPasswordResponseDto> {
    // 1. Verify OTP
    const phone = new Phone(dto.phoneNumber);
    const otpCacheKey = CacheKeyBuilder.otp(`reset:${phone.getE164()}`);
    const cachedOtp = await this.cacheService.get(otpCacheKey);
    
    if (!cachedOtp || cachedOtp !== dto.otpCode) {
      throw new BadRequestException('Invalid or expired OTP');
    }

    // 2. Find user
    const user = await this.userRepository.findByPhone(phone);
    if (!user) {
      throw new BadRequestException('User not found');
    }

    // 3. Validate new password
    const passwordStrength = await this.passwordHasher.validateStrength(dto.newPassword);
    if (!passwordStrength.isValid) {
      throw new BadRequestException(
        `Password does not meet requirements: ${passwordStrength.errors.join(', ')}`
      );
    }

    // 4. Update password
    const hashedPassword = await this.passwordHasher.hash(dto.newPassword);
    user.changePassword(new Password(hashedPassword));
    await this.userRepository.save(user);

    // 5. Delete used OTP
    await this.cacheService.del(otpCacheKey);

    // 6. Revoke all sessions
    const sessionsRevoked = await this.sessionRepository.deleteAllByUserId(user.getId(), 'Password reset');

    return ResetPasswordResponseDto.success(sessionsRevoked);
  }

  async verifyResetOtp(
    dto: VerifyResetOtpDto,
    deviceInfo: DeviceInfo
  ): Promise<{ success: boolean; resetToken?: string; expiresInSeconds?: number }> {
    const phone = new Phone(dto.phoneNumber);
    const otpCacheKey = CacheKeyBuilder.otp(`reset:${phone.getE164()}`);
    const cachedOtp = await this.cacheService.get(otpCacheKey);
    
    if (!cachedOtp || cachedOtp !== dto.otpCode) {
      throw new BadRequestException('Invalid or expired OTP');
    }

    const user = await this.userRepository.findByPhone(phone);
    if (!user) {
      throw new BadRequestException('User not found');
    }

    // Generate reset token for password reset
    const resetToken = await this.tokenGenerator.generatePasswordResetToken(user.getId());
    const expiresInSeconds = TOKEN_EXPIRY.PASSWORD_RESET_TOKEN;

    // Delete used OTP
    await this.cacheService.del(otpCacheKey);

    return {
      success: true,
      resetToken,
      expiresInSeconds,
    };
  }

  async validateResetToken(token: string): Promise<ValidateResetTokenResponseDto> {
    const verificationResult = await this.tokenGenerator.verifyTokenSafe(token);
    
    if (!verificationResult.isValid) {
      return new ValidateResetTokenResponseDto(false);
    }

    const payload = verificationResult.payload;
    if (!payload || payload.type !== 'reset') {
      return new ValidateResetTokenResponseDto(false);
    }

    const user = await this.userRepository.findById(payload.sub);
    if (!user) {
      return new ValidateResetTokenResponseDto(false);
    }

    const remainingSeconds = verificationResult.remainingSeconds || 0;
    const expiresAt = new Date(Date.now() + remainingSeconds * 1000);

    return new ValidateResetTokenResponseDto(
      true,
      user.getEmail().getValue(),
      expiresAt,
      remainingSeconds,
      user.getId(),
      user.getPhone()?.getE164()
    );
  }

  async changePassword(
    userId: string,
    dto: ChangePasswordDto,
    deviceInfo: DeviceInfo
  ): Promise<ChangePasswordResponseDto> {
    // 1. Get user
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // 2. Verify current password (if not skipped)
    if (!dto.skipCurrentPasswordValidation) {
      const isCurrentPasswordValid = await this.passwordHasher.compare(
        dto.currentPassword,
        user.getPasswordHash()
      );
      if (!isCurrentPasswordValid) {
        return ChangePasswordResponseDto.error('Current password is incorrect');
      }
    }

    // 3. Validate new password strength
    const passwordStrength = await this.passwordHasher.validateStrength(dto.newPassword);
    if (!passwordStrength.isValid) {
      return ChangePasswordResponseDto.error(
        `Password does not meet requirements: ${passwordStrength.errors.join(', ')}`
      );
    }

    // 4. Check password history (prevent reuse)
    const passwordHistory = await this.userRepository.getPasswordHistory(user.getId(), 5);
    const isReused = await this.passwordHasher.checkHistory(dto.newPassword, passwordHistory);
    if (isReused.isNew === false) {
      return ChangePasswordResponseDto.error('Cannot reuse a recent password');
    }

    // 5. Hash new password
    const hashedPassword = await this.passwordHasher.hash(dto.newPassword);
    
    // 6. Update password
    user.changePassword(new Password(hashedPassword));
    await this.userRepository.save(user);

    // 7. Add to password history
    await this.userRepository.addPasswordHistory(user.getId(), hashedPassword);

    // 8. Revoke other sessions if requested
    let sessionsRevoked = 0;
    if (dto.logoutOtherDevices) {
      const sessions = await this.sessionRepository.findActiveSessions(userId);
      for (const session of sessions) {
        if (session.getId() !== dto.deviceId) {
          session.revoke('Password changed - logged out from other devices');
          await this.sessionRepository.save(session);
          sessionsRevoked++;
        }
      }
      
      // Revoke all refresh tokens except current
      await this.refreshTokenRepository.revokeAllByUserId(userId, 'Password changed');
    }

    // 9. Publish event
    await this.eventBus.publish({
      eventId: uuidv4(),
      eventName: EventNames.USER_PASSWORD_CHANGED,
      aggregateId: user.getId(),
      aggregateVersion: user.getVersion(),
      eventVersion: 1,
      occurredAt: new Date(),
      userId: user.getId(),
      metadata: {
        changedBy: userId,
        changedAt: new Date(),
        ipAddress: deviceInfo.ipAddress,
        deviceId: deviceInfo.deviceId,
        userAgent: deviceInfo.userAgent,
        revokedOtherSessions: dto
