import { AuthError } from './auth-error';

/** Generic auth failure — use when a specific subclass doesn't fit. */
export class GenericAuthError extends AuthError {
  constructor(message = 'Authentication error', cause?: unknown) {
    super(message, { code: 'AUTH_GENERIC', statusCode: 401, cause });
    this.name = 'GenericAuthError';
  }
}
