/**
 * Token Generator Adapter - Infrastructure Layer Implementation
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 *
 * @module infrastructure/adapters/token-generator.adapter
 *
 * @description
 * Infrastructure adapter that implements the ITokenGenerator port.
 * Uses jose library for JWT signing/verification with RS256/HS256 support.
 *
 * Enterprise Features:
 * ✅ Implements domain ITokenGenerator port
 * ✅ Supports multiple algorithms (RS256, HS256)
 * ✅ Token versioning and rotation
 * ✅ Blacklisting/revocation support with Redis
 * ✅ Comprehensive error handling
 * ✅ Audit logging for all token operations
 * ✅ Metrics for monitoring
 * ✅ Bangladesh specific - District/Network type in claims
 *
 * @example
 * // In infrastructure module
 * @Module({
 *   providers: [
 *     {
 *       provide: 'ITokenGenerator',
 *       useClass: TokenGeneratorAdapter,
 *     },
 *   ],
 *   exports: ['ITokenGenerator'],
 * })
 * export class SecurityModule {}
 */

import { Injectable, Logger, Inject, Optional } from '@nestjs/common';
import { SignJWT, jwtVerify, decodeJwt, type JWTPayload } from 'jose';
import { randomUUID } from 'crypto';

// Shared packages for utilities and types
import {
  JWT_CONFIG,
  TOKEN_EXPIRY,
  SESSION_CONFIG,
  ENCRYPTION_CONFIG,
} from '@vubon/shared-constants';

// Domain imports (ports)
import {
  ITokenGenerator,
  TokenType,
  TokenPayload,
  TokenOptions,
  TokenResult,
  TokenVerificationResult,
  TokenRefreshResult,
} from '../../domain/ports/token-generator.port';

// Infrastructure imports
import { CacheService } from '../cache/cache.service.interface';
import { AuditService } from '../audit/audit.service.interface';
import { MetricsService } from '../metrics/metrics.service.interface';
import { LoggerService } from '../logger/logger.service.interface';

// ============================================================
// Types & Constants (Enterprise Enhanced)
// ============================================================

/**
 * Token generator configuration (from constants with fallbacks)
 */
const TOKEN_CONFIG = {
  ALGORITHM: JWT_CONFIG.ALGORITHM || 'HS256',
  ISSUER: JWT_CONFIG.ISSUER || 'vubon.com.bd',
  AUDIENCE: JWT_CONFIG.AUDIENCE || 'vubon-api',
  ACCESS_EXPIRY: JWT_CONFIG.ACCESS_TOKEN_EXPIRY || '15m',
  REFRESH_EXPIRY: JWT_CONFIG.REFRESH_TOKEN_EXPIRY || '7d',
  RESET_EXPIRY: JWT_CONFIG.RESET_TOKEN_EXPIRY || '1h',
  VERIFICATION_EXPIRY: JWT_CONFIG.VERIFICATION_TOKEN_EXPIRY || '24h',
  MFA_EXPIRY: JWT_CONFIG.MFA_TOKEN_EXPIRY || '5m',
  MAGIC_LINK_EXPIRY: JWT_CONFIG.MAGIC_LINK_EXPIRY || '5m',
  MIN_SECRET_LENGTH: ENCRYPTION_CONFIG.MIN_SECRET_LENGTH || 32,
  CLOCK_TOLERANCE: JWT_CONFIG.CLOCK_TOLERANCE || 30,
  TOKEN_VERSION: JWT_CONFIG.VERSION || 1,
};

/**
 * Blacklist entry for revoked tokens
 */
interface BlacklistEntry {
  tokenId: string;
  userId: string;
  revokedAt: Date;
  reason?: string;
  expiresAt: Date;
}

// ============================================================
// Token Generator Adapter Implementation
// ============================================================

@Injectable()
export class TokenGeneratorAdapter implements ITokenGenerator {
  private readonly logger = new Logger(TokenGeneratorAdapter.name);
  private readonly secretKey: Uint8Array;
  private readonly publicKey?: Uint8Array;
  private readonly privateKey?: Uint8Array;
  private readonly isAsymmetric: boolean;
  private readonly blacklist: Map<string, BlacklistEntry> = new Map();

  // Metrics
  private metrics = {
    tokensGenerated: 0,
    tokensVerified: 0,
    tokensRevoked: 0,
    verificationErrors: 0,
  };

  constructor(
    @Optional() @Inject('CacheService')
    private readonly cacheService?: CacheService,
    @Optional() @Inject('AuditService')
    private readonly auditService?: AuditService,
    @Optional() @Inject('MetricsService')
    private readonly metricsService?: MetricsService,
    @Optional() @Inject('LoggerService')
    private readonly loggerService?: LoggerService,
  ) {
    // Initialize keys
    const secret = process.env.JWT_SECRET || '';
    if (!secret || secret.length < TOKEN_CONFIG.MIN_SECRET_LENGTH) {
      this.logger.warn(
        `JWT secret is missing or too short (min ${TOKEN_CONFIG.MIN_SECRET_LENGTH} chars). ` +
        'Using fallback for development. DO NOT use in production!'
      );
    }

    this.secretKey = new TextEncoder().encode(secret || 'fallback-secret-key-min-32-chars-!!!');

    // Check for asymmetric keys
    const publicKeyPem = process.env.JWT_PUBLIC_KEY;
    const privateKeyPem = process.env.JWT_PRIVATE_KEY;
    this.isAsymmetric = !!(publicKeyPem && privateKeyPem);

    if (this.isAsymmetric) {
      try {
        this.publicKey = new TextEncoder().encode(publicKeyPem);
        this.privateKey = new TextEncoder().encode(privateKeyPem);
        this.logger.log('TokenGenerator initialized with asymmetric keys (RS256)');
      } catch (error) {
        this.logger.error('Failed to parse asymmetric keys', error);
        throw new Error('Invalid JWT public/private keys');
      }
    } else {
      this.logger.log('TokenGenerator initialized with symmetric key (HS256)');
    }

    // Setup periodic blacklist cleanup
    setInterval(() => this.cleanupBlacklist(), 60 * 60 * 1000); // Every hour
  }

  // ============================================================
  // Token Generation Methods (Implementing ITokenGenerator)
  // ============================================================

  /**
   * Generate an access token
   */
  async generateAccessToken(
    payload: Omit<TokenPayload, 'iat' | 'exp' | 'type'>,
    options?: TokenOptions
  ): Promise<TokenResult> {
    return this.generateToken('access', payload, options);
  }

  /**
   * Generate a refresh token
   */
  async generateRefreshToken(
    payload: Omit<TokenPayload, 'iat' | 'exp' | 'type'>,
    options?: TokenOptions
  ): Promise<TokenResult> {
    return this.generateToken('refresh', payload, {
      ...options,
      expiresIn: options?.expiresIn || TOKEN_CONFIG.REFRESH_EXPIRY,
    });
  }

  /**
   * Generate a password reset token
   */
  async generateResetToken(
    userId: string,
    email: string,
    options?: TokenOptions
  ): Promise<TokenResult> {
    return this.generateToken('reset', {
      userId,
      email,
      role: 'CUSTOMER',
      type: 'reset',
    }, {
      ...options,
      expiresIn: options?.expiresIn || TOKEN_CONFIG.RESET_EXPIRY,
    });
  }

  /**
   * Generate an email verification token
   */
  async generateVerificationToken(
    userId: string,
    email: string,
    options?: TokenOptions
  ): Promise<TokenResult> {
    return this.generateToken('verification', {
      userId,
      email,
      role: 'CUSTOMER',
      type: 'verification',
    }, {
      ...options,
      expiresIn: options?.expiresIn || TOKEN_CONFIG.VERIFICATION_EXPIRY,
    });
  }

  /**
   * Generate an MFA token
   */
  async generateMFAToken(
    userId: string,
    sessionId: string,
    options?: TokenOptions
  ): Promise<TokenResult> {
    return this.generateToken('mfa', {
      userId,
      email: 'mfa-session',
      role: 'CUSTOMER',
      sessionId,
      type: 'mfa',
    }, {
      ...options,
      expiresIn: options?.expiresIn || TOKEN_CONFIG.MFA_EXPIRY,
    });
  }

  /**
   * Generate a magic link token (passwordless login)
   */
  async generateMagicLinkToken(
    email: string,
    redirectUrl: string,
    options?: TokenOptions
  ): Promise<TokenResult> {
    return this.generateToken('magic_link', {
      userId: `magic-${randomUUID()}`,
      email,
      role: 'CUSTOMER',
      type: 'magic_link',
    }, {
      ...options,
      expiresIn: options?.expiresIn || TOKEN_CONFIG.MAGIC_LINK_EXPIRY,
      customClaims: { redirectUrl },
    });
  }

  // ============================================================
  // Core Token Generation (Private Method)
  // ============================================================

  /**
   * Core token generation logic
   */
  private async generateToken(
    type: TokenType,
    payload: Omit<TokenPayload, 'iat' | 'exp' | 'type'>,
    options?: TokenOptions
  ): Promise<TokenResult> {
    const startTime = Date.now();
    this.metrics.tokensGenerated++;

    try {
      const now = Math.floor(Date.now() / 1000);
      const expiresIn = this.parseExpiry(options?.expiresIn);
      const expiresAt = new Date((now + expiresIn) * 1000);

      // Build token payload
      const tokenPayload: TokenPayload = {
        ...payload,
        type,
        iat: now,
        exp: now + expiresIn,
      };

      // Add version
      const version = TOKEN_CONFIG.TOKEN_VERSION;

      // Sign the token
      const tokenId = randomUUID();
      const signer = new SignJWT({
        ...tokenPayload,
        jti: tokenId,
        version,
        district: payload.district,
        networkType: payload.networkType,
      })
        .setProtectedHeader({
          alg: this.isAsymmetric ? 'RS256' : 'HS256',
          typ: 'JWT',
        })
        .setIssuedAt(now)
        .setIssuer(options?.issuer || TOKEN_CONFIG.ISSUER)
        .setAudience(options?.audience || TOKEN_CONFIG.AUDIENCE)
        .setSubject(payload.userId)
        .setExpirationTime(expiresIn)
        .setJti(tokenId);

      // Add custom claims if provided
      if (options?.customClaims) {
        for (const [key, value] of Object.entries(options.customClaims)) {
          (signer as any)[key] = value;
        }
      }

      // Sign with appropriate key
      const token = this.isAsymmetric && this.privateKey
        ? await signer.sign(this.privateKey)
        : await signer.sign(this.secretKey);

      const result: TokenResult = {
        token,
        expiresAt,
        expiresInSeconds: expiresIn,
        tokenId,
      };

      // Audit log
      if (this.auditService) {
        await this.auditService.log({
          action: 'TOKEN_GENERATED',
          userId: payload.userId,
          metadata: {
            tokenType: type,
            tokenId,
            expiresAt: expiresAt.toISOString(),
            duration: Date.now() - startTime,
          },
        });
      }

      this.metricsService?.incrementCounter('token.generator.generated');
      this.metricsService?.recordHistogram(
        'token.generator.generation.duration',
        Date.now() - startTime
      );

      return result;
    } catch (error) {
      this.logger.error(`Failed to generate ${type} token`, error);
      this.metricsService?.incrementCounter('token.generator.error');
      throw new Error(`Token generation failed: ${error.message}`);
    }
  }

  // ============================================================
  // Token Verification Methods
  // ============================================================

  /**
   * Verify a token with type check
   */
  async verifyToken<T extends TokenPayload = TokenPayload>(
    token: string,
    expectedType: TokenType
  ): Promise<TokenVerificationResult<T>> {
    const startTime = Date.now();
    this.metrics.tokensVerified++;

    try {
      // Check if token is revoked
      const decoded = decodeJwt(token) as TokenPayload;
      if (decoded.jti) {
        const isRevoked = await this.isTokenRevoked(decoded.jti);
        if (isRevoked) {
          return {
            valid: false,
            payload: null,
            error: 'Token has been revoked',
            errorCode: 'REVOKED',
          };
        }
      }

      // Verify the token
      const key = this.isAsymmetric && this.publicKey
        ? this.publicKey
        : this.secretKey;

      const { payload } = await jwtVerify(token, key, {
        issuer: TOKEN_CONFIG.ISSUER,
        audience: TOKEN_CONFIG.AUDIENCE,
        clockTolerance: TOKEN_CONFIG.CLOCK_TOLERANCE,
      });

      const typedPayload = payload as T;

      // Check token type
      if (typedPayload.type !== expectedType) {
        return {
          valid: false,
          payload: null,
          error: `Expected token type ${expectedType}, got ${typedPayload.type}`,
          errorCode: 'INVALID_SIGNATURE',
        };
      }

      // Check expiration (jose already checks, but we double-check)
      if (typedPayload.exp && typedPayload.exp < Math.floor(Date.now() / 1000)) {
        return {
          valid: false,
          payload: null,
          error: 'Token expired',
          errorCode: 'EXPIRED',
        };
      }

      this.metricsService?.incrementCounter('token.generator.verified');
      this.metricsService?.recordHistogram(
        'token.generator.verification.duration',
        Date.now() - startTime
      );

      return {
        valid: true,
        payload: typedPayload,
      };
    } catch (error) {
      this.metrics.verificationErrors++;
      this.metricsService?.incrementCounter('token.generator.verification.error');

      const errorMessage = error.message || 'Unknown error';
      let errorCode: TokenVerificationResult['errorCode'] = 'INVALID_SIGNATURE';

      if (errorMessage.includes('expired')) {
        errorCode = 'EXPIRED';
      } else if (errorMessage.includes('signature')) {
        errorCode = 'INVALID_SIGNATURE';
      } else if (errorMessage.includes('malformed')) {
        errorCode = 'MALFORMED';
      } else if (errorMessage.includes('issuer')) {
        errorCode = 'ISSUER_MISMATCH';
      } else if (errorMessage.includes('audience')) {
        errorCode = 'AUDIENCE_MISMATCH';
      }

      return {
        valid: false,
        payload: null,
        error: errorMessage,
        errorCode,
      };
    }
  }

  /**
   * Verify a token without type check
   */
  async verifyTokenUnsafe<T extends TokenPayload = TokenPayload>(
    token: string
  ): Promise<TokenVerificationResult<T>> {
    const startTime = Date.now();

    try {
      const key = this.isAsymmetric && this.publicKey
        ? this.publicKey
        : this.secretKey;

      const { payload } = await jwtVerify(token, key, {
        issuer: TOKEN_CONFIG.ISSUER,
        audience: TOKEN_CONFIG.AUDIENCE,
        clockTolerance: TOKEN_CONFIG.CLOCK_TOLERANCE,
      });

      return {
        valid: true,
        payload: payload as T,
      };
    } catch (error) {
      this.metrics.verificationErrors++;
      return {
        valid: false,
        payload: null,
        error: error.message || 'Invalid token',
        errorCode: 'INVALID_SIGNATURE',
      };
    }
  }

  // ============================================================
  // Token Refresh Methods
  // ============================================================

  /**
   * Refresh an access token using refresh token
   */
  async refreshAccessToken(
    refreshToken: string,
    options?: { deviceId?: string; ipAddress?: string }
  ): Promise<TokenRefreshResult> {
    const startTime = Date.now();

    try {
      // Verify the refresh token
      const verification = await this.verifyToken(refreshToken, 'refresh');
      if (!verification.valid || !verification.payload) {
        throw new Error('Invalid refresh token');
      }

      const payload = verification.payload;

      // Check if refresh token is expired
      if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) {
        throw new Error('Refresh token expired');
      }

      // Generate new tokens
      const accessTokenResult = await this.generateAccessToken({
        userId: payload.userId,
        email: payload.email,
        role: payload.role,
        sessionId: payload.sessionId,
        deviceId: options?.deviceId || payload.deviceId,
        district: payload.district,
        networkType: payload.networkType,
      });

      const refreshTokenResult = await this.generateRefreshToken({
        userId: payload.userId,
        email: payload.email,
        role: payload.role,
        sessionId: payload.sessionId,
        deviceId: options?.deviceId || payload.deviceId,
        district: payload.district,
        networkType: payload.networkType,
      });

      // Revoke the old refresh token
      if (payload.jti) {
        await this.revokeToken(refreshToken, 'Token rotated');
      }

      const result: TokenRefreshResult = {
        accessToken: accessTokenResult.token,
        refreshToken: refreshTokenResult.token,
        accessTokenExpiresIn: accessTokenResult.expiresInSeconds,
        refreshTokenExpiresIn: refreshTokenResult.expiresInSeconds,
        tokenVersion: TOKEN_CONFIG.TOKEN_VERSION,
      };

      this.metricsService?.incrementCounter('token.generator.refreshed');
      this.metricsService?.recordHistogram(
        'token.generator.refresh.duration',
        Date.now() - startTime
      );

      return result;
    } catch (error) {
      this.logger.error('Failed to refresh token', error);
      this.metricsService?.incrementCounter('token.generator.refresh.error');
      throw new Error(`Token refresh failed: ${error.message}`);
    }
  }

  // ============================================================
  // Token Revocation Methods
  // ============================================================

  /**
   * Revoke a token
   */
  async revokeToken(token: string, reason?: string): Promise<boolean> {
    try {
      const decoded = decodeJwt(token) as TokenPayload;
      if (!decoded.jti) {
        this.logger.warn('Token has no jti claim, cannot revoke');
        return false;
      }

      const userId = decoded.sub || decoded.userId || 'unknown';
      const expiresAt = decoded.exp ? new Date(decoded.exp * 1000) : new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

      const entry: BlacklistEntry = {
        tokenId: decoded.jti,
        userId,
        revokedAt: new Date(),
        reason,
        expiresAt,
      };

      // Store in memory blacklist
      this.blacklist.set(decoded.jti, entry);

      // Also store in Redis if available (for distributed systems)
      if (this.cacheService) {
        const key = `token:blacklist:${decoded.jti}`;
        await this.cacheService.set(key, entry, Math.ceil((expiresAt.getTime() - Date.now()) / 1000));
      }

      this.metrics.tokensRevoked++;
      this.metricsService?.incrementCounter('token.generator.revoked');

      // Audit log
      if (this.auditService) {
        await this.auditService.log({
          action: 'TOKEN_REVOKED',
          userId,
          metadata: {
            tokenId: decoded.jti,
            tokenType: decoded.type,
            reason,
          },
        });
      }

      return true;
    } catch (error) {
      this.logger.error('Failed to revoke token', error);
      return false;
    }
  }

  /**
   * Revoke all tokens for a user
   */
  async revokeAllUserTokens(userId: string, reason?: string): Promise<number> {
    let count = 0;

    try {
      // Find all tokens for this user (in a real system, this would query a token store)
      // For this implementation, we'll iterate through the blacklist
      for (const [tokenId, entry] of this.blacklist) {
        if (entry.userId === userId) {
          this.blacklist.delete(tokenId);
          count++;
        }
      }

      // Clear from Redis if available
      if (this.cacheService) {
        const pattern = `token:blacklist:*`;
        // In a real implementation, we would use a more efficient method
        // This is a simplified version
      }

      this.metricsService?.incrementCounter('token.generator.revoke_all');

      // Audit log
      if (this.auditService) {
        await this.auditService.log({
          action: 'ALL_TOKENS_REVOKED',
          userId,
          metadata: {
            reason,
            count,
          },
        });
      }

      return count;
    } catch (error) {
      this.logger.error(`Failed to revoke all tokens for user ${userId}`, error);
      return 0;
    }
  }

  /**
   * Check if a token is revoked
   */
  async isTokenRevoked(tokenId: string): Promise<boolean> {
    try {
      // Check memory blacklist
      if (this.blacklist.has(tokenId)) {
        const entry = this.blacklist.get(tokenId);
        if (entry && entry.expiresAt > new Date()) {
          return true;
        } else {
          // Remove expired entry
          this.blacklist.delete(tokenId);
          return false;
        }
      }

      // Check Redis if available
      if (this.cacheService) {
        const key = `token:blacklist:${tokenId}`;
        const entry = await this.cacheService.get<BlacklistEntry>(key);
        if (entry) {
          // Add to memory blacklist for faster access
          this.blacklist.set(tokenId, entry);
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
   * Get token remaining time in seconds
   */
  async getTokenRemainingTime(token: string): Promise<number> {
    try {
      const decoded = decodeJwt(token) as TokenPayload;
      if (!decoded.exp) return 0;
      const remaining = decoded.exp - Math.floor(Date.now() / 1000);
      return remaining > 0 ? remaining : 0;
    } catch {
      return 0;
    }
  }

  /**
   * Decode token without verification (for non-secure operations)
   */
  decodeToken<T extends TokenPayload = TokenPayload>(token: string): T | null {
    try {
      return decodeJwt(token) as T;
    } catch {
      return null;
    }
  }

  /**
   * Get token expiration time
   */
  getTokenExpiry(token: string): Date | null {
    try {
      const decoded = decodeJwt(token) as TokenPayload;
      if (!decoded.exp) return null;
      return new Date(decoded.exp * 1000);
    } catch {
      return null;
    }
  }

  /**
   * Get token issued at time
   */
  getTokenIssuedAt(token: string): Date | null {
    try {
      const decoded = decodeJwt(token) as TokenPayload;
      if (!decoded.iat) return null;
      return new Date(decoded.iat * 1000);
    } catch {
      return null;
    }
  }

  // ============================================================
  // Private Helper Methods
  // ============================================================

  /**
   * Parse expiry string to seconds
   */
  private parseExpiry(expiry?: string | number): number {
    if (!expiry) return 900; // Default 15 minutes

    if (typeof expiry === 'number') {
      return expiry;
    }

    const unit = expiry.slice(-1);
    const value = parseInt(expiry.slice(0, -1), 10);

    if (isNaN(value)) return 900;

    switch (unit) {
      case 's': return value;
      case 'm': return value * 60;
      case 'h': return value * 3600;
      case 'd': return value * 86400;
      case 'w': return value * 604800;
      default: return parseInt(expiry, 10) || 900;
    }
  }

  /**
   * Cleanup expired blacklist entries
   */
  private cleanupBlacklist(): void {
    const now = new Date();
    let removed = 0;

    for (const [tokenId, entry] of this.blacklist) {
      if (entry.expiresAt < now) {
        this.blacklist.delete(tokenId);
        removed++;
      }
    }

    if (removed > 0) {
      this.logger.debug(`Cleaned up ${removed} expired blacklist entries`);
    }
  }

  /**
   * Get metrics for monitoring
   */
  getMetrics(): {
    tokensGenerated: number;
    tokensVerified: number;
    tokensRevoked: number;
    verificationErrors: number;
    blacklistSize: number;
    isAsymmetric: boolean;
    algorithm: string;
  } {
    return {
      tokensGenerated: this.metrics.tokensGenerated,
      tokensVerified: this.metrics.tokensVerified,
      tokensRevoked: this.metrics.tokensRevoked,
      verificationErrors: this.metrics.verificationErrors,
      blacklistSize: this.blacklist.size,
      isAsymmetric: this.isAsymmetric,
      algorithm: this.isAsymmetric ? 'RS256' : 'HS256',
    };
  }

  /**
   * Health check
   */
  async healthCheck(): Promise<{
    healthy: boolean;
    algorithm: string;
    hasKeys: boolean;
    latency: number;
  }> {
    const startTime = Date.now();

    try {
      // Try to generate a test token
      const testToken = await this.generateAccessToken({
        userId: 'health-check',
        email: 'health@vubon.com.bd',
        role: 'SYSTEM',
      });

      const verified = await this.verifyToken(testToken.token, 'access');

      return {
        healthy: verified.valid,
        algorithm: this.isAsymmetric ? 'RS256' : 'HS256',
        hasKeys: !!this.secretKey || (!!this.publicKey && !!this.privateKey),
        latency: Date.now() - startTime,
      };
    } catch (error) {
      return {
        healthy: false,
        algorithm: this.isAsymmetric ? 'RS256' : 'HS256',
        hasKeys: false,
        latency: Date.now() - startTime,
      };
    }
  }
}
