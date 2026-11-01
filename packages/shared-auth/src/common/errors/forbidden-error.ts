import { AuthError } from './auth-error';

export class ForbiddenError extends AuthError {
  public readonly requiredPermission: string | undefined;

  constructor(
    message = 'Forbidden',
    options: { requiredPermission?: string; cause?: unknown } = {}
  ) {
    super(message, { code: 'FORBIDDEN', statusCode: 403, cause: options.cause });
    this.name = 'ForbiddenError';
    this.requiredPermission = options.requiredPermission;
  }
}
