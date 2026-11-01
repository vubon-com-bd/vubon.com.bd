import { AuthError } from './auth-error';

export class MfaRequiredError extends AuthError {
  public readonly methods: readonly string[];

  constructor(methods: readonly string[] = [], cause?: unknown) {
    super('Multi-factor authentication required', {
      code: 'MFA_REQUIRED',
      statusCode: 401,
      cause,
    });
    this.name = 'MfaRequiredError';
    this.methods = methods;
  }
}
