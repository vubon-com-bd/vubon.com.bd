/**
 * LoginAttemptTrackerService — Threshold evaluation for lockouts
 * @module auth-service/infrastructure/services/internal
 */
import { Injectable } from '@nestjs/common';
import { AccountLockPolicyService } from '../../../domain/services/account-lock-policy.service';

@Injectable()
export class LoginAttemptTrackerService {
  readonly name = 'LoginAttemptTrackerService';

  decide(failedAttempts: number) {
    return AccountLockPolicyService.decide(failedAttempts);
  }

  isSuspicious(input: {
    attemptsFromSameIp: number;
    distinctEmailsFromIp: number;
    windowMs: number;
  }): boolean {
    return AccountLockPolicyService.isSuspicious(input);
  }
}
