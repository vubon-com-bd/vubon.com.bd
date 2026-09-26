import { BaseCodeVO } from '@vubon/shared-kernel/domain/primitives/code.vo';

export class AffiliateCodeVO extends BaseCodeVO {
  static create(raw: string): AffiliateCodeVO {
    const normalized = raw.trim().toUpperCase();
    if (!normalized) {
      throw new Error('AffiliateCode cannot be empty');
    }
    if (normalized.length < 4 || normalized.length > 24) {
      throw new Error('AffiliateCode must be 4-24 chars');
    }
    return new AffiliateCodeVO(normalized);
  }

  private constructor(value: string) {
    super(value);
  }
}
