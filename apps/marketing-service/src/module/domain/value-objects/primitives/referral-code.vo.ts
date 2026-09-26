import { BaseCodeVO } from '@vubon/shared-kernel/domain/primitives/code.vo';

export class ReferralCodeVO extends BaseCodeVO {
  static create(raw: string): ReferralCodeVO {
    const normalized = raw.trim().toUpperCase();
    if (!normalized) {
      throw new Error('ReferralCode cannot be empty');
    }
    if (normalized.length < 4 || normalized.length > 24) {
      throw new Error('ReferralCode must be 4-24 chars');
    }
    return new ReferralCodeVO(normalized);
  }

  private constructor(value: string) {
    super(value);
  }
}
