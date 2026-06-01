/**
 * Social Login Command Handler - Application Layer
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module application/commands/auth/social-login.handler
 * 
 * @description
 * Handles social login use case with features including:
 * - New user registration via social provider
 * - Account linking for existing users
 * - Session management
 * - Event publishing
 * - Audit logging
 * - Rate limiting
 * - Bangladesh specific providers (WhatsApp, Imo, bKash, Nagad, Rocket)
 * 
 * Enterprise Rules:
 * ✅ Single responsibility - handles only social login
 * ✅ Repository coordination
 * ✅ Event publishing
 * ✅ Security validation
 * ✅ Transaction management
 */

import { Injectable, NotFoundException, UnauthorizedException, ConflictException, BadRequestException, TooManyRequestsException } from '@nestjs/common';

import { SocialLoginCommand, SocialProvider, DeviceInfo } from './social-login.command';
import { UserRepository } from '../../../domain/repositories/user.repository.interface';
import { SocialAccountRepository } from '../../../domain/repositories/social-account.repository.interface';
import { SessionRepository } from '../../../domain/repositories/session.repository.interface';
import { AccountLockRepository } from '../../../domain/repositories/account-lock.repository.interface';

import { SocialAccount, SocialAccountStatus } from '../../../domain/entities/social-account.entity';
import { User, UserStatus } from '../../../domain/entities/user.entity';
import { Session } from '../../../domain/entities/session.entity';

import { Email } from '../../../domain/value-objects/email.vo';
import { Password } from '../../../domain/value-objects/password.vo';
import { Phone } from '../../../domain/value-objects/phone.vo';
import { Token, TokenType } from '../../../domain/value-objects/token.vo';
import { IpAddress } from '../../../domain/value-objects/ip-address.vo';
import { UserAgent } from '../../../domain/value-objects/user-agent.vo';
import { DeviceId } from '../../../domain/value-objects/device-id.vo';

import { UserRegisteredEvent, RegistrationMethod, RegistrationSource } from '../../events/user-registered.event';
import { UserLoggedInEvent, LoginMethod, LoginType } from '../../events/user-logged-in.event';
import { SocialAccountLinkedEvent } from '../../events/social-account-linked.event';

import { SocialAuthProvider, TokenGenerator, EventBus, AuditService, RateLimiter, TransactionManager, IdGenerator } from './infrastructure.interface';

// ============================================================
// Constants
// ============================================================

const SESSION_CONFIG = {
  REMEMBER_ME_HOURS: 30 * 24, // 30 days
  DEFAULT_HOURS: 24, // 24 hours
};

const RATE_LIMIT_CONFIG = {
  MAX_ATTEMPTS_PER_HOUR: 10,
  WINDOW_HOURS: 1,
};

// Bangladesh specific provider configurations
const BD_PROVIDER_CONFIG = {
  WHATSAPP: { requiresPhone: true, requiresOtp: true },
  IMO: { requiresPhone: true, requiresOtp: true },
  TELEGRAM: { requiresPhone: true, requiresOtp: false },
  BKASH: { requiresPhone: true, requiresPin: true },
  NAGAD: { requiresPhone: true, requiresPin: true },
  ROCKET: { requiresPhone: true, requiresPin: true },
};

// ============================================================
// Social Login Response DTO
// ============================================================

export interface SocialLoginResponseDto {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  refreshExpiresIn: number;
  isNewUser: boolean;
  user: {
    id: string;
    email: string;
    phoneNumber?: string;
    fullName: string;
    displayName: string;
    role: string;
    userTier: string;
    isEmailVerified: boolean;
    isPhoneVerified: boolean;
  };
}

// ============================================================
// Social Login Handler
// ============================================================

@Injectable()
export class SocialLoginHandler {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly socialAccountRepository: SocialAccountRepository,
    private readonly sessionRepository: SessionRepository,
    private readonly accountLockRepository: AccountLockRepository,
    private readonly socialAuthProvider: SocialAuthProvider,
    private readonly tokenGenerator: TokenGenerator,
    private readonly eventBus: EventBus,
    private readonly auditService: AuditService,
    private readonly rateLimiter: RateLimiter,
    private readonly transactionManager: TransactionManager,
    private readonly idGenerator: IdGenerator
  ) {}

  async execute(command: SocialLoginCommand): Promise<SocialLoginResponseDto> {
    const { 
      provider, 
      accessToken, 
      deviceInfo, 
      rememberMe, 
      state, 
      correlationId,
      phoneNumber,
      otpCode,
      pin
    } = command;

    // 1. Rate limiting check
    await this.checkRateLimiting(deviceInfo?.ipAddress, correlationId);

    // 2. Validate provider-specific requirements (Bangladesh specific)
    await this.validateProviderRequirements(provider, phoneNumber, otpCode, pin, correlationId);

    // 3. Validate state parameter (CSRF protection) - for OAuth providers only
    if (command.isOAuthFlow() && !command.hasState()) {
      throw new BadRequestException('Missing state parameter');
    }

    // 4. Get user info from provider
    let userInfo;
    try {
      userInfo = await this.socialAuthProvider.getUserInfo(provider, accessToken, phoneNumber, otpCode, pin);
    } catch (error) {
      await this.auditService.log({
        action: 'SOCIAL_LOGIN_PROVIDER_ERROR',
        provider,
        error: error.message,
        ipAddress: deviceInfo?.ipAddress,
        correlationId,
      });
      throw new UnauthorizedException('Failed to authenticate with social provider');
    }

    // 5. Check if social account exists
    let socialAccount = await this.socialAccountRepository.findByProvider(
      provider,
      userInfo.providerUserId
    );
    
    let user: User;
    let isNewUser = false;
    let isNewConnection = false;

    // 6. Process login/registration
    if (socialAccount && socialAccount.isActive()) {
      // Case 1: Existing social account
      user = await this.userRepository.findById(socialAccount.getUserId());
      if (!user) {
        throw new NotFoundException('User not found');
      }
      
      // Check account status
      await this.validateAccountStatus(user);
      
      // Update last used timestamp
      socialAccount.updateLastUsed();
      await this.socialAccountRepository.save(socialAccount);
      
    } else {
      // Case 2: New social login
      const email = userInfo.email ? new Email(userInfo.email) : null;
      const phone = userInfo.phoneNumber ? new Phone(userInfo.phoneNumber) : null;
      
      let existingUser = null;
      if (email) {
        existingUser = await this.userRepository.findByEmail(email);
      }
      if (!existingUser && phone) {
        existingUser = await this.userRepository.findByPhone(phone);
      }
      
      if (existingUser) {
        // Case 2a: Link social account to existing user
        user = existingUser;
        
        // Check account status
        await this.validateAccountStatus(user);
        
        // Create social account link
        socialAccount = SocialAccount.linkProvider(
          user.getId(),
          provider,
          userInfo.providerUserId,
          email,
          null,
          this.idGenerator.generate(),
          userInfo.name,
          provider === SocialProvider.BKASH || provider === SocialProvider.NAGAD || provider === SocialProvider.ROCKET
        );
        
        await this.socialAccountRepository.save(socialAccount);
        isNewConnection = true;
        
        // Publish account linked event
        await this.eventBus.publish(
          new SocialAccountLinkedEvent(
            user.getId(),
            provider,
            userInfo.email || '',
            correlationId,
            deviceInfo?.ipAddress,
            deviceInfo?.deviceId
          )
        );
        
      } else {
        // Case 2b: Create new user
        isNewUser = true;
        
        // Generate secure random password
        const randomPassword = await this.generateSecurePassword();
        
        user = User.create(
          email || new Email(`${userInfo.providerUserId}@${provider.toLowerCase()}.vubon.com.bd`),
          randomPassword,
          userInfo.name,
          this.idGenerator.generate(),
          phone,
          'en'
        );
        
        // Auto-verify email if provider verified it
        if (userInfo.emailVerified && email) {
          user.verifyEmail();
        }
        
        // Auto-verify phone if provided
        if (phone) {
          user.verifyPhone();
        }
        
        // Create social account
        socialAccount = SocialAccount.linkProvider(
          user.getId(),
          provider,
          userInfo.providerUserId,
          email,
          phone,
          this.idGenerator.generate(),
          userInfo.name,
          provider === SocialProvider.BKASH || provider === SocialProvider.NAGAD || provider === SocialProvider.ROCKET
        );
        
        await this.transactionManager.runInTransaction(async () => {
          await this.userRepository.save(user);
          await this.socialAccountRepository.save(socialAccount);
        });
        
        // Publish user registered event
        await this.eventBus.publish(
          new UserRegisteredEvent(
            user.getId(),
            user.getEmail().getValue(),
            user.getFullName(),
            this.getRegistrationMethod(provider),
            this.getRegistrationSource(deviceInfo),
            correlationId,
            undefined,
            deviceInfo?.ipAddress,
            deviceInfo?.deviceId,
            deviceInfo?.userAgent,
            userInfo.emailVerified || false,
            !!phone,
            undefined,
            user.getRole(),
            undefined,
            { provider, isNewUser: true }
          )
        );
      }
    }

    // 7. Update social account tokens
    socialAccount.updateTokens(accessToken, userInfo.refreshToken);
    await this.socialAccountRepository.save(socialAccount);

    // 8. Update last login
    user.recordLogin();
    await this.userRepository.save(user);

    // 9. Reset failed attempts (if any)
    await this.accountLockRepository.resetFailureCountForUser(user.getId());

    // 10. Generate tokens
    const accessTokenJwt = await this.tokenGenerator.generateAccessToken(
      user.getId(),
      user.getEmail().getValue(),
      user.getRole(),
      { sessionId: this.idGenerator.generate() }
    );
    const refreshTokenValue = await this.tokenGenerator.generateRefreshToken(user.getId());

    // 11. Create session
    const sessionDurationHours = rememberMe 
      ? SESSION_CONFIG.REMEMBER_ME_HOURS 
      : SESSION_CONFIG.DEFAULT_HOURS;
    
    const deviceId = new DeviceId(deviceInfo?.deviceId || this.idGenerator.generate());
    const ipAddress = new IpAddress(deviceInfo?.ipAddress || '0.0.0.0');
    const userAgent = new UserAgent(deviceInfo?.userAgent || 'Unknown');
    const token = new Token(refreshTokenValue, TokenType.REFRESH);
    
    const session = Session.create(
      user.getId(),
      token,
      ipAddress,
      userAgent,
      deviceId,
      sessionDurationHours * 60,
      undefined,
      undefined,
      this.idGenerator
    );
    await this.sessionRepository.save(session);

    // 12. Publish login event
    await this.eventBus.publish(
      new UserLoggedInEvent(
        user.getId(),
        this.getLoginMethod(provider),
        isNewUser ? LoginType.INITIAL : (isNewConnection ? LoginType.SOCIAL_CONNECT : LoginType.INITIAL),
        correlationId,
        undefined,
        deviceInfo?.ipAddress,
        deviceInfo?.deviceId,
        deviceInfo?.userAgent,
        session.getId(),
        undefined,
        false,
        false,
        { provider, isNewUser, isNewConnection }
      )
    );

    // 13. Audit log
    await this.auditService.log({
      action: isNewUser ? 'SOCIAL_REGISTRATION' : (isNewConnection ? 'SOCIAL_ACCOUNT_LINKED' : 'SOCIAL_LOGIN'),
      userId: user.getId(),
      email: user.getEmail().getValue(),
      phoneNumber: user.getPhone()?.getValue(),
      provider,
      isNewUser,
      isNewConnection,
      ipAddress: deviceInfo?.ipAddress,
      deviceId: deviceInfo?.deviceId,
      userAgent: deviceInfo?.userAgent,
      correlationId,
      district: deviceInfo?.district,
      mobileOperator: deviceInfo?.mobileOperator,
    });

    // 14. Update rate limiting
    await this.incrementRateLimits(deviceInfo?.ipAddress);

    return {
      accessToken: accessTokenJwt,
      refreshToken: refreshTokenValue,
      expiresIn: 900, // 15 minutes
      refreshExpiresIn: 604800, // 7 days
      isNewUser,
      user: {
        id: user.getId(),
        email: user.getEmail().getValue(),
        phoneNumber: user.getPhone()?.getValue(),
        fullName: user.getFullName(),
        displayName: user.getDisplayName(),
        role: user.getRole(),
        userTier: user.getTier(),
        isEmailVerified: user.isEmailVerified(),
        isPhoneVerified: user.isPhoneVerified(),
      },
    };
  }

  // ============================================================
  // Private Helper Methods
  // ============================================================

  private async checkRateLimiting(ipAddress?: string, correlationId?: string): Promise<void> {
    if (!ipAddress) return;

    const key = `ratelimit:social-login:${ipAddress}`;
    const attempts = await this.rateLimiter.getCount(key, RATE_LIMIT_CONFIG.WINDOW_HOURS * 3600);

    if (attempts >= RATE_LIMIT_CONFIG.MAX_ATTEMPTS_PER_HOUR) {
      await this.auditService.log({
        action: 'SOCIAL_LOGIN_RATE_LIMITED',
        ipAddress,
        correlationId,
      });
      throw new TooManyRequestsException('Too many social login attempts. Please try again later.');
    }
  }

  private async incrementRateLimits(ipAddress?: string): Promise<void> {
    if (!ipAddress) return;
    const key = `ratelimit:social-login:${ipAddress}`;
    await this.rateLimiter.increment(key, RATE_LIMIT_CONFIG.WINDOW_HOURS * 3600);
  }

  private async validateAccountStatus(user: User): Promise<void> {
    if (user.isDeleted()) {
      throw new UnauthorizedException('Account has been deleted');
    }
    if (user.isSuspended()) {
      throw new UnauthorizedException('Account is suspended');
    }
    if (user.isLocked()) {
      throw new UnauthorizedException('Account is locked');
    }
    if (!user.isActive() && !user.isPendingVerification()) {
      throw new UnauthorizedException('Account is inactive');
    }
  }

  private async validateProviderRequirements(
    provider: SocialProvider,
    phoneNumber?: string,
    otpCode?: string,
    pin?: string,
    correlationId?: string
  ): Promise<void> {
    const config = BD_PROVIDER_CONFIG[provider as keyof typeof BD_PROVIDER_CONFIG];
    if (!config) return; // International provider, no additional validation

    if (config.requiresPhone && !phoneNumber) {
      throw new BadRequestException(`Phone number is required for ${provider}`);
    }

    if (config.requiresOtp && !otpCode) {
      throw new BadRequestException(`OTP code is required for ${provider}`);
    }

    if (config.requiresPin && !pin) {
      throw new BadRequestException(`PIN is required for ${provider}`);
    }

    // Phone number format validation
    if (phoneNumber) {
      const phoneRegex = /^\+8801[3-9]\d{8}$/;
      if (!phoneRegex.test(phoneNumber)) {
        throw new BadRequestException('Invalid Bangladesh phone number format');
      }
    }
  }

  private async generateSecurePassword(): Promise<Password> {
    // Generate a secure random password (16 characters with special chars)
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
    let password = '';
    for (let i = 0; i < 16; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return new Password(password);
  }

  private getRegistrationMethod(provider: SocialProvider): RegistrationMethod {
    const methodMap: Record<SocialProvider, RegistrationMethod> = {
      [SocialProvider.GOOGLE]: RegistrationMethod.SOCIAL_GOOGLE,
      [SocialProvider.FACEBOOK]: RegistrationMethod.SOCIAL_FACEBOOK,
      [SocialProvider.GITHUB]: RegistrationMethod.SOCIAL_GITHUB,
      [SocialProvider.APPLE]: RegistrationMethod.SOCIAL_APPLE,
      [SocialProvider.TWITTER]: RegistrationMethod.SOCIAL_TWITTER,
      [SocialProvider.LINKEDIN]: RegistrationMethod.SOCIAL_LINKEDIN,
      [SocialProvider.MICROSOFT]: RegistrationMethod.SOCIAL_MICROSOFT,
      [SocialProvider.INSTAGRAM]: RegistrationMethod.SOCIAL_INSTAGRAM,
      [SocialProvider.WHATSAPP]: RegistrationMethod.SOCIAL_WHATSAPP,
      [SocialProvider.IMO]: RegistrationMethod.SOCIAL_IMO,
      [SocialProvider.TELEGRAM]: RegistrationMethod.SOCIAL_TELEGRAM,
      [SocialProvider.VIBER]: RegistrationMethod.SOCIAL_VIBER,
      [SocialProvider.BKASH]: RegistrationMethod.SOCIAL_BKASH,
      [SocialProvider.NAGAD]: RegistrationMethod.SOCIAL_NAGAD,
      [SocialProvider.ROCKET]: RegistrationMethod.SOCIAL_ROCKET,
    };
    return methodMap[provider] || RegistrationMethod.SOCIAL_GOOGLE;
  }

  private getLoginMethod(provider: SocialProvider): LoginMethod {
    const methodMap: Record<SocialProvider, LoginMethod> = {
      [SocialProvider.GOOGLE]: LoginMethod.SOCIAL_GOOGLE,
      [SocialProvider.FACEBOOK]: LoginMethod.SOCIAL_FACEBOOK,
      [SocialProvider.GITHUB]: LoginMethod.SOCIAL_GITHUB,
      [SocialProvider.APPLE]: LoginMethod.SOCIAL_APPLE,
      [SocialProvider.TWITTER]: LoginMethod.SOCIAL_TWITTER,
      [SocialProvider.LINKEDIN]: LoginMethod.SOCIAL_LINKEDIN,
      [SocialProvider.MICROSOFT]: LoginMethod.SOCIAL_MICROSOFT,
      [SocialProvider.INSTAGRAM]: LoginMethod.SOCIAL_INSTAGRAM,
      [SocialProvider.WHATSAPP]: LoginMethod.SOCIAL_WHATSAPP,
      [SocialProvider.IMO]: LoginMethod.SOCIAL_IMO,
      [SocialProvider.TELEGRAM]: LoginMethod.SOCIAL_TELEGRAM,
      [SocialProvider.VIBER]: LoginMethod.SOCIAL_VIBER,
      [SocialProvider.BKASH]: LoginMethod.SOCIAL_BKASH,
      [SocialProvider.NAGAD]: LoginMethod.SOCIAL_NAGAD,
      [SocialProvider.ROCKET]: LoginMethod.SOCIAL_ROCKET,
    };
    return methodMap[provider] || LoginMethod.SOCIAL_GOOGLE;
  }

  private getRegistrationSource(deviceInfo?: DeviceInfo): RegistrationSource {
    const userAgent = deviceInfo?.userAgent?.toLowerCase() || '';
    if (userAgent.includes('mobile')) {
      return RegistrationSource.MOBILE_APP;
    }
    if (userAgent.includes('tablet')) {
      return RegistrationSource.MOBILE_APP;
    }
    if (deviceInfo?.networkType === 'wifi') {
      return RegistrationSource.WEB;
    }
    return RegistrationSource.SOCIAL;
  }
}

// ============================================================
// Type Exports
// ============================================================

export type { SocialLoginResponseDto as SocialLoginResponseDtoType };
