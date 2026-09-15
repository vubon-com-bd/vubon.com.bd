import { AuthError } from './auth-error';

export class TokenExpiredError extends AuthError {
  public readonly expiredAt: number | undefined;

  constructor(expiredAt?: number, cause?: unknown) {
    super('Token has expired', {
      code: 'TOKEN_EXPIRED',
      statusCode: 401,
      cause,
    });
    this.name = 'TokenExpiredError';
    this.expiredAt = expiredAt;
  }
}
