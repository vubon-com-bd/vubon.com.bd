/**
 * VerificationTypeVO — Channel/purpose of verification
 * @module auth-service/domain/value-objects/primitives
 */
import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives/type.vo';

export type VerificationTypeValue =
  | 'email'
  | 'phone'
  | 'kyc_document'
  | 'address'
  | 'bank_account'
  | 'business';

const ALLOWED: ReadonlySet<string> = new Set<string>([
  'email', 'phone', 'kyc_document',
  'address', 'bank_account', 'business',
]);

export class VerificationTypeVO extends BaseTypeVO<VerificationTypeValue> {
  private constructor(value: VerificationTypeValue) {
    super(value);
  }

  static of(raw: string): VerificationTypeVO {
    if (!ALLOWED.has(raw)) {
      throw new Error(`Unknown verification type: ${raw}`);
    }
    return new VerificationTypeVO(raw as VerificationTypeValue);
  }

  requiresDocument(): boolean {
    return this.value === 'kyc_document' || this.value === 'business';
  }
}
