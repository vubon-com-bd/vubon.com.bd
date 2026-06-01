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

import { Injectable, Inject, UnauthorizedException, ConflictException, BadRequestException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { LoginDto, LoginResponseDto, MFARequiredResponseDto } from '../../dtos/auth/login.dto';
import { RegisterDto, RegisterResponseDto, EmailVerificationRequiredResponseDto } from '../../dtos/auth/register.dto';
import { RefreshTokenDto, TokenRefreshResponseDto } from '../../dtos/auth/refresh-token.dto';
import { LogoutDto, LogoutResponseDto } from '../../dtos/auth/logout.dto';
import { ForgotPasswordDto, ForgotPasswordPhoneDto, ForgotPasswordResponseDto, ResetPasswordDto, ResetPasswordResponseDto, ValidateResetTokenResponseDto, ResetPasswordWithOtpDto, VerifyResetOtpDto } from '../../dtos/user/forgot-password.dto';
import { AuthService, DeviceInfo } from '../interfaces/auth.service.interface';

import { PasswordHasher, TokenGenerator, EventBus, CacheService, TransactionManager } from './infrastructure.interface';

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

import { UserRegisteredEvent, RegistrationMethod, RegistrationSource } from '../../events/user-registered.event';
import { UserLoggedInEvent, LoginMethod, LoginType } from '../../events/user-logged-in.event';
import { UserLoggedOutEvent, LogoutReason, LogoutSource } from '../../events/user-logged-out.event';
import { LoginFailedEvent, LoginFailureReason } from '../../events/login-failed.event';
import { AccountLockedEvent, AccountLockReason as LockReason, AccountLockMethod, AccountLockSource } from '../../events/account-locked.event';
import { PasswordResetRequestedEvent } from '../../events/password-reset-requested.event';
import { PasswordResetCompletedEvent } from '../../events/password-reset-completed.event';
import { WelcomeEmailEvent } from '../../events/welcome-email.event';
import { PhoneVerifiedEvent } from '../../events/phone-verified.event';

// ============================================================
// Constants
// ============================================================

const SESSION_CONFIG = {
  REMEMBER_ME_HOURS: 24 * 30, // 30 days
  DEFAULT_HOURS: 24 * 1, // 1 day
  ACCESS_TOKEN_EXPIRY_SECONDS: 3600, // 1 hour
  REFRESH_TOKEN_EXPIRY_DAYS: 7,
  MAX_FAILED_ATTEMPTS: 5,
  MFA_SESSION_TTL_SECONDS: 300, // 5 minutes
};

const OTP_CONFIG = {
  EXPIRY_SECONDS: 300, // 5 minutes
  RESEND_COOLDOWN_SECONDS: 30,
  MAX_ATTEMPTS: 3,
};

// ============================================================
// Custom Domain Errors
// ============================================================

export class AccountLockedError extends Error {
  constructor(message: string, public readonly remainingTimeMinutes: number, public readonly remainingTimeSeconds: number) {
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
      await this.publishLoginFailedEvent(dto.email, deviceInfo, LoginFailureReason.INVALID_EMAIL);
      throw new UnauthorizedException('Invalid credentials');
    }

    // 2. Find user
    const user = await this.userRepository.findByEmail(email);
    
    if (!user) {
      await this.publishLoginFailedEvent(dto.email, deviceInfo, LoginFailureReason.USER_NOT_FOUND);
      throw new UnauthorizedException('Invalid credentials');
    }

    // 3. Check account lock status
    const accountLock = await this.accountLockRepository.findByUserId(user.getId());
    if (accountLock && accountLock.isLocked()) {
      const remainingMinutes = Math.ceil(accountLock.getRemainingLockTime() / (60 * 1000));
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
      user.getPassword().getValue()
    );

    if (!isPasswordValid) {
      await this.handleFailedLogin(user, deviceInfo);
      await this.publishLoginFailedEvent(
        dto.email,
        deviceInfo,
        LoginFailureReason.INVALID_PASSWORD,
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
      return new MFARequiredResponseDto(mfaSessionId, ['TOTP', 'SMS'], undefined, undefined, 3);
    }

    // 9. Create session and tokens
    const { accessToken, refreshTokenValue, session } = await this.createUserSession(
      user,
      deviceInfo,
      dto.rememberMe
    );

    // 10. Record login
    user.recordLogin();
    await this.userRepository.save(user);

    // 11. Publish event
    await this.eventBus.publish(
      new UserLoggedInEvent(
        user.getId(),
        LoginMethod.PASSWORD,
        LoginType.INITIAL,
        deviceInfo.correlationId,
        undefined,
        deviceInfo.ipAddress,
        deviceInfo.deviceId,
        deviceInfo.userAgent,
        session.getId(),
        undefined,
        false,
        false,
        dto.rememberMe
      )
    );

    // 12. Return response
    return new LoginResponseDto(
      accessToken,
      refreshTokenValue,
      SESSION_CONFIG.ACCESS_TOKEN_EXPIRY_SECONDS,
      SESSION_CONFIG.REFRESH_TOKEN_EXPIRY_DAYS * 86400,
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
      const remainingMinutes = Math.ceil(accountLock.getRemainingLockTime() / (60 * 1000));
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
      user.getPassword().getValue()
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
    const { accessToken, refreshTokenValue, session } = await this.createUserSession(
      user,
      deviceInfo,
      false
    );

    // 7. Record login
    user.recordLogin();
    await this.userRepository.save(user);

    return new LoginResponseDto(
      accessToken,
      refreshTokenValue,
      SESSION_CONFIG.ACCESS_TOKEN_EXPIRY_SECONDS,
      SESSION_CONFIG.REFRESH_TOKEN_EXPIRY_DAYS * 86400,
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
    // 1. Validate OTP
    const otpCacheKey = `otp:login:${phoneNumber}`;
    const cachedOtp = await this.cacheService.get(otpCacheKey);
    
    if (!cachedOtp || cachedOtp !== otpCode) {
      throw new UnauthorizedException('Invalid or expired OTP');
    }

    // 2. Find or create user
    let user = await this.userRepository.findByPhone(new Phone(phoneNumber));
    
    if (!user) {
      // Auto-register user with phone number
      // This would require additional implementation
      throw new UnauthorizedException('User not found. Please register first.');
    }

    // 3. Delete used OTP
    await this.cacheService.del(otpCacheKey);

    // 4. Create session and tokens
    const { accessToken, refreshTokenValue, session } = await this.createUserSession(
      user,
      deviceInfo,
      false
    );

    // 5. Record login
    user.recordLogin();
    await this.userRepository.save(user);

    return new LoginResponseDto(
      accessToken,
      refreshTokenValue,
      SESSION_CONFIG.ACCESS_TOKEN_EXPIRY_SECONDS,
      SESSION_CONFIG.REFRESH_TOKEN_EXPIRY_DAYS * 86400,
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

    // 2. Check if user exists
    const email = new Email(dto.email);
    const exists = await this.userRepository.existsByEmail(email);
    
    if (exists) {
      throw new ConflictException('User with this email already exists');
    }

    // 3. Create user entity
    const password = new Password(dto.password);
    const hashedPassword = await this.passwordHasher.hash(password.getValue());
    
    // Override password with hashed value (Note: In production, use separate VO)
    const user = User.create(
      email,
      new Password(hashedPassword),
      dto.fullName,
      undefined,
      dto.phone ? new Phone(dto.phone) : undefined,
      dto.displayName,
      dto.preferredLanguage
    );

    // 4. Save user (transaction)
    await this.transactionManager.runInTransaction(async () => {
      await this.userRepository.save(user);
    });

    // 5. Create email verification
    const verificationCode = OtpCode.generate(OtpType.EMAIL);
    const verification = EmailVerification.create(
      user.getId(),
      email,
      new OtpCode(verificationCode, OtpType.EMAIL, OtpPurpose.EMAIL_VERIFICATION)
    );
    await this.emailVerificationRepository.save(verification);

    // 6. Publish welcome email event
    await this.eventBus.publish(
      new WelcomeEmailEvent(
        user.getId(),
        user.getEmail().getValue(),
        user.getFullName(),
        verificationCode
      )
    );

    // 7. Publish user registered event
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
    const payload = await this.tokenGenerator.verifyToken(dto.refreshToken);
    
    if (!payload || payload.type !== 'refresh') {
      throw new UnauthorizedException('Invalid refresh token');
    }

    // 2. Find refresh token entity
    const token = new Token(dto.refreshToken, TokenType.REFRESH);
    const refreshToken = await this.refreshTokenRepository.findByToken(token);
    
    if (!refreshToken || !refreshToken.isValidForRotation()) {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }

    // 3. Get user
    const user = await this.userRepository.findById(refreshToken.getUserId());
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    // 4. Generate new tokens
    const newAccessToken = await this.tokenGenerator.generateAccessToken(
      user.getId(),
      user.getEmail().getValue(),
      user.getRole()
    );
    
    const newRefreshTokenValue = await this.tokenGenerator.generateRefreshToken(user.getId());

    // 5. Rotate refresh token
    const newToken = new Token(newRefreshTokenValue, TokenType.REFRESH);
    const rotatedToken = refreshToken.rotate(newToken);
    
    await this.refreshTokenRepository.save(rotatedToken);

    return new TokenRefreshResponseDto(
      newAccessToken,
      newRefreshTokenValue,
      SESSION_CONFIG.ACCESS_TOKEN_EXPIRY_SECONDS,
      SESSION_CONFIG.REFRESH_TOKEN_EXPIRY_DAYS * 86400,
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
          const token = new Token(dto.refreshToken, TokenType.REFRESH);
          const refreshToken = await this.refreshTokenRepository.findByToken(token);
          if (refreshToken) {
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
    });

    // Publish event
    await this.eventBus.publish(
      new UserLoggedOutEvent(
        userId,
        dto.sessionId,
        LogoutReason.USER_INITIATED,
        LogoutSource.USER,
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

    return ForgotPasswordResponseDto.success('user@example.com');
  }

  async resetPassword(
    dto: ResetPasswordDto,
    deviceInfo: DeviceInfo
  ): Promise<ResetPasswordResponseDto> {
    // 1. Verify token
    const payload = await this.tokenGenerator.verifyToken(dto.token);
    
    if (!payload || payload.type !== 'reset') {
      throw new BadRequestException('Invalid or expired reset token');
    }

    // 2. Get user
    const user = await this.userRepository.findById(payload.sub);
    if (!user) {
      throw new BadRequestException('User not found');
    }

    // 3. Validate new password
    const newPassword = new Password(dto.newPassword);
    
    // 4. Hash new password
    const hashedPassword = await this.passwordHasher.hash(newPassword.getValue());
    
    // 5. Update password
    user.changePassword(new Password(hashedPassword));
    await this.userRepository.save(user);

    // 6. Revoke all sessions
    await this.sessionRepository.deleteAllByUserId(user.getId(), 'Password reset');
    
    // 7. Revoke all refresh tokens
    await this.refreshTokenRepository.revokeAllByUserId(user.getId(), 'Password reset');

    // 8. Publish event
    await this.eventBus.publish(
      new PasswordResetCompletedEvent(
        user.getId(),
        user.getEmail().getValue(),
        deviceInfo.correlationId,
        deviceInfo.ipAddress,
        deviceInfo.deviceId
      )
    );

    return ResetPasswordResponseDto.success(0);
  }

  // ============================================================
  // Private Helper Methods
  // ============================================================

  private async handleFailedLogin(user: User, deviceInfo: DeviceInfo): Promise<void> {
    let accountLock = await this.accountLockRepository.findByUserId(user.getId());
    
    if (!accountLock) {
      accountLock = AccountLock.create(user.getId(), AccountLockReason.FAILED_LOGIN_ATTEMPTS);
    }
    
    const failureCount = await this.accountLockRepository.incrementFailureCountForUser(user.getId());
    
    if (failureCount >= SESSION_CONFIG.MAX_FAILED_ATTEMPTS && !accountLock.isLocked()) {
      const lockDuration = Math.min(15 * Math.pow(2, accountLock.getLockLevel()), 1440);
      accountLock.lock(AccountLockReason.FAILED_LOGIN_ATTEMPTS, lockDuration);
      await this.accountLockRepository.save(accountLock);
      
      await this.eventBus.publish(
        new AccountLockedEvent(
          user.getId(),
          LockReason.FAILED_LOGIN_ATTEMPTS,
          AccountLockMethod.AUTOMATIC,
          AccountLockSource.SYSTEM,
          deviceInfo.correlationId,
          undefined,
          deviceInfo.ipAddress,
          deviceInfo.deviceId,
          undefined,
          failureCount,
          lockDuration,
          accountLock.getLockLevel() + 1,
          { maxAttempts: SESSION_CONFIG.MAX_FAILED_ATTEMPTS }
        )
      );
    }
  }

  private async publishLoginFailedEvent(
    email: string,
    deviceInfo: DeviceInfo,
    reason: LoginFailureReason,
    userId?: string
  ): Promise<void> {
    await this.eventBus.publish(
      new LoginFailedEvent(
        email,
        deviceInfo.ipAddress,
        reason,
        deviceInfo.correlationId,
        undefined,
        userId,
        deviceInfo.userAgent,
        deviceInfo.deviceId
      )
    );
  }

  private async createUserSession(
    user: User,
    deviceInfo: DeviceInfo,
    rememberMe: boolean = false
  ): Promise<{
    accessToken: string;
    refreshTokenValue: string;
    session: Session;
  }> {
    const deviceId = new DeviceId(deviceInfo.deviceId || uuidv4());
    const ipAddress = new IpAddress(deviceInfo.ipAddress);
    const userAgent = new UserAgent(deviceInfo.userAgent);
    
    const accessToken = await this.tokenGenerator.generateAccessToken(
      user.getId(),
      user.getEmail().getValue(),
      user.getRole()
    );
    
    const refreshTokenValue = await this.tokenGenerator.generateRefreshToken(user.getId());
    const token = new Token(refreshTokenValue, TokenType.REFRESH);
    
    const sessionDurationHours = rememberMe 
      ? SESSION_CONFIG.REMEMBER_ME_HOURS 
      : SESSION_CONFIG.DEFAULT_HOURS;
    
    const session = Session.create(
      user.getId(),
      token,
      ipAddress,
      userAgent,
      deviceId,
      sessionDurationHours * 60,
      undefined,
      undefined,
      { networkType: deviceInfo.networkType, mobileOperator: deviceInfo.mobileOperator, district: deviceInfo.district, upazila: deviceInfo.upazila }
    );
    
    await this.sessionRepository.save(session);
    
    const refreshToken = RefreshToken.create(
      user.getId(), 
      token, 
      undefined,
      deviceId,
      ipAddress,
      userAgent.getValue()
    );
    await this.refreshTokenRepository.save(refreshToken);
    
    return { accessToken, refreshTokenValue, session };
  }

  private async createMfaSession(userId: string, deviceInfo: DeviceInfo): Promise<string> {
    const mfaSessionId = uuidv4();
    await this.cacheService.set(
      `mfa:session:${mfaSessionId}`,
      { userId, deviceInfo, createdAt: new Date().toISOString() },
      SESSION_CONFIG.MFA_SESSION_TTL_SECONDS
    );
    return mfaSessionId;
  }
}
