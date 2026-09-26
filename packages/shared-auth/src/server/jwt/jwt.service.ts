import type { AuthTokenPayload } from '@vubon/shared-types/auth';
import type { JwtServiceContract, SignOptions } from './jwt.service.interface';
import { signJwt } from './jwt-signer';
import { decodeJwtServer, verifyJwt } from './jwt-verifier';

/**
 * Server-side JWT service.
 * ⚠️ SERVER-ONLY. Do NOT import from client.
 */
export class JwtService implements JwtServiceContract {
  sign(payload: Omit<AuthTokenPayload, 'iat' | 'exp'>, options: SignOptions): string {
    return signJwt(payload, options);
  }

  verify(token: string): AuthTokenPayload {
    return verifyJwt(token);
  }

  decode(token: string): AuthTokenPayload | null {
    return decodeJwtServer(token);
  }
}

export const jwtService = new JwtService();
