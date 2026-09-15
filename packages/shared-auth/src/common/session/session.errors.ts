import { SessionExpiredError } from '../errors/session-expired-error';

export class SessionInvalidError extends SessionExpiredError {
  public readonly reason: string;

  constructor(reason = 'unknown') {
    super(`Session invalid: ${reason}`);
    this.name = 'SessionInvalidError';
    this.reason = reason;
  }
}
