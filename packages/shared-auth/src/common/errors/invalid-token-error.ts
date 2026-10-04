import { AuthError } from './auth-error';

export class InvalidTokenError extends AuthError {
  constructor(reason = 'Token is invalid', cause?: unknown) {
    super(reason, { code: 'INVALID_TOKEN', statusCode: 401, cause });
    this.name = 'InvalidTokenError';
  }
}
