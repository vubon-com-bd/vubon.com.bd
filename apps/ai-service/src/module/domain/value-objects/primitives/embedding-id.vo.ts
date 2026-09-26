import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives/id.vo';

export class EmbeddingIdVO extends BaseIdVO {
  static create(value: string): EmbeddingIdVO {
    if (!value || value.trim().length === 0) {
      throw new Error('EmbeddingId cannot be empty');
    }
    return new EmbeddingIdVO(value);
  }

  private constructor(value: string) {
    super(value);
  }
}
