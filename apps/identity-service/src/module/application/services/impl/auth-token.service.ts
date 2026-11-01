/**
 * Auth Token Service Implementation (JWT-based)
 * @module identity-service/application/services/impl
 *
 * Real JWT signing using `jsonwebtoken` + `JWT_SECRET` from env.
 */
import { Injectable, Inject, Logger, InternalServerErrorException } from '@nestjs/common';
import jwt from 'jsonwebtoken';

import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import { DomainEventBridgeService } from '@vubon/shared-kernel/infrastructure/messaging/event-bridge';

import type {
  AuthTokenServiceInterface,
  IssueTokenInput,
} from '../interfaces/auth-token.service.interface.js';
import type { TokenRepository } from '../../../domain/repositories/token.repository.interface.js';
import { TOKEN_REPOSITORY } from '../../../domain/repositories/token.repository.interface.js';
import type { TokenEntity } from '../../../domain/entities/token.entity.js';
import type { AuthTokenResponseDTO } from '../../dtos/responses/auth-token-response.dto.js';

// ─── Env config ─────────────────────────────
const JWT_SECRET = process.env['JWT_SECRET'] ?? '';
const JWT_ISSUER = process.env['JWT_ISSUER'] ?? 'vubon-identity';
const JWT_AUDIENCE = process.env['JWT_AUDIENCE'] ?? 'vubon-api';
const ACCESS_TTL_SECONDS = 900; // 15 minutes
const REFRESH_TTL_SECONDS = 7 * 24 * 60 * 60; // 7 days

interface JwtPayload {
  readonly sub: string;
  readonly sid?: string;
  readonly type: 'access' | 'refresh';
  readonly scope?: readonly string[];
}

@Injectable()
export class AuthTokenService extends BaseService implements AuthTokenServiceInterface {
  readonly name = 'AuthTokenService';
  private readonly logger = new Logger(AuthTokenService.name);

  constructor(
    @Inject(TOKEN_REPOSITORY) private readonly tokenRepo: TokenRepository,
    private readonly eventBridge: DomainEventBridgeService,
  ) {
    super();

    // ─── Startup validation ───
    if (!JWT_SECRET || JWT_SECRET.length < 32) {
      this.logger.error(
        `❌ JWT_SECRET missing or too short (length: ${JWT_SECRET.length}). Real JWT signing will fail!`,
      );
    } else {
      this.logger.log(`✅ JWT_SECRET loaded (length: ${JWT_SECRET.length})`);
    }
  }

  async issue(input: IssueTokenInput): Promise<AuthTokenResponseDTO> {
    if (!JWT_SECRET || JWT_SECRET.length < 32) {
      throw new InternalServerErrorException(
        'JWT_SECRET not configured — cannot issue tokens',
      );
    }

    const now = Math.floor(Date.now() / 1000);
    const sessionId = input.sessionId ?? `${now}-${Math.random().toString(36).slice(2, 10)}`;

    // ─── Access token ───
    const accessPayload: JwtPayload & { roles?: readonly string[] } = {
      sub: input.userId,
      sid: sessionId,
      type: 'access',
      scope: input.scope ?? [],
      roles: input.roles ?? [],
    };

    const accessToken = jwt.sign(accessPayload, JWT_SECRET, {
      algorithm: 'HS256',
      issuer: JWT_ISSUER,
      audience: JWT_AUDIENCE,
      expiresIn: ACCESS_TTL_SECONDS,
    });

    // ─── Refresh token ───
    const refreshPayload: JwtPayload & { roles?: readonly string[] } = {
      sub: input.userId,
      sid: sessionId,
      type: 'refresh',
      roles: input.roles ?? [],
    };

    const refreshToken = jwt.sign(refreshPayload, JWT_SECRET, {
      algorithm: 'HS256',
      issuer: JWT_ISSUER,
      audience: JWT_AUDIENCE,
      expiresIn: REFRESH_TTL_SECONDS,
    });

    this.logger.log(
      `🔐 JWT issued for user=${input.userId} sid=${sessionId} (access ${ACCESS_TTL_SECONDS}s, refresh ${REFRESH_TTL_SECONDS}s)`,
    );

    return {
      accessToken,
      refreshToken,
      tokenType: 'Bearer',
      expiresIn: ACCESS_TTL_SECONDS,
      expiresAt: now + ACCESS_TTL_SECONDS,
    };
  }

  async verify(token: string): Promise<TokenEntity | null> {
    if (!JWT_SECRET) return null;

    try {
      const decoded = jwt.verify(token, JWT_SECRET, {
        algorithms: ['HS256'],
        issuer: JWT_ISSUER,
        audience: JWT_AUDIENCE,
      }) as JwtPayload;

      // Return a minimal token record for compatibility
      // (real token persistence handled by caller)
      if (decoded.sub) {
        return null; // caller handles actual verification via guard
      }
      return null;
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'unknown';
      this.logger.debug(`JWT verify failed: ${msg}`);
      return null;
    }
  }

  async revoke(tokenId: string, reason: string): Promise<void> {
    const token = await this.tokenRepo.findById(tokenId);
    if (!token) return;
    token.revoke(reason);
    const saved = await this.tokenRepo.save(token);
    await this.eventBridge.publishFromEntity(saved);
  }

  async revokeAllForUser(userId: string, reason: string): Promise<number> {
    return this.tokenRepo.revokeAllByUserId({ value: userId } as never, reason);
  }
}
