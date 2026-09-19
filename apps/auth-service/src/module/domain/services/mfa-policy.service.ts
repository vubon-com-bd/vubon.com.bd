import { AuthMfaEntity } from '../entities/auth-mfa.entity';
import { MfaRequiredError } from '../errors/mfa.errors';

export class MfaPolicyService {
  assertEnabled(mfa: AuthMfaEntity | null, userId: string): void {
    if (!mfa || !mfa.isEnabled) {
      throw new MfaRequiredError(userId);
    }
  }

  isEnabled(mfa: AuthMfaEntity | null): boolean {
    return mfa !== null && mfa.isEnabled;
  }

  requiresChallenge(mfa: AuthMfaEntity | null): boolean {
    return this.isEnabled(mfa);
  }
}
