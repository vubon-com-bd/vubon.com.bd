import { AuthError } from '../../common/errors/auth-error';

/** Browser-side auth error. */
export class ClientAuthError extends AuthError {
  constructor(message: string, options: { code?: string; cause?: unknown } = {}) {
    super(message, {
      code: options.code ?? 'CLIENT_AUTH_ERROR',
      statusCode: 401,
      cause: options.cause,
    });
    this.name = 'ClientAuthError';
  }
}
