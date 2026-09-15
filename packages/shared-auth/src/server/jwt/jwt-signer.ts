import jwt from 'jsonwebtoken';
import { JWT_CONFIG } from '@vubon/shared-config/security/jwt';
import type { AuthTokenPayload } from '@vubon/shared-types/auth';
import { getJwtSecret } from './jwt-secret';
import type { SignOptions } from './jwt.service.interface';

/**
 * Sign a JWT. ⚠️ SERVER-ONLY.
 */
export function signJwt(
  payload: Omit<AuthTokenPayload, 'iat' | 'exp'>,
  options: SignOptions
): string {
  const secret = getJwtSecret();
  return jwt.sign(payload as object, secret, {
    algorithm: JWT_CONFIG.algorithm as jwt.Algorithm,
    expiresIn: options.expiresIn as jwt.SignOptions['expiresIn'],
    subject: options.subject,
    jwtid: options.jwtid,
    audience: options.audience ?? JWT_CONFIG.audience,
    issuer: options.issuer ?? JWT_CONFIG.issuer,
  });
}
