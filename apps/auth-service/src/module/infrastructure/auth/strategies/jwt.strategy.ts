/**
 * JWT Strategy - Infrastructure Layer Implementation
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 *
 * @module infrastructure/auth/strategies/jwt.strategy
 *
 * @description
 * Passport JWT Strategy for validating JWT tokens from Authorization header.
 * Extracts user information from validated token and attaches to request.
 *
 * Enterprise Features:
 * ✅ Implements Passport JWT Strategy
 * ✅ Extracts user info from JWT payload
 * ✅ Validates token signature and expiration
 * ✅ Supports both HS256 and RS256 algorithms
 * ✅ Extracts device info from token claims
 * ✅ Audit logging for token validation
 * ✅ Distributed tracing with correlation ID
 * ✅ Multi-language error messages
 * ✅ Bangladesh specific - District/Network type in claims
 *
 * @example
 * // In auth.module.ts
 * @Module({
 *   imports: [PassportModule],
 *   providers: [JwtStrategy, AuthService],
 * })
 * export class AuthModule {}
 */

import { Injectable, UnauthorizedException, Logger, Inject } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { randomUUID } from 'crypto';

// ✅ Enterprise: Shared packages
import { JWT_CONFIG } from '@vubon/shared-constants';
import type { TokenPayload } from '@vubon/shared-types';
import { maskEmail } from '@vubon/shared-utils';

// ✅ Domain & Application imports
import { AuthService } from '../../../application/services/interfaces/auth.service.interface';

// ============================================================
// Types
// ============================================================

/**
 * JWT Payload interface (extends TokenPayload)
 */
export interface JwtPayload extends TokenPayload {
  /** JWT ID (unique identifier) */
  jti?: string;
  /** Token version */
  version?: number;
}

/**
 * Validated user from JWT
 */
export interface ValidatedUser {
  userId: string;
  email: string;
  phone?: string;
  fullName: string;
  role: string;
  tier: string;
  sessionId?: string;
  deviceId?: string;
  district?: string;
  networkType?: string;
  permissions: string[];
}

// ============================================================
// Multi-language Error Messages
// ============================================================

const ERROR_MESSAGES = {
  en: {
    unauthorized: 'Unauthorized access',
    tokenExpired: 'Token has expired',
    tokenInvalid: 'Invalid token',
    userNotFound: 'User not found',
    accountInactive: 'Account is inactive',
    accountSuspended: 'Account is suspended',
  },
  bn: {
    unauthorized: 'অনুমোদিত অ্যাক্সেস নয়',
    tokenExpired: 'টোকেনের মেয়াদ শেষ হয়েছে',
    tokenInvalid: 'অবৈধ টোকেন',
    userNotFound: 'ইউজার পাওয়া যায়নি',
    accountInactive: 'অ্যাকাউন্ট নিষ্ক্রিয়',
    accountSuspended: 'অ্যাকাউন্ট স্থগিত করা হয়েছে',
  },
} as const;

// ============================================================
// JWT Strategy Implementation
// ============================================================

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  private readonly logger = new Logger(JwtStrategy.name);

  constructor(
    @Inject('AuthService')
    private readonly authService: AuthService,
  ) {
    super({
      // Extract JWT from Authorization header
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      
      // Reject expired tokens
      ignoreExpiration: false,
      
      // Get secret or public key from environment
      secretOrKeyProvider: (request: Request, rawJwtToken: string, done: (err: Error | null, secretOrKey?: string | Buffer) => void) => {
        try {
          // Determine algorithm from token header
          const tokenParts = rawJwtToken.split('.');
          if (tokenParts.length !== 3) {
            return done(new Error('Invalid token format'));
          }
          
          const header = JSON.parse(Buffer.from(tokenParts[0], 'base64').toString());
          const algorithm = header.alg || 'HS256';
          
          // Use RS256 public key if algorithm is asymmetric
          if (algorithm.startsWith('RS') || algorithm.startsWith('ES')) {
            const publicKey = process.env.JWT_PUBLIC_KEY;
            if (!publicKey) {
              return done(new Error('Public key not configured for RS/ES algorithm'));
            }
            return done(null, publicKey);
          }
          
          // Use HS256 secret
          const secret = process.env.JWT_SECRET;
          if (!secret) {
            return done(new Error('JWT secret not configured'));
          }
          return done(null, secret);
        } catch (error) {
          return done(new Error(`Failed to get secret: ${error.message}`));
        }
      },
      
      // Pass request to validate method
      passReqToCallback: true,
      
      // Validate audience and issuer
      audience: process.env.JWT_AUDIENCE || 'vubon-api',
      issuer: process.env.JWT_ISSUER || 'vubon.com.bd',
      
      // Clock tolerance for token expiry (30 seconds)
      clockTolerance: 30,
    });

    this.logger.log('JwtStrategy initialized');
  }

  /**
   * Validate JWT payload and return user object
   *
   * @param req - Express Request object
   * @param payload - Decoded JWT payload
   * @returns Validated user object
   * @throws {UnauthorizedException} If validation fails
   */
  async validate(req: Request, payload: JwtPayload): Promise<ValidatedUser> {
    const startTime = Date.now();
    const correlationId = this.getCorrelationId(req);
    const ipAddress = this.getClientIp(req);

    this.logger.debug(`JWT validation for user: ${payload.sub || payload.userId}`, {
      correlationId,
      tokenId: payload.jti,
      tokenType: payload.type,
    });

    try {
      // Check if token is of correct type (should be access token)
      if (payload.type && payload.type !== 'access') {
        this.logger.warn(`Invalid token type: ${payload.type}`, { correlationId });
        throw new UnauthorizedException({
          message: ERROR_MESSAGES.en.tokenInvalid,
          messageBn: ERROR_MESSAGES.bn.tokenInvalid,
          errorCode: 'INVALID_TOKEN_TYPE',
          correlationId,
        });
      }

      // Check if token is expired (extra safety)
      if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) {
        this.logger.warn('Token expired', { correlationId });
        throw new UnauthorizedException({
          message: ERROR_MESSAGES.en.tokenExpired,
          messageBn: ERROR_MESSAGES.bn.tokenExpired,
          errorCode: 'TOKEN_EXPIRED',
          correlationId,
        });
      }

      // Get user ID from payload
      const userId = payload.sub || payload.userId;
      if (!userId) {
        throw new UnauthorizedException({
          message: ERROR_MESSAGES.en.tokenInvalid,
          messageBn: ERROR_MESSAGES.bn.tokenInvalid,
          errorCode: 'INVALID_TOKEN',
          correlationId,
        });
      }

      // Fetch user from database to ensure account is still valid
      const user = await this.authService.getUserById(userId);
      if (!user) {
        this.logger.warn(`User not found: ${userId}`, { correlationId });
        throw new UnauthorizedException({
          message: ERROR_MESSAGES.en.userNotFound,
          messageBn: ERROR_MESSAGES.bn.userNotFound,
          errorCode: 'USER_NOT_FOUND',
          correlationId,
        });
      }

      // Check account status
      if (user.status === 'SUSPENDED') {
        this.logger.warn(`Account suspended: ${userId}`, { correlationId });
        throw new UnauthorizedException({
          message: ERROR_MESSAGES.en.accountSuspended,
          messageBn: ERROR_MESSAGES.bn.accountSuspended,
          errorCode: 'ACCOUNT_SUSPENDED',
          correlationId,
        });
      }

      if (user.status === 'INACTIVE' || user.status === 'DEACTIVATED') {
        this.logger.warn(`Account inactive: ${userId}`, { correlationId });
        throw new UnauthorizedException({
          message: ERROR_MESSAGES.en.accountInactive,
          messageBn: ERROR_MESSAGES.bn.accountInactive,
          errorCode: 'ACCOUNT_INACTIVE',
          correlationId,
        });
      }

      // Build validated user object
      const validatedUser: ValidatedUser = {
        userId: user.id,
        email: user.email,
        phone: user.phone || undefined,
        fullName: user.fullName || user.displayName || 'User',
        role: user.role || 'CUSTOMER',
        tier: user.tier || 'BRONZE',
        sessionId: payload.sessionId,
        deviceId: payload.deviceId,
        district: payload.district || user.preferredDistrict,
        networkType: payload.networkType,
        permissions: payload.permissions || [],
      };

      this.logger.debug(`User validated: ${maskEmail(user.email)}`, {
        correlationId,
        userId: user.id,
        duration: Date.now() - startTime,
      });

      // Attach user to request for later use
      (req as any).user = validatedUser;

      return validatedUser;
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }

      this.logger.error(`JWT validation failed: ${error.message}`, {
        correlationId,
        error: error.stack,
      });

      throw new UnauthorizedException({
        message: ERROR_MESSAGES.en.unauthorized,
        messageBn: ERROR_MESSAGES.bn.unauthorized,
        errorCode: 'UNAUTHORIZED',
        correlationId,
      });
    }
  }

  // ============================================================
  // Private Helper Methods
  // ============================================================

  /**
   * Get correlation ID from request headers
   */
  private getCorrelationId(req: Request): string {
    return (
      (req.headers['x-correlation-id'] as string) ||
      (req.headers['x-request-id'] as string) ||
      randomUUID().substring(0, 8)
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
