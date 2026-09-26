/**
 * TokenSignerService — JWT signing + verification (HS256)
 * @module auth-service/infrastructure/services/internal
 *
 * Uses jsonwebtoken + JWT_CONFIG (env-loaded via shared-config helper).
 */
import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import type {
  TokenSignerPayload,
  TokenSignerServiceInterface,
} from '../../../application/services/interfaces/token-signer.service.interface';
import { JWT_CONFIG } from '../../config/jwt.config';

@Injectable()
export class TokenSignerService implements TokenSignerServiceInterface {
  readonly name = 'TokenSignerService';

  private get secret(): string {
    return JWT_CONFIG.secret;
  }

  private get issuer(): string {
    return JWT_CONFIG.issuer;
  }

  private get audience(): string {
    return JWT_CONFIG.audience;
  }

  async sign(payload: TokenSignerPayload): Promise<string> {
    return new Promise((resolve, reject) => {
      jwt.sign(
        {
          sub: payload.sub,
          jti: payload.jti,
          type: payload.type,
          scope: payload.scope,
          meta: payload.meta,
        },
        this.secret,
        {
          algorithm: 'HS256',
          expiresIn: payload.exp - payload.iat,
          issuer: this.issuer,
          audience: this.audience,
        },
        (err, token) => {
          if (err || !token) {
            reject(err ?? new Error('JWT sign failed'));
            return;
          }
          resolve(token);
        },
      );
    });
  }

  async verify(token: string): Promise<TokenSignerPayload> {
    return new Promise((resolve, reject) => {
      jwt.verify(
        token,
        this.secret,
        {
          algorithms: ['HS256'],
          issuer: this.issuer,
          audience: this.audience,
        },
        (err, decoded) => {
          if (err || !decoded || typeof decoded === 'string') {
            reject(err ?? new Error('Invalid token'));
            return;
          }
          const d = decoded as Record<string, unknown>;
          resolve({
            sub: String(d['sub'] ?? ''),
            jti: String(d['jti'] ?? ''),
            type: (d['type'] ?? 'access') as TokenSignerPayload['type'],
            iat: Number(d['iat'] ?? 0),
            exp: Number(d['exp'] ?? 0),
            scope: d['scope'] ? String(d['scope']) : undefined,
            meta: (d['meta'] as Readonly<Record<string, unknown>>) ?? undefined,
          });
        },
      );
    });
  }

  decode(token: string): TokenSignerPayload | null {
    try {
      const decoded = jwt.decode(token);
      if (!decoded || typeof decoded === 'string') return null;
      const d = decoded as Record<string, unknown>;
      return {
        sub: String(d['sub'] ?? ''),
        jti: String(d['jti'] ?? ''),
        type: (d['type'] ?? 'access') as TokenSignerPayload['type'],
        iat: Number(d['iat'] ?? 0),
        exp: Number(d['exp'] ?? 0),
        scope: d['scope'] ? String(d['scope']) : undefined,
        meta: (d['meta'] as Readonly<Record<string, unknown>>) ?? undefined,
      };
    } catch {
      return null;
    }
  }
}
