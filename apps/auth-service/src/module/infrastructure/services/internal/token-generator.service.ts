import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { JWT_CONFIG } from '@vubon/shared-config/security';
import { SECURITY } from '@vubon/shared-constants/security';
import type {
  TokenGeneratorPort,
  TokenPayload,
} from '../../../application/ports/token-generator.port';

@Injectable()
export class TokenGeneratorService implements TokenGeneratorPort {
  async generateAccessToken(payload: TokenPayload): Promise<string> {
    return jwt.sign(payload, JWT_CONFIG.secret, {
      algorithm: JWT_CONFIG.algorithm as 'HS256',
      issuer: JWT_CONFIG.issuer,
      audience: JWT_CONFIG.audience,
      expiresIn: SECURITY.JWT_ACCESS_EXPIRY,
    });
  }

  async generateRefreshToken(payload: TokenPayload): Promise<string> {
    return jwt.sign(payload, JWT_CONFIG.secret, {
      algorithm: JWT_CONFIG.algorithm as 'HS256',
      issuer: JWT_CONFIG.issuer,
      audience: JWT_CONFIG.audience,
      expiresIn: SECURITY.JWT_REFRESH_EXPIRY,
    });
  }

  async verify(token: string): Promise<TokenPayload> {
    const decoded = jwt.verify(token, JWT_CONFIG.secret, {
      issuer: JWT_CONFIG.issuer,
      audience: JWT_CONFIG.audience,
    });
    return decoded as TokenPayload;
  }

  decode(token: string): TokenPayload | null {
    const decoded = jwt.decode(token);
    return decoded ? (decoded as TokenPayload) : null;
  }
}
