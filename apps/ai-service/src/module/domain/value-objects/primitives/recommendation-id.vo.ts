import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives/id.vo';

export class RecommendationIdVO extends BaseIdVO {
  static create(value: string): RecommendationIdVO {
    if (!value || value.trim().length === 0) {
      throw new Error('RecommendationId cannot be empty');
    }
    return new RecommendationIdVO(value);
  }

  private constructor(value: string) {
    super(value);
  }
}
