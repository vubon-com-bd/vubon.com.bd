/**
 * SessionManagerService — Session lifecycle helper
 * @module auth-service/infrastructure/services/internal
 */
import { Injectable } from '@nestjs/common';
import { AuthSessionEntity } from '../../../domain/entities/auth-session.entity';

const DEFAULT_TTL_MS = 7 * 24 * 60 * 60 * 1000;
const SLIDE_THRESHOLD_MS = 5 * 60 * 1000;

@Injectable()
export class SessionManagerService {
  readonly name = 'SessionManagerService';

  shouldRefresh(session: AuthSessionEntity, now: number): boolean {
    return session.expiry.remainingMs(now) < SLIDE_THRESHOLD_MS;
  }

  touch(session: AuthSessionEntity, now: number): void {
    session.touch(now, DEFAULT_TTL_MS);
  }

  assertActive(session: AuthSessionEntity, now: number): void {
    session.assertActive(now);
  }

  get defaultTtlMs(): number {
    return DEFAULT_TTL_MS;
  }
}
