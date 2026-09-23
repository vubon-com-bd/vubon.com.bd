import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives/id.vo';

export class PromotionIdVO extends BaseIdVO {
  static create(raw: string): PromotionIdVO {
    if (!raw || raw.trim().length === 0) {
      throw new Error('PromotionId cannot be empty');
    }
    return new PromotionIdVO(raw);
  }

  private constructor(value: string) {
    super(value);
  }
}
