/**
 * Local Strategy - Infrastructure Layer Implementation
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 *
 * @module infrastructure/auth/strategies/local.strategy
 *
 * @description
 * Passport Local Strategy for username/password authentication.
 * Validates user credentials and returns user object for JWT generation.
 *
 * Enterprise Features:
 * ✅ Implements Passport Local Strategy
 * ✅ Integrates with domain AuthService
 * ✅ Comprehensive error handling with Bengali messages
 * ✅ Audit logging for login attempts
 * ✅ Rate limiting awareness
 * ✅ Device fingerprinting support
 * ✅ Bangladesh specific - Phone number support
 * ✅ Multi-language error messages (English/Bengali)
 * ✅ Distributed tracing with correlation ID
 *
 * @example
 * // In auth.module.ts
 * @Module({
 *   imports: [PassportModule],
 *   providers: [LocalStrategy, AuthService],
 * })
 * export class AuthModule {}
 */

import { Injectable, UnauthorizedException, Logger, Inject, Scope } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { Request } from 'express';

// ✅ Enterprise: Shared packages for utilities and types
import { maskEmail, maskPhone, normalizePhone } from '@vubon/shared-utils';
import type { LoginMethod } from '@vubon/shared-types';

// ✅ Domain & Application imports
import { AuthService } from '../../../application/services/interfaces/auth.service.interface';

// ============================================================
// Types
// ============================================================

/**
 * Extended Request with device info
 */
interface RequestWithDeviceInfo extends Request {
  deviceInfo?: {
    ipAddress?: string;
    userAgent?: string;
    deviceId?: string;
    deviceFingerprint?: string;
    platform?: string;
    screenResolution?: string;
    language?: string;
    timezone?: string;
    district?: string;
    networkType?: string;
    mobileOperator?: string;
  };
}

/**
 * Local strategy validation result
 */
export interface LocalValidationResult {
  userId: string;
  email: string;
  phone?: string;
  fullName: string;
  role: string;
  tier: string;
  mfaEnabled: boolean;
  requiresMfa: boolean;
  sessionId?: string;
}

// ============================================================
// Multi-language Error Messages
// ============================================================

const ERROR_MESSAGES = {
  en: {
    invalidCredentials: 'Invalid email or password',
    accountLocked: 'Account is locked due to multiple failed attempts',
    accountSuspended: 'Account has been suspended',
    accountInactive: 'Account is inactive',
    accountDeleted: 'Account has been deleted',
    emailNotVerified: 'Email address is not verified',
    phoneNotVerified: 'Phone number is not verified',
    mfaRequired: 'MFA verification required',
    rateLimited: 'Too many login attempts. Please try again later',
  },
  bn: {
    invalidCredentials: 'ভুল ইমেইল বা পাসওয়ার্ড',
    accountLocked: 'একাধিক ব্যর্থ চেষ্টার কারণে অ্যাকাউন্টটি লক করা হয়েছে',
    accountSuspended: 'অ্যাকাউন্ট স্থগিত করা হয়েছে',
    accountInactive: 'অ্যাকাউন্ট নিষ্ক্রিয়',
    accountDeleted: 'অ্যাকাউন্ট মুছে ফেলা হয়েছে',
    emailNotVerified: 'ইমেইল ঠিকানা যাচাই করা হয়নি',
    phoneNotVerified: 'ফোন নম্বর যাচাই করা হয়নি',
    mfaRequired: 'MFA যাচাই প্রয়োজন',
    rateLimited: 'অনেকবার লগইন চেষ্টা করা হয়েছে। পরে আবার চেষ্টা করুন',
  },
} as const;

// ============================================================
// Local Strategy Implementation
// ============================================================

@Injectable({ scope: Scope.TRANSIENT })
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  private readonly logger = new Logger(LocalStrategy.name);

  constructor(
    @Inject('AuthService')
    private readonly authService: AuthService,
  ) {
    super({
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true,
      session: false,
    });

    this.logger.log('LocalStrategy initialized');
  }

  /**
   * Validate user credentials
   *
   * @param req - Express Request object with device info
   * @param username - Email, phone, or username
   * @param password - User password
   * @returns Validated user object
   * @throws {UnauthorizedException} If validation fails
   */
  async validate(
    req: RequestWithDeviceInfo,
    username: string,
    password: string,
  ): Promise<LocalValidationResult> {
    const startTime = Date.now();
    const correlationId = this.getCorrelationId(req);
    const ipAddress = this.getClientIp(req);
    const userAgent = req.headers['user-agent'] || 'unknown';

    this.logger.debug(`Login attempt for: ${maskEmail(username)}`, {
      correlationId,
      ipAddress,
      userAgent,
    });

    try {
      // Determine login method
      const loginMethod = this.detectLoginMethod(username);

      // Extract device info
      const deviceInfo = this.extractDeviceInfo(req);

      // Validate credentials via AuthService
      const result = await this.authService.validateUser(
        username,
        password,
        loginMethod,
        {
          ipAddress,
          userAgent,
          deviceId: deviceInfo?.deviceId,
          deviceFingerprint: deviceInfo?.deviceFingerprint,
          correlationId,
          district: deviceInfo?.district,
          networkType: deviceInfo?.networkType,
        },
      );

      // Check if user is locked or suspended
      if (result.isLocked) {
        this.logger.warn(`Account locked for user: ${result.userId}`, { correlationId });
        throw new UnauthorizedException({
          message: ERROR_MESSAGES.en.accountLocked,
          messageBn: ERROR_MESSAGES.bn.accountLocked,
          errorCode: 'ACCOUNT_LOCKED',
          correlationId,
        });
      }

      if (result.isSuspended) {
        this.logger.warn(`Account suspended for user: ${result.userId}`, { correlationId });
        throw new UnauthorizedException({
          message: ERROR_MESSAGES.en.accountSuspended,
          messageBn: ERROR_MESSAGES.bn.accountSuspended,
          errorCode: 'ACCOUNT_SUSPENDED',
          correlationId,
        });
      }

      // Check if MFA is required
      if (result.requiresMfa) {
        this.logger.debug(`MFA required for user: ${result.userId}`, { correlationId });
        return {
          userId: result.userId,
          email: result.email,
          phone: result.phone,
          fullName: result.fullName,
          role: result.role,
          tier: result.tier,
          mfaEnabled: true,
          requiresMfa: true,
          sessionId: result.sessionId,
        };
      }

      // Success
      this.logger.debug(`User validated successfully: ${result.userId}`, {
        correlationId,
        duration: Date.now() - startTime,
      });

      return {
        userId: result.userId,
        email: result.email,
        phone: result.phone,
        fullName: result.fullName,
        role: result.role,
        tier: result.tier,
        mfaEnabled: result.mfaEnabled || false,
        requiresMfa: false,
        sessionId: result.sessionId,
      };
    } catch (error) {
      // Handle specific errors
      if (error instanceof UnauthorizedException) {
        throw error;
      }

      // Rate limiting error
      if (error.message?.includes('rate limit') || error.message?.includes('too many')) {
        throw new UnauthorizedException({
          message: ERROR_MESSAGES.en.rateLimited,
          messageBn: ERROR_MESSAGES.bn.rateLimited,
          errorCode: 'RATE_LIMITED',
          correlationId,
        });
      }

      // Account not found or invalid credentials
      this.logger.warn(`Authentication failed for: ${maskEmail(username)}`, {
        correlationId,
        error: error.message,
      });

      throw new UnauthorizedException({
        message: ERROR_MESSAGES.en.invalidCredentials,
        messageBn: ERROR_MESSAGES.bn.invalidCredentials,
        errorCode: 'INVALID_CREDENTIALS',
        correlationId,
      });
    }
  }

  // ============================================================
  // Private Helper Methods
  // ============================================================

  /**
   * Detect login method from identifier
   */
  private detectLoginMethod(identifier: string): LoginMethod {
    const trimmed = identifier.trim();

    // Check if it's an email
    if (trimmed.includes('@') && trimmed.includes('.')) {
      return 'email';
    }

    // Check if it's a phone number (Bangladesh or international)
    const phoneRegex = /^(?:\+880|0)1[3-9]\d{8}$/;
    if (phoneRegex.test(trimmed) || /^\+[1-9]\d{1,14}$/.test(trimmed)) {
      return 'phone';
    }

    // Default to username
    return 'username';
  }

  /**
   * Extract device information from request
   */
  private extractDeviceInfo(req: RequestWithDeviceInfo): RequestWithDeviceInfo['deviceInfo'] | undefined {
    const deviceInfo = req.deviceInfo || {};

    return {
      ipAddress: this.getClientIp(req),
      userAgent: req.headers['user-agent'],
      deviceId: deviceInfo.deviceId,
      deviceFingerprint: deviceInfo.deviceFingerprint,
      platform: deviceInfo.platform,
      screenResolution: deviceInfo.screenResolution,
      language: deviceInfo.language,
      timezone: deviceInfo.timezone,
      district: deviceInfo.district,
      networkType: deviceInfo.networkType,
      mobileOperator: deviceInfo.mobileOperator,
    };
  }

  /**
   * Get correlation ID from request headers
   */
  private getCorrelationId(req: Request): string {
    return (
      (req.headers['x-correlation-id'] as string) ||
      (req.headers['x-request-id'] as string) ||
      `corr_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`
    );
  }

  /**
   * Get client IP from request
   */
  private getClientIp(req: Request): string {
    return (
      (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() ||
      (req.headers['x-real-ip'] as string) ||
      req.ip ||
      req.socket?.remoteAddress ||
      'unknown'
    );
  }
}
