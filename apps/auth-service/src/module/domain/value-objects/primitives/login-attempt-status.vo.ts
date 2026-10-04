/**
 * LoginAttemptStatusVO — Outcome of a login attempt
 * @module auth-service/domain/value-objects/primitives
 */
import { BaseStatusVO } from '@vubon/shared-kernel/domain/primitives/status.vo';

export type LoginAttemptStatusValue =
  | 'success'
  | 'failure'
  | 'blocked'
  | 'mfa_pending'
  | 'mfa_failed';

const ALLOWED: ReadonlySet<string> = new Set<string>([
  'success', 'failure', 'blocked', 'mfa_pending', 'mfa_failed',
]);

export class LoginAttemptStatusVO extends BaseStatusVO<LoginAttemptStatusValue> {
  private constructor(value: LoginAttemptStatusValue) {
    super(value);
  }

  static of(raw: string): LoginAttemptStatusVO {
    if (!ALLOWED.has(raw)) {
      throw new Error(`Unknown login attempt status: ${raw}`);
    }
    return new LoginAttemptStatusVO(raw as LoginAttemptStatusValue);
  }

  static success(): LoginAttemptStatusVO {
    return new LoginAttemptStatusVO('success');
  }

  static failure(): LoginAttemptStatusVO {
    return new LoginAttemptStatusVO('failure');
  }

  countsAsFailure(): boolean {
    return this.value === 'failure' || this.value === 'mfa_failed';
  }
}
