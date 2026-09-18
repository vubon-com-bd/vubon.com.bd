/**
 * JWT Service
 * @module shared-kernel/infrastructure/security
 *
 * Values আসে shared-config/security থেকে।
 */
import { Injectable } from '@nestjs/common';
import { JWT_CONFIG } from '@vubon/shared-config/security';
import { AUTH_TOKEN_TYPE } from '@vubon/shared-constants/auth';

export interface JwtPayloadInput {
  readonly sub: string;
  readonly type: (typeof AUTH_TOKEN_TYPE)[keyof typeof AUTH_TOKEN_TYPE];
  readonly [key: string]: unknown;
}

@Injectable()
export class JwtService {
  async sign(payload: JwtPayloadInput): Promise<string> {
    const jwt = await import('jsonwebtoken');
    return jwt.sign(payload, JWT_CONFIG.secret, {
      algorithm: JWT_CONFIG.algorithm as 'HS256',
      issuer: JWT_CONFIG.issuer,
      audience: JWT_CONFIG.audience,
    });
  }

  async verify(token: string): Promise<JwtPayloadInput> {
    const jwt = await import('jsonwebtoken');
    const decoded = jwt.verify(token, JWT_CONFIG.secret, {
      issuer: JWT_CONFIG.issuer,
      audience: JWT_CONFIG.audience,
    });
    return decoded as JwtPayloadInput;
  }
}
