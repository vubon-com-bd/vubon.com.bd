/**
 * VerificationStatusVO — Status of a verification request
 * @module auth-service/domain/value-objects/primitives
 */
import { BaseStatusVO } from '@vubon/shared-kernel/domain/primitives/status.vo';

export type VerificationStatusValue =
  | 'pending'
  | 'verified'
  | 'rejected'
  | 'expired';

const ALLOWED: ReadonlySet<string> = new Set<string>([
  'pending', 'verified', 'rejected', 'expired',
]);

export class VerificationStatusVO extends BaseStatusVO<VerificationStatusValue> {
  private constructor(value: VerificationStatusValue) {
    super(value);
  }

  static of(raw: string): VerificationStatusVO {
    if (!ALLOWED.has(raw)) {
      throw new Error(`Unknown verification status: ${raw}`);
    }
    return new VerificationStatusVO(raw as VerificationStatusValue);
  }

  static pending(): VerificationStatusVO {
    return new VerificationStatusVO('pending');
  }

  override isActive(): boolean {
    return this.value === 'verified';
  }

  canRetry(): boolean {
    return this.value === 'pending' || this.value === 'expired';
  }
}
