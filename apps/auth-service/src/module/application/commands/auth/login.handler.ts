/**
 * Login Command Handler - Application Layer
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module application/commands/auth/login.handler
 * 
 * @description
 * Handles the user login use case with security features including:
 * - MFA support (TOTP, SMS, WhatsApp, bKash PIN, Nagad PIN, Rocket PIN)
 * - Account lockout with progressive locking
 * - Session management with device tracking
 * - Device trust with fingerprinting
 * - Suspicious activity detection (location, device, time-based)
 * - Rate limiting with CAPTCHA
 * - Audit logging with correlation IDs
 * - Bangladesh specific - Mobile operator and district tracking
 */

import { Injectable, UnauthorizedException, ConflictException, BadRequestException } from '@nestjs/common';

import { LoginCommand, PhoneLoginCommand, OtpLoginCommand } from './login.command';
import { UserRepository } from '../../../domain/repositories/user.repository.interface';
import { SessionRepository } from '../../../domain/repositories/session.repository.interface';
import { RefreshTokenRepository } from '../../../domain/repositories/refresh-token.repository.interface';
import { AccountLockRepository } from '../../../domain/repositories/account-lock.repository.interface';
import { DeviceRepository } from '../../../domain/repositories/device.repository.interface';

import { User } from '../../../domain/entities/user.entity';
import { Session } from '../../../domain/entities/session.entity';
import { RefreshToken } from '../../../domain/entities/refresh-token.entity';
import { AccountLock, AccountLockReason, LockLevel } from '../../../domain/entities/account-lock.entity';
import { Device, DeviceTrustLevel } from '../../../domain/entities/device.entity';

import { Email } from '../../../domain/value-objects/email.vo';
import { Password } from '../../../domain/value-objects/password.vo';
import { Token, TokenType } from '../../../domain/value-objects/token.vo';
import { IpAddress, IpCategory } from '../../../domain/value-objects/ip-address.vo';
import { UserAgent, DeviceType } from '../../../domain/value-objects/user-agent.vo';
import { DeviceId } from '../../../domain/value-objects/device-id.vo';
import { Phone } from '../../../domain/value-objects/phone.vo';

import { UserLoggedInEvent, LoginMethod, LoginType } from '../../events/user-logged-in.event';
import { LoginFailedEvent, LoginFailureReason } from '../../events/login-failed.event';
import { AccountLockedEvent, AccountLockReason as LockReason, AccountLockMethod, AccountLockSource } from '../../events/account-locked.event';
import { DeviceTrustedEvent } from '../../events/device-trusted.event';
import { SuspiciousActivityEvent } from '../../events/suspicious-activity.event';

import { 
  PasswordHasher, 
  TokenGenerator, 
  EventBus, 
  TransactionManager,
  RateLimiter,
  AuditService,
  SecurityService,
  CacheService,
  IdGenerator,
  MfaGenerator,
  NotificationService
} from './infrastructure.interface';

// ============================================================
// Constants
// ============================================================

const LOGIN_CONFIG = {
  MAX_FAILED_ATTEMPTS: 5,
  PROGRESSIVE_LOCKOUT: true,
  SESSION_DURATION_REMEMBER_MS: 30 * 24 * 60 * 60 * 1000, // 30 days
  SESSION_DURATION_DEFAULT_MS: 24 * 60 * 60 * 1000, // 24 hours
  SESSION_DURATION_MOBILE_MS: 7 * 24 * 60 * 60 * 1000, // 7 days for mobile
  ACCESS_TOKEN_EXPIRY_SECONDS: 900, // 15 minutes
  REFRESH_TOKEN_EXPIRY_SECONDS: 7 * 24 * 60 * 60, // 7 days
  RATE_LIMIT_MAX_ATTEMPTS: 10,
  RATE_LIMIT_WINDOW_MINUTES: 15,
  DEVICE_TRUST_DURATION_DAYS: 30,
  MAX_CONCURRENT_SESSIONS: 5,
  SUSPICIOUS_HOUR_START: 22, // 10 PM
  SUSPICIOUS_HOUR_END: 6,    // 6 AM
} as const;

// ============================================================
// Custom Exceptions
// ============================================================

export class AccountLockedException extends UnauthorizedException {
  constructor(remainingMinutes: number, lockLevel: LockLevel) {
    super(`Account is locked. Please try again in ${remainingMinutes} minutes.`);
    this.name = 'AccountLockedException';
  }
}

export class TooManyRequestsException extends UnauthorizedException {
  constructor(message: string) {
    super(message);
    this.name = 'TooManyRequestsException';
  }
}

export class MFASessionExpiredException extends UnauthorizedException {
  constructor() {
    super('MFA session has expired. Please login again.');
    this.name = 'MFASessionExpiredException';
  }
}

// ============================================================
// Login Handler
// ============================================================

@Injectable()
export class LoginHandler {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly sessionRepository: SessionRepository,
    private readonly refreshTokenRepository: RefreshTokenRepository,
    private readonly accountLockRepository: AccountLockRepository,
    private readonly deviceRepository: DeviceRepository,
    private readonly passwordHasher: PasswordHasher,
    private readonly tokenGenerator: TokenGenerator,
    private readonly mfaGenerator: MfaGenerator,
    private readonly eventBus: EventBus,
    private readonly transactionManager: TransactionManager,
    private readonly rateLimiter: RateLimiter,
    private readonly auditService: AuditService,
    private readonly securityService: SecurityService,
    private readonly cacheService: CacheService,
    private readonly notificationService: NotificationService,
    private readonly idGenerator: IdGenerator
  ) {}

  // ============================================================
  // Main Execute Method
  // ============================================================
  
  async execute(command: LoginCommand | PhoneLoginCommand | OtpLoginCommand): Promise<{
    accessToken: string;
    refreshToken: string;
    user: any;
    mfaRequired?: boolean;
    mfaSessionId?: string;
    mfaMethods?: string[];
  }> {
    // Route to appropriate handler based on command type
    if (command instanceof PhoneLoginCommand) {
      return this.handlePhoneLogin(command);
    }
    if (command instanceof OtpLoginCommand) {
      return this.handleOtpLogin(command);
    }
    return this.handleEmailLogin(command);
  }

  // ============================================================
  // Email Login Handler
  // ============================================================
  
  private async handleEmailLogin(command: LoginCommand): Promise<any> {
    const { identifier, password, deviceInfo, rememberMe, captchaToken, correlationId } = command;

    // 1. Rate limiting check by IP
    await this.checkRateLimiting(deviceInfo?.ipAddress, identifier, correlationId);

    // 2. CAPTCHA validation for suspicious attempts
    if (captchaToken) {
      const isValid = await this.securityService.validateCaptcha(captchaToken);
      if (!isValid) {
        throw new BadRequestException('Invalid CAPTCHA');
      }
    }

    // 3. Validate email format
    let email: Email;
    try {
      email = new Email(identifier);
    } catch (error) {
      await this.publishFailedLoginEvent(identifier, deviceInfo, LoginFailureReason.INVALID_EMAIL, correlationId);
      throw new UnauthorizedException('Invalid credentials');
    }

    // 4. Find user
    const user = await this.userRepository.findByEmail(email);
    
    if (!user) {
      await this.publishFailedLoginEvent(identifier, deviceInfo, LoginFailureReason.USER_NOT_FOUND, correlationId);
      throw new UnauthorizedException('Invalid credentials');
    }

    return this.processLogin(user, password, deviceInfo, rememberMe, correlationId, 'email');
  }

  // ============================================================
  // Phone Login Handler (Bangladesh specific)
  // ============================================================
  
  private async handlePhoneLogin(command: PhoneLoginCommand): Promise<any> {
    const { phoneNumber, password, deviceInfo, rememberMe, captchaToken, correlationId } = command;

    // 1. Rate limiting check by IP
    await this.checkRateLimiting(deviceInfo?.ipAddress, phoneNumber, correlationId);

    // 2. CAPTCHA validation
    if (captchaToken) {
      const isValid = await this.securityService.validateCaptcha(captchaToken);
      if (!isValid) {
        throw new BadRequestException('Invalid CAPTCHA');
      }
    }

    // 3. Validate phone format
    let phone: Phone;
    try {
      phone = new Phone(phoneNumber);
    } catch (error) {
      await this.publishFailedLoginEvent(phoneNumber, deviceInfo, LoginFailureReason.INVALID_PHONE, correlationId);
      throw new UnauthorizedException('Invalid credentials');
    }

    // 4. Find user by phone
    const user = await this.userRepository.findByPhone(phone);
    
    if (!user) {
      await this.publishFailedLoginEvent(phoneNumber, deviceInfo, LoginFailureReason.USER_NOT_FOUND, correlationId);
      throw new UnauthorizedException('Invalid credentials');
    }

    return this.processLogin(user, password, deviceInfo, rememberMe, correlationId, 'phone');
  }

  // ============================================================
  // OTP Login Handler (Passwordless - Bangladesh specific)
  // ============================================================
  
  private async handleOtpLogin(command: OtpLoginCommand): Promise<any> {
    const { phoneNumber, otpCode, deviceInfo, rememberMe, sessionId, correlationId } = command;

    // 1. Rate limiting check
    await this.checkRateLimiting(deviceInfo?.ipAddress, phoneNumber, correlationId);

    // 2. Validate OTP
    const isValidOtp = await this.mfaGenerator.verifySmsOtp(phoneNumber, otpCode, sessionId);
    if (!isValidOtp) {
      await this.publishFailedLoginEvent(phoneNumber, deviceInfo, LoginFailureReason.INVALID_OTP, correlationId);
      throw new UnauthorizedException('Invalid or expired OTP');
    }

    // 3. Find user by phone
    let phone: Phone;
    try {
      phone = new Phone(phoneNumber);
    } catch (error) {
      throw new UnauthorizedException('Invalid phone number');
    }

    const user = await this.userRepository.findByPhone(phone);
    
    if (!user) {
      // Auto-register for OTP login (optional feature)
      throw new UnauthorizedException('No account found with this phone number');
    }

    // 4. Process login without password
    return this.processLogin(user, undefined, deviceInfo, rememberMe, correlationId, 'otp');
  }

  // ============================================================
  // Core Login Processing
  // ============================================================
  
  private async processLogin(
    user: User,
    password: string | undefined,
    deviceInfo: any,
    rememberMe: boolean,
    correlationId: string | undefined,
    loginMethod: 'email' | 'phone' | 'otp'
  ): Promise<any> {
    // 1. Check account lock status
    const lockInfo = await this.checkAccountLock(user, deviceInfo, correlationId);
    if (lockInfo.isLocked) {
      throw new AccountLockedException(lockInfo.remainingMinutes, lockInfo.lockLevel);
    }

    // 2. Check account status
    this.validateAccountStatus(user);

    // 3. Verify password (skip for OTP login)
    if (loginMethod !== 'otp' && password) {
      const isValidPassword = await this.verifyPassword(user, password, deviceInfo, correlationId);
      if (!isValidPassword) {
        await this.handleFailedLogin(user, deviceInfo, correlationId);
        throw new UnauthorizedException('Invalid credentials');
      }
    }

    // 4. Reset failed attempts on successful login
    await this.resetFailedAttempts(user, correlationId);

    // 5. Register or update device
    const device = await this.registerOrUpdateDevice(user, deviceInfo, correlationId);

    // 6. MFA check
    if (user.isMfaEnabled()) {
      const isTrustedDevice = await this.isTrustedDevice(user.getId(), device?.getDeviceId()?.getValue());
      if (!isTrustedDevice) {
        const mfaSessionId = await this.createMfaSession(user.getId(), deviceInfo, correlationId);
        const mfaMethods = await this.getAvailableMfaMethods(user);
        return {
          mfaRequired: true,
          mfaSessionId,
          mfaMethods,
          accessToken: '',
          refreshToken: '',
          user: null,
        };
      }
    }

    // 7. Detect suspicious activity
    const isSuspicious = await this.detectSuspiciousActivity(user, device, deviceInfo, correlationId);
    const isNightTime = this.isNightTime();
    const isWeekend = this.isWeekend();

    // 8. Generate tokens
    const sessionDuration = this.calculateSessionDuration(rememberMe, deviceInfo?.networkType);
    const accessToken = await this.tokenGenerator.generateAccessToken(
      user.getId(),
      user.getEmail().getValue(),
      user.getRole(),
      { sessionId: this.idGenerator.generate() }
    );
    const refreshTokenValue = await this.tokenGenerator.generateRefreshToken(user.getId());

    // 9. Create session and tokens (with transaction)
    const { session, refreshToken } = await this.createUserSession(
      user,
      refreshTokenValue,
      device,
      deviceInfo,
      rememberMe,
      sessionDuration,
      correlationId
    );

    // 10. Update last login
    user.recordLogin();
    await this.userRepository.save(user);

    // 11. Send login alert for suspicious activity
    if (isSuspicious || (isNightTime && loginMethod !== 'otp')) {
      await this.sendLoginAlert(user, device, deviceInfo, correlationId, isSuspicious);
    }

    // 12. Publish success event
    await this.eventBus.publish(
      new UserLoggedInEvent(
        user.getId(),
        loginMethod as LoginMethod,
        LoginType.INITIAL,
        correlationId,
        undefined,
        deviceInfo?.ipAddress,
        device?.getDeviceId()?.getValue(),
        deviceInfo?.userAgent,
        session.getId(),
        undefined,
        isSuspicious,
        isNightTime,
        {
          rememberMe,
          sessionId: session.getId(),
          deviceTrustLevel: device?.getTrustLevel(),
          networkType: deviceInfo?.networkType,
          mobileOperator: deviceInfo?.mobileOperator,
          district: deviceInfo?.district,
          isWeekend,
        }
      )
    );

    // 13. Audit log
    await this.auditService.log({
      action: 'LOGIN_SUCCESS',
      userId: user.getId(),
      email: user.getEmail().getValue(),
      phoneNumber: user.getPhone()?.getValue(),
      ipAddress: deviceInfo?.ipAddress,
      deviceId: device?.getDeviceId()?.getValue(),
      userAgent: deviceInfo?.userAgent,
      correlationId,
      sessionId: session.getId(),
      isSuspicious,
      district: deviceInfo?.district,
      mobileOperator: deviceInfo?.mobileOperator,
      networkType: deviceInfo?.networkType,
    });

    // 14. Cache user session info
    await this.cacheUserSession(user, session.getId());

    return {
      accessToken,
      refreshToken: refreshTokenValue,
      user: {
        id: user.getId(),
        email: user.getEmail().getValue(),
        phoneNumber: user.getPhone()?.getValue(),
        fullName: user.getFullName(),
        displayName: user.getDisplayName(),
        role: user.getRole(),
        tier: user.getTier(),
        tierDiscount: user.getTierDiscount(),
        isEmailVerified: user.isEmailVerified(),
        isPhoneVerified: user.isPhoneVerified(),
        mfaEnabled: user.isMfaEnabled(),
        avatar: user.getAvatar(),
      },
    };
  }

  // ============================================================
  // Private Helper Methods
  // ============================================================

  private async checkRateLimiting(ipAddress: string | undefined, identifier: string, correlationId?: string): Promise<void> {
    if (!ipAddress) return;

    const key = `ratelimit:login:${ipAddress}`;
    const attempts = await this.rateLimiter.getCount(key, LOGIN_CONFIG.RATE_LIMIT_WINDOW_MINUTES * 60);

    if (attempts >= LOGIN_CONFIG.RATE_LIMIT_MAX_ATTEMPTS) {
      await this.auditService.log({
        action: 'LOGIN_RATE_LIMIT_EXCEEDED',
        ipAddress,
        email: this.maskEmail(identifier),
        correlationId,
      });
      throw new TooManyRequestsException('Too many login attempts. Please try again later.');
    }

    await this.rateLimiter.increment(key, LOGIN_CONFIG.RATE_LIMIT_WINDOW_MINUTES * 60);
  }

  private async checkAccountLock(
    user: User,
    deviceInfo: any,
    correlationId?: string
  ): Promise<{ isLocked: boolean; remainingMinutes: number; lockLevel: LockLevel }> {
    const accountLock = await this.accountLockRepository.findByUserId(user.getId());
    
    if (accountLock && accountLock.isLocked()) {
      const remainingMinutes = Math.ceil(accountLock.getRemainingLockTime() / (60 * 1000));
      
      await this.auditService.log({
        action: 'LOGIN_BLOCKED_LOCKED',
        userId: user.getId(),
        email: user.getEmail().getValue(),
        ipAddress: deviceInfo?.ipAddress,
        deviceId: deviceInfo?.deviceId,
        correlationId,
        remainingMinutes,
        lockLevel: accountLock.getLockLevel(),
      });
      
      return { isLocked: true, remainingMinutes, lockLevel: accountLock.getLockLevel() };
    }
    
    return { isLocked: false, remainingMinutes: 0, lockLevel: LockLevel.LEVEL_1 };
  }

  private validateAccountStatus(user: User): void {
    if (user.isSuspended()) {
      throw new UnauthorizedException('Account is suspended. Please contact support.');
    }
    
    if (!user.isActive() && !user.isPendingVerification()) {
      throw new UnauthorizedException('Account is inactive. Please verify your email or phone.');
    }

    if (user.isDeleted()) {
      throw new UnauthorizedException('Account no longer exists.');
    }
  }

  private async verifyPassword(user: User, password: string, deviceInfo: any, correlationId?: string): Promise<boolean> {
    const isValid = await this.passwordHasher.compare(password, user.getPassword().getValue());

    if (!isValid) {
      await this.auditService.log({
        action: 'LOGIN_FAILED_INVALID_PASSWORD',
        userId: user.getId(),
        email: user.getEmail().getValue(),
        ipAddress: deviceInfo?.ipAddress,
        deviceId: deviceInfo?.deviceId,
        correlationId,
      });
    }

    return isValid;
  }

  private async handleFailedLogin(user: User, deviceInfo: any, correlationId?: string): Promise<void> {
    const accountLock = await this.accountLockRepository.findByUserId(user.getId()) || 
      AccountLock.create(user.getId(), AccountLockReason.FAILED_LOGIN_ATTEMPTS);
    
    const failureCount = await this.accountLockRepository.incrementFailureCountForUser(user.getId());
    
    await this.publishFailedLoginEvent(
      user.getEmail().getValue(),
      deviceInfo,
      LoginFailureReason.INVALID_CREDENTIALS,
      correlationId,
      user.getId()
    );
    
    if (failureCount >= LOGIN_CONFIG.MAX_FAILED_ATTEMPTS && !accountLock.isLocked()) {
      accountLock.lock(AccountLockReason.FAILED_LOGIN_ATTEMPTS);
      await this.accountLockRepository.save(accountLock);
      
      await this.eventBus.publish(
        new AccountLockedEvent(
          user.getId(),
          LockReason.FAILED_LOGIN_ATTEMPTS,
          AccountLockMethod.AUTOMATIC,
          AccountLockSource.SYSTEM,
          correlationId,
          undefined,
          deviceInfo?.ipAddress,
          deviceInfo?.deviceId,
          undefined,
          failureCount,
          accountLock.getRemainingLockTime() / 1000,
          accountLock.getLockLevel(),
          { maxAttempts: LOGIN_CONFIG.MAX_FAILED_ATTEMPTS }
        )
      );
      
      // Send notification about account lock
      await this.notificationService.sendAccountLockedNotification(
        user.getId(),
        user.getEmail().getValue(),
        {
          reason: 'Too many failed login attempts',
          lockDurationMinutes: accountLock.getRemainingLockTime() / (60 * 1000),
          lockedAt: new Date(),
          remainingAttempts: 0,
          unlockMethod: 'time',
        },
        { correlationId }
      );
    }
  }

  private async resetFailedAttempts(user: User, correlationId?: string): Promise<void> {
    await this.accountLockRepository.resetFailureCountForUser(user.getId());
  }

  private async registerOrUpdateDevice(user: User, deviceInfo: any, correlationId?: string): Promise<Device | null> {
    if (!deviceInfo?.deviceId) return null;

    const deviceId = new DeviceId(deviceInfo.deviceId);
    let device = await this.deviceRepository.findByDeviceId(deviceId);
    const userAgent = new UserAgent(deviceInfo.userAgent || 'Unknown');
    const ipAddress = deviceInfo.ipAddress ? new IpAddress(deviceInfo.ipAddress) : undefined;

    if (!device) {
      // Register new device
      device = Device.register(
        user.getId(),
        deviceId,
        userAgent,
        undefined,
        ipAddress,
        this.idGenerator
      );
      await this.deviceRepository.save(device);
      
      await this.auditService.log({
        action: 'DEVICE_REGISTERED',
        userId: user.getId(),
        deviceId: deviceId.getValue(),
        userAgent: deviceInfo.userAgent,
        ipAddress: deviceInfo.ipAddress,
        correlationId,
      });
    } else {
      // Update existing device
      device.recordUsage(ipAddress);
      await this.deviceRepository.save(device);
    }

    return device;
  }

  private async isTrustedDevice(userId: string, deviceId?: string): Promise<boolean> {
    if (!deviceId) return false;
    
    const cacheKey = `trusted_devices:${userId}`;
    let trustedDevices = await this.cacheService.get<string[]>(cacheKey);
    
    if (!trustedDevices) {
      const devices = await this.deviceRepository.findByUserId(userId);
      trustedDevices = devices
        .filter(d => d.isTrusted())
        .map(d => d.getDeviceId().getValue());
      await this.cacheService.set(cacheKey, trustedDevices, 3600);
    }
    
    return trustedDevices.includes(deviceId);
  }

  private async getAvailableMfaMethods(user: User): Promise<string[]> {
    const methods: string[] = [];
    
    if (user.isMfaEnabled()) {
      methods.push('totp');
      if (user.getPhone()) {
        methods.push('sms');
        methods.push('whatsapp');
      }
      methods.push('backup_code');
    }
    
    return methods;
  }

  private async createMfaSession(userId: string, deviceInfo: any, correlationId?: string): Promise<string> {
    const mfaSessionId = this.idGenerator.generate();
    
    await this.cacheService.set(
      `mfa:session:${mfaSessionId}`,
      {
        userId,
        deviceInfo,
        correlationId,
        createdAt: new Date(),
      },
      300 // 5 minutes
    );
    
    return mfaSessionId;
  }

  private async createUserSession(
    user: User,
    refreshTokenValue: string,
    device: Device | null,
    deviceInfo: any,
    rememberMe: boolean,
    sessionDurationMinutes: number,
    correlationId?: string
  ): Promise<{ session: Session; refreshToken: RefreshToken }> {
    const deviceId = device?.getDeviceId() || new DeviceId(deviceInfo?.deviceId || this.idGenerator.generate());
    const ipAddress = new IpAddress(deviceInfo?.ipAddress || '0.0.0.0');
    const userAgent = new UserAgent(deviceInfo?.userAgent || 'Unknown');
    const token = new Token(refreshTokenValue, TokenType.REFRESH);
    
    const session = Session.create(
      user.getId(),
      token,
      ipAddress,
      userAgent,
      deviceId,
      sessionDurationMinutes,
      device?.getDeviceType(),
      deviceInfo?.location
    );
    
    const refreshToken = RefreshToken.create(
      user.getId(),
      token,
      this.idGenerator,
      deviceId,
      ipAddress,
      deviceInfo?.userAgent
    );
    
    // Enforce max concurrent sessions
    await this.enforceMaxSessions(user.getId(), session.getId(), correlationId);
    
    await this.transactionManager.runInTransaction(async () => {
      await this.sessionRepository.save(session);
      await this.refreshTokenRepository.save(refreshToken);
    });
    
    // Trust device if requested
    if (rememberMe && device && !device.isTrusted()) {
      device.trust(LOGIN_CONFIG.DEVICE_TRUST_DURATION_DAYS);
      await this.deviceRepository.save(device);
      
      await this.eventBus.publish(
        new DeviceTrustedEvent(
          user.getId(),
          device.getId(),
          device.getDeviceId().getValue(),
          device.getTrustLevel(),
          correlationId,
          deviceInfo?.ipAddress,
          deviceInfo?.userAgent
        )
      );
    }
    
    return { session, refreshToken };
  }

  private async enforceMaxSessions(userId: string, currentSessionId: string, correlationId?: string): Promise<void> {
    const activeSessions = await this.sessionRepository.findActiveSessions(userId);
    
    if (activeSessions.length >= LOGIN_CONFIG.MAX_CONCURRENT_SESSIONS) {
      // Sort by last activity (oldest first)
      const sorted = [...activeSessions].sort((a, b) => 
        a.getLastActivityAt().getTime() - b.getLastActivityAt().getTime()
      );
      
      const sessionsToRevoke = sorted.slice(0, activeSessions.length - LOGIN_CONFIG.MAX_CONCURRENT_SESSIONS + 1);
      
      for (const session of sessionsToRevoke) {
        if (session.getId() !== currentSessionId) {
          session.revoke('Max concurrent sessions reached');
          await this.sessionRepository.save(session);
          
          await this.auditService.log({
            action: 'SESSION_REVOKED_MAX_LIMIT',
            userId,
            sessionId: session.getId(),
            correlationId,
          });
        }
      }
    }
  }

  private calculateSessionDuration(rememberMe: boolean, networkType?: string): number {
    if (rememberMe) {
      return LOGIN_CONFIG.SESSION_DURATION_REMEMBER_MS / (60 * 1000);
    }
    
    // Longer sessions for mobile users (Bangladesh specific - poor network conditions)
    if (networkType === '2g' || networkType === '3g') {
      return LOGIN_CONFIG.SESSION_DURATION_MOBILE_MS / (60 * 1000);
    }
    
    return LOGIN_CONFIG.SESSION_DURATION_DEFAULT_MS / (60 * 1000);
  }

  private async detectSuspiciousActivity(
    user: User,
    device: Device | null,
    deviceInfo: any,
    correlationId?: string
  ): Promise<boolean> {
    const suspiciousFactors: string[] = [];
    let isSuspicious = false;
    
    // Check if device is new
    if (device && !device.isTrusted()) {
      suspiciousFactors.push('new_device');
      isSuspicious = true;
    }
    
    // Check if IP is from suspicious category
    if (deviceInfo?.ipAddress) {
      const ip = new IpAddress(deviceInfo.ipAddress);
      if (ip.isCloudProvider() || ip.getCategory() === IpCategory.CLOUD) {
        suspiciousFactors.push('cloud_ip');
        isSuspicious = true;
      }
    }
    
    // Check if login time is unusual (night time)
    if (this.isNightTime()) {
      suspiciousFactors.push('unusual_hour');
      isSuspicious = true;
    }
    
    // Check if from different district (Bangladesh specific)
    if (deviceInfo?.district && user.getPreferredDistrict() && 
        deviceInfo.district !== user.getPreferredDistrict()) {
      suspiciousFactors.push('different_district');
      isSuspicious = true;
    }
    
    if (isSuspicious) {
      await this.eventBus.publish(
        new SuspiciousActivityEvent(
          user.getId(),
          'login',
          'Suspicious login attempt detected',
          suspiciousFactors,
          correlationId,
          deviceInfo?.ipAddress,
          device?.getDeviceId()?.getValue(),
          deviceInfo?.userAgent,
          deviceInfo?.district,
          deviceInfo?.mobileOperator
        )
      );
    }
    
    return isSuspicious;
  }

  private async sendLoginAlert(
    user: User,
    device: Device | null,
    deviceInfo: any,
    correlationId: string | undefined,
    isSuspicious: boolean
  ): Promise<void> {
    await this.notificationService.sendLoginAlert(
      user.getId(),
      user.getEmail().getValue(),
      {
        ipAddress: deviceInfo?.ipAddress || 'unknown',
        location: deviceInfo?.district,
        deviceName: device?.getDeviceType(),
        browser: deviceInfo?.userAgent?.split(' ')[0],
        loginTime: new Date(),
        isNewDevice: device ? !device.isTrusted() : true,
        isNewLocation: true,
        loginMethod: 'password',
        isSuspicious,
      },
      { correlationId }
    );
  }

  private async cacheUserSession(user: User, sessionId: string): Promise<void> {
    const cacheKey = `user:session:${user.getId()}`;
    const sessions = await this.cacheService.get<string[]>(cacheKey) || [];
    if (!sessions.includes(sessionId)) {
      sessions.push(sessionId);
      await this.cacheService.set(cacheKey, sessions, 3600);
    }
  }

  private isNightTime(): boolean {
    const hour = new Date().getHours();
    return hour >= LOGIN_CONFIG.SUSPICIOUS_HOUR_START || hour < LOGIN_CONFIG.SUSPICIOUS_HOUR_END;
  }

  private isWeekend(): boolean {
    const day = new Date().getDay();
    // Friday = 5, Saturday = 6 (Bangladesh weekend)
    return day === 5 || day === 6;
  }

  private async publishFailedLoginEvent(
    identifier: string,
    deviceInfo: any,
    reason: LoginFailureReason,
    correlationId?: string,
    userId?: string
  ): Promise<void> {
    await this.eventBus.publish(
      new LoginFailedEvent(
        identifier,
        deviceInfo?.ipAddress || 'unknown',
        reason,
        correlationId,
        undefined,
        userId,
        {
          userAgent: deviceInfo?.userAgent,
          deviceId: deviceInfo?.deviceId,
          district: deviceInfo?.district,
          mobileOperator: deviceInfo?.mobileOperator,
        }
      )
    );
    
    await this.auditService.log({
      action: 'LOGIN_FAILED',
      userId,
      email: this.maskEmail(identifier),
      ipAddress: deviceInfo?.ipAddress,
      deviceId: deviceInfo?.deviceId,
      userAgent: deviceInfo?.userAgent,
      correlationId,
      reason,
      district: deviceInfo?.district,
      mobileOperator: deviceInfo?.mobileOperator,
    });
  }

  private maskEmail(email: string): string {
    const [local, domain] = email.split('@');
    if (!local || !domain) return email;
    const maskedLocal = local.length <= 2 
      ? local[0] + '***' 
      : local[0] + '***' + local[local.length - 1];
    return `${maskedLocal}@${domain}`;
  }
}
