import { Injectable } from '@nestjs/common';
import { SESSION_CONFIG } from '../../config/session.config';
import { SessionExpiryVO } from '../../../domain/value-objects/primitives/session-expiry.vo';

@Injectable()
export class SessionManagerService {
  getTtlSeconds(): number {
    return SESSION_CONFIG.ttlSeconds;
  }

  getRefreshTtlSeconds(): number {
    return SESSION_CONFIG.refreshTtlSeconds;
  }

  buildExpiry(): SessionExpiryVO {
    return SessionExpiryVO.fromNow(SESSION_CONFIG.ttlSeconds * 1000);
  }

  isExpired(entity: { expiry: SessionExpiryVO }): boolean {
    return entity.expiry.isExpired();
  }

  getMaxSessionsPerUser(): number {
    return SESSION_CONFIG.maxSessionsPerUser;
  }
}
