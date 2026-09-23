import { BaseCodeVO } from '@vubon/shared-kernel/domain/primitives/code.vo';
import { REGEX } from '@vubon/shared-constants/common';

export class PromotionCodeVO extends BaseCodeVO {
  static create(raw: string): PromotionCodeVO {
    const normalized = raw.trim().toUpperCase();
    if (!normalized) {
      throw new Error('PromotionCode cannot be empty');
    }
    if (normalized.length < 3 || normalized.length > 32) {
      throw new Error('PromotionCode must be 3-32 chars');
    }
    if (!/^[A-Z0-9_-]+$/.test(normalized)) {
      throw new Error('PromotionCode must be alphanumeric');
    }
    return new PromotionCodeVO(normalized);
  }

  private constructor(value: string) {
    super(value);
  }
}
