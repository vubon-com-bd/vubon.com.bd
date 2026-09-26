/**
 * RecoveryCodeStatusVO — Status of a recovery code
 * @module auth-service/domain/value-objects/primitives
 */
import { BaseStatusVO } from '@vubon/shared-kernel/domain/primitives/status.vo';

export type RecoveryCodeStatusValue = 'active' | 'used' | 'expired';

const ALLOWED: ReadonlySet<string> = new Set<string>([
  'active', 'used', 'expired',
]);

export class RecoveryCodeStatusVO extends BaseStatusVO<RecoveryCodeStatusValue> {
  private constructor(value: RecoveryCodeStatusValue) {
    super(value);
  }

  static of(raw: string): RecoveryCodeStatusVO {
    if (!ALLOWED.has(raw)) {
      throw new Error(`Unknown recovery code status: ${raw}`);
    }
    return new RecoveryCodeStatusVO(raw as RecoveryCodeStatusValue);
  }

  static active(): RecoveryCodeStatusVO {
    return new RecoveryCodeStatusVO('active');
  }

  canBeUsed(): boolean {
    return this.value === 'active';
  }
}
