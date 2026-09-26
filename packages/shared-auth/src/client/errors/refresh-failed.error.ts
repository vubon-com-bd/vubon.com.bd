import { ClientAuthError } from './client-auth.error';

/** Token refresh failed on the client. */
export class RefreshFailedError extends ClientAuthError {
  constructor(message = 'Token refresh failed', cause?: unknown) {
    super(message, { code: 'REFRESH_FAILED', cause });
    this.name = 'RefreshFailedError';
  }
}
