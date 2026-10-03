import { AuthError } from './auth-error';

export class AccountLockedError extends AuthError {
  public readonly lockedUntil: string | undefined;
  public readonly identifier: string | undefined;

  constructor(
    options: {
      identifier?: string;
      lockedUntil?: string;
      cause?: unknown;
    } = {}
  ) {
    super('Account is locked', {
      code: 'ACCOUNT_LOCKED',
      statusCode: 423,
      cause: options.cause,
    });
    this.name = 'AccountLockedError';
    this.identifier = options.identifier;
    this.lockedUntil = options.lockedUntil;
  }
}
