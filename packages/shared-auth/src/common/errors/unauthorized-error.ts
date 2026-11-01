import { AuthError } from './auth-error';

export class UnauthorizedError extends AuthError {
  constructor(message = 'Unauthorized', cause?: unknown) {
    super(message, { code: 'UNAUTHORIZED', statusCode: 401, cause });
    this.name = 'UnauthorizedError';
  }
}
