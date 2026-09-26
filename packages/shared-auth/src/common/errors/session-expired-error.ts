import { AuthError } from './auth-error';

export class SessionExpiredError extends AuthError {
  constructor(message = 'Session has expired', cause?: unknown) {
    super(message, { code: 'SESSION_EXPIRED', statusCode: 401, cause });
    this.name = 'SessionExpiredError';
  }
}
