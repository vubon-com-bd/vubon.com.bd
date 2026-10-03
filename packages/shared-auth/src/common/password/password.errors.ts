import { AuthError } from '../errors/auth-error';

export class WeakPasswordError extends AuthError {
  public readonly issues: readonly string[];

  constructor(issues: readonly string[]) {
    super('Password does not meet policy', {
      code: 'WEAK_PASSWORD',
      statusCode: 400,
      meta: { issues },
    });
    this.name = 'WeakPasswordError';
    this.issues = issues;
  }
}

export class PasswordMismatchError extends AuthError {
  constructor() {
    super('Passwords do not match', {
      code: 'PASSWORD_MISMATCH',
      statusCode: 400,
    });
    this.name = 'PasswordMismatchError';
  }
}
