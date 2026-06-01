/**
 * Refresh Token Command Handler - Application Layer
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module application/commands/auth/refresh-token.handler
 * 
 * @description
 * Handles token refresh use case with security features including:
 * - Token rotation
 * - Reuse detection (theft protection)
 * - Family revocation
 * - Session update
 * - Rate limiting
 * - Audit logging
 * - Device fingerprint validation
 * 
 * Enterprise Rules:
 * ✅ Single responsibility - handles only token refresh
 * ✅ Repository coordination
 * ✅ Token theft detection
 * ✅ Event publishing
 * ✅ Audit logging
 * ✅ Bangladesh specific - Mobile operator tracking
 */

import { Injectable, UnauthorizedException, NotFoundException, TooManyRequestsException } from '@nestjs/common';

import { RefreshTokenCommand, DeviceInfo } from './refresh-token.command';
import { RefreshTokenRepository } from '../../../domain/repositories/refresh-token.repository.interface';
import { UserRepository } from '../../../domain/repositories/user.repository.interface';
import { SessionRepository } from '../../../domain/repositories/session.repository.interface';
import { Token, TokenType } from '../../../domain/value-objects/token.vo';
import { DeviceId } from '../../../domain/value-objects/device-id.vo';
import { IpAddress } from '../../../domain/value-objects/ip-address.vo';

import { TokenRefreshedEvent } from '../../events/token-refreshed.event';
import { TokenCompromisedEvent } from '../../events/token-compromised.event';

import { TokenGenerator, EventBus, AuditService, RateLimiter, CacheService } from './infrastructure.interface';

// ============================================================
// Constants
// ============================================================

const REFRESH_CONFIG = {
  MAX_REFRESH_COUNT: 50,
  MAX_REFRESHES_PER_HOUR: 10,
  DEVICE_TRUST_DURATION_DAYS: 30,
  SESSION_EXTENSION_MINUTES: 60,
};

// ============================================================
// Refresh Token Handler
// ============================================================

@Injectable()
export class RefreshTokenHandler {
  constructor(
    private readonly refreshTokenRepository: RefreshTokenRepository,
    private readonly userRepository: UserRepository,
    private readonly sessionRepository: SessionRepository,
    private readonly tokenGenerator: TokenGenerator,
    private readonly eventBus: EventBus,
    private readonly auditService: AuditService,
    private readonly rateLimiter: RateLimiter,
    private readonly cacheService: CacheService
  ) {}
  
  async execute(command: RefreshTokenCommand): Promise<{
    accessToken: string;
    refreshToken: string;
    sessionId?: string;
    deviceTrusted?: boolean;
  }> {
    const { refreshToken: refreshTokenValue, deviceInfo, correlationId } = command;
    
    // 1. Rate limiting check
    await this.checkRateLimiting(refreshTokenValue, deviceInfo?.ipAddress, correlationId);
    
    // 2. Verify token signature
    let payload;
    try {
      payload = await this.tokenGenerator.verifyToken(refreshTokenValue);
    } catch (error) {
      await this.auditService.security('REFRESH_TOKEN_INVALID_SIGNATURE', undefined, {
        error: error.message,
        ipAddress: deviceInfo?.ipAddress,
        correlationId,
        mobileOperator: deviceInfo?.mobileOperator,
        networkType: deviceInfo?.networkType,
      });
      throw new UnauthorizedException('Invalid refresh token');
    }
    
    // 3. Find refresh token entity
    const token = new Token(refreshTokenValue, TokenType.REFRESH);
    let refreshToken = await this.refreshTokenRepository.findByToken(token);
    
    if (!refreshToken) {
      await this.auditService.security('REFRESH_TOKEN_NOT_FOUND', undefined, {
        tokenId: payload?.jti,
        ipAddress: deviceInfo?.ipAddress,
        correlationId,
      });
      throw new UnauthorizedException('Invalid or expired refresh token');
    }
    
    // 4. Check for token theft (reuse detection)
    if (refreshToken.isRevoked()) {
      // Token has been used before - potential theft!
      await this.handleTokenTheft(refreshToken, deviceInfo, correlationId);
      throw new UnauthorizedException('Token reuse detected. Security alert triggered.');
    }
    
    // 5. Validate token expiration
    if (refreshToken.isExpired()) {
      refreshToken.revoke('Token expired');
      await this.refreshTokenRepository.save(refreshToken);
      
      await this.auditService.warn('REFRESH_TOKEN_EXPIRED', refreshToken.getUserId(), {
        tokenId: refreshToken.getId(),
        family: refreshToken.getFamily(),
        ipAddress: deviceInfo?.ipAddress,
        correlationId,
      });
      
      throw new UnauthorizedException('Refresh token has expired');
    }
    
    // 6. Check refresh count limit (prevent infinite refresh loops)
    if (refreshToken.getRotationCount() >= REFRESH_CONFIG.MAX_REFRESH_COUNT) {
      refreshToken.revoke('Max refresh count exceeded');
      await this.refreshTokenRepository.save(refreshToken);
      
      await this.auditService.warn('REFRESH_TOKEN_MAX_COUNT', refreshToken.getUserId(), {
        rotationCount: refreshToken.getRotationCount(),
        ipAddress: deviceInfo?.ipAddress,
      });
      
      throw new UnauthorizedException('Refresh token has reached maximum refresh limit');
    }
    
    // 7. Validate device fingerprint (if device info provided)
    let deviceTrusted = false;
    if (deviceInfo?.deviceId) {
      const deviceId = new DeviceId(deviceInfo.deviceId);
      deviceTrusted = await this.validateDeviceTrust(refreshToken.getUserId(), deviceId);
    }
    
    // 8. Get user and validate status
    const user = await this.userRepository.findById(refreshToken.getUserId());
    if (!user) {
      throw new NotFoundException('User not found');
    }
    
    // Check user status
    if (!user.isActive()) {
      throw new UnauthorizedException('Account is inactive');
    }
    if (user.isLocked()) {
      throw new UnauthorizedException('Account is locked');
    }
    if (user.isSuspended()) {
      throw new UnauthorizedException('Account is suspended');
    }
    
    // 9. Generate new tokens
    const userRole = user.getRole();
    const userTier = user.getTier();
    
    const newAccessToken = await this.tokenGenerator.generateAccessToken(
      user.getId(),
      user.getEmail().getValue(),
      userRole,
      {
        tier: userTier,
        sessionId: refreshToken.getSessionId(),
        deviceId: deviceInfo?.deviceId,
        trustLevel: deviceTrusted ? 'trusted' : 'standard',
      }
    );
    
    const newRefreshTokenValue = await this.tokenGenerator.generateRefreshToken(
      user.getId(),
      {
        familyId: refreshToken.getFamily(),
        sessionId: refreshToken.getSessionId(),
        deviceId: deviceInfo?.deviceId,
        version: refreshToken.getRotationCount() + 1,
      }
    );
    
    // 10. Rotate refresh token
    const newToken = new Token(newRefreshTokenValue, TokenType.REFRESH);
    const rotatedToken = refreshToken.rotate(newToken);
    await this.refreshTokenRepository.save(rotatedToken);
    
    // 11. Update associated session
    let sessionId = refreshToken.getSessionId();
    if (sessionId) {
      const session = await this.sessionRepository.findById(sessionId);
      if (session && session.validateOwnership(user.getId())) {
        // Extend session
        await session.extend(REFRESH_CONFIG.SESSION_EXTENSION_MINUTES);
        await this.sessionRepository.save(session);
      }
    }
    
    // 12. Update device trust if requested and device info provided
    if (deviceInfo?.deviceId && deviceTrusted) {
      await this.updateDeviceTrust(refreshToken.getUserId(), deviceInfo.deviceId);
    }
    
    // 13. Publish event
    await this.eventBus.publish(
      new TokenRefreshedEvent(
        user.getId(),
        refreshToken.getFamily(),
        refreshToken.getRotationCount(),
        deviceInfo?.ipAddress,
        deviceInfo?.userAgent,
        deviceInfo?.deviceId,
        correlationId,
        deviceInfo?.mobileOperator,
        deviceInfo?.networkType
      )
    );
    
    // 14. Audit log
    await this.auditService.info('TOKEN_REFRESHED', user.getId(), {
      tokenId: refreshToken.getId(),
      family: refreshToken.getFamily(),
      rotationCount: refreshToken.getRotationCount(),
      ipAddress: deviceInfo?.ipAddress,
      deviceId: deviceInfo?.deviceId,
      userAgent: deviceInfo?.userAgent,
      mobileOperator: deviceInfo?.mobileOperator,
      networkType: deviceInfo?.networkType,
      district: deviceInfo?.district,
      correlationId,
    });
    
    // 15. Store in cache for quick validation
    await this.cacheService.set(
      `refresh:${user.getId()}`,
      newRefreshTokenValue,
      7 * 24 * 3600 // 7 days
    );
    
    return {
      accessToken: newAccessToken,
      refreshToken: newRefreshTokenValue,
      sessionId,
      deviceTrusted,
    };
  }
  
  // ============================================================
  // Private Helper Methods
  // ============================================================
  
  private async checkRateLimiting(
    refreshTokenValue: string,
    ipAddress?: string,
    correlationId?: string
  ): Promise<void> {
    const key = `ratelimit:refresh:${refreshTokenValue.substring(0, 20)}`;
    const attempts = await this.rateLimiter.getCount(key, 3600);
    
    if (attempts >= REFRESH_CONFIG.MAX_REFRESHES_PER_HOUR) {
      await this.auditService.warn('REFRESH_TOKEN_RATE_LIMITED', undefined, {
        ipAddress,
        correlationId,
        attempts,
      });
      throw new TooManyRequestsException('Too many refresh attempts. Please try again later.');
    }
    
    await this.rateLimiter.increment(key, 3600);
  }
  
  private async validateDeviceTrust(userId: string, deviceId: DeviceId): Promise<boolean> {
    const cacheKey = `device:trust:${userId}:${deviceId.getValue()}`;
    const cached = await this.cacheService.get<boolean>(cacheKey);
    
    if (cached !== null) {
      return cached;
    }
    
    // Check if device is trusted in database
    const isTrusted = await this.refreshTokenRepository.isDeviceTrusted(userId, deviceId);
    
    if (isTrusted) {
      await this.cacheService.set(cacheKey, true, REFRESH_CONFIG.DEVICE_TRUST_DURATION_DAYS * 24 * 3600);
    }
    
    return isTrusted;
  }
  
  private async updateDeviceTrust(userId: string, deviceIdValue: string): Promise<void> {
    const deviceId = new DeviceId(deviceIdValue);
    const cacheKey = `device:trust:${userId}:${deviceId.getValue()}`;
    await this.cacheService.set(cacheKey, true, REFRESH_CONFIG.DEVICE_TRUST_DURATION_DAYS * 24 * 3600);
  }
  
  private async handleTokenTheft(
    refreshToken: any,
    deviceInfo?: DeviceInfo,
    correlationId?: string
  ): Promise<void> {
    // Get all tokens in the same family
    const familyTokens = await this.refreshTokenRepository.findByFamily(refreshToken.getFamily());
    
    // Mark as compromised
    refreshToken.markAsCompromised('Token reuse detected - possible theft', familyTokens);
    await this.refreshTokenRepository.save(refreshToken);
    
    // Revoke all tokens in the family
    for (const token of familyTokens) {
      if (token.getId() !== refreshToken.getId() && !token.isRevoked()) {
        token.revoke('Token family compromised');
        await this.refreshTokenRepository.save(token);
      }
    }
    
    // Revoke all sessions for the user
    await this.sessionRepository.deleteAllByUserId(
      refreshToken.getUserId(),
      'Token theft detected - security precaution'
    );
    
    // Publish security event
    await this.eventBus.publish(
      new TokenCompromisedEvent(
        refreshToken.getUserId(),
        refreshToken.getFamily(),
        deviceInfo?.ipAddress,
        deviceInfo?.userAgent,
        deviceInfo?.deviceId,
        correlationId,
        'Token reuse after rotation',
        deviceInfo?.mobileOperator,
        deviceInfo?.networkType,
        deviceInfo?.district
      )
    );
    
    // Alert security team (critical severity)
    await this.auditService.critical('TOKEN_THEFT_DETECTED', refreshToken.getUserId(), {
      tokenId: refreshToken.getId(),
      family: refreshToken.getFamily(),
      rotationCount: refreshToken.getRotationCount(),
      ipAddress: deviceInfo?.ipAddress,
      deviceId: deviceInfo?.deviceId,
      userAgent: deviceInfo?.userAgent,
      mobileOperator: deviceInfo?.mobileOperator,
      networkType: deviceInfo?.networkType,
      district: deviceInfo?.district,
      correlationId,
    });
  }
}

// ============================================================
// Type Exports
// ============================================================

export type { DeviceInfo as DeviceInfoType };
