import { AuthError } from './auth-error';

export class InvalidCredentialsError extends AuthError {
  constructor(message = 'Invalid credentials', cause?: unknown) {
    super(message, {
      code: 'INVALID_CREDENTIALS',
      statusCode: 401,
      cause,
    });
    this.name = 'InvalidCredentialsError';
  }
}
