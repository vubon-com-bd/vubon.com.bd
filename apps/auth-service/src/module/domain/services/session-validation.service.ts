import { AuthSessionEntity } from '../entities/auth-session.entity';
import {
  SessionExpiredError,
  SessionRevokedError,
} from '../errors/session.errors';

export class SessionValidationService {
  validate(session: AuthSessionEntity): void {
    if (session.isRevoked) {
      throw new SessionRevokedError(session.id);
    }
    if (session.isExpired) {
      throw new SessionExpiredError(session.id);
    }
  }

  isUsable(session: AuthSessionEntity): boolean {
    return session.isActive;
  }
}
