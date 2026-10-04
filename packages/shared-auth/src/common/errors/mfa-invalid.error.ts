import { AuthError } from './auth-error';

export class MfaInvalidError extends AuthError {
  public readonly method: string | undefined;

  constructor(method?: string, cause?: unknown) {
    super('Invalid MFA code', {
      code: 'MFA_INVALID',
      statusCode: 401,
      cause,
      meta: method ? { method } : undefined,
    });
    this.name = 'MfaInvalidError';
    this.method = method;
  }
}
