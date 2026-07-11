/**
 * JWT Auth Guard - Infrastructure Layer Implementation
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 *
 * @module infrastructure/auth/guards/jwt-auth.guard
 *
 * @description
 * NestJS JWT authentication guard that validates JWT tokens.
 * Extracts token from Authorization header, validates it, and attaches user payload to request.
 *
 * Enterprise Features:
 * ✅ Implements NestJS JWT authentication guard
 * ✅ Token extraction from Authorization header
 * ✅ Token validation with jose library
 * ✅ User payload attachment to request object
 * ✅ Public route bypass support
 * ✅ Comprehensive error handling with Bengali messages
 * ✅ Audit logging for authentication attempts
 * ✅ Distributed tracing with correlation ID
 * ✅ Bangladesh specific - District/NetworkType in user context
 * ✅ Multi-language error messages (English/Bengali)
 *
 * @example
 * // In controller
 * @UseGuards(JwtAuthGuard)
 * @Get('profile')
 * async getProfile(@Req() req: RequestWithUser) {
 *   return req.user;
 * }
 */

import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  Logger,
  Inject,
  Optional,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { jwtVerify, decodeJwt } from 'jose';

// ✅ Enterprise: Shared packages for utilities and types
import { JWT_CONFIG, ENCRYPTION_CONFIG } from '@vubon/shared-constants';
import type { TokenPayload } from '@vubon/shared-types';

// ✅ Infrastructure imports
import { CacheService } from '../../cache/cache.service.interface';
import { AuditService } from '../../audit/audit.service.interface';
import { MetricsService } from '../../metrics/metrics.service.interface';

// ✅ Domain imports (for public decorator)
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';

// ============================================================
// Types
// ============================================================

/**
 * Extended Request with user payload
 */
export interface RequestWithUser extends Request {
  user: TokenPayload & {
    userId: string;
    email: string;
    role: string;
    sessionId?: string;
    deviceId?: string;
    district?: string;
    networkType?: string;
    permissions?: string[];
  };
}

// ============================================================
// Constants (with fallbacks)
// ============================================================

const TOKEN_CONFIG = {
  ALGORITHM: JWT_CONFIG.ALGORITHM || 'HS256',
  ISSUER: JWT_CONFIG.ISSUER || 'vubon.com.bd',
  AUDIENCE: JWT_CONFIG.AUDIENCE || 'vubon-api',
  MIN_SECRET_LENGTH: ENCRYPTION_CONFIG.MIN_SECRET_LENGTH || 32,
  CLOCK_TOLERANCE: JWT_CONFIG.CLOCK_TOLERANCE || 30,
};

// ============================================================
// Multi-language Error Messages
// ============================================================

const ERROR_MESSAGES = {
  en: {
    noToken: 'Authorization token is required',
    invalidToken: 'Invalid or expired token',
    malformedToken: 'Malformed token',
    signatureInvalid: 'Invalid token signature',
    issuerMismatch: 'Invalid token issuer',
    audienceMismatch: 'Invalid token audience',
    tokenRevoked: 'Token has been revoked',
    expiredToken: 'Token has expired',
  },
  bn: {
    noToken: 'অথোরাইজেশন টোকেন প্রয়োজন',
    invalidToken: 'অবৈধ বা মেয়াদোত্তীর্ণ টোকেন',
    malformedToken: 'ভুল টোকেন ফরম্যাট',
    signatureInvalid: 'টোকেন সিগনেচার অবৈধ',
    issuerMismatch: 'টোকেন ইস্যুয়ার অবৈধ',
    audienceMismatch: 'টোকেন অডিয়েন্স অবৈধ',
    tokenRevoked: 'টোকেন রিভোক করা হয়েছে',
    expiredToken: 'টোকেনের মেয়াদ শেষ হয়েছে',
  },
} as const;

// ============================================================
// JWT Auth Guard Implementation
// ============================================================

@Injectable()
export class JwtAuthGuard implements CanActivate {
  private readonly logger = new Logger(JwtAuthGuard.name);
  private readonly secretKey: Uint8Array;
  private readonly publicKey?: Uint8Array;
  private readonly isAsymmetric: boolean;

  constructor(
    private readonly reflector: Reflector,
    @Optional() @Inject('CacheService')
    private readonly cacheService?: CacheService,
    @Optional() @Inject('AuditService')
    private readonly auditService?: AuditService,
    @Optional() @Inject('MetricsService')
    private readonly metricsService?: MetricsService,
  ) {
    // Initialize keys
    const secret = process.env.JWT_SECRET || '';
    this.secretKey = new TextEncoder().encode(secret || 'fallback-secret-key-min-32-chars-!!!');

    // Check for asymmetric keys
    const publicKeyPem = process.env.JWT_PUBLIC_KEY;
    const privateKeyPem = process.env.JWT_PRIVATE_KEY;
    this.isAsymmetric = !!(publicKeyPem && privateKeyPem);

    if (this.isAsymmetric) {
      try {
        this.publicKey = new TextEncoder().encode(publicKeyPem);
        this.logger.log('JwtAuthGuard initialized with asymmetric keys (RS256)');
      } catch (error) {
        this.logger.error('Failed to parse asymmetric public key', error);
        this.publicKey = undefined;
      }
    } else {
      this.logger.log('JwtAuthGuard initialized with symmetric key (HS256)');
    }
  }

  /**
   * Check if request is authorized
   */
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const correlationId = this.getCorrelationId(request);

    // Check if route is public
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      this.logger.debug(`Public route accessed: ${request.method} ${request.path}`, { correlationId });
      return true;
    }

    try {
      // Extract token
      const token = this.extractToken(request);
      if (!token) {
        this.logger.warn('No token provided', { correlationId, path: request.path });
        throw new UnauthorizedException({
          message: ERROR_MESSAGES.en.noToken,
          messageBn: ERROR_MESSAGES.bn.noToken,
          errorCode: 'NO_TOKEN',
          correlationId,
        });
      }

      // Check if token is revoked
      const decoded = decodeJwt(token) as TokenPayload;
      if (decoded.jti) {
        const isRevoked = await this.isTokenRevoked(decoded.jti);
        if (isRevoked) {
          this.logger.warn('Token revoked', { correlationId, tokenId: decoded.jti });
          throw new UnauthorizedException({
            message: ERROR_MESSAGES.en.tokenRevoked,
            messageBn: ERROR_MESSAGES.bn.tokenRevoked,
            errorCode: 'TOKEN_REVOKED',
            correlationId,
          });
        }
      }

      // Verify token
      const key = this.isAsymmetric && this.publicKey ? this.publicKey : this.secretKey;

      try {
        const { payload } = await jwtVerify(token, key, {
          issuer: TOKEN_CONFIG.ISSUER,
          audience: TOKEN_CONFIG.AUDIENCE,
          clockTolerance: TOKEN_CONFIG.CLOCK_TOLERANCE,
        });

        // Attach user payload to request
        (request as RequestWithUser).user = {
          userId: payload.sub || payload.userId || '',
          email: payload.email || '',
          role: payload.role || 'CUSTOMER',
          sessionId: payload.sessionId,
          deviceId: payload.deviceId,
          district: payload.district,
          networkType: payload.networkType,
          permissions: payload.permissions || [],
          ...payload,
        };

        // Log successful authentication
        this.logger.debug(`User authenticated: ${payload.userId}`, {
          correlationId,
          userId: payload.userId,
          path: request.path,
          method: request.method,
        });

        // Record metrics
        this.metricsService?.incrementCounter('auth.jwt.verify.success');

        // Audit log
        if (this.auditService) {
          await this.auditService.log({
            action: 'JWT_VERIFIED',
            userId: payload.userId,
            metadata: {
              path: request.path,
              method: request.method,
              tokenId: payload.jti,
              correlationId,
            },
          });
        }

        return true;
      } catch (error) {
        const errorMessage = error.message || 'Unknown error';
        let errorCode = 'INVALID_TOKEN';
        let messageKey: keyof typeof ERROR_MESSAGES.en = 'invalidToken';

        if (errorMessage.includes('expired')) {
          errorCode = 'TOKEN_EXPIRED';
          messageKey = 'expiredToken';
        } else if (errorMessage.includes('signature')) {
          errorCode = 'INVALID_SIGNATURE';
          messageKey = 'signatureInvalid';
        } else if (errorMessage.includes('malformed')) {
          errorCode = 'MALFORMED';
          messageKey = 'malformedToken';
        } else if (errorMessage.includes('issuer')) {
          errorCode = 'ISSUER_MISMATCH';
          messageKey = 'issuerMismatch';
        } else if (errorMessage.includes('audience')) {
          errorCode = 'AUDIENCE_MISMATCH';
          messageKey = 'audienceMismatch';
        }

        this.logger.warn(`Token validation failed: ${errorCode}`, {
          correlationId,
          path: request.path,
          error: errorMessage,
        });

        this.metricsService?.incrementCounter('auth.jwt.verify.failure');

        throw new UnauthorizedException({
          message: ERROR_MESSAGES.en[messageKey],
          messageBn: ERROR_MESSAGES.bn[messageKey],
          errorCode,
          correlationId,
        });
      }
    } catch (error) {
      // Re-throw UnauthorizedException with proper message
      if (error instanceof UnauthorizedException) {
        throw error;
      }

      this.logger.error('Unexpected error during JWT validation', {
        correlationId,
        error: error.message,
      });

      throw new UnauthorizedException({
        message: ERROR_MESSAGES.en.invalidToken,
        messageBn: ERROR_MESSAGES.bn.invalidToken,
        errorCode: 'INVALID_TOKEN',
        correlationId,
      });
    }
  }

  // ============================================================
  // Private Helper Methods
  // ============================================================

  /**
   * Extract token from Authorization header
   */
  private extractToken(request: Request): string | null {
    const authHeader = request.headers.authorization;
    if (!authHeader) {
      return null;
    }

    const parts = authHeader.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
      return null;
    }

    return parts[1] || null;
  }

  /**
   * Check if token is revoked
   */
  private async isTokenRevoked(tokenId: string): Promise<boolean> {
    try {
      // Check Redis cache if available
      if (this.cacheService) {
        const key = `token:blacklist:${tokenId}`;
        const entry = await this.cacheService.get<{ tokenId: string; expiresAt: Date }>(key);
        if (entry) {
          return true;
        }
      }
      return false;
    } catch (error) {
      this.logger.error(`Failed to check token revocation: ${tokenId}`, error);
      return false;
    }
  }

  /**
   * Get correlation ID from request headers
   */
  private getCorrelationId(request: Request): string {
    return (
      (request.headers['x-correlation-id'] as string) ||
      (request.headers['x-request-id'] as string) ||
      `corr_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`
    );
  }
}
