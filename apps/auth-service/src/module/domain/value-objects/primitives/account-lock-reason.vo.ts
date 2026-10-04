/**
 * AccountLockReasonVO — Reason a user's account was locked
 * @module auth-service/domain/value-objects/primitives
 */
import { BaseCodeVO } from '@vubon/shared-kernel/domain/primitives/code.vo';

export type LockReasonValue =
  | 'too_many_attempts'
  | 'suspicious_activity'
  | 'admin_action'
  | 'payment_fraud'
  | 'policy_violation'
  | 'security_incident';

const ALLOWED: ReadonlySet<string> = new Set<string>([
  'too_many_attempts', 'suspicious_activity', 'admin_action',
  'payment_fraud', 'policy_violation', 'security_incident',
]);

export class AccountLockReasonVO extends BaseCodeVO {
  private constructor(value: LockReasonValue) {
    super(value);
  }

  static of(raw: string): AccountLockReasonVO {
    if (!ALLOWED.has(raw)) {
      throw new Error(`Unknown lock reason: ${raw}`);
    }
    return new AccountLockReasonVO(raw as LockReasonValue);
  }

  static tooManyAttempts(): AccountLockReasonVO {
    return new AccountLockReasonVO('too_many_attempts');
  }

  requiresManualUnlock(): boolean {
    return this.value === 'admin_action'
      || this.value === 'payment_fraud'
      || this.value === 'policy_violation'
      || this.value === 'security_incident';
  }
}
