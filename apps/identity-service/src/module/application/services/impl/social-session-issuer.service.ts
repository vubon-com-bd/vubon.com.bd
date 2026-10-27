/**
 * SocialSessionIssuerImpl — issue session + JWT tokens for OAuth users
 * @module identity-service/application/services/impl
 */
import { Injectable, Inject, Logger } from '@nestjs/common';
import type { ISocialSessionIssuer } from './auth-social.service.js';
import {
  AUTH_SESSION_SERVICE,
  type AuthSessionServiceInterface,
} from '../interfaces/auth-session.service.interface.js';
import {
  AUTH_TOKEN_SERVICE,
  type AuthTokenServiceInterface,
} from '../interfaces/auth-token.service.interface.js';

@Injectable()
export class SocialSessionIssuerImpl implements ISocialSessionIssuer {
  private readonly logger = new Logger(SocialSessionIssuerImpl.name);

  constructor(
    @Inject(AUTH_SESSION_SERVICE)
    private readonly sessionService: AuthSessionServiceInterface,
    @Inject(AUTH_TOKEN_SERVICE)
    private readonly tokenService: AuthTokenServiceInterface,
  ) {}

  async issueForUser(input: {
    userId: string;
    deviceId?: string;
    provider: string;
  }): Promise<{
    session: {
      id: string;
      userId: string;
      status: string;
      createdAt: string;
      lastAccessedAt: string;
      expiresAt: string;
      isCurrent: boolean;
    };
    tokens: {
      accessToken: string;
      refreshToken: string;
      tokenType: string;
      expiresIn: number;
      expiresAt: number;
    };
  }> {
    // 1. Create session
    const session = await this.sessionService.create(input.userId, {
      deviceId: input.deviceId,
      userAgent: `OAuth:${input.provider}`,
    });

    this.logger.log(
      `Session created: ${session.id} for user ${input.userId} (${input.provider})`,
    );

    // 2. Issue JWT tokens
    const tokens = await this.tokenService.issue({
      userId: input.userId,
      sessionId: session.id,
      scope: ['read', 'write'],
    });

    return {
      session: {
        id: session.id,
        userId: input.userId,
        status: String(session.status ?? 'active'),
        createdAt: session.createdAt ?? new Date().toISOString(),
        lastAccessedAt: session.lastAccessedAt ?? new Date().toISOString(),
        expiresAt: session.expiresAt ?? new Date(Date.now() + 86400000).toISOString(),
        isCurrent: true,
      },
      tokens: {
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
        tokenType: 'Bearer',
        expiresIn: tokens.expiresIn,
        expiresAt: tokens.expiresAt,
      },
    };
  }
}
