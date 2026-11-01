import type { AuthTokenPayload } from '@vubon/shared-types/auth';

export interface SignOptions {
  readonly expiresIn: string | number;
  readonly subject: string;
  readonly jwtid?: string;
  readonly audience?: string;
  readonly issuer?: string;
}

export interface JwtServiceContract {
  sign(payload: Omit<AuthTokenPayload, 'iat' | 'exp'>, options: SignOptions): string;
  verify(token: string): AuthTokenPayload;
  decode(token: string): AuthTokenPayload | null;
}
