import { Injectable } from '@nestjs/common';
import { LOGIN_ATTEMPT_CONFIG } from '../../config/login-attempt.config';

@Injectable()
export class LoginAttemptTrackerService {
  getMaxAttempts(): number {
    return LOGIN_ATTEMPT_CONFIG.maxAttempts;
  }

  getMaxAttemptsPerIp(): number {
    return LOGIN_ATTEMPT_CONFIG.maxAttemptsPerIp;
  }

  getAttemptWindowMs(): number {
    return LOGIN_ATTEMPT_CONFIG.attemptWindowSeconds * 1000;
  }

  shouldResetAfterSuccess(): boolean {
    return LOGIN_ATTEMPT_CONFIG.resetAfterSuccess;
  }

  shouldTrackByIp(): boolean {
    return LOGIN_ATTEMPT_CONFIG.trackByIp;
  }

  shouldTrackByEmail(): boolean {
    return LOGIN_ATTEMPT_CONFIG.trackByEmail;
  }

  shouldTrackByDevice(): boolean {
    return LOGIN_ATTEMPT_CONFIG.trackByDevice;
  }
}
