import { BaseNameVO } from '@vubon/shared-kernel/domain/primitives/name.vo';
import { VALIDATION } from '@vubon/shared-constants/common';

export class PromotionNameVO extends BaseNameVO {
  static create(raw: string): PromotionNameVO {
    const trimmed = raw.trim();
    if (trimmed.length < 1) {
      throw new Error('PromotionName cannot be empty');
    }
    if (trimmed.length > VALIDATION.NAME_MAX_LENGTH) {
      throw new Error(`PromotionName exceeds ${VALIDATION.NAME_MAX_LENGTH} chars`);
    }
    return new PromotionNameVO(trimmed);
  }

  private constructor(value: string) {
    super(value);
  }
}
