import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives/id.vo';

export class SimilarityIdVO extends BaseIdVO {
  static create(value: string): SimilarityIdVO {
    if (!value || value.trim().length === 0) {
      throw new Error('SimilarityId cannot be empty');
    }
    return new SimilarityIdVO(value);
  }

  private constructor(value: string) {
    super(value);
  }
}
